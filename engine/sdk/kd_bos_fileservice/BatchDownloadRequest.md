# BatchDownloadRequest


**模块**: kd.bos.fileservice

**类型**: CLASS

**父类**: 无

**实现接口**: java.io.Serializable

**说明**: 批量下载请求对象，将一批文件url下载为一个压缩包，默认支持zip压缩
 fileName: 文件名
 zip中支持目录结构，明细节点是url文件，比如
 最终结果是：
 凭证-2018-4-12.zip
 目录1
     文件名1.xxx
     文件名2.xxx
 目录2
  文件名3.xxx
     文件名4.xxx
 文件名5.xxx
 文件名6.xxx
 
 那么请求结构如下:
 fileName=凭证-2018-4-12
 dirs[]
     dir1: name=目录1
         files[]: 
             files[0]: name=文件名1.xxx,url=xxxx
             files[1]: name=文件名2.xxx,url=xxxx
  dir2: name=目录2
      files[]:
          files[3]: name=文件名3.xxx,url=xxxx
             files[4]: name=文件名4.xxx,url=xxxx
 files[]:
         files[5]: name=文件名5.xxx,url=xxxx
         files[6]: name=文件名6.xxx,url=xxxx


```java
public class BatchDownloadRequest implements java.io.Serializable
```


## 字段 (1 个)


| 字段名 | 类型 | 说明 |

|--------|------|------|

| TYPE_ZIP | `java.lang.String` | 压缩类型 |


## 方法 (8 个)


### `BatchDownloadRequest`

```java
BatchDownloadRequest(java.lang.String)
```

默认构造 zip 类型


### `BatchDownloadRequest`

```java
BatchDownloadRequest(java.lang.String, java.lang.String)
```

构造方法


### `getDirs`

```java
kd.bos.fileservice.BatchDownloadRequest.Dir[] getDirs()
```

getter


### `getFileName`

```java
java.lang.String getFileName()
```

getter


### `getFiles`

```java
kd.bos.fileservice.BatchDownloadRequest.File[] getFiles()
```

getter


### `getType`

```java
java.lang.String getType()
```

getter


### `setDirs`

```java
void setDirs(kd.bos.fileservice.BatchDownloadRequest.Dir[])
```

setter


### `setFiles`

```java
void setFiles(kd.bos.fileservice.BatchDownloadRequest.File[])
```

setter

