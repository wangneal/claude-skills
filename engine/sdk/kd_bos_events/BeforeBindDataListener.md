# BeforeBindDataListener

> 来源: https://dev.kingdee.com/sdk/Cosmic%20V5.0.011/index.html?nav=class&name=BeforeBindDataListener

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


接口 BeforeBindDataListener


@SdkPublic
public interface BeforeBindDataListener


绑定数据前事件接口

应用于过滤容器kd.bos.filter.FilterContainer#addBeforeBindDataListener(BeforeBindDataListener)、
单据列表控件kd.bos.list.BillList#addBeforeBindDataListener(BeforeBindDataListener)、
移动搜索控件kd.bos.list.MobileSearch#addBeforeBindDataListener(BeforeBindDataListener)上




方法概要
限定符和类型	方法和说明	编号
void	beforeBindData(BeforeBindDataEvent evt)
绑定数据前事件	1


方法详细资料
beforeBindData
void beforeBindData(BeforeBindDataEvent evt)


绑定数据前事件


@param evt 绑定数据前事件参数


