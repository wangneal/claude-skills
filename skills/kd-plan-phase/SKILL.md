---
name: kd:plan-phase
description: "规划金蝶开发阶段，生成详细的执行计划"
argument-hint: "[阶段号] [--research]"
allowed-tools:
  - Read
  - Write
  - Bash
  - Task
  - AskUserQuestion
---

<objective>
为金蝶开发阶段生成详细的执行计划（PLAN.md），包括任务分解、依赖分析、验收标准。
</objective>

<execution_context>
@$HOME/.claude/kingdee-dev/workflows/plan-phase.md
</execution_context>

<process>
执行 plan-phase 工作流，生成阶段的详细计划。
</process>

<examples>

### 示例 1: 规划下一个阶段

```
用户: /kd:plan-phase
```

自动检测下一个未规划的阶段并生成计划。

### 示例 2: 规划指定阶段

```
用户: /kd:plan-phase 2
```

规划第 2 阶段。

### 示例 3: 强制重新研究

```
用户: /kd:plan-phase 1 --research
```

重新研究 SDK 后再规划。

</examples>

<workflow>

## 规划流程

1. **加载阶段上下文**
   - 读取阶段目标
   - 加载需求
   - 分析依赖

2. **研究阶段需求**（可选）
   - 研究 SDK 相关功能
   - 分析技术方案

3. **生成执行计划**
   - 任务分解
   - 依赖分析
   - 估算工作量

4. **定义验收标准**
   - 功能验收
   - 性能验收
   - 规范验收

5. **生成 PLAN.md**

</workflow>
