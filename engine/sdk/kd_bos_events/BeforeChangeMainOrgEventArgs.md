# BeforeChangeMainOrgEventArgs

> 来源: https://dev.kingdee.com/sdk/Cosmic%20V5.0.011/index.html?nav=class&name=BeforeChangeMainOrgEventArgs

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


类 BeforeChangeMainOrgEventArgs


@SdkPublic
public class BeforeChangeMainOrgEventArgs


新建单据，用户切换主组织前事件参数

应用于主组织切换事件接口MainOrgChangeListener#beforeChangeMainOrg(BeforeChangeMainOrgEventArgs)上




方法概要
限定符和类型	方法和说明	编号
public String	getMessage()
获取取消主组织切换时的提示内容	1
public boolean	isCancel()
是否取消主组织切换	2
public void	setCancel(boolean cancel)
设置取消主组织切换	3
public void	setMessage(String message)
设置取消主组织切换时的提示内容	4


方法详细资料
getMessage
public String getMessage()


获取取消主组织切换时的提示内容


@return 取消主组织切换时的提示内容


isCancel
public boolean isCancel()


是否取消主组织切换


@return 是否取消


setCancel
public void setCancel(boolean cancel)


设置取消主组织切换


@param cancel 是否取消


setMessage
public void setMessage(String message)


设置取消主组织切换时的提示内容


@param message 取消主组织切换时的提示内容


