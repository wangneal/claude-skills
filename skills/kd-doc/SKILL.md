---
name: kd:doc
description: "生成金蝶项目文档"
argument-hint: "<文档类型> [--output <文件>]"
allowed-tools:
  - Read
  - Write
  - Grep
  - Glob
  - Task
---

<objective>
为金蝶开发项目生成中文技术文档，包括 README、API 文档等。
</objective>

<execution_context>
@$HOME/.claude/kingdee-dev/workflows/generate-doc.md
</execution_context>

<process>
1. 扫描项目文件
2. 调用 kd-doc-writer agent
3. 生成文档
4. 保存到指定位置
</process>

<doc_types>
- readme - 生成 README.md
- api - 生成 API 文档
- guide - 生成开发指南
- changelog - 生成更新日志
</doc_types>

<examples>

### 示例 1: 生成 README

```
用户: /kd-doc readme
```

生成:
- 项目简介
- 功能特性
- 快速开始
- 项目结构

### 示例 2: 生成 API 文档

```
用户: /kd-doc api --output ./docs/API.md
```

生成:
- 所有公共类的文档
- 方法说明
- 代码示例

</examples>
