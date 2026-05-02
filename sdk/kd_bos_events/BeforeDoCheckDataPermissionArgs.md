# BeforeDoCheckDataPermissionArgs

> 来源: https://dev.kingdee.com/sdk/Cosmic%20V5.0.011/index.html?nav=class&name=BeforeDoCheckDataPermissionArgs

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


类 BeforeDoCheckDataPermissionArgs


java.util.EventObject
kd.bos.form.events.BeforeDoCheckDataPermissionArgs


所有已实现的接口:
java.io.Serializable
@KSObject
@SdkPublic
public class BeforeDoCheckDataPermissionArgs
extends java.util.EventObject


操作检查数据权限前事件参数

应用于表单界面插件基本接口kd.bos.form.plugin.IFormPlugin#beforeCheckDataPermission(BeforeDoCheckDataPermissionArgs)上




方法概要
限定符和类型	方法和说明	编号
public	BeforeDoCheckDataPermissionArgs(kd.bos.form.operate.FormOperate source)
构造方法：初始化操作检查数据权限前事件参数	1
public String	getCancelMessage()
获取取消事件的原因	2
public ListSelectedRowCollection	getListSelectedData()
获取列表选择行，多行；允许插件对选择行进行排序，以免在分批操作时，需要优先处理的数据被排在后面处理，影响操作执行结果	3
public String	getPermissionItemId()
获取数据权限验证项ID	4
public Object	getPkId()
获取主键ID	5
public ListSelectedRowCollection	getSelectData()
获取列表选择行数据集合	6
public Object	getSource()
获取事件源	7
public boolean	isCancel()
是否取消该事件判断	8
public boolean	isSkipCheckDataPermission()
是否跳过数据权限验证	9
public void	setCancel(boolean cancel)
设置是否取消该事件	10
public void	setCancelMessage(String cancelMessage)
设置取消事件的原因	11
public void	setListSelectedData(ListSelectedRowCollection listSelectedData)
设置列表选择行	12
public void	setPermissionItemId(String permissionItemId)
设置数据权限验证项ID	13
public void	setPkId(Object pkId)
设置主键ID	14
public void	setSkipCheckDataPermission(boolean skipCheckDataPermission)
设置是否跳过数据权限验证	15


方法详细资料
BeforeDoCheckDataPermissionArgs
public BeforeDoCheckDataPermissionArgs(kd.bos.form.operate.FormOperate source)


构造方法：初始化操作检查数据权限前事件参数


@param source 事件源


getCancelMessage
public String getCancelMessage()


获取取消事件的原因


@return 取消事件的原因


getListSelectedData
public ListSelectedRowCollection getListSelectedData()


获取列表选择行，多行；允许插件对选择行进行排序，以免在分批操作时，需要优先处理的数据被排在后面处理，影响操作执行结果


@return 列表选择行


getPermissionItemId
public String getPermissionItemId()


获取数据权限验证项ID


@return 数据权限验证项ID


getPkId
public Object getPkId()


获取主键ID


@return 主键ID


getSelectData
public ListSelectedRowCollection getSelectData()


获取列表选择行数据集合


@return 列表选择行数据集合


getSource
@Override
@KSMethod
public Object getSource()


获取事件源


@return 事件源


isCancel
public boolean isCancel()


是否取消该事件判断


@return 是否取消：false-不取消，true-取消


isSkipCheckDataPermission
public boolean isSkipCheckDataPermission()


是否跳过数据权限验证


@return 是否跳过


setCancel
@KSMethod
public void setCancel(boolean cancel)


设置是否取消该事件


@param cancel 是否取消：false-不取消，true-取消


setCancelMessage
@KSMethod
public void setCancelMessage(String cancelMessage)


设置取消事件的原因


@param cancelMessage 取消事件的原因


setListSelectedData
public void setListSelectedData(ListSelectedRowCollection listSelectedData)


设置列表选择行


@param listSelectedData 列表选择行


setPermissionItemId
public void setPermissionItemId(String permissionItemId)


设置数据权限验证项ID


@param permissionItemId 数据权限验证项ID


setPkId
public void setPkId(Object pkId)


设置主键ID


@param pkId 主键ID


setSkipCheckDataPermission
public void setSkipCheckDataPermission(boolean skipCheckDataPermission)


设置是否跳过数据权限验证


@param skipCheckDataPermission 是否跳过


