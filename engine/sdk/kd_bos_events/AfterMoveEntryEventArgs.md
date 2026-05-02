# AfterMoveEntryEventArgs

> 来源: https://dev.kingdee.com/sdk/Cosmic%20V5.0.011/index.html?nav=class&name=AfterMoveEntryEventArgs

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


类 AfterMoveEntryEventArgs


所有已实现的接口:
kd.bos.entity.plugin.manager.IConditionEvent
@KSObject
@ResolveKey(value="entryProp.name")
@SdkPublic
public class AfterMoveEntryEventArgs
implements kd.bos.entity.plugin.manager.IConditionEvent


移动行之后事件参数

表单运行时模型层插件接口IDataModelChangeListener#afterMoveEntryDown(AfterMoveEntryEventArgs)、IDataModelChangeListener#afterMoveEntryUp(AfterMoveEntryEventArgs)事件参数




方法概要
限定符和类型	方法和说明	编号
public	AfterMoveEntryEventArgs(EntryProp property, int[] rowIndexs, int rowCount)
构造函数	1
public EntryProp	getEntryProp()
返回分录属性对象	2
public int	getRowCount()
返回分录的总行数	3
public int[]	getRowIndexs()
返回移动前的行索引集合	4
public java.util.List<Integer>	getSteps()
返回本批分录行，各上移了多少行	5


方法详细资料
AfterMoveEntryEventArgs
public AfterMoveEntryEventArgs(EntryProp property, int[] rowIndexs, int rowCount)


构造函数


@param property 分录属性对象
@param rowIndexs 上移前，原始的行索引集合
@param rowCount 分录总行数


getEntryProp
@KSMethod
public EntryProp getEntryProp()


返回分录属性对象


@return 分录属性对象


getRowCount
@KSMethod
public int getRowCount()


返回分录的总行数


@return 分录总行数


getRowIndexs
@KSMethod
public int[] getRowIndexs()


返回移动前的行索引集合


@return 行索引集合


getSteps
public java.util.List<Integer> getSteps()


返回本批分录行，各上移了多少行

默认均上移1行，树形单据体可能会上移多行


@return 各分录行的上移行数


