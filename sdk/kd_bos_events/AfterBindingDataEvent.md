# AfterBindingDataEvent

> 来源: https://dev.kingdee.com/sdk/Cosmic%20V5.0.011/index.html?nav=class&name=AfterBindingDataEvent

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


类 AfterBindingDataEvent


java.util.EventObject
kd.bos.form.field.events.AfterBindingDataEvent


所有已实现的接口:
java.io.Serializable
@SdkPublic
public class AfterBindingDataEvent
extends java.util.EventObject


绑定数据之后事件参数

应用于绑定数据之后事件接口BasedataEditListener#afterBindingData(AfterBindingDataEvent)上




方法概要
限定符和类型	方法和说明	编号
public	AfterBindingDataEvent(Object source)
构造方法：初始化绑定数据之后事件参数	1
public	AfterBindingDataEvent(Object source, Object dataEntity)
构造方法：初始化绑定数据之后事件参数	2
public Object	getDataEntity()
获取数据实体	3
public Object	getDisplayProp()
获取显示属性	4
public String	getEditSearchProp()
获取编辑显示属性	5
public void	setDataEntity(Object dataEntity)
设置数据实体	6
public void	setDisplayProp(String displayProp)
设置显示属性	7
public void	setEditSearchProp(String editSearchProp)
设置编辑显示属性	8


方法详细资料
AfterBindingDataEvent
public AfterBindingDataEvent(Object source)


构造方法：初始化绑定数据之后事件参数


@param source 事件源


AfterBindingDataEvent
public AfterBindingDataEvent(Object source, Object dataEntity)


构造方法：初始化绑定数据之后事件参数


@param source 事件源
@param dataEntity 数据实体


getDataEntity
public Object getDataEntity()


获取数据实体


@return 数据实体


getDisplayProp
public Object getDisplayProp()


获取显示属性


@return 显示属性


getEditSearchProp
public String getEditSearchProp()


获取编辑显示属性


@return 编辑显示属性


setDataEntity
public void setDataEntity(Object dataEntity)


设置数据实体


@param dataEntity 数据实体


setDisplayProp
public void setDisplayProp(String displayProp)


设置显示属性


@param displayProp 显示属性


setEditSearchProp
public void setEditSearchProp(String editSearchProp)


设置编辑显示属性


@param editSearchProp 编辑显示属性


