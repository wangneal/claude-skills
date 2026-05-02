# BeforeFieldPostBackEvent

> 来源: https://dev.kingdee.com/sdk/Cosmic%20V5.0.011/index.html?nav=class&name=BeforeFieldPostBackEvent

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


类 BeforeFieldPostBackEvent


java.util.EventObject
kd.bos.form.events.BeforeFieldPostBackEvent


所有已实现的接口:
java.io.Serializable
@ResolveKey
@SdkPublic
public class BeforeFieldPostBackEvent
extends java.util.EventObject


客户端提交字段值到服务端事件参数

应用于表单界面插件基本接口kd.bos.form.plugin.IFormPlugin#beforeFieldPostBack(BeforeFieldPostBackEvent)上




方法概要
限定符和类型	方法和说明	编号
public	BeforeFieldPostBackEvent(Object source, Object value, int rowIndex, int parentRowIndex)
构造方法：初始化客户端提交字段值到服务端事件参数	1
public String	getKey()
获取控件标识	2
public int	getParentRowIndex()
获取父实体行号	3
public int	getRowIndex()
获取实体行号	4
public Object	getSource()
获取事件源	5
public Object	getValue()
获取字段值	6
public boolean	isCancel()
是否取消该事件	7
public void	setCancel(boolean cancel)
设置是否取消该事件布尔值	8
public void	setKey(String key)
设置控件标识	9
public void	setValue(Object value)
设置字段值	10


方法详细资料
BeforeFieldPostBackEvent
public BeforeFieldPostBackEvent(Object source, Object value, int rowIndex, int parentRowIndex)


构造方法：初始化客户端提交字段值到服务端事件参数


@param source 事件源
@param value 字段值
@param rowIndex 实体行号
@param parentRowIndex 父实体行号


getKey
public String getKey()


获取控件标识


@return


getParentRowIndex
@KSMethod
public int getParentRowIndex()


获取父实体行号


@return 父实体行号


getRowIndex
@KSMethod
public int getRowIndex()


获取实体行号


@return 实体行号


getSource
@KSMethod
public Object getSource()


获取事件源


@return 事件源


getValue
@KSMethod
public Object getValue()


获取字段值


@return 字段值


isCancel
@KSMethod
public boolean isCancel()


是否取消该事件


@return 是否取消布尔值：false-不取消，true-取消


setCancel
@KSMethod
public void setCancel(boolean cancel)


设置是否取消该事件布尔值


@param cancel 是否取消布尔值：false-不取消，true-取消


setKey
public void setKey(String key)


设置控件标识


@param key


setValue
public void setValue(Object value)


设置字段值


@param value


