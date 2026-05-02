# Algo


**模块**: kd.bos.algo

**类型**: CLASS

**父类**: 无

**说明**: 此类可以用来创建algo上下文信息、DataSetBuilder、DataSet、CacheDataSet等。


```java
public abstract class Algo
```


## 方法 (13 个)


### `closeAllDataSet`

```java
void closeAllDataSet()
```

close all dataset create by current thread


### `create`

```java
kd.bos.algo.Algo create(java.lang.String)
```

config by system properties which injected by configserver。如：fi.abc


### `createCachedDataSetBuilder`

```java
kd.bos.algo.CachedDataSet.Builder createCachedDataSetBuilder(kd.bos.algo.RowMeta, kd.bos.algo.CacheHint)
```

创建生成CacheDataset的Builder


### `createDataSet`

```java
kd.bos.algo.DataSet createDataSet(java.util.Collection<java.lang.Object[]>, kd.bos.algo.RowMeta)
```

使用一个集合,元素据创建DataSet，建议使用DataSetBuilder构造更好


### `createDataSet`

```java
kd.bos.algo.DataSet createDataSet(java.util.Iterator<java.lang.Object[]>, kd.bos.algo.RowMeta)
```

使用一个迭代器Iterator，元素据创建DataSet。


### `createDataSet`

```java
kd.bos.algo.DataSet createDataSet(java.lang.Iterable<java.lang.Object[]>, kd.bos.algo.RowMeta)
```

使用一个迭代器Iterable，元素据创建DataSet。


### `createDataSet`

```java
kd.bos.algo.DataSet createDataSet(java.sql.ResultSet)
```

使用ResultSet 创建DataSet


### `createDataSet`

```java
kd.bos.algo.DataSet createDataSet(java.sql.ResultSet, kd.bos.algo.RowMeta)
```

使用ResultSet和元素据创建DataSet


### `createDataSet`

```java
kd.bos.algo.DataSet createDataSet(kd.bos.algo.Input[])
```

使用Input源创建DataSet，这个输入源可以是<a href='?nav=class&package=kd.bos.algo.input&name=OrmInput'>kd.bos.algo.input.OrmInput</a>，<a href='?nav=class&package=kd.bos.algo.input&name=DbInput'>kd.bos.algo.input.DbInput</a>等，或者自己实现一个Input。


### `createDataSetBuilder`

```java
kd.bos.algo.DataSetBuilder createDataSetBuilder(kd.bos.algo.RowMeta)
```

创建DataSetBuilder，可再使用它创建DataSet。


### `getCacheDataSet`

```java
kd.bos.algo.CachedDataSet getCacheDataSet(java.lang.String)
```

获取缓存过的CachedDataSet


### `newContext`

```java
kd.bos.algo.AlgoContext newContext()
```

创建一个Algo上下文<a href='?nav=class&package=kd.bos.algo&name=AlgoContext'>kd.bos.algo.AlgoContext</a>


### `removeCacheDataSet`

```java
void removeCacheDataSet(java.lang.String)
```

根据缓存id删除缓存DataSet

