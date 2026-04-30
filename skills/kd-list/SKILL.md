---
name: kd:list
description: "列出金蝶 SDK 模块、类或方法"
argument-hint: "[模块名|类名] [--detail]"
allowed-tools:
  - Read
  - Grep
---

<objective>
列出 SDK 知识库中的模块、类和方法，帮助开发者快速查找 API。
</objective>

<execution_context>
@$HOME/.claude/kingdee-dev/workflows/list-sdk.md
@$HOME/.claude/kingdee-dev/sdk/modules.json
</execution_context>

<process>
1. 读取 modules.json
2. 根据参数过滤
3. 格式化输出
4. 显示详细信息（可选）
</process>

<examples>

### 示例 1: 列出所有模块

```
用户: /kd-list
```

输出:
- 17 个模块
- 每个模块的类数量

### 示例 2: 列出模块的类

```
用户: /kd-list kd.bos
```

输出:
- kd.bos 模块的所有类

### 示例 3: 显示类详情

```
用户: /kd-list DynamicObject --detail
```

输出:
- DynamicObject 类的所有方法
- 每个方法的说明

</examples>
