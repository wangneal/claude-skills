# BeforeLoadDataArgs

> 来源: https://dev.kingdee.com/sdk/Cosmic%20V5.0.011/index.html?nav=class&name=BeforeLoadDataArgs

SDK
模块
包
类
索引
树
插件
微服务
已过时
kd.bos.kddm > kd.bos.entity.plugin.args
上一个   下一个


类 BeforeLoadDataArgs


java.util.EventObject
kd.bos.entity.plugin.args.BeforeLoadDataArgs


所有已实现的接口:
java.io.Serializable
@SdkPublic
public class BeforeLoadDataArgs
extends java.util.EventObject


打印插件事件： 加载数据前事件




方法概要
限定符和类型	方法和说明	编号
public	BeforeLoadDataArgs(Object source)
构造函数	1
public	BeforeLoadDataArgs(Object source, String ds)
构造函数	2
public String	getDataSourceName()
获取数据源名称	3
public boolean	isCancel()
获取取消系统读取数据	4
public void	setCancel(boolean cancel)
取消系统读取数据	5


方法详细资料
BeforeLoadDataArgs
public BeforeLoadDataArgs(Object source)


构造函数


@param source 事件源


BeforeLoadDataArgs
public BeforeLoadDataArgs(Object source, String ds)


构造函数


@param source 事件源
@param ds 数据源


getDataSourceName
@KSMethod
public String getDataSourceName()


获取数据源名称


@return 数据源名称


isCancel
@KSMethod
public boolean isCancel()


获取取消系统读取数据


@return 是否取消系统读取数据


setCancel
@KSMethod
public void setCancel(boolean cancel)


取消系统读取数据


@param cancel 是否取消系统读取数据


