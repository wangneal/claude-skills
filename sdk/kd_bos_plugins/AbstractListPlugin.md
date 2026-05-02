# AbstractListPlugin

> 来源: https://dev.kingdee.com/sdk/Cosmic%20V5.0.011/index.html?nav=class&name=AbstractListPlugin

SDK
模块
包
类
索引
树
插件
微服务
已过时
kd.bos.kddm > kd.bos.list.plugin
上一个   下一个


类 AbstractListPlugin


AbstractFormPlugin
kd.bos.list.plugin.AbstractListPlugin


所有已实现的接口:
ListRowClickListener, IPCListPlugin, IListPlugin
直接已知子类:
AbstractTreeListPlugin
@SdkPublic
public class AbstractListPlugin
extends AbstractFormPlugin
implements ListRowClickListener, IPCListPlugin


PC 端列表插件基类




字段概要
限定符和类型	字段和说明	编号
public static final String	BILLLISTID
单据列表控件标识	1
public static final String	FILTERCONTAINERID
过滤容器控件标识	2
public static final String	TOOLBARID
工具栏控件标识	3


字段详细资料
BILLLISTID
public static final String BILLLISTID="billlistap"


单据列表控件标识




FILTERCONTAINERID
public static final String FILTERCONTAINERID="filtercontainerap"


过滤容器控件标识




TOOLBARID
public static final String TOOLBARID="toolbarap"


工具栏控件标识





方法概要
限定符和类型	方法和说明	编号
public void	addCustomViews(AddCustomViewEvent event)	1
public void	baseDataColumnDependFieldSet(BaseDataColumnDependFieldSetEvent args)	2
protected void	clearSelection()
清除选中行	3
public void	closeQueryByOr(CloseQueryByOrEvent args)	4
public void	createTreeListView(CreateTreeListViewEvent e)
创建树形列表视图	5
public void	entryHyperLinkClick(EntryHyperLinkClickEvent entryHyperLinkClickEvent)	6
public void	filterColumnSetFilter(SetFilterEvent args)	7
public void	filterContainerAfterSearchClick(FilterContainerSearchClickArgs args)
过滤容器搜索点击后的处理方法,此事件发生在过滤条件解析后，主要用于点击过滤条件时联动修改其他过滤字段控件,	8
public void	filterContainerBeforeF7Select(BeforeFilterF7SelectEvent args)
过滤容器内F7弹出前的处理方法	9
public void	filterContainerInit(FilterContainerInitArgs args)
过滤容器初始化的处理方法,页面加载和点击搜索时触发	10
public void	filterContainerSearchClick(FilterContainerSearchClickArgs args)
过滤容器搜索点击的处理方法,此事件之前先触发filterContainerInit	11
public void	filterContainerSetBaseDataSearchClosed(SetFilterContainerBaseDataSearchClosedEvent args)	12
public void	filterContainerSetFlat(SetFilterContainerFlatEvent args)	13
protected ControlFilters	getControlFilters()
获取过滤容器上的过滤条件	14
protected ListSelectedRowCollection	getCurrentListAllRowCollection()
获取当前页数据	15
protected Object	getFocusRowPkId()
获取焦点行PK	16
protected java.util.List<Long>	getSelectedMainOrgIds()
获取选中的主业务组织	17
protected ListSelectedRowCollection	getSelectedRows()
获取选中行的数据	18
public void	listColumnCompareTypesSet(ListColumnCompareTypesSetEvent args)	19
protected void	reload()
重现加载页面	20
protected void	setBillFormId(String billFormId)
请使用kd.bos.list.IListView.changeListView(String)	21
public void	setCellFieldValue(String key, int rowIndex, Object v)
请使用kd.bos.list.plugin.AbstractListPlugin.setCellFieldValue(	22
public void	setCellFieldValue(SetCellFieldValueArgs args)	23
public void	setIndexMode(IndexModeSetEvent indexModeSetEvent)	24
public void	setMultiSortFields(MultiFieldsSortEvent multiFieldsSortEvent)	25
public void	sumDataLoadOnFirstSet(SumDataLoadOnFirstSetEvent args)	26


方法详细资料
addCustomViews
@Override
public void addCustomViews(AddCustomViewEvent event)




baseDataColumnDependFieldSet
@Override
public void baseDataColumnDependFieldSet(BaseDataColumnDependFieldSetEvent args)




clearSelection
protected void clearSelection()


清除选中行




closeQueryByOr
@Override
public void closeQueryByOr(CloseQueryByOrEvent args)




createTreeListView
@Override
public void createTreeListView(CreateTreeListViewEvent e)


创建树形列表视图


@param e 创建树形列表视图事件


entryHyperLinkClick
@Override
public void entryHyperLinkClick(EntryHyperLinkClickEvent entryHyperLinkClickEvent)




filterColumnSetFilter
@Override
public void filterColumnSetFilter(SetFilterEvent args)




filterContainerAfterSearchClick
@Override
public void filterContainerAfterSearchClick(FilterContainerSearchClickArgs args)


过滤容器搜索点击后的处理方法,此事件发生在过滤条件解析后，主要用于点击过滤条件时联动修改其他过滤字段控件,
修改前已先在filterContainerInit事件将要修改的字段用全局变量进行缓存


@param args 过滤容器搜索点击参数


filterContainerBeforeF7Select
@Override
public void filterContainerBeforeF7Select(BeforeFilterF7SelectEvent args)


过滤容器内F7弹出前的处理方法


@param args 过滤容器内F7弹出前触发参数


filterContainerInit
@Override
public void filterContainerInit(FilterContainerInitArgs args)


过滤容器初始化的处理方法,页面加载和点击搜索时触发


@param args 过滤容器初始化事件参数


filterContainerSearchClick
@Override
public void filterContainerSearchClick(FilterContainerSearchClickArgs args)


过滤容器搜索点击的处理方法,此事件之前先触发filterContainerInit


@param args 过滤容器搜索点击参数


filterContainerSetBaseDataSearchClosed
@Override
public void filterContainerSetBaseDataSearchClosed(SetFilterContainerBaseDataSearchClosedEvent args)




filterContainerSetFlat
@Override
public void filterContainerSetFlat(SetFilterContainerFlatEvent args)




getControlFilters
protected ControlFilters getControlFilters()


获取过滤容器上的过滤条件


@return 过滤容器上的过滤条件


getCurrentListAllRowCollection
protected ListSelectedRowCollection getCurrentListAllRowCollection()


获取当前页数据


@return 当前页数据


getFocusRowPkId
protected Object getFocusRowPkId()


获取焦点行PK


@return 焦点行PK


getSelectedMainOrgIds
protected java.util.List<Long> getSelectedMainOrgIds()


获取选中的主业务组织


@return 选中的主业务组织


getSelectedRows
protected ListSelectedRowCollection getSelectedRows()


获取选中行的数据


@return


listColumnCompareTypesSet
@Override
public void listColumnCompareTypesSet(ListColumnCompareTypesSetEvent args)




reload
protected void reload()


重现加载页面




setBillFormId
@Deprecated
protected void setBillFormId(String billFormId)


请使用kd.bos.list.IListView.changeListView(String)


@param billFormId


setCellFieldValue
@Deprecated
public void setCellFieldValue(String key, int rowIndex, Object v)


请使用kd.bos.list.plugin.AbstractListPlugin.setCellFieldValue(
SetCellFieldValueArgs)


@param key
@param rowIndex
@param v


setCellFieldValue
@Override
public void setCellFieldValue(SetCellFieldValueArgs args)




setIndexMode
@Override
public void setIndexMode(IndexModeSetEvent indexModeSetEvent)




setMultiSortFields
@Override
public void setMultiSortFields(MultiFieldsSortEvent multiFieldsSortEvent)




sumDataLoadOnFirstSet
@Override
public void sumDataLoadOnFirstSet(SumDataLoadOnFirstSetEvent args)




