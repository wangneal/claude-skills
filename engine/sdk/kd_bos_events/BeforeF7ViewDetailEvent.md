# BeforeF7ViewDetailEvent

> 来源: https://dev.kingdee.com/sdk/Cosmic%20V5.0.011/index.html?nav=class&name=BeforeF7ViewDetailEvent

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


类 BeforeF7ViewDetailEvent


java.util.EventObject
kd.bos.form.field.events.BeforeF7ViewDetailEvent


所有已实现的接口:
java.io.Serializable
@SdkPublic
public class BeforeF7ViewDetailEvent
extends java.util.EventObject


查看F7明细事件参数

应用于基础资料控件kd.bos.form.field.BasedataEdit#addBeforeF7ViewDetailListener(Consumer)上




方法概要
限定符和类型	方法和说明	编号
public	BeforeF7ViewDetailEvent(Object source)
构造方法：查看F7明细事件参数	1
public	BeforeF7ViewDetailEvent(Object source, int rowKey, Object pkId)
构造方法：查看F7明细事件参数	2
public Object	getPkId()
获取主键ID值	3
public int	getRowKey()
获取序号	4
public boolean	isCancel()
是否取消该事件	5
public void	setCancel(boolean cancel)
设置是否取消该事件布尔值	6
public void	setPkId(Object pkId)
设置主键ID值	7
public void	setRowKey(int rowKey)
设置序号	8


方法详细资料
BeforeF7ViewDetailEvent
public BeforeF7ViewDetailEvent(Object source)


构造方法：查看F7明细事件参数


@param source 事件源


BeforeF7ViewDetailEvent
public BeforeF7ViewDetailEvent(Object source, int rowKey, Object pkId)


构造方法：查看F7明细事件参数


@param source 事件源
@param rowKey 序号
@param pkId 主键ID


getPkId
public Object getPkId()


获取主键ID值


@return 主键ID值


getRowKey
public int getRowKey()


获取序号


@return 序号


isCancel
public boolean isCancel()


是否取消该事件


@return 是否取消事件值：false-不取消，true-取消


setCancel
public void setCancel(boolean cancel)


设置是否取消该事件布尔值


@param cancel 是否取消事件：false-不取消，true-取消


setPkId
public void setPkId(Object pkId)


设置主键ID值


@param pkId 主键ID值


setRowKey
public void setRowKey(int rowKey)


设置序号


@param rowKey 序号


