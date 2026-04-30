# Kingdee Dev Plugin - 金蝶开发插件

类似 GSD 的 Claude Code 插件系统，专为金蝶苍穹开发设计。

## 📋 项目结构

```
kingdee-dev-plugin/
├── README.md                    # 本文件
├── INSTALL.md                   # 安装指南
├── install.js                   # 安装脚本
│
├── agents/                      # Agent 层（AI 代理定义）
│   ├── kd-sdk-researcher.md
│   ├── kd-code-generator.md
│   ├── kd-standards-checker.md
│   └── kd-doc-writer.md
│
├── skills/                      # Skill 层（用户命令）
│   ├── kd-init/
│   │   └── SKILL.md
│   ├── kd-research/
│   │   └── SKILL.md
│   ├── kd-gen/
│   │   └── SKILL.md
│   ├── kd-check/
│   │   └── SKILL.md
│   ├── kd-template/
│   │   └── SKILL.md
│   ├── kd-list/
│   │   └── SKILL.md
│   └── kd-doc/
│       └── SKILL.md
│
├── engine/                      # 核心引擎（工作流+资源）
│   ├── workflows/               # 工作流定义
│   │   ├── init-project.md
│   │   ├── research-sdk.md
│   │   ├── generate-code.md
│   │   ├── check-standards.md
│   │   ├── copy-template.md
│   │   └── list-sdk.md
│   │
│   ├── references/              # 参考文档
│   │   ├── sdk-patterns.md
│   │   ├── coding-standards.md
│   │   ├── best-practices.md
│   │   └── architecture.md
│   │
│   ├── templates/               # 代码模板
│   │   ├── plugin/
│   │   │   ├── FormPlugin.java
│   │   │   ├── WorkflowPlugin.java
│   │   │   └── OperationPlugin.java
│   │   └── phase/
│   │       ├── PLANNING.md
│   │       ├── DEVELOPMENT.md
│   │       ├── TESTING.md
│   │       └── UAT.md
│   │
│   └── sdk/                     # SDK 知识库
│       ├── modules.json
│       ├── 0_总览.md
│       ├── 1_字段类型规则.md
│       ├── 2_核心类详解.md
│       └── kd_bos/              # 核心模块
│           ├── DynamicObject.md
│           ├── BusinessDataServiceHelper.md
│           └── ...
│
└── package.json                 # npm 包配置
```

## 🎯 设计原则

遵循 GSD 的三层架构：

### Layer 1: Agents（代理层）
- **作用**: 定义专门的 AI 代理，每个代理负责特定类型的任务
- **特点**: 可复用，一个 Agent 可被多个 Skill 使用
- **示例**:
  - `kd-sdk-researcher` - SDK 研究代理
  - `kd-code-generator` - 代码生成代理
  - `kd-standards-checker` - 规范检查代理

### Layer 2: Skills（技能层）
- **作用**: 定义用户可调用的命令
- **特点**: 用户友好的接口，负责"做什么"
- **示例**:
  - `/kd-init` - 初始化金蝶项目
  - `/kd-research` - 研究 SDK
  - `/kd-gen` - 生成代码

### Layer 3: Workflows（工作流层）
- **作用**: 定义详细的执行流程
- **特点**: 协调逻辑，负责"如何做"
- **示例**:
  - `init-project.md` - 初始化项目的详细流程
  - `research-sdk.md` - SDK 研究的详细流程

## 🚀 可用命令（12 个）

### 核心工作流（对标 GSD）
- `/kd:init <项目名>` - 初始化金蝶项目
- `/kd:discuss [阶段]` - 讨论需求，生成 CONTEXT.md
- `/kd:plan-phase [阶段]` - 规划阶段，生成 PLAN.md
- `/kd:execute-phase [阶段]` - 执行阶段，生成代码
- `/kd:verify [阶段]` - 验证完成，生成 VERIFICATION.md
- `/kd:next` - 自动推进到下一步（推荐）

### SDK 工具
- `/kd:research "<需求>"` - 研究 SDK API
- `/kd:list [模块|类]` - 列出 SDK 内容

### 代码工具
- `/kd:gen <类型>` - 生成插件代码
- `/kd:template <类型>` - 复制模板
- `/kd:check <文件>` - 检查代码规范

### 文档工具
- `/kd:doc <类型>` - 生成文档

**详细命令指南**: 查看 [COMMANDS-GUIDE.md](./COMMANDS-GUIDE.md)

## 📦 安装

### 方式 1: 自动安装（推荐）

```bash
node install.js
```

### 方式 2: 手动安装

```bash
# 1. 复制 agents
cp -r agents/* ~/.claude/agents/

# 2. 复制 skills
cp -r skills/* ~/.claude/skills/

# 3. 复制 engine
cp -r engine ~/.claude/kingdee-dev
```

## 📚 资源来源

本插件复用以下项目的资源：

- **SDK 知识库**: 来自 `E:\projects\claude skills\.bos-flow\sdk\`
- **开发规范**: 来自 `E:\projects\claude skills\.bos-flow\standards\`
- **模板文件**: 来自 `E:\projects\claude skills\.bos-flow\templates\`

## 🔄 开发状态

- [x] 插件架构设计
- [x] Agents 层创建（4 个）
- [x] Skills 层创建（12 个）
- [x] Workflows 层创建（6 个）
- [x] SDK 知识库集成（54 个文档，783 个方法）
- [x] 模板文件集成
- [x] 安装脚本开发
- [x] NPM 发布准备
- [ ] 发布到 npm（待您操作）

## 📄 License

MIT

---

**创建日期**: 2026-04-30
**作者**: Neal
**灵感来源**: GSD (Get Shit Done)
