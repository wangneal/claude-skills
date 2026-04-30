# Plan Phase Workflow - 规划阶段工作流

## 概述

为金蝶开发阶段生成详细的执行计划（PLAN.md），包括任务分解、依赖分析、验收标准。

**重要：SDK研究是规划阶段的默认前置步骤**

---

## 工作流程

### 步骤 1: 加载阶段上下文

1. 读取阶段目标 (从 ROADMAP.md 或 .planning/phases/)
2. 加载需求列表
3. 分析阶段依赖关系
4. 提取关键技术关键词
5. **扫描项目常量类** (新增)
   - 使用 `engine/constant-scanner.js` 扫描现有常量类
   - 识别 common 包中的常量
   - 在规划时参考现有常量结构

### 步骤 2: 自动常量类扫描 (新增)

**在规划阶段自动执行常量类扫描**：

1. 扫描项目 src 目录下的 Java 文件
2. 查找以 Cons/Con/Constant 结尾的常量类
3. 优先识别 common 包中的常量
4. 将扫描结果纳入规划上下文，供后续任务参考

**扫描结果示例**：
```
| 类名 | 包名 | 路径 |
|------|------|------|
| 📁 UserRoleConstant | com.kingdee.common.constants | src/common/constants/UserRoleConstant.java |
| 📁 SystemConstant | com.kingdee.common.constants | src/common/constants/SystemConstant.java |
| 📄 DBCons | com.kingdee.db | src/db/DBCons.java |
```

### 步骤 3: 自动研究 SDK（默认行为）

**重要：SDK研究是规划阶段的默认步骤，无需用户手动触发**

1. 分析阶段需求，提取需要使用的 SDK 功能
2. 调用 SDK 研究代理 (`kd-sdk-researcher` 或 `research-sdk` 工作流)
3. 获取相关 SDK 类的使用方法
4. 将 SDK 研究结果整合到规划上下文中

**如需跳过 SDK 研究**，可使用 `--skip-research` 参数

### 步骤 3: 技术方案分析

基于 SDK 研究结果，分析：
- 技术可行性
- 潜在风险
- 依赖关系

### 步骤 4: 生成执行计划

1. **任务分解**
   - 将阶段目标拆分为具体任务
   - 估算每个任务的工作量
   - 识别任务��的依赖关系

2. **依赖分析**
   - 内部依赖：任务间的顺序关系
   - 外部依赖：SDK、第三方库等

3. **验收标准定义**
   - 功能验收：必须完成的功能点
   - 质量验收：代码规范、测试覆盖率
   - 性能验收：响应时间、资源使用

### 步骤 5: 生成 PLAN.md

创建 `.planning/phases/{phase}/{phase}-PLAN.md` 文件，包含：
- 阶段概述
- 任务列表（带依赖关系）
- 验收标准
- SDK 参考（如有）

---

## 输出

- **PLAN.md**: 阶段的详细执行计划
- **更新的 STATE.md**: 标记阶段为 "planned"

---

## 参数说明

| 参数 | 说明 | 默认值 |
|------|------|--------|
| phase | 阶段号 | 自动检测下一个未规划阶段 |
| --skip-research | 跳过 SDK 研究 | false (默认研究) |

---

## 示例

### 示例 1: 规划下一个阶段（自动研究SDK）

```
/kd:plan-phase
```

输出：
```
🚀 开始规划 Phase X
📚 正在研究相关 SDK...
✅ SDK 研究完成

📋 生成执行计划...
✅ 计划已生成: .planning/phases/X/X-PLAN.md
```

### 示例 2: 跳过 SDK 研究

```
/kd:plan-phase 2 --skip-research
```

---

*工作流版本: 1.1*
*更新: SDK研究现在是默认前置步骤*