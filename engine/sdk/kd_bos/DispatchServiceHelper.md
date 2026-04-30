# DispatchServiceHelper


**包路径**: kd.bos.servicehelper

**类型**: CLASS

**父类**: 无

**说明**: 微服务调用入口：通过动态反射方式调用各种平台、业务封装的各种微服务


```java
public class DispatchServiceHelper
```


## 方法 (5 个)


### `getBOSService`

```java
java.lang.Object getBOSService(java.lang.String, java.lang.String, java.lang.Class<T>)
```

获取苍穹平台发布的微服务接口


### `invokeBOSService`

```java
java.lang.Object invokeBOSService(java.lang.String, java.lang.String, java.lang.String, java.lang.Object[])
```

调用苍穹平台发布的微服务


### `invokeBizService`

```java
java.lang.Object invokeBizService(java.lang.String, java.lang.String, java.lang.String, java.lang.String, java.lang.Object[])
```

调用星瀚财务、供应链、制造、HR等业务领域发布的微服务


### `invokeExternalService`

```java
java.lang.Object invokeExternalService(java.lang.String, java.lang.String, java.util.Map<java.lang.String,java.lang.Object>)
```

调用外部第三方接口服务（通过集成云服务转发，默认先路由到二级节点cic）


### `invokeService`

```java
java.lang.Object invokeService(java.lang.String, java.lang.String, java.lang.String, java.lang.String, java.lang.Object[])
```

调用伙伴、二次开发发布的微服务

