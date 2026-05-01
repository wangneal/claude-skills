package ${PACKAGE_NAME};

import kd.bos.logging.Log;
import kd.bos.logging.Logger;
import kd.bos.dataentity.entity.DynamicObject;

/**
 * 日志记录模板库
 * 提供统一的日志记录最佳实践
 *
 * <p>说明：此模板库展示金蝶开发中的标准日志记录模式</p>
 *
 * <p>创建日期：${DATE}</p>
 * <p>作者：${AUTHOR}</p>
 * <p>版本：1.0</p>
 */
public class LoggingTemplates {

    private static final Logger logger = Log.getLogger(LoggingTemplates.class);

    // ==================== 1. 日志级别使用 ====================

    /**
     * 模板 1: INFO 日志 - 关键操作
     * <p>用途：记录关键业务操作的开始和完成</p>
     */
    public void infoLoggingExample() {
        logger.info("开始处理订单");
        // 业务逻辑
        logger.info("订单处理完成: 订单号={}", "ORD001");
    }

    /**
     * 模板 2: DEBUG 日志 - 调试信息
     * <p>用途：记录调试信息和详细数据</p>
     *
     * @param data 数据对象
     */
    public void debugLoggingExample(DynamicObject data) {
        logger.debug("查询条件: ID={}", data.getLong("id"));
        // 业务逻辑
        logger.debug("查询结果: {}", data.getString("name"));
    }

    /**
     * 模板 3: WARN 日志 - 警告信息
     * <p>用途：记录异常情况但非错误</p>
     *
     * @param data 数据对象
     */
    public void warnLoggingExample(Object data) {
        if (data == null) {
            logger.warn("数据为空，使用默认值");
            // 使用默认值
        }
    }

    /**
     * 模板 4: ERROR 日志 - 错误信息
     * <p>用途：记录错误和异常信息</p>
     */
    public void errorLoggingExample() {
        try {
            // 业务逻辑
            throw new Exception("测试异常");

        } catch (Exception e) {
            logger.error("处理失败: ID={}", "123", e);
            throw new RuntimeException("处理失败", e);
        }
    }

    // ==================== 2. 方法级日志 ====================

    /**
     * 模板 5: 方法入口/出口日志
     * <p>用途：记录方法的执行过程</p>
     *
     * @param param 参数
     * @return 处理结果
     */
    public Object methodWithEntryExitLogging(String param) {
        logger.info("方法开始: param={}", param);

        try {
            // 业务逻辑
            Object result = processData(param);

            logger.info("方法结束: result={}", result);
            return result;

        } catch (Exception e) {
            logger.error("方法异常: param={}", param, e);
            throw e;
        }
    }

    // ==================== 3. 性能日志 ====================

    /**
     * 模板 6: 性能计时日志
     * <p>用途：记录操作耗时，识别性能问题</p>
     */
    public void performanceLoggingExample() {
        long startTime = System.currentTimeMillis();

        try {
            // 业务逻辑
            processLargeData();

        } finally {
            long elapsed = System.currentTimeMillis() - startTime;
            logger.info("处理耗时: {} ms", elapsed);

            // 性能预警
            if (elapsed > 5000) {
                logger.warn("处理时间过长: {} ms", elapsed);
            }
        }
    }

    // ==================== 4. 数据日志 ====================

    /**
     * 模板 7: 数据变更日志
     * <p>用途：记录关键字段的数据变更</p>
     *
     * @param oldData 旧数据
     * @param newData 新数据
     */
    public void dataChangeLoggingExample(DynamicObject oldData, DynamicObject newData) {
        String oldValue = oldData.getString("status");
        String newValue = newData.getString("status");

        if (!oldValue.equals(newValue)) {
            logger.info("状态变更: {} -> {}, ID={}",
                oldValue, newValue, newData.getLong("id"));
        }
    }

    /**
     * 模板 8: 批量操作进度日志
     * <p>用途：记录批量处理的进度</p>
     *
     * @param dataList 数据列表
     */
    public void batchProgressLoggingExample(DynamicObject[] dataList) {
        int total = dataList.length;
        int processed = 0;

        logger.info("开始批量处理: 总数={}", total);

        for (DynamicObject data : dataList) {
            // 处理数据
            processSingleData(data);
            processed++;

            // 每 100 条记录一次进度
            if (processed % 100 == 0) {
                logger.info("处理进度: {}/{} ({}%)",
                    processed, total,
                    (processed * 100 / total));
            }
        }

        logger.info("批量处理完成: 总数={}, 成功={}", total, processed);
    }

    // ==================== 5. 业务流程日志 ====================

    /**
     * 模板 9: 审批流程日志
     * <p>用途：记录工作流审批过程</p>
     *
     * @param data 单据数据
     */
    public void workflowLoggingExample(DynamicObject data) {
        logger.info("流程启动: 单据ID={}", data.getLong("id"));

        // 流程处理
        logger.debug("审批人: {}", data.getString("approver"));
        logger.info("审批通过: 单据ID={}", data.getLong("id"));

        logger.info("流程结束: 单据ID={}", data.getLong("id"));
    }

    /**
     * 模板 10: API 调用日志
     * <p>用途：记录外部 API 调用</p>
     *
     * @param apiUrl API 地址
     * @param request 请求参数
     */
    public void apiCallLoggingExample(String apiUrl, Object request) {
        logger.info("API 调用开始: URL={}", apiUrl);
        logger.debug("请求参数: {}", request);

        try {
            Object response = callExternalApi(apiUrl, request);

            logger.info("API 调用成功: URL={}", apiUrl);
            logger.debug("响应结果: {}", response);

        } catch (Exception e) {
            logger.error("API 调用失败: URL={}", apiUrl, e);
            throw e;
        }
    }

    // ==================== 辅助方法 ====================

    private Object processData(String param) {
        logger.debug("处理数据: {}", param);
        return "result: " + param;
    }

    private void processLargeData() {
        logger.debug("处理大量数据");
        // 示例
    }

    private void processSingleData(DynamicObject data) {
        logger.debug("处理单条数据: {}", data.getLong("id"));
        // 示例
    }

    private Object callExternalApi(String url, Object request) {
        logger.debug("调用外部 API: {}", url);
        return new Object(); // 示例
    }
}
