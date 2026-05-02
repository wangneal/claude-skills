---
name: kd:spec
description: "需求规格：生成详细需求规格文档 (SPEC.md)"
argument-hint: "<阶段号> [--auto]"
allowed-tools:
  - Read
  - Write
  - AskUserQuestion
---

<objective>
生成需求规格文档 (SPEC.md)，包含模糊度评分、边界定义、验收标准。
</objective>

<context>
阶段: Phase 4 - 需求规格
输入: 讨论决策 (kd-discuss 输出)
输出: {N}-SPEC.md
</context>

<process>
执行 spec-generator，生成需求规格。
</process>

<examples>

### 示例 1: 生成需求规格

```
用户: /kd-spec 1
```

为第 1 阶段生成需求规格。

### 示例 2: 自动模式

```
用户: /kd-spec 2 --auto
```

自动生成，使用推荐默认值。

</examples>

<workflow>

## 需求规格流程

1. **加载上下文**
   - 读取 CONTEXT.md
   - 加载项目需求

2. **定义规格**
   - 功能描述
   - 边界条件
   - 验收标准

3. **模糊度评分**
   - 目标清晰度
   - 边界清晰度
   - 约束清晰度

4. **生成 SPEC.md**

</workflow>