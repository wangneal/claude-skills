# AbstractQueryBuilder

> 来源: https://dev.kingdee.com/sdk/Cosmic%20V5.0.011/index.html?nav=class&name=AbstractQueryBuilder

SDK
模块
包
类
索引
树
插件
微服务
已过时
kd.bos.kddm > kd.bos.entity
上一个   下一个


类 AbstractQueryBuilder


直接已知子类:
QueryBuilder
@SdkPublic
public abstract class AbstractQueryBuilder


列表查询参数-抽象基类，定义列表取数时需设置的读取字段、过滤条件、排序字段等基本参数。

实际使用的列表查询参数 kd.bos.entity.list.QueryBuilder、
报表查询参数kd.bos.entity.report 均从此类派生




方法概要
限定符和类型	方法和说明	编号
public	AbstractQueryBuilder()
缺省构造函数，用于序列化	1
public	AbstractQueryBuilder(java.util.List<ListField> sumFields, String selectFields, QFilter[] filters, String orderBys, int start, int limit, IDataEntityType entityType)
查询参数初始化	2
public	AbstractQueryBuilder(AbstractQueryBuilder queryBuilder)
查询参数初始化	3
public IDataEntityType	getEntityType()
获取单据实体	4
public QFilter[]	getFilters()
获取过滤条件	5
public int	getLimit()
获取查询记录数	6
public String	getOrderBys()
获取排序	7
public String	getSelectFields()
获取查询字段	8
public int	getStart()
获取查询起始位置	9
public java.util.List<ListField>	getSumFields()
获取汇总字段	10
public int	getTimeOutSecends()
获取列表查询最大超过时间，默认为30秒	11
public void	setEntityType(IDataEntityType entityType)
设置单据实体	12
public void	setFilters(QFilter[] filters)
设置过滤条件	13
public void	setLimit(int limit)
设置查询记录数	14
public void	setOrderBys(String orderBys)
设置排序	15
public void	setSelectFields(String selectFields)
设置查询字段	16
public void	setStart(int start)
设置查询起始位置	17
public void	setSumFields(java.util.List<ListField> sumFields)
设置汇总字段	18
public void	setTimeOutSecends(int timeOutSecends)
设置列表查询最大超过时间，默认为30秒	19


方法详细资料
AbstractQueryBuilder
public AbstractQueryBuilder()


缺省构造函数，用于序列化




AbstractQueryBuilder
public AbstractQueryBuilder(java.util.List<ListField> sumFields, String selectFields, QFilter[] filters, String orderBys, int start, int limit, IDataEntityType entityType)


查询参数初始化


@param sumFields
@param selectFields
@param filters
@param orderBys
@param start
@param limit
@param entityType


AbstractQueryBuilder
public AbstractQueryBuilder(AbstractQueryBuilder queryBuilder)


查询参数初始化


@param queryBuilder


getEntityType
public IDataEntityType getEntityType()


获取单据实体


@return


getFilters
public QFilter[] getFilters()


获取过滤条件


@return


getLimit
public int getLimit()


获取查询记录数


@return


getOrderBys
public String getOrderBys()


获取排序


@return


getSelectFields
public String getSelectFields()


获取查询字段


@return


getStart
public int getStart()


获取查询起始位置


@return


getSumFields
public java.util.List<ListField> getSumFields()


获取汇总字段


@return


getTimeOutSecends
public int getTimeOutSecends()


获取列表查询最大超过时间，默认为30秒


@return


setEntityType
public void setEntityType(IDataEntityType entityType)


设置单据实体


@param entityType


setFilters
public void setFilters(QFilter[] filters)


设置过滤条件


@param filters


setLimit
public void setLimit(int limit)


设置查询记录数


@param limit


setOrderBys
public void setOrderBys(String orderBys)


设置排序


@param orderBys


setSelectFields
public void setSelectFields(String selectFields)


设置查询字段


@param selectFields


setStart
public void setStart(int start)


设置查询起始位置


@param start


setSumFields
public void setSumFields(java.util.List<ListField> sumFields)


设置汇总字段


@param sumFields


setTimeOutSecends
public void setTimeOutSecends(int timeOutSecends)


设置列表查询最大超过时间，默认为30秒


@param timeOutSecends


