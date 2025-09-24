import {
  clearSelectedTextContexts,
  getCurrentProject,
  ProjectConfig,
  removeSelectedTextContext,
  setCurrentProject,
  useChainType,
  useModelKey,
  useSelectedTextContexts,
} from "@/aiParams";
import { ChainType } from "@/chainFactory";
import { useProjectContextStatus } from "@/hooks/useProjectContextStatus";
import { useTranslation } from "@/i18n/useTranslation";
import { logInfo } from "@/logger";

import { ChatControls, reloadCurrentProject } from "@/components/chat-components/ChatControls";
import ChatInput from "@/components/chat-components/ChatInput";
import ChatMessages from "@/components/chat-components/ChatMessages";
import { NewVersionBanner } from "@/components/chat-components/NewVersionBanner";
import { ProjectList } from "@/components/chat-components/ProjectList";
import ProgressCard from "@/components/project/progress-card";
import { ABORT_REASON, EVENT_NAMES, LOADING_MESSAGES, USER_SENDER } from "@/constants";
import { AppContext, EventTargetContext } from "@/context";
import { useChatManager } from "@/hooks/useChatManager";
import { getAIResponse } from "@/langchainStream";
import ChainManager from "@/LLMProviders/chainManager";
import CopilotPlugin from "@/main";
import { Mention } from "@/mentions/Mention";
import { useIsPlusUser } from "@/plusUtils";
import { updateSetting, useSettingsValue } from "@/settings/model";
import { ChatUIState } from "@/state/ChatUIState";
import { FileParserManager } from "@/tools/FileParserManager";
import { err2String, isPlusChain } from "@/utils";
import { arrayBufferToBase64 } from "@/utils/base64";
import { Notice, TFile } from "obsidian";
import React, { useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";

type ChatMode = "default" | "project";

interface ChatProps {
  chainManager: ChainManager;
  onSaveChat: (saveAsNote: () => Promise<void>) => void;
  updateUserMessageHistory: (newMessage: string) => void;
  fileParserManager: FileParserManager;
  plugin: CopilotPlugin;
  mode?: ChatMode;
  chatUIState: ChatUIState;
}

const Chat: React.FC<ChatProps> = ({
  chainManager,
  onSaveChat,
  updateUserMessageHistory,
  fileParserManager,
  plugin,
  chatUIState,
}) => {
  const settings = useSettingsValue();
  const eventTarget = useContext(EventTargetContext);
  const { t } = useTranslation();

  const { messages: chatHistory, addMessage } = useChatManager(chatUIState);
  const [currentModelKey] = useModelKey();
  const [currentChain] = useChainType();
  const [currentAiMessage, setCurrentAiMessage] = useState("");
  const [inputMessage, setInputMessage] = useState("");
  const abortControllerRef = useRef<AbortController | null>(null);

  // Function to set the abort controller ref (for getAIResponse compatibility)
  const setAbortController = useCallback((controller: AbortController | null) => {
    abortControllerRef.current = controller;
  }, []);

  const [loading, setLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState(LOADING_MESSAGES.DEFAULT);
  const [contextNotes, setContextNotes] = useState<TFile[]>([]);
  const [includeActiveNote, setIncludeActiveNote] = useState(false);
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [showChatUI, setShowChatUI] = useState(false);
  // null: keep default behavior; true: show; false: hide
  const [progressCardVisible, setProgressCardVisible] = useState<boolean | null>(null);

  // Track if component is mounted to prevent state updates after unmount
  const isMountedRef = useRef(false);

  // Safe setter utilities - automatically wrap state setters to prevent updates after unmount
  const safeSet = useMemo<{
    setCurrentAiMessage: (value: string) => void;
    setLoadingMessage: (value: string) => void;
    setLoading: (value: boolean) => void;
  }>(
    () => ({
      setCurrentAiMessage: (value: string) => isMountedRef.current && setCurrentAiMessage(value),
      setLoadingMessage: (value: string) => isMountedRef.current && setLoadingMessage(value),
      setLoading: (value: boolean) => isMountedRef.current && setLoading(value),
    }),
    []
  );

  const [selectedTextContexts] = useSelectedTextContexts();
  const projectContextStatus = useProjectContextStatus();

  // Calculate whether to show ProgressCard based on status and user preference
  const shouldShowProgressCard = () => {
    if (selectedChain !== ChainType.PROJECT_CHAIN) return false;

    // If user has explicitly set visibility, respect that choice
    if (progressCardVisible !== null) {
      return progressCardVisible;
    }

    // Default behavior: show for loading/error, hide for success
    return projectContextStatus === "loading" || projectContextStatus === "error";
  };

  // Reset user preference when status changes to allow default behavior
  useEffect(() => {
    setProgressCardVisible(null);
  }, [projectContextStatus]);

  const [previousMode, setPreviousMode] = useState<ChainType | null>(null);
  const [selectedChain, setSelectedChain] = useChainType();
  const isPlusUser = useIsPlusUser();

  const mention = Mention.getInstance();

  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const handleChatVisibility = () => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    };
    eventTarget?.addEventListener(EVENT_NAMES.CHAT_IS_VISIBLE, handleChatVisibility);

    // Cleanup function
    return () => {
      eventTarget?.removeEventListener(EVENT_NAMES.CHAT_IS_VISIBLE, handleChatVisibility);
    };
  }, [eventTarget]);

  const appContext = useContext(AppContext);
  const app = plugin.app || appContext;

  const handleSendMessage = async ({
    toolCalls,
    urls,
    contextNotes: passedContextNotes,
  }: {
    toolCalls?: string[];
    urls?: string[];
    contextNotes?: TFile[];
  } = {}) => {
    if (!inputMessage && selectedImages.length === 0) return;

    // Check for URL restrictions in non-Plus chains and show notice, but continue processing
    const hasUrlsInContext = urls && urls.length > 0;
    const hasUrlsInMessage = inputMessage && mention.extractAllUrls(inputMessage).length > 0;

    if ((hasUrlsInContext || hasUrlsInMessage) && !isPlusChain(currentChain)) {
      // Show notice but continue processing the message without URL context
      new Notice(t("notifications.restrictions.urlProcessing"));
    }

    try {
      // Create message content array
      const content: any[] = [];

      // Add text content if present
      if (inputMessage) {
        content.push({
          type: "text",
          text: inputMessage,
        });
      }

      // Add images if present
      for (const image of selectedImages) {
        const imageData = await image.arrayBuffer();
        const base64Image = arrayBufferToBase64(imageData);
        content.push({
          type: "image_url",
          image_url: {
            url: `data:${image.type};base64,${base64Image}`,
          },
        });
      }

      // Prepare context notes and deduplicate by path
      const allNotes = [...(passedContextNotes || []), ...contextNotes];
      const notes = allNotes.filter(
        (note, index, array) => array.findIndex((n) => n.path === note.path) === index
      );

      // Handle composer prompt
      let displayText = inputMessage;

      // Add tool calls if present
      if (toolCalls) {
        displayText += " " + toolCalls.join("\n");
      }

      // Create message context - filter out URLs for non-Plus chains
      const context = {
        notes,
        urls: isPlusChain(currentChain) ? urls || [] : [],
        selectedTextContexts,
      };

      // Clear input and images
      setInputMessage("");
      setSelectedImages([]);
      safeSet.setLoading(true);
      safeSet.setLoadingMessage(LOADING_MESSAGES.DEFAULT);

      // Send message through ChatManager (this handles all the complex context processing)
      const messageId = await chatUIState.sendMessage(
        displayText,
        context,
        currentChain,
        includeActiveNote,
        content.length > 0 ? content : undefined
      );

      // Add to user message history
      if (inputMessage) {
        updateUserMessageHistory(inputMessage);
      }

      // Autosave if enabled
      if (settings.autosaveChat) {
        handleSaveAsNote();
      }

      // Get the LLM message for AI processing
      const llmMessage = chatUIState.getLLMMessage(messageId);
      if (llmMessage) {
        await getAIResponse(
          llmMessage,
          chainManager,
          addMessage,
          safeSet.setCurrentAiMessage,
          setAbortController,
          { debug: settings.debug, updateLoadingMessage: safeSet.setLoadingMessage }
        );
      }

      // Autosave again after AI response
      if (settings.autosaveChat) {
        handleSaveAsNote();
      }
    } catch (error) {
      console.error(t("errors.chat.sendMessage"), error);
      new Notice(t("notifications.chat.sendError"));
    } finally {
      safeSet.setLoading(false);
      safeSet.setLoadingMessage(LOADING_MESSAGES.DEFAULT);
    }
  };

  const handleSaveAsNote = useCallback(async () => {
    if (!app) {
      console.error(t("errors.app.instanceNotAvailable"));
      return;
    }

    try {
      // Use the new ChatManager persistence functionality
      await chatUIState.saveChat(currentModelKey);
    } catch (error) {
      console.error(t("errors.chat.saveAsNote"), err2String(error));
      new Notice(t("notifications.chat.saveError"));
    }
  }, [app, chatUIState, currentModelKey, t]);

  const handleStopGenerating = useCallback(
    (reason?: ABORT_REASON) => {
      if (abortControllerRef.current) {
        logInfo(`stopping generation..., reason: ${reason}`);
        abortControllerRef.current.abort(reason);
        safeSet.setLoading(false);
        safeSet.setLoadingMessage(LOADING_MESSAGES.DEFAULT);
        // Keep the partial AI message visible
        // Don't clear setCurrentAiMessage here
      }
    },
    [safeSet]
  );

  // Cleanup on unmount - abort any ongoing streaming
  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
      // Abort any ongoing streaming when component unmounts
      if (abortControllerRef.current) {
        abortControllerRef.current.abort(ABORT_REASON.UNMOUNT);
      }
    };
  }, []); // No dependencies - only run on mount/unmount

  const handleRegenerate = useCallback(
    async (messageIndex: number) => {
      if (messageIndex <= 0) {
        new Notice(t("notifications.chat.cannotRegenerateFirst"));
        return;
      }

      const messageToRegenerate = chatHistory[messageIndex];
      if (!messageToRegenerate) {
        new Notice(t("notifications.chat.messageNotFound"));
        return;
      }

      // Clear current AI message and set loading state
      safeSet.setCurrentAiMessage("");
      safeSet.setLoading(true);
      try {
        const success = await chatUIState.regenerateMessage(
          messageToRegenerate.id!,
          safeSet.setCurrentAiMessage,
          addMessage
        );

        if (!success) {
          new Notice(t("notifications.chat.regenerateError"));
        } else if (settings.debug) {
          console.log(t("debug.chat.regenerateSuccess"));
        }

        // Autosave the chat if the setting is enabled
        if (settings.autosaveChat) {
          handleSaveAsNote();
        }
      } catch (error) {
        console.error(t("errors.chat.regenerateMessage"), error);
        new Notice(t("notifications.chat.regenerateError"));
      } finally {
        safeSet.setLoading(false);
      }
    },
    [
      chatHistory,
      chatUIState,
      settings.debug,
      settings.autosaveChat,
      handleSaveAsNote,
      addMessage,
      safeSet,
      t,
    ]
  );

  const handleEdit = useCallback(
    async (messageIndex: number, newMessage: string) => {
      const messageToEdit = chatHistory[messageIndex];
      if (!messageToEdit || messageToEdit.message === newMessage) {
        return;
      }

      try {
        const success = await chatUIState.editMessage(
          messageToEdit.id!,
          newMessage,
          currentChain,
          includeActiveNote
        );

        if (!success) {
          new Notice(t("notifications.chat.editError"));
          return;
        }

        // For user messages, immediately truncate any AI responses and regenerate
        if (messageToEdit.sender === USER_SENDER) {
          // Check if there were AI responses after this message
          const hadAIResponses = messageIndex < chatHistory.length - 1;

          // Truncate all messages after this user message (removes old AI responses)
          await chatUIState.truncateAfterMessageId(messageToEdit.id!);

          // If there were AI responses, generate new ones
          if (hadAIResponses) {
            safeSet.setLoading(true);
            try {
              const llmMessage = chatUIState.getLLMMessage(messageToEdit.id!);
              if (llmMessage) {
                await getAIResponse(
                  llmMessage,
                  chainManager,
                  addMessage,
                  safeSet.setCurrentAiMessage,
                  setAbortController,
                  { debug: settings.debug, updateLoadingMessage: safeSet.setLoadingMessage }
                );
              }
            } catch (error) {
              console.error(t("errors.chat.regenerateAIResponse"), error);
              new Notice(t("notifications.chat.regenerateError"));
            } finally {
              safeSet.setLoading(false);
            }
          }
        }

        // Autosave the chat if the setting is enabled
        if (settings.autosaveChat) {
          handleSaveAsNote();
        }
      } catch (error) {
        console.error(t("errors.chat.editMessage"), error);
        new Notice(t("notifications.chat.editError"));
      }
    },
    [
      chatHistory,
      chatUIState,
      currentChain,
      includeActiveNote,
      addMessage,
      chainManager,
      settings.debug,
      settings.autosaveChat,
      handleSaveAsNote,
      safeSet,
      setAbortController,
      t,
    ]
  );

  // Expose handleSaveAsNote to parent
  useEffect(() => {
    if (onSaveChat) {
      onSaveChat(handleSaveAsNote);
    }
  }, [onSaveChat, handleSaveAsNote]);

  const handleAddProject = useCallback(
    (project: ProjectConfig) => {
      const currentProjects = settings.projectList || [];
      const existingIndex = currentProjects.findIndex((p) => p.name === project.name);

      if (existingIndex >= 0) {
        throw new Error(t("errors.project.alreadyExists", { name: project.name }));
      }

      const newProjectList = [...currentProjects, project];
      updateSetting("projectList", newProjectList);

      // Check if this project is now the current project
      const currentProject = getCurrentProject();
      if (currentProject?.id === project.id) {
        // Reload the project context for the newly added project
        reloadCurrentProject()
          .then(() => {
            new Notice(t("notifications.project.addedWithContext", { name: project.name }));
          })
          .catch((error: Error) => {
            console.error(t("errors.project.loadContext"), error);
            new Notice(t("notifications.project.addedContextFailed", { name: project.name }));
          });
      } else {
        new Notice(t("notifications.project.addedSuccess", { name: project.name }));
      }

      return true;
    },
    [settings.projectList, t]
  );

  const handleEditProject = useCallback(
    (originP: ProjectConfig, updateP: ProjectConfig) => {
      const currentProjects = settings.projectList || [];
      const existingProject = currentProjects.find((p) => p.name === originP.name);

      if (!existingProject) {
        throw new Error(t("errors.project.notExist", { name: originP.name }));
      }

      const newProjectList = currentProjects.map((p) => (p.name === originP.name ? updateP : p));
      updateSetting("projectList", newProjectList);

      // If this is the current project, update the current project atom
      const currentProject = getCurrentProject();
      if (currentProject?.id === originP.id) {
        setCurrentProject(updateP);

        // Reload the project context
        reloadCurrentProject()
          .then(() => {
            new Notice(t("notifications.project.updateWithContext", { name: originP.name }));
          })
          .catch((error: Error) => {
            console.error(t("errors.project.reloadContext"), error);
            new Notice(t("notifications.project.updateContextFailed", { name: originP.name }));
          });
      } else {
        new Notice(t("notifications.project.updateSuccess", { name: originP.name }));
      }

      return true;
    },
    [settings.projectList, t]
  );

  const handleInsertToChat = useCallback((prompt: string) => {
    setInputMessage((prev) => `${prev} ${prompt} `);
  }, []);

  const handleRemoveSelectedText = useCallback((id: string) => {
    removeSelectedTextContext(id);
  }, []);

  const handleDelete = useCallback(
    async (messageIndex: number) => {
      const messageToDelete = chatHistory[messageIndex];
      if (!messageToDelete) {
        new Notice(t("notifications.chat.messageNotFound"));
        return;
      }

      try {
        const success = await chatUIState.deleteMessage(messageToDelete.id!);
        if (!success) {
          new Notice(t("notifications.chat.deleteError"));
        }
      } catch (error) {
        console.error(t("errors.chat.deleteMessage"), error);
        new Notice(t("notifications.chat.deleteError"));
      }
    },
    [chatHistory, chatUIState, t]
  );

  const handleNewChat = useCallback(async () => {
    handleStopGenerating(ABORT_REASON.NEW_CHAT);

    // First autosave the current chat if the setting is enabled
    if (settings.autosaveChat) {
      await handleSaveAsNote();
    }

    // Clear messages through the new architecture
    chatUIState.clearMessages();

    // Additional UI state reset specific to this component
    safeSet.setCurrentAiMessage("");
    setContextNotes([]);
    clearSelectedTextContexts();
    // Respect the includeActiveNote setting for all non-project chains
    if (selectedChain === ChainType.PROJECT_CHAIN) {
      setIncludeActiveNote(false);
    } else {
      setIncludeActiveNote(settings.includeActiveNoteAsContext);
    }
  }, [
    handleStopGenerating,
    chatUIState,
    settings.autosaveChat,
    settings.includeActiveNoteAsContext,
    selectedChain,
    handleSaveAsNote,
    safeSet,
  ]);

  const handleLoadHistory = useCallback(() => {
    plugin.loadCopilotChatHistory();
  }, [plugin]);

  // Event listener for abort stream events
  useEffect(() => {
    const handleAbortStream = (event: CustomEvent) => {
      const reason = event.detail?.reason || ABORT_REASON.NEW_CHAT;
      handleStopGenerating(reason);
    };

    eventTarget?.addEventListener(EVENT_NAMES.ABORT_STREAM, handleAbortStream);

    // Cleanup function
    return () => {
      eventTarget?.removeEventListener(EVENT_NAMES.ABORT_STREAM, handleAbortStream);
    };
  }, [eventTarget, handleStopGenerating]);

  // Use the includeActiveNoteAsContext setting
  useEffect(() => {
    if (settings.includeActiveNoteAsContext !== undefined) {
      // Only apply the setting if not in Project mode
      if (selectedChain === ChainType.PROJECT_CHAIN) {
        setIncludeActiveNote(false);
      } else {
        setIncludeActiveNote(settings.includeActiveNoteAsContext);
      }
    }
  }, [settings.includeActiveNoteAsContext, selectedChain]);

  // Note: pendingMessages loading has been removed as ChatManager now handles
  // message persistence and loading automatically based on project context

  const renderChatComponents = () => (
    <>
      <div className="tw-flex tw-size-full tw-flex-col tw-overflow-hidden">
        <NewVersionBanner currentVersion={plugin.manifest.version} />
        <ChatMessages
          chatHistory={chatHistory}
          currentAiMessage={currentAiMessage}
          loading={loading}
          loadingMessage={loadingMessage}
          app={app}
          onRegenerate={handleRegenerate}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onInsertToChat={handleInsertToChat}
          onReplaceChat={setInputMessage}
          showHelperComponents={selectedChain !== ChainType.PROJECT_CHAIN}
        />
        {shouldShowProgressCard() ? (
          <div className="tw-inset-0 tw-z-modal tw-flex tw-items-center tw-justify-center tw-rounded-xl">
            <ProgressCard
              plugin={plugin}
              setHiddenCard={() => {
                setProgressCardVisible(false);
              }}
            />
          </div>
        ) : (
          <>
            <ChatControls
              onNewChat={handleNewChat}
              onSaveAsNote={() => handleSaveAsNote()}
              onLoadHistory={handleLoadHistory}
              onModeChange={(newMode) => {
                setPreviousMode(selectedChain);
                // Hide chat UI when switching to project mode
                if (newMode === ChainType.PROJECT_CHAIN) {
                  setShowChatUI(false);
                }
              }}
            />
            <ChatInput
              ref={inputRef}
              inputMessage={inputMessage}
              setInputMessage={setInputMessage}
              handleSendMessage={handleSendMessage}
              isGenerating={loading}
              onStopGenerating={() => handleStopGenerating(ABORT_REASON.USER_STOPPED)}
              app={app}
              contextNotes={contextNotes}
              setContextNotes={setContextNotes}
              includeActiveNote={includeActiveNote}
              setIncludeActiveNote={setIncludeActiveNote}
              mention={mention}
              selectedImages={selectedImages}
              onAddImage={(files: File[]) => setSelectedImages((prev) => [...prev, ...files])}
              setSelectedImages={setSelectedImages}
              disableModelSwitch={selectedChain === ChainType.PROJECT_CHAIN}
              selectedTextContexts={selectedTextContexts}
              onRemoveSelectedText={handleRemoveSelectedText}
              showProgressCard={() => {
                setProgressCardVisible(true);
              }}
            />
          </>
        )}
      </div>
    </>
  );

  return (
    <div className="tw-flex tw-size-full tw-flex-col tw-overflow-hidden">
      <div className="tw-h-full">
        <div className="tw-relative tw-flex tw-h-full tw-flex-col">
          {selectedChain === ChainType.PROJECT_CHAIN && (
            <div className={`${selectedChain === ChainType.PROJECT_CHAIN ? "tw-z-modal" : ""}`}>
              <ProjectList
                projects={settings.projectList || []}
                defaultOpen={true}
                app={app}
                hasMessages={false}
                onProjectAdded={handleAddProject}
                onEditProject={handleEditProject}
                inputRef={inputRef}
                onClose={() => {
                  if (previousMode) {
                    setSelectedChain(previousMode);
                    setPreviousMode(null);
                  } else {
                    // default back to chat or plus mode
                    setSelectedChain(
                      isPlusUser ? ChainType.COPILOT_PLUS_CHAIN : ChainType.LLM_CHAIN
                    );
                  }
                }}
                showChatUI={(v) => setShowChatUI(v)}
                onProjectClose={() => {
                  setProgressCardVisible(null);
                }}
              />
            </div>
          )}
          {(selectedChain !== ChainType.PROJECT_CHAIN ||
            (selectedChain === ChainType.PROJECT_CHAIN && showChatUI)) &&
            renderChatComponents()}
        </div>
      </div>
    </div>
  );
};

export default Chat;
