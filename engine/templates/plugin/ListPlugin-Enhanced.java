package ${PACKAGE_NAME};

import kd.bos.entity.list.AbstractListPlugin;
import kd.bos.entity.list.ListSelectedRowCollection;
import kd.bos.entity.datamodel.IDataModel;
import kd.bos.orm.query.QFilter;
import kd.bos.orm.query.QCP;
import kd.bos.logging.Log;
import kd.bos.logging.Logger;
import kd.bos.dataentity.entity.DynamicObject;
import kd.bos.servicehelper.QueryServiceHelper;
import kd.bos.exception.KDBizException;
import kd.bos.list.ListShowParameter;
import kd.bos.filter.FilterInfo;
import java.util.List;
import java.util.Date;
import ${CONSTANT_IMPORT};

/**
 * ${CLASS_NAME} - 列表插件（生产就绪版）
 *
 * <p>功能说明：${DESCRIPTION}</p>
 *
 * <p>创建日期：${DATE}</p>
 * <p>作者：${AUTHOR}</p>
 * <p>版本：1.0</p>
 */
public class ${CLASS_NAME} extends AbstractListPlugin {

    /** 日志记录器 */
    private static final Logger logger = Log.getLogger(${CLASS_NAME}.class);

    /** 默认每页记录数 */
    private static final int DEFAULT_PAGE_SIZE = 20;

    /** 最大每页记录数 */
    private static final int MAX_PAGE_SIZE = 1000;

    // ==================== 核心查询方法 ====================

    /**
     * 查询列表数据
     * <p>用途：执行列表数据查询并返回结果集</p>
     *
     * @param filter 过滤条件
     * @param startRow 起始行号（分页）
     * @param pageSize 每页记录数
     * @return 数据对象列表
     */
    public DynamicObject[] queryListData(QFilter filter, int startRow, int pageSize) {
        logger.info("列表查询开始 - 起始行: {}, 每页记录数: {}", startRow, pageSize);

        try {
            // 参数校验
            if (filter == null) {
                throw new KDBizException("过滤条件不能为空");
            }

            // 验证分页参数
            pageSize = validatePageSize(pageSize);
            logger.debug("验证后的分页大小: {}", pageSize);

            // 查询数据
            DynamicObject[] results = QueryServiceHelper.query(
                ${CONSTANT_CLASS}.ENTITY_NAME,
                buildSelectFields(),
                new QFilter[] { filter },
                null,
                startRow,
                pageSize
            );

            logger.info("查询完成，返回 {} 条数据", results.length);
            return results;

        } catch (Exception e) {
            logger.error("列表查询失败", e);
            throw new KDBizException("列表查询失败：" + e.getMessage());
        }
    }

    /**
     * 获取总记录数
     * <p>用途：查询符合条件的总记录数，用于分页计算</p>
     *
     * @param filter 过滤条件
     * @return 总记录数
     */
    public int getTotalCount(QFilter filter) {
        logger.info("获取总记录数开始");

        try {
            if (filter == null) {
                throw new KDBizException("过滤条件不能为空");
            }

            int count = QueryServiceHelper.getRowCount(
                ${CONSTANT_CLASS}.ENTITY_NAME,
                new QFilter[] { filter }
            );

            logger.info("总记录数: {}", count);
            return count;

        } catch (Exception e) {
            logger.error("获取总记录数失败", e);
            throw new KDBizException("获取总记录数失败：" + e.getMessage());
        }
    }

    // ==================== 过滤条件构建 ====================

    /**
     * 构建查询过滤条件
     * <p>用途：根据业务需求构建查询过滤条件</p>
     *
     * @param filterInfo 过滤信息
     * @return 过滤条件
     */
    protected QFilter buildQueryFilter(FilterInfo filterInfo) {
        logger.debug("构建查询过滤条件");

        // 基础过滤条件（已审核状态）
        QFilter filter = new QFilter(BaseCon.STATUS, QCP.equals, BaseCon.STATUS_AUDITED);

        // 添加日期范围过滤
        Date startDate = filterInfo.getDate(ListCons.FILTER_START_DATE);
        Date endDate = filterInfo.getDate(ListCons.FILTER_END_DATE);

        if (startDate != null) {
            filter.and(BaseCon.BIZDATE, QCP.large_equals, startDate);
            logger.debug("开始日期: {}", startDate);
        }

        if (endDate != null) {
            filter.and(BaseCon.BIZDATE, QCP.less_equals, endDate);
            logger.debug("结束日期: {}", endDate);
        }

        // 添加组织过滤
        String orgId = filterInfo.getString(ListCons.FILTER_ORG_ID);
        if (orgId != null && !orgId.isEmpty()) {
            filter.and(BaseCon.ORG, QCP.equals, orgId);
            logger.debug("组织ID: {}", orgId);
        }

        // 添加状态过滤
        String status = filterInfo.getString(ListCons.FILTER_STATUS);
        if (status != null && !status.isEmpty()) {
            filter.and(BaseCon.STATUS, QCP.equals, status);
            logger.debug("状态: {}", status);
        }

        // 添加关键字过滤（支持模糊查询）
        String keyword = filterInfo.getString(ListCons.FILTER_KEYWORD);
        if (keyword != null && !keyword.isEmpty()) {
            QFilter nameFilter = new QFilter(BaseCon.NAME, QCP.like, "%" + keyword + "%");
            QFilter numberFilter = new QFilter(BaseCon.NUMBER, QCP.like, "%" + keyword + "%");
            filter.and(nameFilter.or(numberFilter));
            logger.debug("关键字: {}", keyword);
        }

        logger.info("过滤条件构建完成");
        return filter;
    }

    /**
     * 构建排序条件
     * <p>用途：构建数据排序规则</p>
     *
     * @param sortField 排序字段
     * @param sortAsc 是否升序
     * @return 排序条件字符串
     */
    protected String buildSortCondition(String sortField, boolean sortAsc) {
        if (sortField == null || sortField.isEmpty()) {
            sortField = ListCons.SORT_CREATE_TIME;
            sortAsc = false;
        }

        String sortDirection = sortAsc ? "ASC" : "DESC";
        String sortCondition = sortField + " " + sortDirection;

        logger.debug("排序条件: {}", sortCondition);
        return sortCondition;
    }

    // ==================== 辅助方法 ====================

    /**
     * 构建查询字段
     * <p>用途：定义查询返回的字段列表</p>
     *
     * @return 字段列表字符串
     */
    protected String buildSelectFields() {
        return "id,name,number,billno,status,org,dept,creator,createtime,modifier,modifytime";
    }

    /**
     * 验证分页大小
     * <p>用途：确保分页大小在合理范围内</p>
     *
     * @param pageSize 分页大小
     * @return 验证后的分页大小
     */
    protected int validatePageSize(int pageSize) {
        if (pageSize <= 0) {
            logger.warn("分页大小无效: {}, 使用默认值: {}", pageSize, DEFAULT_PAGE_SIZE);
            return DEFAULT_PAGE_SIZE;
        }

        if (pageSize > MAX_PAGE_SIZE) {
            logger.warn("分页大小超过最大值: {}, 限制为: {}", pageSize, MAX_PAGE_SIZE);
            return MAX_PAGE_SIZE;
        }

        return pageSize;
    }

    /**
     * 计算总页数
     * <p>用途：根据总记录数和每页记录数计算总页数</p>
     *
     * @param totalCount 总记录数
     * @param pageSize 每页记录数
     * @return 总页数
     */
    protected int calculateTotalPages(int totalCount, int pageSize) {
        if (pageSize <= 0) {
            return 0;
        }

        int totalPages = (int) Math.ceil((double) totalCount / pageSize);
        logger.debug("总页数: {}", totalPages);
        return totalPages;
    }

    /**
     * 计算起始行号
     * <p>用途：根据页码计算起始行号</p>
     *
     * @param pageNumber 页码（从1开始）
     * @param pageSize 每页记录数
     * @return 起始行号
     */
    protected int calculateStartRow(int pageNumber, int pageSize) {
        if (pageNumber <= 0 || pageSize <= 0) {
            return 0;
        }

        int startRow = (pageNumber - 1) * pageSize;
        logger.debug("页码: {}, 起始行: {}", pageNumber, startRow);
        return startRow;
    }

    // ==================== 列表事件处理 ====================

    /**
     * 列表加载前事件
     * <p>用途：在列表加载前进行参数处理或权限检查</p>
     *
     * @param e 事件参数
     */
    @Override
    public void beforeLoadData(ListShowParameter e) {
        logger.info("列表加载前处理");

        try {
            // 获取过滤参数
            FilterInfo filterInfo = e.getFilterInfo();

            // 设置默认过滤条件
            setDefaultFilter(filterInfo);

            logger.info("默认过滤条件设置完成");

        } catch (Exception ex) {
            logger.error("列表加载前处理失败", ex);
        }
    }

    /**
     * 列表加载后事件
     * <p>用途：在列表加载后进行数据处理或格式化</p>
     *
     * @param e 事件参数
     */
    @Override
    public void afterLoadData(ListSelectedRowCollection e) {
        logger.info("列表加载后处理");

        try {
            // 可以在这里进行数据格式化或计算
            logger.info("列表数据加载完成");

        } catch (Exception ex) {
            logger.error("列表加载后处理失败", ex);
        }
    }

    /**
     * 设置默认过滤条件
     * <p>用途：设置列表的默认过滤条件</p>
     *
     * @param filterInfo 过滤信息
     */
    protected void setDefaultFilter(FilterInfo filterInfo) {
        // 示例：默认只显示当前用户创建的数据
        // Long currentUserId = UserServiceHelper.getCurrentUserId();
        // filterInfo.put(BaseCon.CREATOR, currentUserId);

        logger.debug("设置默认过滤条件");
    }

    // ==================== 扩展方法 ====================

    /**
     * 批量删除前校验
     * <p>用途：在批量删除前进行业务校验</p>
     *
     * @param selectedRows 选中的行数据
     * @return 是否允许删除
     */
    protected boolean validateBeforeDelete(ListSelectedRowCollection selectedRows) {
        logger.info("批量删除前校验，选中 {} 行", selectedRows.size());

        // 示例：检查状态是否允许删除
        for (DynamicObject row : selectedRows) {
            String status = row.getString(BaseCon.STATUS);
            if (BaseCon.STATUS_AUDITED.equals(status)) {
                logger.warn("已审核的数据不允许删除: {}", row.getLong(BaseCon.ID));
                return false;
            }
        }

        return true;
    }

    /**
     * 批量审核前校验
     * <p>用途：在批量审核前进行业务校验</p>
     *
     * @param selectedRows 选中的行数据
     * @return 是否允许审核
     */
    protected boolean validateBeforeAudit(ListSelectedRowCollection selectedRows) {
        logger.info("批量审核前校验，选中 {} 行", selectedRows.size());

        // 示例：检查状态是否允许审核
        for (DynamicObject row : selectedRows) {
            String status = row.getString(BaseCon.STATUS);
            if (!BaseCon.STATUS_DRAFT.equals(status)) {
                logger.warn("只有草稿状态的数据才能审核: {}", row.getLong(BaseCon.ID));
                return false;
            }
        }

        return true;
    }

    /**
     * 导出数据查询
     * <p>用途：查询导出数据（不分页）</p>
     *
     * @param filter 过滤条件
     * @return 数据对象列表
     */
    public DynamicObject[] queryExportData(QFilter filter) {
        logger.info("导出数据查询开始");

        try {
            DynamicObject[] results = QueryServiceHelper.query(
                ${CONSTANT_CLASS}.ENTITY_NAME,
                buildSelectFields(),
                new QFilter[] { filter }
            );

            logger.info("导出数据查询完成，返回 {} 条数据", results.length);
            return results;

        } catch (Exception e) {
            logger.error("导出数据查询失败", e);
            throw new KDBizException("导出数据查询失败：" + e.getMessage());
        }
    }
}
