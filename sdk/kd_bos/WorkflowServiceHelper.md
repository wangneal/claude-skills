# WorkflowServiceHelper


**包路径**: kd.bos.servicehelper.workflow

**类型**: CLASS

**父类**: 无

**说明**: 工作流服务


```java
public class WorkflowServiceHelper
```


## 字段 (15 个)


| 字段名 | 类型 | 说明 |

|--------|------|------|

| APPLYED | `java.lang.String` | 已办申请 |

| CACHEKEY_WITHDRAWDELETEBIZJOBIDS | `java.lang.String` | 在工作流中但是可以撤回 |

| HANDLED | `java.lang.String` | 已办任务 |

| NOT_IN_PROCESS | `java.lang.String` | 不在工作流当中 |

| PRINT_ACTIVITYNAME | `java.lang.String` | - |

| PRINT_BIZIDENTIFYKEY | `java.lang.String` | - |

| PRINT_META | `java.lang.String` | 打印元数据 |

| PRINT_TYPE_ALL | `java.lang.String` | 打印类型-所有审批记录（默认） |

| PRINT_TYPE_ALLCONSENT | `java.lang.String` | 打印类型-所有审批同意记录 |

| PRINT_TYPE_LASTEDCONSENT | `java.lang.String` | 打印类型-当前节点之前最新审批同意记录 |

| PROCESS_INITIATOR | `java.lang.String` | 流程发起人变量 |

| TOAPPLY | `java.lang.String` | 在办申请 |

| TOHANDLE | `java.lang.String` | 待办任务 |

| WF_CAN_WITHDRAW | `java.lang.String` | 在工作流中但是可以撤回 |

| WF_CAN_WITHDRAW_BYABANDONPROC | `java.lang.String` | 在工作流中且已进行处理，可以撤回，流程终止 |


## 方法 (139 个)


### `ActivateProcessInstanceAndRuleByUserIdCmd`

```java
void ActivateProcessInstanceAndRuleByUserIdCmd(java.lang.Long)
```

- 无说明


### `SuspendProcessInstanceAndRuleByUserId`

```java
void SuspendProcessInstanceAndRuleByUserId(java.lang.Long, ILocaleString)
```

- 无说明


### `abandon`

```java
void abandon(java.lang.Long)
```

- 无说明


### `abandonByBusienssKey`

```java
void abandonByBusienssKey(java.lang.String)
```

- 无说明


### `abortProcessInstance`

```java
void abortProcessInstance(java.lang.Long)
```

- 无说明


### `activateTaskById`

```java
java.util.Map<java.lang.String,java.lang.Object> activateTaskById(java.lang.Long, java.lang.Long)
```

任务解挂


### `addComment`

```java
void addComment(Comment)
```

描述:记录审批意见 comment对外允许设置属性：


### `addJointAuditParticipants`

```java
void addJointAuditParticipants(java.lang.String, java.lang.String, java.util.List<java.lang.Long>, java.util.Map<java.lang.String,java.lang.String>)
```

- 无说明


### `addNodeTemplate`

```java
void addNodeTemplate(NodeTemplate)
```

添加节点模板


### `addSign`

```java
java.lang.String addSign(java.lang.Long, AddSignInfo)
```

- 无说明


### `addSignByAdmin`

```java
java.lang.String addSignByAdmin(java.lang.Long, java.lang.String, AddSignInfo)
```

- 无说明


### `addSignClear`

```java
java.lang.String addSignClear(java.lang.Long, java.lang.String)
```

- 无说明


### `addSignClearByAdmin`

```java
java.lang.String addSignClearByAdmin(java.lang.Long, java.lang.String)
```

- 无说明


### `addTaskComment`

```java
void addTaskComment(Comment)
```

- 无说明


### `addTrdComment`

```java
void addTrdComment(ThirdCommentInfo)
```

新增第三方Comment实体


### `applyWorkflowMultiLanguageWords`

```java
void applyWorkflowMultiLanguageWords(java.util.Map<java.lang.String,java.lang.Object>)
```

把翻译平台翻译好的词条应用回去


### `assignNextParticipant`

```java
void assignNextParticipant(java.lang.Long, java.util.Map<java.lang.String,java.util.List<java.lang.String>>)
```

- 无说明


### `batchAgreeTaskWithUserId`

```java
java.lang.String batchAgreeTaskWithUserId(java.util.List<java.lang.Long>, ILocaleString, java.lang.Long)
```

批量同意任务


### `batchAuditByBusinesskeys`

```java
java.util.Map<java.lang.String,java.lang.Object> batchAuditByBusinesskeys(java.util.List<java.lang.String>, java.util.Map<java.lang.String,java.lang.Object>)
```

根据businessKeys批量处理任务，需要传入审批人，批量审批决策类型，审批意见


### `batchCompleteCompositeTasks`

```java
void batchCompleteCompositeTasks(java.util.Map<java.lang.Long,java.util.Map<java.lang.String,java.lang.Object>>)
```

- 无说明


### `batchWithdraw`

```java
java.lang.String batchWithdraw(DynamicObject[], java.lang.String)
```

撤回的批量接口


### `canWithdraw`

```java
java.util.Map<java.lang.String,java.util.List<java.lang.String>> canWithdraw(DynamicObject[])
```

描述：过滤哪些objs可以撤回


### `completeTask`

```java
void completeTask(java.lang.Long, java.lang.Long, java.lang.String, java.lang.String, java.util.Map<java.lang.String,java.lang.Object>)
```

完成任务，并记录审批意见


### `completeTask`

```java
void completeTask(java.lang.Long, java.lang.Long, java.lang.String, java.lang.String)
```

完成任务，并记录审批意见


### `completeTask`

```java
void completeTask(java.lang.String, java.lang.String, java.lang.Long, java.lang.String, java.lang.String, boolean, java.util.Map<java.lang.String,java.lang.Object>)
```

完成任务，并记录审批意见


### `completeTask`

```java
void completeTask(java.lang.String, java.lang.String, java.lang.Long, java.lang.String, java.lang.String, boolean)
```

完成任务，并记录审批意见


### `completeTaskByBusinessKey`

```java
void completeTaskByBusinessKey(java.lang.String, java.lang.String, java.lang.Long, java.lang.String, java.lang.String, boolean)
```

根据单据id和nodeid完成任务


### `coordinateReplyTaskWithdraw`

```java
void coordinateReplyTaskWithdraw(java.lang.Long, java.lang.Long)
```

协办任务回复撤回


### `createApprovalRecordItem`

```java
IApprovalRecordItem createApprovalRecordItem()
```

描述：创建一个新的审批记录


### `createNewComment`

```java
Comment createNewComment()
```

描述：创建一个新的Comment实体


### `createNewTrdComment`

```java
ThirdCommentInfo createNewTrdComment()
```

描述：创建一个新第三方Comment实体


### `createProcessAndStart`

```java
void createProcessAndStart(java.lang.String, java.lang.String, java.lang.String, java.util.Map<java.lang.String,java.lang.Object>, WFProcess)
```

- 无说明


### `deployModel`

```java
void deployModel(java.lang.String)
```

部署流程模型


### `disableProcess`

```java
void disableProcess(java.lang.Long)
```

- 无说明


### `enableProcess`

```java
void enableProcess(java.lang.Long)
```

- 无说明


### `existProcDefByEntityNumber`

```java
java.lang.Boolean existProcDefByEntityNumber(java.lang.String)
```

- 无说明


### `findTaskById`

```java
TaskInfo findTaskById(java.lang.Long)
```

描述:根据id查找task


### `getActInstInfo`

```java
java.util.Map<java.lang.String,java.util.List<java.util.Map<java.lang.String,java.lang.Object>>> getActInstInfo(java.lang.String, java.util.List<java.lang.String>, boolean)
```

- 无说明


### `getAllApprovalRecord`

```java
java.util.List<IApprovalRecordGroup> getAllApprovalRecord(java.lang.String)
```

返回单据的整个审批记录


### `getAllApprovalRecordInclCoordinate`

```java
java.util.List<IApprovalRecordGroup> getAllApprovalRecordInclCoordinate(java.lang.String)
```

- 无说明


### `getAllProcessCategory`

```java
DynamicObject[] getAllProcessCategory()
```

获取所有的流程类别信息


### `getApplyedProcess`

```java
DynamicObjectCollection getApplyedProcess(java.lang.Long, java.lang.Integer, java.lang.Integer, java.lang.String, java.lang.String, java.util.Map<java.lang.String,java.lang.Object>)
```

- 无说明


### `getApprovalRecordMeta`

```java
java.util.Map<java.lang.String,java.lang.String> getApprovalRecordMeta()
```

获取审批记录的元数据，（字段和属性）


### `getApprovalRecords`

```java
java.util.List<IApprovalRecordGroup> getApprovalRecords(java.lang.String, java.lang.String, boolean)
```

获取(全部)审批记录


### `getApproverByBusinessKey`

```java
java.util.List<java.lang.Long> getApproverByBusinessKey(java.lang.String)
```

描述:获取当前节点的审批人


### `getApproversMapByBusinessKeys`

```java
java.util.Map<java.lang.String,java.util.List<java.lang.Long>> getApproversMapByBusinessKeys(java.lang.String[])
```

描述:获取给定单据集合的当前审批人集合


### `getArchiveRouteKeys`

```java
java.util.List<java.lang.String> getArchiveRouteKeys(java.lang.String, java.util.List<ArchiveRouteIndexCondition>)
```

获取归档路由集合


### `getAuditAllowModifiedFields`

```java
java.util.List<java.util.Map<java.lang.String,java.lang.String>> getAuditAllowModifiedFields(java.lang.Long, java.lang.String)
```

根据taskId获取节点上配置的页面可编辑信息


### `getAutoCoordinateUsers`

```java
java.util.List<java.lang.Long> getAutoCoordinateUsers(java.lang.Long)
```

- 无说明


### `getBizProcessStatus`

```java
java.util.Map<java.lang.String,java.util.List<BizProcessStatus>> getBizProcessStatus(java.lang.String[])
```

根据单据id集合查询在流程中的状态


### `getCommentForPrint`

```java
java.util.List<java.util.Map<java.lang.String,java.lang.String>> getCommentForPrint(java.lang.String)
```

根据businessKey获取当前审批意见。注释：驳回没有，人工没有，当前节点没有


### `getCommentForPrintByType`

```java
java.util.Collection<java.util.Map<java.lang.String,java.lang.String>> getCommentForPrintByType(java.lang.String, java.lang.String)
```

根据类型获取打印结果


### `getCommentsByTaskId`

```java
DynamicObjectCollection getCommentsByTaskId(java.lang.Long)
```

描述:获取任务的详细审批信息


### `getDeployModel`

```java
java.lang.String getDeployModel(long)
```

根据流程模型获取流程部署文件


### `getEnableProcessCount`

```java
long getEnableProcessCount()
```

获取启用的流程数量


### `getEnabledProcDefByEntityNumber`

```java
java.util.List<java.util.Map<java.lang.String,java.lang.Object>> getEnabledProcDefByEntityNumber(java.lang.String)
```

- 无说明


### `getEnabledProcesses`

```java
java.util.List<EnabledProcessInfo> getEnabledProcesses(DynamicObject, java.lang.String)
```

- 无说明


### `getHandledTasksByUserId`

```java
DynamicObjectCollection getHandledTasksByUserId(int, int, java.lang.String, java.util.Map<java.lang.String,java.lang.String>)
```

- 无说明


### `getInProcessApply`

```java
DynamicObjectCollection getInProcessApply(int, int, java.lang.String, java.util.Map<java.lang.String,java.lang.String>)
```

- 无说明


### `getInProcessDataEntity`

```java
ExtendedDataEntity[] getInProcessDataEntity(ExtendedDataEntity[])
```

描述：过滤出那些单据在工作里中


### `getLastNodesComment`

```java
java.util.List<Comment> getLastNodesComment(java.lang.String)
```

描述:获取上几点的审批内容


### `getModelByAppId`

```java
DynamicObject[] getModelByAppId(java.lang.String)
```

根据应用ID（开发者门户的应用）获取其所对应的流程


### `getModelByProcessCategoryId`

```java
DynamicObject[] getModelByProcessCategoryId(java.lang.Long)
```

获取指定类别下的流程信息


### `getNextMandatoryNodes`

```java
java.util.List<java.util.Map<java.lang.String,java.lang.Object>> getNextMandatoryNodes(java.lang.Long)
```

- 无说明


### `getNextUseableUserAndScope`

```java
java.util.Map<java.lang.String,java.util.Map<java.lang.String,java.util.List<java.lang.Long>>> getNextUseableUserAndScope(java.lang.Long, java.lang.String)
```

获取下一步可选参与人和选择范围（白名单，黑名单，必选名单）


### `getNextUserTaskNodeByBusinessKey`

```java
java.util.List<java.util.Map<java.lang.String,java.lang.Object>> getNextUserTaskNodeByBusinessKey(java.lang.String)
```

任务预计算


### `getNextUserTaskNodeByModel`

```java
java.util.List<java.util.Map<java.lang.String,java.lang.Object>> getNextUserTaskNodeByModel(DynamicObject, java.lang.String, java.lang.String)
```

获取下一步节点信息


### `getNodeProp`

```java
java.lang.Object getNodeProp(java.lang.Long, java.lang.String, java.lang.String)
```

获取单据id返回某个节点配置的属性


### `getPageVariables`

```java
java.util.Map<java.lang.String,java.lang.Object> getPageVariables(java.lang.Long)
```

- 无说明


### `getPreComputorRecord`

```java
IPreComputorRecord getPreComputorRecord(java.lang.Long)
```

- 无说明


### `getPrintCommentWithParam`

```java
java.util.Collection<java.util.Map<java.lang.String,java.lang.String>> getPrintCommentWithParam(java.lang.String, java.lang.String, java.util.Map<java.lang.String,java.lang.Object>)
```

- 无说明


### `getPrintMetaEntityNumber`

```java
java.util.Collection<java.util.Map<java.lang.String,java.lang.Object>> getPrintMetaEntityNumber(java.lang.String)
```

根据实体编码获取对应的流程的节点
 	业务标识
 	节点名称
 	节点编码
 节点名称和节点编码均为最后一个的流程节点的
 采用的是覆盖上个节点名称和编码的方式


### `getProInsIdByBusinessKeyAndEntityNumber`

```java
java.lang.Long getProInsIdByBusinessKeyAndEntityNumber(java.lang.String, java.lang.String)
```

- 无说明


### `getProcDefById`

```java
java.util.Map<java.lang.String,java.lang.Object> getProcDefById(java.lang.Long)
```

- 无说明


### `getProcDefByNumberAndVerson`

```java
java.util.Map<java.lang.String,java.lang.Object> getProcDefByNumberAndVerson(java.lang.String, java.lang.String)
```

- 无说明


### `getProcElementsByProcDefId`

```java
java.util.List<WFFlowElement> getProcElementsByProcDefId(java.lang.Long)
```

- 无说明


### `getProcElementsBySchemeId`

```java
java.util.List<WFFlowElement> getProcElementsBySchemeId(java.lang.Long)
```

- 无说明


### `getProcElementsBySchemeNumber`

```java
java.util.List<WFFlowElement> getProcElementsBySchemeNumber(java.lang.String)
```

- 无说明


### `getProcSchemeBySchemeId`

```java
java.util.Map<java.lang.String,java.lang.Object> getProcSchemeBySchemeId(java.lang.Long)
```

- 无说明


### `getProcSchemeBySchemeNumber`

```java
java.util.Map<java.lang.String,java.lang.Object> getProcSchemeBySchemeNumber(java.lang.String)
```

- 无说明


### `getProcSchemesByProcDefId`

```java
java.util.List<java.util.Map<java.lang.String,java.lang.Object>> getProcSchemesByProcDefId(java.lang.Long)
```

- 无说明


### `getProcessAttachmentsInfo`

```java
java.util.Map<java.lang.String,java.util.List<ApprovalAttachmentInfo>> getProcessAttachmentsInfo(java.lang.String, java.lang.String)
```

获取流程附件


### `getProcessElements`

```java
java.util.List<WFFlowElement> getProcessElements(DynamicObject, java.lang.String)
```

获取流程模型节点信息


### `getProcessElements`

```java
java.util.List<WFFlowElement> getProcessElements(java.lang.String, java.lang.String)
```

返回流程模型节点信息


### `getProcessInfo`

```java
WFProcess getProcessInfo(DynamicObject, java.lang.String)
```

根据单据信息查找流程信息


### `getProcessInfo`

```java
WFProcess getProcessInfo(java.lang.String, java.lang.String)
```

返回流程信息


### `getProcessInstanceIdByBusinessKey`

```java
java.lang.Long getProcessInstanceIdByBusinessKey(java.lang.String)
```

根据业务单据ID查对应的流程实例ID


### `getProcessInstancePropertiesByBusinesskey`

```java
java.util.Map<java.lang.String,java.lang.Object> getProcessInstancePropertiesByBusinesskey(java.lang.String)
```

- 无说明


### `getProcessWindowRecords`

```java
java.util.List<java.util.Map<java.lang.String,java.lang.Object>> getProcessWindowRecords(java.lang.String)
```

- 无说明


### `getProcessWindowRecords`

```java
java.util.List<java.util.Map<java.lang.String,java.lang.Object>> getProcessWindowRecords(java.lang.Long, DynamicObject)
```

- 无说明


### `getRejectInnerNodes`

```java
java.util.List<java.util.Map<java.lang.String,java.lang.Object>> getRejectInnerNodes(java.lang.Long, java.lang.String)
```

- 无说明


### `getRejectNodes`

```java
java.util.List<WFRejectNodesModel> getRejectNodes(java.lang.Long, java.lang.String)
```

- 无说明


### `getTaskCountByType`

```java
java.lang.Long getTaskCountByType(java.lang.String, java.lang.String)
```

获取待办任务，已办任务，在办申请，已办申请的数量


### `getTaskCounts`

```java
java.util.Map<java.lang.String,java.lang.Integer> getTaskCounts(java.lang.String)
```

- 无说明


### `getTaskEntityName`

```java
java.util.List<java.util.Map<java.lang.String,java.lang.Object>> getTaskEntityName(java.lang.Long, java.lang.String)
```

- 无说明


### `getTaskIdByBusinessKeyAndUserId`

```java
java.lang.Long getTaskIdByBusinessKeyAndUserId(java.lang.String, java.lang.Long)
```

根据businessKey,userId获取任务id


### `getToHandleTasksByUserId`

```java
DynamicObjectCollection getToHandleTasksByUserId(int, int, java.lang.String)
```

描述:获取当前人的所有任务


### `getToHandleTasksMessage`

```java
java.util.List<java.util.Map<java.lang.String,java.lang.Object>> getToHandleTasksMessage(java.lang.Long, java.lang.Integer)
```

获取单板任务消息


### `getVariablesByProcInstId`

```java
java.util.Map<java.lang.String,java.lang.Object> getVariablesByProcInstId(java.lang.Long, java.lang.String[])
```

- 无说明


### `getWorkflowMultiLanguageIdsByAppId`

```java
java.util.List<java.lang.Long> getWorkflowMultiLanguageIdsByAppId(java.lang.String)
```

根据应用Id(applicationId)获取一个应用下全部工作流的资源Id(resourceId)


### `getWorkflowMultiLanguageWords`

```java
java.util.Map<java.lang.String,java.lang.Object> getWorkflowMultiLanguageWords(java.lang.Long)
```

根据工作流的资源Id(resourceId)获取所有的多语言词条


### `inProcess`

```java
boolean inProcess(java.lang.String)
```

描述：判断单据是否进入工作流


### `isUserBelongToRole`

```java
boolean isUserBelongToRole(java.lang.Long, java.lang.String)
```

判定人员是否属指定的工作流角色


### `jumpToNode`

```java
void jumpToNode(java.lang.Long, java.lang.String, java.lang.String)
```

- 无说明


### `makeWorkflowMultiLanguagePackage`

```java
java.util.Map<java.lang.String,java.lang.Object> makeWorkflowMultiLanguagePackage(java.util.Map<java.lang.String,java.lang.Object>)
```

工作流服务制作多语言安装包


### `rejectToInnerNode`

```java
void rejectToInnerNode(java.lang.Long, java.lang.Long, java.lang.String, java.lang.String, java.util.List<java.lang.String>, boolean, java.util.Map<java.lang.String,java.lang.Object>)
```

- 无说明


### `removeJointAuditParticipants`

```java
void removeJointAuditParticipants(java.lang.String, java.lang.String, java.util.List<java.lang.Long>)
```

- 无说明


### `replyCoordinateTask`

```java
void replyCoordinateTask(java.lang.Long, ILocaleString, java.util.List<java.util.Map<java.lang.String,java.lang.Object>>, java.lang.Long)
```

协办回复


### `revokeSuspendProcessInstancesByProcessInstanceId`

```java
void revokeSuspendProcessInstancesByProcessInstanceId(java.lang.Long)
```

- 无说明


### `setDynPanticipant`

```java
void setDynPanticipant(java.lang.Long, java.util.List<java.util.Map<java.lang.String,java.lang.String>>)
```

- 无说明


### `setProcessInstanceVariable`

```java
void setProcessInstanceVariable(java.lang.Long, java.lang.String, java.lang.Object)
```

设置流程变量


### `suspendProcessInstanceByProcessInstanceId`

```java
void suspendProcessInstanceByProcessInstanceId(java.lang.Long)
```

- 无说明


### `suspendTaskById`

```java
java.util.Map<java.lang.String,java.lang.Object> suspendTaskById(java.lang.Long, java.lang.Long, ILocaleString)
```

任务挂起


### `taskCirculate`

```java
java.util.Map<java.lang.String,java.lang.Object> taskCirculate(java.lang.Long, java.util.List<java.lang.Long>, ILocaleString)
```

任务传阅


### `taskCirculateForBatch`

```java
BatchOperateResult taskCirculateForBatch(java.util.List<java.lang.Long>, java.util.List<java.lang.Long>, java.lang.Long, ILocaleString)
```

任务传阅 for batch


### `taskCoordinate`

```java
java.lang.String taskCoordinate(java.lang.Long, java.util.List<java.lang.Long>, ILocaleString, java.lang.Boolean)
```

任务协办（请求）


### `taskCoordinateRequestWithdraw`

```java
java.lang.String taskCoordinateRequestWithdraw(java.lang.Long, java.util.List<java.lang.Long>)
```

协办任务撤回


### `taskReminders`

```java
java.util.Map<java.lang.String,java.lang.Object> taskReminders(java.lang.Long, ILocaleString)
```

催办功能 --- 根据当前taskid，查询当前任务的处理人，然后发送云之家消息


### `taskReminders`

```java
BatchOperateResult taskReminders(java.lang.Long[], ILocaleString)
```

批量催办功能


### `taskTransfer`

```java
void taskTransfer(java.lang.Long, java.lang.Long, java.lang.String, java.lang.Boolean)
```

任务转交


### `taskTransfer`

```java
void taskTransfer(java.lang.Long, java.lang.Long, ILocaleString, java.lang.Boolean)
```

任务转交(转交意见支持多语言)


### `tryTriggerProcess`

```java
void tryTriggerProcess(java.lang.String, java.lang.String, java.lang.String, java.util.Map<java.lang.String,java.lang.Object>)
```

描述：触发工作流


### `tryTriggerProcessByProcNumber`

```java
void tryTriggerProcessByProcNumber(java.lang.String, java.lang.String, java.lang.String, java.util.Map<java.lang.String,java.lang.Object>)
```

根据流程编码触发流程，与tryTriggerProcess参数顺序保持一致


### `updateParticipant`

```java
void updateParticipant(java.lang.Long, java.util.List<java.lang.Long>)
```

修改对应任务的参与人


### `updateTaskInfoAndParticipant`

```java
void updateTaskInfoAndParticipant(TaskInfo, java.util.List<java.lang.Long>)
```

描述:更新任务节点名称


### `updateTrdComment`

```java
void updateTrdComment(ThirdCommentInfo)
```

更新第三方Comment实体


### `updateTrdRelatedProcComment`

```java
void updateTrdRelatedProcComment(java.lang.String, Comment)
```

更新第三方关联的流程审批信息


### `updateWorkflowRole`

```java
WorkflowRoleResult updateWorkflowRole(java.util.List<WorkflowRole>)
```

- 无说明


### `viewFlowchart`

```java
void viewFlowchart(java.lang.String, java.lang.Object)
```

查看流程图，调用方式：例如：WorkflowServiceHelper.viewFlowchart(getView(), 347562958684947456L);


### `viewFlowchart`

```java
void viewFlowchart(java.lang.String, java.lang.Object, OpenStyle)
```

查看流程图


### `viewFlowchart`

```java
void viewFlowchart(java.lang.String, OpenStyle, java.lang.Object, java.lang.Long)
```

查看流程图


### `viewFlowchartWithEntityNumber`

```java
void viewFlowchartWithEntityNumber(java.lang.String, java.lang.String, java.lang.Object)
```

- 无说明


### `viewFlowchartWithEntityNumber`

```java
void viewFlowchartWithEntityNumber(java.lang.String, java.lang.String, java.lang.Object, OpenStyle)
```

- 无说明


### `viewFlowchartWithEntityNumber`

```java
void viewFlowchartWithEntityNumber(java.lang.String, java.lang.String, java.lang.Object, OpenStyle, java.lang.Long)
```

- 无说明


### `withdraw`

```java
void withdraw(DynamicObject)
```

描述：工作流撤回


### `withdraw`

```java
void withdraw(DynamicObject, java.lang.String)
```

描述：工作流撤回


### `withdrawTaskByBusinessKeyAndUserId`

```java
void withdrawTaskByBusinessKeyAndUserId(java.lang.String, java.lang.Long)
```

描述：根据businessKey、userId撤回（最近一次已办）任务


### `withdrawTaskByTaskId`

```java
void withdrawTaskByTaskId(java.lang.Long, java.lang.Long)
```

任务撤回通过taskId


### `withdrawTransferTask`

```java
java.util.Map<java.lang.String,java.lang.Object> withdrawTransferTask(java.lang.Long, java.lang.Long)
```

撤回转交任务

