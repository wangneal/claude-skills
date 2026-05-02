# Java 编码规范

## 概述

本文档定义了 bos-flow 生成的所有 Java 代码必须遵循的编码规范。

---

## 1. 语言规范

### 1.1 强制使用 Java 语言

**要求**：所有生成的代码必须是 Java，禁止使用其他语言（如 C#）。

**示例对比**：

```java
// ✅ 正确：Java 语法
import kd.bos.dataentity.entity.DynamicObject;
String value = (String) obj.get("fname");
BigDecimal amount = obj.getBigDecimal("famount");
```

```csharp
// ❌ 错误：C# 语法（禁止）
using System;
string value = obj.GetString("fname");  // 错误：C# 语法
decimal amount = obj.GetDecimal("famount");  // 错误：C# API
```

### 1.2 Java 命名规范

| 类型 | 规范 | 示例 |
|------|------|------|
| **类名** | 大驼峰命名法 | `SalesOrderFormPlugin` |
| **方法名** | 小驼峰命名法 | `readHeaderFields()` |
| **常量** | 全大写下划线分隔 | `BILL_NO`, `CUSTOMER_NAME` |
| **变量** | 小驼峰命名法 | `materialNumber`, `totalAmount` |
| **包名** | 全小写 | `kd.bos.plugin.demo` |

### 1.3 Java API 使用

**优先使用 Java 标准库**：

```java
// ✅ 正确：使用 Java 标准类
import java.math.BigDecimal;
import java.util.List;
import java.util.Map;
import java.util.HashMap;
import java.util.ArrayList;
import java.util.Date;

// ❌ 错误：使用 C# 或其他语言 API
// using System.Collections.Generic;  // C# 语法
```

---

## 2. 代码结构

### 2.1 类结构顺序

```java
public class PluginExample extends AbstractBillPlugIn {
    
    // 1. 常量定义（静态内部类）
    private static final class FieldKeys { ... }
    private static final class EnumValues { ... }
    private static final class BusinessRules { ... }
    private static final class ErrorMessages { ... }
    
    // 2. 成员变量（如果有）
    private String memberVariable;
    
    // 3. 公共方法（事件处理）
    @Override
    public void afterBindData(EventObject e) { ... }
    
    @Override
    public void beforeSave(BeforeSaveEventArgs e) { ... }
    
    // 4. 私有方法（业务逻辑）
    private void readHeaderFields() { ... }
    private void validateData() { ... }
    
    // 5. 辅助方法（工具方法）
    private Map<String, DynamicObject> batchLoad(...) { ... }
}
```

### 2.2 注释规范

**类注释**：

```java
/**
 * 销售订单表单插件示例
 *
 * 功能演示：
 * 1. 单据加载时读取字段值
 * 2. 根据条件设置字段可见性
 * 3. 保存前进行数据校验
 *
 * @author bos-flow
 * @version 1.0.0
 */
public class SalesOrderFormPlugin extends AbstractBillPlugIn {
    // ...
}
```

**方法注释**：

```java
/**
 * 批量加载物料信息
 *
 * 约束遵守：
 * ✅ 不在循环中查询数据库
 * ✅ 使用批量查询
 *
 * @param entries 单据体集合
 * @return 物料编码 -> 物料对象的映射
 */
private Map<String, DynamicObject> batchLoadMaterials(DynamicObjectCollection entries) {
    // ...
}
```

**行内注释**：

```java
// ✅ 正确：使用常量
String value = obj.get(FieldKeys.BILL_NO);

// ❌ 错误：使用魔法值（禁止）
// String value = obj.get("fbillno");
```

---

## 3. 类型转换

### 3.1 安全的类型转换

```java
// ✅ 正确：使用安全的类型转换
DynamicObject customer = (DynamicObject) obj.get(FieldKeys.CUSTOMER);
if (customer != null) {
    String name = (String) customer.get(FieldKeys.CUSTOMER_NAME);
}

// ❌ 错误：直接转换可能导致空指针
String name = ((DynamicObject) obj.get(FieldKeys.CUSTOMER)).get("fname").toString();
```

### 3.2 数值类型处理

```java
// ✅ 正确：使用 BigDecimal
BigDecimal amount = obj.getBigDecimal(FieldKeys.AMOUNT);
if (amount != null) {
    BigDecimal total = amount.multiply(new BigDecimal("1.1"));
}

// ✅ 正确：安全的数值转换
int status = obj.getInt(FieldKeys.STATUS);
boolean isActive = obj.getBoolean(FieldKeys.IS_ACTIVE);
```

---

## 4. 集合操作

### 4.1 使用泛型

```java
// ✅ 正确：使用泛型
List<String> materialNumbers = new ArrayList<>();
Map<String, DynamicObject> materialMap = new HashMap<>();
Set<String> uniqueIds = new HashSet<>();

// ❌ 错误：不使用泛型
List list = new ArrayList();  // 缺少类型参数
```

### 4.2 遍历方式

```java
// ✅ 正确：使用 for-each 循环
for (DynamicObject row : entries) {
    // 处理每行数据
}

// ✅ 正确：使用迭代器
Iterator<DynamicObject> iterator = entries.iterator();
while (iterator.hasNext()) {
    DynamicObject row = iterator.next();
}

// ❌ 错误：在循环中查询数据库
for (DynamicObject row : entries) {
    DynamicObject data = loadFromDB(...);  // 禁止
}
```

---

## 5. 异常处理

### 5.1 异常捕获

```java
// ✅ 正确：完整的异常处理
try {
    validateData();
} catch (Exception ex) {
    this.getView().showMessage("操作失败：" + ex.getMessage());
}

// ❌ 错误：空的 catch 块
try {
    validateData();
} catch (Exception ex) {
    // 忽略异常
}
```

### 5.2 业务异常

```java
// ✅ 正确：抛出有意义的业务异常
if (customer == null) {
    throw new RuntimeException(ErrorMessages.CUSTOMER_REQUIRED);
}

// ❌ 错误：异常消息硬编码
throw new RuntimeException("客户不能为空");  // 魔法值
```

---

## 6. 代码格式

### 6.1 缩进和空格

- 使用 4 个空格缩进（不使用 Tab）
- 运算符两侧加空格
- 逗号后加空格

```java
// ✅ 正确：规范的格式
if (amount != null && amount.compareTo(BigDecimal.ZERO) > 0) {
    BigDecimal total = amount.add(tax);
}

// ❌ 错误：格式混乱
if(amount!=null&&amount.compareTo(BigDecimal.ZERO)>0){
    BigDecimal total=amount.add(tax);
}
```

### 6.2 行长度限制

- 每行代码不超过 120 字符
- 长语句适当换行

```java
// ✅ 正确：适当换行
DynamicObject material = BusinessDataServiceHelper.loadSingle(
    "bd_material",
    new Object[] { FieldKeys.MATERIAL_NUMBER, materialNumber }
);

// ❌ 错误：一行过长
DynamicObject material = BusinessDataServiceHelper.loadSingle("bd_material", new Object[] { FieldKeys.MATERIAL_NUMBER, materialNumber });
```

---

## 7. 最佳实践

### 7.1 优先使用常量

```java
// ✅ 正确：所有字段标识使用常量
private static final class FieldKeys {
    public static final String BILL_NO = "fbillno";
    public static final String CUSTOMER = "fcustomerid";
}

String billNo = (String) obj.get(FieldKeys.BILL_NO);
```

### 7.2 避免魔法值

```java
// ❌ 禁止：魔法字符串和数字
String value = obj.get("fbillno");  // 魔法字符串
if (status == 2) { ... }              // 魔法数字

// ✅ 正确：使用常量
String value = obj.get(FieldKeys.BILL_NO);
if (status == EnumValues.STATUS_APPROVED) { ... }
```

### 7.3 使用批量操作

```java
// ❌ 禁止：在循环中操作数据库
for (DynamicObject row : entries) {
    DynamicObject data = loadFromDB(...);  // 禁止
}

// ✅ 正确：使用批量查询
DynamicObject[] materials = BusinessDataServiceHelper.load(...);
Map<String, DynamicObject> map = ...;
for (DynamicObject row : entries) {
    DynamicObject data = map.get(id);  // 从内存读取
}
```

---

## 8. 检查清单

代码生成前检查：

- [ ] 代码使用 Java 语言
- [ ] 遵循 Java 命名规范
- [ ] 使用 Java 标准库
- [ ] 所有字段标识使用常量
- [ ] 所有枚举值使用常量
- [ ] 所有错误消息使用常量
- [ ] 无魔法值
- [ ] 不在循环中查询数据库
- [ ] 不在循环中写入数据库
- [ ] 使用安全的类型转换
- [ ] 完整的异常处理
- [ ] 代码格式规范

---

*Generated by bos-flow - Java Coding Standards*
