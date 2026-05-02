# BeforeFilterF7SelectListener

> 来源: https://dev.kingdee.com/sdk/Cosmic%20V5.0.011/index.html?nav=class&name=BeforeFilterF7SelectListener

SDK
模块
包
类
索引
树
插件
微服务
已过时
kd.bos.kddm > kd.bos.form.field.events
上一个   下一个


接口 BeforeFilterF7SelectListener


@SdkPublic
public interface BeforeFilterF7SelectListener


选择基础资料前（弹出过滤窗口前）事件监听器接口

应用于过滤容器kd.bos.filter.FilterContainer#addBeforeF7SelectListener(BeforeFilterF7SelectListener)、
移动端过滤排序kd.bos.filter.mcontrol.MobFilterSort#addBeforeF7SelectListener(BeforeFilterF7SelectListener)、
通用过滤控件kd.bos.form.control.FilterGrid#addBeforeF7SelectListener(BeforeFilterF7SelectListener)上




方法概要
限定符和类型	方法和说明	编号
public void	beforeF7Select(BeforeFilterF7SelectEvent evt)
选择基础资料前（弹出过滤窗口前）事件	1


方法详细资料
beforeF7Select
public void beforeF7Select(BeforeFilterF7SelectEvent evt)


选择基础资料前（弹出过滤窗口前）事件


@param evt 过滤容器F7弹出之前事件参数


