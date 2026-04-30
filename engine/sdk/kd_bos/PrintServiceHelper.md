# PrintServiceHelper


**包路径**: kd.bos.servicehelper

**类型**: CLASS

**父类**: 无

**说明**: 打印服务帮助类


```java
public class PrintServiceHelper
```


## 方法 (36 个)


### `copyPrintMetadata`

```java
java.util.Map<java.lang.String,java.lang.Object> copyPrintMetadata(java.lang.String, java.lang.String, java.lang.String, java.lang.String, LocaleString)
```

复制打印模板


### `createCrossPdf`

```java
byte[] createCrossPdf(java.util.List<kd.bos.print.PrintJob>)
```

当前方法废弃，请使用doPrint


### `createPdfBytes`

```java
byte[] createPdfBytes(java.lang.String, java.lang.String, java.lang.String, java.lang.Object, java.util.Map<java.lang.String,java.util.List<java.lang.String>>)
```

当前方法废弃，请使用doPrint


### `createPdfUrl`

```java
java.lang.String createPdfUrl(java.lang.String, java.lang.String, java.lang.String)
```

当前方法废弃，请使用doPrint


### `createPdfUrl`

```java
java.lang.String createPdfUrl(java.lang.String, java.lang.String, java.lang.String, java.lang.Object)
```

当前方法废弃，请使用doPrint


### `createPdfUrl`

```java
java.lang.String createPdfUrl(java.lang.String, java.lang.String, java.lang.String, java.lang.Object, IPrintDataProvider)
```

当前方法废弃，请使用doPrint


### `createPdfUrl`

```java
java.lang.String createPdfUrl(java.lang.String, java.lang.String, java.lang.String, java.lang.Object[])
```

当前方法废弃，请使用doPrint


### `createPdfUrl`

```java
java.lang.String createPdfUrl(java.lang.String, java.lang.String, java.lang.String, java.lang.Object[], IPrintDataProvider)
```

当前方法废弃，请使用doPrint


### `createPdfUrl`

```java
java.lang.String createPdfUrl(java.lang.String, java.lang.String, java.util.Map<java.lang.Object,java.lang.String>)
```

当前方法废弃，请使用doPrint


### `createPdfUrl`

```java
java.lang.String createPdfUrl(LocaleString, java.util.List<kd.bos.print.PrintJob>)
```

当前方法废弃，请使用doPrint


### `createPdfUrl`

```java
java.lang.String createPdfUrl(java.util.List<kd.bos.print.PrintJob>)
```

当前方法废弃，请使用doPrint


### `createPrintCommand`

```java
java.lang.String createPrintCommand(java.lang.String, java.lang.Object, java.lang.Object)
```

创建打印指令 还没支持


### `createPrintJob`

```java
boolean createPrintJob(java.lang.String, java.lang.String, java.lang.String, java.lang.Object)
```

当前方法废弃，请使用doPrint


### `createPrintJob`

```java
boolean createPrintJob(java.lang.String, java.lang.String, java.lang.String, java.lang.Object, java.lang.Object)
```

当前方法废弃，请使用doPrint


### `createPrintJob`

```java
boolean createPrintJob(java.lang.String, java.lang.String, java.lang.String, java.lang.Object, java.lang.Object, IPrintDataProvider)
```

创建打印任务


### `createPrintJob`

```java
boolean createPrintJob(java.lang.String, java.lang.String, java.lang.String, java.lang.Object, java.lang.Object[])
```

创建打印任务


### `createPrintJob`

```java
boolean createPrintJob(java.util.List<kd.bos.print.PrintJob>)
```

生成打印任务


### `createPrintJob`

```java
boolean createPrintJob(LocaleString, java.util.List<kd.bos.print.PrintJob>)
```

生成打印任务


### `createSamplePdfUrl`

```java
java.lang.String createSamplePdfUrl(java.lang.String, java.lang.String, java.lang.String)
```

生成PDF 根据单据的第一条数据示例


### `createScriptPrintJob`

```java
boolean createScriptPrintJob(java.lang.String, java.lang.Object, java.lang.String, java.lang.String)
```

创建一个包含打印指令的打印任务


### `createScriptPrintJob`

```java
boolean createScriptPrintJob(java.lang.String, java.lang.Object, java.lang.Object)
```

创建一个包含打印指令的打印任务(自动匹配打印机)


### `createScriptPrintJob`

```java
boolean createScriptPrintJob(java.lang.String, java.lang.Object, java.lang.Object, java.lang.String, java.lang.Boolean)
```

创建打印任务


### `createScriptPrintJob`

```java
boolean createScriptPrintJob(java.lang.String, java.lang.Object, java.lang.Object, java.lang.String, java.lang.Boolean, java.lang.Boolean)
```

创建打印任务


### `createScriptPrintJob`

```java
boolean createScriptPrintJob(java.lang.String, java.lang.Object, java.lang.String, java.lang.String, java.lang.String, java.lang.Boolean)
```

创建一个包含打印指令的打印任务


### `createScriptPrintJob`

```java
boolean createScriptPrintJob(java.lang.String, java.lang.Object, java.lang.String, java.lang.String, java.lang.String, java.lang.Boolean, java.lang.Boolean)
```

创建一个包含打印指令的打印任务


### `createScriptPrintJob`

```java
boolean createScriptPrintJob(java.lang.String, java.lang.Object, java.lang.Object, java.util.Map<java.lang.String,java.lang.String>)
```

- 无说明


### `createSinglePdf`

```java
byte[] createSinglePdf(java.lang.String, java.lang.String, java.lang.String, java.lang.Object)
```

当前方法废弃，请使用doPrint


### `createXlsUrl`

```java
java.lang.String createXlsUrl(java.util.List<kd.bos.print.PrintJob>)
```

生成Excel 并返回下载路径
 当前方法废弃，请使用doPrin


### `createXlsUrl`

```java
java.lang.String createXlsUrl(java.util.List<kd.bos.print.PrintJob>, java.util.Map<java.lang.String,java.lang.Object>)
```

改造为微服务调用
 生成Excel 并返回下载路径


### `doPrint`

```java
java.lang.String doPrint(java.lang.String, java.lang.String, java.util.List<kd.bos.print.PrintJob>)
```

打印执行入口


### `doPrint`

```java
java.lang.String doPrint(java.lang.String, java.lang.String, java.util.List<kd.bos.print.PrintJob>, java.util.Map<java.lang.String,java.lang.Object>)
```

- 无说明


### `execPrint`

```java
java.lang.String execPrint(java.lang.String, java.lang.String, java.util.List<kd.bos.print.PrintJob>, java.util.Map<java.lang.String,java.lang.Object>)
```

获取文件流，请使用 BosPrintServiceHelper.getInputStream 方法


### `getPrinter`

```java
java.util.Map<java.lang.String,java.lang.String> getPrinter(java.lang.String)
```

还没支持


### `getRealBillFormId`

```java
java.lang.String getRealBillFormId(java.lang.String)
```

获取真实的formId，如通过布局，扩展界面，继承界面获取原单formId


### `mergeMultiPdf`

```java
byte[] mergeMultiPdf(java.util.List<byte[]>)
```

合并PDF


### `readPrintSetting`

```java
java.util.Map<java.lang.Object,java.util.List<java.lang.Object>> readPrintSetting(java.lang.String, java.lang.String, java.util.List<java.lang.Object>)
```

读取打印设置

