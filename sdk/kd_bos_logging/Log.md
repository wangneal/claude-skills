# Log


**模块**: kd.bos.logging

**类型**: INTERFACE

**父类**: 无

**说明**: 修订记录： 2018/03/13，by lzx 1. 不再支持LogTags


```java
public interface Log
```


## 方法 (24 个)


### `debug`

```java
void debug(java.lang.String)
```

输出调试信息


### `debug`

```java
void debug(java.lang.String, java.lang.Object)
```

通过占位{}符输出调试信息
 例如log.debug("Hi {}.", "there")输出“Hi there.”


### `debug`

```java
void debug(java.lang.String, java.lang.Object, java.lang.Object)
```

通过多个占位{}符输出调试信息
 log.debug("Found {} matching '{}'", records, filter); will return the string "Found records matching v"


### `debug`

```java
void debug(java.lang.String, java.lang.Object[])
```

多个占位符输出


### `error`

```java
void error(java.lang.String)
```

输出错误信息


### `error`

```java
void error(java.lang.String, java.lang.Object)
```

log.error("Hi {}.", "there") will return the string “Hi there.”.


### `error`

```java
void error(java.lang.String, java.lang.Object, java.lang.Object)
```

log.error("Found {} matching '{}'", records, filter); will return the string
 "Found records matching records"


### `error`

```java
void error(java.lang.String, java.lang.Object[])
```

多个占位符输出


### `error`

```java
void error(java.lang.Throwable)
```

输出错误信息


### `error`

```java
void error(java.lang.String, java.lang.Throwable)
```

输出错误信息


### `info`

```java
void info(java.lang.String)
```

输出应用信息


### `info`

```java
void info(java.lang.String, java.lang.Object)
```

log.info("Hi {}.", "there") will return the string “Hi there.”.


### `info`

```java
void info(java.lang.String, java.lang.Object, java.lang.Object)
```

log.info("Found {} matching '{}'", records, filter); will return the string
 "Found records matching filter"


### `info`

```java
void info(java.lang.String, java.lang.Object[])
```

多个占位符输出


### `isDebugEnabled`

```java
boolean isDebugEnabled()
```

debug级别日志是否开启


### `isErrorEnabled`

```java
boolean isErrorEnabled()
```

error级别日志是否开启


### `isInfoEnabled`

```java
boolean isInfoEnabled()
```

info级别日志是否开启


### `isWarnEnabled`

```java
boolean isWarnEnabled()
```

warn级别日志是否开启


### `warn`

```java
void warn(java.lang.String)
```

输出警告信息


### `warn`

```java
void warn(java.lang.String, java.lang.Object)
```

log.warn("Hi {}.", "there") will return the string “Hi there.”.


### `warn`

```java
void warn(java.lang.String, java.lang.Object, java.lang.Object)
```

log.warn("Found {} matching '{}'", records, filter); will return the string
 "Found records matching records"


### `warn`

```java
void warn(java.lang.String, java.lang.Object[])
```

多个占位符输出


### `warn`

```java
void warn(java.lang.Throwable)
```

输出告警异常信息


### `warn`

```java
void warn(java.lang.String, java.lang.Throwable)
```

输出告警异常信息

