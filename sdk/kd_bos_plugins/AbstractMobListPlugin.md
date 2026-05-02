# AbstractMobListPlugin

> 来源: https://dev.kingdee.com/sdk/Cosmic%20V5.0.011/index.html?nav=class&name=AbstractMobListPlugin

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


类 AbstractMobListPlugin


AbstractMobFormPlugin
kd.bos.list.plugin.AbstractMobListPlugin


所有已实现的接口:
ListRowClickListener, IMobListPlugin, IListPlugin
@SdkPublic
public class AbstractMobListPlugin
extends AbstractMobFormPlugin
implements ListRowClickListener, IMobListPlugin


移动端列表插件基类




方法概要
限定符和类型	方法和说明	编号
public void	afterPushDownRefresh(AfterMobileListPushDownRefreshEvent evt)	1
public void	mobFilterSortAfterSearchClick(MobFilterSortSearchClickArgs args)	2
public void	mobFilterSortBeforeF7Select(BeforeFilterF7SelectEvent args)	3
public void	mobFilterSortInit(MobFilterSortInitArgs args)	4
public void	mobFilterSortSearchClick(MobFilterSortSearchClickArgs args)	5
public void	mobileSearchFocus()	6
public void	mobileSearchInit(MobileSearchInitEvent args)	7
public void	mobileSearchTextChange(MobileSearchTextChangeEvent args)	8


方法详细资料
afterPushDownRefresh
@Override
public void afterPushDownRefresh(AfterMobileListPushDownRefreshEvent evt)




mobFilterSortAfterSearchClick
@Override
public void mobFilterSortAfterSearchClick(MobFilterSortSearchClickArgs args)




mobFilterSortBeforeF7Select
@Override
public void mobFilterSortBeforeF7Select(BeforeFilterF7SelectEvent args)




mobFilterSortInit
@Override
public void mobFilterSortInit(MobFilterSortInitArgs args)




mobFilterSortSearchClick
@Override
public void mobFilterSortSearchClick(MobFilterSortSearchClickArgs args)




mobileSearchFocus
@Override
public void mobileSearchFocus()




mobileSearchInit
@Override
public void mobileSearchInit(MobileSearchInitEvent args)




mobileSearchTextChange
@Override
public void mobileSearchTextChange(MobileSearchTextChangeEvent args)




