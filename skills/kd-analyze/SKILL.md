# kd-analyze: 需求分析 Skill

整合统一搜索、智能推荐、SDK研究与约束生成的一站式需求分析。

## 功能

- **统一搜索** - 搜索SDK文档和社区知识库 (18,077条)
- **智能推荐** - 基于需求推荐SDK类和社区最佳实践
- **SDK研究** - 搜索相关SDK类和方法
- **约束生成** - 自动生成代码约束文件

## 工作流阶段

属于 **需求分析阶段** (Phase 2)

## 使用方式

```bash
/kd-analyze <需求描述>
```

## 示例

```
/kd-analyze 开发工作流审批功能，需要启动工作流、提交审批
/kd-analyze 创建销售订单并提交审批
/kd-analyze 客户管理：增删改查
```

## 选项

- `--no-search` - 禁用统一搜索
- `--no-recommend` - 禁用智能推荐
- `--no-constraint` - 禁用约束文件生成
- `--limit <数量>` - 结果数量限制

## 实现

- 模块位置: `lib/kd-analyze.js`
- 使用 KdAnalyze 类进行分析
- 整合 UnifiedSearcher + IntelligentRecommender + kd-search-engine + kd-constraint-generator