# BeforeDeleteEntryEventArgs

> 来源: https://dev.kingdee.com/sdk/Cosmic%20V5.0.011/index.html?nav=class&name=BeforeDeleteEntryEventArgs

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


类 BeforeDeleteEntryEventArgs


所有已实现的接口:
kd.bos.entity.plugin.manager.IConditionEvent
@KSObject
@ResolveKey(value="entryProp.name")
@SdkPublic
public class BeforeDeleteEntryEventArgs
implements kd.bos.entity.plugin.manager.IConditionEvent


清空分录数据前事件参数

表单运行时模型层插件接口IDataModelChangeListener#beforeDeleteEntry(BeforeDeleteEntryEventArgs)事件参数




方法概要
限定符和类型	方法和说明	编号
public	BeforeDeleteEntryEventArgs(EntryProp entryProp)
构造函数	1
public EntryProp	getEntryProp()
返回分录属性对象	2
public void	setCancel(boolean cancel)
取消清空单据体	3


方法详细资料
BeforeDeleteEntryEventArgs
public BeforeDeleteEntryEventArgs(EntryProp entryProp)


构造函数


@param entryProp 分录属性对象


getEntryProp
@KSMethod
public EntryProp getEntryProp()


返回分录属性对象


@return 分录属性对象


setCancel
@KSMethod
public void setCancel(boolean cancel)


取消清空单据体


@param cancel 传入true取消清空行为


