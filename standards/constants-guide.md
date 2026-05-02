# 常量定义规范

## 概述

本文档定义了 bos-flow 生成的 Java 代码中常量定义的规范。

**核心原则**：禁止使用魔法值，所有字面值必须定义为常量。

---

## 1. 什么是魔法值？

**魔法值（Magic Values）**：在代码中直接使用的字面值（字符串、数字等），缺乏语义说明。

### 1.1 魔法值的问题

```java
// ❌ 错误：使用魔法值
String value = obj.get("fbillno");      // "fbillno" 是什么？
if (status == 2) { ... }                // 2 代表什么状态？
if (amount < 100) { ... }               // 100 是什么业务规则？
throw new Exception("客户不能为空");    // 硬编码的错误消息
```

**问题**：
1. 可读性差 - 无法理解含义
2. 维护困难 - 修改时需要全局查找
3. 易出错 - 拼写错误无法检测
4. 无法国际化 - 硬编码字符串

### 1.2 使用常量的优势

```java
// ✅ 正确：使用常量
String value = obj.get(FieldKeys.BILL_NO);
if (status == EnumValues.STATUS_APPROVED) { ... }
if (amount.compareTo(BusinessRules.MIN_ORDER_AMOUNT) < 0) { ... }
throw new RuntimeException(ErrorMessages.CUSTOMER_REQUIRED);
```

**优势**：
1. ✅ 语义明确 - 常量名说明用途
2. ✅ 易于维护 - 修改只需改一处
3. ✅ 类型安全 - IDE 提供自动补全
4. ✅ 便于国际化 - 集中管理

---

## 2. 常量分类

### 2.1 字段标识常量（FieldKeys）

**用途**：定义所有字段标识符

**命名规范**：
- 使用静态内部类 `FieldKeys`
- 字段名使用大写下划线命名
- 添加注释说明字段含义

**示例**：

```java
private static final class FieldKeys {
    private FieldKeys() {}  // 私有构造函数，防止实例化

    // 单据头字段
    public static final String BILL_NO = "fbillno";           // 单据编号
    public static final String CUSTOMER = "fcustomerid";      // 客户
    public static final String TOTAL_AMOUNT = "ftotalamount"; // 总金额
    public static final String APPROVE_STATUS = "fapprovestatus"; // 审批状态

    // 单据体字段
    public static final String ENTRY_KEY = "fsaleorderentry"; // 单据体标识
    public static final String MATERIAL = "fmaterialid";      // 物料
    public static final String QTY = "fqty";                  // 数量
    public static final String PRICE = "fprice";              // 单价
    public static final String AMOUNT = "famount";            // 金额

    // 基础资料字段
    public static final String MATERIAL_NUMBER = "fnumber";   // 物料编码
    public static final String MATERIAL_NAME = "fname";       // 物料名称
}
```

**使用方式**：

```java
// ✅ 正确：使用字段标识常量
String billNo = (String) obj.get(FieldKeys.BILL_NO);
DynamicObject material = (DynamicObject) row.get(FieldKeys.MATERIAL);

// ❌ 错误：使用魔法字符串
String billNo = (String) obj.get("fbillno");
```

### 2.2 枚举值常量（EnumValues）

**用途**：定义所有枚举值和状态码

**命名规范**：
- 使用静态内部类 `EnumValues`
- 枚举名使用大写下划线命名
- 添加注释说明含义

**示例**：

```java
private static final class EnumValues {
    private EnumValues() {}

    // 审批状态枚举
    public static final int STATUS_DRAFT = 0;      // 草稿
    public static final int STATUS_SUBMITTED = 1;  // 已提交
    public static final int STATUS_APPROVED = 2;   // 已审核
    public static final int STATUS_REJECTED = 3;   // 已驳回

    // 客户类型枚举
    public static final String CUSTOMER_TYPE_VIP = "VIP";      // VIP客户
    public static final String CUSTOMER_TYPE_NORMAL = "Normal"; // 普通客户

    // 是/否枚举
    public static final int YES = 1;
    public static final int NO = 0;
}
```

**使用方式**：

```java
// ✅ 正确：使用枚举值常量
if (status == EnumValues.STATUS_APPROVED) {
    // 已审核的逻辑
}

// ❌ 错误：使用魔法数字
if (status == 2) {
    // 2 是什么意思？
}
```

### 2.3 业务规则常量（BusinessRules）

**用途**：定义所有业务规则和阈值

**命名规范**：
- 使用静态内部类 `BusinessRules`
- 常量名使用大写下划线命名
- 添加注释说明业务含义

**示例**：

```java
private static final class BusinessRules {
    private BusinessRules() {}

    // 金额限制
    public static final BigDecimal MIN_ORDER_AMOUNT = new BigDecimal("100");  // 最小订单金额
    public static final BigDecimal MAX_DISCOUNT_RATE = new BigDecimal("0.8"); // 最大折扣率

    // 数量限制
    public static final int MAX_ENTRY_ROWS = 100;        // 单据体最大行数
    public static final int MAX_RETRY_COUNT = 3;         // 最大重试次数

    // 容差
    public static final BigDecimal AMOUNT_TOLERANCE = new BigDecimal("0.01"); // 金额容差
}
```

**使用方式**：

```java
// ✅ 正确：使用业务规则常量
if (amount.compareTo(BusinessRules.MIN_ORDER_AMOUNT) < 0) {
    throw new RuntimeException("订单金额不能小于最小限额");
}

// ❌ 错误：使用魔法数字
if (amount < 100) {
    throw new RuntimeException("订单金额不能小于100元");
}
```

### 2.4 错误消息常量（ErrorMessages）

**用途**：定义所有错误消息和提示文本

**命名规范**：
- 使用静态内部类 `ErrorMessages`
- 常量名使用大写下划线命名
- 消息文本清晰明确

**示例**：

```java
private static final class ErrorMessages {
    private ErrorMessages() {}

    // 必填校验消息
    public static final String CUSTOMER_REQUIRED = "客户不能为空";
    public static final String BILL_DATE_REQUIRED = "日期不能为空";
    public static final String MATERIAL_REQUIRED = "物料不能为空";

    // 数值校验消息
    public static final String QTY_MUST_POSITIVE = "数量必须大于0";
    public static final String PRICE_NEGATIVE = "单价不能为负数";

    // 业务规则消息
    public static final String AMOUNT_MISMATCH = "金额合计不一致";
    public static final String MATERIAL_DUPLICATE = "物料重复";

    // 通用消息
    public static final String ROW_PREFIX = "第";
    public static final String ROW_SUFFIX = "行：";
    public static final String LOAD_FAILED = "加载单据失败：";
    public static final String SAVE_FAILED = "保存失败：";
}
```

**使用方式**：

```java
// ✅ 正确：使用错误消息常量
if (customer == null) {
    throw new RuntimeException(ErrorMessages.CUSTOMER_REQUIRED);
}

// 拼接消息
throw new RuntimeException(
    ErrorMessages.ROW_PREFIX + rowIndex + ErrorMessages.ROW_SUFFIX + 
    ErrorMessages.MATERIAL_REQUIRED
);

// ❌ 错误：硬编码错误消息
if (customer == null) {
    throw new RuntimeException("客户不能为空");
}
```

---

## 3. 常量定义规则

### 3.1 必须定义的常量类型

| 类型 | 说明 | 示例 |
|------|------|------|
| **字段标识** | 所有访问字段的字符串 | `FieldKeys.BILL_NO` |
| **枚举值** | 所有枚举和状态码 | `EnumValues.STATUS_APPROVED` |
| **业务规则** | 所有业务阈值和限制 | `BusinessRules.MIN_AMOUNT` |
| **错误消息** | 所有提示和错误文本 | `ErrorMessages.CUSTOMER_REQUIRED` |

### 3.2 常量定义位置

```java
public class PluginExample extends AbstractBillPlugIn {
    
    // ✅ 正确：常量定义在类的开头
    private static final class FieldKeys { ... }
    private static final class EnumValues { ... }
    private static final class BusinessRules { ... }
    private static final class ErrorMessages { ... }
    
    // 然后是成员变量
    // 然后是方法
}
```

### 3.3 常量的可访问性

```java
// ✅ 正确：常量使用 public static final
public static final String BILL_NO = "fbillno";

// ❌ 错误：常量不应该可变
public static String BILL_NO = "fbillno";  // 缺少 final
private String BILL_NO = "fbillno";         // 不应该是实例变量
```

---

## 4. 常量使用检查

### 4.1 禁止的模式

```java
// ❌ 禁止：魔法字符串
obj.get("fbillno")
obj.set("fstatus", "approved")
throw new Exception("客户不能为空")

// ❌ 禁止：魔法数字
if (status == 2) { ... }
if (amount < 100) { ... }
for (int i = 0; i < 100; i++) { ... }
```

### 4.2 正确的模式

```java
// ✅ 正确：使用常量
obj.get(FieldKeys.BILL_NO)
obj.set(FieldKeys.STATUS, EnumValues.STATUS_APPROVED)
throw new RuntimeException(ErrorMessages.CUSTOMER_REQUIRED)

// ✅ 正确：使用枚举和业务规则
if (status == EnumValues.STATUS_APPROVED) { ... }
if (amount.compareTo(BusinessRules.MIN_ORDER_AMOUNT) < 0) { ... }
for (int i = 0; i < BusinessRules.MAX_ENTRY_ROWS; i++) { ... }
```

---

## 5. 常量命名最佳实践

### 5.1 命名要有意义

```java
// ✅ 正确：命名清晰
public static final String BILL_NO = "fbillno";              // 单据编号
public static final int STATUS_APPROVED = 2;                 // 已审核状态
public static final BigDecimal MIN_ORDER_AMOUNT = new BigDecimal("100"); // 最小订单金额

// ❌ 错误：命名不清晰
public static final String FIELD1 = "fbillno";              // FIELD1 是什么？
public static final int STATUS_2 = 2;                       // STATUS_2 是什么？
public static final BigDecimal AMOUNT_100 = new BigDecimal("100"); // AMOUNT_100 的业务含义？
```

### 5.2 分组相关常量

```java
// ✅ 正确：按功能分组
private static final class FieldKeys {
    // 单据头字段
    public static final String BILL_NO = "fbillno";
    public static final String CUSTOMER = "fcustomerid";
    
    // 单据体字段
    public static final String ENTRY_KEY = "fsaleorderentry";
    public static final String MATERIAL = "fmaterialid";
}

// ❌ 错误：混杂在一起
private static final String BILL_NO = "fbillno";
private static final int STATUS_APPROVED = 2;
private static final String CUSTOMER = "fcustomerid";
private static final BigDecimal MIN_AMOUNT = new BigDecimal("100");
```

---

## 6. 验收标准

代码审查时检查：

- [ ] 所有字段标识使用常量
- [ ] 所有枚举值使用常量
- [ ] 所有业务规则使用常量
- [ ] 所有错误消息使用常量
- [ ] 无魔法字符串
- [ ] 无魔法数字
- [ ] 常量命名清晰
- [ ] 常量分组合理
- [ ] 常量定义在类开头

---

## 7. 检查工具

可以使用静态代码分析工具检测魔法值：

- **SonarQube**: 规则 `java:S1192` - String literals should not be duplicated
- **PMD**: 规则 `AvoidDuplicateLiterals`
- **Checkstyle**: 规则 `MultipleStringLiterals`

---

*Generated by bos-flow - Constants Definition Standards*
