# BeforeQueryOfExportEvent

> 来源: https://dev.kingdee.com/sdk/Cosmic%20V5.0.011/index.html?nav=class&name=BeforeQueryOfExportEvent

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


类 BeforeQueryOfExportEvent


java.util.EventObject
kd.bos.form.events.BeforeQueryOfExportEvent


所有已实现的接口:
java.io.Serializable
@SdkPublic
public class BeforeQueryOfExportEvent
extends java.util.EventObject


查询引出数据前事件参数

应用于列表插件接口kd.bos.list.plugin.IListPlugin#beforeQueryOfExport(BeforeQueryOfExportEvent)上




方法概要
限定符和类型	方法和说明	编号
public	BeforeQueryOfExportEvent(Object source)
构造方法：初始化查询引出数据前事件	1
public	BeforeQueryOfExportEvent(Object source, String selectFields, String orderBys, QFilter[] filters)
构造方法：初始化查询引出数据前事件	2
public QFilter[]	getFilters()
获取过滤字段	3
public String	getOrderBys()
获取排序规则	4
public String	getSelectFields()
获取选择的字段	5
public void	setFilters(QFilter[] filters)
设置过滤字段	6
public void	setOrderBys(String orderBys)
设置排序规则	7
public void	setSelectFields(String selectFields)
设置选择的字段	8


方法详细资料
BeforeQueryOfExportEvent
public BeforeQueryOfExportEvent(Object source)


构造方法：初始化查询引出数据前事件


@param source 事件源


BeforeQueryOfExportEvent
public BeforeQueryOfExportEvent(Object source, String selectFields, String orderBys, QFilter[] filters)


构造方法：初始化查询引出数据前事件


@param source 事件源
@param selectFields 选择的字段
@param orderBys 排序规则
@param filters 过滤字段


getFilters
public QFilter[] getFilters()


获取过滤字段


@return 过滤字段


getOrderBys
public String getOrderBys()


获取排序规则


@return 排序规则


getSelectFields
public String getSelectFields()


获取选择的字段


@return 选择的字段


setFilters
public void setFilters(QFilter[] filters)


设置过滤字段


@param filters 过滤字段


setOrderBys
public void setOrderBys(String orderBys)


设置排序规则


@param orderBys 排序规则


setSelectFields
public void setSelectFields(String selectFields)


设置选择的字段


@param selectFields 选择的字段


