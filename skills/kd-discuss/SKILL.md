---
name: kd:discuss
description: "需求讨论：捕获设计决策，生成 CONTEXT.md"
argument-hint: "<阶段号>"
allowed-tools:
  - Read
  - Write
  - AskUserQuestion
---

<objective>
通过交互式讨论捕获金蝶开发的设计决策，生成 CONTEXT.md 文档。
</objective>

<context>
阶段: Phase 3 - 需求讨论
输入: 需求分析结果 (kd-analyze 输出)
输出: {N}-CONTEXT.md
</context>

<execution_context>
@$HOME/.claude/kingdee-dev/workflows/discuss-phase.md
</execution_context>

<process>
执行 discuss 工作流，收集设计决策。
</process>

<examples>

### 示例 1: 讨论当前阶段需求

```
用户: /kd:discuss
```

自动检测当前阶段，开始需求讨论。

### 示例 2: 讨论指定阶段

```
用户: /kd:discuss 2
```

讨论第 2 阶段的需求和设计。

</examples>

<workflow>

## 讨论流程

1. **加载阶段信息**
   - 读取阶段目标
   - 加载项目上下文

2. **识别灰区**
   - 分析不确定的设计点
   - 列出需要确认的问题

3. **逐个讨论**
   - 展示问题选项
   - 收集用户决策
   - 记录理由

4. **生成文档**
   - CONTEXT.md
   - 决策记录

</workflow>
