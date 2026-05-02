# DataMutex


**模块**: kd.bos.mutex

**类型**: INTERFACE

**父类**: 无

**实现接口**: java.io.Closeable

**说明**: 数据级网络控制服务接口
 同一个单据，不允许有两个用户对同一个数据同时操作，称为数据互斥
 例如某张单据，前一个人修改，后一个人应该不允许修改该单据。
 <p>
 使用示例：<pre><code>
 try (DataMutex dataMutex = DataMutex.create()) {

     //申请网络互斥锁
     String groupId = "default_netctrl";
     String entityKey = "bos_user";
     List<Map<String, Object>> mutexRequireList = new ArrayList<>(1);
     Map<String, Object> requireParam = new HashMap<>();

     requireParam.put(DataMutex.PARAMNAME_DATAOBJID, "1488499792815457280");
     requireParam.put(DataMutex.PARAMNAME_DATA_OBJ_NUMBER, "billNo");
     requireParam.put(DataMutex.PARAMNAME_GROUPID, groupId);
     requireParam.put(DataMutex.PARAMNAME_ENTITYKEY, entityKey);
     requireParam.put(DataMutex.PARAMNAME_OPERATIONKEY, "modify");
     requireParam.put(DataMutex.PARAMNAME_ISSTRICT, "true");
     requireParam.put(DataMutex.PARAMNAME_DATA_CALL_SOURCE, "default");
     mutexRequireList.add(requireParam);
     Map<String, Boolean> mutexResult = dataMutex.batchrequire(mutexRequireList);

     // 分析网控申请结果
     for (Map.Entry<String, Boolean> mutexItem : mutexResult.entrySet()) {
      String objId = mutexItem.getKey();
      Boolean ret = mutexItem.getValue();

      if (ret) {
          //申请互斥成功的
      } else {
          Map<String, String> lockInfo = dataMutex.getLockInfo(objId, groupId, entityKey);
          if (lockInfo != null) {
              //申请锁失败，提示已经存在的锁信息
          }
      }
     }

     //释放网络互斥锁
     List<Map<String, Object>> releaseMutexList = new ArrayList<>(1);
     Map<String, Object> releaseParam = new HashMap<>();
     releaseParam.put(DataMutex.PARAMNAME_DATAOBJID, "1488499792815457280");
     releaseParam.put(DataMutex.PARAMNAME_GROUPID, groupId);
     releaseParam.put(DataMutex.PARAMNAME_ENTITYKEY, entityKey);
     releaseParam.put(DataMutex.PARAMNAME_OPERATIONKEY, "modify");
     releaseMutexList.add(releaseParam);

     Map<String, Boolean> releaseResult = dataMutex.batchRelease(releaseMutexList);
     // 分析释放结果
     for (Map.Entry<String, Boolean> releaseItem : releaseResult.entrySet()) {
         boolean releaseRet = releaseItem.getValue();
         if (!releaseRet) {
             //记录释放失败的锁
         }
     }
 } catch (Exception e) {
     Log.error(e);
 }
 </code></pre>


```java
public interface DataMutex extends java.io.Closeable
```


## 字段 (16 个)


| 字段名 | 类型 | 说明 |

|--------|------|------|

| DEFAULT_GROUPID | `java.lang.String` | 默认网控分组，同一分组中的操作互斥。修改、提交、审核、删除，默认都是在此分组中 |

| KEY_CLIENT | `java.lang.String` | 客户端类型
 PC端：web
 移动端：mobile |

| KEY_LOCKEDTIME | `java.lang.String` | 加锁时间 |

| KEY_OPKEY | `java.lang.String` | 操作key |

| KEY_SESSION | `java.lang.String` | 会话ID |

| KEY_USERID | `java.lang.String` | 用户ID |

| PARAMNAME_DATAOBJID | `java.lang.String` | 数据ID
 唯一性ID，可使用数据库中的fid |

| PARAMNAME_DATA_CALL_SOURCE | `java.lang.String` | 调用来源
 内部记录，用记录平台标准锁或业务锁 |

| PARAMNAME_DATA_OBJ_NUMBER | `java.lang.String` | 数据编码
 单据为单据编号、基础资料为编码 |

| PARAMNAME_ENTITYKEY | `java.lang.String` | 实体编码 |

| PARAMNAME_GROUPID | `java.lang.String` | 互斥组ID
 平台标准操作（如修改、提交、审核等）的分组为default_netctrl
 业务操作可以根据是否需要和平台操作互斥设置互斥组 |

| PARAMNAME_IGNOREMODIFY | `java.lang.String` | 是否忽略已申请的修改网控
 true: 其他用户已经申请修改网控，允许申请提交、审核等网控。
       避免用户长期打开界面不关闭，其他用户无法进行提交、审核等操作，阻塞流程（特例，开启此选项，重复申请修改网控依然不允许）
 false: 默认值，其他用户已经申请网控（含修改、提交、审核等各种操作网控），不再允许申请其他操作网控 |

| PARAMNAME_ISOPENINTENTLOCKS | `java.lang.String` | 是否开启意向锁 |

| PARAMNAME_ISSTRICT | `java.lang.String` | 是否可重入 
 true:不可重入，即只要有锁就失败，无论是否是自己的
 false: 1.同sessionId允许重入
        2.同userId允许重入 |

| PARAMNAME_OPERATIONKEY | `java.lang.String` | 操作标识
 如修改：modify  提交：submit |

| PARAMNAME_RECORDID | `java.lang.String` | - |


## 方法 (11 个)


### `batchRelease`

```java
java.util.Map<java.lang.String,java.lang.Boolean> batchRelease(java.util.List<java.util.Map<java.lang.String,java.lang.Object>>)
```

批量释放互斥锁


### `batchrequire`

```java
java.util.Map<java.lang.String,java.lang.Boolean> batchrequire(java.util.List<java.util.Map<java.lang.String,java.lang.Object>>)
```

批量申请互斥锁


### `create`

```java
kd.bos.mutex.DataMutex create()
```

创建数据互斥接口实现类


### `forcerelease`

```java
boolean forcerelease(java.lang.String, java.lang.String, java.lang.String)
```

强制根据 实体-操作-数据ID 释放该数据上的互斥锁
 可在用户退出登录，或者定期刷新失效锁等情景下调用
 删除成功后会留下强制删除锁的数据库记录可追溯


### `getLockInfo`

```java
java.util.Map<java.lang.String,java.lang.String> getLockInfo()
```

获取数据锁信息，只适用于同个线程前面已经申请了单条数据网控的情况


### `getLockInfo`

```java
java.util.Map<java.lang.String,java.lang.String> getLockInfo(java.lang.String, java.lang.String, java.lang.String)
```

根据 实体-互斥组-数据 获取获取指定的数据锁信息


### `getLockInfo`

```java
java.util.List<kd.bos.mutex.impl.MutexLockDataInfo> getLockInfo(java.util.List<kd.bos.mutex.impl.MutexBaseInfo>)
```

根据 实体-互斥组-数据 获取获取指定的数据锁信息


### `refreshLocks`

```java
void refreshLocks()
```

更新网络互斥锁，清理Redis和数据库中不一致的的锁记录，清除垃圾数据


### `release`

```java
boolean release(java.lang.String, java.lang.String, java.lang.String)
```

根据 实体-操作-数据ID 释放该数据上的互斥锁


### `releaseTimeoutLock`

```java
void releaseTimeoutLock()
```

自动清除超时的网控


### `require`

```java
boolean require(kd.bos.mutex.impl.MutexLockInfo)
```

按实体-互斥组-操作-数据ID申请锁；
 目前一个实体只有一个互斥组

