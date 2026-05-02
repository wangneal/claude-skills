# BeforeShowBillFormEvent

> 来源: https://dev.kingdee.com/sdk/Cosmic%20V5.0.011/index.html?nav=class&name=BeforeShowBillFormEvent

SDK
模块
包
类
索引
树
插件
微服务
已过时
kd.bos.kddm > kd.bos.list.events
上一个   下一个


类 BeforeShowBillFormEvent


java.util.EventObject
kd.bos.list.events.BeforeShowBillFormEvent


所有已实现的接口:
java.io.Serializable
@SdkPublic
public class BeforeShowBillFormEvent
extends java.util.EventObject


操作弹窗前事件




方法概要
限定符和类型	方法和说明	编号
public	BeforeShowBillFormEvent(Object source, BillShowParameter parameter)
构造函数	1
public BillShowParameter	getParameter()
获取单据打开参数	2
public boolean	isCancel()
返回是否取消	3
public void	setCancel(boolean cancel)
设置是否取消	4


方法详细资料
BeforeShowBillFormEvent
public BeforeShowBillFormEvent(Object source, BillShowParameter parameter)


构造函数


@param source 事件源
@param parameter 获取单据打开参数


getParameter
public BillShowParameter getParameter()


获取单据打开参数


@return 单据打开参数


isCancel
public boolean isCancel()


返回是否取消


@return 是否取消


setCancel
public void setCancel(boolean cancel)


设置是否取消


@param cancel 是否取消


