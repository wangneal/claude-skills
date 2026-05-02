# BusinessDataServiceHelper


**模块**: kd.bos.servicehelper

**类型**: CLASS

**父类**: 无

**说明**: 数据操作服务类，提供查询、保存等功能


```java
public class BusinessDataServiceHelper
```


## 方法 (28 个)


### `load`

```java
java.lang.Object[] load(java.lang.Object[], IDataEntityType)
```

批量读取实体数据


### `load`

```java
DynamicObject[] load(java.lang.Object[], DynamicObjectType)
```

批量读取实体数据


### `load`

```java
DynamicObject[] load(java.lang.String, java.lang.String, QFilter[])
```

按条件读取实体数据


### `load`

```java
DynamicObject[] load(java.lang.String, java.lang.String, QFilter[], java.lang.String)
```

按条件读取实体数据


### `load`

```java
DynamicObject[] load(java.lang.String, java.lang.String, QFilter[], java.lang.String, int)
```

按条件读取实体数据，取top张


### `load`

```java
DynamicObject[] load(java.lang.String, java.lang.String, QFilter[], java.lang.String, int, int)
```

按条件读取实体数据，在符合条件的数据中分页取数
 对所有符合条件的数据进行排序、分页，输出指定分页的实体数据


### `loadFromCache`

```java
java.util.Map<java.lang.Object,DynamicObject> loadFromCache(java.lang.Object[], DynamicObjectType)
```

批量读取实体数据，使用缓存


### `loadFromCache`

```java
java.util.Map<java.lang.Object,DynamicObject> loadFromCache(java.lang.Object[], java.lang.String)
```

批量读取实体数据，使用缓存


### `loadFromCache`

```java
java.util.Map<java.lang.Object,DynamicObject> loadFromCache(java.lang.String, java.lang.String, QFilter[])
```

按条件读取实体数据，使用缓存


### `loadFromCache`

```java
java.util.Map<java.lang.Object,DynamicObject> loadFromCache(java.lang.String, java.lang.String, QFilter[], java.lang.String)
```

按条件读取实体数据，使用缓存


### `loadFromCache`

```java
java.util.Map<java.lang.Object,DynamicObject> loadFromCache(java.lang.String, QFilter[])
```

按条件读取实体数据，使用缓存


### `loadFromCache`

```java
java.util.Map<java.lang.Object,DynamicObject> loadFromCache(DynamicObjectType, QFilter[])
```

按条件读取实体数据，使用缓存


### `loadHead`

```java
DynamicObject loadHead(java.lang.Object, DynamicObjectType)
```

读取实体数据，仅含根实体数据（单据头），不含分录数据


### `loadRefence`

```java
void loadRefence(java.lang.Object[], IDataEntityType)
```

加载实体数据中引用的基础数据，填充到实体数据包中
 实体数据的加载通常分为两步：
 1. 读取实体本身的属性值，基础资料字段取到内码
 2. 根据基础资料内码，读取引用的基础资料数据包，填充在实体数据包中


### `loadSingle`

```java
DynamicObject loadSingle(java.lang.Object, DynamicObjectType)
```

读取单张实体数据


### `loadSingle`

```java
DynamicObject loadSingle(java.lang.Object, DynamicObjectType, int, int)
```

读取单张实体数据，指定分录起始行
 主要用于读取超大单（分录行过万），默认一次性把全部分录行都读取出来，会非常消耗性能。通过此方法指定分录行范围，减少数据量，提升性能


### `loadSingle`

```java
DynamicObject loadSingle(java.lang.Object, java.lang.String)
```

读取单张实体数据


### `loadSingle`

```java
DynamicObject loadSingle(java.lang.Object, java.lang.String, java.lang.String)
```

读取单张实体数据，指定读取字段范围


### `loadSingle`

```java
DynamicObject loadSingle(java.lang.String, QFilter[])
```

读取第一张符合条件的实体数据，包含全部字段


### `loadSingle`

```java
DynamicObject loadSingle(java.lang.String, java.lang.String, QFilter[])
```

读取第一张符合条件的实体数据，指定读取字段范围


### `loadSingleFromCache`

```java
DynamicObject loadSingleFromCache(java.lang.Object, java.lang.String)
```

读取单张实体数据，使用缓存


### `loadSingleFromCache`

```java
DynamicObject loadSingleFromCache(java.lang.Object, java.lang.String, java.lang.String)
```

读取单张实体数据，使用缓存


### `loadSingleFromCache`

```java
DynamicObject loadSingleFromCache(java.lang.String, QFilter[])
```

读取第一张符合条件的实体数据，使用缓存


### `loadSingleFromCache`

```java
DynamicObject loadSingleFromCache(java.lang.String, java.lang.String, QFilter[])
```

读取第一张符合条件的实体数据，使用缓存


### `loadSingleFromCache`

```java
DynamicObject loadSingleFromCache(java.lang.Object, DynamicObjectType)
```

读取单张实体数据，使用缓存


### `loadWithPermission`

```java
DynamicObject[] loadWithPermission(java.lang.String, java.lang.String, QFilter[], java.lang.String, int, java.lang.String)
```

加载有权的数据
 权限控制字段、特殊数据权限、数据规则


### `newDynamicObject`

```java
DynamicObject newDynamicObject(java.lang.String)
```

通过实体标识创建一个动态实体数据包


### `removeCache`

```java
void removeCache(DynamicObjectType)
```

清理缓存的实体数据

