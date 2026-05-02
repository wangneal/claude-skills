// 测试样例代码 - 用于验证规范检查器

using System;
using KD.BOS;

namespace MyProject
{
    /// <summary>
    /// 工作流服务帮助类
    /// </summary>
    public class WorkflowServiceHelper
    {
        /// <summary>
        /// 提交单据到工作流
        /// </summary>
        /// <param name="billNo">单据编号</param>
        /// <returns>是否提交成功</returns>
        public bool SubmitToWorkflow(string billNo)
        {
            // 验证参数
            if (string.IsNullOrEmpty(billNo))
            {
                throw new ArgumentNullException(nameof(billNo));
            }

            // 提交工作流
            var result = WorkflowService.Submit(billNo);
            return result.Success;
        }

        // 错误示例：方法名不符合 PascalCase
        public void processBill()
        {
            // 错误示例：常量不符合全大写规范
            const string billType = "Invoice";
            const int MAX_COUNT = 100;

            // 正确示例
            const string BILL_STATUS_APPROVED = "Approved";
        }
    }

    // 错误示例：类名不符合 PascalCase
    public class dataValidator
    {
        public bool ValidateData(object data)
        {
            // 实现
            return true;
        }
    }

    /// <summary>
    /// 单据服务
    /// </summary>
    public class BillService
    {
        // 正确示例：私有字段使用 camelCase
        private string _billNo;
        private DynamicObject _billData;

        // 正确示例：公共属性使用 PascalCase
        public string BillNo { get; set; }
        public DynamicObject BillData { get; set; }

        /// <summary>
        /// 加载单据数据
        /// </summary>
        public DynamicObject LoadBill(string billNo)
        {
            // 使用 DynamicObject
            DynamicObject obj = new DynamicObject();
            obj["billno"] = billNo;
            obj["billdate"] = DateTime.Now;

            return obj;
        }

        /// <summary>
        /// 保存单据 - 这是一个超过120字符的长方法名，用于测试行长度检查功能是否正常工作
        /// </summary>
        public void SaveBill()
        {
            // 方法实现
        }
    }
}
