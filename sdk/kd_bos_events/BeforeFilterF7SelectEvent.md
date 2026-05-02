# BeforeFilterF7SelectEvent

> 来源: https://dev.kingdee.com/sdk/Cosmic%20V5.0.011/index.html?nav=class&name=BeforeFilterF7SelectEvent

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


类 BeforeFilterF7SelectEvent


@SdkPublic
public class BeforeFilterF7SelectEvent


过滤容器F7弹出之前事件参数

应用于选择基础资料前（弹出过滤窗口前）事件监听器接口BeforeFilterF7SelectListener#beforeF7Select(BeforeFilterF7SelectEvent)、
移动端列表插件kd.bos.list.plugin.IMobListPlugin#mobFilterSortBeforeF7Select(BeforeFilterF7SelectEvent)、
列表PC端插件接口kd.bos.list.plugin.IPCListPlugin#filterContainerBeforeF7Select(BeforeFilterF7SelectEvent)、
报表表单插件接口类kd.bos.report.plugin.IReportFormPlugin#filterContainerBeforeF7Select(BeforeFilterF7SelectEvent)上




方法概要
限定符和类型	方法和说明	编号
public	BeforeFilterF7SelectEvent(String refEntityId, String refPropKey, boolean isMulti, String fieldName, Object[] selectedIds, java.util.List<QFilter> qfilters)
构造函数	1
public void	addCustomParam(String key, Object value)
添加自定义参数	2
public void	addCustomQFilter(QFilter customQFilter)
添加插件设置的过滤条件	3
public String	getBillFormId()
获取插件设置的列表的表单单据元数据number或者布局标识	4
public java.util.Map<String, Object>	getCustomParams()
获取自定义参数	5
public java.util.List<QFilter>	getCustomQFilters()
获取插件设置的过滤条件	6
public String	getFieldName()
获取映射的实体字段名	7
public String	getFormId()
通过插件设置过滤容器 F7 弹出的动态表单模板	8
public java.util.List<QFilter>	getMergeQFilters()
获取最终合并的所有过滤条件	9
public java.util.List<QFilter>	getQfilters()
获取所有过滤条件(不包括插件设置的过滤)	10
public String	getRefEntityId()
获取绑定的实体编码	11
public String	getRefPropKey()
获取实际字段名(多级的情况下最后一级)	12
public Object[]	getSelectedIds()
获取已选择的基础资料	13
public long	getUseOrgId()
获取使用组织内码；序时簿需要据此组织内码，隔离数据；	14
public boolean	isCancel()
返回是否取消	15
public boolean	isMulti()
返回是否多选	16
public void	setBillFormId(String billFormId)
通过插件设置获取列表的表单单据元数据number或者布局标识	17
public void	setCancel(boolean cancel)
设置是否取消	18
public void	setCustomParams(java.util.Map<String, Object> customParams)
设置自定义参数集合	19
public void	setCustomQFilters(java.util.List<QFilter> customQFilters)
设置插件设置的过滤条件(多个)	20
public void	setFormId(String formId)
获取插件设置的过滤容器 F7 弹出的动态表单模板	21
public void	setQfilters(java.util.List<QFilter> qfilters)
设置过滤条件	22
public void	setRefEntityId(String refEntityId)
设置绑定的实体编码	23
public void	setRefPropKey(String refPropKey)
设置实际字段名(多级的情况下最后一级)	24
public void	setSelectedIds(Object[] selectedIds)
设置已选数据id集合	25
public void	setUseOrgId(long useOrgId)
设置获取使用组织内码；序时簿需要据此组织内码，隔离数据；	26


方法详细资料
BeforeFilterF7SelectEvent
public BeforeFilterF7SelectEvent(String refEntityId, String refPropKey, boolean isMulti, String fieldName, Object[] selectedIds, java.util.List<QFilter> qfilters)


构造函数


@param refEntityId 打开的基础资料字段实体标识
@param refPropKey 基础资料字段在实体上的最后一级的标识，比如A.B.C，这里就是C
@param isMulti 是否多选
@param fieldName 字段名
@param selectedIds 已选数据集合
@param qfilters 过滤条件


addCustomParam
public void addCustomParam(String key, Object value)


添加自定义参数


@param key 参数key值
@param value 参数value值


addCustomQFilter
@KSMethod
public void addCustomQFilter(QFilter customQFilter)


添加插件设置的过滤条件


@param customQFilter 插件设置的过滤条件


getBillFormId
@KSMethod
public String getBillFormId()


获取插件设置的列表的表单单据元数据number或者布局标识


@return


getCustomParams
public java.util.Map<String, Object> getCustomParams()


获取自定义参数


@return 自定义参数


getCustomQFilters
@KSMethod
public java.util.List<QFilter> getCustomQFilters()


获取插件设置的过滤条件


@return 插件设置的过滤条件


getFieldName
@KSMethod
public String getFieldName()


获取映射的实体字段名


@return 映射的实体字段名


getFormId
@KSMethod
public String getFormId()


通过插件设置过滤容器 F7 弹出的动态表单模板


@return


getMergeQFilters
@KSMethod
public java.util.List<QFilter> getMergeQFilters()


获取最终合并的所有过滤条件


@return 最终合并的所有过滤条件


getQfilters
@KSMethod
public java.util.List<QFilter> getQfilters()


获取所有过滤条件(不包括插件设置的过滤)


@return 所有过滤条件


getRefEntityId
@KSMethod
public String getRefEntityId()


获取绑定的实体编码


@return 绑定的实体编码


getRefPropKey
@KSMethod
public String getRefPropKey()


获取实际字段名(多级的情况下最后一级)


@return 实际字段名


getSelectedIds
@KSMethod
public Object[] getSelectedIds()


获取已选择的基础资料


@return 已选择的基础资料


getUseOrgId
@KSMethod
public long getUseOrgId()


获取使用组织内码；序时簿需要据此组织内码，隔离数据；


@return 使用组织内码


isCancel
@KSMethod
public boolean isCancel()


返回是否取消


@return 是否取消


isMulti
@KSMethod
public boolean isMulti()


返回是否多选


@return 是否多选


setBillFormId
@KSMethod
public void setBillFormId(String billFormId)


通过插件设置获取列表的表单单据元数据number或者布局标识


@param billFormId


setCancel
@KSMethod
public void setCancel(boolean cancel)


设置是否取消


@param cancel 是否取消


setCustomParams
public void setCustomParams(java.util.Map<String, Object> customParams)


设置自定义参数集合


@param customParams 自定义参数Map


setCustomQFilters
@KSMethod
public void setCustomQFilters(java.util.List<QFilter> customQFilters)


设置插件设置的过滤条件(多个)


@param customQFilters 插件设置的过滤条件


setFormId
@KSMethod
public void setFormId(String formId)


获取插件设置的过滤容器 F7 弹出的动态表单模板


@param formId


setQfilters
@KSMethod
public void setQfilters(java.util.List<QFilter> qfilters)


设置过滤条件


@param qfilters 过滤条件


setRefEntityId
@KSMethod
public void setRefEntityId(String refEntityId)


设置绑定的实体编码


@param refEntityId 绑定的实体编码


setRefPropKey
@KSMethod
public void setRefPropKey(String refPropKey)


设置实际字段名(多级的情况下最后一级)


@param refPropKey 实际字段名


setSelectedIds
public void setSelectedIds(Object[] selectedIds)


设置已选数据id集合


@param selectedIds 已选数据id集合


setUseOrgId
@KSMethod
public void setUseOrgId(long useOrgId)


设置获取使用组织内码；序时簿需要据此组织内码，隔离数据；


@param useOrgId 获取使用组织内码


