# AbstractMobBillPlugIn

> 来源: https://dev.kingdee.com/sdk/Cosmic%20V5.0.011/index.html?nav=class&name=AbstractMobBillPlugIn

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


类 AbstractMobBillPlugIn


AbstractFormPlugin
kd.bos.bill.AbstractBillPlugIn
kd.bos.bill.AbstractMobBillPlugIn


所有已实现的接口:
IBillPlugin
直接已知子类:
AbstractMobBasePlugIn
@SdkPlugin(name="移动端-单据-运行时视图层-插件抽象基类")
public class AbstractMobBillPlugIn
extends AbstractBillPlugIn


移动端单据视图层插件抽象基类

单据继承了动态表单的功能，插件基类也继承自动态表单。
开发单据视图层插件，需要从此类派生。




方法概要
限定符和类型	方法和说明	编号
public void	locate(LocateEvent e)
位置定位成功事件	1
public void	uploadFile(java.util.EventObject e)
上传文件成功事件	2


方法详细资料
locate
@Override
public void locate(LocateEvent e) throws UnsupportedOperationException


位置定位成功事件


@param e 事件参数


uploadFile
@Override
public void uploadFile(java.util.EventObject e) throws UnsupportedOperationException


上传文件成功事件


@param e 文件上传参数 ，kd.bos.form.control.events.UploadEvent 类型实例


