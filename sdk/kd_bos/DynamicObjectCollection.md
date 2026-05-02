# DynamicObjectCollection


**包路径**: kd.bos.dataentity.entity

**类型**: CLASS

**父类**: kd.bos.dataentity.entity.DataEntityCollection

**实现接口**: java.io.Serializable

**说明**: 动态实体对象集合，承载<a href='?nav=class&module=kd.bos.dataentity&package=kd.bos.dataentity.entity&name=DynamicObject'>DynamicObject</a>的默认集合


```java
public class DynamicObjectCollection extends kd.bos.dataentity.entity.DataEntityCollection implements java.io.Serializable
```


## 方法 (25 个)


### `DynamicObjectCollection`

```java
DynamicObjectCollection()
```

构造函数：创建动态实体对象集合实例


### `DynamicObjectCollection`

```java
DynamicObjectCollection(kd.bos.dataentity.metadata.dynamicobject.DynamicObjectType, java.lang.Object)
```

构造函数：创建动态实体对象集合实例


### `DynamicObjectCollection`

```java
DynamicObjectCollection(kd.bos.dataentity.metadata.dynamicobject.DynamicObjectType, java.lang.Object, java.util.List<kd.bos.dataentity.entity.DynamicObject>)
```

构造函数：创建动态实体对象集合实例


### `add`

```java
void add(int, kd.bos.dataentity.entity.DynamicObject)
```

把动态实体对象插入到集合index索引的位置上


### `addAll`

```java
boolean addAll(java.util.Collection<? extends kd.bos.dataentity.entity.DynamicObject>)
```

- 无说明


### `addNew`

```java
kd.bos.dataentity.entity.DynamicObject addNew()
```

创建一个新的的动态实体对象


### `clear`

```java
void clear()
```

清除集合数据


### `fetchEntryRows`

```java
void fetchEntryRows(int)
```

取当前页的分录数据


### `fetchEntryRows`

```java
void fetchEntryRows(int, int)
```

以起始行号开始，获取每页大小数据量的分录数据


### `getDeleteRows`

```java
java.util.List<kd.bos.dataentity.entity.DynamicObject> getDeleteRows()
```

获取被删除的行


### `getDynamicCollectionItemPropertyType`

```java
kd.bos.dataentity.metadata.dynamicobject.DynamicObjectType getDynamicCollectionItemPropertyType()
```

请改用<a href='javascript:scrollToAnchor("getDynamicObjectType")'>#getDynamicObjectType</a>。


### `getDynamicObjectType`

```java
kd.bos.dataentity.metadata.dynamicobject.DynamicObjectType getDynamicObjectType()
```

返回集合属性的元素数据类型


### `getInsertRows`

```java
java.util.List<kd.bos.dataentity.entity.DynamicObject> getInsertRows()
```

获取插入的行


### `getPageCount`

```java
int getPageCount()
```

获取总页数


### `getPageIndex`

```java
int getPageIndex()
```

获取分页索引


### `getPageSize`

```java
int getPageSize()
```

获取每页大小


### `getRootEntity`

```java
kd.bos.dataentity.entity.DynamicObject getRootEntity()
```

获取主实体对象


### `getRootEntityType`

```java
kd.bos.dataentity.metadata.dynamicobject.DynamicObjectType getRootEntityType()
```

获取主实体对象类型


### `getRowCount`

```java
int getRowCount()
```

获取设置分页情况下总行数


### `getStartRowIndex`

```java
int getStartRowIndex()
```

获取当前页起始索引号，下标从零开始


### `getUpdateRows`

```java
java.util.List<kd.bos.dataentity.entity.DynamicObject> getUpdateRows()
```

获取被修改的行


### `remove`

```java
kd.bos.dataentity.entity.DynamicObject remove(int)
```

从集合中移除序号为index的元素


### `remove`

```java
boolean remove(java.lang.Object)
```

从集合中移除数据


### `setRowCount`

```java
void setRowCount(int)
```

设置分页情况下总行数


### `setStartRowIndex`

```java
void setStartRowIndex(int)
```

设置当前页起始索引号，下标从零开始

