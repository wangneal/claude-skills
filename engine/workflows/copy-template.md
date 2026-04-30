<purpose>
复制代码模板或阶段模板到当前项目。
</purpose>

<process>

## 1. 解析参数

```bash
TEMPLATE_TYPE=$1
OUTPUT_DIR=${2:-"."}
TEMPLATES_PATH=~/.claude/kingdee-dev/templates
```

**支持的模板类型**:

### 插件模板
- FormPlugin - 表单插件
- WorkflowPlugin - 工作流插件
- OperationPlugin - 操作插件
- BillPlugin - 单据插件
- ReportPlugin - 报表插件

### 阶段模板
- planning - 计划阶段
- development - 开发阶段
- testing - 测试阶段
- uat - UAT 验收

### 其他
- all - 所有模板

## 2. 验证模板类型

```bash
validate_template() {
  case "$TEMPLATE_TYPE" in
    FormPlugin|WorkflowPlugin|OperationPlugin|BillPlugin|ReportPlugin)
      TEMPLATE_FILE="$TEMPLATES_PATH/plugin/${TEMPLATE_TYPE}.java"
      ;;
    planning|development|testing|uat)
      TEMPLATE_FILE="$TEMPLATES_PATH/phase/${TEMPLATE_TYPE^^}.md"
      ;;
    all)
      TEMPLATE_FILE="all"
      ;;
    *)
      echo "错误: 不支持的模板类型: $TEMPLATE_TYPE"
      echo "支持: FormPlugin, WorkflowPlugin, planning, development, all"
      exit 1
      ;;
  esac
}
```

## 3. 复制模板文件

### 单个插件模板

```bash
if [[ -f "$TEMPLATE_FILE" ]]; then
  cp "$TEMPLATE_FILE" "$OUTPUT_DIR/"
  echo "✅ 已复制: ${TEMPLATE_TYPE}.java"
else
  echo "❌ 模板文件不存在: $TEMPLATE_FILE"
fi
```

### 阶段模板

```bash
if [[ -f "$TEMPLATE_FILE" ]]; then
  mkdir -p "$OUTPUT_DIR/docs"
  cp "$TEMPLATE_FILE" "$OUTPUT_DIR/docs/"
  echo "✅ 已复制到: docs/${TEMPLATE_TYPE^^}.md"
else
  echo "❌ 模板文件不存在: $TEMPLATE_FILE"
fi
```

### 所有模板

```bash
if [[ "$TEMPLATE_TYPE" == "all" ]]; then
  # 复制插件模板
  mkdir -p "$OUTPUT_DIR/templates/plugin"
  cp -r "$TEMPLATES_PATH/plugin/"* "$OUTPUT_DIR/templates/plugin/"

  # 复制阶段模板
  mkdir -p "$OUTPUT_DIR/docs"
  cp -r "$TEMPLATES_PATH/phase/"* "$OUTPUT_DIR/docs/"

  echo "✅ 已复制所有模板"
fi
```

## 4. 显示使用说明

```markdown
## 📋 模板已复制

位置: ${OUTPUT_DIR}/

### 使用步骤

**插件模板**:
1. 重命名类名
2. 修改包名
3. 实现业务逻辑
4. 检查规范: /kd-check <文件>

**阶段模板**:
1. 填写项目信息
2. 添加具体任务
3. 更新进度
4. 完成检查项

### 快速开始

```bash
# 编辑模板
vim ${OUTPUT_DIR}/${TEMPLATE_TYPE}.java

# 检查规范
/kd-check ${OUTPUT_DIR}/${TEMPLATE_TYPE}.java
```
```

</process>

<success_criteria>
- [ ] 模板类型已验证
- [ ] 模板文件已找到
- [ ] 文件已复制到目标位置
- [ ] 用户看到使用说明
</success_criteria>
