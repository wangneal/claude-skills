# Kingdee Dev Plugin - 金蝶开发插件

参考GSD编写的类似 GSD 的 Claude Code 插件系统，专为金蝶苍穹开发设计。

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

## 🚀 可用命令（13 个）

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

### 方式 1: npx 一键安装（推荐）

```bash
npx kingdee-dev-plugin
```

**说明**:
- ✅ 自动从 npm 下载并安装
- ✅ 适用于所有操作系统
- ✅ 无需全局安装

---

### 方式 2: 全局安装

```bash
npm install -g kingdee-dev-plugin
kingdee-dev-plugin
```

---

### 方式 3: 使用淘宝镜像

```bash
# 切换到淘宝镜像
npm config set registry https://registry.npmmirror.com/

npx kingdee-dev-plugin
```

---


---

### 安装后验证

安装完成后，在 Claude Code 中测试：

```
/kd:list
```

如果看到 SDK 模块列表，说明安装成功！

---

### 安装内容

安装脚本会自动：

- ✅ 复制 4 个 Agents 到 `~/.claude/agents/`
- ✅ 复制 13 个 Skills 到 `~/.claude/skills/`
- ✅ 复制核心引擎到 `~/.claude/kingdee-dev/`
- ✅ 复制 SDK 知识库（783 个方法）
- ✅ 复制代码模板和规范文档

---

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

---

## 📞 支持

如果遇到问题：

1. **查看文档**:
   - [完整命令指南](./COMMANDS-GUIDE.md)
   - [安装指南](./INSTALL.md)
   - [NPM 同步说明](./NPM-SYNC-GUIDE.md)

2. **GitHub Issues**: https://github.com/wangneal/claude-skills/issues

3. **npm 包信息**: https://www.npmjs.com/package/kingdee-dev-plugin


## 🔄 开发状态

- [x] 插件架构设计
- [x] Agents 层创建（4 个）
- [x] Skills 层创建（13 个）
- [x] Workflows 层创建（7 个）
- [x] SDK 知识库集成（54 个文档，783 个方法）
- [x] 模板文件集成
- [x] 安装脚本开发
- [x] NPM 发布准备
- [x] 发布到 npm ✅
- [x] 推送到 GitHub ✅
- [x] 集成阿里巴巴Java开发规范 ✅ (v1.0.1)

## 🆕 v1.0.1 更新内容

- **集成阿里巴巴Java开发规范**: 新增并发规约、集合规约、MySQL规约、工程结构规约等补充规范
- **优化 plan-phase 工作流**: SDK研究现在是默认前置步骤，使用 `--skip-research` 可跳过
- **新增 plan-phase.md 工作流文件**: 完善规划阶段的执行流程
- **规范冲突处理**: 与金蝶开发规范冲突的部分以金蝶规范为准

## 📄 License

MIT

---

**创建日期**: 2026-04-30
**作者**: Neal
**发布信息**:
- **npm**: https://www.npmjs.com/package/kingdee-dev-plugin
- **GitHub**: https://github.com/wangneal/claude-skills
- **版本**: 1.0.1
- **License**: MIT

**灵感来源**: GSD (Get Shit Done)

---
