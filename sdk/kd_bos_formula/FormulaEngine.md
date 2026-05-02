# FormulaEngine


**模块**: kd.bos.formula

**类型**: CLASS

**父类**: 无

**说明**: 四则运算公式执行类

 二开业务通常不会直接调用此类，推荐调用<a href='?nav=class&package=kd.bos.entity.formula&name=CalcExprParser'>kd.bos.entity.formula.CalcExprParser</a>


```java
public class FormulaEngine
```


## 方法 (8 个)


### `execExcelFormula`

```java
java.lang.Object execExcelFormula(java.lang.String)
```

执行表达式

 适用于只有一个表达式,不存在参数变量的情况，
 例如：
 <pre><code>
     String formula = "right('hello', 2)";
     Object result = FormulaEngine.execExcelFormula(formula);
 </code></pre>


### `execExcelFormula`

```java
java.lang.Object execExcelFormula(java.lang.String, java.util.Map<java.lang.String,java.lang.Object>)
```

执行表达式

 适用于有表达式参数变量的情况
 例如：
 <pre><code>
     String formula = "v like '%bc%'";
     HashMap<String,Object> map = new HashMap<String,Object>();
     map.put("v", "abcd");
     Object result = FormulaEngine.execExcelFormula(formula,map);
 </code></pre>


### `execExcelFormula`

```java
java.lang.Object execExcelFormula(java.lang.String, java.util.Map<java.lang.String,java.lang.Object>, kd.bos.formula.excel.UDFunction[])
```

执行表达式

 适用于有自定义函数的情况
 例如：
 <pre><code>
     UDFunction funcLike = new UDFunction()
         {
             public String getName() {
                 return "contains";
             }

             public Object call(Object... params) {
                 String left = (String)params[0];
                 String right = (String)params[1];

                 return left.contains(right);
             }
         };
   String formula = "contains('abc','bc')";
   Object result = FormulaEngine.execExcelFormula(formula, Collections.<String,Object>emptyMap(), new UDFunction[]{funcLike});
 </code></pre>


### `execExcelFormula`

```java
java.lang.Object execExcelFormula(kd.bos.formula.excel.Expr)
```

执行表达式

 适用于已经解析好表达式的情况
 例如:
 <pre><code>
     String formula = "right('hello', 2)";
     Expr expr = FormulaEngine.parseFormula(formula);
     Object result = FormulaEngine.execExcelFormula(expr);
 </code></pre>


### `execExcelFormula`

```java
java.lang.Object execExcelFormula(kd.bos.formula.excel.Expr, java.util.Map<java.lang.String,java.lang.Object>)
```

执行表达式

 适用于存在表达式变量的情况
 例如：
 <pre><code>
     String formula = "v like '%bc%'";
     Expr expr = FormulaEngine.parseFormula(formula);
     HashMap<String,Object> map = new HashMap<String,Object>();
     map.put("v", "abcd");
     Object result = FormulaEngine.execExcelFormula(expr,map);
 </code></pre>


### `execExcelFormula`

```java
java.lang.Object execExcelFormula(kd.bos.formula.excel.Expr, java.util.Map<java.lang.String,java.lang.Object>, kd.bos.formula.excel.UDFunction[])
```

执行表达式

 适用于存在自定义函数的情况
 例如：
 <pre><code>
     UDFunction funcLike = new UDFunction()
         {

             public String getName() {
                 return "contains";
             }

             public Object call(Object... params) {
                 String left = (String)params[0];
                 String right = (String)params[1];

                 return left.contains(right);
             }
         };
   String formula = "contains('abc','bc')";
   Expr expr = FormulaEngine.parseFormula(formula);
   Object result = FormulaEngine.execExcelFormula(expr, Collections.<String,Object>emptyMap(), new UDFunction[]{funcLike});
 </code></pre>


### `extractVariables`

```java
java.lang.String[] extractVariables(java.lang.String)
```

提取表达式中包含的变量


### `parseFormula`

```java
kd.bos.formula.excel.Expr parseFormula(java.lang.String)
```

表达式解析

