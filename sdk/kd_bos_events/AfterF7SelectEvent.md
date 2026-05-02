# AfterF7SelectEvent

> 来源: https://dev.kingdee.com/sdk/Cosmic%20V5.0.011/index.html?nav=class&name=AfterF7SelectEvent

SDK
模块
包
类
索引
树
插件
微服务
已过时
kd.bos.kddm > kd.bos.form.field.events
上一个   下一个


类 AfterF7SelectEvent


java.util.EventObject
kd.bos.form.field.events.AfterF7SelectEvent


所有已实现的接口:
java.io.Serializable
@KSObject
@SdkPublic
public class AfterF7SelectEvent
extends java.util.EventObject


F7选择后事件参数

应用于F7选择后事件接口AfterF7SelectListener#afterF7Select(AfterF7SelectEvent)上




方法概要
限定符和类型	方法和说明	编号
public	AfterF7SelectEvent(Object source, String actionId, int currentRowIndex)
构造方法：初始化F7选择后事件	1
public String	getActionId()
获取回调标识：由发起者自定义，以便和其他回调来源进行区分	2
public int	getCurrentRowIndex()
获取当前行号。表头返回0	3
public String	getInputText()
当编码列表不为空时，获取编码值列表第一条数据	4
public java.util.List<String>	getInputTexts()
获取编码列表	5
public Object	getInputValue()
当字段值列表不为空时，获取字段值列表第一条数据	6
public java.util.List<Object>	getInputValues()
获取字段值列表	7
public ListSelectedRow	getListSelectedRow()
获取选中行列表第一条记录	8
public ListSelectedRowCollection	getListSelectedRowCollection()
获取选中行列表集合	9
public IFormView	getView()
获取表单视图	10
public void	setInputTexts(java.util.List<String> inputTexts)
设置编码列表	11
public void	setInputValues(java.util.List<Object> inputValues)
设置字段值列表	12
public void	setListSelectedRowCollection(ListSelectedRowCollection listSelectedRowCollection)
设置选中行列表集合	13
public void	setView(IFormView view)
设置表单视图	14


方法详细资料
AfterF7SelectEvent
public AfterF7SelectEvent(Object source, String actionId, int currentRowIndex)


构造方法：初始化F7选择后事件


@param source 事件源
@param actionId 回调标识：由发起者自定义，以便和其他回调来源进行区分
@param currentRowIndex 当前行号。表头返回0


getActionId
@KSMethod
public String getActionId()


获取回调标识：由发起者自定义，以便和其他回调来源进行区分


@return 回调标识


getCurrentRowIndex
@KSMethod
public int getCurrentRowIndex()


获取当前行号。表头返回0


@return 行号


getInputText
@KSMethod
public String getInputText()


当编码列表不为空时，获取编码值列表第一条数据


@return 编码值列表第一条数据


getInputTexts
@KSMethod
public java.util.List<String> getInputTexts()


获取编码列表


@return 编码列表


getInputValue
@KSMethod
public Object getInputValue()


当字段值列表不为空时，获取字段值列表第一条数据


@return 字段值列表第一条数据


getInputValues
@KSMethod
public java.util.List<Object> getInputValues()


获取字段值列表


@return 字段值列表


getListSelectedRow
@KSMethod
public ListSelectedRow getListSelectedRow()


获取选中行列表第一条记录


@return 选中行列表第一条记录


getListSelectedRowCollection
@KSMethod
public ListSelectedRowCollection getListSelectedRowCollection()


获取选中行列表集合


@return 选中行列表集合


getView
public IFormView getView()


获取表单视图


@return 表单视图


setInputTexts
public void setInputTexts(java.util.List<String> inputTexts)


设置编码列表


@param inputTexts 编码列表


setInputValues
public void setInputValues(java.util.List<Object> inputValues)


设置字段值列表


@param inputValues 字段值列表


setListSelectedRowCollection
public void setListSelectedRowCollection(ListSelectedRowCollection listSelectedRowCollection)


设置选中行列表集合


@param listSelectedRowCollection 选中行列表集合


setView
public void setView(IFormView view)


设置表单视图


@param view 表单视图


