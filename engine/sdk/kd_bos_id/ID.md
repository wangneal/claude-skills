# ID


**模块**: kd.bos.id

**类型**: INTERFACE

**父类**: 无

**说明**: 集群内唯一ID生成器

 <p>用法:
 <pre><code>

  //Long ID
  long id = ID.genLongId();

  //String ID，最大长度13。
  String sid = ID.genStringId();

  //转换: long<-->string
  id=ID.toLongId(sid);
  sid=ID.toStringId(id);

  // 计算今天的id值范围
  IDRange dayRange = ID.getIDRangeOfDay(new Date());
  long minId=dayRange.getMinId();
  long maxId=dayRange.getMaxId();
 </code>
 </pre>


```java
public interface ID
```


## 方法 (11 个)


### `genLongId`

```java
long genLongId()
```

- 无说明


### `genLongIds`

```java
long[] genLongIds(int)
```

批量生成long类型ID


### `genStringId`

```java
java.lang.String genStringId()
```

字符类型ID，最大长度12，是产生long值ID后再用Base39编码进行转换所得，它和long值保持一一对应关系，是有序的。

 <p>
 Base39字符集：<code>+/0123456789=ABCDEFGHIJKLMNOPQRSTUVWXYZ</code>

 <p>
 常用作实体主键


### `genStringIds`

```java
java.lang.String[] genStringIds(int)
```

批量生成字符类型ID


### `getCreateTime`

```java
java.util.Date getCreateTime(long)
```

获取创建id的时间


### `getCreateTime`

```java
java.util.Date getCreateTime(java.lang.String)
```

获取创建id的时间


### `getIDRangeOfDay`

```java
kd.bos.id.IDRange getIDRangeOfDay(java.util.Date)
```

获取<tt>date</tt>那天创建的ID值范围


### `longFrom36Radix`

```java
long longFrom36Radix(java.lang.String)
```

Base36编码字符ID -> long ID


### `longTo36Radix`

```java
java.lang.String longTo36Radix(long)
```

long ID -> Base36编码字符ID (最大长度13)

 <p>
 Base36字符集：<code>0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ</code>

 <p>
 比Base39少了三个字符：<code>+/=</code>

 <p>
 用于只接受数字和字符的场合，不可用作实体主键。


### `toLongId`

```java
long toLongId(java.lang.String)
```

String ID -> long ID


### `toStringId`

```java
java.lang.String toStringId(long)
```

long ID -> String ID

