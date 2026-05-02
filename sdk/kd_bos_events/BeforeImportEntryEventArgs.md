# BeforeImportEntryEventArgs

> 来源: https://dev.kingdee.com/sdk/Cosmic%20V5.0.011/index.html?nav=class&name=BeforeImportEntryEventArgs

SDK
模块
包
类
索引
树
插件
微服务
已过时
kd.bos.kddm > kd.bos.entity.datamodel.events
上一个   下一个


类 BeforeImportEntryEventArgs


java.util.EventObject
kd.bos.entity.datamodel.events.BeforeImportEntryEventArgs


所有已实现的接口:
java.io.Serializable
@SdkPublic
public class BeforeImportEntryEventArgs
extends java.util.EventObject


单据体引入前事件



表单运行时模型层插件事件接口IDataModelListener#beforeImportEntry(BeforeImportEntryEventArgs)事件参数





方法概要
限定符和类型	方法和说明	编号
public	BeforeImportEntryEventArgs(Object source, java.util.Map<String, java.util.List<Object>> entryDataMap)	1
public java.util.Map<String, java.util.List<Object>>	getEntryDataMap()	2


方法详细资料
BeforeImportEntryEventArgs
public BeforeImportEntryEventArgs(Object source, java.util.Map<String, java.util.List<Object>> entryDataMap)




getEntryDataMap
public java.util.Map<String, java.util.List<Object>> getEntryDataMap()




