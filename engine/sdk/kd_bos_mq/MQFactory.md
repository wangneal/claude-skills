# MQFactory


**模块**: kd.bos.mq

**类型**: CLASS

**父类**: 无

**说明**: 消息生产者工厂，通过kd.bos.mq.MQFactory#get()方法获取工厂实例来创建生产者，示例如下：
 <pre><code>
     // Trascation begin 支持事务
     MessagePublisher publisher = MQFactory.get().createSimplePublisher("demo", "demo_queue");
     try(TXHandle txHandle = TX.requiresNew()){
          try{
              DB.execute(DBRoute.of("sys"),updateSql);
              publisher.publishInDbTranscation("hello");
              publisher.publishInDbTranscation("world");
          }catch(Exception e){
              txHandle.markRollback();
          }
     } finally {
         //用完关闭
         publisher.close();
     }
     // Transcation end
 </code></pre>
 <pre><code>
     //不支持事务
     MessagePublisher pub = MQFactory.get().createSimplePublisher("demo", "demo_queue");
         try {
              pub.publish("hello world");
         } finally{
              //用完关闭
              pub.close();
         }
     }
 </code></pre>


```java
public abstract class MQFactory
```


## 方法 (3 个)


### `createPartitionPublisher`

```java
kd.bos.mq.MessagePublisher createPartitionPublisher(java.lang.String, java.lang.String, kd.bos.mq.support.partition.PartitionStrategy)
```

创建分区发送者


### `createSimplePublisher`

```java
kd.bos.mq.MessagePublisher createSimplePublisher(java.lang.String, java.lang.String)
```

创建常规消息发送者


### `get`

```java
kd.bos.mq.MQFactory get()
```

获取MQ消息生产者工厂

