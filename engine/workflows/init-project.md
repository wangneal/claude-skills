<purpose>
初始化金蝶苍穹开发项目，创建项目结构和配置文件。
</purpose>

<process>

## 1. 解析参数

```bash
PROJECT_NAME=$1
DESCRIPTION=${2:-"$PROJECT_NAME - 金蝶苍穹开发项目"}
```

**如果未提供项目名**:
```
错误: 需要提供项目名称
用法: /kd-init <项目名> [--description <描述>]
示例: /kd-init 销售订单管理系统
```

## 2. 创建项目目录结构

```bash
mkdir -p "$PROJECT_NAME"
mkdir -p "$PROJECT_NAME/src/plugin"
mkdir -p "$PROJECT_NAME/src/workflow"
mkdir -p "$PROJECT_NAME/config"
mkdir -p "$PROJECT_NAME/docs"
mkdir -p "$PROJECT_NAME/.kingdee"
```

## 3. 生成配置文件

创建 `.kingdee/config.json`:

```json
{
  "version": "1.0.0",
  "name": "$PROJECT_NAME",
  "description": "$DESCRIPTION",
  "platform": "kingdee-cosmic",
  "language": "java",
  "phases": [
    {
      "id": 1,
      "name": "计划阶段",
      "status": "pending"
    },
    {
      "id": 2,
      "name": "开发阶段",
      "status": "pending"
    },
    {
      "id": 3,
      "name": "测试阶段",
      "status": "pending"
    },
    {
      "id": 4,
      "name": "UAT验收",
      "status": "pending"
    }
  ],
  "config": {
    "sdk_version": "V5.0",
    "java_version": "1.8+"
  }
}
```

## 4. 复制阶段模板

```bash
# 复制四阶段模板到 docs 目录
cp ~/.claude/kingdee-dev/templates/phase/*.md "$PROJECT_NAME/docs/"
```

## 5. 生成 README.md

```markdown
# $PROJECT_NAME

$DESCRIPTION

## 项目简介

本项目是基于金蝶苍穹平台的开发项目。

## 技术栈

- 平台: 金蝶苍穹 V5.0
- 语言: Java 1.8+
- 数据库: MySQL 5.7+

## 项目结构

```
$PROJECT_NAME/
├── src/
│   ├── plugin/          # 插件代码
│   └── workflow/        # 工作流配置
├── config/              # 配置文件
├── docs/                # 文档
│   ├── PLANNING.md      # 计划阶段
│   ├── DEVELOPMENT.md   # 开发阶段
│   ├── TESTING.md       # 测试阶段
│   └── UAT.md           # UAT 验收
└── .kingdee/            # 金蝶配置
    └── config.json      # 项目配置
```

## 快速开始

### 1. 研究 SDK

```
/kd-research "需要操作单据"
```

### 2. 生成插件代码

```
/kd-gen FormPlugin --class MyPlugin
```

### 3. 检查代码规范

```
/kd-check ./src/plugin/MyPlugin.java
```

## 开发阶段

1. **计划阶段** - 查看 `docs/PLANNING.md`
2. **开发阶段** - 查看 `docs/DEVELOPMENT.md`
3. **测试阶段** - 查看 `docs/TESTING.md`
4. **UAT验收** - 查看 `docs/UAT.md`

## 相关文档

- [SDK 文档](.kingdee/sdk/)
- [开发规范](.kingdee/standards/)
- [API 参考](.kingdee/references/)

---

*Created by kingdee-dev-plugin on $(date)*
```

## 6. 生成 .gitignore

```gitignore
# Java
*.class
*.jar
*.war
*.ear
target/

# IDE
.idea/
*.iml
.vscode/
.project
.classpath

# Kingdee
.kingdee/logs/
.kingdee/cache/

# OS
.DS_Store
Thumbs.db

# Build
build/
dist/
```

## 7. 显示完成信息

```
✅ 项目创建成功！

项目: $PROJECT_NAME
位置: $PROJECT_NAME/

下一步:
  cd $PROJECT_NAME
  /kd-research "你的需求描述"
  /kd-gen FormPlugin --class MyPlugin

文档:
  - docs/PLANNING.md - 开始规划
  - docs/DEVELOPMENT.md - 开发指南
```

</process>

<success_criteria>
- [ ] 项目目录已创建
- [ ] 配置文件已生成
- [ ] 阶段模板已复制
- [ ] README.md 已创建
- [ ] .gitignore 已创建
- [ ] 用户看到下一步指引
</success_criteria>
