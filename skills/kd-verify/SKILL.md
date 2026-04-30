---
name: kd:verify
description: "验证金蝶开发阶段的完成情况"
argument-hint: "[阶段号]"
allowed-tools:
  - Read
  - Bash
  - Task
---

<objective>
验证阶段是否达到验收标准，检查代码质量和功能完整性。
</objective>

<execution_context>
@$HOME/.claude/kingdee-dev/workflows/verify-phase.md
</execution_context>

<process>
执行 verify 工作流，验证阶段完成情况。
</process>

<examples>

### 示例 1: 验证当前阶段

```
用户: /kd:verify
```

验证当前阶段的完成情况。

### 示例 2: 验证指定阶段

```
用户: /kd:verify 2
```

验证第 2 阶段是否完成。

</examples>

<workflow>

## 验证流程

1. **加载验收标准**
   - 读取 PLAN.md
   - 提取验收标准

2. **检查功能完成**
   - 验证所有任务已完成
   - 检查代码是否存在

3. **代码质量检查**
   - 调用 kd-check
   - 检查规范合规性

4. **生成验证报告**
   - 通过/失败状态
   - 问题列表
   - 修复建议

</workflow>
