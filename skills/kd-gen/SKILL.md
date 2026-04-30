---
name: kd:gen
description: "生成金蝶插件代码"
argument-hint: "<插件类型> [--class <类名>] [--entity <实体名>]"
allowed-tools:
  - Read
  - Write
  - Task
---

<objective>
根据插件类型生成符合金蝶开发规范的 Java 代码。
</objective>

<execution_context>
@$HOME/.claude/kingdee-dev/workflows/generate-code.md
@$HOME/.claude/kingdee-dev/templates/plugin/
</execution_context>

<process>
1. 选择代码模板
2. 调用 kd-code-generator agent
3. 生成 Java 代码
4. 应用代码规范
</process>

<supported_types>
- FormPlugin - 表单插件
- WorkflowPlugin - 工作流插件
- OperationPlugin - 操作插件
- BillPlugin - 单据插件
- ReportPlugin - 报表插件
</supported_types>

<examples>

### 示例 1: 生成表单插件

```
用户: /kd-gen FormPlugin --class SalesOrderFormPlugin
```

生成:
- SalesOrderFormPlugin.java
- 包含常用方法
- 符合开发规范

### 示例 2: 指定实体

```
用户: /kd-gen FormPlugin --class OrderPlugin --entity kdev_order
```

</examples>
