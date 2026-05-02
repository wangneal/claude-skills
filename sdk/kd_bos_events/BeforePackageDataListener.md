# BeforePackageDataListener

> 来源: https://dev.kingdee.com/sdk/Cosmic%20V5.0.011/index.html?nav=class&name=BeforePackageDataListener

SDK
模块
包
类
索引
树
插件
微服务
已过时
kd.bos.kddm > kd.bos.entity.list.events
上一个   下一个


接口 BeforePackageDataListener


@SdkPlugin(name="运行时控件-插件事件接口-单据列表控件-格式化事件")
public interface BeforePackageDataListener


单据列表控件，插件事件接口，提供格式化前事件

动态表单单独添加"单据列表"控件后，可开发插件控制此控件的数据格式化
示例：
 

public class DemoFormPlugin extends AbstractFormPlugin implements BeforePackageDataListener {</code>




方法概要
限定符和类型	方法和说明	编号
void	beforePackageData(BeforePackageDataEvent evt)
列表数据格式化前事件	1


方法详细资料
beforePackageData
void beforePackageData(BeforePackageDataEvent evt)


列表数据格式化前事件

插件可以在此事件，修改列表数据中的字段值，从而影响列表显示


@param evt 事件参数，含列表数据


