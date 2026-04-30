<purpose>
检查 Java 代码是否符合金蝶苍穹开发规范。
</purpose>

<available_agent_types>
- kd-standards-checker — 代码规范检查专家
</available_agent_types>

<process>

## 1. 解析参数

```bash
FILE_PATH=$1
STANDARDS_DOC=~/.claude/kingdee-dev/references/coding-standards.md
```

**如果未提供文件路径**:
```
错误: 需要提供 Java 文件路径
用法: /kd-check <文件路径>
示例: /kd-check ./src/plugin/MyPlugin.java
```

## 2. 验证文件存在

```bash
if [[ ! -f "$FILE_PATH" ]]; then
  echo "错误: 文件不存在: $FILE_PATH"
  exit 1
fi

if [[ ! "$FILE_PATH" =~ \.java$ ]]; then
  echo "警告: 文件扩展名不是 .java"
fi
```

## 3. 读取规范文档

```bash
# 加载规范检查规则
if [[ -f "$STANDARDS_DOC" ]]; then
  echo "加载规范文档..."
else
  echo "警告: 规范文档不存在，使用默认规则"
fi
```

## 4. 调用规范检查代理

```javascript
Task({
  prompt: `
<check_request>
**文件路径**: ${FILE_PATH}
**规范文档**: ${STANDARDS_DOC}
</check_request>
  `,
  subagent_type: "kd-standards-checker",
  description: "检查代码规范"
})
```

## 5. 显示检查结果

**如果发现问题**:

```markdown
## ⚠ 检查完成 - 发现问题

**文件**: ${FILE_PATH}
**合规性**: {百分比}%
**严重问题**: {数量}
**建议问题**: {数量}

### ❌ 严重问题

1. **循环数据库查询** (行 30-35)
   ```java
   for (DynamicObject item : items) {
       BusinessDataServiceHelper.loadSingle(...);
   }
   ```
   建议: 使用批量查询

### ⚠ 建议修复

1. **魔法值** (行 15)
   ```java
   if (status == 1)
   ```
   建议: 定义常量 `STATUS_DRAFT = 1`

---

需要修复这些问题吗？[Y/n]
```

**如果通过检查**:

```markdown
## ✅ 检查通过

**文件**: ${FILE_PATH}
**合规性**: 100%

所有检查项都通过了！
```

## 6. 提供修复建议

如果用户选择修复，提供具体的修复代码示例。

</process>

<success_criteria>
- [ ] 文件路径已验证
- [ ] 规范文档已加载
- [ ] 规范检查代理已调用
- [ ] 检查报告已生成
- [ ] 用户看到问题和建议
</success_criteria>
