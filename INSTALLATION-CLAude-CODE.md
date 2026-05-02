# Claude Code 插件安装指南

## 🎯 快速安装

### 一键安装（推荐）

```bash
npx kingdee-bos-flow
```

安装器会提示您选择：
1. **安装位置**：全局（所有项目）或本地（仅当前项目）
2. **目标运行时**：Claude Code、OpenCode、Gemini CLI 等

### 命令行选项

```bash
# 全局安装
npx kingdee-bos-flow --global

# 本地安装
npx kingdee-bos-flow --local

# 安装到特定运行时
npx kingdee-bos-flow --claude    # 仅 Claude Code
npx kingdee-bos-flow --all       # 所有支持的运行时

# 卸载
npx kingdee-bos-flow --uninstall
```

---

## 📂 安装后的目录结构

### Claude Code

```
~/.claude/                      # 全局安装
├── commands/
│   └── bos-flow/
│       ├── bos-flow-help.md
│       ├── kd-auto.md
│       ├── kd-research.md
│       ├── kd-gen.md
│       └── kd-list.md
└── skills/
    └── gsd-kd-researcher.md

或

./.claude/                      # 本地安装（项目根目录）
├── commands/
│   └── bos-flow/
│       └── ...
└── skills/
    └── ...
```

---

## 🚀 在 Claude Code 中使用

安装完成后，重启 Claude Code 或运行 `/reload` 命令。

### 查看帮助

```
/bos-flow-help
```

### 使用 KD 自动化命令

```
# 自动研究 SDK 并生成约束文件
/kd-auto "开发工作流审批功能，需要启动工作流、提交审批" -d

# 研究 SDK
/kd-research "需要操作动态实体对象"

# 生成约束文件
/kd-gen DynamicObject -f all

# 列出 SDK 模块和类
/kd-list
```

---

## 🔧 支持的运行时

| 运行时 | 配置目录 | 命令目录 | 状态 |
|--------|---------|---------|------|
| Claude Code | `.claude/` | `commands/` | ✅ 完全支持 |
| OpenCode | `.opencode/` | `commands/` | ✅ 完全支持 |
| Gemini CLI | `.gemini/` | `commands/` | ✅ 完全支持 |
| Cursor | `.cursor/` | `commands/` | ✅ 完全支持 |
| Windsurf | `.windsurf/` | `commands/` | ✅ 完全支持 |
| GitHub Copilot | `.github/` | `commands/` | ✅ 完全支持 |
| Cline | `.cline/` | `commands/` | ✅ 完全支持 |
| Codex | `.codex/` | `commands/` | ✅ 完全支持 |

---

## 📝 命令格式

所有 bos-flow 命令遵循 Claude Code 技能规范：

### YAML Frontmatter

```yaml
---
name: kd-auto
description: 自动化SDK研究与约束生成
argument-hint: "<任务描述> [--deep] [--interactive] [--limit N]"
allowed-tools:
  - Read
  - Write
  - Bash
  - Grep
  - Glob
---
```

### 命令结构

每个命令文件包含：
- `<objective>` - 命令目标
- `<execution_context>` - 执行上下文（引用外部文件）
- `<process>` - 执行流程

---

## 🆘 故障排除

### 命令不显示

1. 确认已重启 Claude Code 或运行 `/reload`
2. 检查命令文件是否存在于正确的目录
3. 验证 YAML frontmatter 格式正确

### 权限错误

在某些系统上可能需要管理员权限：
```bash
# macOS/Linux
sudo npx kingdee-bos-flow --global

# Windows (以管理员身份运行 PowerShell)
npx kingdee-bos-flow --global
```

### 卸载后重新安装

```bash
# 完全卸载
npx kingdee-bos-flow --uninstall --global
npx kingdee-bos-flow --uninstall --local

# 重新安装
npx kingdee-bos-flow
```

---

## 💡 高级用法

### 与 GSD 集成

bos-flow 的设计灵感来自 [GSD (Get Shit Done)](https://github.com/gsd-build/get-shit-done)，可以与 GSD 命令配合使用。

### 自定义命令

您可以在项目的 `.claude/commands/` 目录中创建自定义命令，与 bos-flow 命令并存。

### 约束文件引用

在 Claude Code 提示中引用约束文件：

```
请根据以下约束文件生成代码：

@.bos-flow/constraints/WorkflowServiceHelper.prompt.md

需求：开发工作流审批功能...
```

---

## 📚 相关文档

- [使用指南](README.md)
- [KD 命令详解](../KD-COMMANDS-GUIDE.md)
- [发布指南](PUBLISH-GUIDE.md)
- [检查清单](CHECKLIST.md)

---

## 🤝 贡献

欢迎贡献代码和反馈！请查看 [GitHub 仓库](https://github.com/your-username/kingdee-bos-flow)。

---

**享受在 Claude Code 中开发金蝶应用的乐趣！** 🚀
