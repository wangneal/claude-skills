# BeforeSetItemValueEventArgs

> 来源: https://dev.kingdee.com/sdk/Cosmic%20V5.0.011/index.html?nav=class&name=BeforeSetItemValueEventArgs

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


类 BeforeSetItemValueEventArgs


@SdkPublic
public class BeforeSetItemValueEventArgs


基础资料字段赋值前事件参数

表单运行时模型层插件接口IDataModelChangeListener#beforeSetItemValue(BeforeSetItemValueEventArgs)事件参数




方法概要
限定符和类型	方法和说明	编号
public	BeforeSetItemValueEventArgs(IDataEntityProperty property, DynamicObject dataEntity, Object value)
构造函数	1
public DynamicObject	getDataEntity()
返回赋值数据包	2
public IDataEntityProperty	getProperty()
返回赋值字段	3
public java.util.List<QFilter>	getQFilters()
返回插件设置的基础资料过滤条件	4
public String[]	getSearchArgs()
返回插件设置的基础资料额外的检索参数	5
public String	getSearchKey()
返回插件设置的基础资料额外检索字段	6
public Object	getValue()
返回字段值，可能是基础数据内码或编码	7
public void	setDataEntity(DynamicObject dataEntity)
设置赋值数据包	8
public void	setProperty(IDataEntityProperty property)
设置赋值字段	9
public void	setQFilters(java.util.List<QFilter> qFilters)
设置基础资料过滤条件	10
public void	setSearchArgs(String[] searchArgs)
设置基础资料额外的检索参数	11
public void	setSearchKey(String searchKey)
设置基础资料额外的检索字段	12
public void	setValue(Object value)
设置字段值	13


方法详细资料
BeforeSetItemValueEventArgs
public BeforeSetItemValueEventArgs(IDataEntityProperty property, DynamicObject dataEntity, Object value)


构造函数


@param property 字段
@param dataEntity 数据包
@param value 字段值


getDataEntity
public DynamicObject getDataEntity()


返回赋值数据包


@return 数据包


getProperty
public IDataEntityProperty getProperty()


返回赋值字段


@return 字段属性对象


getQFilters
public java.util.List<QFilter> getQFilters()


返回插件设置的基础资料过滤条件


@return 过滤条件


getSearchArgs
public String[] getSearchArgs()


返回插件设置的基础资料额外的检索参数

和检索字段 #getSearchKey() 配合使用


@return 检索参数


getSearchKey
public String getSearchKey()


返回插件设置的基础资料额外检索字段

和检索参数 #getSearchArgs()配合使用，事件执行完毕后，系统会动态拼接成 "searchKey in (searchArgs)" 的取数条件对基础资料进行过滤


@return 检索字段


getValue
public Object getValue()


返回字段值，可能是基础数据内码或编码


@return 字段值


setDataEntity
public void setDataEntity(DynamicObject dataEntity)


设置赋值数据包


@param dataEntity 数据包


setProperty
public void setProperty(IDataEntityProperty property)


设置赋值字段


@param property 字段属性对象


setQFilters
public void setQFilters(java.util.List<QFilter> qFilters)


设置基础资料过滤条件


@param qFilters 过滤条件


setSearchArgs
public void setSearchArgs(String[] searchArgs)


设置基础资料额外的检索参数


@param searchArgs 检索参数


setSearchKey
public void setSearchKey(String searchKey)


设置基础资料额外的检索字段


@param searchKey 检索字段


setValue
public void setValue(Object value)


设置字段值


@param value 字段值


