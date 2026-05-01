package ${PACKAGE_NAME};

import kd.bos.logging.Log;
import kd.bos.logging.Logger;
import kd.bos.dataentity.entity.DynamicObject;
import kd.bos.servicehelper.BusinessDataServiceHelper;
import kd.bos.exception.KDBizException;

/**
 * 异常处理模板库
 * 提供统一的异常处理模式
 *
 * <p>说明：此模板库展示金蝶开发中的标准异常处理模式</p>
 *
 * <p>创建日期：${DATE}</p>
 * <p>作者：${AUTHOR}</p>
 * <p>版本：1.0</p>
 */
public class ExceptionTemplates {

    private static final Logger logger = Log.getLogger(ExceptionTemplates.class);

    // ==================== 1. 基础异常处理 ====================

    /**
     * 模板 1: 基础 try-catch
     * <p>用途：最基础的异常处理模式</p>
     */
    public void basicTryCatch() {
        try {
            // 业务逻辑
            logger.debug("执行业务逻辑");

        } catch (Exception e) {
            logger.error("操作失败", e);
            throw new KDBizException("操作失败：" + e.getMessage());
        }
    }

    /**
     * 模板 2: 带返回值的异常处理
     * <p>用途：方法需要返回值的异常处理</p>
     *
     * @return 处理结果，失败返回 null
     */
    public Object tryCatchWithReturn() {
        try {
            // 业务逻辑
            Object result = new Object();
            logger.debug("处理完成");
            return result;

        } catch (Exception e) {
            logger.error("查询失败", e);
            return null; // 或返回默认值
        }
    }

    // ==================== 2. 数据操作异常处理 ====================

    /**
     * 模板 3: 数据保存异常处理
     * <p>用途：保存数据时的完整异常处理</p>
     *
     * @param data 数据对象
     */
    public void saveWithExceptionHandling(DynamicObject data) {
        try {
            // 数据校验
            if (data == null) {
                throw new KDBizException("数据不能为空");
            }

            // 保存数据
            BusinessDataServiceHelper.save(data);
            logger.info("数据保存成功: {}", data.getLong("id"));

        } catch (KDBizException e) {
            // 业务异常，直接抛出
            logger.warn("业务校验失败: {}", e.getMessage());
            throw e;

        } catch (Exception e) {
            logger.error("数据保存失败", e);
            throw new KDBizException("保存失败：" + e.getMessage());
        }
    }

    /**
     * 模板 4: 数据查询异常处理
     * <p>用途：查询数据时的完整异常处理</p>
     *
     * @param id 数据ID
     * @return 数据对象，未找到返回 null
     */
    public DynamicObject queryWithExceptionHandling(Long id) {
        try {
            // 参数校验
            if (id == null || id <= 0) {
                throw new KDBizException("ID 无效");
            }

            // 查询数据
            DynamicObject data = BusinessDataServiceHelper.loadSingle(
                "entity_name",
                id
            );

            if (data == null) {
                logger.warn("未找到数据: ID={}", id);
                return null;
            }

            logger.debug("查询成功: ID={}", id);
            return data;

        } catch (KDBizException e) {
            // 业务异常
            throw e;

        } catch (Exception e) {
            logger.error("查询数据失败: ID={}", id, e);
            throw new KDBizException("查询失败：" + e.getMessage());
        }
    }

    // ==================== 3. 批量操作异常处理 ====================

    /**
     * 模板 5: 批量操作异常处理
     * <p>用途：批量处理数据时的异常处理</p>
     *
     * @param dataList 数据列表
     */
    public void batchOperationWithExceptionHandling(DynamicObject[] dataList) {
        int successCount = 0;
        int failCount = 0;

        logger.info("开始批量处理: 总数={}", dataList.length);

        for (DynamicObject data : dataList) {
            try {
                // 单条数据处理
                processSingleData(data);
                successCount++;

            } catch (Exception e) {
                failCount++;
                logger.error("处理数据失败: ID={}",
                    data.getLong("id"), e);
                // 继续处理下一条
            }
        }

        logger.info("批量处理完成: 成功={}, 失败={}",
            successCount, failCount);

        if (failCount > 0) {
            throw new KDBizException(
                String.format("部分数据处理失败: 成功 %d, 失败 %d",
                    successCount, failCount)
            );
        }
    }

    // ==================== 4. 事务异常处理 ====================

    /**
     * 模板 6: 事务性操作异常处理
     * <p>用途：需要事务控制的操作异常处理</p>
     *
     * @param data 数据对象
     */
    public void transactionalOperation(DynamicObject data) {
        try {
            // 开启事务（示例，实际使用事务API）
            logger.debug("开始事务");

            // 业务操作 1
            operation1(data);

            // 业务操作 2
            operation2(data);

            // 提交事务
            logger.debug("提交事务");
            logger.info("事务操作成功");

        } catch (Exception e) {
            // 回滚事务
            logger.error("事务操作失败，已回滚", e);
            throw new KDBizException("操作失败：" + e.getMessage());
        }
    }

    // ==================== 5. 参数校验异常处理 ====================

    /**
     * 模板 7: 参数校验异常处理
     * <p>用途：方法参数校验的异常处理</p>
     *
     * @param param1 参数1
     * @param param2 参数2
     */
    public void validateParameters(Object param1, Object param2) {
        // 参数非空校验
        if (param1 == null) {
            throw new KDBizException("参数 1 不能为空");
        }

        if (param2 == null) {
            throw new KDBizException("参数 2 不能为空");
        }

        // 业务规则校验
        if (!isValidParam(param1)) {
            throw new KDBizException("参数 1 格式不正确");
        }

        // 继续业务逻辑
        logger.debug("参数校验通过");
    }

    // ==================== 辅助方法 ====================

    private boolean isValidParam(Object param) {
        return param != null; // 示例
    }

    private void processSingleData(DynamicObject data) {
        // 示例方法
        logger.debug("处理数据: {}", data.getLong("id"));
    }

    private void operation1(DynamicObject data) {
        // 示例方法
        logger.debug("操作1: {}", data.getLong("id"));
    }

    private void operation2(DynamicObject data) {
        // 示例方法
        logger.debug("操作2: {}", data.getLong("id"));
    }
}
