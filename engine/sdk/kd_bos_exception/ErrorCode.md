# ErrorCode


**模块**: kd.bos.exception

**类型**: CLASS

**父类**: 无

**实现接口**: java.io.Serializable

**说明**: 错误码


```java
public final class ErrorCode implements java.io.Serializable
```


## 方法 (4 个)


### `ErrorCode`

```java
ErrorCode(java.lang.String, java.lang.String)
```

- 无说明


### `getCode`

```java
java.lang.String getCode()
```

获取错误码


### `getLangMessage`

```java
kd.bos.exception.ErrorCode.LangMessage getLangMessage()
```

获取多语言异常信息


### `getMessage`

```java
java.lang.String getMessage()
```

获取错误信息

