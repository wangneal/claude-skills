# 常量类扫描器

## 功能说明

常量类扫描器可以扫描项目中的 Java 文件，自动识别以 `Cons`、`Con`、`Constant` 结尾的常量类。优先显示 `common` 包中的常量类。

## 用法

### 基本用法

```bash
# 扫描当前目录
node .bos-flow/bin/cli.js scan-constants

# 扫描指定目录
node .bos-flow/bin/cli.js scan-constants /path/to/project

# 详细输出（包含包名）
node .bos-flow/bin/cli.js scan-constants -v

# JSON 格式输出
node .bos-flow/bin/cli.js scan-constants --json

# 输出到文件
node .bos-flow/bin/cli.js scan-constants -o results.txt
```

### 使用模块

```javascript
const scanner = require('.bos-flow/lib/constant-scanner');

// 扫描项目
const results = await scanner.scanProject('./project-path');

// 格式化输出
console.log(scanner.formatResults(results, { verbose: true }));

// JSON 输出
console.log(scanner.toJSON(results));
```

## 识别规则

### 命名模式

- 类名以 `Cons` 结尾：`UserCons`, `SystemCons`
- 类名以 `Con` 结尾：`DBCon`, `APICon`
- 类名以 `Constant` 结尾：`UserRoleConstant`, `SystemConstant`

### 内容特征

如果类名不符合命名模式，但文件内容包含 3 个以上 `public static final` 常量定义，也会被识别为常量类。

### 排除目录

以下目录会被自动排除：
- `node_modules`
- `target`
- `build`
- `dist`
- `.git`
- `.svn`
- `.idea`
- `.vscode`
- `out`
- `bin`
- `obj`
- `packages`

## 输出格式

### 文本输出

```
找到 3 个常量类:

[common] 1. UserRoleConstant
     包: com.kingdee.common.constants
     路径: src/main/java/com/kingdee/common/constants/UserRoleConstant.java

[common] 2. SystemConstant
     包: com.kingdee.common.constants
     路径: src/main/java/com/kingdee/common/constants/SystemConstant.java

         3. DBCons
     包: com.kingdee.db
     路径: src/main/java/com/kingdee/db/DBCons.java
```

### JSON 输出

```json
{
  "total": 3,
  "commonCount": 2,
  "results": [
    {
      "filePath": "src/main/java/com/kingdee/common/constants/UserRoleConstant.java",
      "className": "UserRoleConstant",
      "packageName": "com.kingdee.common.constants",
      "isInCommon": true
    },
    {
      "filePath": "src/main/java/com/kingdee/common/constants/SystemConstant.java",
      "className": "SystemConstant",
      "packageName": "com.kingdee.common.constants",
      "isInCommon": true
    },
    {
      "filePath": "src/main/java/com/kingdee/db/DBCons.java",
      "className": "DBCons",
      "packageName": "com.kingdee.db",
      "isInCommon": false
    }
  ]
}
```

## 常见问题

### 为什么有些常量类没有被识别？

1. 检查类名是否符合命名模式
2. 检查文件中是否有至少 3 个 `public static final` 常量定义
3. 确认文件不在排除的目录中

### 如何添加自定义排除目录？

编辑 `.bos-flow/lib/constant-scanner.js`，修改 `excludeDirs` 数组：

```javascript
this.excludeDirs = [
  'node_modules',
  'your-custom-dir',
  // ...
];
```

## 开发说明

### API 接口

```javascript
class ConstantScanner {
  // 扫描项目目录
  async scanProject(projectPath)

  // 查找所有 Java 文件
  async findJavaFiles(dirPath)

  // 识别常量类
  async findConstantClasses(javaFiles)

  // 提取包名
  extractPackage(filePath)

  // 检查是否在 common 包中
  isInCommonPackage(filePath)

  // 优先排序
  prioritizeCommonPackage(results)

  // 格式化输出
  formatResults(results, options)

  // JSON 输出
  toJSON(results)
}
```

### 测试

```bash
# 独立运行测试
node .bos-flow/lib/constant-scanner.js /path/to/project
```

## 版本历史

- **v1.0.0** - 初始版本
  - 支持命名模式识别
  - 支持内容特征识别
  - 优先显示 common 包
  - 支持多种输出格式
