---
name: kd:check
description: "检查代码是否符合金蝶开发规范"
argument-hint: "<文件路径>"
allowed-tools:
  - Read
  - Grep
  - Task
---

<objective>
检查 Java 代码是否符合金蝶苍穹开发规范，检测魔法值、循环数据库查询等问题。
</objective>

<execution_context>
@$HOME/.claude/kingdee-dev/workflows/check-standards.md
@$HOME/.claude/kingdee-dev/references/coding-standards.md
</execution_context>

<process>
1. 读取 Java 文件
2. 调用 kd-standards-checker agent
3. 检查多个维度
4. 生成检查报告
</process>

<check_dimensions>
- 魔法值检测
- 命名规范检查
- 异常处理检查
- 循环数据库查询检测
</check_dimensions>

<examples>

### 示例 1: 检查单个文件

```
用户: /kd-check ./SalesOrderFormPlugin.java
```

输出:
- 检查结果概览
- 详细问题列表
- 修复建议

### 示例 2: 检查多个文件

```
用户: /kd-check ./src/**/*.java
```

</examples>
