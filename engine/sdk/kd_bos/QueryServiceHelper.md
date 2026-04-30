# QueryServiceHelper


**包路径**: kd.bos.servicehelper

**类型**: CLASS

**父类**: 无

**说明**: 查询服务类，提供一些查询的方法


```java
public class QueryServiceHelper
```


## 方法 (15 个)


### `exists`

```java
boolean exists(java.lang.String, java.lang.Object)
```

判断单据主键是否存在


### `exists`

```java
boolean exists(java.lang.String, QFilter[])
```

判断符合条件的单据是否存在


### `getAllBillNo`

```java
java.util.List<kd.bos.servicehelper.BillNoDto> getAllBillNo(java.lang.String, int)
```

获取所有的单据编号字段标识


### `query`

```java
DynamicObjectCollection query(java.lang.String, java.lang.String, QFilter[])
```

查询单据，返回拉平的数据包


### `query`

```java
DynamicObjectCollection query(java.lang.String, java.lang.String, QFilter[], java.lang.String)
```

查询单据（排序），返回拉平的数据包


### `query`

```java
DynamicObjectCollection query(java.lang.String, java.lang.String, QFilter[], java.lang.String, int)
```

查询单据（排序，前top条），返回拉平的数据包


### `query`

```java
DynamicObjectCollection query(java.lang.String, java.lang.String, java.lang.String, QFilter[], java.lang.String)
```

查询单据（排序），返回拉平的数据包


### `query`

```java
DynamicObjectCollection query(java.lang.String, java.lang.String, java.lang.String, QFilter[], java.lang.String, int)
```

查询单据（排序，前top条），返回拉平的数据包


### `queryByDate`

```java
DynamicObjectCollection queryByDate(java.lang.String, java.lang.String, QFilter[], java.util.Date)
```

查询单据，返回拉平的数据包（支持获取名称版本化数据）


### `queryDataSet`

```java
DataSet queryDataSet(java.lang.String, java.lang.String, java.lang.String, QFilter[], java.lang.String)
```

查询单据，返回拉平的数据流
 <b>特别注意：</b>返回的是流式的数据集合DataSet对象，和数据库保持着链接，用完后必须主动关闭


### `queryDataSet`

```java
DataSet queryDataSet(java.lang.String, java.lang.String, java.lang.String, QFilter[], java.lang.String, int)
```

查询单据（排序，取top条），返回拉平的数据流
 <b>特别注意：</b>返回的是流式的数据集合DataSet对象，和数据库保持着链接，用完后必须主动关闭


### `queryOne`

```java
DynamicObject queryOne(java.lang.String, java.lang.String, QFilter[])
```

查询一条数据（第一条）


### `queryPrimaryKeys`

```java
java.util.List<java.lang.Object> queryPrimaryKeys(java.lang.String, QFilter[], java.lang.String, int)
```

查询主键（排序，取top条）


### `queryPrimaryKeys`

```java
java.util.List<java.lang.Object> queryPrimaryKeys(java.lang.String, java.lang.String, QFilter[], java.lang.String, int)
```

查询主键（排序，取top条）


### `queryPrimaryKeys`

```java
java.util.List<java.lang.Object> queryPrimaryKeys(java.lang.String, IDataEntityType, QFilter[], java.lang.String, int)
```

查询主键（排序，取top条）

