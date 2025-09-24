import { getCurrentProject, setCurrentProject, setProjectLoading, useChainType } from "@/aiParams";
import { ProjectContextCache } from "@/cache/projectContextCache";
import { ChainType } from "@/chainFactory";
import { ConfirmModal } from "@/components/modals/ConfirmModal";
import { Button } from "@/components/ui/button";
import { DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { SettingSwitch } from "@/components/ui/setting-switch";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { PLUS_UTM_MEDIUMS } from "@/constants";
import { t, useTranslation } from "@/i18n";
import { logError } from "@/logger";
import { navigateToPlusPage, useIsPlusUser } from "@/plusUtils";
import { updateSetting, useSettingsValue } from "@/settings/model";
import { Docs4LLMParser } from "@/tools/FileParserManager";
import { isRateLimitError } from "@/utils/rateLimitUtils";
import { DropdownMenu, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";

import {
  AlertTriangle,
  ChevronDown,
  Download,
  FileText,
  History,
  LibraryBig,
  MessageCirclePlus,
  MoreHorizontal,
  RefreshCw,
  Sparkles,
  SquareArrowOutUpRight,
} from "lucide-react";
import { Notice } from "obsidian";
import React from "react";

export async function refreshVaultIndex() {
  try {
    const { getSettings } = await import("@/settings/model");
    const settings = getSettings();

    if (settings.enableSemanticSearchV3) {
      // Use VectorStoreManager for semantic search indexing
      const VectorStoreManager = (await import("@/search/vectorStoreManager")).default;
      const count = await VectorStoreManager.getInstance().indexVaultToVectorStore(false);
      new Notice(t("notifications.index.refreshed", { count }));
    } else {
      // V3 search builds indexes on demand
      new Notice(t("notifications.index.lexicalNoBuild"));
    }
  } catch (error) {
    console.error("Error refreshing vault index:", error);
    new Notice(t("notifications.index.refreshError"));
  }
}

export async function forceReindexVault() {
  try {
    const { getSettings } = await import("@/settings/model");
    const settings = getSettings();

    if (settings.enableSemanticSearchV3) {
      // Use VectorStoreManager for semantic search indexing
      const VectorStoreManager = (await import("@/search/vectorStoreManager")).default;
      const count = await VectorStoreManager.getInstance().indexVaultToVectorStore(true);
      new Notice(t("notifications.index.reindexed", { count }));
    } else {
      // V3 search builds indexes on demand
      new Notice(t("notifications.index.lexicalNoBuild"));
    }
  } catch (error) {
    console.error("Error force reindexing vault:", error);
    new Notice(t("notifications.index.reindexError"));
  }
}

export async function reloadCurrentProject() {
  const currentProject = getCurrentProject();
  if (!currentProject) {
    new Notice(t("notifications.project.noProjectSelected"));
    return;
  }

  // Directly execute the reload logic without a confirmation modal
  try {
    setProjectLoading(true); // Start loading indicator

    // Invalidate the markdown context first. This also cleans up file references
    // for files that no longer match project patterns. It will also clear
    // web/youtube contexts to force their reload.
    await ProjectContextCache.getInstance().invalidateMarkdownContext(currentProject, true);

    // Then, trigger the full load and processing logic via ProjectManager.
    // getProjectContext will call loadProjectContext if markdownNeedsReload is true (which it is now).
    // loadProjectContext will handle markdown, web, youtube, and other file types (including API calls for new ones).
    const plugin = (app as any).plugins.getPlugin("copilot");
    if (plugin && plugin.projectManager) {
      await plugin.projectManager.getProjectContext(currentProject.id);
      new Notice(t("notifications.project.contextReloaded", { name: currentProject.name }));
    } else {
      throw new Error(t("errors.projectManagerNotAvailable"));
    }
  } catch (error) {
    logError("Error reloading project context:", error);

    // Check if this is a rate limit error and let the FileParserManager notice handle it
    if (!isRateLimitError(error)) {
      new Notice(t("notifications.project.reloadContextError"));
    }
    // If it's a rate limit error, don't show generic failure message - let the rate limit notice show
  } finally {
    setProjectLoading(false); // Stop loading indicator
  }
}

export async function forceRebuildCurrentProjectContext() {
  const currentProject = getCurrentProject();
  if (!currentProject) {
    new Notice(t("notifications.project.noProjectSelected"));
    return;
  }

  const modal = new ConfirmModal(
    app,
    async () => {
      try {
        setProjectLoading(true); // Start loading indicator
        new Notice(
          t("notifications.project.rebuildingContext", { name: currentProject.name }),
          10000 // Longer notice as this is a bigger operation
        );

        // Step 1: Completely clear all cached data for this project (in-memory and on-disk)
        // Reset rate limit notice timer to allow showing notices during force rebuild
        Docs4LLMParser.resetRateLimitNoticeTimer();

        await ProjectContextCache.getInstance().clearForProject(currentProject);
        new Notice(t("notifications.project.cacheCleared", { name: currentProject.name }));

        // Step 2: Trigger a full reload from scratch.
        // getProjectContext will call loadProjectContext as the cache is now empty.
        // loadProjectContext will handle markdown, web, youtube, and all other file types.
        const plugin = (app as any).plugins.getPlugin("copilot");
        if (plugin && plugin.projectManager) {
          await plugin.projectManager.getProjectContext(currentProject.id);
          new Notice(t("notifications.project.contextRebuilt", { name: currentProject.name }));
        } else {
          throw new Error(t("errors.projectManagerNotAvailable"));
        }
      } catch (error) {
        logError("Error force rebuilding project context:", error);

        // Check if this is a rate limit error and let the FileParserManager notice handle it
        if (!isRateLimitError(error)) {
          new Notice(t("notifications.project.rebuildContextError"));
        }
        // If it's a rate limit error, don't show generic failure message - let the rate limit notice show
      } finally {
        setProjectLoading(false); // Stop loading indicator
      }
    },
    // Confirmation message with a strong warning
    t("notifications.project.rebuildConfirm", { name: currentProject.name }),
    t("notifications.project.rebuildConfirmTitle") // Modal title
  );
  modal.open();
}

interface ChatControlsProps {
  onNewChat: () => void;
  onSaveAsNote: () => void;
  onLoadHistory: () => void;
  onModeChange: (mode: ChainType) => void;
  onCloseProject?: () => void;
}

export function ChatControls({
  onNewChat,
  onSaveAsNote,
  onLoadHistory,
  onModeChange,
  onCloseProject,
}: ChatControlsProps) {
  const { t } = useTranslation();
  const settings = useSettingsValue();
  const [selectedChain, setSelectedChain] = useChainType();
  const isPlusUser = useIsPlusUser();

  const handleModeChange = (chainType: ChainType) => {
    setSelectedChain(chainType);
    onModeChange(chainType);
    if (chainType !== ChainType.PROJECT_CHAIN) {
      setCurrentProject(null);
      onCloseProject?.();
    }
  };

  return (
    <div className="tw-flex tw-w-full tw-items-center tw-justify-between tw-p-1">
      <div className="tw-flex-1">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost2" size="fit" className="tw-ml-1 tw-text-sm tw-text-muted">
              {selectedChain === ChainType.LLM_CHAIN && t("chatControls.modes.chatFree")}
              {selectedChain === ChainType.VAULT_QA_CHAIN && t("chatControls.modes.vaultQAFree")}
              {selectedChain === ChainType.COPILOT_PLUS_CHAIN && (
                <div className="tw-flex tw-items-center tw-gap-1">
                  <Sparkles className="tw-size-4" />
                  {t("chatControls.modes.copilotPlus")}
                </div>
              )}
              {selectedChain === ChainType.PROJECT_CHAIN && t("chatControls.modes.projectsAlpha")}
              <ChevronDown className="tw-mt-0.5 tw-size-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuItem
              onSelect={() => {
                handleModeChange(ChainType.LLM_CHAIN);
              }}
            >
              {t("chatControls.modes.chatFree")}
            </DropdownMenuItem>
            <DropdownMenuItem
              onSelect={() => {
                handleModeChange(ChainType.VAULT_QA_CHAIN);
              }}
            >
              {t("chatControls.modes.vaultQAFree")}
            </DropdownMenuItem>
            {isPlusUser ? (
              <DropdownMenuItem
                onSelect={() => {
                  handleModeChange(ChainType.COPILOT_PLUS_CHAIN);
                }}
              >
                <div className="tw-flex tw-items-center tw-gap-1">
                  <Sparkles className="tw-size-4" />
                  {t("chatControls.modes.copilotPlus")}
                </div>
              </DropdownMenuItem>
            ) : (
              <DropdownMenuItem
                onSelect={() => {
                  navigateToPlusPage(PLUS_UTM_MEDIUMS.CHAT_MODE_SELECT);
                  onCloseProject?.();
                }}
              >
                {t("chatControls.modes.copilotPlus")}
                <SquareArrowOutUpRight className="tw-size-3" />
              </DropdownMenuItem>
            )}

            {isPlusUser ? (
              <DropdownMenuItem
                className="tw-flex tw-items-center tw-gap-1"
                onSelect={() => {
                  handleModeChange(ChainType.PROJECT_CHAIN);
                }}
              >
                <LibraryBig className="tw-size-4" />
                {t("chatControls.modes.projectsAlpha")}
              </DropdownMenuItem>
            ) : (
              <DropdownMenuItem
                onSelect={() => {
                  navigateToPlusPage(PLUS_UTM_MEDIUMS.CHAT_MODE_SELECT);
                  onCloseProject?.();
                }}
              >
                {t("chatControls.modes.copilotPlus")}
                <SquareArrowOutUpRight className="tw-size-3" />
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost2"
              size="icon"
              title={t("chatControls.buttons.newChat")}
              onClick={onNewChat}
            >
              <MessageCirclePlus className="tw-size-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>{t("chatControls.buttons.newChat")}</TooltipContent>
        </Tooltip>
        {!settings.autosaveChat && (
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost2"
                size="icon"
                title={t("chatControls.buttons.saveChatAsNote")}
                onClick={onSaveAsNote}
              >
                <Download className="tw-size-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>{t("chatControls.buttons.saveChatAsNote")}</TooltipContent>
          </Tooltip>
        )}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost2"
              size="icon"
              title={t("chatControls.buttons.chatHistory")}
              onClick={onLoadHistory}
            >
              <History className="tw-size-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>{t("chatControls.buttons.chatHistory")}</TooltipContent>
        </Tooltip>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost2" size="icon" title={t("chatControls.buttons.advancedSettings")}>
              <MoreHorizontal className="tw-size-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="tw-w-64">
            <DropdownMenuItem
              className="tw-flex tw-justify-between"
              onSelect={(e) => {
                e.preventDefault();
                updateSetting("showSuggestedPrompts", !settings.showSuggestedPrompts);
              }}
            >
              <div className="tw-flex tw-items-center tw-gap-2">
                <Sparkles className="tw-size-4" />
                {t("chatControls.toggles.suggestedPrompt")}
              </div>
              <SettingSwitch checked={settings.showSuggestedPrompts} />
            </DropdownMenuItem>
            <DropdownMenuItem
              className="tw-flex tw-justify-between"
              onSelect={(e) => {
                e.preventDefault();
                updateSetting("showRelevantNotes", !settings.showRelevantNotes);
              }}
            >
              <div className="tw-flex tw-items-center tw-gap-2">
                <FileText className="tw-size-4" />
                {t("chatControls.toggles.relevantNote")}
              </div>
              <SettingSwitch checked={settings.showRelevantNotes} />
            </DropdownMenuItem>
            {selectedChain === ChainType.PROJECT_CHAIN ? (
              <>
                <DropdownMenuItem
                  className="tw-flex tw-items-center tw-gap-2"
                  onSelect={() => reloadCurrentProject()}
                >
                  <RefreshCw className="tw-size-4" />
                  {t("chatControls.buttons.reloadCurrentProject")}
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="tw-flex tw-items-center tw-gap-2"
                  onSelect={() => forceRebuildCurrentProjectContext()}
                >
                  <AlertTriangle className="tw-size-4" />
                  {t("chatControls.buttons.forceRebuildContext")}
                </DropdownMenuItem>
              </>
            ) : (
              <>
                <DropdownMenuItem
                  className="tw-flex tw-items-center tw-gap-2"
                  onSelect={() => refreshVaultIndex()}
                >
                  <RefreshCw className="tw-size-4" />
                  {t("chatControls.buttons.refreshVaultIndex")}
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="tw-flex tw-items-center tw-gap-2"
                  onSelect={() => {
                    const modal = new ConfirmModal(
                      app,
                      () => forceReindexVault(),
                      t("notifications.index.reindexConfirm"),
                      t("notifications.index.reindexConfirmTitle")
                    );
                    modal.open();
                  }}
                >
                  <AlertTriangle className="tw-size-4" />
                  {t("chatControls.buttons.forceReindexVault")}
                </DropdownMenuItem>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
