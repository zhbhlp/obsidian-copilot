#!/bin/bash

echo "=== Obsidian Copilot 插件自动安装脚本 ==="
echo ""

# 定义可能的 Obsidian 插件目录路径
OBSIDIAN_PLUGINS_DIRS=(
    "$HOME/Library/Application Support/obsidian/.obsidian/plugins"
    "$HOME/.obsidian/plugins"
    "$HOME/Documents/.obsidian/plugins"
    "$HOME/Library/Mobile Documents/com~apple~CloudDocs/.obsidian/plugins"
)

# 查找 Obsidian 配置目录
OBSIDIAN_CONFIG_DIR=""
for dir in "${OBSIDIAN_PLUGINS_DIRS[@]}"; do
    if [ -d "$dir" ]; then
        OBSIDIAN_CONFIG_DIR="$dir"
        break
    fi
done

if [ -z "$OBSIDIAN_CONFIG_DIR" ]; then
    echo "❌ 未找到 Obsidian 插件目录"
    echo ""
    echo "请手动安装："
    echo "1. 打开 Obsidian"
    echo "2. 进入设置 (⌘+,)"
    echo "3. 点击左侧的 '第三方插件'"
    echo "4. 点击插件文件夹图标打开插件目录"
    echo "5. 在插件目录中创建文件夹: copilot"
    echo "6. 将以下文件复制到 copilot 文件夹中："
    echo "   - main.js"
    echo "   - manifest.json"
    echo "   - styles.css"
    echo ""
    echo "当前构建文件位置: $(pwd)"
    exit 1
fi

echo "✅ 找到 Obsidian 插件目录: $OBSIDIAN_CONFIG_DIR"
echo ""

# 创建插件目录
PLUGIN_DIR="$OBSIDIAN_CONFIG_DIR/copilot"
mkdir -p "$PLUGIN_DIR"

# 检查必需的文件是否存在
if [ ! -f "main.js" ] || [ ! -f "manifest.json" ] || [ ! -f "styles.css" ]; then
    echo "❌ 缺少必需的构建文件，请先运行 npm run build"
    exit 1
fi

# 复制文件
echo "📦 复制插件文件..."
cp main.js "$PLUGIN_DIR/"
cp manifest.json "$PLUGIN_DIR/"
cp styles.css "$PLUGIN_DIR/"

echo "✅ 插件文件已复制到: $PLUGIN_DIR"
echo ""
echo "🔧 接下来需要手动操作："
echo "1. 打开或重启 Obsidian"
echo "2. 进入设置 (⌘+,)"
echo "3. 点击左侧的 '第三方插件'"
echo "4. 找到 'Copilot' 插件并启用它"
echo "5. 配置你的 API 密钥和模型设置"
echo ""
echo "🎉 安装完成！你现在可以使用修改后的 CHUNK_SIZE=4000 的版本了"