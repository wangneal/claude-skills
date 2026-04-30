# 安装指南

## ⚠️ 安装前须知

本插件会向您的 Claude Code 环境添加以下内容：

### 添加的位置

```
C:\Users\Neal\.claude\
├── agents/                      # 添加 4 个代理文件
│   ├── kd-sdk-researcher.md
│   ├── kd-code-generator.md
│   ├── kd-standards-checker.md
│   └── kd-doc-writer.md
│
├── skills/                      # 添加 7 个技能目录
│   ├── kd-init/
│   ├── kd-research/
│   ├── kd-gen/
│   ├── kd-check/
│   ├── kd-template/
│   ├── kd-list/
│   └── kd-doc/
│
└── kingdee-dev/                 # 添加核心引擎
    ├── workflows/
    ├── references/
    ├── templates/
    └── sdk/
```

### 不会修改的内容

- ✅ 不会修改现有的 GSD 或其他插件
- ✅ 不会修改 Claude Code 核心配置
- ✅ 不会影响现有项目

## 🚀 安装方式

### 方式 1: 自动安装（推荐）

```bash
# 在插件目录中运行
node install.js
```

安装脚本会：
1. 检查 Claude Code 配置目录是否存在
2. 备份现有文件（如果存在）
3. 复制所有文件到正确位置
4. 创建符号链接（如果需要）
5. 验证安装成功

### 方式 2: 手动安装

如果自动安装失败，可以手动复制：

```bash
# 1. 复制 agents
cp -r agents/* ~/.claude/agents/

# 2. 复制 skills
cp -r skills/* ~/.claude/skills/

# 3. 复制 engine
cp -r engine ~/.claude/kingdee-dev
```

### 方式 3: 符号链接（开发模式）

如果您想继续开发插件，可以创建符号链接：

```bash
# Windows (以管理员身份运行)
mklink /D "C:\Users\Neal\.claude\kingdee-dev" "E:\projects\kingdee-dev-plugin\engine"

# macOS/Linux
ln -s "E:\projects\kingdee-dev-plugin\engine" ~/.claude/kingdee-dev
```

## ✅ 验证安装

安装完成后，在 Claude Code 中测试：

```
用户: /kd-list
```

如果看到 SDK 模块列表，说明安装成功！

## 🗑️ 卸载

如果要卸载插件：

```bash
# 删除 agents
rm ~/.claude/agents/kd-*.md

# 删除 skills
rm -rf ~/.claude/skills/kd-*

# 删除 engine
rm -rf ~/.claude/kingdee-dev
```

## 📞 支持

如果遇到问题，请检查：

1. Claude Code 版本 >= 最新版
2. Node.js 版本 >= 16.0.0
3. 文件权限是否正确

---

**安装前请仔细阅读本指南！**
