# ThreadPool


**模块**: kd.bos.threads

**类型**: INTERFACE

**父类**: 无

**说明**: 线程池接口


```java
public interface ThreadPool
```


## 方法 (5 个)


### `close`

```java
void close()
```

关闭当前线程池


### `execute`

```java
void execute(java.lang.Runnable)
```

使用当前线程上下文执行


### `execute`

```java
void execute(java.lang.Runnable, kd.bos.context.RequestContext)
```

根据传入的上下文执行线程


### `submit`

```java
java.util.concurrent.Future submit(java.util.concurrent.Callable<T>)
```

使用当前线程上下文提交


### `submit`

```java
java.util.concurrent.Future submit(java.util.concurrent.Callable<T>, kd.bos.context.RequestContext)
```

根据传入的上下文提交线程

