# BeforePackageDataEvent

> 来源: https://dev.kingdee.com/sdk/Cosmic%20V5.0.011/index.html?nav=class&name=BeforePackageDataEvent

SDK
模块
包
类
索引
树
插件
微服务
已过时
kd.bos.kddm > kd.bos.entity.datamodel.events
上一个   下一个


类 BeforePackageDataEvent


java.util.EventObject
kd.bos.entity.datamodel.events.BeforePackageDataEvent


所有已实现的接口:
java.io.Serializable
@SdkPublic
public class BeforePackageDataEvent
extends java.util.EventObject


单据列表控件数据格式化前事件参数

单据列表控件的格式化 kd.bos.entity.list.events.BeforePackageDataListener#beforePackageData(BeforePackageDataEvent) 事件参数




方法概要
限定符和类型	方法和说明	编号
public	BeforePackageDataEvent(Object source)
构造函数	1
public	BeforePackageDataEvent(Object source, DynamicObjectCollection pageData)
构造函数	2
public DynamicObjectCollection	getPageData()
返回列表的数据集合	3
public void	setPageData(DynamicObjectCollection pageData)
设置数据集合	4


方法详细资料
BeforePackageDataEvent
public BeforePackageDataEvent(Object source)


构造函数


@param source 事件源


BeforePackageDataEvent
public BeforePackageDataEvent(Object source, DynamicObjectCollection pageData)


构造函数


@param source 事件源
@param pageData 数据集合


getPageData
public DynamicObjectCollection getPageData()


返回列表的数据集合

插件可修改其中字段值，从而影响列表显示


@return 数据集合


setPageData
public void setPageData(DynamicObjectCollection pageData)


设置数据集合


@param pageData 数据集合


