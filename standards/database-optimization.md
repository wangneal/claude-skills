# 数据库操作优化指南

## 概述

本文档定义了 bos-flow 生成的 Java 代码中数据库操作的性能优化规范。

**核心原则**：禁止在循环中操作数据库，必须使用批量操作。

---

## 1. 性能问题分析

### 1.1 循环操作数据库的问题

**问题场景**：

```java
// ❌ 错误：在循环中查询数据库
for (DynamicObject row : entries) {
    String materialNumber = (String) ((DynamicObject) row.get("fmaterialid")).get("fnumber");
    DynamicObject material = BusinessDataServiceHelper.loadSingle(
        "bd_material", new Object[] { "fnumber", materialNumber }
    );  // 每次循环都查询数据库
    // 处理逻辑...
}
```

**性能影响**：

| 操作场景 | 循环操作（100条） | 批量操作 | 性能差距 |
|---------|------------------|----------|---------|
| **查询** | 100 次数据库查询 → ~10秒 | 1 次批量查询 → ~0.1秒 | **100倍** |
| **插入** | 100 次数据库写入 → ~15秒 | 1 次批量写入 → ~0.2秒 | **75倍** |
| **更新** | 100 次数据库更新 → ~12秒 | 1 次批量更新 → ~0.2秒 | **60倍** |
| **删除** | 100 次数据库删除 → ~8秒 | 1 次批量删除 → ~0.1秒 | **80倍** |

**问题原因**：
1. **网络开销** - 每次 SQL 执行都需要网络往返
2. **连接开销** - 频繁获取和释放数据库连接
3. **事务开销** - 每次操作都开启和提交事务
4. **锁竞争** - 频繁的表锁/行锁竞争

### 1.2 批量操作的优势

```java
// ✅ 正确：批量查询
List<String> materialNumbers = new ArrayList<>();
for (DynamicObject row : entries) {
    DynamicObject material = (DynamicObject) row.get(FieldKeys.MATERIAL);
    String materialNumber = material != null ? (String) material.get(FieldKeys.MATERIAL_NUMBER) : null;
    if (materialNumber != null && !materialNumber.isEmpty()) {
        materialNumbers.add(materialNumber);
    }
}

// 一次性查询所有数据
DynamicObject[] materials = BusinessDataServiceHelper.load(
    "bd_material",
    FieldKeys.MATERIAL_NUMBER,
    materialNumbers.toArray()
);
```

**优势**：
1. ✅ 减少网络往返 - 一次请求获取所有数据
2. ✅ 减少连接开销 - 复用数据库连接
3. ✅ 减少事务开销 - 批量提交
4. ✅ 减少锁竞争 - 统一锁定时间窗口

---

## 2. 批量查询（Query）

### 2.1 错误示范

```java
// ❌ 错误：在循环中查询
for (DynamicObject row : entries) {
    String materialNumber = (String) ((DynamicObject) row.get("fmaterialid")).get("fnumber");

    // ❌ 每次循环都查询数据库
    DynamicObject material = BusinessDataServiceHelper.loadSingle(
        "bd_material",
        new Object[] { "fnumber", materialNumber }
    );

    if (material != null) {
        String materialName = (String) material.get("fname");
        row.set("fmaterialname", materialName);
    }
}
```

**性能问题**：
- 100 条数据 = 100 次数据库查询
- 预计耗时：~10 秒
- 数据库连接池压力巨大

### 2.2 正确示范

```java
// ✅ 正确：批量查询
private Map<String, DynamicObject> batchLoadMaterials(DynamicObjectCollection entries) {
    // 第一步：收集所有需要查询的ID
    List<String> materialNumbers = new ArrayList<>();
    for (DynamicObject row : entries) {
        DynamicObject material = (DynamicObject) row.get(FieldKeys.MATERIAL);
        String materialNumber = material != null ? (String) material.get(FieldKeys.MATERIAL_NUMBER) : null;
        if (materialNumber != null && !materialNumber.isEmpty()) {
            materialNumbers.add(materialNumber);
        }
    }

    // 第二步：一次性批量查询
    DynamicObject[] materials = BusinessDataServiceHelper.load(
        "bd_material",                      // 实体标识
        FieldKeys.MATERIAL_NUMBER,          // 查询字段
        materialNumbers.toArray()           // 查询值数组
    );

    // 第三步：转换为 Map 便于快速查找
    Map<String, DynamicObject> materialMap = new HashMap<>();
    for (DynamicObject material : materials) {
        String number = (String) material.get(FieldKeys.MATERIAL_NUMBER);
        if (number != null && !number.isEmpty()) {
            materialMap.put(number, material);
        }
    }

    return materialMap;
}

// 使用示例
Map<String, DynamicObject> materialMap = batchLoadMaterials(entries);
for (DynamicObject row : entries) {
    DynamicObject material = (DynamicObject) row.get(FieldKeys.MATERIAL);
    String materialNumber = material != null ? (String) material.get(FieldKeys.MATERIAL_NUMBER) : null;

    if (materialNumber != null) {
        DynamicObject fullMaterial = materialMap.get(materialNumber);
        if (fullMaterial != null) {
            String materialName = (String) fullMaterial.get(FieldKeys.MATERIAL_NAME);
            row.set(FieldKeys.MATERIAL_NAME, materialName);
        }
    }
}
```

**性能提升**：
- 100 条数据 = 1 次数据库查询
- 预计耗时：~0.1 秒
- **性能提升 100 倍**

### 2.3 QueryServiceHelper 批量查询

```java
// ✅ 正确：使用 QueryServiceHelper 批量查询
import kd.bos.servicehelper.QueryServiceHelper;
import kd.bos.orm.query.QFilter;

// 构建查询条件
List<String> materialNumbers = Arrays.asList("M001", "M002", "M003");
QFilter filter = new QFilter("number", "in", materialNumbers.toArray());

// 批量查询
DynamicObject[] materials = QueryServiceHelper.load(
    "bd_material",                          // 实体标识
    "number,name,createorg",               // 查询字段
    new QFilter[] { filter }               // 查询条件
);

// 转换为 Map
Map<String, DynamicObject> materialMap = new HashMap<>();
for (DynamicObject material : materials) {
    String number = material.getString("number");
    materialMap.put(number, material);
}
```

---

## 3. 批量插入（Insert）

### 3.1 错误示范

```java
// ❌ 错误：在循环中插入
for (DynamicObject row : entries) {
    DynamicObject newRecord = new DynamicObject(row.getDynamicObjectType());
    newRecord.set("fbillno", "NEW-" + System.currentTimeMillis());
    newRecord.set("fstatus", "created");

    // ❌ 每次循环都插入数据库
    BusinessDataServiceHelper.save(newRecord);
}
```

**性能问题**：
- 100 条数据 = 100 次数据库写入
- 预计耗时：~15 秒
- 大量事务开销

### 3.2 正确示范

```java
// ✅ 正确：批量插入
private void batchInsertRecords(DynamicObjectCollection entries) {
    // 第一步：在内存中准备所有数据
    List<DynamicObject> recordsToInsert = new ArrayList<>();
    for (DynamicObject row : entries) {
        DynamicObject newRecord = new DynamicObject(row.getDynamicObjectType());
        newRecord.set(FieldKeys.BILL_NO, "NEW-" + System.currentTimeMillis());
        newRecord.set(FieldKeys.STATUS, "created");
        // 设置其他字段...
        recordsToInsert.add(newRecord);
    }

    // 第二步：一次性批量插入
    BusinessDataServiceHelper.save(recordsToInsert.toArray(new DynamicObject[0]));

    this.getView().showMessage("成功插入 " + recordsToInsert.size() + " 条记录");
}
```

**性能提升**：
- 100 条数据 = 1 次数据库写入
- 预计耗时：~0.2 秒
- **性能提升 75 倍**

### 3.3 批量插入最佳实践

```java
// ✅ 最佳实践：分批插入（避免内存溢出）
private void batchInsertLargeData(List<DynamicObject> allRecords) {
    // 定义批次大小
    int batchSize = 1000;
    int totalBatches = (allRecords.size() + batchSize - 1) / batchSize;

    for (int i = 0; i < totalBatches; i++) {
        int start = i * batchSize;
        int end = Math.min(start + batchSize, allRecords.size());
        List<DynamicObject> batch = allRecords.subList(start, end);

        // 批量插入
        BusinessDataServiceHelper.save(batch.toArray(new DynamicObject[0]));

        this.getView().showMessage(
            String.format("批次 %d/%d 完成（%d-%d）",
                i + 1, totalBatches, start + 1, end)
        );
    }
}
```

---

## 4. 批量更新（Update）

### 4.1 错误示范

```java
// ❌ 错误：在循环中更新
for (DynamicObject row : entries) {
    row.set("fstatus", "processed");
    row.set("fmodifytime", new Date());

    // ❌ 每次循环都更新数据库
    BusinessDataServiceHelper.update(row);
}
```

**性能问题**：
- 100 条数据 = 100 次数据库更新
- 预计耗时：~12 秒
- 频繁的行锁竞争

### 4.2 正确示范

```java
// ✅ 正确：批量更新
private void batchUpdateRecords(DynamicObjectCollection entries) {
    // 第一步：在内存中修改所有数据
    for (DynamicObject row : entries) {
        row.set(FieldKeys.STATUS, "processed");
        row.set(FieldKeys.MODIFY_TIME, new Date());
    }

    // 第二步：一次性批量更新
    BusinessDataServiceHelper.update(entries.toArray(new DynamicObject[0]));

    this.getView().showMessage("成功更新 " + entries.size() + " 条记录");
}
```

**性能提升**：
- 100 条数据 = 1 次数据库更新
- 预计耗时：~0.2 秒
- **性能提升 60 倍**

### 4.3 条件批量更新

```java
// ✅ 正确：使用条件批量更新
import kd.bos.servicehelper.BusinessDataServiceHelper;
import kd.bos.orm.query.QFilter;

// 批量更新满足条件的记录
QFilter filter = new QFilter("status", "=", "pending");
QFilter filter2 = new QFilter("createdate", "<", "2024-01-01");

DynamicObject[] records = BusinessDataServiceHelper.load(
    "bd_order",
    new QFilter[] { filter, filter2 }
);

for (DynamicObject record : records) {
    record.set(FieldKeys.STATUS, "expired");
}

BusinessDataServiceHelper.update(records);
```

---

## 5. 批量删除（Delete）

### 5.1 错误示范

```java
// ❌ 错误：在循环中删除
for (DynamicObject row : entries) {
    if (shouldDelete(row)) {
        // ❌ 每次循环都删除
        BusinessDataServiceHelper.delete(row);
    }
}
```

**性能问题**：
- 100 条数据 = 100 次数据库删除
- 预计耗时：~8 秒
- 级联删除的开销累积

### 5.2 正确示范

```java
// ✅ 正确：批量删除
private void batchDeleteRecords(DynamicObjectCollection entries) {
    // 第一步：收集需要删除的记录
    List<DynamicObject> recordsToDelete = new ArrayList<>();
    for (DynamicObject row : entries) {
        if (shouldDelete(row)) {
            recordsToDelete.add(row);
        }
    }

    // 第二步：一次性批量删除
    BusinessDataServiceHelper.delete(recordsToDelete.toArray(new DynamicObject[0]));

    this.getView().showMessage("成功删除 " + recordsToDelete.size() + " 条记录");
}
```

**性能提升**：
- 100 条数据 = 1 次数据库删除
- 预计耗时：~0.1 秒
- **性能提升 80 倍**

### 5.3 条件批量删除

```java
// ✅ 正确：使用条件批量删除
import kd.bos.servicehelper.BusinessDataServiceHelper;
import kd.bos.orm.query.QFilter;

// 批量删除满足条件的记录
QFilter filter = new QFilter("status", "=", "cancelled");
QFilter filter2 = new QFilter("createdate", "<", "2023-01-01");

DynamicObject[] recordsToDelete = BusinessDataServiceHelper.load(
    "bd_order",
    new QFilter[] { filter, filter2 }
);

BusinessDataServiceHelper.delete(recordsToDelete);
```

---

## 6. 综合示例

### 6.1 完整的业务场景

**需求**：处理销售订单，根据客户类型批量加载物料、更新价格、删除无效行

```java
/**
 * 处理销售订单 - 综合示例
 *
 * 约束遵守：
 * ✅ 不在循环中查询数据库（使用批量查询）
 * ✅ 不在循环中写入数据库（使用批量操作）
 * ✅ 使用常量代替魔法值
 */
public void processSalesOrder(DynamicObject order) {
    DynamicObjectCollection entries = (DynamicObjectCollection) order.get(FieldKeys.ENTRY_KEY);

    // 1. 批量查询物料信息
    Map<String, DynamicObject> materialMap = batchLoadMaterials(entries);

    // 2. 在内存中处理数据
    List<DynamicObject> validEntries = new ArrayList<>();
    List<DynamicObject> invalidEntries = new ArrayList<>();

    for (DynamicObject row : entries) {
        DynamicObject material = (DynamicObject) row.get(FieldKeys.MATERIAL);
        String materialNumber = material != null ? (String) material.get(FieldKeys.MATERIAL_NUMBER) : null;

        if (materialNumber != null && materialMap.containsKey(materialNumber)) {
            // 有效行：更新价格
            DynamicObject fullMaterial = materialMap.get(materialNumber);
            BigDecimal newPrice = fullMaterial.getBigDecimal(FieldKeys.PRICE);
            row.set(FieldKeys.PRICE, newPrice);
            validEntries.add(row);
        } else {
            // 无效行：标记删除
            invalidEntries.add(row);
        }
    }

    // 3. 批量更新有效行
    if (!validEntries.isEmpty()) {
        BusinessDataServiceHelper.update(validEntries.toArray(new DynamicObject[0]));
    }

    // 4. 批量删除无效行
    if (!invalidEntries.isEmpty()) {
        BusinessDataServiceHelper.delete(invalidEntries.toArray(new DynamicObject[0]));
    }

    this.getView().showMessage(
        String.format("处理完成：更新%d条，删除%d条",
            validEntries.size(), invalidEntries.size())
    );
}
```

### 6.2 性能对比总结

| 操作 | 循环方式（100条） | 批量方式（100条） | 性能提升 |
|-----|------------------|------------------|---------|
| **查询** | ~10秒 | ~0.1秒 | **100倍** |
| **插入** | ~15秒 | ~0.2秒 | **75倍** |
| **更新** | ~12秒 | ~0.2秒 | **60倍** |
| **删除** | ~8秒 | ~0.1秒 | **80倍** |
| **综合** | ~45秒 | ~0.6秒 | **75倍** |

---

## 7. 检查清单

代码审查时检查：

- [ ] 无循环中的 `BusinessDataServiceHelper.load()` 或 `loadSingle()`
- [ ] 无循环中的 `QueryServiceHelper.load()`
- [ ] 无循环中的 `BusinessDataServiceHelper.save()`
- [ ] 无循环中的 `BusinessDataServiceHelper.update()`
- [ ] 无循环中的 `BusinessDataServiceHelper.delete()`
- [ ] 使用批量查询（先收集ID，再一次性查询）
- [ ] 使用批量插入（先在内存准备，再一次性插入）
- [ ] 使用批量更新（先在内存修改，再一次性更新）
- [ ] 使用批量删除（先收集记录，再一次性删除）
- [ ] 大数据量时使用分批处理

---

## 8. 常见问题

### Q1: 批量操作会不会锁表时间太长？

**A**: 批量操作确实会持有锁更长时间，但总体锁时间远小于循环操作。

- **循环操作**：每次操作都获取和释放锁，总锁时间 = 单次锁时间 × 次数
- **批量操作**：一次获取锁，完成所有操作后释放，总锁时间 << 循环操作

**最佳实践**：对于超大数据量（>1000条），使用分批处理。

### Q2: 批量操作失败会怎样？

**A**: 批量操作是事务性的，要么全部成功，要么全部回滚。

```java
try {
    BusinessDataServiceHelper.save(records);
} catch (Exception e) {
    // 所有记录都会回滚
    this.getView().showMessage("批量保存失败：" + e.getMessage());
}
```

### Q3: 如何处理批量操作中的部分失败？

**A**: 在操作前进行数据验证，确保所有数据都合法。

```java
// ✅ 正确：先验证，再批量操作
List<String> errors = new ArrayList<>();
for (DynamicObject record : records) {
    if (!validateRecord(record)) {
        errors.add("记录验证失败：" + record.getString("fbillno"));
    }
}

if (!errors.isEmpty()) {
    throw new RuntimeException("数据验证失败：" + String.join("\n", errors));
}

// 所有数据都合法，执行批量操作
BusinessDataServiceHelper.save(records);
```

---

## 9. 工具支持

可以使用静态代码分析工具检测循环中的数据库操作：

- **SonarQube**: 规则 `java:S1192` - 检测循环中的数据库调用
- **PMD**: 规则 `AvoidDatabaseCallsInLoops`（自定义规则）
- **Checkstyle**: 自定义检查器

---

*Generated by bos-flow - Database Optimization Guide*
