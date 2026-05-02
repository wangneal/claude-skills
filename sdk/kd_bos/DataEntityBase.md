# DataEntityBase


**包路径**: kd.bos.dataentity.entity

**类型**: CLASS

**父类**: 无

**实现接口**: kd.bos.dataentity.entity.INotifyPropertyChanged, kd.bos.dataentity.entity.ISupportInitialize, kd.bos.dataentity.entity.IDataEntityBase, kd.bos.dataentity.entity.IObjectWithParent, java.io.Serializable

**说明**: 数据包基类，<a href='?nav=class&module=kd.bos.dataentity&package=kd.bos.dataentity.entity&name=DynamicObject'>DynamicObject</a>的父类


```java
public abstract class DataEntityBase implements kd.bos.dataentity.entity.INotifyPropertyChanged, kd.bos.dataentity.entity.ISupportInitialize, kd.bos.dataentity.entity.IDataEntityBase, kd.bos.dataentity.entity.IObjectWithParent, java.io.Serializable
```


## 字段 (1 个)


| 字段名 | 类型 | 说明 |

|--------|------|------|

| changes | `java.beans.PropertyChangeSupport` | 当你需要监听对象属性的变化时，可以使用PropertyChangeSupport类来管理监听器 |


## 方法 (18 个)


### `OnPropertyChanged`

```java
void OnPropertyChanged(java.beans.PropertyChangeEvent)
```

触发属性改变事件


### `addPropertyChangeListener`

```java
void addPropertyChangeListener(java.beans.PropertyChangeListener)
```

- 无说明


### `beginInit`

```java
void beginInit()
```

- 无说明


### `beginResetDirtyFlag`

```java
void beginResetDirtyFlag()
```

开始重置脏标记


### `endInit`

```java
void endInit()
```

- 无说明


### `endResetDirtyFlag`

```java
void endResetDirtyFlag()
```

结束重置脏标记


### `getDataEntityState`

```java
kd.bos.dataentity.entity.DataEntityState getDataEntityState()
```

返回当前数据行的状态管理


### `getDataEntityType`

```java
kd.bos.dataentity.metadata.IDataEntityType getDataEntityType()
```

返回实体的数据类型


### `getParent`

```java
java.lang.Object getParent()
```

返回此实体对应的父对象


### `getPkValue`

```java
java.lang.Object getPkValue()
```

- 无说明


### `getPropertyChangeListeners`

```java
java.beans.PropertyChangeListener[] getPropertyChangeListeners()
```

- 无说明


### `isInitialized`

```java
boolean isInitialized()
```

- 无说明


### `isInitializing`

```java
boolean isInitializing()
```

返回是否正在初始化过程中。


### `isResetDirtyFlag`

```java
boolean isResetDirtyFlag()
```

是否重置脏标记


### `readResolve`

```java
java.lang.Object readResolve()
```

初始化PropertyChangeSupport


### `refreshDataEntityState`

```java
void refreshDataEntityState()
```

允许在初始化后再增加属性： 增加属性后调用此方法刷新实体状态。


### `removePropertyChangeListener`

```java
void removePropertyChangeListener(java.beans.PropertyChangeListener)
```

- 无说明


### `setParent`

```java
void setParent(java.lang.Object)
```

设置此实体对应的父对象

