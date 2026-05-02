# BeforeImportDataEventArgs

> 来源: https://dev.kingdee.com/sdk/Cosmic%20V5.0.011/index.html?nav=class&name=BeforeImportDataEventArgs

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


类 BeforeImportDataEventArgs


java.util.EventObject
kd.bos.entity.datamodel.events.ImportDataEventArgs
kd.bos.entity.datamodel.events.BeforeImportDataEventArgs


所有已实现的接口:
java.io.Serializable
@SdkPublic
public class BeforeImportDataEventArgs
extends ImportDataEventArgs


引入前事件参数

表单运行时模型层插件接口IDataModelListener#beforeImportData(BeforeImportDataEventArgs)事件参数




方法概要
限定符和类型	方法和说明	编号
public	BeforeImportDataEventArgs(Object source, java.util.Map<String, Object> sourceData)
构造函数	1
public	BeforeImportDataEventArgs(Object source, java.util.Map<String, Object> sourceData, java.util.Map<kd.bos.entity.datamodel.BasedataItem, Object> basedataPks)
构造函数	2
public	BeforeImportDataEventArgs(Object source, java.util.Map<String, Object> sourceData, java.util.Map<kd.bos.entity.datamodel.BasedataItem, Object> basedataPks, java.util.Map<String, Object> option)
构造函数	3
public String	getCancelMessage()
获取取消本单引入的原因说明	4
public boolean	isCheckImportable()
插件是否取消了字段是否允许引入的选项控制	5
public boolean	isFireAfterImportData()
插件是否取消了触发afterImportData事件	6
public void	setCancelMessage(String cancelMessage)
设置取消引入原因	7
public void	setCheckImportable(boolean checkImportable)
取消字段是否允许引入的选项控制	8
public void	setFireAfterImportData(boolean fireAfterImportData)
指定是否触发afterImportData事件、执行实体服务规则	9


方法详细资料
BeforeImportDataEventArgs
@Deprecated
public BeforeImportDataEventArgs(Object source, java.util.Map<String, Object> sourceData)


构造函数


@param source 事件源
@param sourceData 源数据


BeforeImportDataEventArgs
public BeforeImportDataEventArgs(Object source, java.util.Map<String, Object> sourceData, java.util.Map<kd.bos.entity.datamodel.BasedataItem, Object> basedataPks)


构造函数


@param source 事件源
@param sourceData 源数据
@param basedataPks 基础资料数据


BeforeImportDataEventArgs
public BeforeImportDataEventArgs(Object source, java.util.Map<String, Object> sourceData, java.util.Map<kd.bos.entity.datamodel.BasedataItem, Object> basedataPks, java.util.Map<String, Object> option)


构造函数


@param source 事件源
@param sourceData 元数据
@param basedataPks 基础资料数据
@param option 可选参数


getCancelMessage
@Deprecated
public String getCancelMessage()


获取取消本单引入的原因说明


@return 取消本单引入的原因说明


isCheckImportable
public boolean isCheckImportable()


插件是否取消了字段是否允许引入的选项控制


@return 默认返回true，检查字段是否允许录入


isFireAfterImportData
public boolean isFireAfterImportData()


插件是否取消了触发afterImportData事件


@return 默认返回true，触发afterImportData事件


setCancelMessage
@Deprecated
public void setCancelMessage(String cancelMessage)


设置取消引入原因


@deprecated 请改用Integer, String)添加取消原因，可以按分录区分取消原因
@param cancelMessage 取消原因


setCheckImportable
public void setCheckImportable(boolean checkImportable)


取消字段是否允许引入的选项控制

字段上有个功能控制-是否允许引入选项，默认只有勾选了该选项后，该字段才允许引入


@param checkImportable 设置为false取消引入选项控制


setFireAfterImportData
public void setFireAfterImportData(boolean fireAfterImportData)


指定是否触发afterImportData事件、执行实体服务规则

默认是触发的，可以指定不触发，提升性能


@param fireAfterImportData 设置false不触发afterImportData事件


