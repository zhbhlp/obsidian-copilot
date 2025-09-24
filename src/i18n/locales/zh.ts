/**
 * 中文翻译
 */
export const zh = {
  // 通用UI文本
  common: {
    buttons: {
      save: "保存",
      cancel: "取消",
      delete: "删除",
      edit: "编辑",
      copy: "复制",
      add: "添加",
      remove: "移除",
      apply: "应用",
      close: "关闭",
      ok: "确定",
      yes: "是",
      no: "否",
      back: "返回",
      next: "下一步",
      continue: "继续",
      stop: "停止",
      submit: "提交",
      insert: "插入",
      replace: "替换",
      retry: "重试",
      refresh: "刷新",
      manage: "管理",
    },
    labels: {
      name: "名称",
      title: "标题",
      description: "描述",
      model: "模型",
      optional: "可选",
      required: "必填",
      prompt: "提示词",
      loading: "加载中...",
      saving: "保存中...",
      search: "搜索",
      filter: "过滤",
      settings: "设置",
      language: "语言",
      chat: "聊天",
      embedding: "嵌入",
    },
    toggle: "切换",
    messages: {
      copiedToClipboard: "已复制到剪贴板",
      error: "错误",
      success: "成功",
      warning: "警告",
      info: "信息",
      noResults: "未找到结果",
      tryAgain: "请重试",
      operationFailed: "操作失败",
      operationCompleted: "操作完成",
    },
    placeholders: {
      enterText: "输入文本...",
      search: "搜索...",
      selectOption: "选择选项",
      optional: "可选",
    },
    units: {
      mb: " MB",
    },
  },

  // 聊天相关
  chat: {
    buttons: {
      copy: "复制",
      edit: "编辑",
      delete: "删除",
      regenerate: "重新生成",
      showSources: "显示来源",
      insertAtCursor: "在光标处插入/替换",
      newChat: "新对话",
      saveAsNote: "保存为笔记",
      chatHistory: "对话历史",
      advancedSettings: "高级设置",
    },
    modal: {
      chatEngineNotReady: "聊天引擎未就绪。请重试。",
      systemPromptDefault: "你是一个有用的助手。你将帮助用户完成内容编辑需求。",
    },
    input: {
      followupInstructions: "输入后续指令...",
      askMeAnything: "问我任何问题...",
      removeImage: "移除图片",
    },
    toolCall: {
      accept: "接受",
      reject: "拒绝",
    },
  },

  // 自定义命令
  commands: {
    modal: {
      editCommand: "编辑命令",
    },
    form: {
      commandName: "命令名称",
      commandPrompt: "命令提示词",
      modelOptional: "模型（可选）",
      showInContextMenu: "在右键菜单中显示",
      showInSlashMenu: "在斜杠菜单中显示",
      inheritFromChatModel: "继承聊天模型设置",
    },
    placeholders: {
      enterCommandName: "输入命令名称",
      enterCommandPrompt: "输入命令提示词",
    },
    validation: {
      promptRequired: "提示词是必填的",
      nameRequired: "名称是必填的",
    },
    // 命令设置相关
    settings: {
      title: "自定义命令",
      description:
        "自定义命令是预设的提示词，你可以在编辑器中通过右键点击从上下文菜单选择它们，或在聊天中使用斜杠命令将其加载到输入框中。",
      customPromptsFolder: {
        title: "自定义提示词文件夹名称",
        description: "存储自定义提示词的文件夹",
      },
      customPromptTemplating: {
        title: "自定义提示词模板化",
        description:
          "处理提示词中的变量如 {activenote}、{foldername} 或 {#tag}。禁用以使用原始提示词。",
      },
      sortStrategy: {
        title: "自定义提示词排序策略",
        description: "斜杠命令菜单提示词的排序顺序",
      },
      labels: {
        inMenu: "在菜单中",
        inSlash: "在斜杠菜单中",
        slashCmd: "斜杠命令",
        name: "名称",
        actions: "操作",
      },
      tooltips: {
        editCommand: "编辑命令",
        copyCommand: "复制命令",
        inMenuHelp: "如果启用，该命令将在你在编辑器中右键点击时的上下文菜单中可用。",
        inSlashHelp: "如果启用，该命令将作为聊天中的斜杠命令可用。",
      },
      buttons: {
        generateDefault: "生成默认命令",
        addCmd: "添加命令",
      },
      messages: {
        noCustomPromptFiles: "未找到自定义提示词文件。",
        commandDeleteConfirm: '确定要删除命令"{title}"吗？这将永久删除命令文件且无法撤销。',
        commandDeleteTitle: "删除命令",
        generateDefaultConfirm: "这将向您的自定义提示词文件夹添加默认命令。您要继续吗？",
        generateDefaultTitle: "生成默认命令",
        commandDeleteSuccess: '命令"{title}"删除成功！',
        commandDeleteFailed: "删除命令失败。请重试。",
        commandCopyFailed: "复制命令失败。请重试。",
      },
      sortOptions: {
        recency: "最近使用",
        alphabetical: "字母顺序",
        manual: "手动排序",
      },
      infoMessage:
        "命令会自动从您的自定义提示词文件夹 {folder} 中的 .md 文件加载。修改文件也会更新命令设置。",
    },
  },

  // 设置页面
  settings: {
    // 设置分组和标题
    sections: {
      general: "基础设置",
    },
    tabs: {
      basic: "基础设置",
      advanced: "高级设置",
      models: "模型",
      commands: "命令",
      about: "关于",
    },
    // API Keys 相关
    apiKeys: {
      title: "API 密钥",
      description: "为不同的AI服务商配置API密钥",
      setKeys: "设置密钥",
      helpTitle: "聊天和问答功能需要API密钥",
      helpDescription: "要启用聊天和问答功能，请提供所选服务商的API密钥。",
    },
    // API Key Dialog 相关
    apiKey: {
      dialog: {
        title: "AI 服务商设置",
        description: "通过添加API密钥来配置您的AI服务商。",
      },
      buttons: {
        getKey: "获取 {provider} 密钥",
      },
      descriptions: {
        addModel: "将当前选择的模型添加到模型列表。添加后，请查看模型标签页。",
      },
      placeholders: {
        selectModel: "选择模型",
      },
      status: {
        loading: "加载模型中...",
        failed: "加载模型失败。",
        checkKey: "请检查API密钥或网络连接。",
        noModels: "该服务商没有可用模型。",
        clickToLoad: "点击加载模型，或如果API密钥已更改请展开重试。",
      },
      messages: {
        modelVerified: "模型 {model} 验证成功并已添加到您的模型列表！",
        modelAlreadyExists: "模型 {model} 验证成功！它已存在于您的模型列表中。",
        verificationFailed: "模型验证失败：{error}",
        selectModelFirst: "请先选择一个模型",
        failedToLoad: "加载 {provider} 模型失败：{error}",
      },
      errors: {
        selectModelFirst: "请先选择一个模型",
      },
    },
    // 链类型标签
    chainType: {
      chat: "聊天",
      vaultQA: "知识库问答（基础版）",
      copilotPlus: "Copilot Plus",
      projects: "项目模式（测试版）",
    },
    // 默认聊天模型
    defaultChatModel: {
      title: "默认聊天模型",
      description: "选择要使用的聊天模型",
      selectModel: "选择模型",
      helpTitle: "默认模型是 OpenRouter Gemini 2.5 Flash",
      helpDescription:
        "在'API密钥'中设置您的OpenRouter API密钥以使用此模型，或选择其他服务商的不同模型。",
    },
    // 默认模式
    defaultMode: {
      title: "默认模式",
      description: "选择默认的聊天模式",
      help: {
        chat: "用于常规对话和任务的聊天模式。使用您自己的API密钥免费使用。",
        vaultQA: "使用语义搜索询问您的知识库内容。使用您自己的API密钥免费使用。",
        copilotPlus:
          "包含2个免费模式的所有功能，以及高级付费功能，包括聊天上下文菜单、高级搜索、AI代理等。查看",
        copilotPlusLink: "obsidiancopilot.com",
        copilotPlusEnd: "了解更多详情。",
      },
    },
    // 插件打开位置
    openPluginIn: {
      title: "插件打开位置",
      description: "选择插件的打开位置",
      sidebarView: "侧边栏视图",
      editor: "编辑器",
    },
    language: {
      label: "界面语言",
      description: "选择您的首选界面语言",
    },
    // 对话设置
    conversationFolder: {
      title: "默认对话文件夹名称",
      description: "聊天对话将保存的默认文件夹名称。默认为 'copilot/copilot-conversations'",
    },
    conversationTag: {
      title: "默认对话标签",
      description: "保存对话时使用的默认标签。默认为 'ai-conversations'",
    },
    conversationFilename: {
      title: "对话文件名模板",
      description: "自定义保存的对话笔记名称格式。",
      helpTitle: "注意：模板中必须包含以下所有变量。",
      helpDescription: "可用变量：",
      variables: {
        date: "YYYYMMDD格式的日期",
        time: "HHMMSS格式的时间",
        topic: "聊天对话主题",
      },
      example: "示例：{$date}_{$time}__{$topic} → 20250114_153232__polish_this_article_[[Readme]]",
      errors: {
        missingVariables: "错误：缺少必需变量：{variables}",
        illegalCharacters: '错误：格式包含非法字符 (\\/:*?"<>|)',
      },
      success: "格式应用成功！示例：{example}",
      applyError: "应用格式时出错：{error}",
    },
    // 功能开关
    features: {
      autosaveChat: {
        title: "自动保存聊天",
        description: "在每条用户消息和AI回复后自动保存聊天。",
      },
      generateAIChatTitle: {
        title: "保存时生成AI聊天标题",
        description:
          "启用时，使用AI模型为保存的聊天笔记生成简洁标题。禁用时，使用第一条用户消息的前10个词。",
      },
      includeCurrentNote: {
        title: "在上下文菜单中包含当前笔记",
        description: "向AI发送消息时默认在聊天上下文菜单中自动包含当前笔记。",
      },
      imagesInMarkdown: {
        title: "Markdown中的图像",
        description: "将markdown中嵌入的图像连同文本一起传递给AI。仅适用于多模态模型。",
      },
      suggestedPrompts: {
        title: "建议提示词",
        description: "在聊天视图中显示建议提示词",
      },
      relevantNotes: {
        title: "相关笔记",
        description: "在聊天视图中显示相关笔记",
      },
    },
    model: {
      selectModel: "选择模型",
      selectProvider: "选择提供商",
      addModel: "添加模型",
      editModel: "编辑模型",
      deleteModel: "删除模型",
      testConnection: "测试连接",
      customDisplayName: "自定义显示名称（可选）",
      organizationId: "组织ID",
      instanceName: "实例名称",
      deploymentName: "部署名称",
      embeddingDeploymentName: "嵌入模型部署名称",
      apiVersion: "API版本",
      apiKey: "API密钥",
      baseUrl: "基础URL",
      modelName: "模型名称",
      // 模型设置参数
      name: "模型名称",
      provider: "服务商",
      tokenLimit: "Token限制",
      temperature: "温度",
      topP: "Top-P",
      frequencyPenalty: "频率惩罚",
      reasoningEffort: "推理强度",
      verbosity: "详细程度",
      modelNotFoundError: "找不到要更新的模型：",
      // 模型对话框
      dialog: {
        title: "添加自定义{type}模型",
        description: "将新模型添加到您的集合中。",
      },
      additionalSettings: "附加{provider}设置",
      buttons: {
        add: "添加模型",
        verify: "验证",
      },
      fields: {
        name: {
          label: "模型名称",
          required: "模型名称是必填的",
          placeholder: "输入模型名称（如{example}）",
        },
        displayName: {
          label: "显示名称",
          placeholder: "自定义显示名称（可选）",
          help: {
            suggestedFormat: "建议格式：",
            providerModel: "{provider} | {model}",
            example: "例如：",
            exampleValue: "OpenAI | GPT-4",
          },
        },
        provider: {
          label: "提供商",
          placeholder: "选择提供商",
        },
        baseUrl: {
          label: "基础URL",
          description: "留空，除非您使用代理。",
          placeholder: "https://api.example.com/v1",
        },
        apiKey: {
          label: "API密钥",
          placeholder: "输入{provider} API密钥",
          getKey: "获取{provider} API密钥",
        },
        capabilities: {
          label: "模型能力",
          description: "仅用于显示模型能力，不影响模型功能",
        },
        cors: {
          label: "CORS",
          description: "仅在提示需要CORS时才选中此选项",
        },
        openai: {
          orgId: {
            label: "OpenAI组织ID",
            description: "如果适用，请输入OpenAI组织ID",
            placeholder: "输入OpenAI组织ID（如果适用）",
          },
        },
        azure: {
          instanceName: {
            label: "实例名称",
            required: "实例名称是必填的",
            placeholder: "输入Azure OpenAI API实例名称",
          },
          deploymentName: {
            label: "部署名称",
            required: "部署名称是必填的",
            description: "这是您的实际模型，无需单独传递模型名称。",
            placeholder: "输入Azure OpenAI API部署名称",
          },
          embeddingDeploymentName: {
            label: "嵌入部署名称",
            required: "嵌入部署名称是必填的",
            placeholder: "输入Azure OpenAI API嵌入部署名称",
          },
          apiVersion: {
            label: "API版本",
            required: "API版本是必填的",
            placeholder: "输入Azure OpenAI API版本",
          },
        },
      },
    },
    // 模型表格
    modelTable: {
      refreshBuiltins: "刷新内置模型",
      addModel: "添加模型",
      enabled: "已启用",
      cors: "CORS",
      headers: {
        model: "模型",
        provider: "服务商",
        capabilities: "功能",
        enable: "启用",
        actions: "操作",
      },
    },
    // 模型编辑对话框
    modelEdit: {
      title: "模型设置 - {modelName}",
      description: "自定义模型参数",

      fields: {
        modelName: {
          label: "模型名称",
          placeholder: "输入模型名称",
        },
        displayName: {
          label: "显示名称",
          placeholder: "自定义显示名称（可选）",
          help: {
            suggestedFormat: "建议格式：",
            formatExample: "[来源]-[付费状况]:[模型名称]",
            examples:
              "示例：\n• [OpenAI]-[付费]:GPT-4\n• [Anthropic]-[付费]:Claude 3.5 Sonnet\n• [Google]-[免费]:Gemini Flash",
          },
        },
        provider: {
          label: "服务商",
        },
        baseUrl: {
          label: "基础URL",
          description: "除非您使用代理，否则请留空。",
        },
        apiKey: {
          label: "API密钥",
          placeholder: "输入 {provider} API密钥",
          getKey: "获取 {provider} API密钥",
        },
        capabilities: {
          label: "模型功能",
          help: "仅用于显示模型功能，不会影响模型实际功能",
        },
        tokenLimit: {
          label: "令牌限制",
          help: "此模型在单个请求中可以处理的最大令牌数量。这包括输入和输出令牌。如果您不确定，请查看模型提供商的文档。常见限制：GPT-4: 128,000，Claude: 200,000，Gemini Pro: 1,048,576。正确设置有助于上下文窗口管理。",
        },
        temperature: {
          label: "温度",
          help: "控制随机性。较低的值使响应更专注和确定性。",
        },
        topP: {
          label: "Top-P",
          help: "通过核采样控制多样性。较低的值 = 更专注的响应。",
        },
        frequencyPenalty: {
          label: "频率惩罚",
          help: "通过惩罚频繁出现的令牌来减少重复。0 = 无惩罚，正值 = 较少重复。过高的值可能使响应不太连贯。建议范围：0 到 0.2。注意：此设置可能不适用于所有模型。",
        },
        reasoningEffort: {
          label: "推理强度",
          help: "控制模型思考问题时投入的计算努力程度。更高的级别提供更彻底的分析，但需要更长时间和更多成本。仅适用于推理模型，如 OpenAI o1 系列。最小：最快，基本推理。低：针对简单问题的快速分析。中等：大多数任务的平衡推理。高：复杂问题的深入分析。",
        },
        verbosity: {
          label: "详细程度",
          help: "控制模型响应的详细程度。仅适用于推理模型，如 OpenAI o1 系列。低：简洁、直接的响应。中等：平衡的详细级别。高：全面、详细的解释。",
        },
      },

      options: {
        general: {
          low: "低",
          medium: "中等",
          high: "高",
        },
        reasoningEffort: {
          minimal: "最小",
        },
      },
    },
    placeholders: {
      model: "模型",
      folderPath: "copilot/copilot-conversations",
      conversationTag: "ai-conversations",
      fileNameTemplate: "{$date}_{$time}__{$topic}",
      customPromptsPath: "copilot/copilot-custom-prompts",
      systemPrompt: "在此输入您的系统提示词...",
      selectModel: "选择模型",
      selectProvider: "选择提供商",
      organizationId: "输入OpenAI组织ID（如适用）",
      azureInstanceName: "输入Azure OpenAI API实例名称",
      azureDeploymentName: "输入Azure OpenAI API部署名称",
      azureEmbeddingDeploymentName: "输入Azure OpenAI API嵌入模型部署名称",
      azureApiVersion: "输入Azure OpenAI API版本",
      modelNameExample: "输入模型名称（如 gpt-4）",
      customDisplayName: "自定义显示名称（可选）",
      baseUrl: "https://api.example.com/v1",
      apiKey: "输入API密钥",
    },
    advanced: {
      userSystemPrompt: {
        title: "用户系统提示词",
        description: "自定义所有消息的系统提示词，可能导致意外行为！",
      },
      enableEncryption: {
        title: "启用加密",
        description: "为API密钥启用加密。",
      },
      debugMode: {
        title: "调试模式",
        description: "调试模式将在控制台输出一些调试消息。",
      },
      createLogFile: {
        title: "创建日志文件",
        description: "打开 Copilot 日志文件 ({path})，方便在报告问题时分享。",
      },
    },
    models: {
      chatModels: {
        title: "聊天模型",
      },
      embeddingModels: {
        title: "嵌入模型",
      },
      conversationTurns: {
        title: "上下文中的对话轮数",
        description: "包含在上下文中的先前对话轮数。默认为15轮，即30条消息。",
      },
      updateError: "找不到要更新的模型",
      chatRefreshSuccess: "聊天模型刷新成功",
      embeddingRefreshSuccess: "嵌入模型刷新成功",
      copySuffix: " (副本)",
    },
    qa: {
      enableSemanticSearch: {
        title: "启用语义搜索",
        description:
          "启用基于语义的文档检索。禁用时，仅使用快速词法搜索。使用'刷新库索引'或'强制重新索引库'来构建嵌入索引。",
      },
      embeddingModel: {
        title: "嵌入模型",
        description: "为语义库搜索和相关笔记提供支持。启用语义搜索以使用它。",
        helpTooltip: {
          intro: "此模型将文本转换为向量表示，对语义搜索和问答(QA)功能至关重要。更改嵌入模型将：",
          requirement1: "需要重新构建您库的向量索引",
          requirement2: "影响语义搜索质量",
          requirement3: "影响问答功能性能",
        },
      },
      maxSources: {
        title: "最大来源数",
        description:
          "Copilot遍历您的库以查找相关笔记，并将前N个传递给LLM。N的默认值为15。如果您希望在答案生成步骤中包含更多笔记，请增加此值。",
      },
      requestsPerMinute: {
        title: "每分钟请求数",
        description: "默认为60。如果您被嵌入提供商限制请求频率，请减少此值。",
      },
      embeddingBatchSize: {
        title: "嵌入批处理大小",
        description: "默认为16。如果您被嵌入提供商限制请求频率，请增加此值。",
      },
      partitions: {
        title: "分区数量",
        description:
          "Copilot索引的分区数量。默认为1。如果您在索引大型库时遇到问题，请增加此值。警告：更改需要清除并重建索引！",
      },
      inlineCitations: {
        title: "启用内联引用（实验性）",
        description:
          "启用时，AI响应将在文本内包含脚注样式引用，并在末尾包含编号来源（这是一个实验性功能，可能不适用于所有模型）。",
      },
      autoIndexStrategy: {
        title: "自动索引策略",
        description: "决定何时索引您的库。",
        helpTooltip: {
          intro: "选择何时索引您的库：",
          never: {
            label: "从不：",
            description: "仅通过命令或刷新进行手动索引",
          },
          onStartup: {
            label: "启动时：",
            description: "插件加载或重新加载时更新索引",
          },
          onModeSwitch: {
            label: "模式切换时：",
            description: "进入问答模式时更新（推荐）",
          },
          warning: "警告：对于使用付费模型的大型库存在成本影响",
        },
      },
      lexicalSearchRamLimit: {
        title: "词法搜索RAM限制",
        description:
          "全文搜索索引的最大RAM使用量。较低的值使用更少的内存，但可能限制大型库的搜索性能。默认为100MB。",
      },
      lexicalBoosts: {
        title: "启用文件夹和图形增强",
        description:
          "为词法搜索结果启用基于文件夹和图形的相关性增强。禁用时，提供纯关键词相关性评分，不进行文件夹或连接调整。",
      },
      exclusions: {
        title: "排除项",
        description:
          "从索引中排除文件夹、标签、笔记标题或文件扩展名。之前索引的文件将保留，直到执行强制重新索引。",
        modalTitle: "管理排除项",
      },
      inclusions: {
        title: "包含项",
        description:
          "仅索引指定的路径、标签或笔记标题。排除项优先于包含项。之前索引的文件将保留，直到执行强制重新索引。",
        modalTitle: "管理包含项",
      },
      obsidianSync: {
        title: "为Copilot索引启用Obsidian同步",
        description:
          "如果启用，将语义索引存储在.obsidian中，以便与Obsidian同步同步。如果禁用，将其存储在库根目录的.copilot/下。",
      },
      disableIndexOnMobile: {
        title: "在移动设备上禁用索引加载",
        description:
          "启用时，Copilot索引不会在移动设备上加载以节省资源。仅聊天模式可用。来自桌面同步的任何现有索引将被保留。取消选中以在移动设备上启用问答模式。",
      },
      notices: {
        embeddingModelSaved: "嵌入模型已保存。启用语义搜索以构建索引。",
      },
    },
    plus: {
      licenseKey: {
        placeholder: "输入您的许可证密钥",
      },
      invalidLicenseKey: {
        error: "无效的许可证密钥",
      },
      apply: {
        button: "应用",
      },
      // Plus设置相关
      title: "Copilot Plus",
      active: "已激活",
      joinNow: "立即加入",
      description: {
        intro:
          "Copilot Plus 将您的 Obsidian 体验提升到新高度，拥有尖端的 AI 功能。这个高级版本解锁了高级功能：",
        features: "包括聊天上下文、PDF 和图像支持、网页搜索集成、专属聊天和嵌入模型等等。",
        evolution:
          "Copilot Plus 发展迅速，新功能和改进不断推出。立即加入，享受最低价格并获得抢先体验！",
      },
      badge: {
        required: "需要Plus",
      },
      sections: {
        autonomousAgent: "自主代理",
        autocomplete: "自动完成",
      },
      autonomousAgent: {
        title: "启用自主代理",
        description:
          "在Plus聊天中启用自主代理模式。AI将逐步推理并自动决定使用哪些工具，从而改善复杂查询的响应质量。",
      },
      autocomplete: {
        sentence: {
          title: "句子自动完成",
          description: "在输入时启用AI驱动的句子自动完成建议",
        },
        word: {
          title: "词语补全",
          description: "根据您的知识库内容建议部分输入词语的补全。至少需要3个字符才能触发。",
        },
        acceptKey: {
          title: "自动完成接受建议键",
          description: "用于接受自动完成建议的按键",
          helpDescription: '选择您想用于接受建议的按键。默认为"Tab"。',
          placeholder: "选择按键",
          resetButton: "重置为默认",
        },
        keys: {
          tab: "Tab",
          space: "空格",
          rightArrow: "右箭头",
        },
      },
      wordIndex: {
        title: "词汇索引管理",
        description: "重建词汇索引以包含您知识库中的新词汇。索引会在插件加载时自动构建。",
        buttonRefresh: "刷新词汇索引",
        buttonRefreshing: "重建中...",
      },
      context: {
        title: "允许额外上下文",
        description: "允许AI访问相关笔记以提供更相关的建议。关闭时，AI只能看到当前笔记上下文。",
      },
      notices: {
        acceptKeyUpdated: "自动完成接受键已更新为 {key}",
        acceptKeyReset: "自动完成接受键已重置为默认 (Tab)",
        wordIndexRebuilding: "正在重建词汇索引...",
        wordIndexComplete:
          "词汇索引重建完成！从 {processedFiles} 个文件中找到 {foundWords} 个词汇。",
        wordIndexRebuilt: "词汇索引重建成功！共索引了 {count} 个独特词汇。",
        wordIndexFailed: "词汇索引重建失败。请查看控制台了解详情。",
      },
    },
  },

  // 项目相关
  project: {
    modal: {
      addProject: "添加项目",
      selectModel: "选择模型",
      enterWebUrls: "输入网页URL，每行一个",
      enterYouTubeUrls: "输入YouTube URL，每行一个",
    },
    progress: {
      closeProgressBar: "关闭进度条",
      retryFailedFiles: "重试失败的文件",
    },
  },

  // 索引相关
  indexing: {
    buttons: {
      stop: "停止",
    },
    messages: {
      indexingInProgress: "索引进行中",
      indexingComplete: "索引完成",
      indexingFailed: "索引失败",
    },
  },

  // 模态框
  modals: {
    confirm: {
      continue: "继续",
      cancel: "取消",
    },
    removeFromIndex: {
      title: "从Copilot索引中移除文件",
      filePaths: "文件路径",
      remove: "移除",
    },
    extensionInput: {
      enterPattern: "输入模式",
    },
    customPattern: {
      title: "添加自定义模式",
      description:
        "用逗号分隔的路径、标签、笔记标题或文件扩展名列表，例如：folder1, folder1/folder2, #tag1, #tag2, [[note1]], [[note2]], *.jpg, *.excallidraw.md",
      placeholder: "输入自定义模式...",
    },
    extension: {
      title: "添加扩展名",
      noSpacesError: "扩展名不能包含空格",
    },
    fileSelect: {
      title: "选择文件",
    },
    sources: {
      title: "来源",
    },
    plusWelcome: {
      title: "欢迎使用Copilot Plus 🚀",
    },
    plusExpired: {
      title: "感谢您成为Copilot Plus用户 👋",
    },
    newChat: {
      title: "开始新对话",
    },
    resetSettings: {
      title: "重置设置",
    },
    rebuildIndex: {
      title: "重建索引",
    },
    semanticSearch: {
      enable: {
        title: "启用语义搜索",
        button: "启用",
      },
      disable: {
        title: "禁用语义搜索",
        button: "禁用",
      },
    },
    project: {
      new: {
        title: "新建项目",
      },
      edit: {
        title: "编辑项目",
      },
      name: {
        label: "项目名称",
        required: "项目名称是必填的",
      },
      description: {
        label: "描述",
        hint: "简要描述项目的目标和用途",
      },
      systemPrompt: {
        label: "项目系统提示词",
      },
      requiredFields: {
        error: "请填写所有必填字段",
      },
    },
    patternMatching: {
      tags: "标签",
      extensions: "扩展名",
      folders: "文件夹",
      files: "文件",
      custom: "自定义",
      addButton: "添加...",
      noPatternsSpecified: "未指定任何模式",
    },
  },

  // 通知消息
  notifications: {
    chat: {
      sendError: "发送消息失败。请重试。",
      cannotRegenerateFirst: "无法重新生成第一条消息。",
      messageNotFound: "未找到消息。",
      regenerateError: "重新生成消息失败。请重试。",
      editError: "编辑消息失败。请重试。",
      deleteError: "删除消息失败。请重试。",
      saveError: "保存聊天为笔记失败。请查看控制台了解详情。",
    },
    project: {
      addedWithContext: "{name} 已添加并加载上下文",
      addedContextFailed: "{name} 已添加但上下文加载失败",
      addedSuccess: "{name} 添加成功",
      updateWithContext: "{name} 已更新并重新加载上下文",
      updateContextFailed: "{name} 已更新但上下文重载失败",
      updateSuccess: "{name} 更新成功",
      retrySuccess: "重试成功：{path}",
      retryFailed: "重试失败：{error}",
      youtubeError: "处理YouTube URL {url} 失败：{error}",
      noProjectSelected: "当前没有选中的项目。",
      noProjectToRebuild: "当前没有选中的项目进行重建。",
      contextReloaded: '项目 "{name}" 的上下文重新加载成功。',
      reloadContextError: "重新加载项目上下文失败。请查看控制台了解详情。",
      cacheCleared: '项目 "{name}" 的缓存已清除。',
      contextRebuilt: '项目 "{name}" 的上下文已从头重建成功。',
      rebuildContextError: "强制重建项目上下文失败。请查看控制台了解详情。",
      rebuildingMessage: "强制重建项目：{name} 的上下文... 这将花费一些时间并重新获取所有数据。",
      rebuildConfirm:
        '危险：这将永久删除项目 "{name}" 的所有缓存数据（markdown、网页URL、YouTube转录和处理过的文件内容），包括内存和磁盘中的数据。上下文将从头重建，重新获取所有远程数据并重新处理所有本地文件。此操作无法撤销。您确定要继续吗？',
      rebuildConfirmTitle: "强制重建项目上下文",
    },
    editor: {
      noActiveLeaf: "未找到活动页面。",
      failedMarkdownView: "无法打开Markdown视图。",
      messageInserted: "消息已插入到当前笔记中。",
    },
    index: {
      disabledOnMobile: "移动设备上禁用索引功能",
      refreshed: "语义搜索索引已刷新，共 {count} 个文档。",
      lexicalNoBuild: "词法搜索按需构建索引。无需手动索引。",
      refreshError: "刷新索引失败。请查看控制台了解详情。",
      reindexed: "语义搜索索引已重建，共 {count} 个文档。",
      reindexError: "强制重新索引失败。请查看控制台了解详情。",
      reindexConfirm: "这将删除并从头重建整个库索引。此操作无法撤销。您确定要继续吗？",
      reindexConfirmTitle: "强制重新索引库",
    },
    model: {
      createError: "创建模型时出错：{modelKey}",
      requiredFieldsError: "请填写所有必填字段",
      verificationSuccess: "模型验证成功！",
      verificationFailed: "模型验证失败：{error}",
    },
    restrictions: {
      nonMarkdownFiles: "非Markdown文件仅在Copilot Plus模式下可用。请升级以访问此文件类型。",
      urlProcessing: "URL处理仅在Copilot Plus模式下可用。URL将不会被处理为上下文。",
      unsupportedFileType: "{{extension}} 文件在当前模式下不受支持。",
      // 限制消息
      selectedTextContextPlusOnly: "选中文本上下文仅在Copilot Plus和项目模式下可用",
      noTextSelected: "未选择文本",
      noActiveFile: "没有活动文件",
    },
    commands: {
      tokenCount: "所选文本包含 {wordCount} 个单词和 {tokenCount} 个token。",
      // 命令通知
      totalVaultTokens: "你的知识库总token数：{totalTokens}",
      tokenCountError: "计算token时发生错误。",
      quickCommandSourceMode: "源码模式下不可用快速命令。",
      noActiveEditor: "未找到活动编辑器。",
      selectTextFirst: "请先选择一些文本。快速命令需要选中文本。",
      indexCleared: "已清除本地Copilot语义索引。",
      indexClearFailed: "清除语义索引失败。",
      garbageCollectSuccess: "垃圾回收完成。已删除 {removedCount} 个过期文档。",
      garbageCollectFailed: "语义索引垃圾回收失败。",
      indexBuildError: "构建索引时发生错误。",
      indexRebuildError: "重建索引时发生错误。",
      listIndexedFilesCount: "已列出 {count} 个已索引文件",
      listIndexedFilesFailed: "列出已索引文件失败。",
      cacheClearSuccess: "所有Copilot缓存已成功清除",
      cacheClearFailed: "清除Copilot缓存失败",
      logFileCreateFailed: "创建Copilot日志文件失败。",
      logFileCleared: "Copilot日志已清除。",
      logFileClearFailed: "清除Copilot日志文件失败。",
      autocompleteToggled: "Copilot自动完成已{status}",
      autocompleteEnabled: "启用",
      autocompleteDisabled: "禁用",
      noSelectionRange: "无法确定选择范围",
      noChatHistoryFound: "未找到聊天历史。",
    },
  },

  // 错误日志（开发用）
  errors: {
    chat: {
      sendMessage: "发送消息时出错：",
      regenerateMessage: "重新生成消息时出错：",
      regenerateAIResponse: "重新生成AI响应时出错：",
      editMessage: "编辑消息时出错：",
      deleteMessage: "删除消息时出错：",
      saveAsNote: "保存聊天为笔记时出错：",
    },
    app: {
      instanceNotAvailable: "应用实例不可用。",
    },
    project: {
      alreadyExists: '项目 "{name}" 已存在，请使用其他名称',
      notExist: '项目 "{name}" 不存在',
      loadContext: "加载项目上下文时出错：",
      reloadContext: "重新加载项目上下文时出错：",
      rebuildContext: "强制重建项目上下文时出错：",
    },
    index: {
      refresh: "刷新库索引时出错：",
      forceReindex: "强制重新索引库时出错：",
    },
    api: {
      fetchModelsFailed: "获取模型失败：{statusText}\n详情：{detail}",
      withoutCorsError: "\n无CORS错误：{error}",
      withCorsError: "\n使用CORS错误：{error}",
      modelVerificationFailed: "模型验证失败：{error}",
    },
  },

  // 调试消息
  debug: {
    messages: {
      firstFetchFailed: "首次获取尝试失败，正在尝试使用safeFetch...",
    },
    errors: {
      fetchModelsError: "为{provider}获取模型时出错：",
      modelVerificationFailed: "模型验证失败：",
    },
  },

  // 右键菜单
  contextMenu: {
    copilot: {
      title: "Copilot",
    },
    addSelection: {
      title: "将选中内容添加到聊天上下文",
    },
    quickCommand: {
      title: "触发快速命令",
    },
  },

  // 表单
  forms: {
    patterns: {
      enterPattern: "输入模式",
    },
    partitions: {
      selectPartitions: "选择分区",
    },
    strategy: {
      placeholder: "策略",
    },
  },

  // 聊天控制
  chatControls: {
    modes: {
      chatFree: "聊天 (免费)",
      vaultQAFree: "知识库问答 (免费)",
      copilotPlus: "copilot plus",
      projectsAlpha: "项目 (测试版)",
    },
    buttons: {
      newChat: "新对话",
      saveChatAsNote: "保存为笔记",
      chatHistory: "对话历史",
      advancedSettings: "高级设置",
      refreshVaultIndex: "刷新库索引",
      forceReindexVault: "强制重新索引库",
      reloadCurrentProject: "重新加载当前项目",
      forceRebuildContext: "强制重建上下文",
    },
    toggles: {
      suggestedPrompt: "建议提示词",
      relevantNote: "相关笔记",
    },
  },

  // 建议提示词
  suggestedPrompts: {
    cardTitle: "建议提示词",
    addToChat: "添加到聊天",
    activeNote: {
      title: "活动笔记洞察",
      prompt1: "基于 {activeNote} 提供三个后续问题，就像我在问你一样？",
      prompt2: "{activeNote} 回答了哪些关键问题？",
      prompt3: "用两句话快速概括 {activeNote}。",
    },
    quoteNote: {
      title: "笔记链接聊天",
      prompt1: "基于 [[<note>]]，我们接下来应该关注哪些改进？",
      prompt2: "总结 [[<note>]] 的关键点。",
      prompt3: "总结 [[<note>]] 的最近更新。",
      prompt4: "批评我在 [[<note>]] 中的写作，并给出具体可操作的反馈",
    },
    fun: {
      title: "测试 LLM",
      prompt1: "9.11 和 9.8，哪个更大？",
      prompt2: "世界上最长的河流是什么？",
      prompt3: "如果从同一高度同时释放一个铅球和一根羽毛，哪个会先着地？",
    },
    qaVault: {
      title: "知识库问答",
      prompt1: "我能从笔记中收集到关于 <topic> 的哪些见解？",
      prompt2: "根据我存储的笔记解释 <concept>。",
      prompt3: "突出显示笔记中关于 <topic> 的重要细节。",
      prompt4: "根据我关于 <topic> 的笔记，我应该提出但还没有提出的问题是什么？",
      note: "请注意，这是基于检索的问答。问题应包含在你的知识库中实际存在的关键词和概念",
    },
    copilotPlus: {
      title: "Copilot Plus",
      prompt1: "给我总结一下上周 @vault 的内容",
      prompt2: "从我关于 <topic> 的笔记中提取关键要点 @vault",
      prompt3: "用不超过10个要点总结 <url>",
      prompt4: "@youtube <video_url>",
      prompt5: "@websearch AI 行业有哪些最新动态",
      prompt6: "这篇论文的关键见解是什么 <arxiv_url>",
      prompt7: "这篇论文提出了哪些新方法 [[<note_with_embedded_pdf>]]",
    },
    indexWarning: {
      prefix: "你的自动索引策略设置为",
      never: "从不",
      instruction1: "在继续之前，请点击下面的",
      refreshButton: "刷新索引",
      instruction2: "按钮或运行",
      commandName: "Copilot 命令：索引（刷新）知识库用于问答",
      instruction3: "来更新索引。",
    },
  },

  // 相关笔记
  relevantNotes: {
    title: "相关笔记",
    addToChat: "添加到聊天",
    navigateToNote: "导航到笔记",
    similarity: "相似度：",
    outgoingLinks: "出站链接",
    backlinks: "反向链接",
    relevanceTooltip: "相关性是语义相似度和链接的组合。",
    notIndexed: "笔记尚未被索引",
    reindexCurrentNote: "重新索引当前笔记",
    noIndexAvailable: "无可用索引。点击刷新以构建索引。",
    noRelevantNotesFound: "未找到相关笔记",
    refreshedIndexFor: "已刷新索引：",
  },

  // 聊天输入
  chatInput: {
    loading: {
      projectContext: "正在加载项目上下文...",
      processingFiles: "正在处理上下文文件...",
      manyFilesWarning: "如果上下文中有很多文件，这可能需要一段时间...",
    },
    image: {
      removeTooltip: "移除图片",
    },
    placeholder: {
      base: "随便问什么。[[ 用于笔记。/ 用于自定义提示。",
      tools: "@ 用于工具。",
    },
    dragDrop: {
      dropImagesHere: "将图片放到这里...",
    },
    status: {
      generating: "生成中...",
    },
    button: {
      stop: "停止",
      addImageTooltip: "添加图片",
      chat: "发送",
    },
  },

  // 工具提示
  tooltips: {
    editProject: "编辑项目",
    startChat: "开始聊天",
    deleteProject: "删除项目",
    showSources: "显示来源",
  },
} as const;
