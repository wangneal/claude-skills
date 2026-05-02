# AttachmentServiceHelper


**包路径**: kd.bos.servicehelper

**类型**: CLASS

**父类**: 无

**说明**: 附件帮助服务类 提供附件上传/获取/删除等方法接口
  附件帮助服务类


```java
public class AttachmentServiceHelper
```


## 字段 (10 个)


| 字段名 | 类型 | 说明 |

|--------|------|------|

| AND | `java.lang.String` | 符号"&" |

| DIV | `java.lang.String` | 符号"/" |

| EQUAL | `java.lang.String` | 符号"=" |

| IMAGE_TYPE | `java.lang.String` | 图片类型串 |

| PER | `java.lang.String` | 符号"%" |

| PLUS | `java.lang.String` | 符号"+" |

| QUES | `java.lang.String` | 符号"?" |

| SPECIAL_CHARACTERS | `java.lang.String[]` | 特殊字符集合 |

| SPECIAL_SYMBOLS | `java.lang.String[]` | 文件名不支持包含符号集合 |

| WELL | `java.lang.String` | 符号"#" |


## 方法 (36 个)


### `ablePreView`

```java
boolean ablePreView(java.lang.String)
```

判断某种类型文件的后缀是否能够预览


### `ablePreView`

```java
boolean ablePreView(java.util.Map)
```

判断文件是否能够预览
 1.文件后缀支持预览
 2.文件预览参数开启
 3.文件大小支持预览
 同时满足以上条件，可预览，否则，不可预览。


### `bindingAttachment`

```java
java.util.Map<java.lang.String,java.lang.Object> bindingAttachment(java.util.Map<java.lang.String,java.lang.Object>)
```

绑定附件面板


### `checkRefByPath`

```java
boolean checkRefByPath(java.lang.String)
```

判断附件path 是否被其他单据引用


### `checkSpeSymbol`

```java
java.lang.String checkSpeSymbol(java.lang.String)
```

- 无说明


### `doParamsValid`

```java
java.lang.String doParamsValid(java.util.Map<java.lang.String,java.lang.Object>, BindingAttachmentInfo)
```

参数校验


### `filterExistAttachmentByExport`

```java
java.util.Set<java.lang.Object> filterExistAttachmentByExport(java.lang.String, java.util.Set<java.lang.Object>)
```

- 无说明


### `genBindingParam`

```java
java.util.Map<java.lang.String,java.lang.Object> genBindingParam(java.lang.String, java.lang.String, java.util.List<AttDto>)
```

获取要绑定的附件数据，搭配bindingAttachment使用


### `getAttCreatorByUID`

```java
DynamicObject getAttCreatorByUID(java.lang.String)
```

- 无说明


### `getAttUrlWithVersion`

```java
java.lang.String getAttUrlWithVersion(java.lang.String)
```

- 无说明


### `getAttachmentInfoByAttPk`

```java
kd.bos.servicehelper.AttachmentDto getAttachmentInfoByAttPk(java.lang.Object)
```

通过bos_attachment的内码获取附件信息


### `getAttachments`

```java
java.util.List<java.util.Map<java.lang.String,java.lang.Object>> getAttachments(java.lang.String, java.lang.Object, java.lang.String)
```

- 无说明


### `getAttachments`

```java
java.util.List<java.util.Map<java.lang.String,java.lang.Object>> getAttachments(java.lang.String, java.lang.Object, java.lang.String, boolean)
```

获取附件信息集合


### `getAttachmentsByExport`

```java
java.util.List<java.util.Map<java.lang.String,java.lang.Object>> getAttachmentsByExport(java.lang.String, java.lang.Object)
```

- 无说明


### `getAttachmentsForApi`

```java
java.util.Map<java.lang.String,java.lang.String> getAttachmentsForApi(java.lang.String, java.lang.Object)
```

- 无说明


### `getCacheJsonString`

```java
java.lang.String getCacheJsonString(java.lang.String, java.util.List<java.util.Map<java.lang.String,java.lang.Object>>, java.lang.String)
```

- 无说明


### `getCompressPicSize`

```java
long getCompressPicSize()
```

- 无说明


### `getEncreptURL`

```java
java.lang.String getEncreptURL(java.lang.String)
```

- 无说明


### `getFileSizeByPath`

```java
int getFileSizeByPath(java.lang.String)
```

耗时方法,通过读取文件流获取单个文件字节数大小


### `getRefCollectionByPath`

```java
DynamicObjectCollection getRefCollectionByPath(java.lang.String)
```

获取附件被引用的记录列表;如果有其他单据引用附件的时候,仅删除引用记录,不删除文件


### `getSpeSymbol`

```java
java.lang.String getSpeSymbol()
```

- 无说明


### `getTempAttachments`

```java
java.util.List<java.util.Map<java.lang.String,java.lang.Object>> getTempAttachments(java.lang.String, java.lang.String, java.lang.String)
```

- 无说明


### `mark`

```java
void mark(java.lang.String, java.lang.String)
```

- 无说明


### `remove`

```java
void remove(java.lang.String, java.lang.Object, java.lang.Object)
```

- 无说明


### `remove`

```java
void remove(java.lang.String, java.lang.Object)
```

- 无说明


### `removeTemp`

```java
void removeTemp(java.lang.String, java.lang.String, java.lang.Object)
```

- 无说明


### `removeUrlVersion`

```java
java.lang.String removeUrlVersion(java.lang.String)
```

- 无说明


### `rename`

```java
void rename(java.lang.String, java.lang.String)
```

- 无说明


### `saveTempAttachments`

```java
DynamicObjectCollection saveTempAttachments(java.lang.String, java.lang.Object, java.lang.String, java.util.Map<java.lang.String,java.lang.Object>)
```

- 无说明


### `saveTempAttachments`

```java
DynamicObjectCollection saveTempAttachments(java.lang.String, java.lang.String, java.lang.Object)
```

- 无说明


### `saveTempAttachments`

```java
DynamicObject[] saveTempAttachments(java.lang.String, java.lang.Object)
```

- 无说明


### `saveTempToFileService`

```java
java.lang.String saveTempToFileService(java.lang.String, java.lang.String, java.lang.String, java.lang.Object, java.lang.String)
```

- 无说明


### `saveTempToFileService`

```java
java.lang.String saveTempToFileService(java.lang.String, java.lang.String, java.lang.String, java.lang.Object, java.lang.String, boolean)
```

- 无说明


### `saveTempToFileService`

```java
java.lang.String saveTempToFileService(java.lang.String, java.lang.String, java.lang.String, java.lang.Object, java.lang.String, boolean, boolean)
```

- 无说明


### `upload`

```java
void upload(java.lang.String, java.lang.Object, java.lang.String, java.util.List<java.util.Map<java.lang.String,java.lang.Object>>)
```

- 无说明


### `uploadTemp`

```java
void uploadTemp(java.lang.String, java.lang.String, java.lang.String, java.util.List<java.util.Map<java.lang.String,java.lang.Object>>)
```

- 无说明

