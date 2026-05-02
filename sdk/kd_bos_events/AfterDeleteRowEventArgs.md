# AfterDeleteRowEventArgs

> 来源: https://dev.kingdee.com/sdk/Cosmic%20V5.0.011/index.html?nav=class&name=AfterDeleteRowEventArgs

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


类 AfterDeleteRowEventArgs


所有已实现的接口:
kd.bos.entity.plugin.manager.IConditionEvent
@KSObject
@ResolveKey(value="entryProp.name")
@SdkPublic
public class AfterDeleteRowEventArgs
implements kd.bos.entity.plugin.manager.IConditionEvent


删除行之后事件参数

表单运行时模型层插件接口IDataModelChangeListener#afterDeleteRow(AfterDeleteRowEventArgs) 事件参数




方法概要
限定符和类型	方法和说明	编号
public	AfterDeleteRowEventArgs(EntryProp property, int[] rowIndexs)
构造函数	1
public EntryProp	getEntryProp()
获取分录属性对象	2
public int[]	getRowIndexs()
获取被删的分录行索引集合	3


方法详细资料
AfterDeleteRowEventArgs
public AfterDeleteRowEventArgs(EntryProp property, int[] rowIndexs)


构造函数


@param property 分录属性对象
@param rowIndexs 删除的分录行索引集合


getEntryProp
@KSMethod
public EntryProp getEntryProp()


获取分录属性对象


@return 分录属性对象


getRowIndexs
@KSMethod
public int[] getRowIndexs()


获取被删的分录行索引集合


@return 分录行索引集合


