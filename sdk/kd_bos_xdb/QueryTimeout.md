# QueryTimeout


**模块**: kd.bos.xdb

**类型**: INTERFACE

**父类**: 无

**实现接口**: java.lang.AutoCloseable

**说明**: 每条语句的最大执行时间(秒)


```java
public interface QueryTimeout extends java.lang.AutoCloseable
```


## 方法 (1 个)


### `getSeconds`

```java
int getSeconds()
```

获取查询超时时间值。

