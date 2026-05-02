# AbstractKsPrintServicePlugin

> 来源: https://dev.kingdee.com/sdk/Cosmic%20V5.0.011/index.html?nav=class&name=AbstractKsPrintServicePlugin

SDK
模块
包
类
索引
树
插件
微服务
已过时
kd.bos.kddm > kd.bos.entity.plugin
上一个   下一个


类 AbstractKsPrintServicePlugin


kd.bos.entity.plugin.AbstractPrintServicePlugin
kd.bos.entity.plugin.AbstractKsPrintServicePlugin


所有已实现的接口:
IPrintServicePlugin
@SdkPlugin(name="旧打印-打印ks脚本插件基类")
@KSObject
public class AbstractKsPrintServicePlugin
extends AbstractPrintServicePlugin


打印ks脚本插件基类




方法概要
限定符和类型	方法和说明	编号
public	AbstractKsPrintServicePlugin(IPrintServicePlugin plugin)
ks脚本插件构造方法	1
public void	afterOutputElement(OutputElementArgs e)
控件输出后事件	2
public void	beforeLoadData(BeforeLoadDataArgs e)
系统读取数据前执行的事件	3
public void	beforeOuputElement(OutputElementArgs e)
控件输出前事件	4
public void	customPrintDataEntities(CustomPrintDataEntitiesArgs e)
对系统读取的数据集进行加工或构造自定义数据包	5


方法详细资料
AbstractKsPrintServicePlugin
public AbstractKsPrintServicePlugin(IPrintServicePlugin plugin)


ks脚本插件构造方法


@param plugin 插件


afterOutputElement
@Override
@KSInsertMethod
public void afterOutputElement(OutputElementArgs e)


控件输出后事件


@param e


beforeLoadData
@Override
@KSInsertMethod
public void beforeLoadData(BeforeLoadDataArgs e)


系统读取数据前执行的事件


@param e


beforeOuputElement
@Override
@KSInsertMethod
public void beforeOuputElement(OutputElementArgs e)


控件输出前事件


@param e


customPrintDataEntities
@Override
@KSInsertMethod
public void customPrintDataEntities(CustomPrintDataEntitiesArgs e)


对系统读取的数据集进行加工或构造自定义数据包


@param e


