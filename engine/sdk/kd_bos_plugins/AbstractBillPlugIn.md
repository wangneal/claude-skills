# AbstractBillPlugIn

> 来源: https://dev.kingdee.com/sdk/Cosmic%20V5.0.011/index.html?nav=class&name=AbstractBillPlugIn

SDK
模块
包
类
索引
树
插件
微服务
已过时
kd.bos.kddm > kd.bos.bill
上一个   下一个


类 AbstractBillPlugIn


AbstractFormPlugin
kd.bos.bill.AbstractBillPlugIn


所有已实现的接口:
IBillPlugin
直接已知子类:
AbstractBasePlugIn, AbstractMobBillPlugIn
@SdkPlugin(name="单据-运行时视图层-插件抽象基类")
public class AbstractBillPlugIn
extends AbstractFormPlugin
implements IBillPlugin


单据视图层插件抽象基类

单据继承了动态表单的功能，插件基类也继承自动态表单。
开发单据视图层插件，需要从此类派生。




方法概要
限定符和类型	方法和说明	编号
public void	registerListener(java.util.EventObject e)
监听控件事件	1


方法详细资料
registerListener
@Override
public void registerListener(java.util.EventObject e)


监听控件事件

在基类中默认监听工具栏的菜单项点击事件，插件重写此方法时注意别全部覆盖了




