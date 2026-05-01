package ${PACKAGE_NAME};

import kd.bos.form.plugin.AbstractFormPlugin;
import kd.bos.form.plugin.events.*;
import kd.bos.logging.Log;
import kd.bos.logging.Logger;
import kd.bos.dataentity.entity.DynamicObject;
import kd.bos.servicehelper.QueryServiceHelper;
import kd.bos.orm.query.QFilter;
import kd.bos.orm.query.QCP;
import kd.bos.exception.KDBizException;
import ${CONSTANT_IMPORT};

/**
 * ${CLASS_NAME} - 表单插件（生产就绪版）
 *
 * <p>功能说明：${DESCRIPTION}</p>
 *
 * <p>创建日期：${DATE}</p>
 * <p>作者：${AUTHOR}</p>
 * <p>版本：1.0</p>
 */
public class ${CLASS_NAME} extends AbstractFormPlugin {

    /** 日志记录器 */
    private static final Logger logger = Log.getLogger(${CLASS_NAME}.class);

    // ==================== 生命周期方法 ====================

    /**
     * 表单创建后事件
     * <p>用途：初始化表单数据、设置字段属性</p>
     *
     * @param evt 事件参数
     */
    @Override
    public void afterCreateNewData(AfterCreateNewDataEvent evt) {
        logger.info("表单创建开始");

        try {
            // 获取数据对象
            DynamicObject data = evt.getModel().getDataEntity();

            // 初始化字段值
            initializeFields(data);

            logger.info("表单创建完成");

        } catch (Exception e) {
            logger.error("表单创建失败", e);
            throw new KDBizException("初始化失败：" + e.getMessage());
        }
    }

    /**
     * 表单加载后事件
     * <p>用途：加载关联数据、设置字段状态</p>
     *
     * @param evt 事件参数
     */
    @Override
    public void afterBindData(AfterBindDataEvent evt) {
        logger.debug("表单加载完成");

        try {
            DynamicObject data = this.getModel().getDataEntity();
            loadData(data);

        } catch (Exception e) {
            logger.error("数据加载失败", e);
            this.getView().showErrorTip("数据加载失败");
        }
    }

    /**
     * 字段值改变事件
     * <p>用途：字段联动、数据校验</p>
     *
     * @param evt 事件参数
     */
    @Override
    public void propertyChanged(PropertyChangedEventArgs evt) {
        String fieldKey = evt.getProperty().getName();
        Object newValue = evt.getNewValue();
        Object oldValue = evt.getOldValue();

        logger.debug("字段值改变: {} = {} (旧值: {})", fieldKey, newValue, oldValue);

        try {
            // 根据字段处理逻辑
            switch (fieldKey) {
                case BaseCon.NAME:
                    handleNameChange(newValue);
                    break;
                case BaseCon.STATUS:
                    handleStatusChange(newValue, oldValue);
                    break;
                default:
                    logger.debug("字段 {} 无需特殊处理", fieldKey);
            }

        } catch (Exception e) {
            logger.error("字段值处理失败: " + fieldKey, e);
            this.getView().showErrorTip("数据处理失败");
        }
    }

    /**
     * 按钮点击前事件
     * <p>用途：按钮权限控制、前置校验</p>
     *
     * @param evt 事件参数
     */
    @Override
    public void beforeBaronclick(BeforeBaronclickEvent evt) {
        String buttonKey = evt.getItemKey();
        logger.info("按钮点击前校验: {}", buttonKey);

        try {
            // 按钮前置校验
            if (!validateBeforeClick(buttonKey)) {
                evt.setCancel(true);
                logger.warn("按钮校验未通过: {}", buttonKey);
            }

        } catch (Exception e) {
            logger.error("按钮校验失败", e);
            evt.setCancel(true);
            this.getView().showErrorTip("校验失败：" + e.getMessage());
        }
    }

    /**
     * 按钮点击事件
     * <p>用途：执行按钮业务逻辑</p>
     *
     * @param evt 事件参数
     */
    @Override
    public void baronclick(AfterBaronclickEvent evt) {
        String buttonKey = evt.getItemKey();
        logger.info("按钮点击: {}", buttonKey);

        try {
            switch (buttonKey) {
                case ${CONSTANT_CLASS}.BUTTON_SUBMIT:
                    handleSubmit();
                    break;
                case ${CONSTANT_CLASS}.BUTTON_APPROVE:
                    handleApprove();
                    break;
                default:
                    logger.warn("未知按钮: {}", buttonKey);
            }

            this.getView().showSuccessTip("操作成功");
            logger.info("按钮处理完成: {}", buttonKey);

        } catch (Exception e) {
            logger.error("按钮操作失败: " + buttonKey, e);
            this.getView().showErrorTip("操作失败：" + e.getMessage());
        }
    }

    /**
     * 表单关闭前事件
     * <p>用途：数据保存提示、资源清理</p>
     *
     * @param evt 事件参数
     */
    @Override
    public void beforeClosed(ClosedEvent evt) {
        logger.debug("表单关闭");

        try {
            // 清理资源
            cleanup();

        } catch (Exception e) {
            logger.error("资源清理失败", e);
        }
    }

    // ==================== 业务方法 ====================

    /**
     * 初始化字段值
     *
     * @param data 数据对象
     */
    private void initializeFields(DynamicObject data) {
        // 设置默认值
        data.set(BaseCon.STATUS, BaseCon.STATUS_DRAFT);
        data.set(BaseCon.CREATE_DATE, new java.util.Date());

        logger.debug("字段初始化完成");
    }

    /**
     * 加载关联数据
     *
     * @param data 数据对象
     */
    private void loadData(DynamicObject data) {
        // 查询关联数据
        Long relatedId = data.getLong(BaseCon.RELATED_ID);

        if (relatedId != null && relatedId > 0) {
            QFilter filter = new QFilter(BaseCon.ID, QCP.equals, relatedId);
            DynamicObject relatedData = QueryServiceHelper.loadSingle(
                ${CONSTANT_CLASS}.ENTITY_NAME,
                new QFilter[] { filter }
            );

            if (relatedData != null) {
                // 设置关联字段
                data.set(BaseCon.RELATED_NAME, relatedData.getString(BaseCon.NAME));
                logger.debug("关联数据加载成功: {}", relatedId);
            }
        }
    }

    /**
     * 处理名称字段改变
     *
     * @param newValue 新值
     */
    private void handleNameChange(Object newValue) {
        String name = (String) newValue;

        if (name != null && !name.isEmpty()) {
            // 自动生成编码
            String code = generateCode(name);
            this.getModel().setValue(BaseCon.NUMBER, code);

            logger.debug("名称改变，自动生成编码: {}", code);
        }
    }

    /**
     * 处理状态字段改变
     *
     * @param newValue 新值
     * @param oldValue 旧值
     */
    private void handleStatusChange(Object newValue, Object oldValue) {
        String newStatus = (String) newValue;
        String oldStatus = (String) oldValue;

        logger.info("状态变更: {} -> {}", oldStatus, newStatus);

        // 根据状态执行不同逻辑
        switch (newStatus) {
            case BaseCon.STATUS_APPROVED:
                // 已审批状态
                this.getView().setVisible(BaseCon.FIELD_EDITABLE, false);
                break;
            case BaseCon.STATUS_DRAFT:
                // 草稿状态
                this.getView().setVisible(BaseCon.FIELD_EDITABLE, true);
                break;
        }
    }

    /**
     * 按钮点击前校验
     *
     * @param buttonKey 按钮标识
     * @return true-通过，false-不通过
     */
    private boolean validateBeforeClick(String buttonKey) {
        DynamicObject data = this.getModel().getDataEntity();

        // 必填字段校验
        if (data.getString(BaseCon.NAME) == null || data.getString(BaseCon.NAME).isEmpty()) {
            this.getView().showErrorTip("名称不能为空");
            return false;
        }

        // 业务规则校验
        if (!validateBusinessRules(data)) {
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
     * 处理提交操作
     */
    private void handleSubmit() {
        logger.info("开始提交");

        DynamicObject data = this.getModel().getDataEntity();

        // 更新状态
        data.set(BaseCon.STATUS, BaseCon.STATUS_SUBMITTED);

        // 保存数据
        this.getView().invokeOperation("save");

        logger.info("提交完成");
    }

    /**
     * 处理审批操作
     */
    private void handleApprove() {
        logger.info("开始审批");

        DynamicObject data = this.getModel().getDataEntity();

        // 审批逻辑
        // TODO: 实现审批流程

        logger.info("审批完成");
    }

    /**
     * 生成编码
     *
     * @param name 名称
     * @return 编码
     */
    private String generateCode(String name) {
        // 编码生成规则
        return "CODE_" + System.currentTimeMillis();
    }

    /**
     * 清理资源
     */
    private void cleanup() {
        // 清理缓存、关闭连接等
        logger.debug("资源清理完成");
    }
}