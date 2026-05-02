# AbstractPrintServicePlugin

> 来源: https://dev.kingdee.com/sdk/Cosmic%20V5.0.011/index.html?nav=class&name=AbstractPrintServicePlugin

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


类 AbstractPrintServicePlugin


所有已实现的接口:
IPrintServicePlugin
直接已知子类:
AbstractKsPrintServicePlugin
@SdkPlugin(name="旧打印-打印插件基类")
public class AbstractPrintServicePlugin
implements IPrintServicePlugin


旧打印-打印插件基类




字段概要
限定符和类型	字段和说明	编号
protected MainEntityType	billEntityType
主实体类型	1


字段详细资料
billEntityType
protected MainEntityType billEntityType


主实体类型





方法概要
限定符和类型	方法和说明	编号
public MainEntityType	getBillEntityType()
获取主实体类型	1
public void	setContext(MainEntityType billEntityType)
设置主实体类型	2


方法详细资料
getBillEntityType
public MainEntityType getBillEntityType()


获取主实体类型




setContext
@Override
public void setContext(MainEntityType billEntityType)


设置主实体类型


@param billEntityType


