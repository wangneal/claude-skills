<purpose>
生成符合金蝶开发规范的 Java 插件代码。
</purpose>

<available_agent_types>
- kd-code-generator — 代码生成专家
</available_agent_types>

<process>

## 1. 解析参数

```bash
PLUGIN_TYPE=$1
CLASS_NAME=${2:-"MyPlugin"}
ENTITY_NAME=${3:-""}
OUTPUT_DIR=${4:-"./src/plugin"}
```

**支持的插件类型**:
- FormPlugin - 表单插件
- WorkflowPlugin - 工作流插件
- OperationPlugin - 操作插件
- BillPlugin - 单据插件
- ReportPlugin - 报表插件

**如果未提供插件类型**:
```
错误: 需要指定插件类型
用法: /kd-gen <插件类型> [--class <类名>] [--entity <实体名>]
支持的类型: FormPlugin, WorkflowPlugin, OperationPlugin, BillPlugin, ReportPlugin
示例: /kd-gen FormPlugin --class SalesOrderFormPlugin
```

## 2. 验证模板存在

```bash
TEMPLATE_PATH=~/.claude/kingdee-dev/templates/plugin/${PLUGIN_TYPE}.java

if [[ ! -f "$TEMPLATE_PATH" ]]; then
  echo "错误: 不支持的插件类型: $PLUGIN_TYPE"
  echo "支持的类型: FormPlugin, WorkflowPlugin, OperationPlugin, BillPlugin, ReportPlugin"
  exit 1
fi
```

## 3. 询问生成选项

使用 AskUserQuestion:

```
问题: 请选择代码生成选项
选项:
1. 基础模板 - 仅包含基本结构
2. 常用方法 - 包含常用的生命周期方法
3. 完整示例 - 包含完整的业务逻辑示例（推荐）
```

## 4. 调用代码生成代理

```javascript
Task({
  prompt: `
<generation_request>
**插件类型**: ${PLUGIN_TYPE}
**功能需求**: ${根据用户选择生成}
**实体名称**: ${ENTITY_NAME}
**类名**: ${CLASS_NAME}
**模板路径**: ${TEMPLATE_PATH}
**输出路径**: ${OUTPUT_DIR}/${CLASS_NAME}.java
</generation_request>
  `,
  subagent_type: "kd-code-generator",
  description: "生成插件代码"
})
```

## 5. 验证生成的代码

检查生成的代码是否：
- ✅ 无魔法值
- ✅ 符合命名规范
- ✅ 包含异常处理
- ✅ 包含日志记录
- ✅ 包含代码注释

## 6. 显示完成信息

```
✅ 代码生成成功！

文件: ${OUTPUT_DIR}/${CLASS_NAME}.java

已包含:
- 基础结构
- 生命周期方法
- 异常处理
- 日志记录
- 代码注释

下一步:
1. 查看代码: cat ${OUTPUT_DIR}/${CLASS_NAME}.java
2. 检查规范: /kd-check ${OUTPUT_DIR}/${CLASS_NAME}.java
3. 研究 SDK: /kd-research "你的需求"
```

## 7. 显示代码预览

显示生成代码的前 50 行，让用户快速查看。

</process>

<success_criteria>
- [ ] 插件类型已验证
- [ ] 模板文件已读取
- [ ] 代码生成代理已调用
- [ ] Java 文件已生成
- [ ] 代码符合规范
- [ ] 用户看到预览和下一步指引
</success_criteria>
