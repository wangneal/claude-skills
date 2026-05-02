# kingdee-bos-flow

[![npm version](https://badge.fury.io/js/kingdee-bos-flow.svg)](https://badge.fury.io/js/kingdee-bos-flow)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

> 金蝶苍穹开发工作流 - 标准化四阶段开发流程，自动化 SDK 研究与约束生成

**简体中文** | [English](#english)

---

## ✨ 核心特性

- 🚀 **自动化 SDK 研究** - 从需求描述自动提取关键词并搜索相关 SDK 类
- 📝 **约束文件生成** - 为大模型生成结构化约束文件，强制使用正确的 SDK 方法
- 🎯 **智能关键词映射** - 支持中文动词自动映射到 SDK 类
- 🔧 **统一命令格式** - 使用 `kd-xxx` 命令风格，与金蝶生态保持一致
- 📦 **完整工作流** - 支持四阶段开发流程：计划 → 开发 → 测试 → UAT

---

## 📦 安装

### 方式 1：自动安装（推荐）

```bash
# 使用 npx 一键安装到 Claude Code、OpenCode、Gemini 等
npx kingdee-bos-flow

# 全局安装（所有项目可用）
npx kingdee-bos-flow --global

# 本地安装（仅当前项目）
npx kingdee-bos-flow --local
```

### 方式 2：手动安装

```bash
# 使用 npm 全局安装
npm install -g kingdee-bos-flow

# 使用 yarn
yarn global add kingdee-bos-flow
```

### 在 Claude Code 中使用

安装后，在 Claude Code 中可以直接使用斜杠命令：

```bash
/kd-auto "开发工作流审批功能" -d
/kd-research "操作动态实体对象"
/kd-gen DynamicObject -f all
/kd-list
/bos-flow-help
```

---

## 🚀 快速开始

### 1. 查看帮助

```bash
bos-flow help
```

### 2. 初始化项目

```bash
bos-flow init my-project
```

### 3. 自动研究 SDK（核心功能）

```bash
# 自动化 SDK 研究和约束生成
bos-flow kd-auto "开发工作流审批功能，需要启动工作流、提交审批" -d

# 输出示例：
# 🚀 启动自动化SDK研究与约束生成
# 关键词提取: WorkflowServiceHelper, DynamicObject
#
# 找到 3 个推荐类:
#   1. WorkflowServiceHelper - 相关性: 100%
#   2. DynamicObject - 相关性: 100%
#   3. BusinessDataServiceHelper - 相关性: 82%
#
# ✅ 约束文件已生成:
#   - .bos-flow/constraints/WorkflowServiceHelper.prompt.md
#   - .bos-flow/constraints/DynamicObject.prompt.md
#   - .bos-flow/constraints/auto-*.prompt.md
#
# 💡 在代码生成时，请使用约束文件:
#   .bos-flow/constraints/auto-*.prompt.md
```

---

## 📚 命令列表

### 基本命令

```bash
bos-flow status              # 查看项目状态
bos-flow init [项目名]       # 创建新项目或理解现有项目
bos-flow research <需求>     # 研究 SDK
bos-flow template <模板>     # 复制模板
bos-flow doc <类型>          # 生成文档
bos-flow phase <N> <操作>    # 阶段管理
bos-flow check <文件>        # 检查规范
```

### KD 自动化命令（推荐）

```bash
# 核心自动化命令
bos-flow kd-auto "<任务描述>" [options]
  -o, --output <dir>        约束输出目录
  -d, --deep                深度研究（包含方法签名）
  -i, --interactive         交互模式
  -l, --limit <number>      限制推荐类数量

# SDK 研究命令
bos-flow kd-research "<需求>" [options]
  -k, --keywords <words>    关键词
  -o, --output <file>       输出文件
  -f, --format <type>       输出格式 (markdown|json)

# 约束生成命令
bos-flow kd-gen <类名> [options]
  -o, --output <dir>        输出目录
  -f, --format <type>       输出格式 (prompt|schema|all)
  -t, --template            生成代码模板

# SDK 列表命令
bos-flow kd-list [模块] [options]
  -m, --methods             显示方法列表
  -f, --filter <pattern>    过滤类名

# 项目扫描命令（新增）
bos-flow kd-scan-project [路径] [options]
  -v, --verbose             详细输出
```

---

## 🎯 项目理解功能

### 功能概述

自动理解您的金蝶项目，学习项目风格，生成符合项目规范的代码。

### 使用方式

#### 自动模式（推荐）

在现有项目目录中初始化：

```bash
cd E:\projects\kingdee\cqjdc
bos-flow init

# 自动执行：
# ✓ 扫描项目结构
# ✓ 学习项目风格
# ✓ 提取常量类和工具类
# ✓ 生成项目配置
```

#### 手动模式

独立触发项目理解：

```bash
# 扫描指定项目
bos-flow kd-scan-project E:\projects\kingdee\cqjdc

# 扫描当前目录
bos-flow kd-scan-project .
```

#### 跳过理解

```bash
# 跳过自动理解
bos-flow init --skip-scan
```

### 核心功能

- ✅ **项目结构扫描** - 识别模块划分、插件分布
- ✅ **代码风格学习** - 学习命名规范、注释风格、异常处理
- ✅ **常量类提取** - 自动识别项目常量类
- ✅ **工具类提取** - 识别项目工具类和公共组件
- ✅ **风格化代码生成** - 生成符合项目风格的代码

### 配置文件

扫描后生成的配置文件：

- `.bos-flow/project-context.json` - 项目上下文信息
- `.bos-flow/code-style.json` - 代码风格定义
- `.bos-flow/constants-index.json` - 常量类索引
- `.bos-flow/utils-index.json` - 工具类索引

---

## 🎯 使用场景

### 场景 1：开发工作流审批功能

```bash
# 步骤 1：自动研究与约束生成
bos-flow kd-auto "开发工作流审批功能，需要启动工作流、提交审批、读取单据字段" -d

# 步骤 2：查看约束文件
cat .bos-flow/constraints/WorkflowServiceHelper.prompt.md

# 步骤 3：在大模型 Prompt 中引用约束文件
# "请根据以下约束文件生成代码："
# [粘贴约束文件内容]
# "需求：开发工作流审批功能..."
```

### 场景 2：开发权限检查功能

```bash
# 自动研究
bos-flow kd-auto "开发权限检查功能，需要验证用户权限" -d

# 查看推荐
# ✅ 推荐: PermissionServiceHelper, UserServiceHelper
```

---

## 🔑 中文关键词映射

系统支持中文动词自动映射到 SDK 类：

| 中文动词 | SDK 类 |
|---------|--------|
| 启动、提交、审批、工作流 | `WorkflowServiceHelper` |
| 读取、设置、获取、动态对象 | `DynamicObject` |
| 查询、搜索、过滤 | `QueryServiceHelper` |
| 保存、删除、新增、修改、操作数据 | `BusinessDataServiceHelper` |
| 检查权限、权限、授权 | `PermissionServiceHelper` |
| 获取用户、用户、当前用户 | `UserServiceHelper` |
| 附件、上传、下载 | `AttachmentServiceHelper` |

---

## 📝 约束文件格式

### Markdown 格式（推荐）

```markdown
# SDK 使用约束 - WorkflowServiceHelper

## 强制约束

### 1. 类名约束
- **必须使用**: `WorkflowServiceHelper`
- **完整包路径**: `kd.bos.servicehelper.workflow`

### 2. 方法约束

#### startWorkflow
```java
void startWorkflow(String billNo, Long billId)
```
- **参数**: billNo (单据编号), billId (单据ID)
- **返回值**: void

### 3. 禁止事项
❌ **禁止**使用 `startProcess` (正确: `startWorkflow`)
❌ **禁止**使用错误的参数类型
```

### JSON Schema 格式

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "WorkflowServiceHelper Constraint",
  "properties": {
    "className": { "const": "WorkflowServiceHelper" },
    "allowedMethods": [ ... ]
  }
}
```

---

## 📊 统计信息

- **SDK 模块数**: 17 个
- **SDK 类数**: 48 个
- **SDK 方法数**: 783 个
- **支持关键词**: 30+ 个中文动词
- **约束格式**: Markdown, JSON Schema, 代码模板

---

## 📁 项目结构

```
.bos-flow/
├── bin/
│   └── cli.js                    # CLI 入口
├── lib/
│   ├── kd-keyword-extractor.js   # 关键词提取器
│   ├── kd-search-engine.js       # SDK 搜索引擎
│   ├── kd-constraint-generator.js # 约束生成器
│   ├── kd-auto.js                # 自动化核心模块
│   ├── sdk-search.js             # SDK 搜索
│   ├── agent-sdk-research.js     # SDK 研究代理
│   ├── standards-checker.js      # 规范检查器
│   └── ... (其他模块)
├── sdk/                          # SDK 知识库
│   ├── modules.json              # SDK 索引
│   └── kd_bos/                   # SDK 文档
├── constraints/                  # 约束文件目录
├── templates/                    # 阶段模板
├── standards/                    # 开发规范
└── skills/                       # GSD 技能
```

---

## 🛠️ 开发

### 本地开发

```bash
# 克隆仓库
git clone https://github.com/your-username/kingdee-bos-flow.git

# 安装依赖
cd kingdee-bos-flow/.bos-flow
npm install

# 测试 CLI
node bin/cli.js help

# 全局链接（测试本地安装）
npm link

# 测试命令
bos-flow help
bos-flow kd-auto "测试功能"
```

---

## 📖 文档

- [KD 命令使用指南](../KD-COMMANDS-GUIDE.md)
- [安装说明](../INSTALLATION.md)
- [快速参考](../QUICK-REFERENCE.md)
- [VS Code 集成](../README-VSCODE.md)

---

## 🤝 贡献

欢迎贡献！请查看 [贡献指南](CONTRIBUTING.md)。

---

## 📄 许可证

[MIT License](LICENSE)

---

## 🆘 支持

- **问题反馈**: [GitHub Issues](https://github.com/your-username/kingdee-bos-flow/issues)
- **文档**: [Wiki](https://github.com/your-username/kingdee-bos-flow/wiki)

---

## 🙏 致谢

感谢金蝶提供的 BOS 平台和 SDK 文档。

---

<div align="center">

**Made with ❤️ for Kingdee Developers**

</div>

---

<a name="english"></a>
## English

> Kingdee Cosmic Development Workflow - Standardized 4-stage development process with automated SDK research and constraint generation

### Features

- 🚀 Automated SDK research from requirement descriptions
- 📝 Constraint file generation for LLMs
- 🎯 Smart keyword mapping (Chinese verbs to SDK classes)
- 🔧 Unified `kd-xxx` command format
- 📦 Complete 4-stage workflow: Plan → Develop → Test → UAT

### Installation

```bash
npm install -g kingdee-bos-flow
```

### Quick Start

```bash
# Initialize project
bos-flow init my-project

# Auto SDK research
bos-flow kd-auto "develop workflow approval feature" -d
```

For detailed usage, please refer to the Chinese documentation above or visit our [Wiki](https://github.com/your-username/kingdee-bos-flow/wiki).
