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

## ✨ 代码生成增强

### 增强版模板特性

- ✅ **完整的生命周期方法** - 包含所有关键事件处理器
- ✅ **自动常量引用** - 消除魔法值，使用常量类引用
- ✅ **标准异常处理** - try-catch 异常处理模式
- ✅ **日志记录集成** - Logger 日志记录最佳实践
- ✅ **JavaDoc 注释** - 清晰的方法文档注释

### 使用方式

```bash
# 生成生产就绪的表单插件
kd-gen FormPlugin --class MyFormPlugin --enhanced

# 生成工作流插件
kd-gen WorkflowPlugin --class MyWorkflowPlugin --enhanced

# 指定包名和描述
kd-gen FormPlugin --class OrderPlugin \
  --package com.example.order.plugin \
  --desc "订单表单插件"
```

### 常量自动引用

系统会自动扫描项目中的常量类（以 Cons/Con/Constant 结尾），并在生成代码时自动引用：

**转换前：**
```java
obj.set("status", "A");
obj.set("name", "Test");
```

**转换后：**
```java
obj.set(BaseCon.STATUS, BaseCon.STATUS_DRAFT);
obj.set(BaseCon.NAME, "Test");
```

### 支持的插件类型

- **FormPlugin** - 表单插件（增强版）
- **WorkflowPlugin** - 工作流插件（增强版）
- **ReportPlugin** - 报表插件（增强版）
- **ListPlugin** - 列表插件（增强版） ⭐ 新增
- **OperationPlugin** - 操作插件
- **BillPlugin** - 单据插件

### 报表插件特性

- ✅ **Algo API 集成** - 使用 Algo.create() 创建数据集
- ✅ **DataSetBuilder** - 高效的数据集构建器
- ✅ **RowMeta 自动生成** - 字段元数据自动定义
- ✅ **QFilter 查询条件** - 灵活的查询条件构建
- ✅ **常量字段引用** - 无魔法值，使用常量类
- ✅ **完整的异常处理** - try-catch 异常处理
- ✅ **日志记录** - Logger 日志记录
- ✅ **JavaDoc 注释** - 清晰的方法文档

### 列表插件特性

- ✅ **分页查询支持** - 支持 startRow/pageSize 分页参数
- ✅ **总记录数统计** - getTotalCount 方法获取总记录数
- ✅ **QFilter 查询条件** - 灵活的查询条件构建
- ✅ **排序条件构建** - buildSortCondition 支持动态排序
- ✅ **过滤条件构建** - buildQueryFilter 支持日期、组织、状态过滤
- ✅ **列表事件处理** - beforeLoadData/afterLoadData 事件钩子
- ✅ **批量操作校验** - validateBeforeDelete/validateBeforeAudit
- ✅ **导出数据查询** - queryExportData 支持全量导出
- ✅ **常量字段引用** - 无魔法值，使用 ListCons 常量类
- ✅ **完整的异常处理** - try-catch 异常处理
- ✅ **日志记录** - Logger 日志记录
- ✅ **JavaDoc 注释** - 清晰的方法文档

**使用示例：**
```bash
# 生成列表插件
kd-gen ListPlugin --class OrderListPlugin --enhanced

# 指定包名和描述
kd-gen ListPlugin --class ProductListPlugin \
  --package com.example.product.plugin \
  --desc "产品列表插件"
```

## 🛡️ 质量保证体系

### 自动化检查

- ✅ **魔法值检测** - 自动识别字符串和数字魔法值
- ✅ **性能检查** - 检测循环数据库查询和 N+1 问题
- ✅ **异常处理检查** - 验证异常处理完整性
- ✅ **日志记录检查** - 验证日志记录规范
- ✅ **JavaDoc 检查** - 检查公共方法文档
- ✅ **SDK 使用检查** - 验证 API 使用正确性
- ✅ **命名规范检查** - 检查类名、方法名、常量名

### 异常处理模板

提供 7+ 种异常处理场景模板：

1. **基础异常处理** - try-catch 基础模式
2. **带返回值的异常处理** - 方法返回值处理
3. **数据保存异常处理** - 数据操作异常处理
4. **数据查询异常处理** - 查询操作异常处理
5. **批量操作异常处理** - 批量处理异常模式
6. **事务性操作异常处理** - 事务控制异常处理
7. **参数校验异常处理** - 参数验证异常处理

### 日志记录模板

提供 10+ 种日志记录场景模板：

**日志级别**:
- INFO - 关键操作日志
- DEBUG - 调试信息日志
- WARN - 警告信息日志
- ERROR - 错误信息日志

**业务场景**:
- 方法入口/出口日志
- 性能计时日志
- 数据变更日志
- 批量操作进度日志
- 审批流程日志
- API 调用日志

### JavaDoc 自动生成

自动生成符合规范的 JavaDoc 注释：

```java
/**
 * 类名 - 类描述
 *
 * <p>创建日期：2026-04-30</p>
 * <p>作者：Developer</p>
 * <p>版本：1.0</p>
 */

/**
 * 方法描述
 * <p>用途：方法用途说明</p>
 *
 * @param paramName 参数描述
 * @return 返回值描述
 * @throws ExceptionType 异常描述
 */
```

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
