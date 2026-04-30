# DB


**模块**: kd.bos.db

**类型**: CLASS

**父类**: 无

**说明**: 数据库操作调用接口。


```java
public final class DB
```


## 方法 (17 个)


### `execute`

```java
boolean execute(kd.bos.db.DBRoute, java.lang.String)
```

执行execute操作。


### `execute`

```java
boolean execute(kd.bos.db.DBRoute, java.lang.String, java.lang.Object[])
```

execute操作。


### `execute`

```java
boolean execute(kd.bos.db.DBRoute, kd.bos.db.SqlBuilder)
```

执行execute操作。


### `executeBatch`

```java
int[] executeBatch(kd.bos.db.DBRoute, java.lang.String, java.util.List<java.lang.Object[]>)
```

批量执行。


### `exitsTable`

```java
boolean exitsTable(kd.bos.db.DBRoute, java.lang.String)
```

判断表是否存在。


### `getDBType`

```java
kd.bos.db.DBType getDBType(kd.bos.db.DBRoute)
```

获取数据库类型。


### `getDatabaseName`

```java
java.lang.String getDatabaseName(kd.bos.db.DBRoute)
```

获取数据库名称。


### `query`

```java
java.lang.Object query(kd.bos.db.DBRoute, java.lang.String, kd.bos.db.ResultSetHandler<T>)
```

查询操作。


### `query`

```java
java.lang.Object query(kd.bos.db.DBRoute, java.lang.String, java.lang.Object[], kd.bos.db.ResultSetHandler<T>)
```

查询操作。


### `query`

```java
java.lang.Object query(kd.bos.db.DBRoute, kd.bos.db.SqlBuilder, kd.bos.db.ResultSetHandler<T>)
```

查询操作。


### `queryDataSet`

```java
DataSet queryDataSet(java.lang.String, kd.bos.db.DBRoute, java.lang.String)
```

查询返回<tt>DataSet</tt>，使用完毕务必close。


### `queryDataSet`

```java
DataSet queryDataSet(java.lang.String, kd.bos.db.DBRoute, java.lang.String, java.lang.Object[])
```

查询返回<tt>DataSet</tt>，使用完毕务必close。


### `queryDataSet`

```java
DataSet queryDataSet(java.lang.String, kd.bos.db.DBRoute, kd.bos.db.SqlBuilder)
```

查询返回<tt>DataSet</tt>，使用完毕务必close。


### `timeout`

```java
QueryTimeout timeout(int)
```

自定义查询超时时间。

 <pre>

 try(QueryTimeout timeout=DB.timeout(10)){ ... }


### `update`

```java
int update(kd.bos.db.DBRoute, java.lang.String)
```

更新操作。


### `update`

```java
int update(kd.bos.db.DBRoute, java.lang.String, java.lang.Object[])
```

更新操作。


### `update`

```java
int update(kd.bos.db.DBRoute, kd.bos.db.SqlBuilder)
```

更新操作。

