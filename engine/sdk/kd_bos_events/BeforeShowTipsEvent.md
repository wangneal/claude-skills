# BeforeShowTipsEvent

> 来源: https://dev.kingdee.com/sdk/Cosmic%20V5.0.011/index.html?nav=class&name=BeforeShowTipsEvent

SDK
模块
包
类
索引
树
插件
微服务
已过时
kd.bos.kddm > kd.bos.form.control.events
上一个   下一个


类 BeforeShowTipsEvent


java.util.EventObject
kd.bos.form.control.events.BeforeShowTipsEvent


所有已实现的接口:
java.io.Serializable
@SuppressWarnings(value="serial")
@SdkPublic
public class BeforeShowTipsEvent
extends java.util.EventObject


tips组件显示前事件参数

应用于Tips组件事件接口TipsListener#beforeShowTips(BeforeShowTipsEvent)上




方法概要
限定符和类型	方法和说明	编号
public	BeforeShowTipsEvent(Object source)
构造方法：初始化tips组件显示前事件参数	1
public String	getElementId()
获取载体ID	2
public String	getFormId()
获取表单ID	3
public FormShowParameter	getFormshowParameter()
获取表单界面显示参数	4
public java.util.Map<String, Object>	getParamsMap()
方法废弃，统一使用set/get formshowParameter方法	5
public String	getTriggerType()
获取触发类型	6
public boolean	isCancel()
是否取消弹出提示。默认不取消，插件可干预	7
public void	setCancel(boolean cancel)
设置是否取消提示	8
public void	setElementId(String elementId)
设置载体ID	9
public void	setFormId(String formId)
设置表单ID	10
public void	setFormshowParameter(FormShowParameter formshowParameter)
设置表单界面显示参数	11
public void	setParamsMap(java.util.Map<String, Object> paramsMap)
方法废弃，统一使用set/get formshowParameter方法	12
public void	setTriggerType(String triggerType)
设置触发类型	13


方法详细资料
BeforeShowTipsEvent
public BeforeShowTipsEvent(Object source)


构造方法：初始化tips组件显示前事件参数


@param source 事件源


getElementId
public String getElementId()


获取载体ID


@return 载体ID


getFormId
public String getFormId()


获取表单ID


@return 表单ID


getFormshowParameter
@KSMethod
public FormShowParameter getFormshowParameter()


获取表单界面显示参数


@return 表单界面显示参数


getParamsMap
public java.util.Map<String, Object> getParamsMap()


方法废弃，统一使用set/get formshowParameter方法


@return


getTriggerType
public String getTriggerType()


获取触发类型


@return 触发类型


isCancel
public boolean isCancel()


是否取消弹出提示。默认不取消，插件可干预


@return ：true ：取消提示 false:不取消


setCancel
public void setCancel(boolean cancel)


设置是否取消提示


@param cancel ： true ：取消提示 false:不取消


setElementId
public void setElementId(String elementId)


设置载体ID


@param elementId 载体ID


setFormId
public void setFormId(String formId)


设置表单ID


@param formId 表单ID


setFormshowParameter
public void setFormshowParameter(FormShowParameter formshowParameter)


设置表单界面显示参数


@param formshowParameter 表单界面显示参数


setParamsMap
@Deprecated
public void setParamsMap(java.util.Map<String, Object> paramsMap)


方法废弃，统一使用set/get formshowParameter方法


@return


setTriggerType
public void setTriggerType(String triggerType)


设置触发类型


@param triggerType


