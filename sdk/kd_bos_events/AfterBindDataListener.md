# AfterBindDataListener

> 来源: https://dev.kingdee.com/sdk/Cosmic%20V5.0.011/index.html?nav=class&name=AfterBindDataListener

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


接口 AfterBindDataListener


@SdkPublic
public interface AfterBindDataListener


绑定数据后事件接口

应用于过滤容器kd.bos.filter.FilterContainer#addAfterBindDataListener(AfterBindDataListener)、
移动端过滤排序kd.bos.filter.mcontrol.MobFilterSort#addAfterBindDataListener(AfterBindDataListener)、
单据列表控件kd.bos.list.BillList#addAfterBindDataListener(AfterBindDataListener)、
移动搜索控件kd.bos.list.MobileSearch#addAfterBindDataListener(AfterBindDataListener)上




方法概要
限定符和类型	方法和说明	编号
void	afterBindData(AfterBindDataEvent evt)
绑定数据后事件	1


方法详细资料
afterBindData
void afterBindData(AfterBindDataEvent evt)


绑定数据后事件


@param evt 绑定数据后事件参数


