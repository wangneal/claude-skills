---
name: kd:template
description: "复制金蝶开发模板到当前项目"
argument-hint: "<模板类型> [--output <目录>]"
allowed-tools:
  - Read
  - Write
  - Bash
---

<objective>
复制代码模板或阶段模板到当前项目，帮助快速开始开发。
</objective>

<execution_context>
@$HOME/.claude/kingdee-dev/workflows/copy-template.md
@$HOME/.claude/kingdee-dev/templates/
</execution_context>

<process>
1. 验证模板类型
2. 读取模板文件
3. 复制到目标位置
4. 显示使用说明
</process>

<template_types>

### 插件模板
- FormPlugin - 表单插件模板
- WorkflowPlugin - 工作流插件模板
- OperationPlugin - 操作插件模板

### 阶段模板
- planning - 计划阶段模板
- development - 开发阶段模板
- testing - 测试阶段模板
- uat - UAT 验收模板

### 其他
- all - 复制所有模板
</template_types>

<examples>

### 示例 1: 复制表单插件模板

```
用户: /kd-template FormPlugin
```

复制:
- FormPlugin.java 模板到当前目录

### 示例 2: 复制阶段模板

```
用户: /kd-template planning
```

复制:
- PLANNING.md 到 ./docs/

### 示例 3: 指定输出目录

```
用户: /kd-template FormPlugin --output ./src/plugin/
```

</examples>
