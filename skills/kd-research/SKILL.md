---
name: kd:research
description: "研究金蝶 SDK，推荐相关的 API 和用法"
argument-hint: "\"<需求描述>\" [--output <文件>]"
allowed-tools:
  - Read
  - Grep
  - Glob
  - Task
---

<objective>
根据需求描述研究金蝶 SDK，推荐最合适的类和方法，提供使用示例。
</objective>

<execution_context>
@$HOME/.claude/kingdee-dev/workflows/research-sdk.md
@$HOME/.claude/kingdee-dev/sdk/
</execution_context>

<process>
1. 提取需求关键词
2. 搜索 SDK 知识库
3. 调用 kd-sdk-researcher agent
4. 生成研究报告
</process>

<examples>

### 示例 1: 研究工作流 API

```
用户: /kd-research "需要操作工作流数据"
```

输出:
- WorkflowServiceHelper 类
- DynamicObject 类
- 使用示例

### 示例 2: 输出到文件

```
用户: /kd-research "需要操作单据" --output SDK-RESEARCH.md
```

</examples>
