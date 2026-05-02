# AbstractTreeListPlugin

> 来源: https://dev.kingdee.com/sdk/Cosmic%20V5.0.011/index.html?nav=class&name=AbstractTreeListPlugin

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


类 AbstractTreeListPlugin


AbstractFormPlugin
kd.bos.list.plugin.AbstractListPlugin
kd.bos.list.plugin.AbstractTreeListPlugin


所有已实现的接口:
ITreeListPlugin, ListRowClickListener, IPCListPlugin, IListPlugin
直接已知子类:
StandardTreeListPlugin
@SdkPublic
public class AbstractTreeListPlugin
extends AbstractListPlugin
implements ITreeListPlugin


树形列表插件基类




字段概要
限定符和类型	字段和说明	编号
protected ITreeListView	treeListView
树行列表视图	1


字段详细资料
treeListView
protected ITreeListView treeListView


树行列表视图





方法概要
限定符和类型	方法和说明	编号
public void	beforeBuildTreeNode(BeforeBuildTreeNodeEvent e)
在TreeListView初始化TreeNode前调用	1
public void	beforeShowBill(BeforeShowBillFormEvent e)	2
public void	beforeTreeNodeClick(BeforeTreeNodeClickEvent e)
在TreeListView触发TreeNodeClick事件时调用	3
public void	buildTreeListFilter(BuildTreeListFilterEvent e)
树形单据列表，点击分组树节点，构建单据列表分组过滤条件	4
public void	expendTreeNode(TreeNodeEvent e)
设置树形列表插件的展开节点	5
public ITreeListView	getTreeListView()
获取树行列表视图	6
protected ITreeModel	getTreeModel()
获取树行列表模型	7
public void	initTreeToolbar(java.util.EventObject e)	8
public void	initialize()	9
public void	initializeTree(java.util.EventObject e)	10
protected QFilter	nodeClickFilter()
设置点击节点时list的过滤条件	11
public void	refreshNode(RefreshNodeEvent e)
刷新节点	12
public void	registerListener(java.util.EventObject e)	13
public void	search(SearchEnterEvent evt)	14
public void	setCustomerParam()
设置自定义参数	15
public void	setTreeListView(ITreeListView treeListView)	16
public void	treeNodeClick(TreeNodeEvent e)
树中节点的点击处理方法	17
public void	treeToolbarClick(java.util.EventObject e)	18


方法详细资料
beforeBuildTreeNode
public void beforeBuildTreeNode(BeforeBuildTreeNodeEvent e)


在TreeListView初始化TreeNode前调用


@param e 构建树节点前置事件


beforeShowBill
@Override
public void beforeShowBill(BeforeShowBillFormEvent e)




beforeTreeNodeClick
@Override
public void beforeTreeNodeClick(BeforeTreeNodeClickEvent e)


在TreeListView触发TreeNodeClick事件时调用


@param e 树节点点击之前事件


buildTreeListFilter
@Override
public void buildTreeListFilter(BuildTreeListFilterEvent e)


树形单据列表，点击分组树节点，构建单据列表分组过滤条件




expendTreeNode
@Override
public void expendTreeNode(TreeNodeEvent e)


设置树形列表插件的展开节点


@param e 树节点展开事件


getTreeListView
public ITreeListView getTreeListView()


获取树行列表视图


@return 树形列表视图接口


getTreeModel
protected ITreeModel getTreeModel()


获取树行列表模型


@return


initTreeToolbar
@Override
public void initTreeToolbar(java.util.EventObject e)




initialize
@Override
public void initialize()




initializeTree
@Override
public void initializeTree(java.util.EventObject e)




nodeClickFilter
protected QFilter nodeClickFilter()


设置点击节点时list的过滤条件


@return 过滤条件


refreshNode
@Override
public void refreshNode(RefreshNodeEvent e)


刷新节点


@param e 刷新节点事件


registerListener
@Override
public void registerListener(java.util.EventObject e)




search
@Override
public void search(SearchEnterEvent evt)




setCustomerParam
public void setCustomerParam()


设置自定义参数




setTreeListView
@Override
public void setTreeListView(ITreeListView treeListView)




treeNodeClick
@Override
public void treeNodeClick(TreeNodeEvent e)


树中节点的点击处理方法


@param e 树节点事件


treeToolbarClick
@Override
public void treeToolbarClick(java.util.EventObject e)




