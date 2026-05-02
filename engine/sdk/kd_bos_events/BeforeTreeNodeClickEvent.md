# BeforeTreeNodeClickEvent

> 来源: https://dev.kingdee.com/sdk/Cosmic%20V5.0.011/index.html?nav=class&name=BeforeTreeNodeClickEvent

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


类 BeforeTreeNodeClickEvent


java.util.EventObject
kd.bos.form.events.BeforeTreeNodeClickEvent


所有已实现的接口:
java.io.Serializable
@SuppressWarnings(value="squid:ClassVariableVisibilityCheck")
@KSObject
@SdkPublic
public class BeforeTreeNodeClickEvent
extends java.util.EventObject


树节点点击之前事件参数

应用于树形基础资料模板插件接口kd.bos.list.plugin.ITreeListPlugin#beforeTreeNodeClick(BeforeTreeNodeClickEvent)上




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
public	BeforeTreeNodeClickEvent(Object source)
构造方法：初始化树节点点击之前事件参数	1


方法详细资料
BeforeTreeNodeClickEvent
public BeforeTreeNodeClickEvent(Object source)


构造方法：初始化树节点点击之前事件参数


@param source 树节点点击之前事件参数


