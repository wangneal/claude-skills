# BeforeQuickAddNewEvent

> 来源: https://dev.kingdee.com/sdk/Cosmic%20V5.0.011/index.html?nav=class&name=BeforeQuickAddNewEvent

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


类 BeforeQuickAddNewEvent


java.util.EventObject
kd.bos.form.field.events.BeforeQuickAddNewEvent


所有已实现的接口:
java.io.Serializable
@SdkPublic
public class BeforeQuickAddNewEvent
extends java.util.EventObject


快捷新增前事件参数

应用于快捷新增前事件接口BeforeQuickAddNewListener#beforeQuickAddNew(BeforeQuickAddNewEvent)上




方法概要
限定符和类型	方法和说明	编号
public	BeforeQuickAddNewEvent(Object source)
构造方法：初始化快捷新增前事件参数	1
public	BeforeQuickAddNewEvent(Object source, BaseShowParameter baseShowParameter)
构造方法：初始化快捷新增前事件参数	2
public FormShowParameter	getShowParameter()
获取基础资料界面显示参数	3
public boolean	isCancel()
是否取消该事件	4
public void	setCancel(boolean cancel)
设置是否取消该事件值	5
public void	setShowParameter(FormShowParameter showParameter)
设置基础资料界面显示参数	6


方法详细资料
BeforeQuickAddNewEvent
public BeforeQuickAddNewEvent(Object source)


构造方法：初始化快捷新增前事件参数


@param source 事件源


BeforeQuickAddNewEvent
public BeforeQuickAddNewEvent(Object source, BaseShowParameter baseShowParameter)


构造方法：初始化快捷新增前事件参数


@param source 事件源
@param baseShowParameter 基础资料界面显示参数


getShowParameter
public FormShowParameter getShowParameter()


获取基础资料界面显示参数


@return 基础资料界面显示参数


isCancel
public boolean isCancel()


是否取消该事件


@return 是否取消：false-不取消，true-取消


setCancel
public void setCancel(boolean cancel)


设置是否取消该事件值


@param cancel 是否取消：false-不取消，true-取消


setShowParameter
public void setShowParameter(FormShowParameter showParameter)


设置基础资料界面显示参数


@param showParameter 基础资料界面显示参数


