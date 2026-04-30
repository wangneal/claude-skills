# 金蝶苍穹开发规范

本文档定义了金蝶苍穹开发的编码规范，所有生成的代码都必须遵守这些规范。

## 1. 命名规范

### 1.1 类名

- **格式**: 大驼峰（PascalCase）
- **规则**: 每个单词首字母大写
- **示例**:
  ```java
  // ✅ 正确
  public class SalesOrderFormPlugin extends AbstractFormPlugIn {}
  public class WorkflowApprovalPlugin {}

  // ❌ 错误
  public class salesOrderFormPlugin {}
  public class Sales_Order_Form_Plugin {}
  ```

### 1.2 方法名

- **格式**: 小驼峰（camelCase）
- **规则**: 首单词小写，后续单词首字母大写
- **示例**:
  ```java
  // ✅ 正确
  public void calculateAmount() {}
  public void afterBindData() {}

  // ❌ 错误
  public void CalculateAmount() {}
  public void calculate_amount() {}
  ```

### 1.3 常量名

- **格式**: 全大写下划线（UPPER_SNAKE_CASE）
- **规则**: 所有字母大写，单词间用下划线分隔
- **示例**:
  ```java
  // ✅ 正确
  private static final String FIELD_NAME = "name";
  private static final int MAX_RETRY_COUNT = 3;

  // ❌ 错误
  private static final String fieldName = "name";
  private static final int maxRetryCount = 3;
  ```

### 1.4 变量名

- **格式**: 小驼峰（camelCase）
- **示例**:
  ```java
  // ✅ 正确
  DynamicObject billData = model.getDataEntity();
  int itemCount = items.size();

  // ❌ 错误
  DynamicObject BillData = model.getDataEntity();
  int item_count = items.size();
  ```

---

## 2. 常量使用规范

### 2.1 禁止魔法值

**定义**: 魔法值是指代码中直接使用的数字、字符串等字面量，而没有说明其含义。

**规则**: 所有数值和字符串常量必须定义为常量。

**示例**:

```java
// ❌ 错误：使用魔法值
if (status == 1) {
    // 状态是什么？
}

if (type.equals("sales")) {
    // "sales" 是什么意思？
}

// ✅ 正确：使用常量
private static final int STATUS_DRAFT = 1;
private static final int STATUS_APPROVED = 2;
private static final String TYPE_SALES = "sales";
private static final String TYPE_PURCHASE = "purchase";

if (status == STATUS_DRAFT) {
    // 清晰：草稿状态
}

if (TYPE_SALES.equals(type)) {
    // 清晰：销售类型
}
```

### 2.2 常量定义位置

- 类级别常量定义在类的开头
- 使用 `private static final` 修饰
- 添加注释说明用途

**示例**:

```java
public class SalesOrderFormPlugin extends AbstractFormPlugIn {

    // ==================== 字段常量 ====================
    private static final String FIELD_CUSTOMER = "customer";  // 客户字段
    private static final String FIELD_AMOUNT = "amount";      // 金额字段
    private static final String FIELD_QTY = "qty";            // 数量字段

    // ==================== 状态常量 ====================
    private static final int STATUS_DRAFT = 1;       // 草稿
    private static final int STATUS_APPROVED = 2;    // 已审批
    private static final int STATUS_CLOSED = 3;      // 已关闭

    // 其他代码...
}
```

---

## 3. 异常处理规范

### 3.1 必须捕获异常

所有可能抛出异常的代码都必须有 try-catch 块。

**示例**:

```java
// ✅ 正确：捕获异常
@Override
public void propertyChanged(PropertyChangedArgs e) {
    try {
        String fieldName = e.getProperty().getName();
        calculateAmount();
    } catch (Exception ex) {
        logger.error("字段变化处理失败", ex);
        this.getView().showMessage("操作失败：" + ex.getMessage());
    }
}

// ❌ 错误：没有异常处理
@Override
public void propertyChanged(PropertyChangedArgs e) {
    String fieldName = e.getProperty().getName();
    calculateAmount();  // 可能抛出异常
}
```

### 3.2 异常日志

- 使用 `kd.bos.logging.Logger` 记录日志
- 记录异常堆栈信息
- 给用户友好的错误提示

**示例**:

```java
import kd.bos.logging.Logger;
import kd.bos.logging.LogFactory;

public class SalesOrderFormPlugin extends AbstractFormPlugIn {

    private static final Logger logger = LogFactory.getLogger(SalesOrderFormPlugin.class);

    public void someMethod() {
        try {
            // 业务逻辑
        } catch (KDBOSException e) {
            // 记录详细错误
            logger.error("业务操作失败", e);
            // 提示用户
            this.getView().showMessage("操作失败，请联系管理员");
        } catch (Exception e) {
            // 捕获其他异常
            logger.error("未知错误", e);
            this.getView().showMessage("系统错误：" + e.getMessage());
        }
    }
}
```

---

## 4. 性能优化规范

### 4.1 禁止循环数据库查询

**规则**: 不要在循环中查询数据库，应该批量查询。

**错误示例**:

```java
// ❌ 性能灾难：循环查询数据库
for (DynamicObject item : items) {
    Long productId = item.getLong("product_id");

    // 每次循环都查询数据库！
    DynamicObject product = BusinessDataServiceHelper.loadSingle(
        productId,
        "kdev_product"
    );

    // 处理产品数据
}
```

**正确示例**:

```java
// ✅ 正确：批量查询
// 1. 收集所有产品 ID
Set<Long> productIds = new HashSet<>();
for (DynamicObject item : items) {
    productIds.add(item.getLong("product_id"));
}

// 2. 一次性批量查询
DynamicObject[] products = BusinessDataServiceHelper.load(
    productIds.toArray(new Long[0]),
    "kdev_product"
);

// 3. 构建 ID -> 产品 的映射
Map<Long, DynamicObject> productMap = new HashMap<>();
for (DynamicObject product : products) {
    productMap.put(product.getLong("id"), product);
}

// 4. 在循环中使用映射
for (DynamicObject item : items) {
    Long productId = item.getLong("product_id");
    DynamicObject product = productMap.get(productId);
    // 处理产品数据
}
```

### 4.2 使用缓存

对于频繁访问的数据，使用缓存机制。

**示例**:

```java
// 使用静态变量缓存
private static Map<String, String> configCache = new HashMap<>();

public String getConfigValue(String key) {
    // 先从缓存获取
    if (configCache.containsKey(key)) {
        return configCache.get(key);
    }

    // 缓存中没有，查询数据库
    String value = queryFromDatabase(key);

    // 放入缓存
    configCache.put(key, value);

    return value;
}
```

---

## 5. 代码注释规范

### 5.1 类注释

```java
/**
 * 销售订单表单插件
 *
 * 功能：
 * - 监听字段变化，自动计算金额
 * - 保存前验证数据完整性
 * - 处理审批流程
 *
 * @author Neal
 * @date 2026-04-30
 */
public class SalesOrderFormPlugin extends AbstractFormPlugIn {
    // ...
}
```

### 5.2 方法注释

```java
/**
 * 计算订单金额
 *
 * 根据数量和单价计算金额，并更新到金额字段
 * 金额 = 数量 × 单价
 *
 * @throws RuntimeException 当数量或单价为空时抛出
 */
private void calculateAmount() {
    IDataModel model = this.getView().getModel();

    BigDecimal qty = model.getValue("qty");
    BigDecimal price = model.getValue("price");

    if (qty == null || price == null) {
        throw new RuntimeException("数量和单价不能为空");
    }

    BigDecimal amount = qty.multiply(price);
    model.setValue("amount", amount);
}
```

### 5.3 行内注释

```java
// 验证客户信息
DynamicObject customer = (DynamicObject) model.getValue("customer");
if (customer == null) {
    throw new RuntimeException("客户不能为空");
}

// 计算订单总额（包含优惠）
BigDecimal totalAmount = calculateTotalAmount(items);
BigDecimal discount = getDiscount(customer);
BigDecimal finalAmount = totalAmount.multiply(discount);
```

---

## 6. 日志记录规范

### 6.1 日志级别

- **ERROR**: 错误信息，需要立即处理
- **WARN**: 警告信息，可能存在问题
- **INFO**: 重要信息，关键业务流程
- **DEBUG**: 调试信息，详细的执行流程

### 6.2 日志示例

```java
import kd.bos.logging.Logger;
import kd.bos.logging.LogFactory;

public class SalesOrderFormPlugin extends AbstractFormPlugIn {

    private static final Logger logger = LogFactory.getLogger(SalesOrderFormPlugin.class);

    public void saveOrder(DynamicObject order) {
        logger.info("开始保存订单：{}", order.getString("bill_no"));

        try {
            // 验证订单
            validateOrder(order);
            logger.debug("订单验证通过");

            // 保存订单
            BusinessDataServiceHelper.save(order);
            logger.info("订单保存成功：{}", order.getString("bill_no"));

        } catch (Exception e) {
            logger.error("订单保存失败：{}", order.getString("bill_no"), e);
            throw e;
        }
    }
}
```

---

## 7. 代码格式规范

### 7.1 缩进

- 使用 4 个空格缩进
- 不使用 Tab

### 7.2 空行

- 方法之间空一行
- 逻辑块之间空一行
- 常量定义块与代码之间空两行

### 7.3 行长度

- 每行不超过 120 字符
- 过长的行要换行

---

## 8. 检查清单

在提交代码前，确保：

- [ ] 所有类名、方法名、常量名符合命名规范
- [ ] 没有魔法值
- [ ] 所有异常都有 try-catch
- [ ] 没有循环数据库查询
- [ ] 关键方法有注释
- [ ] 关键操作有日志
- [ ] 代码格式正确

---

**遵循这些规范，编写高质量的代码！** 📝
