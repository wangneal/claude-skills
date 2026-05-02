# BeforeClickEvent

> 来源: https://dev.kingdee.com/sdk/Cosmic%20V5.0.011/index.html?nav=class&name=BeforeClickEvent

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


类 BeforeClickEvent


java.util.EventObject
kd.bos.form.control.events.ClickEvent
kd.bos.form.control.events.BeforeClickEvent


所有已实现的接口:
java.io.Serializable
@KSObject
@SdkPublic
public class BeforeClickEvent
extends ClickEvent


点击前事件参数

应用于点击事件接口ClickListener#beforeClick(BeforeClickEvent)上




方法概要
限定符和类型	方法和说明	编号
public	BeforeClickEvent(Object source)
构造方法：初始化点击前事件参数	1
public	BeforeClickEvent(Object source, java.util.Map<String, Object> paramsMap)
构造方法：初始化点击前事件参数	2
public boolean	isCancel()
是否取消该事件	3
public void	setCancel(boolean cancel)
设置是否取消该事件布尔值	4


方法详细资料
BeforeClickEvent
public BeforeClickEvent(Object source)


构造方法：初始化点击前事件参数


@param source 事件源


BeforeClickEvent
public BeforeClickEvent(Object source, java.util.Map<String, Object> paramsMap)


构造方法：初始化点击前事件参数


@param source 事件源
@param paramsMap 参数Map


isCancel
@KSMethod
public boolean isCancel()


是否取消该事件


@return 是否取消事件值：false-不取消，true-取消


setCancel
public void setCancel(boolean cancel)


设置是否取消该事件布尔值


@param cancel 是否取消事件：false-不取消，true-取消


