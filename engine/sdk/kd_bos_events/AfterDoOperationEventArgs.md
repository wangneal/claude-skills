# AfterDoOperationEventArgs

> 来源: https://dev.kingdee.com/sdk/Cosmic%20V5.0.011/index.html?nav=class&name=AfterDoOperationEventArgs

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


类 AfterDoOperationEventArgs


java.util.EventObject
kd.bos.form.events.AfterDoOperationEventArgs


所有已实现的接口:
java.io.Serializable
@KSObject
@ResolveKey
@SdkPublic
public class AfterDoOperationEventArgs
extends java.util.EventObject


操作之后事件参数

应用于表单界面插件基本接口kd.bos.form.plugin.IFormPlugin#afterDoOperation(AfterDoOperationEventArgs)上




方法概要
限定符和类型	方法和说明	编号
public	AfterDoOperationEventArgs(Object source, String operateKey, OperationResult operationResult)
构造方法：初始化操作之后事件	1
public String	getObjectId()
获取objectId(原来的版本，把操作标识，赋给objectId变量了：暂时保留，兼容以前版本错误)	2
public String	getOperateKey()
获取操作标识	3
public OperationResult	getOperationResult()
获取操作之后返回结果	4
public Object	getSource()
获取事件源	5


方法详细资料
AfterDoOperationEventArgs
public AfterDoOperationEventArgs(Object source, String operateKey, OperationResult operationResult)


构造方法：初始化操作之后事件


@param source 事件源
@param operateKey 操作标识
@param operationResult 操作之后返回结果


getObjectId
@KSMethod
@Deprecated
public String getObjectId()


获取objectId(原来的版本，把操作标识，赋给objectId变量了：暂时保留，兼容以前版本错误)


@deprecated 数据主键，请使用formView获得；操作标识，请使用getOperateKey()获得
@return objectId


getOperateKey
@KSMethod
public String getOperateKey()


获取操作标识


@return 操作标识


getOperationResult
@KSMethod
public OperationResult getOperationResult()


获取操作之后返回结果


@return 操作之后返回结果


getSource
@Override
@KSMethod
public Object getSource()


获取事件源


@return 事件源


