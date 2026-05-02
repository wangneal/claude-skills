# BeforeCreateListColumnsArgs

> 来源: https://dev.kingdee.com/sdk/Cosmic%20V5.0.011/index.html?nav=class&name=BeforeCreateListColumnsArgs

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


类 BeforeCreateListColumnsArgs


java.util.EventObject
kd.bos.form.events.BeforeCreateListColumnsArgs


所有已实现的接口:
java.io.Serializable
@KSObject
@SdkPublic
public class BeforeCreateListColumnsArgs
extends java.util.EventObject


创建列表前事件参数

应用于创建列表列事件接口kd.bos.list.events.CreateListColumnsListener#createListColumns(BeforeCreateListColumnsArgs)、
列表插件接口kd.bos.list.plugin.IListPlugin#beforeCreateListColumns(BeforeCreateListColumnsArgs)上




方法概要
限定符和类型	方法和说明	编号
public	BeforeCreateListColumnsArgs(Object source)
初始化创建列表前事件参数	1
public	BeforeCreateListColumnsArgs(Object source, java.util.List<IListColumn> listColumns)
初始化创建列表前事件参数	2
public	BeforeCreateListColumnsArgs(Object source, java.util.List<IListColumn> listColumns, java.util.List<ListColumnGroup> listGroupColumns)
构造函数	3
public void	addListColumn(IListColumn listColumn)
添加列表字段	4
public void	addListColumnGroup(String key, LocaleString name, String parentViewKey)
添加分组字段	5
public void	addListColumnGroup(ListColumnGroup listColumnGroup)
添加分组字段	6
public java.util.List<DynamicTextListColumn>	getDynamicTextListColumns()
获取动态文本字段	7
public IListColumn	getListColumn(String fieldName)
通过字段名获取列表字段	8
public java.util.List<IListColumn>	getListColumns()
获取列表字段	9
public java.util.List<ListColumnGroup>	getListGroupColumns()
获取分组字段	10
public java.util.List<MergeListColumn>	getMergeListColumns()
获取合并列表字段	11
public void	setListColumns(java.util.List<IListColumn> listColumns)
设置列表字段	12
public void	setListGroupColumns(java.util.List<ListColumnGroup> listGroupColumns)
设置分组字段	13


方法详细资料
BeforeCreateListColumnsArgs
public BeforeCreateListColumnsArgs(Object source)


初始化创建列表前事件参数


@param source 事件源


BeforeCreateListColumnsArgs
public BeforeCreateListColumnsArgs(Object source, java.util.List<IListColumn> listColumns)


初始化创建列表前事件参数


@param source 事件源
@param listColumns 列表字段


BeforeCreateListColumnsArgs
public BeforeCreateListColumnsArgs(Object source, java.util.List<IListColumn> listColumns, java.util.List<ListColumnGroup> listGroupColumns)


构造函数


@param source 事件源
@param listColumns 列表字段集合
@param listGroupColumns 分组字段集合


addListColumn
@KSMethod
public void addListColumn(IListColumn listColumn)


添加列表字段


@param listColumn 列表字段


addListColumnGroup
@KSMethod
public void addListColumnGroup(String key, LocaleString name, String parentViewKey)


添加分组字段


@param key 字段key
@param name 字段名称
@param parentViewKey 字段所属视图


addListColumnGroup
@KSMethod
public void addListColumnGroup(ListColumnGroup listColumnGroup)


添加分组字段

示例：


ComboListColumn comboListColumn = (ComboListColumn) beforecreatelistcolumnsargs.getListColumn("test");
comboListColumn.setFixed(true);

comboListColumn.setListFieldKey("combofield");
comboListColumn.setCaption(new LocaleString("combo"));
comboListColumn.setParentViewKey("test1");
beforecreatelistcolumnsargs.addListColumn(comboListColumn);

ListColumnGroup listColumnGroup = new ListColumnGroup();
listColumnGroup.setKey("test1");
// listColumnGroup.setParentViewKey("gridview");
listColumnGroup.setName(new LocaleString("test"));
listColumnGroup.getItems().add(comboListColumn);
listColumnGroup.setVisible(11);
beforecreatelistcolumnsargs.addListColumnGroup(listColumnGroup);
		


@param listColumnGroup 列表分组字段


getDynamicTextListColumns
@KSMethod
public java.util.List<DynamicTextListColumn> getDynamicTextListColumns()


获取动态文本字段


@return 动态文本字段


getListColumn
@KSMethod
public IListColumn getListColumn(String fieldName)


通过字段名获取列表字段


@param fieldName 字段名
@return 列表字段


getListColumns
@KSMethod
public java.util.List<IListColumn> getListColumns()


获取列表字段


@return 列表字段


getListGroupColumns
@KSMethod
public java.util.List<ListColumnGroup> getListGroupColumns()


获取分组字段


@return 分组字段


getMergeListColumns
@KSMethod
public java.util.List<MergeListColumn> getMergeListColumns()


获取合并列表字段


@return 合并列表字段


setListColumns
@KSMethod
public void setListColumns(java.util.List<IListColumn> listColumns)


设置列表字段


@param listColumns 列表字段


setListGroupColumns
@KSMethod
public void setListGroupColumns(java.util.List<ListColumnGroup> listGroupColumns)


设置分组字段


@param listGroupColumns 分组字段


