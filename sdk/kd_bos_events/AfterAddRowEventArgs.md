# AfterAddRowEventArgs

> 来源: https://dev.kingdee.com/sdk/Cosmic%20V5.0.011/index.html?nav=class&name=AfterAddRowEventArgs

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


类 AfterAddRowEventArgs


所有已实现的接口:
kd.bos.entity.plugin.manager.IConditionEvent
@KSObject
@ResolveKey(value="entryProp.name")
@SdkPublic
public class AfterAddRowEventArgs
implements kd.bos.entity.plugin.manager.IConditionEvent


添加行后事件参数

表单运行时模型层插件接口IDataModelChangeListener#afterAddRow(AfterAddRowEventArgs)事件参数




方法概要
限定符和类型	方法和说明	编号
public	AfterAddRowEventArgs(EntryProp entryProp, RowDataEntity[] rowDataEntities)
构造函数	1
public	AfterAddRowEventArgs(EntryProp entryProp, RowDataEntity[] rowDataEntities, int insertRow)
构造函数	2
public EntryProp	getEntryProp()
获取分录属性对象	3
public int	getInsertRow()
获取插入行索引	4
public RowDataEntity[]	getRowDataEntities()
获取新添加的分录行数据集合	5


方法详细资料
AfterAddRowEventArgs
public AfterAddRowEventArgs(EntryProp entryProp, RowDataEntity[] rowDataEntities)


构造函数


@param entryProp 分录属性对象
@param rowDataEntities 分录行数据集合


AfterAddRowEventArgs
public AfterAddRowEventArgs(EntryProp entryProp, RowDataEntity[] rowDataEntities, int insertRow)


构造函数


@param entryProp 分录属性对象
@param rowDataEntities 分录行数据集合
@param insertRow 插入行索引


getEntryProp
@KSMethod
public EntryProp getEntryProp()


获取分录属性对象


@return 分录属性对象


getInsertRow
@KSMethod
public int getInsertRow()


获取插入行索引


@return 插入行索引


getRowDataEntities
@KSMethod
public RowDataEntity[] getRowDataEntities()


获取新添加的分录行数据集合


@return 分录行数据集合


