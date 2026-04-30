# DLock


**模块**: kd.bos.dlock

**类型**: INTERFACE

**父类**: 无

**实现接口**: java.lang.AutoCloseable

**说明**: 分布式锁接口

 <p>
 基本用法:

 <pre>
 <code>
  try (DLock lock = DLock.create("key", "desc")) {
      lock.lock();
      // ...
  }
 </code>
 </pre>


```java
public interface DLock extends java.lang.AutoCloseable
```


## 方法 (8 个)


### `create`

```java
kd.bos.dlock.DLock create(java.lang.String)
```

分布式锁对象，不可重入。


### `create`

```java
kd.bos.dlock.DLock create(java.lang.String, java.lang.String)
```

分布式锁对象，不可重入。


### `createReentrant`

```java
kd.bos.dlock.DLock createReentrant(java.lang.String)
```

分布式锁对象，可重入(仅在本jvm范围内)。


### `createReentrant`

```java
kd.bos.dlock.DLock createReentrant(java.lang.String, java.lang.String)
```

分布式锁对象，可重入(仅在本jvm范围内)。


### `lock`

```java
void lock()
```

获取锁，一直等待，直到获取。


### `tryLock`

```java
boolean tryLock()
```

尝试获取锁，不等待，获取到返回true(无锁竞争的情况下必为true)，否则返回false。


### `tryLock`

```java
boolean tryLock(long)
```

尝试获取锁，在timeoutMillis毫秒内获取到，返回true，否则返回false。


### `unlock`

```java
void unlock()
```

释放锁

