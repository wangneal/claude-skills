---
name: kd:plan-phase
description: "生成计划：创建阶段执行计划 (PLAN.md)"
argument-hint: "<阶段号> [--skip-research]"
allowed-tools:
  - Read
  - Write
  - Bash
  - Task
  - AskUserQuestion
---

<objective>
为金蝶开发阶段生成详细的执行计划（PLAN.md），包括任务分解、依赖分析、验收标准。

**重要：SDK研究是规划阶段的默认前置步骤**，在生成计划前会自动研究相关SDK。
如需跳过研究，请使用 --skip-research 参数。
</objective>

<context>
阶段: Phase 5 - 生成计划
输入: 需求规格 (kd-spec 输出)
输出: {N}-PLAN.md
</context>

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

自动检测下一个未规划的阶段并生成计划（默认先研究SDK）。

### 示例 2: 规划指定阶段

```
用户: /kd:plan-phase 2
```

规划第 2 阶段（默认先研究SDK）。

### 示例 3: 跳过SDK研究

```
用户: /kd:plan-phase 1 --skip-research
```

直接规划，跳过SDK研究步骤。

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
