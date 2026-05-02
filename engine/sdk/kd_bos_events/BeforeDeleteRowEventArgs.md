# BeforeDeleteRowEventArgs

> 来源: https://dev.kingdee.com/sdk/Cosmic%20V5.0.011/index.html?nav=class&name=BeforeDeleteRowEventArgs

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


类 BeforeDeleteRowEventArgs


所有已实现的接口:
kd.bos.entity.plugin.manager.IConditionEvent
@KSObject
@ResolveKey(value="entryProp.name")
@SdkPublic
public class BeforeDeleteRowEventArgs
implements kd.bos.entity.plugin.manager.IConditionEvent


删除分录行之前事件参数

表单运行时模型层插件接口IDataModelChangeListener#beforeDeleteRow(BeforeDeleteRowEventArgs)事件参数




方法概要
限定符和类型	方法和说明	编号
public	BeforeDeleteRowEventArgs(EntryProp entryProp, int rowIndex)
构造函数	1
public	BeforeDeleteRowEventArgs(EntryProp entryProp, int[] rowIndexs)
构造函数	2
public EntryProp	getEntryProp()
返回分录属性对象	3
public int[]	getRowIndexs()
返回被删的分录行索引集合	4
public java.util.Map<String, Object>	getVarMap()
返回表达式运算依赖的变量值	5
public void	setCancel(boolean cancel)
设置是否取消删除行	6


方法详细资料
BeforeDeleteRowEventArgs
public BeforeDeleteRowEventArgs(EntryProp entryProp, int rowIndex)


构造函数


@param entryProp 分录属性对象
@param rowIndex 分录行


BeforeDeleteRowEventArgs
public BeforeDeleteRowEventArgs(EntryProp entryProp, int[] rowIndexs)


构造函数


@param entryProp 分录属性对象
@param rowIndexs 分录行集合


getEntryProp
@KSMethod
public EntryProp getEntryProp()


返回分录属性对象


@return 分录属性对象


getRowIndexs
@KSMethod
public int[] getRowIndexs()


返回被删的分录行索引集合


@return 分录行索引集合，行索引从0开始


getVarMap
@Override
public java.util.Map<String, Object> getVarMap()


返回表达式运算依赖的变量值

调用 this.check(paramCondition) 方法执行表达式运算时，需依赖本方法返回的变量值




setCancel
@KSMethod
public void setCancel(boolean cancel)


设置是否取消删除行


@param cancel 是否取消删除行


