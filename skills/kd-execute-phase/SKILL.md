---
name: kd:execute-phase
description: "执行金蝶开发阶段的所有计划任务"
argument-hint: "[阶段号] [--wave N]"
allowed-tools:
  - Read
  - Write
  - Edit
  - Bash
  - Task
  - AskUserQuestion
---

<objective>
执行金蝶开发阶段的所有计划任务，按 Wave 并行执行，自动提交代码和生成文档。
</objective>

<execution_context>
@$HOME/.claude/kingdee-dev/workflows/execute-phase.md
</execution_context>

<process>
执行 execute-phase 工作流，完成阶段的所有任务。
</process>

<examples>

### 示例 1: 执行当前阶段

```
用户: /kd:execute-phase
```

自动检测当前阶段并执行。

### 示例 2: 执行指定阶段

```
用户: /kd:execute-phase 2
```

执行第 2 阶段的所有计划。

### 示例 3: 只执行特定 Wave

```
用户: /kd:execute-phase 1 --wave 1
```

只执行第 1 阶段的 Wave 1。

</examples>

<workflow>

## 执行流程

1. **加载计划**
   - 读取 PLAN.md
   - 分析任务依赖
   - 按 Wave 分组

2. **执行任务**
   - 按依赖顺序执行
   - Wave 内可并行
   - 自动错误处理

3. **生成代码**
   - 调用 kd-code-generator
   - 应用规范检查
   - 自动提交

4. **生成文档**
   - SUMMARY.md
   - API 文档

5. **验证完成**
   - 验收标准检查
   - 代码规范检查

</workflow>
