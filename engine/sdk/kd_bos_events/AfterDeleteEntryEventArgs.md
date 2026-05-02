# AfterDeleteEntryEventArgs

> 来源: https://dev.kingdee.com/sdk/Cosmic%20V5.0.011/index.html?nav=class&name=AfterDeleteEntryEventArgs

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


类 AfterDeleteEntryEventArgs


所有已实现的接口:
kd.bos.entity.plugin.manager.IConditionEvent
@KSObject
@ResolveKey(value="entryProp.name")
@SdkPublic
public class AfterDeleteEntryEventArgs
implements kd.bos.entity.plugin.manager.IConditionEvent


删除分录后事件参数

表单运行时模型层插件接口IDataModelChangeListener#afterDeleteEntry(AfterDeleteEntryEventArgs)事件参数




方法概要
限定符和类型	方法和说明	编号
public	AfterDeleteEntryEventArgs(EntryProp prop)
构造函数	1
public EntryProp	getEntryProp()
返回分录属性对象	2


方法详细资料
AfterDeleteEntryEventArgs
public AfterDeleteEntryEventArgs(EntryProp prop)


构造函数


@param prop 分录属性对象


getEntryProp
@KSMethod
public EntryProp getEntryProp()


返回分录属性对象


@return 分录属性对象


