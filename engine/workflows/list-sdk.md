<purpose>
列出金蝶 SDK 知识库中的模块、类和方法。
</purpose>

<process>

## 1. 解析参数

```bash
TARGET=$1
SHOW_DETAIL=${2:-false}
SDK_PATH=~/.claude/kingdee-dev/sdk
MODULES_FILE="$SDK_PATH/modules.json"
```

## 2. 读取模块索引

```bash
if [[ ! -f "$MODULES_FILE" ]]; then
  echo "错误: SDK 模块索引不存在"
  echo "位置: $MODULES_FILE"
  exit 1
fi
```

## 3. 显示不同层级

### 列出所有模块（无参数）

```markdown
📚 SDK 知识库列表

模块总数: 17
类总数: 48
方法总数: 783

模块列表:

  核心框架 (kd.bos)
    - 15 个类
    - DynamicObject, BusinessDataServiceHelper, ...

  算法 (kd.bos.algo)
    - 1 个类

  数据库 (kd.bos.db)
    - 1 个类

  ...

---

查看模块详情: /kd-list <模块名>
查看类详情: /kd-list <类名> --detail
```

### 列出模块的类

```bash
if [[ "$TARGET" =~ ^kd\. ]]; then
  # 这是模块名
  echo "模块: $TARGET"
  echo ""
  echo "类列表:"

  # 从 modules.json 读取类列表
  # 显示每个类的名称和方法数
fi
```

### 列出类的详情

```bash
if [[ "$SHOW_DETAIL" == "true" ]]; then
  # 读取类的详细文档
  CLASS_FILE="$SDK_PATH/kd_bos/${TARGET}.md"

  if [[ -f "$CLASS_FILE" ]]; then
    echo "类: $TARGET"
    echo ""
    cat "$CLASS_FILE"
  else
    echo "错误: 类文档不存在: $TARGET"
  fi
fi
```

## 4. 格式化输出

使用表格格式：

```markdown
| 类名 | 方法数 | 用途 |
|------|--------|------|
| DynamicObject | 18 | 动态对象操作 |
| BusinessDataServiceHelper | 28 | 业务数据服务 |
| WorkflowServiceHelper | 15 | 工作流服务 |
```

## 5. 提供搜索建议

```markdown
---

搜索 SDK:
  /kd-research "关键词"

查看文档:
  /kd-list DynamicObject --detail
```

</process>

<success_criteria>
- [ ] 模块索引已读取
- [ ] 根据参数过滤内容
- [ ] 格式化输出
- [ ] 用户看到搜索建议
</success_criteria>
