# BeforeExportFileEvent

> 来源: https://dev.kingdee.com/sdk/Cosmic%20V5.0.011/index.html?nav=class&name=BeforeExportFileEvent

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


类 BeforeExportFileEvent


java.util.EventObject
kd.bos.form.events.BeforeExportFileEvent


所有已实现的接口:
java.io.Serializable
直接已知子类:
ExportFileEvent
@SdkPublic
public class BeforeExportFileEvent
extends java.util.EventObject


列表引出文件前事件参数

列表引出文件事件ExportFileEvent继承了本类
应用于列表插件接口kd.bos.list.plugin.IListPlugin#beforeExportFile(BeforeExportFileEvent)上




方法概要
限定符和类型	方法和说明	编号
public	BeforeExportFileEvent(Object source)
构造方法：初始化列表引出文件前事件参数	1
public	BeforeExportFileEvent(IFormView view, BillEntityType mainEntityType, String fileName)
构造方法：初始化列表引出文件前事件参数	2
public String	getFileName()
获取文件名称	3
public BillEntityType	getMainEntityType()
获取单据实体类型	4
public void	setFileName(String fileName)
设置文件名称	5
public void	setMainEntityType(BillEntityType mainEntityType)
设置单据实体类型	6


方法详细资料
BeforeExportFileEvent
public BeforeExportFileEvent(Object source)


构造方法：初始化列表引出文件前事件参数


@param source 列表引出文件前事件参数


BeforeExportFileEvent
@SuppressWarnings(value="fb-contrib:PCOA_PARTIALLY_CONSTRUCTED_OBJECT_ACCESS")
public BeforeExportFileEvent(IFormView view, BillEntityType mainEntityType, String fileName)


构造方法：初始化列表引出文件前事件参数


@param view 表单视图
@param mainEntityType 单据实体类型
@param fileName 文件名称


getFileName
public String getFileName()


获取文件名称


@return 文件名称


getMainEntityType
public BillEntityType getMainEntityType()


获取单据实体类型


@return 单据实体类型


setFileName
public void setFileName(String fileName)


设置文件名称


@param fileName 文件名称


setMainEntityType
public void setMainEntityType(BillEntityType mainEntityType)


设置单据实体类型


@param mainEntityType 单据实体类型


