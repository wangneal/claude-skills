---
name: kd:init
description: "初始化金蝶苍穹开发项目"
argument-hint: "<项目名> [--description <描述>]"
allowed-tools:
  - Read
  - Bash
  - Write
  - AskUserQuestion
---

<objective>
初始化一个新的金蝶苍穹开发项目，创建项目结构和配置文件。
</objective>

<execution_context>
@$HOME/.claude/kingdee-dev/workflows/init-project.md
@$HOME/.claude/kingdee-dev/templates/phase/
</execution_context>

<process>
执行 init-project 工作流，创建金蝶项目结构。
</process>

<examples>

### 示例 1: 创建新项目

```
用户: /kd-init 销售订单管理系统
```

执行:
1. 创建项目目录
2. 生成配置文件
3. 复制阶段模板
4. 生成 README

### 示例 2: 带描述创建

```
用户: /kd-init 库存管理系统 --description "仓库库存管理插件"
```

</examples>
