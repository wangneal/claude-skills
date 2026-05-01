# 金蝶插件代码模式参考

**生成日期:** 2026-04-30
**学习项目:** da6l2 (175 文件), cqjdc (扫描中)

---

## 1. 查询模式

### 1.1 单表查询

**从真实项目提取的模式：**

```java
// 模式 1: 基本查询
QFilter filter = new QFilter("field_name", QCP.equals, value);
DynamicObject[] results = QueryServiceHelper.query(
    "entity_name",
    "field1,field2,field3",
    new QFilter[] { filter }
);

// 模式 2: 多条件查询
QFilter filter = new QFilter("status", QCP.equals, "A")
    .and("type", QCP.in, new String[]{"TYPE1", "TYPE2"})
    .and("createDate", QCP.large_equals, startDate);

// 模式 3: 查询并排序
DynamicObject[] results = QueryServiceHelper.query(
    "entity_name",
    "field1,field2",
    new QFilter[] { filter },
    "createDate DESC"
);
```

**SDK 使用频率:** 从 da6l2 项目统计
- DynamicObject: 688 次
- QFilter: 高频使用
- QueryServiceHelper: 核心查询 API

### 1.2 字段获取模式

**DynamicObject 常用方法：**

```java
// 字符串字段
String name = obj.getString("name");

// 长整型字段（ID、外键）
Long id = obj.getLong("id");

// 整型字段
Integer status = obj.getInt("status");

// 金额字段
BigDecimal amount = obj.getBigDecimal("amount");

// 日期字段
Date createDate = obj.getDate("createDate");

// 设置字段值
obj.set("field", value);
```

**统计发现：**
- `getString()`, `getLong()`, `getBigDecimal()` 使用最频繁
- 几乎所有插件都需要读取 DynamicObject 字段

---

## 2. 常量使用模式

### 2.1 基础常量类

**从真实项目识别的常量类：**

| 常量类 | 用途 | 常用字段 |
|--------|------|---------|
| BaseCon | 基础常量 | BILL_STATUS, ID, NAME, NUMBER |
| ProductCapacityCons | 产能报表 | KEY_WORKSHOP, KEY_EQUIPMENT |
| ProcessPlanCons | 工序计划 | KEY_WORKID, KEY_MATERIAL, KEY_QTY |
| WorkCenterCons | 工作中心 | KEY_DEPARTID, KEY_RESOURCE |

**使用示例：**

```java
// 单据状态常量
if (status == BaseCon.BILL_STATUS_AUDITED) {
    // 已审核状态
}

// 字段键值
String workShopField = ProductCapacityCons.KEY_WORKSHOP;
Long workShopId = obj.getLong(workShopField);
```

### 2.2 常量定义规范

**从项目学习的最佳实践：**

```java
package la51.da6l2.base.common.constant;

/**
 * 基础常量类
 * 用于定义系统通用的常量
 */
public class BaseCon {

    // ===== 单据状态 =====

    /** 草稿 */
    public static final String BILL_STATUS_DRAFT = "A";

    /** 已提交 */
    public static final String BILL_STATUS_SUBMITTED = "B";

    /** 已审核 */
    public static final String BILL_STATUS_AUDITED = "C";

    // ===== 通用字段 =====

    /** 主键 */
    public static final String ID = "id";

    /** 编码 */
    public static final String NUMBER = "number";

    /** 名称 */
    public static final String NAME = "name";

    /** 单据编号 */
    public static final String BILLNO = "billno";
}
```

---

## 3. 异常处理模式

### 3.1 标准异常处理

**从真实项目提取：**

```java
try {
    // 业务逻辑
    BusinessDataServiceHelper.save(obj);

} catch (Exception e) {
    // 记录异常日志
    Logger.error("操作失败", e);

    // 抛出用户友好异常
    throw new KDBizException("操作失败：" + e.getMessage());
}
```

### 3.2 数据库操作异常处理

```java
try {
    DynamicObject[] results = QueryServiceHelper.query(
        entityName,
        fields,
        filters
    );

    if (results == null || results.length == 0) {
        Logger.warn("未查询到数据");
        return;
    }

    // 处理数据...

} catch (Exception e) {
    Logger.error("查询失败: " + entityName, e);
    throw new KDBizException("数据查询失败，请联系管理员");
}
```

---

## 4. 日志记录模式

### 4.1 日志记录器初始化

```java
import kd.bos.logging.Log;
import kd.bos.logging.Logger;

public class MyPlugin extends AbstractFormPlugin {

    private static final Logger logger = Log.getLogger(MyPlugin.class);

    @Override
    public void baronclick(BeforeBaronclickEvent evt) {
        logger.info("按钮点击事件开始");

        try {
            // 业务逻辑
            logger.debug("处理数据: " + data);

        } catch (Exception e) {
            logger.error("处理失败", e);
        }

        logger.info("按钮点击事件结束");
    }
}
```

### 4.2 日志级别使用规范

| 级别 | 使用场景 | 示例 |
|------|---------|------|
| ERROR | 异常、错误 | `logger.error("保存失败", e)` |
| WARN | 警告、异常情况 | `logger.warn("数据为空")` |
| INFO | 关键操作、流程 | `logger.info("开始处理订单")` |
| DEBUG | 调试信息 | `logger.debug("查询条件: " + filter)` |

---

## 5. 报表插件模式

### 5.1 AbstractReportListDataPlugin 标准结构

**从 da6l2 项目提取的报表插件模式：**

```java
import kd.bos.algo.*;
import kd.bos.entity.report.AbstractReportListDataPlugin;
import kd.bos.entity.report.ReportQueryParam;
import kd.bos.orm.query.QFilter;
import kd.bos.orm.query.QCP;

/**
 * 报表插件示例
 * 从真实项目学习：ProductCapacityRpt.java
 */
public class ExampleReportPlugin extends AbstractReportListDataPlugin {

    // 1. 定义字段列表
    private List<Field> fields = Arrays.asList(
        new Field("key_field", DataType.LongType),
        new Field("name_field", DataType.StringType),
        new Field("amount_field", DataType.BigDecimalType)
    );

    // 2. 实现 query 方法
    @Override
    public DataSet query(ReportQueryParam param, Object o) throws Throwable {
        String algoKey = this.getClass().getName();
        RowMeta rowMeta = createRowMeta();
        DataSetBuilder builder = Algo.create(algoKey).createDataSetBuilder(rowMeta);

        // 3. 构建查询条件
        QFilter filter = buildQueryFilter(param);

        // 4. 查询数据
        DynamicObject[] results = queryData(filter);

        // 5. 填充数据
        populateData(builder, results);

        return builder.build();
    }

    private RowMeta createRowMeta() {
        return new RowMeta(fields.toArray(new Field[0]));
    }

    private QFilter buildQueryFilter(ReportQueryParam param) {
        FilterInfo filterInfo = param.getFilter();
        QFilter filter = new QFilter("status", QCP.equals, "C");

        // 添加过滤条件
        Date queryDate = filterInfo.getDate("query_date");
        if (queryDate != null) {
            filter.and("createDate", QCP.large_equals, queryDate);
        }

        return filter;
    }

    private DynamicObject[] queryData(QFilter filter) {
        return QueryServiceHelper.query(
            "target_entity",
            "field1,field2,field3",
            new QFilter[] { filter }
        );
    }

    private void populateData(DataSetBuilder builder, DynamicObject[] results) {
        for (DynamicObject obj : results) {
            DataRow row = builder.createRow();
            row.setLong(0, obj.getLong("key_field"));
            row.setString(1, obj.getString("name_field"));
            row.setBigDecimal(2, obj.getBigDecimal("amount_field"));
        }
    }
}
```

### 5.2 报表字段定义模式

```java
// 字段定义最佳实践
private List<Field> fields = Arrays.asList(
    // 主键字段
    new Field(ReportCons.KEY_ID, DataType.LongType),

    // 基础字段
    new Field(ReportCons.KEY_NAME, DataType.StringType),
    new Field(ReportCons.KEY_NUMBER, DataType.StringType),

    // 金额字段
    new Field(ReportCons.KEY_AMOUNT, DataType.BigDecimalType),
    new Field(ReportCons.KEY_QTY, DataType.BigDecimalType),

    // 日期字段
    new Field(ReportCons.KEY_DATE, DataType.DateType)
);
```

---

## 6. 插件类型统计

### da6l2 项目统计

- **总文件数:** 175 个 Java 文件
- **FormPlugin:** 5 个
- **ReportPlugin:** 8 个

### SDK 使用频率

| SDK 类 | 使用次数 | 主要用途 |
|--------|---------|---------|
| DynamicObject | 688 | 数据实体操作 |
| QFilter | 高频 | 查询条件构建 |
| QueryServiceHelper | 高频 | 数据查询 |
| BusinessDataServiceHelper | 中频 | 数据保存/删除 |
| Algo API | 中频 | 报表数据处理 |

---

## 7. 代码质量最佳实践

### 7.1 避免魔法值

❌ **错误示例:**
```java
if (status == 1) {
    // 状态判断
}
```

✅ **正确示例:**
```java
if (status == BaseCon.BILL_STATUS_AUDITED) {
    // 状态判断
}
```

### 7.2 避免循环查询数据库

❌ **错误示例:**
```java
for (DynamicObject item : items) {
    DynamicObject detail = QueryServiceHelper.loadSingle(
        "detail_entity",
        item.getLong("detail_id")
    );
}
```

✅ **正确示例:**
```java
// 批量查询
List<Long> detailIds = new ArrayList<>();
for (DynamicObject item : items) {
    detailIds.add(item.getLong("detail_id"));
}

QFilter filter = new QFilter("id", QCP.in, detailIds);
DynamicObject[] details = QueryServiceHelper.query(
    "detail_entity",
    "id,name",
    new QFilter[] { filter }
);
```

### 7.3 异常处理和日志

```java
try {
    // 业务逻辑
    logger.info("开始处理: " + description);

    // 核心操作
    result = process(data);

    logger.info("处理完成: " + result);

} catch (Exception e) {
    logger.error("处理失败", e);
    throw new KDBizException("操作失败: " + e.getMessage());
}
```

---

**文档版本:** 1.0
**学习来源:** da6l2 项目真实代码
**更新日期:** 2026-04-30