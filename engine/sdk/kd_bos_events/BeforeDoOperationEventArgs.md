# BeforeDoOperationEventArgs

> 来源: https://dev.kingdee.com/sdk/Cosmic%20V5.0.011/index.html?nav=class&name=BeforeDoOperationEventArgs

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


类 BeforeDoOperationEventArgs


java.util.EventObject
kd.bos.form.events.BeforeDoOperationEventArgs


所有已实现的接口:
java.io.Serializable
@SuppressWarnings(value="squid:ClassVariableVisibilityCheck")
@KSObject
@ResolveKey
@SdkPublic
public class BeforeDoOperationEventArgs
extends java.util.EventObject


操作之前事件参数

应用于表单界面插件基本接口kd.bos.form.plugin.IFormPlugin#beforeDoOperation(BeforeDoOperationEventArgs)上




字段概要
限定符和类型	字段和说明	编号
public boolean	cancel
是否取消该事件	1


字段详细资料
cancel
public boolean cancel


是否取消该事件





方法概要
限定符和类型	方法和说明	编号
public	BeforeDoOperationEventArgs(Object source)
构造方法：初始化操作之前事件参数	1
public String	getCancelMessage()
获取取消事件的原因	2
public ListSelectedRowCollection	getListSelectedData()
获取列表选择行，多行；允许插件对选择行进行排序，以免在分批操作时，需要优先处理的数据被排在后面处理，影响操作执行结果	3
public Object	getSource()
获取事件源	4
public boolean	isCancel()
是否取消该事件	5
public void	setCancel(boolean cancel)
设置是否取消该事件布尔值	6
public void	setCancelMessage(String cancelMessage)
设置取消事件的原因	7
public void	setListSelectedData(ListSelectedRowCollection listSelectedData)
设置列表选择行数据集合	8


方法详细资料
BeforeDoOperationEventArgs
public BeforeDoOperationEventArgs(Object source)


构造方法：初始化操作之前事件参数


@param source 事件源


getCancelMessage
public String getCancelMessage()


获取取消事件的原因


@return 取消事件的原因


getListSelectedData
public ListSelectedRowCollection getListSelectedData()


获取列表选择行，多行；允许插件对选择行进行排序，以免在分批操作时，需要优先处理的数据被排在后面处理，影响操作执行结果


@return 列表选择行


getSource
@Override
@KSMethod
public Object getSource()


获取事件源


@return 事件源


isCancel
public boolean isCancel()


是否取消该事件


@return 是否取消：false-不取消，true-取消


setCancel
@KSMethod
public void setCancel(boolean cancel)


设置是否取消该事件布尔值


@param cancel 是否取消：false-不取消，true-取消


setCancelMessage
@KSMethod
public void setCancelMessage(String cancelMessage)


设置取消事件的原因


@param cancelMessage 取消事件的原因


setListSelectedData
public void setListSelectedData(ListSelectedRowCollection listSelectedData)


设置列表选择行数据集合


@param listSelectedData 列表选择行


