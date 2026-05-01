package ${PACKAGE_NAME};

import kd.bos.algo.*;
import kd.bos.entity.report.AbstractReportListDataPlugin;
import kd.bos.entity.report.ReportQueryParam;
import kd.bos.entity.report.FilterInfo;
import kd.bos.orm.query.QFilter;
import kd.bos.orm.query.QCP;
import kd.bos.logging.Log;
import kd.bos.logging.Logger;
import kd.bos.dataentity.entity.DynamicObject;
import kd.bos.servicehelper.QueryServiceHelper;
import kd.bos.exception.KDBizException;
import java.util.List;
import java.util.Arrays;
import java.util.Date;
import ${CONSTANT_IMPORT};

/**
 * ${CLASS_NAME} - 报表插件（生产就绪版）
 *
 * <p>功能说明：${DESCRIPTION}</p>
 *
 * <p>创建日期：${DATE}</p>
 * <p>作者：${AUTHOR}</p>
 * <p>版本：1.0</p>
 */
public class ${CLASS_NAME} extends AbstractReportListDataPlugin {

    /** 日志记录器 */
    private static final Logger logger = Log.getLogger(${CLASS_NAME}.class);

    // ==================== 字段定义 ====================

    /**
     * 报表字段列表
     * <p>定义报表输出的所有字段及其数据类型</p>
     */
    private List<Field> fields = Arrays.asList(
        // 主键字段
        new Field(ReportCons.KEY_ID, DataType.LongType),

        // 基础字段
        new Field(ReportCons.KEY_NAME, DataType.StringType),
        new Field(ReportCons.KEY_NUMBER, DataType.StringType),
        new Field(ReportCons.KEY_BILLNO, DataType.StringType),

        // 业务字段
        new Field(ReportCons.KEY_QTY, DataType.BigDecimalType),
        new Field(ReportCons.KEY_AMOUNT, DataType.BigDecimalType),

        // 日期字段
        new Field(ReportCons.KEY_DATE, DataType.DateType),

        // 状态字段
        new Field(ReportCons.KEY_STATUS, DataType.StringType),

        // 组织字段
        new Field(ReportCons.KEY_ORG, DataType.StringType),
        new Field(ReportCons.KEY_DEPT, DataType.StringType)
    );

    // ==================== 核心查询方法 ====================

    /**
     * 报表数据查询
     * <p>用途：执行报表数据查询并返回结果集</p>
     *
     * @param param 查询参数
     * @param o 额外参数
     * @return 数据集
     */
    @Override
    public DataSet query(ReportQueryParam param, Object o) throws Throwable {
        logger.info("报表查询开始");

        try {
            // 1. 创建 Algo 键和 RowMeta
            String algoKey = this.getClass().getName();
            RowMeta rowMeta = createRowMeta();
            DataSetBuilder builder = Algo.create(algoKey).createDataSetBuilder(rowMeta);

            logger.debug("Algo 键: {}, 字段数量: {}", algoKey, fields.size());

            // 2. 构建查询条件
            QFilter filter = buildQueryFilter(param);
            logger.debug("查询条件构建完成");

            // 3. 查询数据
            DynamicObject[] results = queryData(filter);
            logger.info("查询到 {} 条数据", results.length);

            // 4. 填充数据
            populateData(builder, results);

            // 5. 构建数据集
            DataSet result = builder.build();
            logger.info("报表查询完成");

            return result;

        } catch (Exception e) {
            logger.error("报表查询失败", e);
            throw new KDBizException("报表查询失败：" + e.getMessage());
        }
    }

    // ==================== 辅助方法 ====================

    /**
     * 创建行元数据
     * <p>用途：定义报表结果集的字段结构</p>
     *
     * @return RowMeta 行元数据
     */
    private RowMeta createRowMeta() {
        return new RowMeta(fields.toArray(new Field[0]));
    }

    /**
     * 构建查询条件
     * <p>用途：根据查询参数构建过滤条件</p>
     *
     * @param param 查询参数
     * @return 过滤条件
     */
    private QFilter buildQueryFilter(ReportQueryParam param) {
        FilterInfo filterInfo = param.getFilter();

        // 基础过滤条件（已审核状态）
        QFilter filter = new QFilter(BaseCon.STATUS, QCP.equals, BaseCon.STATUS_AUDITED);

        // 添加日期范围过滤
        Date startDate = filterInfo.getDate("start_date");
        Date endDate = filterInfo.getDate("end_date");

        if (startDate != null) {
            filter.and(BaseCon.BIZDATE, QCP.large_equals, startDate);
            logger.debug("开始日期: {}", startDate);
        }

        if (endDate != null) {
            filter.and(BaseCon.BIZDATE, QCP.less_equals, endDate);
            logger.debug("结束日期: {}", endDate);
        }

        // 添加组织过滤
        String orgId = filterInfo.getString("org_id");
        if (orgId != null && !orgId.isEmpty()) {
            filter.and(BaseCon.ORG, QCP.equals, orgId);
            logger.debug("组织ID: {}", orgId);
        }

        // 添加状态过滤
        String status = filterInfo.getString("status");
        if (status != null && !status.isEmpty()) {
            filter.and(BaseCon.STATUS, QCP.equals, status);
            logger.debug("状态: {}", status);
        }

        return filter;
    }

    /**
     * 查询数据
     * <p>用途：执行数据库查询获取原始数据</p>
     *
     * @param filter 过滤条件
     * @return 数据对象数组
     */
    private DynamicObject[] queryData(QFilter filter) {
        return QueryServiceHelper.query(
            ${CONSTANT_CLASS}.ENTITY_NAME,
            "id,name,number,billno,qty,amount,date,status,org,dept",
            new QFilter[] { filter }
        );
    }

    /**
     * 填充数据
     * <p>用途：将查询结果填充到数据集中</p>
     *
     * @param builder 数据集构建器
     * @param results 查询结果
     */
    private void populateData(DataSetBuilder builder, DynamicObject[] results) {
        for (DynamicObject obj : results) {
            DataRow row = builder.createRow();

            try {
                // 设置字段值（按字段定义顺序）
                row.setLong(0, obj.getLong(BaseCon.ID));
                row.setString(1, obj.getString(BaseCon.NAME));
                row.setString(2, obj.getString(BaseCon.NUMBER));
                row.setString(3, obj.getString(BaseCon.BILLNO));
                row.setBigDecimal(4, obj.getBigDecimal(ReportCons.KEY_QTY));
                row.setBigDecimal(5, obj.getBigDecimal(ReportCons.KEY_AMOUNT));
                row.setDate(6, obj.getDate(BaseCon.BIZDATE));
                row.setString(7, obj.getString(BaseCon.STATUS));
                row.setString(8, obj.getString(BaseCon.ORG));
                row.setString(9, obj.getString(BaseCon.DEPT));

            } catch (Exception e) {
                logger.error("填充数据行失败: {}", obj.getLong(BaseCon.ID), e);
                // 继续处理下一行
            }
        }
    }

    // ==================== 可选扩展方法 ====================

    /**
     * 数据预处理（可选）
     * <p>用途：在查询前对参数进行预处理</p>
     *
     * @param param 查询参数
     */
    protected void beforeQuery(ReportQueryParam param) {
        // 子类可重写此方法进行数据预处理
        logger.debug("数据预处理");
    }

    /**
     * 数据后处理（可选）
     * <p>用途：在数据填充后进行额外处理</p>
     *
     * @param dataSet 数据集
     */
    protected void afterQuery(DataSet dataSet) {
        // 子类可重写此方法进行数据后处理
        logger.debug("数据后处理");
    }
}
