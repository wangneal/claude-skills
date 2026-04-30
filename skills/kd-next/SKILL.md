---
name: kd:next
description: "自动推进到下一个开发阶段（讨论→规划→执行→验证）"
argument-hint: "[--auto]"
allowed-tools:
  - Read
  - Write
  - Edit
  - Bash
  - Task
  - AskUserQuestion
---

<objective>
智能检测当前进度，自动推进到下一个逻辑步骤：讨论需求 → 规划阶段 → 执行任务 → 验证完成。
</objective>

<execution_context>
@$HOME/.claude/kingdee-dev/workflows/next-phase.md
</execution_context>

<process>
执行 next 工作流，自动推进开发进度。
</process>

<examples>

### 示例 1: 自动推进

```
用户: /kd:next
```

检测当前状态，执行下一步：
- 无 CONTEXT.md → 执行 /kd:discuss
- 无 PLAN.md → 执行 /kd:plan-phase
- 有未完成任务 → 执行 /kd:execute-phase
- 任务完成但未验证 → 执行 /kd:verify

### 示例 2: 全自动模式

```
用户: /kd:next --auto
```

无需确认，自动执行所有步骤直到阶段完成。

</examples>

<workflow>

## 推进逻辑

```
┌─────────────┐
│ 检查状态     │
└──────┬──────┘
       │
       ├─ 无 CONTEXT.md？
       │    └─→ /kd:discuss
       │
       ├─ 无 PLAN.md？
       │    └─→ /kd:plan-phase
       │
       ├─ 有未完成任务？
       │    └─→ /kd:execute-phase
       │
       ├─ 未验证？
       │    └─→ /kd:verify
       │
       └─ 阶段完成？
            └─→ 推进到下一阶段
```

</workflow>
