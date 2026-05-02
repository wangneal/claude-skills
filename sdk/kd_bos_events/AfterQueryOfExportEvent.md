# AfterQueryOfExportEvent

> 来源: https://dev.kingdee.com/sdk/Cosmic%20V5.0.011/index.html?nav=class&name=AfterQueryOfExportEvent

SDK
模块
包
类
索引
树
插件
微服务
已过时
kd.bos.kddm > kd.bos.form.events
上一个   下一个


类 AfterQueryOfExportEvent


java.util.EventObject
kd.bos.form.events.AfterQueryOfExportEvent


所有已实现的接口:
java.io.Serializable
@SdkPublic
public class AfterQueryOfExportEvent
extends java.util.EventObject


查询引出数据后事件参数

应用于列表插件接口kd.bos.list.plugin.IListPlugin#afterQueryOfExport(AfterQueryOfExportEvent)上




方法概要
限定符和类型	方法和说明	编号
public	AfterQueryOfExportEvent(Object source)
构造方法：初始化查询引出数据后事件参数	1
public	AfterQueryOfExportEvent(Object source, DynamicObject[] queryValues)
构造方法：初始化查询引出数据后事件参数	2
public DynamicObject[]	getQueryValues()
获取查询条件	3
public boolean	isCustomOrder()
是否为默认排序规则	4
public void	setCustomOrder(boolean customOrder)
设置为默认排序规则	5
public void	setQueryValues(DynamicObject[] queryValues)
设置查询条件	6


方法详细资料
AfterQueryOfExportEvent
public AfterQueryOfExportEvent(Object source)


构造方法：初始化查询引出数据后事件参数


@param source 事件源


AfterQueryOfExportEvent
public AfterQueryOfExportEvent(Object source, DynamicObject[] queryValues)


构造方法：初始化查询引出数据后事件参数


@param source 事件源
@param queryValues 查询条件


getQueryValues
public DynamicObject[] getQueryValues()


获取查询条件


@return 查询条件


isCustomOrder
public boolean isCustomOrder()


是否为默认排序规则


@return 是否默认排序规则：false-不默认，true-默认


setCustomOrder
public void setCustomOrder(boolean customOrder)


设置为默认排序规则


@param customOrder 是否默认排序规则：false-不默认，true-默认


setQueryValues
public void setQueryValues(DynamicObject[] queryValues)


设置查询条件


@param queryValues 查询条件


