# AfterMobileListPushDownRefreshListener

> 来源: https://dev.kingdee.com/sdk/Cosmic%20V5.0.011/index.html?nav=class&name=AfterMobileListPushDownRefreshListener

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


接口 AfterMobileListPushDownRefreshListener


@SdkPublic
public interface AfterMobileListPushDownRefreshListener


移动端列表下拉刷新事件接口

移动端列表插件接口kd.bos.list.plugin.IMobListPlugin继承了本类
应用于单据列表控件kd.bos.list.BillList#addMobileListPushDownRefreshistener(AfterMobileListPushDownRefreshListener)上




方法概要
限定符和类型	方法和说明	编号
void	afterPushDownRefresh(AfterMobileListPushDownRefreshEvent evt)
移动端列表下拉刷新界面事件	1


方法详细资料
afterPushDownRefresh
void afterPushDownRefresh(AfterMobileListPushDownRefreshEvent evt)


移动端列表下拉刷新界面事件


@param evt 移动端列表下拉刷新界面事件参数


