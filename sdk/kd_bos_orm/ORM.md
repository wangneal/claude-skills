# ORM


**模块**: kd.bos.orm

**类型**: INTERFACE

**父类**: 无

**说明**: 分布式 ORM 引擎


```java
public interface ORM
```


## 方法 (46 个)


### `aggregate`

```java
java.lang.Object[] aggregate(java.lang.String, java.lang.String, java.lang.String[], kd.bos.orm.query.QFilter[])
```

执行简单函数，支持：sum,count


### `aggregate`

```java
DataSet aggregate(java.lang.String, java.lang.String, java.lang.String[], kd.bos.orm.query.QFilter[], java.lang.String[])
```

执行简单函数，支持：sum,count


### `clearDirty`

```java
void clearDirty(DynamicObject)
```

清除脏标识


### `clearDirty`

```java
void clearDirty(DynamicObjectCollection)
```

清除脏标识


### `clearEntityTypeCache`

```java
void clearEntityTypeCache()
```

后台服务复用线程，任务执行前需要调用此方法清除entity meta在本线程中的缓存，entity在运行期是可能被重新设计的。
 也可以通过调用ThreadLocals.realease统一回收线程变量。
 依旧提供本方法，用于ThreadLocals.realease之外需要释放缓存的情况。


### `count`

```java
int count(java.lang.String, java.lang.String, java.lang.String, kd.bos.orm.query.QFilter[], kd.bos.orm.query.Distinctable)
```

带去重参数逇 count


### `create`

```java
kd.bos.orm.ORM create()
```

获取 ORM 实例


### `exists`

```java
boolean exists(java.lang.String, java.lang.Object)
```

判断记录是否存在


### `exists`

```java
boolean exists(java.lang.String, kd.bos.orm.query.QFilter[])
```

判断记录是否存在


### `genLongId`

```java
long genLongId(java.lang.String)
```

生成实体相关的唯一ID


### `genLongId`

```java
long genLongId(IDataEntityType)
```

生成实体相关的唯一ID


### `genLongIds`

```java
long[] genLongIds(java.lang.String, int)
```

生成实体相关的唯一ID


### `genLongIds`

```java
long[] genLongIds(IDataEntityType, int)
```

生成实体相关的唯一ID


### `genStringId`

```java
java.lang.String genStringId(java.lang.String)
```

生成实体相关的字符类型唯一ID


### `genStringId`

```java
java.lang.String genStringId(IDataEntityType)
```

生成实体相关的字符类型唯一ID


### `genStringIds`

```java
java.lang.String[] genStringIds(java.lang.String, int)
```

生成实体相关的字符类型唯一ID


### `genStringIds`

```java
java.lang.String[] genStringIds(IDataEntityType, int)
```

生成实体相关的字符类型唯一ID


### `getDataEntityType`

```java
IDataEntityType getDataEntityType(java.lang.String)
```

根据路径获取实体类型描述


### `getEntityTypeCacheDumpString`

```java
java.lang.String getEntityTypeCacheDumpString()
```

获取元数据缓存信息


### `getMaxQueryJoinTableCount`

```java
int getMaxQueryJoinTableCount(java.lang.String, java.lang.String, kd.bos.orm.query.QFilter[], java.lang.String)
```

获取单条查询的关联表最大数量


### `hint`

```java
kd.bos.orm.ORMHint hint()
```

获取 ORMHint 实例，用来设置 ORM 引擎 join 细节


### `newDynamicObject`

```java
DynamicObject newDynamicObject(java.lang.String)
```

创建动态对象


### `newDynamicObject`

```java
DynamicObject newDynamicObject(DynamicObjectType)
```

创建动态对象


### `newDynamicObject`

```java
DynamicObject newDynamicObject(java.lang.String, java.lang.Object)
```

创建动态对象，指定主键id


### `query`

```java
DynamicObjectCollection query(java.lang.String, java.lang.Object[])
```

oql 方式查询动态对象结果集


### `query`

```java
DynamicObjectCollection query(java.lang.String, kd.bos.orm.query.QFilter[])
```

无 selectFields 查询列，则缺省属性为单据头、分录、子分录，及设计中指定的引用基础资料的属性
 返回结构化动态对象集合


### `query`

```java
DynamicObjectCollection query(java.lang.String, java.lang.String, kd.bos.orm.query.QFilter[])
```

指定 selectFields 查询列，返回结构化动态对象集合


### `query`

```java
DynamicObjectCollection query(java.lang.String, java.lang.String, kd.bos.orm.query.QFilter[], java.lang.String)
```

指定 selectFields 以及 orderBys，返回结构化动态对象


### `query`

```java
DynamicObjectCollection query(java.lang.String, java.lang.String, kd.bos.orm.query.QFilter[], java.lang.String, int)
```

指定 selectFields 以及 orderBys，返回结构化动态对象，并且指定返回前 top 条记录


### `queryDataSet`

```java
DataSet queryDataSet(java.lang.String, java.lang.String, java.lang.String, kd.bos.orm.query.QFilter[])
```

查询 DataSet 结果集


### `queryDataSet`

```java
DataSet queryDataSet(java.lang.String, java.lang.String, java.lang.String, kd.bos.orm.query.QFilter[], java.lang.String)
```

查询 DataSet 结果集，通过 orderBys 指定排序


### `queryDataSet`

```java
DataSet queryDataSet(java.lang.String, java.lang.String, java.lang.String, kd.bos.orm.query.QFilter[], java.lang.String, int)
```

查询 DataSet 结果集，通过 orderBys 指定排序，返回 top 条记录


### `queryDataSet`

```java
DataSet queryDataSet(java.lang.String, java.lang.String, java.lang.String, kd.bos.orm.query.QFilter[], java.lang.String, int, kd.bos.orm.query.Distinctable)
```

查询 DataSet 结果集


### `queryDataSet`

```java
DataSet queryDataSet(java.lang.String, java.lang.String, java.lang.String, kd.bos.orm.query.QFilter[], java.lang.String, int, int)
```

查询 DataSet 结果集


### `queryDataSet`

```java
DataSet queryDataSet(java.lang.String, java.lang.String, java.lang.String, kd.bos.orm.query.QFilter[], java.lang.String, int, int, kd.bos.orm.query.Distinctable)
```

查询 DataSet 结果集


### `queryDataSet`

```java
DataSet queryDataSet(java.lang.String, java.lang.String, java.lang.Object[])
```

用oql语句查询


### `queryDataSetAlone`

```java
DataSet queryDataSetAlone(java.util.concurrent.Callable<DataSet>)
```

用于大数据查询，查询不在当前事务管理范围。
 
 jdbc oom解决方案：
 增加查询接口quryAlone，call里的每个数据访问都将使用单独的数据连接，查询出的DataSet对象可以跨事务(TX)使用。


### `queryOne`

```java
DynamicObject queryOne(java.lang.String, java.lang.Object[])
```

用oql语句查询


### `queryOne`

```java
DynamicObject queryOne(java.lang.String, kd.bos.orm.query.QFilter[])
```

查询单个实体对象，返回结构化动态对象


### `queryOne`

```java
DynamicObject queryOne(java.lang.String, java.lang.String, kd.bos.orm.query.QFilter[])
```

查询单个实体对象，返回结构化动态对象


### `setDataEntityType`

```java
void setDataEntityType(java.lang.String, IDataEntityType)
```

设置动态元数据类型， 生命周期：ORM实例


### `setPrimaryKey`

```java
java.lang.Object setPrimaryKey(DynamicObject)
```

设置对象及其包含的所有子对象的主键


### `toPlainDynamicObjectCollection`

```java
DynamicObjectCollection toPlainDynamicObjectCollection(DataSet)
```

DataSet转为扁平动态对象集合： 返回平铺结构的DynamicObject集合，不可用做insert、update方法参数


### `toPlainDynamicObjectCollection`

```java
DynamicObjectCollection toPlainDynamicObjectCollection(DataSet, int, int)
```

DataSet转为扁平动态对象集合，指定数据范围


### `toPlainDynamicObjectCollection`

```java
DynamicObjectCollection toPlainDynamicObjectCollection(CachedDataSet, int, int)
```

CacheDataSet 转为扁平动态对象集合


### `toPlainDynamicObjectCollection`

```java
DynamicObjectCollection toPlainDynamicObjectCollection(java.util.List<Row>, RowMeta, int, int)
```

list 转为扁平动态对象集合

