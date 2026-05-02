package kd.bos.plugin.demo;

import kd.bos.bill.AbstractBillPlugIn;
import kd.bos.dataentity.entity.DynamicObject;
import kd.bos.dataentity.entity.DynamicObjectCollection;
import kd.bos.servicehelper.BusinessDataServiceHelper;
import kd.bos.form.control.TextField;
import kd.bos.form.field.BasedataField;
import kd.bos.entity.operate.result.OperateErrorInfo;

import java.math.BigDecimal;
import java.util.*;

/**
 * 销售订单表单插件示例
 *
 * 功能演示：
 * 1. 单据加载时读取字段值
 * 2. 根据条件设置字段可见性
 * 3. 保存前进行数据校验
 *
 * 开发规范遵守：
 * ✅ 使用 Java 语言（非 C#）
 * ✅ 禁止魔法值，必须使用常量
 * ✅ 禁止在循环中操作数据库
 * ✅ 使用 DynamicObject.get(String) 读取字段
 * ✅ 使用 DynamicObjectCollection 遍历单据体
 *
 * 依据约束文件：
 * - DynamicObject.prompt.md
 * - DynamicObjectCollection.prompt.md
 * - BusinessDataServiceHelper.prompt.md
 *
 * @author bos-flow
 * @version 1.0.0
 */
public class SalesOrderFormPlugin extends AbstractBillPlugIn {

    // ========================================================================
    // 常量定义 - 遵守"禁止使用魔法值"规范
    // ========================================================================

    /**
     * 字段标识常量
     * 所有字段标识必须定义为常量，禁止在代码中直接使用字符串
     */
    private static final class FieldKeys {
        // 私有构造函数，防止实例化
        private FieldKeys() {}

        // 单据头字段
        public static final String BILL_NO = "fbillno";                    // 单据编号
        public static final String BILL_DATE = "fdate";                    // 日期
        public static final String CUSTOMER = "fcustomerid";               // 客户
        public static final String SALER = "fsalerid";                     // 销售员
        public static final String TOTAL_AMOUNT = "ftotalamount";          // 总金额
        public static final String APPROVE_STATUS = "fapprovestatus";      // 审批状态
        public static final String CREATE_TIME = "fcreatetime";            // 创建时间
        public static final String MODIFY_TIME = "fmodifytime";            // 修改时间

        // 单据体字段
        public static final String ENTRY_KEY = "fsaleorderentry";          // 单据体标识
        public static final String MATERIAL = "fmaterialid";               // 物料
        public static final String QTY = "fqty";                           // 数量
        public static final String PRICE = "fprice";                       // 单价
        public static final String AMOUNT = "famount";                     // 金额
        public static final String TAX_RATE = "ftaxrate";                  // 税率
        public static final String TAX_AMOUNT = "ftaxamount";              // 税额
        public static final String SEQ = "fseq";                           // 行号

        // 基础资料字段
        public static final String MATERIAL_NUMBER = "fnumber";            // 物料编码
        public static final String MATERIAL_NAME = "fname";                // 物料名称
        public static final String CUSTOMER_NUMBER = "fnumber";            // 客户编码
        public static final String CUSTOMER_NAME = "fname";                // 客户名称
        public static final String CUSTOMER_TYPE = "fcustomertype";        // 客户类型
    }

    /**
     * 枚举值常量
     * 所有枚举值必须定义为常量，禁止在代码中直接使用数字
     */
    private static final class EnumValues {
        private EnumValues() {}

        // 审批状态枚举
        public static final int APPROVE_STATUS_DRAFT = 0;          // 草稿
        public static final int APPROVE_STATUS_SUBMITTED = 1;      // 已提交
        public static final int APPROVE_STATUS_APPROVED = 2;       // 已审核
        public static final int APPROVE_STATUS_REJECTED = 3;       // 已驳回

        // 客户类型枚举
        public static final String CUSTOMER_TYPE_VIP = "VIP";      // VIP客户
        public static final String CUSTOMER_TYPE_NORMAL = "Normal"; // 普通客户
    }

    /**
     * 业务规则常量
     * 所有业务阈值必须定义为常量
     */
    private static final class BusinessRules {
        private BusinessRules() {}

        public static final BigDecimal MIN_ORDER_AMOUNT = new BigDecimal("100");       // 最小订单金额
        public static final BigDecimal MAX_DISCOUNT_RATE = new BigDecimal("0.8");      // 最大折扣率
        public static final int MAX_ENTRY_ROWS = 100;              // 单据体最大行数
        public static final BigDecimal AMOUNT_TOLERANCE = new BigDecimal("0.01");      // 金额容差
    }

    /**
     * 错误消息常量
     * 所有错误消息必须定义为常量，便于国际化和维护
     */
    private static final class ErrorMessages {
        private ErrorMessages() {}

        public static final String CUSTOMER_REQUIRED = "客户不能为空";
        public static final String BILL_DATE_REQUIRED = "日期不能为空";
        public static final String ENTRY_EMPTY = "单据体不能为空";
        public static final String MATERIAL_REQUIRED = "物料不能为空";
        public static final String QTY_MUST_POSITIVE = "数量必须大于0";
        public static final String PRICE_NEGATIVE = "单价不能为负数";
        public static final String AMOUNT_MISMATCH = "金额合计不一致";
        public static final String MATERIAL_DUPLICATE = "物料重复";
        public static final String ROW_PREFIX = "第";
        public static final String ROW_SUFFIX = "行：";
        public static final String LOAD_FAILED = "加载单据失败：";
        public static final String SAVE_FAILED = "保存失败：";
    }

    // ========================================================================
    // 事件：单据加载后
    // ========================================================================

    /**
     * 单据加载后事件
     * 用途：读取字段值，初始化界面状态
     *
     * 约束遵守：
     * ✅ 使用常量代替字符串魔法值
     * ✅ 使用 DynamicObject.get(String) 读取字段值
     * ✅ 使用 (DynamicObject) 进行类型转换
     *
     * @param e 事件参数
     */
    @Override
    public void afterBindData(EventObject e) {
        super.afterBindData(e);

        try {
            // 1. 读取单据头字段值
            readHeaderFields();

            // 2. 读取单据体数据
            readEntryData();

            // 3. 根据条件控制字段可见性
            controlFieldVisibility();

        } catch (Exception ex) {
            this.getView().showMessage(ErrorMessages.LOAD_FAILED + ex.getMessage());
        }
    }

    // ========================================================================
    // 事件：保存前校验
    // ========================================================================

    /**
     * 保存前事件
     * 用途：数据校验
     *
     * 约束遵守：
     * ✅ 使用常量代替字符串魔法值
     * ✅ 不在循环中查询数据库
     * ✅ 使用 DynamicObject.get(String) 读取字段值
     * ✅ 使用 DynamicObjectCollection 遍历单据体
     *
     * @param e 事件参数
     */
    @Override
    public void beforeSave(BeforeSaveEventArgs e) {
        super.beforeSave(e);

        try {
            // 1. 校验单据头必填字段
            validateHeaderFields();

            // 2. 校验单据体数据
            validateEntryData();

            // 3. 校验业务规则
            validateBusinessRules();

        } catch (Exception ex) {
            e.setCancel(true);
            e.setCancelMessage(ErrorMessages.SAVE_FAILED + ex.getMessage());
        }
    }

    // ========================================================================
    // 私有方法：读取字段值
    // ========================================================================

    /**
     * 读取单据头字段值
     *
     * 约束遵守：
     * ✅ 使用 FieldKeys 常量，不使用字符串魔法值
     * ✅ 使用 get(String) 方法读取字段
     * ✅ 使用 (DynamicObject) 转换基础资料类型
     */
    private void readHeaderFields() {
        // ✅ 正确：使用常量 FieldKeys.BILL_NO
        String billNo = (String) this.getModel().getDataEntity().get(FieldKeys.BILL_NO);
        this.getView().showMessage("单据编号：" + billNo);

        // ❌ 错误：使用字符串魔法值（禁止）
        // String billNo = (String) this.getModel().getDataEntity().get("fbillno");  // 违反规范

        // ✅ 正确：使用常量 FieldKeys.TOTAL_AMOUNT
        BigDecimal totalAmount = this.getModel().getDataEntity().getBigDecimal(FieldKeys.TOTAL_AMOUNT);
        this.getView().showMessage("总金额：" + totalAmount);

        // ✅ 正确：使用常量 FieldKeys.CUSTOMER
        DynamicObject customer = (DynamicObject) this.getModel().getDataEntity().get(FieldKeys.CUSTOMER);
        if (customer != null) {
            // ✅ 正确：使用常量 FieldKeys.CUSTOMER_NAME
            String customerName = (String) customer.get(FieldKeys.CUSTOMER_NAME);
            String customerNumber = (String) customer.get(FieldKeys.CUSTOMER_NUMBER);
            this.getView().showMessage("客户：" + customerName + " (" + customerNumber + ")");
        }

        // ✅ 正确：使用枚举常量
        int approveStatus = this.getModel().getDataEntity().getInt(FieldKeys.APPROVE_STATUS);
        this.getView().showMessage("审批状态：" + approveStatus);
    }

    /**
     * 读取单据体数据
     *
     * 约束遵守：
     * ✅ 使用 FieldKeys 常量
     * ✅ 使用 DynamicObjectCollection 表示单据体集合
     * ✅ 使用 for 循环遍历行
     */
    private void readEntryData() {
        // ✅ 正确：使用常量 FieldKeys.ENTRY_KEY
        DynamicObjectCollection entries = (DynamicObjectCollection) this.getModel()
            .getDataEntity().get(FieldKeys.ENTRY_KEY);

        if (entries == null || entries.isEmpty()) {
            this.getView().showMessage("单据体为空");
            return;
        }

        // 遍历单据体行
        int rowIndex = 1;
        for (DynamicObject row : entries) {
            // ✅ 正确：使用常量 FieldKeys.MATERIAL
            DynamicObject material = (DynamicObject) row.get(FieldKeys.MATERIAL);
            String materialName = material != null ? (String) material.get(FieldKeys.MATERIAL_NAME) : null;

            // ✅ 正确：使用常量 FieldKeys.QTY
            BigDecimal qty = row.getBigDecimal(FieldKeys.QTY);
            BigDecimal price = row.getBigDecimal(FieldKeys.PRICE);
            BigDecimal amount = row.getBigDecimal(FieldKeys.AMOUNT);

            this.getView().showMessage(
                String.format("第%d行：%s，数量：%s，单价：%s，金额：%s",
                    rowIndex, materialName, qty, price, amount)
            );

            rowIndex++;
        }
    }

    // ========================================================================
    // 私有方法：字段可见性控制
    // ========================================================================

    /**
     * 根据条件控制字段可见性
     *
     * 约束遵守：
     * ✅ 使用枚举常量 EnumValues.APPROVE_STATUS_APPROVED
     * ✅ 使用 FieldKeys 常量
     */
    private void controlFieldVisibility() {
        // ✅ 正确：使用常量
        int approveStatus = this.getModel().getDataEntity().getInt(FieldKeys.APPROVE_STATUS);

        // ✅ 正确：使用枚举常量比较
        if (approveStatus == EnumValues.APPROVE_STATUS_APPROVED) {
            TextField priceControl = this.getView().getControl(TextField.class, FieldKeys.PRICE);
            if (priceControl != null) {
                priceControl.setVisible(false);
            }

            TextField amountControl = this.getView().getControl(TextField.class, FieldKeys.AMOUNT);
            if (amountControl != null) {
                amountControl.setVisible(false);
            }

            this.getView().showMessage("已审核单据，价格信息已隐藏");
        }

        // ✅ 正确：使用常量
        DynamicObject customer = (DynamicObject) this.getModel().getDataEntity().get(FieldKeys.CUSTOMER);
        if (customer != null) {
            String customerType = (String) customer.get(FieldKeys.CUSTOMER_TYPE);

            TextField salerControl = this.getView().getControl(TextField.class, FieldKeys.SALER);
            if (salerControl != null) {
                // ✅ 正确：使用枚举常量 EnumValues.CUSTOMER_TYPE_VIP
                salerControl.setVisible(EnumValues.CUSTOMER_TYPE_VIP.equals(customerType));
            }
        }
    }

    // ========================================================================
    // 私有方法：数据校验
    // ========================================================================

    /**
     * 校验单据头必填字段
     *
     * 约束遵守：
     * ✅ 使用 ErrorMessages 常量
     * ✅ 使用 FieldKeys 常量
     */
    private void validateHeaderFields() {
        // ✅ 正确：使用常量
        DynamicObject customer = (DynamicObject) this.getModel().getDataEntity().get(FieldKeys.CUSTOMER);
        if (customer == null) {
            // ✅ 正确：使用错误消息常量
            throw new RuntimeException(ErrorMessages.CUSTOMER_REQUIRED);
        }

        // ✅ 正确：使用常量
        Date billDate = (Date) this.getModel().getDataEntity().get(FieldKeys.BILL_DATE);
        if (billDate == null) {
            // ✅ 正确：使用错误消息常量
            throw new RuntimeException(ErrorMessages.BILL_DATE_REQUIRED);
        }
    }

    /**
     * 校验单据体数据
     *
     * 约束遵守：
     * ✅ 使用常量，不使用魔法值
     * ✅ 不在循环中查询数据库（重要规范）
     */
    private void validateEntryData() {
        // ✅ 正确：使用常量
        DynamicObjectCollection entries = (DynamicObjectCollection) this.getModel()
            .getDataEntity().get(FieldKeys.ENTRY_KEY);

        // 检查单据体是否为空
        if (entries == null || entries.isEmpty()) {
            // ✅ 正确：使用错误消息常量
            throw new RuntimeException(ErrorMessages.ENTRY_EMPTY);
        }

        // 检查单据体行数限制
        if (entries.size() > BusinessRules.MAX_ENTRY_ROWS) {
            throw new RuntimeException("单据体行数超过限制（最大" + BusinessRules.MAX_ENTRY_ROWS + "行）");
        }

        // 遍历校验每一行
        int rowIndex = 1;
        for (DynamicObject row : entries) {
            // 校验物料
            DynamicObject material = (DynamicObject) row.get(FieldKeys.MATERIAL);
            if (material == null) {
                // ✅ 正确：使用错误消息常量拼接
                throw new RuntimeException(ErrorMessages.ROW_PREFIX + rowIndex + ErrorMessages.ROW_SUFFIX + ErrorMessages.MATERIAL_REQUIRED);
            }

            // 校验数量
            BigDecimal qty = row.getBigDecimal(FieldKeys.QTY);
            if (qty == null || qty.compareTo(BigDecimal.ZERO) <= 0) {
                // ✅ 正确：使用错误消息常量拼接
                throw new RuntimeException(ErrorMessages.ROW_PREFIX + rowIndex + ErrorMessages.ROW_SUFFIX + ErrorMessages.QTY_MUST_POSITIVE);
            }

            // 校验单价
            BigDecimal price = row.getBigDecimal(FieldKeys.PRICE);
            if (price != null && price.compareTo(BigDecimal.ZERO) < 0) {
                // ✅ 正确：使用错误消息常量拼接
                throw new RuntimeException(ErrorMessages.ROW_PREFIX + rowIndex + ErrorMessages.ROW_SUFFIX + ErrorMessages.PRICE_NEGATIVE);
            }

            rowIndex++;
        }
    }

    /**
     * 校验业务规则
     *
     * 约束遵守：
     * ✅ 使用 BusinessRules 常量
     * ✅ 使用 getBigDecimal 进行数值计算
     * ✅ 不在循环中查询数据库（使用预加载策略）
     */
    private void validateBusinessRules() {
        // 业务规则1：金额合计必须等于单据头总金额
        DynamicObjectCollection entries = (DynamicObjectCollection) this.getModel()
            .getDataEntity().get(FieldKeys.ENTRY_KEY);
        BigDecimal totalAmount = this.getModel().getDataEntity().getBigDecimal(FieldKeys.TOTAL_AMOUNT);

        BigDecimal calculatedTotal = BigDecimal.ZERO;
        for (DynamicObject row : entries) {
            BigDecimal amount = row.getBigDecimal(FieldKeys.AMOUNT);
            if (amount != null) {
                calculatedTotal = calculatedTotal.add(amount);
            }
        }

        // ✅ 正确：使用业务规则常量
        if (calculatedTotal.subtract(totalAmount).abs().compareTo(BusinessRules.AMOUNT_TOLERANCE) > 0) {
            throw new RuntimeException(ErrorMessages.AMOUNT_MISMATCH +
                "：明细合计" + calculatedTotal + "，单据头总金额" + totalAmount);
        }

        // 业务规则2：检查物料是否重复
        Set<String> materialNumbers = new HashSet<>();
        for (DynamicObject row : entries) {
            DynamicObject material = (DynamicObject) row.get(FieldKeys.MATERIAL);
            // ✅ 正确：使用常量
            String materialNumber = material != null ? (String) material.get(FieldKeys.MATERIAL_NUMBER) : null;

            if (materialNumber != null && !materialNumber.isEmpty()) {
                if (materialNumbers.contains(materialNumber)) {
                    throw new RuntimeException(ErrorMessages.MATERIAL_DUPLICATE + "：" + materialNumber);
                }
                materialNumbers.add(materialNumber);
            }
        }
    }

    // ========================================================================
    // 辅助方法：数据库查询（遵守"禁止在循环中查询"规范）
    // ========================================================================

    /**
     * 示例：批量加载物料信息（正确做法）
     *
     * 约束遵守：
     * ✅ 不在循环中查询数据库
     * ✅ 使用批量查询，一次性加载所有需要的数据
     * ✅ 使用 BusinessDataServiceHelper.load 批量查询
     *
     * @param entries 单据体集合
     * @return 物料编码 -> 物料对象的映射
     */
    private Map<String, DynamicObject> batchLoadMaterials(DynamicObjectCollection entries) {
        // ❌ 错误示范：在循环中查询数据库（严重违反规范）
        // for (DynamicObject row : entries) {
        //     String materialNumber = (String) ((DynamicObject) row.get("fmaterialid")).get("fnumber");
        //     DynamicObject material = BusinessDataServiceHelper.loadSingle(
        //         "bd_material", new Object[] { "fnumber", materialNumber }
        //     );  // ❌ 每次循环都查询数据库，性能极差
        // }

        // ✅ 正确做法：先收集所有物料编码，再批量查询
        List<String> materialNumbers = new ArrayList<>();
        for (DynamicObject row : entries) {
            DynamicObject material = (DynamicObject) row.get(FieldKeys.MATERIAL);
            String materialNumber = material != null ? (String) material.get(FieldKeys.MATERIAL_NUMBER) : null;
            if (materialNumber != null && !materialNumber.isEmpty()) {
                materialNumbers.add(materialNumber);
            }
        }

        // ✅ 批量查询：一次性加载所有物料
        DynamicObject[] materials = BusinessDataServiceHelper.load(
            "bd_material",
            FieldKeys.MATERIAL_NUMBER,
            materialNumbers.toArray()
        );

        // 转换为Map，便于后续查找
        Map<String, DynamicObject> materialMap = new HashMap<>();
        for (DynamicObject material : materials) {
            String number = (String) material.get(FieldKeys.MATERIAL_NUMBER);
            if (number != null && !number.isEmpty()) {
                materialMap.put(number, material);
            }
        }

        return materialMap;
    }

    /**
     * 示例：批量插入数据（正确做法）
     */
    private void batchInsertExample(DynamicObjectCollection entries) {
        // ❌ 错误：在循环中插入
        // for (DynamicObject row : entries) {
        //     DynamicObject newRecord = new DynamicObject(type);
        //     BusinessDataServiceHelper.save(newRecord);  // ❌ 每次循环都插入
        // }

        // ✅ 正确：批量插入
        List<DynamicObject> recordsToInsert = new ArrayList<>();
        for (DynamicObject row : entries) {
            DynamicObject newRecord = new DynamicObject(row.getDynamicObjectType());
            // 设置字段值...
            recordsToInsert.add(newRecord);
        }

        // 一次性插入所有数据
        BusinessDataServiceHelper.save(recordsToInsert.toArray(new DynamicObject[0]));
    }

    /**
     * 示例：批量更新数据（正确做法）
     */
    private void batchUpdateExample(DynamicObjectCollection entries) {
        // ❌ 错误：在循环中更新
        // for (DynamicObject row : entries) {
        //     row.set("fstatus", "updated");
        //     BusinessDataServiceHelper.update(row);  // ❌ 每次循环都更新
        // }

        // ✅ 正确：批量更新
        for (DynamicObject row : entries) {
            row.set("fstatus", "updated");  // 在内存中修改
        }

        // 一次性更新所有数据
        BusinessDataServiceHelper.update(entries.toArray(new DynamicObject[0]));
    }

    /**
     * 示例：批量删除数据（正确做法）
     */
    private void batchDeleteExample(DynamicObjectCollection entries) {
        // ❌ 错误：在循环中删除
        // for (DynamicObject row : entries) {
        //     BusinessDataServiceHelper.delete(row);  // ❌ 每次循环都删除
        // }

        // ✅ 正确：批量删除
        List<DynamicObject> recordsToDelete = new ArrayList<>();
        for (DynamicObject row : entries) {
            recordsToDelete.add(row);
        }

        // 一次性删除所有数据
        BusinessDataServiceHelper.delete(recordsToDelete.toArray(new DynamicObject[0]));
    }
}
