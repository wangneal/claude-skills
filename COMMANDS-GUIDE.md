# Kingdee Dev Plugin - 完整命令列表

## 📋 所有可用命令（12 个）

**安装命令**: `npx kingdee-dev-plugin`

---

## 🎯 核心工作流命令（对标 GSD）

### 1. `/kd:next` - 自动推进开发
**对标**: `/gsd:next`

**用法**:
```bash
/kd:next              # 智能推进到下一步
/kd:next --auto       # 全自动模式
```

**功能**: 自动检测当前进度，执行下一步操作

**流程**:
```
无 CONTEXT.md → /kd:discuss
无 PLAN.md    → /kd:plan-phase
有未完成任务   → /kd:execute-phase
未验证       → /kd:verify
完成         → 下一阶段
```

---

### 2. `/kd:discuss` - 需求讨论
**对标**: `/gsd:discuss-phase`

**用法**:
```bash
/kd:discuss           # 讨论当前阶段
/kd:discuss 2         # 讨论第 2 阶段
```

**功能**: 通过交互式讨论捕获设计决策，生成 CONTEXT.md

**输出**: CONTEXT.md（包含所有设计决策）

---

### 3. `/kd:plan-phase` - 规划阶段
**对标**: `/gsd:plan-phase`

**用法**:
```bash
/kd:plan-phase        # 规划下一阶段
/kd:plan-phase 2      # 规划第 2 阶段
/kd:plan-phase --research  # 强制重新研究
```

**功能**: 生成详细的执行计划（PLAN.md）

**输出**:
- PLAN.md（任务分解、依赖分析、验收标准）
- RESEARCH.md（可选）

---

### 4. `/kd:execute-phase` - 执行阶段
**对标**: `/gsd:execute-phase`

**用法**:
```bash
/kd:execute-phase     # 执行当前阶段
/kd:execute-phase 2   # 执行第 2 阶段
/kd:execute-phase --wave 1  # 只执行 Wave 1
```

**功能**: 执行阶段的所有计划任务，自动生成代码和文档

**输出**:
- 生成的 Java 代码
- SUMMARY.md
- 自动提交的 Git commits

---

### 5. `/kd:verify` - 验证阶段
**对标**: `/gsd:verify-work`

**用法**:
```bash
/kd:verify            # 验证当前阶段
/kd:verify 2          # 验证第 2 阶段
```

**功能**: 验证阶段是否达到验收标准

**检查项**:
- ✅ 所有任务已完成
- ✅ 代码符合规范
- ✅ 功能验收通过

**输出**: VERIFICATION.md（验证报告）

---

## 🛠️ 辅助命令

### 6. `/kd:init` - 初始化项目
**对标**: `/gsd:new-project`

**用法**:
```bash
/kd:init <项目名>
/kd:init <项目名> --description "描述"
```

**示例**:
```
/kd:init 销售订单管理系统
/kd:init 库存管理 --description "仓库库存管理插件"
```

---

### 7. `/kd:research` - 研究 SDK
**对标**: `/gsd:research-phase`

**用法**:
```bash
/kd:research "<需求>"
/kd:research "<需求>" --output <文件>
```

**示例**:
```
/kd:research "需要操作工作流数据"
/kd:research "权限控制" --output SDK-RESEARCH.md
```

---

### 8. `/kd:list` - 列出 SDK
**无对标**（Kingdee 特有）

**用法**:
```bash
/kd:list                          # 列出所有模块
/kd:list <模块名>                 # 列出模块的类
/kd:list <类名> --detail          # 显示类详情
```

**示例**:
```
/kd:list                          # 17 个模块
/kd:list kd.bos                   # kd.bos 模块的 15 个类
/kd:list DynamicObject --detail   # DynamicObject 的所有方法
```

---

### 9. `/kd:gen` - 生成代码
**无对标**（Kingdee 特有）

**用法**:
```bash
/kd:gen <插件类型>
/kd:gen <插件类型> --class <类名>
/kd:gen <插件类型> --class <类名> --entity <实体名>
```

**支持的插件类型**:
- `FormPlugin` - 表单插件
- `WorkflowPlugin` - 工作流插件
- `OperationPlugin` - 操作插件
- `BillPlugin` - 单据插件
- `ReportPlugin` - 报表插件

**示例**:
```
/kd:gen FormPlugin
/kd:gen FormPlugin --class SalesOrderPlugin
/kd:gen WorkflowPlugin --class ApprovalPlugin --entity kdev_order
```

---

### 10. `/kd:template` - 复制模板
**无对标**（Kingdee 特有）

**用法**:
```bash
/kd:template <模板类型>
/kd:template <模板类型> --output <目录>
```

**支持的模板类型**:
- **插件**: FormPlugin, WorkflowPlugin, OperationPlugin
- **阶段**: planning, development, testing, uat
- **其他**: all（所有模板）

**示例**:
```
/kd:template FormPlugin
/kd:template planning
/kd:template all
```

---

### 11. `/kd:check` - 检查规范
**对标**: `/gsd:code-review`（简化版）

**用法**:
```bash
/kd:check <文件路径>
```

**检查维度**:
- ❌ 魔法值
- ❌ 循环数据库查询
- ❌ 命名不规范
- ❌ 缺少异常处理

**示例**:
```
/kd:check ./SalesOrderPlugin.java
/kd:check ./src/plugin/*.java
```

---

### 12. `/kd:doc` - 生成文档
**无对标**（Kingdee 特有）

**用法**:
```bash
/kd:doc <文档类型>
/kd:doc <文档类型> --output <文件>
```

**支持的文档类型**:
- `readme` - README.md
- `api` - API 文档
- `guide` - 开发指南
- `changelog` - 更新日志

**示例**:
```
/kd:doc readme
/kd:doc api --output ./docs/API.md
```

---

## 📊 GSD vs Kingdee Dev Plugin 对照表

| GSD 命令 | Kingdee 命令 | 功能说明 |
|----------|--------------|----------|
| `/gsd:new-project` | `/kd:init` | ✅ 初始化项目 |
| `/gsd:discuss-phase` | `/kd:discuss` | ✅ 需求讨论 |
| `/gsd:plan-phase` | `/kd:plan-phase` | ✅ 规划阶段 |
| `/gsd:execute-phase` | `/kd:execute-phase` | ✅ 执行阶段 |
| `/gsd:verify-work` | `/kd:verify` | ✅ 验证完成 |
| `/gsd:next` | `/kd:next` | ✅ 自动推进 |
| `/gsd:research-phase` | `/kd:research` | ✅ 研究领域知识 |
| `/gsd:code-review` | `/kd:check` | ✅ 代码审查/检查 |
| - | `/kd:list` | ⭐ 列出 SDK（新增） |
| - | `/kd:gen` | ⭐ 生成代码（新增） |
| - | `/kd:template` | ⭐ 复制模板（新增） |
| - | `/kd:doc` | ⭐ 生成文档（新增） |

---

## 🚀 完整工作流程

### 标准开发流程

```bash
# 1. 初始化项目
/kd:init 销售订单管理系统

# 2. 进入项目
cd 销售订单管理系统

# 3. 一键推进（推荐）
/kd:next
# 自动执行: discuss → plan → execute → verify

# 或者手动控制每一步:
# 3a. 讨论需求
/kd:discuss

# 3b. 规划阶段
/kd:plan-phase

# 3c. 执行任务
/kd:execute-phase

# 3d. 验证完成
/kd:verify

# 4. 推进到下一阶段
/kd:next
```

---

### 快速开发流程

```bash
# 1. 初始化
/kd:init 我的项目

# 2. 研究 SDK
/kd:research "工作流操作"

# 3. 生成代码
/kd:gen FormPlugin --class MyPlugin

# 4. 检查规范
/kd:check MyPlugin.java

# 5. 生成文档
/kd:doc readme
```

---

### 全自动流程

```bash
# 一键完成所有步骤
/kd:init 我的项目 && cd 我的项目 && /kd:next --auto
```

---

## 🎯 命令分组

### 核心工作流（6 个）
```
/kd:init          - 初始化项目
/kd:discuss       - 讨论需求
/kd:plan-phase    - 规划阶段
/kd:execute-phase - 执行阶段
/kd:verify        - 验证完成
/kd:next          - 自动推进
```

### SDK 工具（2 个）
```
/kd:research      - 研究 SDK
/kd:list          - 列出 SDK
```

### 代码工具（3 个）
```
/kd:gen           - 生成代码
/kd:template      - 复制模板
/kd:check         - 检查规范
```

### 文档工具（1 个）
```
/kd:doc           - 生成文档
```

---

## 💡 使用建议

### 新手推荐
```bash
# 使用 /kd:next 自动推进
/kd:init 我的项目
cd 我的项目
/kd:next
```

### 专家推荐
```bash
# 精确控制每一步
/kd:init 我的项目
cd 我的项目
/kd:discuss
/kd:plan-phase
/kd:execute-phase --wave 1  # 先执行 Wave 1
/kd:check *.java            # 检查代码
/kd:execute-phase --wave 2  # 再执行 Wave 2
/kd:verify
```

### 快速原型
```bash
# 快速生成代码
/kd:research "工作流"
/kd:gen WorkflowPlugin
/kd:check *.java
```

---

## 🔄 与 GSD 的关系

### 相同点
- ✅ 相同的命令格式（/kd:xxx）
- ✅ 相同的工作流理念（discuss → plan → execute → verify）
- ✅ 相同的自动化程度

### 不同点
- ⭐ **金蝶特化**: 专门为金蝶苍穹开发优化
- ⭐ **SDK 集成**: 内置 783 个 SDK 方法
- ⭐ **代码生成**: 支持自动生成 Java 插件代码
- ⭐ **规范检查**: 针对金蝶开发规范的检查

---

## 📚 总结

**Kingdee Dev Plugin 提供：**

- ✅ **12 个强大命令**
- ✅ **完整对标 GSD 核心功能**
- ✅ **金蝶特化的增强功能**
- ✅ **783 个 SDK 方法的知识库**
- ✅ **自动代码生成**
- ✅ **规范自动检查**

**一键安装：**
```bash
npx kingdee-dev-plugin
```

**立即开始使用！** 🚀
