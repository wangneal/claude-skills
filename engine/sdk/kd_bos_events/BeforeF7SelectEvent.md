# BeforeF7SelectEvent

> 来源: https://dev.kingdee.com/sdk/Cosmic%20V5.0.011/index.html?nav=class&name=BeforeF7SelectEvent

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


类 BeforeF7SelectEvent


java.util.EventObject
kd.bos.form.field.events.BeforeF7SelectEvent


所有已实现的接口:
java.io.Serializable
@KSObject
@SdkPublic
public class BeforeF7SelectEvent
extends java.util.EventObject


选择基础资料前（弹出过滤窗口前）事件参数

应用于选择基础资料前（弹出过滤窗口前）事件接口BeforeF7SelectListener#beforeF7Select(BeforeF7SelectEvent)上




方法概要
限定符和类型	方法和说明	编号
public	BeforeF7SelectEvent(FieldEdit source, int row, Object originalValue)
构造方法：初始化选择基础资料前（弹出过滤窗口前）事件参数	1
public	BeforeF7SelectEvent(FieldEdit source, int row, Object originalValue, String sourceMethod)
构造方法：初始化选择基础资料前（弹出过滤窗口前）事件参数	2
public void	addCustomQFilter(QFilter customQFilter)
添加插件设置的过滤条件	3
public java.util.List<QFilter>	getCustomQFilters()
获取插件设置的过滤条件	4
public FormShowParameter	getFormShowParameter()
获取前端表单打开参数	5
public Object	getOriginalValue()
获取源值	6
public IDataEntityProperty	getProperty()
获取字段属性对象	7
public int	getRow()
获取行号	8
public Object	getSource()
获取事件源	9
public String	getSourceMethod()
获取来源方法(click、setItemByNumber、getLookUpList、setItemByIdFromClient、f7combolist)	10
public boolean	isCancel()
是否取消该事件	11
public void	setCancel(boolean cancel)
设置是否取消该事件布尔值	12
public void	setCustomQFilters(java.util.List<QFilter> customQFilters)
设置插件设置的过滤条件(多个)	13
public void	setFormShowParameter(FormShowParameter param)
设置前端表单打开参数	14


方法详细资料
BeforeF7SelectEvent
public BeforeF7SelectEvent(FieldEdit source, int row, Object originalValue)


构造方法：初始化选择基础资料前（弹出过滤窗口前）事件参数


@param source 事件源
@param row 行号
@param originalValue 源值


BeforeF7SelectEvent
public BeforeF7SelectEvent(FieldEdit source, int row, Object originalValue, String sourceMethod)


构造方法：初始化选择基础资料前（弹出过滤窗口前）事件参数


@param source 事件源
@param row 行号
@param originalValue 源值
@param sourceMethod 来源方法(click、setItemByNumber、getLookUpList、setItemByIdFromClient、f7combolist)


addCustomQFilter
@KSMethod
public void addCustomQFilter(QFilter customQFilter)


添加插件设置的过滤条件


@param customQFilter 插件设置的过滤条件


getCustomQFilters
@KSMethod
public java.util.List<QFilter> getCustomQFilters()


获取插件设置的过滤条件


@return 插件设置的过滤条件


getFormShowParameter
@KSMethod
public FormShowParameter getFormShowParameter()


获取前端表单打开参数


@return 前端表单打开参数


getOriginalValue
@KSMethod
public Object getOriginalValue()


获取源值


@return 源值


getProperty
public IDataEntityProperty getProperty()


获取字段属性对象


@return 字段属性对象


getRow
@KSMethod
public int getRow()


获取行号


@return 行号


getSource
@KSMethod
public Object getSource()


获取事件源


@return 事件源


getSourceMethod
public String getSourceMethod()


获取来源方法(click、setItemByNumber、getLookUpList、setItemByIdFromClient、f7combolist)


@return 来源方法


isCancel
@KSMethod
public boolean isCancel()


是否取消该事件


@return 是否取消事件值：false-不取消，true-取消


setCancel
@KSMethod
public void setCancel(boolean cancel)


设置是否取消该事件布尔值


@param cancel 是否取消事件：false-不取消，true-取消


setCustomQFilters
@KSMethod
public void setCustomQFilters(java.util.List<QFilter> customQFilters)


设置插件设置的过滤条件(多个)


@param customQFilters 插件设置的过滤条件


setFormShowParameter
public void setFormShowParameter(FormShowParameter param)


设置前端表单打开参数


@return 前端表单打开参数


