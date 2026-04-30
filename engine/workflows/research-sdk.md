<purpose>
研究金蝶 SDK，根据用户需求推荐相关的 API 和用法。
</purpose>

<available_agent_types>
- kd-sdk-researcher — SDK 研究专家
</available_agent_types>

<process>

## 1. 解析参数

```bash
REQUIREMENT=$1
OUTPUT_FILE=${2:-"SDK-RESEARCH.md"}
SDK_PATH=~/.claude/kingdee-dev/sdk
```

**如果未提供需求描述**:
```
错误: 需要提供需求描述
用法: /kd-research "<需求描述>" [--output <文件>]
示例: /kd-research "需要操作工作流数据"
```

## 2. 提取关键词

使用简单的关键词提取：

```bash
# 常见关键词映射
KEYWORDS=[]

# 如果需求包含"工作流"，添加相关关键词
if [[ "$REQUIREMENT" =~ "工作流" ]]; then
  KEYWORDS+=("WorkflowServiceHelper" "DynamicObject" "BillOperation")
fi

# 如果需求包含"单据"，添加相关关键词
if [[ "$REQUIREMENT" =~ "单据" ]]; then
  KEYWORDS+=("BusinessDataServiceHelper" "DynamicObject")
fi

# 如果需求包含"权限"，添加相关关键词
if [[ "$REQUIREMENT" =~ "权限" ]]; then
  KEYWORDS+=("PermissionServiceHelper")
fi
```

## 3. 调用 SDK 研究代理

```javascript
Task({
  prompt: `
<research_request>
**需求**: ${REQUIREMENT}
**上下文**: 金蝶苍穹开发
**SDK 路径**: ${SDK_PATH}
</research_request>
  `,
  subagent_type: "kd-sdk-researcher",
  description: "研究 SDK API"
})
```

## 4. 处理研究结果

**如果研究成功**:
```
✅ 找到 {N} 个推荐类

推荐:
1. {类名1} - {用途}
2. {类名2} - {用途}

详细报告: ${OUTPUT_FILE}
```

**如果未找到**:
```
⚠ 未找到直接相关的 SDK 类

建议:
1. 使用更具体的关键词
2. 查看 /kd-list 列出所有模块
3. 咨询金蝶开发文档
```

## 5. 保存研究报告

将研究结果保存到 `${OUTPUT_FILE}`。

## 6. 显示快速参考

```markdown
## 快速使用

### 1. 查看推荐类的详细信息
/kd-list {推荐类名} --detail

### 2. 生成使用示例
/kd-gen {插件类型} --entity {实体名}

### 3. 检查代码规范
/kd-check {你的代码文件}.java
```

</process>

<success_criteria>
- [ ] 需求关键词已提取
- [ ] SDK 研究代理已调用
- [ ] 推荐类列表已生成
- [ ] 研究报告已保存
- [ ] 用户看到快速参考
</success_criteria>
