# kd-analyze: 需求分析 Skill

语义分析业务需求，提取功能点，推荐 SDK 类，提供实现思路。

## 功能

- **语义需求分析** - 识别业务动作和实体，提取功能点
- **功能点拆解** - 将需求分解为可执行的功能点列表
- **SDK 推荐** - 基于功能点动作类型推荐合适的 SDK 类
- **实现思路生成** - 提供实现步骤和代码模板

## 使用方式

```bash
/kd-analyze <需求>
```

或者在对话中直接使用：
```
请帮我分析这个需求：订单交货及时率报表
```

## 示例

```
/kd-analyze 创建销售订单并提交审批
/kd-analyze 生产工单计划变更需求
/kd-analyze 订单交货及时率报表
```

## 实现

- 模块位置: `engine/lib/requirement-analyzer.js`
- 使用 RequirementAnalyzer 类进行分析
- 支持的功能点动作: create, query, update, delete, approve, report, calculate, import

## SDK 推荐规则

| 动作类型 | 推荐 SDK |
|----------|----------|
| create | BusinessDataServiceHelper, DynamicObject |
| query | QueryServiceHelper, BusinessDataServiceHelper |
| update | BusinessDataServiceHelper, DynamicObject |
| approve | WorkflowServiceHelper |
| report | PrintServiceHelper, BusinessDataServiceHelper |
| calculate | DynamicObject, TimeServiceHelper |