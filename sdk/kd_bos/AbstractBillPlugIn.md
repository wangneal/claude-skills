# AbstractBillPlugIn


**包路径**: kd.bos.bill

**类型**: CLASS

**父类**: AbstractFormPlugin

**实现接口**: kd.bos.bill.IBillPlugin

**说明**: 单据视图层插件抽象基类
 
 单据继承了动态表单的功能，插件基类也继承自动态表单。
 开发单据视图层插件，需要从此类派生。


```java
public class AbstractBillPlugIn extends AbstractFormPlugin implements kd.bos.bill.IBillPlugin
```


## 方法 (1 个)


### `registerListener`

```java
void registerListener(java.util.EventObject)
```

监听控件事件
 
 在基类中默认监听工具栏的菜单项点击事件，插件重写此方法时注意别全部覆盖了

