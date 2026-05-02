# BeforeCreateMobTableColumnsEvent

> 来源: https://dev.kingdee.com/sdk/Cosmic%20V5.0.011/index.html?nav=class&name=BeforeCreateMobTableColumnsEvent

SDK
模块
包
类
索引
树
插件
微服务
已过时
kd.bos.kddm > kd.bos.form.mcontrol.mobtable.events
上一个   下一个


类 BeforeCreateMobTableColumnsEvent


java.util.EventObject
kd.bos.form.mcontrol.mobtable.events.BeforeCreateMobTableColumnsEvent


所有已实现的接口:
java.io.Serializable
@SdkPublic
public class BeforeCreateMobTableColumnsEvent
extends java.util.EventObject


创建移动表格列前事件参数

应用于创建移动表格列前事件接口IBeforeCreateMobTableColumnsListener#beforeCreateMobTableColumns(BeforeCreateMobTableColumnsEvent)上




方法概要
限定符和类型	方法和说明	编号
public	BeforeCreateMobTableColumnsEvent(Object source, java.util.List<MobTableColumn> mobTableColumns)
构造函数	1
public MobTable	getControl()
获取表格控件	2
public Object	getCustomParam(String name)
获取自定义参数	3
public java.util.List<MobTableColumn>	getMobTableColumns()
获取表格列	4
public void	setControl(MobTable control)
设置表格控件	5
public void	setCustomParams(java.util.Map<String, Object> customParams)
设置自定义参数	6


方法详细资料
BeforeCreateMobTableColumnsEvent
public BeforeCreateMobTableColumnsEvent(Object source, java.util.List<MobTableColumn> mobTableColumns)


构造函数


@param source 事件源
@param mobTableColumns 表格列


getControl
public MobTable getControl()


获取表格控件


@return


getCustomParam
@KSMethod
public Object getCustomParam(String name)


获取自定义参数


@param name
@return


getMobTableColumns
public java.util.List<MobTableColumn> getMobTableColumns()


获取表格列


@return


setControl
public void setControl(MobTable control)


设置表格控件


@param control


setCustomParams
public void setCustomParams(java.util.Map<String, Object> customParams)


设置自定义参数


@param customParams


