/**
 * 英文翻译
 */
export const en = {
  // 通用UI文本
  common: {
    buttons: {
      save: "Save",
      cancel: "Cancel",
      delete: "Delete",
      edit: "Edit",
      copy: "Copy",
      add: "Add",
      remove: "Remove",
      apply: "Apply",
      close: "Close",
      ok: "OK",
      yes: "Yes",
      no: "No",
      back: "Back",
      next: "Next",
      continue: "Continue",
      stop: "Stop",
      submit: "Submit",
      insert: "Insert",
      replace: "Replace",
      retry: "Retry",
      refresh: "Refresh",
      manage: "Manage",
    },
    labels: {
      name: "Name",
      title: "Title",
      description: "Description",
      model: "Model",
      optional: "Optional",
      required: "Required",
      prompt: "Prompt",
      loading: "Loading...",
      saving: "Saving...",
      search: "Search",
      filter: "Filter",
      settings: "Settings",
      language: "Language",
      chat: "Chat",
      embedding: "Embedding",
    },
    toggle: "Toggle",
    messages: {
      copiedToClipboard: "Copied to clipboard",
      error: "Error",
      success: "Success",
      warning: "Warning",
      info: "Info",
      noResults: "No results found",
      tryAgain: "Please try again",
      operationFailed: "Operation failed",
      operationCompleted: "Operation completed",
    },
    placeholders: {
      enterText: "Enter text...",
      search: "Search...",
      selectOption: "Select an option",
      optional: "Optional",
    },
    units: {
      mb: " MB",
    },
  },

  // 聊天相关
  chat: {
    buttons: {
      copy: "Copy",
      edit: "Edit",
      delete: "Delete",
      regenerate: "Regenerate",
      showSources: "Show Sources",
      insertAtCursor: "Insert / Replace at cursor",
      newChat: "New Chat",
      saveAsNote: "Save Chat as Note",
      chatHistory: "Chat History",
      advancedSettings: "Advanced Settings",
    },
    modal: {
      chatEngineNotReady: "Chat engine not ready. Please try again.",
      systemPromptDefault:
        "You are a helpful assistant. You will help the user with their content editing needs.",
    },
    input: {
      followupInstructions: "Enter follow-up instructions...",
      askMeAnything: "Ask me anything...",
      removeImage: "Remove image",
    },
    toolCall: {
      accept: "Accept",
      reject: "Reject",
    },
  },

  // 自定义命令
  commands: {
    modal: {
      editCommand: "Edit Command",
    },
    form: {
      commandName: "Command Name",
      commandPrompt: "Command Prompt",
      modelOptional: "Model (Optional)",
      showInContextMenu: "Show in context menu",
      showInSlashMenu: "Show in slash menu",
      inheritFromChatModel: "Inherit from chat model",
    },
    placeholders: {
      enterCommandName: "Enter command name",
      enterCommandPrompt: "Enter command prompt",
    },
    validation: {
      promptRequired: "Prompt is required",
      nameRequired: "Name is required",
    },
    // 命令设置相关
    settings: {
      title: "Custom Commands",
      description:
        "Custom commands are preset prompts that you can trigger in the editor by right-clicking and selecting them from the context menu or by using a / command in the chat to load them into your chat input.",
      customPromptsFolder: {
        title: "Custom Prompts Folder Name",
        description: "Folder where custom prompts are stored",
      },
      customPromptTemplating: {
        title: "Custom Prompt Templating",
        description:
          "Process variables like {activenote}, {foldername}, or {#tag} in prompts. Disable for raw prompts.",
      },
      sortStrategy: {
        title: "Custom Prompts Sort Strategy",
        description: "Sort order for slash command menu prompts",
      },
      labels: {
        inMenu: "In Menu",
        inSlash: "In Slash",
        slashCmd: "Slash Cmd",
        name: "Name",
        actions: "Actions",
      },
      tooltips: {
        editCommand: "Edit Command",
        copyCommand: "Copy command",
        inMenuHelp:
          "If enabled, the command will be available in the context menu when you right-click in the editor.",
        inSlashHelp: "If enabled, the command will be available as a slash command in the chat.",
      },
      buttons: {
        generateDefault: "Generate Default",
        addCmd: "Add Cmd",
      },
      messages: {
        noCustomPromptFiles: "No custom prompt files found.",
        commandDeleteConfirm:
          'Are you sure you want to delete the command "{title}"? This will permanently remove the command file and cannot be undone.',
        commandDeleteTitle: "Delete Command",
        generateDefaultConfirm:
          "This will add default commands to your custom prompts folder. Do you want to continue?",
        generateDefaultTitle: "Generate Default Commands",
        commandDeleteSuccess: 'Command "{title}" deleted successfully!',
        commandDeleteFailed: "Failed to delete command. Please try again.",
        commandCopyFailed: "Failed to copy command. Please try again.",
      },
      sortOptions: {
        recency: "Recency",
        alphabetical: "Alphabetical",
        manual: "Manual",
      },
      infoMessage:
        "Commands are automatically loaded from .md files in your custom prompts folder {folder}. Modifying the files will also update the command settings.",
    },
  },

  // 设置页面
  settings: {
    // 设置分组和标题
    sections: {
      general: "General",
    },
    tabs: {
      basic: "Basic Settings",
      advanced: "Advanced Settings",
      models: "Models",
      commands: "Commands",
      about: "About",
    },
    // API Keys 相关
    apiKeys: {
      title: "API Keys",
      description: "Configure API keys for different AI providers",
      setKeys: "Set Keys",
      helpTitle: "API key required for chat and QA features",
      helpDescription:
        "To enable chat and QA functionality, please provide an API key from your selected provider.",
    },
    // API Key Dialog 相关
    apiKey: {
      dialog: {
        title: "AI Provider Settings",
        description: "Configure your AI providers by adding their API keys.",
      },
      buttons: {
        getKey: "Get {provider} Key",
      },
      descriptions: {
        addModel:
          "Add the currently selected model to model List. After adding, please check the Model Tab.",
      },
      placeholders: {
        selectModel: "Select a model",
      },
      status: {
        loading: "Loading models...",
        failed: "Failed to load models.",
        checkKey: "Check API Key or network.",
        noModels: "No models available for this provider.",
        clickToLoad: "Click to load models or expand to try again if API key was changed.",
      },
      messages: {
        modelVerified: "Model {model} verified successfully and added to your models list!",
        modelAlreadyExists:
          "Model {model} verified successfully! It already exists in your models list.",
        verificationFailed: "Model verification failed: {error}",
        selectModelFirst: "Please select a model first",
        failedToLoad: "Failed to load models for {provider}: {error}",
      },
      errors: {
        selectModelFirst: "Please select a model first",
      },
    },
    // 链类型标签
    chainType: {
      chat: "Chat",
      vaultQA: "Vault QA (Basic)",
      copilotPlus: "Copilot Plus",
      projects: "Projects (alpha)",
    },
    // 默认聊天模型
    defaultChatModel: {
      title: "Default Chat Model",
      description: "Select the Chat model to use",
      selectModel: "Select Model",
      helpTitle: "Default model is OpenRouter Gemini 2.5 Flash",
      helpDescription:
        "Set your OpenRouter API key in 'API keys' to use this model, or select a different model from another provider.",
    },
    // 默认模式
    defaultMode: {
      title: "Default Mode",
      description: "Select the default chat mode",
      help: {
        chat: "Regular chat mode for general conversations and tasks. Free to use with your own API key.",
        vaultQA:
          "Ask questions about your vault content with semantic search. Free to use with your own API key.",
        copilotPlus:
          "Covers all features of the 2 free modes, plus advanced paid features including chat context menu, advanced search, AI agents, and more. Check out",
        copilotPlusLink: "obsidiancopilot.com",
        copilotPlusEnd: "for more details.",
      },
    },
    // 插件打开位置
    openPluginIn: {
      title: "Open Plugin In",
      description: "Choose where to open the plugin",
      sidebarView: "Sidebar View",
      editor: "Editor",
    },
    language: {
      label: "Interface Language",
      description: "Select your preferred interface language",
    },
    // 对话设置
    conversationFolder: {
      title: "Default Conversation Folder Name",
      description:
        "The default folder name where chat conversations will be saved. Default is 'copilot/copilot-conversations'",
    },
    conversationTag: {
      title: "Default Conversation Tag",
      description:
        "The default tag to be used when saving a conversation. Default is 'ai-conversations'",
    },
    conversationFilename: {
      title: "Conversation Filename Template",
      description: "Customize the format of saved conversation note names.",
      helpTitle: "Note: All the following variables must be included in the template.",
      helpDescription: "Available variables:",
      variables: {
        date: "Date in YYYYMMDD format",
        time: "Time in HHMMSS format",
        topic: "Chat conversation topic",
      },
      example:
        "Example: {$date}_{$time}__{$topic} → 20250114_153232__polish_this_article_[[Readme]]",
      errors: {
        missingVariables: "Error: Missing required variables: {variables}",
        illegalCharacters: 'Error: Format contains illegal characters (\\/:*?"<>|)',
      },
      success: "Format applied successfully! Example: {example}",
      applyError: "Error applying format: {error}",
    },
    // 功能开关
    features: {
      autosaveChat: {
        title: "Autosave Chat",
        description: "Automatically saves the chat after every user message and AI response.",
      },
      generateAIChatTitle: {
        title: "Generate AI Chat Title on Save",
        description:
          "When enabled, uses an AI model to generate a concise title for saved chat notes. When disabled, uses the first 10 words of the first user message.",
      },
      includeCurrentNote: {
        title: "Include Current Note in Context Menu",
        description:
          "Automatically include the current note in the chat context menu by default when sending messages to the AI.",
      },
      imagesInMarkdown: {
        title: "Images in Markdown",
        description:
          "Pass embedded images in markdown to the AI along with the text. Only works with multimodal models.",
      },
      suggestedPrompts: {
        title: "Suggested Prompts",
        description: "Show suggested prompts in the chat view",
      },
      relevantNotes: {
        title: "Relevant Notes",
        description: "Show relevant notes in the chat view",
      },
    },
    model: {
      selectModel: "Select Model",
      selectProvider: "Select provider",
      addModel: "Add Model",
      editModel: "Edit Model",
      deleteModel: "Delete Model",
      testConnection: "Test Connection",
      customDisplayName: "Custom display name (optional)",
      organizationId: "Organization ID",
      instanceName: "Instance Name",
      deploymentName: "Deployment Name",
      embeddingDeploymentName: "Embedding Deployment Name",
      apiVersion: "API Version",
      apiKey: "API Key",
      baseUrl: "Base URL",
      modelName: "Model Name",
      // 模型设置参数
      name: "Model Name",
      provider: "Provider",
      tokenLimit: "Token limit",
      temperature: "Temperature",
      topP: "Top-P",
      frequencyPenalty: "Frequency Penalty",
      reasoningEffort: "Reasoning Effort",
      verbosity: "Verbosity",
      modelNotFoundError: "Could not find model to update:",
      // Model dialog
      dialog: {
        title: "Add Custom {type} Model",
        description: "Add a new model to your collection.",
      },
      additionalSettings: "Additional {provider} Settings",
      buttons: {
        add: "Add Model",
        verify: "Verify",
      },
      fields: {
        name: {
          label: "Model Name",
          required: "Model name is required",
          placeholder: "Enter model name (e.g. {example})",
        },
        displayName: {
          label: "Display Name",
          placeholder: "Custom display name (optional)",
          help: {
            suggestedFormat: "Suggested format:",
            providerModel: "{provider} | {model}",
            example: "Example:",
            exampleValue: "OpenAI | GPT-4",
          },
        },
        provider: {
          label: "Provider",
          placeholder: "Select provider",
        },
        baseUrl: {
          label: "Base URL",
          description: "Leave it blank, unless you are using a proxy.",
          placeholder: "https://api.example.com/v1",
        },
        apiKey: {
          label: "API Key",
          placeholder: "Enter {provider} API Key",
          getKey: "Get {provider} API Key",
        },
        capabilities: {
          label: "Model Capabilities",
          description:
            "Only used to display model capabilities, does not affect model functionality",
        },
        cors: {
          label: "CORS",
          description: "Only check this option when prompted that CORS is needed",
        },
        openai: {
          orgId: {
            label: "OpenAI Organization ID",
            description: "Enter OpenAI Organization ID if applicable",
            placeholder: "Enter OpenAI Organization ID if applicable",
          },
        },
        azure: {
          instanceName: {
            label: "Instance Name",
            required: "Instance name is required",
            placeholder: "Enter Azure OpenAI API Instance Name",
          },
          deploymentName: {
            label: "Deployment Name",
            required: "Deployment name is required",
            description: "This is your actual model, no need to pass a model name separately.",
            placeholder: "Enter Azure OpenAI API Deployment Name",
          },
          embeddingDeploymentName: {
            label: "Embedding Deployment Name",
            required: "Embedding deployment name is required",
            placeholder: "Enter Azure OpenAI API Embedding Deployment Name",
          },
          apiVersion: {
            label: "API Version",
            required: "API version is required",
            placeholder: "Enter Azure OpenAI API Version",
          },
        },
      },
    },
    // 模型表格
    modelTable: {
      refreshBuiltins: "Refresh Built-ins",
      addModel: "Add Model",
      enabled: "Enabled",
      cors: "CORS",
      headers: {
        model: "Model",
        provider: "Provider",
        capabilities: "Capabilities",
        enable: "Enable",
        actions: "Actions",
      },
    },
    // 模型编辑对话框
    modelEdit: {
      title: "Model Settings - {modelName}",
      description: "Customize model parameters",

      fields: {
        modelName: {
          label: "Model Name",
          placeholder: "Enter model name",
        },
        displayName: {
          label: "Display Name",
          placeholder: "Custom display name (optional)",
          help: {
            suggestedFormat: "Suggested format:",
            formatExample: "[Source]-[Payment]:[Pretty Model Name]",
            examples:
              "Examples:\n• [OpenAI]-[Paid]:GPT-4\n• [Anthropic]-[Paid]:Claude 3.5 Sonnet\n• [Google]-[Free]:Gemini Flash",
          },
        },
        provider: {
          label: "Provider",
        },
        baseUrl: {
          label: "Base URL",
          description: "Leave it blank, unless you are using a proxy.",
        },
        apiKey: {
          label: "API Key",
          placeholder: "Enter {provider} API Key",
          getKey: "Get {provider} API Key",
        },
        capabilities: {
          label: "Model Capabilities",
          help: "Only used to display model capabilities, does not affect model functionality",
        },
        tokenLimit: {
          label: "Token limit",
          help: "Maximum number of tokens this model can process in a single request. This includes both input and output tokens. If you're unsure, check your model provider's documentation. Common limits: GPT-4: 128,000, Claude: 200,000, Gemini Pro: 1,048,576. Setting this correctly helps with context window management.",
        },
        temperature: {
          label: "Temperature",
          help: "Controls randomness. Lower values make responses more focused and deterministic.",
        },
        topP: {
          label: "Top-P",
          help: "Controls diversity via nucleus sampling. Lower values = more focused responses.",
        },
        frequencyPenalty: {
          label: "Frequency Penalty",
          help: "Reduces repetition by penalizing tokens that appear frequently. 0 = no penalty, positive values = less repetition. Too high values may make responses less coherent. Recommended range: 0 to 0.2. Note: This setting may not be available for all models.",
        },
        reasoningEffort: {
          label: "Reasoning Effort",
          help: "Controls how much computational effort the model puts into thinking through problems. Higher levels provide more thorough analysis but take longer and cost more. Only available for reasoning models like OpenAI o1 series. Minimal: Fastest, basic reasoning. Low: Quick analysis for straightforward problems. Medium: Balanced reasoning for most tasks. High: Deep analysis for complex problems.",
        },
        verbosity: {
          label: "Verbosity",
          help: "Controls how detailed the model's responses are. Only available for reasoning models like OpenAI o1 series. Low: Concise, direct responses. Medium: Balanced detail level. High: Comprehensive, detailed explanations.",
        },
      },

      options: {
        general: {
          low: "Low",
          medium: "Medium",
          high: "High",
        },
        reasoningEffort: {
          minimal: "Minimal",
        },
      },
    },
    placeholders: {
      model: "Model",
      folderPath: "copilot/copilot-conversations",
      conversationTag: "ai-conversations",
      fileNameTemplate: "{$date}_{$time}__{$topic}",
      customPromptsPath: "copilot/copilot-custom-prompts",
      systemPrompt: "Enter your system prompt here...",
      selectModel: "Select Model",
      selectProvider: "Select provider",
      organizationId: "Enter OpenAI Organization ID if applicable",
      azureInstanceName: "Enter Azure OpenAI API Instance Name",
      azureDeploymentName: "Enter Azure OpenAI API Deployment Name",
      azureEmbeddingDeploymentName: "Enter Azure OpenAI API Embedding Deployment Name",
      azureApiVersion: "Enter Azure OpenAI API Version",
      modelNameExample: "Enter model name (e.g. gpt-4)",
      customDisplayName: "Custom display name (optional)",
      baseUrl: "https://api.example.com/v1",
      apiKey: "Enter API Key",
    },
    advanced: {
      userSystemPrompt: {
        title: "User System Prompt",
        description:
          "Customize the system prompt for all messages, may result in unexpected behavior!",
      },
      enableEncryption: {
        title: "Enable Encryption",
        description: "Enable encryption for the API keys.",
      },
      debugMode: {
        title: "Debug Mode",
        description: "Debug mode will log some debug message to the console.",
      },
      createLogFile: {
        title: "Create Log File",
        description: "Open the Copilot log file ({path}) for easy sharing when reporting issues.",
      },
    },
    models: {
      chatModels: {
        title: "Chat Models",
      },
      embeddingModels: {
        title: "Embedding Models",
      },
      conversationTurns: {
        title: "Conversation turns in context",
        description:
          "The number of previous conversation turns to include in the context. Default is 15 turns, i.e. 30 messages.",
      },
      updateError: "Could not find model to update",
      chatRefreshSuccess: "Chat models refreshed successfully",
      embeddingRefreshSuccess: "Embedding models refreshed successfully",
      copySuffix: " (copy)",
    },
    qa: {
      enableSemanticSearch: {
        title: "Enable Semantic Search",
        description:
          "Enable semantic search for meaning-based document retrieval. When disabled, uses fast lexical search only. Use 'Refresh Vault Index' or 'Force Reindex Vault' to build the embedding index.",
      },
      embeddingModel: {
        title: "Embedding Model",
        description:
          "Powers Semantic Vault Search and Relevant Notes. Enable Semantic Search to use it.",
        helpTooltip: {
          intro:
            "This model converts text into vector representations, essential for semantic search and Question Answering (QA) functionality. Changing the embedding model will:",
          requirement1: "Require rebuilding your vault's vector index",
          requirement2: "Affect semantic search quality",
          requirement3: "Impact Question Answering feature performance",
        },
      },
      maxSources: {
        title: "Max Sources",
        description:
          "Copilot goes through your vault to find relevant notes and passes the top N to the LLM. Default for N is 15. Increase if you want more notes included in the answer generation step.",
      },
      requestsPerMinute: {
        title: "Requests per Minute",
        description: "Default is 60. Decrease if you are rate limited by your embedding provider.",
      },
      embeddingBatchSize: {
        title: "Embedding Batch Size",
        description: "Default is 16. Increase if you are rate limited by your embedding provider.",
      },
      partitions: {
        title: "Partitions",
        description:
          "Number of partitions for Copilot index. Default is 1. Increase if you have issues indexing large vaults. Warning: Changes require clearing and rebuilding the index!",
      },
      inlineCitations: {
        title: "Enable Inline Citations (experimental)",
        description:
          "When enabled, AI responses will include footnote-style citations within the text and numbered sources at the end (This is an experimental feature and may not work as expected for all models.)",
      },
      autoIndexStrategy: {
        title: "Auto-Index Strategy",
        description: "Decide when you want the vault to be indexed.",
        helpTooltip: {
          intro: "Choose when to index your vault:",
          never: {
            label: "NEVER:",
            description: "Manual indexing via command or refresh only",
          },
          onStartup: {
            label: "ON STARTUP:",
            description: "Index updates when plugin loads or reloads",
          },
          onModeSwitch: {
            label: "ON MODE SWITCH:",
            description: "Updates when entering QA mode (Recommended)",
          },
          warning: "Warning: Cost implications for large vaults with paid models",
        },
      },
      lexicalSearchRamLimit: {
        title: "Lexical Search RAM Limit",
        description:
          "Maximum RAM usage for full-text search index. Lower values use less memory but may limit search performance on large vaults. Default is 100 MB.",
      },
      lexicalBoosts: {
        title: "Enable Folder and Graph Boosts",
        description:
          "Enable folder and graph-based relevance boosts for lexical search results. When disabled, provides pure keyword-based relevance scoring without folder or connection-based adjustments.",
      },
      exclusions: {
        title: "Exclusions",
        description:
          "Exclude folders, tags, note titles or file extensions from being indexed. Previously indexed files will remain until a force re-index is performed.",
        modalTitle: "Manage Exclusions",
      },
      inclusions: {
        title: "Inclusions",
        description:
          "Index only the specified paths, tags, or note titles. Exclusions take precedence over inclusions. Previously indexed files will remain until a force re-index is performed.",
        modalTitle: "Manage Inclusions",
      },
      obsidianSync: {
        title: "Enable Obsidian Sync for Copilot index",
        description:
          "If enabled, store the semantic index in .obsidian so it syncs with Obsidian Sync. If disabled, store it under .copilot/ at the vault root.",
      },
      disableIndexOnMobile: {
        title: "Disable index loading on mobile",
        description:
          "When enabled, Copilot index won't be loaded on mobile devices to save resources. Only chat mode will be available. Any existing index from desktop sync will be preserved. Uncheck to enable QA modes on mobile.",
      },
      notices: {
        embeddingModelSaved: "Embedding model saved. Enable Semantic Search to build the index.",
      },
    },
    plus: {
      licenseKey: {
        placeholder: "Enter your license key",
      },
      invalidLicenseKey: {
        error: "Invalid license key",
      },
      apply: {
        button: "Apply",
      },
      // Plus设置相关
      title: "Copilot Plus",
      active: "Active",
      joinNow: "Join Now",
      description: {
        intro:
          "Copilot Plus takes your Obsidian experience to the next level with cutting-edge AI capabilities. This premium tier unlocks advanced features:",
        features:
          "including chat context, PDF and image support, web search integration, exclusive chat and embedding models, and much more.",
        evolution:
          "Copilot Plus is evolving fast, with new features and improvements rolling out regularly. Join now to secure the lowest price and get early access!",
      },
      badge: {
        required: "Plus Required",
      },
      sections: {
        autonomousAgent: "Autonomous Agent",
        autocomplete: "Autocomplete",
      },
      autonomousAgent: {
        title: "Enable Autonomous Agent",
        description:
          "Enable autonomous agent mode in Plus chat. The AI will reason step-by-step and decide which tools to use automatically, improving response quality for complex queries.",
      },
      autocomplete: {
        sentence: {
          title: "Sentence Autocomplete",
          description: "Enable AI-powered sentence autocomplete suggestions while typing",
        },
        word: {
          title: "Word Completion",
          description:
            "Suggest completions for partially typed words based on your vault's content. Requires at least 3 characters to trigger.",
        },
        acceptKey: {
          title: "Autocomplete Accept Suggestion Key",
          description: "The key used to accept autocomplete suggestions",
          helpDescription:
            'Select the key you want to use for accepting suggestions. Default is "Tab".',
          placeholder: "Select key",
          resetButton: "Reset to Default",
        },
        keys: {
          tab: "Tab",
          space: "Space",
          rightArrow: "Right Arrow",
        },
      },
      wordIndex: {
        title: "Word Index Management",
        description:
          "Rebuild the word index to include new words from your vault. The index is automatically built when the plugin loads.",
        buttonRefresh: "Refresh Word Index",
        buttonRefreshing: "Rebuilding...",
      },
      context: {
        title: "Allow Additional Context",
        description:
          "Allow the AI to access relevant notes to provide more relevant suggestions. When off, the AI can only see the current note context.",
      },
      notices: {
        acceptKeyUpdated: "Autocomplete accept key updated to {key}",
        acceptKeyReset: "Autocomplete accept key reset to default (Tab)",
        wordIndexRebuilding: "Rebuilding word index...",
        wordIndexComplete:
          "Word index complete! Found {foundWords} words from {processedFiles} files.",
        wordIndexRebuilt: "Word index rebuilt successfully! {wordCount} unique words indexed.",
        wordIndexFailed: "Failed to refresh word index. Check console for details.",
      },
    },
  },

  // 项目相关
  project: {
    modal: {
      addProject: "Add Project",
      selectModel: "Select a model",
      enterWebUrls: "Enter web URLs, one per line",
      enterYouTubeUrls: "Enter YouTube URLs, one per line",
    },
    progress: {
      closeProgressBar: "Close Progress Bar",
      retryFailedFiles: "Retry failed files",
    },
  },

  // 索引相关
  indexing: {
    buttons: {
      stop: "Stop",
    },
    messages: {
      indexingInProgress: "Indexing in progress",
      indexingComplete: "Indexing complete",
      indexingFailed: "Indexing failed",
    },
  },

  // 模态框
  modals: {
    confirm: {
      continue: "Continue",
      cancel: "Cancel",
    },
    removeFromIndex: {
      title: "Remove Files from Copilot Index",
      filePaths: "File paths",
      remove: "Remove",
    },
    extensionInput: {
      enterPattern: "Enter the pattern",
    },
    customPattern: {
      title: "Add Custom Pattern",
      description:
        "Comma separated list of paths, tags, note titles or file extension e.g. folder1, folder1/folder2, #tag1, #tag2, [[note1]], [[note2]], *.jpg, *.excallidraw.md",
      placeholder: "Enter custom pattern...",
    },
    extension: {
      title: "Add Extension",
      noSpacesError: "Extension cannot contain spaces",
    },
    fileSelect: {
      title: "Select File",
    },
    sources: {
      title: "Sources",
    },
    plusWelcome: {
      title: "Welcome to Copilot Plus 🚀",
    },
    plusExpired: {
      title: "Thanks for being a Copilot Plus user 👋",
    },
    newChat: {
      title: "Start New Chat",
    },
    resetSettings: {
      title: "Reset Settings",
    },
    rebuildIndex: {
      title: "Rebuild Index",
    },
    semanticSearch: {
      enable: {
        title: "Enable Semantic Search",
        button: "Enable",
      },
      disable: {
        title: "Disable Semantic Search",
        button: "Disable",
      },
    },
    project: {
      new: {
        title: "New Project",
      },
      edit: {
        title: "Edit Project",
      },
      name: {
        label: "Project Name",
        required: "Project name is required",
      },
      description: {
        label: "Description",
        hint: "Briefly describe the purpose and goals of the project",
      },
      systemPrompt: {
        label: "Project System Prompt",
      },
      requiredFields: {
        error: "Please fill in all required fields",
      },
    },
    patternMatching: {
      tags: "Tags",
      extensions: "Extensions",
      folders: "Folders",
      files: "Files",
      custom: "Custom",
      addButton: "Add...",
      noPatternsSpecified: "No patterns specified",
      manageExclusions: "Manage Exclusions",
      manageInclusions: "Manage Inclusions",
    },
  },

  // 通知消息
  notifications: {
    chat: {
      sendError: "Failed to send message. Please try again.",
      cannotRegenerateFirst: "Cannot regenerate the first message.",
      messageNotFound: "Message not found.",
      regenerateError: "Failed to regenerate message. Please try again.",
      editError: "Failed to edit message. Please try again.",
      deleteError: "Failed to delete message. Please try again.",
      saveError: "Failed to save chat as note. Check console for details.",
    },
    project: {
      addedWithContext: "{name} added and context loaded",
      addedContextFailed: "{name} added but context loading failed",
      addedSuccess: "{name} added successfully",
      updateWithContext: "{name} updated and context reloaded",
      updateContextFailed: "{name} updated but context reload failed",
      updateSuccess: "{name} updated successfully",
      retrySuccess: "Retry successful: {path}",
      retryFailed: "Retry failed: {error}",
      youtubeError: "Failed to process YouTube URL {url}: {error}",
      noProjectSelected: "No project is currently selected.",
      noProjectToRebuild: "No project is currently selected to rebuild.",
      contextReloaded: 'Project context for "{name}" reloaded successfully.',
      reloadContextError: "Failed to reload project context. Check console for details.",
      cacheCleared: 'Cache for project "{name}" has been cleared.',
      contextRebuilt: 'Project context for "{name}" rebuilt successfully from scratch.',
      rebuildContextError: "Failed to force rebuild project context. Check console for details.",
      rebuildingMessage:
        "Force rebuilding context for project: {name}... This will take some time and re-fetch all data.",
      rebuildConfirm:
        'DANGER: This will permanently delete all cached data (markdown, web URLs, YouTube transcripts, and processed file content) for the project "{name}" from both memory and disk. The context will then be rebuilt from scratch, re-fetching all remote data and re-processing all local files. This cannot be undone. Are you absolutely sure?',
      rebuildConfirmTitle: "Force Rebuild Project Context",
    },
    editor: {
      noActiveLeaf: "No active leaf found.",
      failedMarkdownView: "Failed to open a markdown view.",
      messageInserted: "Message inserted into the active note.",
    },
    index: {
      disabledOnMobile: "Indexing is disabled on mobile devices",
      refreshed: "Semantic search index refreshed with {count} documents.",
      lexicalNoBuild: "Lexical search builds indexes on demand. No manual indexing required.",
      refreshError: "Failed to refresh vault index. Check console for details.",
      reindexed: "Semantic search index rebuilt with {count} documents.",
      reindexError: "Failed to force reindex vault. Check console for details.",
      reindexConfirm:
        "This will delete and rebuild your entire vault index from scratch. This operation cannot be undone. Are you sure you want to proceed?",
      reindexConfirmTitle: "Force Reindex Vault",
    },
    model: {
      createError: "Error creating model: {modelKey}",
      requiredFieldsError: "Please fill in all required fields",
      verificationSuccess: "Model verification successful!",
      verificationFailed: "Model verification failed: {error}",
    },
    restrictions: {
      nonMarkdownFiles:
        "Non-markdown files are only available in Copilot Plus mode. Please upgrade to access this file type.",
      urlProcessing:
        "URL processing is only available in Copilot Plus mode. URLs will not be processed for context.",
      unsupportedFileType: "{{extension}} files are not supported in the current mode.",
      // 限制消息
      selectedTextContextPlusOnly:
        "Selected text context is only available in Copilot Plus and Project modes",
      noTextSelected: "No text selected",
      noActiveFile: "No active file",
    },
    commands: {
      tokenCount: "Selected text contains {wordCount} words and {tokenCount} tokens.",
      // 命令通知
      totalVaultTokens: "Total tokens in your vault: {totalTokens}",
      tokenCountError: "An error occurred while counting tokens.",
      quickCommandSourceMode: "Quick command is not available in source mode.",
      noActiveEditor: "No active editor found.",
      selectTextFirst:
        "Please select some text first. Selected text is required for quick commands.",
      indexCleared: "Cleared local Copilot semantic index.",
      indexClearFailed: "Failed to clear semantic index.",
      garbageCollectSuccess:
        "Garbage collection completed. Removed {removedCount} stale documents.",
      garbageCollectFailed: "Failed to garbage collect semantic index.",
      indexBuildError: "An error occurred while building the index.",
      indexRebuildError: "An error occurred while rebuilding the index.",
      listIndexedFilesCount: "Listed {count} indexed files",
      listIndexedFilesFailed: "Failed to list indexed files.",
      cacheClearSuccess: "All Copilot caches cleared successfully",
      cacheClearFailed: "Failed to clear Copilot caches",
      logFileCreateFailed: "Failed to create Copilot log file.",
      logFileCleared: "Copilot log cleared.",
      logFileClearFailed: "Failed to clear Copilot log file.",
      autocompleteToggled: "Copilot autocomplete {status}",
      autocompleteEnabled: "enabled",
      autocompleteDisabled: "disabled",
      noSelectionRange: "Could not determine selection range",
      noChatHistoryFound: "No chat history found.",
    },
  },

  // 错误日志（开发用）
  errors: {
    chat: {
      sendMessage: "Error sending message:",
      regenerateMessage: "Error regenerating message:",
      regenerateAIResponse: "Error regenerating AI response:",
      editMessage: "Error editing message:",
      deleteMessage: "Error deleting message:",
      saveAsNote: "Error saving chat as note:",
    },
    app: {
      instanceNotAvailable: "App instance is not available.",
    },
    project: {
      alreadyExists: 'Project "{name}" already exists, please use a different name',
      notExist: 'Project "{name}" does not exist',
      loadContext: "Error loading project context:",
      reloadContext: "Error reloading project context:",
      rebuildContext: "Error force rebuilding project context:",
    },
    index: {
      refresh: "Error refreshing vault index:",
      forceReindex: "Error force reindexing vault:",
    },
    api: {
      fetchModelsFailed: "Failed to fetch models: {statusText}\n detail: {detail}",
      withoutCorsError: "\nwithout CORS Error: {error}",
      withCorsError: "\nwith CORS Error: {error}",
      modelVerificationFailed: "Model verification failed: {error}",
    },
  },

  // Debug messages
  debug: {
    messages: {
      firstFetchFailed: "First fetch attempt failed, trying with safeFetch...",
    },
    errors: {
      fetchModelsError: "Error fetching models for {provider}:",
      modelVerificationFailed: "Model verification failed:",
    },
  },

  // 右键菜单
  contextMenu: {
    copilot: {
      title: "Copilot",
    },
    addSelection: {
      title: "Add selection to chat context",
    },
    quickCommand: {
      title: "Trigger quick command",
    },
  },

  // 表单
  forms: {
    patterns: {
      enterPattern: "Enter the pattern",
    },
    partitions: {
      selectPartitions: "Select partitions",
    },
    strategy: {
      placeholder: "Strategy",
    },
  },

  // 聊天控制
  chatControls: {
    modes: {
      chatFree: "chat (free)",
      vaultQAFree: "vault QA (free)",
      copilotPlus: "copilot plus",
      projectsAlpha: "projects (alpha)",
    },
    buttons: {
      newChat: "New Chat",
      saveChatAsNote: "Save Chat as Note",
      chatHistory: "Chat History",
      advancedSettings: "Advanced Settings",
      refreshVaultIndex: "Refresh Vault Index",
      forceReindexVault: "Force Reindex Vault",
      reloadCurrentProject: "Reload Current Project",
      forceRebuildContext: "Force Rebuild Context",
    },
    toggles: {
      suggestedPrompt: "Suggested Prompt",
      relevantNote: "Relevant Note",
    },
  },

  // 建议提示词
  suggestedPrompts: {
    cardTitle: "Suggested Prompts",
    addToChat: "Add to Chat",
    activeNote: {
      title: "Active Note Insights",
      prompt1:
        "Provide three follow-up questions worded as if I'm asking you based on {activeNote}?",
      prompt2: "What key questions does {activeNote} answer?",
      prompt3: "Give me a quick recap of {activeNote} in two sentences.",
    },
    quoteNote: {
      title: "Note Link Chat",
      prompt1: "Based on [[<note>]], what improvements should we focus on next?",
      prompt2: "Summarize the key points from [[<note>]].",
      prompt3: "Summarize the recent updates from [[<note>]].",
      prompt4: "Roast my writing in [[<note>]] and give concrete actionable feedback",
    },
    fun: {
      title: "Test LLM",
      prompt1: "9.11 and 9.8, which is bigger?",
      prompt2: "What's the longest river in the world?",
      prompt3:
        "If a lead ball and a feather are dropped simultaneously from the same height, which will reach the ground first?",
    },
    qaVault: {
      title: "Vault Q&A",
      prompt1: "What insights can I gather about <topic> from my notes?",
      prompt2: "Explain <concept> based on my stored notes.",
      prompt3: "Highlight important details on <topic> from my notes.",
      prompt4:
        "Based on my notes on <topic>, what is the question that I should be asking, but am not?",
      note: "Please note that this is a retrieval-based QA. Questions should contain keywords and concepts that exist literally in your vault",
    },
    copilotPlus: {
      title: "Copilot Plus",
      prompt1: "Give me a recap of last week @vault",
      prompt2: "What are the key takeaways from my notes on <topic> @vault",
      prompt3: "Summarize <url> in under 10 bullet points",
      prompt4: "@youtube <video_url>",
      prompt5: "@websearch what are most recent updates in the AI industry",
      prompt6: "What are the key insights from this paper <arxiv_url>",
      prompt7: "What new methods are proposed in this paper [[<note_with_embedded_pdf>]]",
    },
    indexWarning: {
      prefix: "Your auto-index strategy is set to",
      never: "NEVER",
      instruction1: "Before proceeding, click the",
      refreshButton: "Refresh Index",
      instruction2: "button below or run the",
      commandName: "Copilot command: Index (refresh) vault for QA",
      instruction3: "to update the index.",
    },
  },

  // 相关笔记
  relevantNotes: {
    title: "Relevant Notes",
    addToChat: "Add to Chat",
    navigateToNote: "Navigate to Note",
    similarity: "Similarity:",
    outgoingLinks: "Outgoing links",
    backlinks: "Backlinks",
    relevanceTooltip: "Relevance is a combination of semantic similarity and links.",
    notIndexed: "Note has not been indexed",
    reindexCurrentNote: "Reindex Current Note",
    noIndexAvailable: "No index available. Click refresh to build index.",
    noRelevantNotesFound: "No relevant notes found",
    refreshedIndexFor: "Refreshed index for",
  },

  // 聊天输入
  chatInput: {
    loading: {
      projectContext: "Loading the project context...",
      processingFiles: "Processing context files...",
      manyFilesWarning: "If you have many files in context, this can take a while...",
    },
    image: {
      removeTooltip: "Remove image",
    },
    placeholder: {
      base: "Ask anything. [[ for notes. / for custom prompts. ",
      tools: "@ for tools.",
    },
    dragDrop: {
      dropImagesHere: "Drop images here...",
    },
    status: {
      generating: "Generating...",
    },
    button: {
      stop: "Stop",
      addImageTooltip: "Add image(s)",
      chat: "chat",
    },
  },

  // 工具提示
  tooltips: {
    editProject: "Edit Project",
    startChat: "Start Chat",
    deleteProject: "Delete Project",
    showSources: "Show Sources",
  },
} as const;
