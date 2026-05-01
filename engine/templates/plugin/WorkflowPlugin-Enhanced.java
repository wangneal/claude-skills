package ${PACKAGE_NAME};

import kd.bos.workflow.plugin.AbstractWorkflowPlugin;
import kd.bos.workflow.plugin.event.*;
import kd.bos.logging.Log;
import kd.bos.logging.Logger;
import kd.bos.dataentity.entity.DynamicObject;
import kd.bos.servicehelper.QueryServiceHelper;
import kd.bos.servicehelper.BusinessDataServiceHelper;
import kd.bos.servicehelper.WorkflowServiceHelper;
import kd.bos.orm.query.QFilter;
import kd.bos.orm.query.QCP;
import kd.bos.exception.KDBizException;
import ${CONSTANT_IMPORT};

/**
 * ${CLASS_NAME} - 工作流插件（生产就绪版）
 *
 * <p>功能说明：${DESCRIPTION}</p>
 *
 * <p>创建日期：${DATE}</p>
 * <p>作者：${AUTHOR}</p>
 * <p>版本：1.0</p>
 */
public class ${CLASS_NAME} extends AbstractWorkflowPlugin {

    /** 日志记录器 */
    private static final Logger logger = Log.getLogger(${CLASS_NAME}.class);

    // ==================== 流程启动事件 ====================

    /**
     * 流程启动前校验
     * <p>用途：数据完整性校验、业务规则验证</p>
     *
     * @param evt 事件参数
     */
    @Override
    public void beforeStartWorkflow(BeforeStartWorkflowEvent evt) {
        logger.info("流程启动校验开始");

        try {
            DynamicObject data = evt.getModel().getDataEntity();

            // 数据完整性校验
            if (!validateDataIntegrity(data)) {
                evt.setCancel(true);
                evt.setCancelMessage("数据不完整，请检查必填字段");
                logger.warn("流程启动校验失败：数据不完整");
                return;
            }

            // 业务规则校验
            if (!validateBusinessRules(data)) {
                evt.setCancel(true);
                evt.setCancelMessage("业务规则校验失败");
                logger.warn("流程启动校验失败：业务规则");
                return;
            }

            logger.info("流程启动校验通过");

        } catch (Exception e) {
            logger.error("流程启动校验异常", e);
            evt.setCancel(true);
            evt.setCancelMessage("校验异常：" + e.getMessage());
        }
    }

    /**
     * 流程启动后处理
     * <p>用途：记录日志、发送通知</p>
     *
     * @param evt 事件参数
     */
    @Override
    public void afterStartWorkflow(AfterStartWorkflowEvent evt) {
        logger.info("流程启动成功");

        try {
            DynamicObject data = evt.getModel().getDataEntity();

            // 更新单据状态
            data.set(BaseCon.STATUS, BaseCon.STATUS_SUBMITTED);
            BusinessDataServiceHelper.save(data);

            // 发送通知
            sendNotification(data, "流程已启动");

            logger.info("流程启动后处理完成");

        } catch (Exception e) {
            logger.error("流程启动后处理失败", e);
        }
    }

    // ==================== 审批事件 ====================

    /**
     * 审批通过前校验
     * <p>用途：审批权限校验、前置条件检查</p>
     *
     * @param evt 事件参数
     */
    @Override
    public void beforePassAudit(BeforePassAuditEvent evt) {
        logger.info("审批通过前校验");

        try {
            DynamicObject data = evt.getModel().getDataEntity();

            // 审批权限校验
            if (!checkApprovalPermission(data)) {
                evt.setCancel(true);
                evt.setCancelMessage("无审批权限");
                logger.warn("审批权限校验失败");
                return;
            }

            // 前置条件检查
            if (!checkPreconditions(data)) {
                evt.setCancel(true);
                evt.setCancelMessage("前置条件不满足");
                logger.warn("前置条件检查失败");
                return;
            }

            logger.info("审批通过前校验通过");

        } catch (Exception e) {
            logger.error("审批通过前校验异常", e);
            evt.setCancel(true);
            evt.setCancelMessage("校验异常：" + e.getMessage());
        }
    }

    /**
     * 审批通过后处理
     * <p>用途：更新状态、执行业务逻辑</p>
     *
     * @param evt 事件参数
     */
    @Override
    public void afterPassAudit(AfterPassAuditEvent evt) {
        logger.info("审批通过，开始后处理");

        try {
            DynamicObject data = evt.getModel().getDataEntity();

            // 更新状态
            data.set(BaseCon.STATUS, BaseCon.STATUS_APPROVED);
            BusinessDataServiceHelper.save(data);

            // 执行业务逻辑
            processAfterApproval(data);

            // 发送通知
            sendNotification(data, "审批已通过");

            logger.info("审批通过后处理完成");

        } catch (Exception e) {
            logger.error("审批通过后处理失败", e);
            throw new KDBizException("处理失败：" + e.getMessage());
        }
    }

    /**
     * 审批拒绝处理
     * <p>用途：记录拒绝原因、通知相关人员</p>
     *
     * @param evt 事件参数
     */
    @Override
    public void afterRejectAudit(AfterRejectAuditEvent evt) {
        logger.info("审批拒绝");

        try {
            DynamicObject data = evt.getModel().getDataEntity();

            // 更新状态
            data.set(BaseCon.STATUS, BaseCon.STATUS_REJECTED);
            BusinessDataServiceHelper.save(data);

            // 发送通知
            sendNotification(data, "审批已拒绝");

            logger.info("审批拒绝处理完成");

        } catch (Exception e) {
            logger.error("审批拒绝处理失败", e);
        }
    }

    // ==================== 流程结束事件 ====================

    /**
     * 流程结束前处理
     * <p>用途：最终数据校验、清理工作</p>
     *
     * @param evt 事件参数
     */
    @Override
    public void beforeEndWorkflow(BeforeEndWorkflowEvent evt) {
        logger.info("流程结束前处理");

        try {
            DynamicObject data = evt.getModel().getDataEntity();

            // 最终数据校验
            if (!finalValidation(data)) {
                evt.setCancel(true);
                evt.setCancelMessage("最终校验失败");
                logger.warn("流程结束前校验失败");
                return;
            }

            logger.info("流程结束前处理完成");

        } catch (Exception e) {
            logger.error("流程结束前处理异常", e);
            evt.setCancel(true);
            evt.setCancelMessage("处理异常：" + e.getMessage());
        }
    }

    /**
     * 流程结束后处理
     * <p>用途：归档数据、发送最终通知、清理资源</p>
     *
     * @param evt 事件参数
     */
    @Override
    public void afterEndWorkflow(AfterEndWorkflowEvent evt) {
        logger.info("流程结束，开始归档处理");

        try {
            DynamicObject data = evt.getModel().getDataEntity();

            // 归档数据
            archiveData(data);

            // 发送最终通知
            sendFinalNotification(data);

            // 清理资源
            cleanupResources(data);

            logger.info("流程结束后处理完成");

        } catch (Exception e) {
            logger.error("流程结束后处理失败", e);
        }
    }

    // ==================== 业务方法 ====================

    /**
     * 数据完整性校验
     *
     * @param data 数据对象
     * @return true-完整，false-不完整
     */
    private boolean validateDataIntegrity(DynamicObject data) {
        // 检查必填字段
        String name = data.getString(BaseCon.NAME);
        if (name == null || name.isEmpty()) {
            logger.warn("名称字段为空");
            return false;
        }

        Long amount = data.getLong(BaseCon.AMOUNT);
        if (amount == null || amount <= 0) {
            logger.warn("金额字段无效");
            return false;
        }

        return true;
    }

    /**
     * 业务规则校验
     *
     * @param data 数据对象
     * @return true-通过，false-不通过
     */
    private boolean validateBusinessRules(DynamicObject data) {
        // TODO: 实现具体的业务规则校验
        return true;
    }

    /**
     * 检查审批权限
     *
     * @param data 数据对象
     * @return true-有权限，false-无权限
     */
    private boolean checkApprovalPermission(DynamicObject data) {
        // TODO: 实现审批权限检查逻辑
        return true;
    }

    /**
     * 检查前置条件
     *
     * @param data 数据对象
     * @return true-满足，false-不满足
     */
    private boolean checkPreconditions(DynamicObject data) {
        // TODO: 实现前置条件检查逻辑
        return true;
    }

    /**
     * 审批通过后业务处理
     *
     * @param data 数据对象
     */
    private void processAfterApproval(DynamicObject data) {
        logger.debug("开始审批后业务处理");

        // TODO: 实现具体的业务处理逻辑
        // 例如：更新关联数据、生成下游单据、调用外部系统等

        logger.debug("审批后业务处理完成");
    }

    /**
     * 最终数据校验
     *
     * @param data 数据对象
     * @return true-通过，false-不通过
     */
    private boolean finalValidation(DynamicObject data) {
        // TODO: 实现最终校验逻辑
        return true;
    }

    /**
     * 归档数据
     *
     * @param data 数据对象
     */
    private void archiveData(DynamicObject data) {
        logger.debug("开始归档数据");

        // TODO: 实现数据归档逻辑
        // 例如：写入历史表、归档到文件等

        logger.debug("数据归档完成");
    }

    /**
     * 发送通知
     *
     * @param data 数据对象
     * @param message 消息内容
     */
    private void sendNotification(DynamicObject data, String message) {
        logger.debug("发送通知: {}", message);

        // TODO: 实现通知发送逻辑
        // 例如：发送邮件、短信、系统消息等
    }

    /**
     * 发送最终通知
     *
     * @param data 数据对象
     */
    private void sendFinalNotification(DynamicObject data) {
        String message = "流程已结束，请查看处理结果";
        sendNotification(data, message);
    }

    /**
     * 清理资源
     *
     * @param data 数据对象
     */
    private void cleanupResources(DynamicObject data) {
        logger.debug("开始清理资源");

        // TODO: 实现资源清理逻辑
        // 例如：释放锁、清理临时文件、删除缓存等

        logger.debug("资源清理完成");
    }
}