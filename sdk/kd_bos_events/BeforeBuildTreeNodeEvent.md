# BeforeBuildTreeNodeEvent

> 来源: https://dev.kingdee.com/sdk/Cosmic%20V5.0.011/index.html?nav=class&name=BeforeBuildTreeNodeEvent

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


类 BeforeBuildTreeNodeEvent


java.util.EventObject
kd.bos.form.events.BeforeBuildTreeNodeEvent


所有已实现的接口:
java.io.Serializable
@SuppressWarnings(value="squid:ClassVariableVisibilityCheck")
@KSObject
@SdkPublic
public class BeforeBuildTreeNodeEvent
extends java.util.EventObject


构建树节点前置处理事件参数

应用于树形基础资料模板插件接口kd.bos.list.plugin.ITreeListPlugin#beforeBuildTreeNode(BeforeBuildTreeNodeEvent)上




字段概要
限定符和类型	字段和说明	编号
public boolean	cancel
cancel置为true代表由插件执行相关动作	1


字段详细资料
cancel
public boolean cancel


cancel置为true代表由插件执行相关动作
TreeListView不再执行





方法概要
限定符和类型	方法和说明	编号
public	BeforeBuildTreeNodeEvent(Object source)
构造方法：初始化构建树节点前置处理事件参数	1
protected String	getCurrNodeId()
获取当前节点	2
public void	setCurrNodeId(String currNodeId)
设置当前节点	3


方法详细资料
BeforeBuildTreeNodeEvent
public BeforeBuildTreeNodeEvent(Object source)


构造方法：初始化构建树节点前置处理事件参数


@param source 事件源


getCurrNodeId
protected String getCurrNodeId()


获取当前节点


@return 当前节点


setCurrNodeId
public void setCurrNodeId(String currNodeId)


设置当前节点


@param currNodeId 当前节点


