# BeforeClosedEvent

> 来源: https://dev.kingdee.com/sdk/Cosmic%20V5.0.011/index.html?nav=class&name=BeforeClosedEvent

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


类 BeforeClosedEvent


java.util.EventObject
kd.bos.form.events.BeforeClosedEvent


所有已实现的接口:
java.io.Serializable
@KSObject
@SdkPublic
public class BeforeClosedEvent
extends java.util.EventObject


窗口关闭前操作事件参数

应用于表单界面插件基本接口kd.bos.form.plugin.IFormPlugin#beforeClosed(BeforeClosedEvent)上




方法概要
限定符和类型	方法和说明	编号
public	BeforeClosedEvent(Object source)
构造方法：初始化关闭前操作事件参数	1
public boolean	isCancel()
是否取消关闭窗口	2
public boolean	isCheckDataChange()
是否检测BillView中Model数据变化并给出提示	3
public boolean	isSkipNoField()
退出界面时，是否略过未绑定物理字段的字段改动	4
public void	setCancel(boolean cancel)
设置是否取消关闭窗口	5
public void	setCheckDataChange(boolean checkDataChange)
设置是否检测BillView中Model数据变化并给出提示	6
public void	setSkipNoField(boolean skipNoField)
设置参数：退出界面时，略过未绑定物理字段的字段改动，不显示提示（绑定了物理字段的字段改动，不受此参数控制，依然会提示改动）	7


方法详细资料
BeforeClosedEvent
public BeforeClosedEvent(Object source)


构造方法：初始化关闭前操作事件参数


@param source 事件源


isCancel
@KSMethod
public boolean isCancel()


是否取消关闭窗口


@return 是否取消：false-不取消，true-取消


isCheckDataChange
@KSMethod
public boolean isCheckDataChange()


是否检测BillView中Model数据变化并给出提示


@return 是否检测：false-不检测，true-检测


isSkipNoField
@KSMethod
public boolean isSkipNoField()


退出界面时，是否略过未绑定物理字段的字段改动


@return 是否略过


setCancel
@KSMethod
public void setCancel(boolean cancel)


设置是否取消关闭窗口


@param cancel 是否取消：false-不取消，true-取消


setCheckDataChange
@KSMethod
public void setCheckDataChange(boolean checkDataChange)


设置是否检测BillView中Model数据变化并给出提示


@param checkDataChange 是否检测：false-不检测，true-检测


setSkipNoField
@KSMethod
public void setSkipNoField(boolean skipNoField)


设置参数：退出界面时，略过未绑定物理字段的字段改动，不显示提示（绑定了物理字段的字段改动，不受此参数控制，依然会提示改动）


@param skipNoField 是否略过


