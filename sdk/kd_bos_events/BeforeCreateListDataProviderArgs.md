# BeforeCreateListDataProviderArgs

> 来源: https://dev.kingdee.com/sdk/Cosmic%20V5.0.011/index.html?nav=class&name=BeforeCreateListDataProviderArgs

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


类 BeforeCreateListDataProviderArgs


java.util.EventObject
kd.bos.form.events.BeforeCreateListDataProviderArgs


所有已实现的接口:
java.io.Serializable
@KSObject
@SdkPublic
public class BeforeCreateListDataProviderArgs
extends java.util.EventObject


创建列表数据访问类前置事件参数

应用于创建列表数据访问类监听器
列表插件接口




方法概要
限定符和类型	方法和说明	编号
public	BeforeCreateListDataProviderArgs(Object source)
构造方法：初始化创建列表数据访问类前置事件	1
public IListDataProvider	getListDataProvider()
获取取数接口类	2
public void	setListDataProvider(IListDataProvider listDataProvider)
设置取数接口类	3


方法详细资料
BeforeCreateListDataProviderArgs
public BeforeCreateListDataProviderArgs(Object source)


构造方法：初始化创建列表数据访问类前置事件


@param source 事件源


getListDataProvider
@KSMethod
public IListDataProvider getListDataProvider()


获取取数接口类


@return 取数接口类


setListDataProvider
@KSMethod
public void setListDataProvider(IListDataProvider listDataProvider)


设置取数接口类


@param listDataProvider 取数接口类


