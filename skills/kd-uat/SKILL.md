---
name: kd:uat
description: "UAT测试：用户验收测试，生成测试报告"
argument-hint: "<阶段号>"
allowed-tools:
  - Read
  - Write
  - Bash
  - Grep
---

<objective>
执行用户验收测试 (UAT)，验证功能满足业务需求，生成测试报告。
</objective>

<context>
阶段: Phase 8 - UAT测试
输入: 已验证代码 (kd-verify 输出)
输出: UAT报告.md
</context>

<process>
1. 加载验收测试用例
2. 执行功能测试
3. 记录测试结果
4. 生成 UAT 报告
</process>

<examples>

### 示例 1: 执行UAT测试

```
用户: /kd-uat 1
```

对第 1 阶段执行 UAT 测试。

### 示例 2: 执行所有UAT

```
用户: /kd-uat
```

对当前所有已完成阶段执行 UAT。

</examples>

<workflow>

## UAT 测试流程

1. **加载测试用例**
   - 读取 SPEC.md 中的验收标准
   - 加载需求文档

2. **功能测试**
   - 验证核心功能
   - 测试边界条件
   - 检查异常处理

3. **业务场景测试**
   - 模拟真实业务操作
   - 验证业务流程

4. **生成报告**
   - 测试结果汇总
   - 问题记录
   - 通过/失败判定

</workflow>