# 常量类约束规范

## 目的

确保金蝶插件开发中所有常量都正确组织在常量类中，避免魔法值散落在代码中。

## 约束规则

### 规则 1: 禁止魔法值

**所有硬编码的字面量必须定义为常量**：

```java
// ❌ 错误：魔法值
if (status == 1) { ... }
String formId = "PF_xxx";

// ✅ 正确：使用常量类
if (status == StatusConstants.DRAFT) { ... }
String formId = FormConstants.SALES_ORDER_FORM_ID;
```

### 规则 2: 常量类必须放在 common 包

**所有常量类必须位于 `common` 包中**：

```
src/
├── common/
│   └── constants/
│       ├── StatusConstants.java      // 状态常量
│       ├── FormConstants.java        // 表单常量
│       ├── ErrorConstants.java       // 错误码常量
│       ├── BusinessConstants.java    // 业务常量
│       └── ...
```

### 规则 3: 常量类命名规范

常量类命名必须以 `Cons`、`Con` 或 `Constant` 结尾：

| 类型 | 示例 | 说明 |
|------|------|------|
| 状态 | `StatusConstants`, `OrderStatusCons` | 状态码 |
| 表单 | `FormConstants`, `BillFormCon` | 表单/单据标识 |
| 错误 | `ErrorConstants`, `ErrorCodeCon` | 错误码 |
| 业务 | `BusinessConstants`, `ConfigConstant` | 业务常量 |
| 数据库 | `DBCons` | 数据库相关常量 |

### 规则 4: 常量定义规范

```java
package com.kingdee.common.constants;

import java.util.HashMap;
import java.util.Map;

/**
 * 状态常量类
 * 用于定义所有业务状态码
 */
public class StatusConstants {

    // ===== 订单状态 =====

    /** 草稿 */
    public static final int DRAFT = 0;

    /** 已提交 */
    public static final int SUBMITTED = 1;

    /** 审批中 */
    public static final int APPROVING = 2;

    /** 已审批 */
    public static final int APPROVED = 3;

    /** 已拒绝 */
    public static final int REJECTED = 4;

    /** 已关闭 */
    public static final int CLOSED = 5;

    // ===== 状态映射 =====

    private static final Map<Integer, String> STATUS_NAMES = new HashMap<>();
    static {
        STATUS_NAMES.put(DRAFT, "草稿");
        STATUS_NAMES.put(SUBMITTED, "已提交");
        STATUS_NAMES.put(APPROVING, "审批中");
        STATUS_NAMES.put(APPROVED, "已审批");
        STATUS_NAMES.put(REJECTED, "已拒绝");
        STATUS_NAMES.put(CLOSED, "已关闭");
    }

    /**
     * 获取状态名称
     */
    public static String getStatusName(int status) {
        return STATUS_NAMES.getOrDefault(status, "未知状态");
    }

    /**
     * 判断是否为有效状态
     */
    public static boolean isValid(int status) {
        return STATUS_NAMES.containsKey(status);
    }
}
```

## 常量类扫描器

### 功能

扫描项目中的所有 Java 文件，识别常量类并输出列表。

### 使用方式

```javascript
const ConstantScanner = require('./engine/constant-scanner.js');
const scanner = new ConstantScanner();

// 扫描项目
const results = await scanner.scanProject('./src');

// 输出 Markdown 表格
console.log(scanner.formatAsMarkdown(results));
```

### 输出示例

```
| 类名 | 包名 | 路径 |
|------|------|------|
| 📁 UserRoleConstant | com.kingdee.common.constants | src/common/constants/UserRoleConstant.java |
| 📁 StatusConstants | com.kingdee.common.constants | src/common/constants/StatusConstants.java |
| 📁 FormConstants | com.kingdee.common.constants | src/common/constants/FormConstants.java |
| 📄 DBCons | com.kingdee.db | src/db/DBCons.java |
```

## 代码生成集成

### 在生成代码时自动引用常量

代码生成器在生成新代码时，必须：

1. **扫描现有常量类**：使用 `ConstantScanner` 扫描项目中的常量类
2. **引用现有常量**：代码中使用已定义的常量，而非硬编码
3. **提示创建新常量**：如果需要新常量，提示用户创建到 `common/constants/` 包

### 常量类查找优先级

1. `common/constants/` 包中的常量类
2. 同模块下的常量类
3. 其他模块的常量类（需要 import）

### 生成代码示例

```java
// ❌ 错误：硬编码
if ("SUBMITTED".equals(status)) { ... }

// ✅ 正确：引用常量
if (StatusConstants.SUBMITTED_STR.equals(status)) { ... }
```

## 检查清单

- [ ] 代码中无魔法值
- [ ] 所有常量都在 `common/constants/` 包中
- [ ] 常量类命名符合规范（Cons/Con/Constant 结尾）
- [ ] 常量有 JavaDoc 注释
- [ ] 需要新增常量时，在 common/constants/ 中创建新类

---

*规范版本: 1.0*
*最后更新: 2026-04-30*