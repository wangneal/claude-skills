# DataEntityCollection


**包路径**: kd.bos.dataentity.entity

**类型**: CLASS

**父类**: java.util.ArrayList

**实现接口**: kd.bos.dataentity.entity.ISupportInitialize, java.io.Serializable

**说明**: 数据包集合基类，<a href='?nav=class&module=kd.bos.dataentity&package=kd.bos.dataentity.entity&name=DynamicObjectCollection'>DynamicObjectCollection</a>的父类


```java
public class DataEntityCollection<T> extends java.util.ArrayList implements kd.bos.dataentity.entity.ISupportInitialize, java.io.Serializable
```


## 字段 (1 个)


| 字段名 | 类型 | 说明 |

|--------|------|------|

| parent | `java.lang.Object` | 实体对应的父对象 |


## 方法 (12 个)


### `DataEntityCollection`

```java
DataEntityCollection()
```

构造函数：创建数据包集合实例


### `DataEntityCollection`

```java
DataEntityCollection(java.lang.Object)
```

构造函数：创建数据包集合实例


### `DataEntityCollection`

```java
DataEntityCollection(java.lang.Object, java.util.List<T>)
```

构造函数：创建数据包集合实例并提供底层的集合


### `add`

```java
boolean add(T)
```

- 无说明


### `add`

```java
void add(int, T)
```

把数据包对象插入到集合index的位置上


### `beginInit`

```java
void beginInit()
```

- 无说明


### `clear`

```java
void clear()
```

清除集合对象


### `endInit`

```java
void endInit()
```

- 无说明


### `getParent`

```java
java.lang.Object getParent()
```

返回此集合所在的实体，即父对象


### `isInitialized`

```java
boolean isInitialized()
```

- 无说明


### `remove`

```java
T remove(int)
```

从集合中移除序号为index索引的数据包对象


### `set`

```java
T set(int, T)
```

以当前数据包对象替换集合中index索引中的数据包对象

