# 金蝶苍穹开发规范

本文档定义了金蝶苍穹开发的编码规范，整合了阿里巴巴Java开发规范的所有规则。
与阿里巴巴规范冲突的部分，以本文档（金蝶开发规范）为准。

---

## 目录

1. [命名规范](#1-命名规范)
2. [常量使用规范](#2-常量使用规范)
3. [异常处理规范](#3-异常处理规范)
4. [性能优化规范](#4-性能优化规范)
5. [代码注释规范](#5-代码注释规范)
6. [日志记录规范](#6-日志记录规范)
7. [代码格式规范](#7-代码格式规范)
8. [阿里巴巴补充规约](#8-阿里巴巴补充规约)
9. [检查清单](#9-检查清单)

---

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

## 9. 阿里巴巴补充规约

以下规则来自《阿里巴巴Java开发手册》，作为金蝶开发规范的补充。
**与上述规范冲突的部分，以上述规范为准。**

### 9.1 编程规约

#### 9.1.1 命名风格

- 常量复用层次：跨应用公共常量 → 应用内公共常量 → 模块内公共常量 → 页面级常量
- POJO 类中布尔类型的变量不要加 `is` 前缀，否则部分框架解析会引起序列化错误
- 避免子类的变量名与父类相同，遮蔽父类的成员变量

#### 9.1.2 常量定义

- 不允许任何魔法值（即未经预先定义的常量）直接出现在代码中
- `long` 类型赋值时使用大写 L，**避免小写 l 混淆**：
  ```java
  // ✅ 正确
  private static final long TIMEOUT_MS = 3000L;

  // ❌ 错误：小写 l 与数字 1 混淆
  private static final long TIMEOUT_MS = 3000l;
  ```

#### 9.1.3 代码格式

- 采用 4 个空格缩进，**不使用 Tab**
- 单个方法的总行数不超过 80 行
- 所有循环体中的代码必须用大括号包裹，即使只有一行

#### 9.1.4 OOP 规约

- 避免通过一个类的对象引用访问此类的静态成员或方法，违反 OOP 哲学
- 所有的覆写方法必须加 `@Override` 注解
- 相同类型的参数对象，方法返回值类型应与入参类型一致（使用泛型）
- 禁止使用构造方法 `BigDecimal(double)` 初始化高精度计算，应使用 `String` 参数：
  ```java
  // ✅ 正确
  BigDecimal amount = new BigDecimal("0.1");

  // ❌ 错误：double 类型精度损失
  BigDecimal amount = new BigDecimal(0.1);
  ```

### 9.2 并发规约

#### 9.2.1 线程安全

- 创建线程或线程池时务必指定有意义的线程名称，便于问题排查
- 线程资源必须通过线程池提供，不允许在应用中自行显式创建线程
- 线程池不允许使用 `Executors` 创建，应使用 `ThreadPoolExecutor`，避免资源耗尽风险

```java
// ✅ 正确：使用 ThreadPoolExecutor 显式创建
ThreadPoolExecutor executor = new ThreadPoolExecutor(
    2,                      // 核心线���数
    4,                      // 最大线程数
    60,                     // 空闲线程存活时间
    TimeUnit.SECONDS,
    new LinkedBlockingQueue<>(100),  // 有界队列
    new ThreadFactoryBuilder().setNamePrefix("kd-worker-").build(),
    new ThreadPoolExecutor.CallerRunsPolicy()
);

// ❌ 错误：Executors 可能创建无界队列，导致 OOM
ExecutorService executor = Executors.newFixedThreadPool(10);
```

#### 9.2.2 线程协作

- 使用 `CountDownLatch` 进行异步操作同步，或使用 `CyclicBarrier` 执行周期性任务
- 防止线程死锁：加锁顺序一致、设置超时、避免无限等待

### 9.3 集合规约

#### 9.3.1 集合选择

- 集合返回时尽量使用 `Collections.emptyList()` 等返回空集合，禁止返回 `null`
- 使用 `ArrayList` 时尽量指定初始容量，减少扩容开销：
  ```java
  // ✅ 推荐：指定初始容量
  List<Item> items = new ArrayList<>(32);

  // 不指定：默认容量为 10，后续需要多次扩容
  List<Item> items = new ArrayList<>();
  ```

#### 9.3.2 Map 使用

- 遍历 Map 时优先使用 `entrySet`，效率高于 `keySet` + `get`
- 合理设置 HashMap 初始容量：
  ```java
  // ✅ 推荐：预估容量并除以负载因子 0.75
  Map<String, Object> map = new HashMap<>(128);

  // ❌ 默认容量 16，多次扩容性能差
  Map<String, Object> map = new HashMap<>();
  ```

#### 9.3.3 泛型安全

- 泛型嵌套不超过 3 层
- 集合元素类型必须使用泛型声明，禁止 raw type

### 9.4 异常处理规约（补充）

#### 9.4.1 异常捕获

- 异常不要用来做流程控制，效率极低
- 捕获异常后必须抛出有意义的异常，或记录日志后吞掉（加注释说明原因）
- 禁止 catch 住 `Exception` 或 `Throwable` 后不做任何处理，除非特殊场景

```java
// ✅ 正确：捕获具体异常
try {
    BusinessDataServiceHelper.save(entity);
} catch (KDBOSException e) {
    logger.error("保存业务数据失败：{}", entity.getString("name"), e);
    throw new BusinessException("保存失败：" + e.getMessage());
} catch (Exception e) {
    logger.error("未知错误", e);
    throw e;  // 重新抛出
}
```

#### 9.4.2 事务处理

- 在事务 RPC 调用中使用 `@Transactional` 注解，标记方法为事务性
- 避免在事务中执行耗时操作或远程调用
- 事务嵌套：使用 `REQUIRES_NEW` 或 `NOT_SUPPORTED` 明确指定传播行为

### 9.5 日志规约（补充）

#### 9.5.1 日志级别使���

- **ERROR**: 程序错误，需要立即处理
- **WARN**: 警告信息，潜在问题但不影响功能
- **INFO**: 重要业务流程节点，便于审计追踪
- **DEBUG**: 开发调试信息，生产环境关闭

#### 9.5.2 日志输出规范

- 日志输出使用占位符 `{}`，避免字符串拼接性能开销：
  ```java
  // ✅ 正确：使用占位符
  logger.info("订单保存成功：{}", orderNo);

  // ❌ 错误：字符串拼接
  logger.info("订单保存成功：" + orderNo);
  ```

- 入口日志必须包含关键参数，异常日志必须包含堆栈信息
- 禁止在循环中打印日志，如需记录使用 `DEBUG` 级别并加条件判断

### 9.6 MySQL 规约（金蝶场景适配）

#### 9.6.1 索引规约

- 业务上具有唯一特性的字段必须建立唯一索引
- 联合索引遵循最左前缀原则，合理设计索引顺序
- 建组合索引时，区分度高的字段放在前面

#### 9.6.2 SQL 规约

- 不使用 `SELECT *`，明确列出需要的字段
- 避免隐式类型转换，导致索引失效
- 禁止使用 `JOIN` 超过 3 张表，复杂查询优先使用视图或业务层处理
- 禁止使用 `ORDER BY RAND()` 进行随机排序

```java
// ✅ 正确：明确列出字段
List<DynamicObject> customers = BusinessDataServiceHelper.query(
    "select customer_id, customer_name, status from kdev_customer where status = ?",
    new Object[]{STATUS_ACTIVE}
);

// ❌ 错误：SELECT * 且全表扫描
List<DynamicObject> customers = BusinessDataServiceHelper.load(
    "kdev_customer",
    "select * from kdev_customer"
);
```

#### 9.6.3 数据处理

- 批量操作使用 `BusinessDataServiceHelper.save` 批量保存
- 分页查询使用金蝶提供的分页 API：
  ```java
  // 使用 QueryService 进行分页查询
  IQuery query = QueryServiceHelper.query(
      "kdev_customer",
      "customer_id,customer_name",
      "status = ?",
      null,
      "create_time desc"
  );
  query.setPageSize(20);
  query.setPageNumber(1);
  ```

### 9.7 工程结构规约

#### 9.7.1 模块划分

- 按业务功能划分模块，不按技术层次划分
- 核心业务代码放在顶层包，工具类放在 `util` 包
- 接口层仅做参数校验和格式转换，不包含业务逻辑

#### 9.7.2 包命名

- 使用全小写包名，层级用点分隔
- 常用包名：`entity`（实体）、`service`（服务）、`dao`（数据访问）、`plugin`（插件）、`util`（工具）、`consts`（常量）

### 9.8 设计规约

#### 9.8.1 接口设计

- 接口参数必须校验，校验不通过应立即返回错误码
- 接口返回值使用泛型明确返回类型
- 接口文档必须包含：接口说明、请求参数、响应示例、错误码说明

#### 9.8.2 扩展性设计

- 使用策略模式替代硬编码的条件分支
- 使用模板方法封装通用流程，细节由子类实现
- 考虑未来扩展，在字段设计时预留扩展字段（如 `extinfo` JSON 字段）

#### 9.8.3 防御性编程

- 所有外部输入必须校验
- 所有返回值需要判空（除非文档明确说明不会返回 null）
- 考虑并发场景，对共享资源的访问必须加锁或使用线程安全容器

---

**遵循这些规范，编写高质量的代码！** 📝

---

*本文档整合了金蝶苍穹开发规范与阿里巴巴Java开发手册，冲突部分以金蝶开发规范为准。*
