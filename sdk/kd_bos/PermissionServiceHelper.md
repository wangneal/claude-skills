# PermissionServiceHelper


**包路径**: kd.bos.servicehelper.permission

**类型**: CLASS

**父类**: 无

**说明**: 权限服务类
 包含授权，验权，获取有权相关范围（如有权组织，有权应用，有权菜单）等接口


```java
public class PermissionServiceHelper
```


## 字段 (2 个)


| 字段名 | 类型 | 说明 |

|--------|------|------|

| ADMINTYPE_ORGADMIN | `java.lang.String` | 管理员参数常量枚举值-实名管理员 |

| ADMINTYPE_SUPERADMIN | `java.lang.String` | 管理员参数常量枚举值-虚拟管理员 |


## 方法 (113 个)


### `addNewScheme`

```java
long addNewScheme(java.lang.String, java.lang.String, java.lang.String, java.lang.String)
```

新增加密方案


### `appendPermItemAuthUpgrade`

```java
PermResult appendPermItemAuthUpgrade(java.util.List<java.lang.Object[]>, java.lang.StringBuilder)
```

追加权限项授权的升级逻辑


### `changeCheckPermEntity`

```java
java.lang.String[] changeCheckPermEntity(java.lang.String, java.lang.String)
```

转换验权业务对象


### `checkMultiPermItemInfos`

```java
java.util.Map<java.lang.String,java.lang.Boolean> checkMultiPermItemInfos(long, java.lang.String, java.lang.String, java.util.Set<java.lang.String>)
```

批量验证指定的权限项的授权情况


### `checkMultiPermItemInfos`

```java
java.util.Map<java.lang.String,java.lang.Boolean> checkMultiPermItemInfos(long, java.lang.String, java.util.Set<java.lang.String>)
```

批量验证指定的权限项的授权情况（忽略应用验权）


### `checkPermission`

```java
int checkPermission(long, java.lang.String, long, java.lang.String, java.lang.String, java.lang.String)
```

功能权限检查(按权限隔离维度)

 根据用户，隔离维度（组织等）， 应用，实体，权限项验权


### `checkPermission`

```java
boolean checkPermission(java.lang.Long, java.lang.String, java.lang.String, java.lang.String)
```

判断指定用户是否拥有指定应用指定表单的指定权限项(不考虑隔离维度)


### `checkPermission`

```java
int checkPermission(java.lang.Long, java.lang.Long, java.lang.String, java.lang.String, java.lang.String, java.lang.String)
```

功能权限检查(按 业务单元+职能类型 验权)


### `checkPermission`

```java
int checkPermission(java.lang.Long, java.util.Map<java.lang.Long,java.lang.String>, java.lang.String, java.lang.String, java.lang.String)
```

功能权限检查(按多个业务单元+职能类型 验权)


### `checkPermission`

```java
int checkPermission(java.lang.Long, java.lang.String, java.util.List<java.lang.Long>, java.lang.String, java.lang.String, java.lang.String)
```

功能权限检查(按多个权限隔离对象)


### `checkPermission`

```java
int checkPermission(java.lang.Long, java.lang.Long, java.lang.String, java.lang.String, java.lang.String)
```

功能权限检查(按 业务单元 验权)


### `checkPermission`

```java
boolean checkPermission(long, java.lang.String, java.lang.String, java.lang.String, java.lang.String)
```

判断指定用户是否拥有指定授权：应用-表单-权限项
 orgViewType这个入参，从目前的实现上来说，可能只有在entityNum对应的是动态表单时，
 可能有意义，因为动态表单有时无法指定权限控制主字段或辅字段，那么此时调用者可能需要按指定组织职能来验权；
 如果当前表单本身有指定权限控制主字段或辅字段，那么按这些字段的组织职能来验权


### `checkSchemeEnable`

```java
boolean checkSchemeEnable(long)
```

判断加密方案是否启用


### `checkUserBizApp`

```java
java.lang.Boolean checkUserBizApp(java.lang.Long, java.lang.String)
```

判断用户对指定应用是否有权


### `clearAllCache`

```java
boolean clearAllCache()
```

清理所有权限相关缓存


### `clearAllUserAppCache`

```java
boolean clearAllUserAppCache()
```

清理所有用户的有权应用的权限缓存


### `clearHasEnableOldAdmin`

```java
boolean clearHasEnableOldAdmin()
```

清理 启用管理员状态标识 缓存
 一开始因为组织修改后 clearAll把这个状态标识的缓存也清除了，导致每次都需要查库获取标识
 所以将此缓存分离管理


### `copyUserPermission`

```java
void copyUserPermission(long, long, boolean, boolean, boolean)
```

复制权限： 复制给单个目标用户


### `copyUserPermission`

```java
void copyUserPermission(long, long, boolean, boolean, boolean, java.lang.StringBuilder)
```

复制权限： 复制给单个目标用户，并把同步分配许可结果作为参数返回


### `copyUserPermission`

```java
void copyUserPermission(long, long, boolean, boolean, boolean, boolean, java.lang.StringBuilder)
```

复制权限： 复制给单个目标用户，并把同步分配许可结果作为参数返回


### `copyUserPermission`

```java
void copyUserPermission(long, java.util.List<java.lang.Long>, boolean, boolean, boolean, boolean, java.lang.StringBuilder)
```

复制权限： 复制给多个目标用户


### `copyUserPermission`

```java
void copyUserPermission(long, java.util.List<java.lang.Long>, boolean, boolean, boolean)
```

复制权限： 复制给多个目标用户
 实现指定源用户的权限, 复制给目标用户（可批量复制给多个目标用户），可指定是否复制“直接授权”，是否复制“分配角色”， 是否复制“用户授权-分配角色-禁用权限”中的配置等。


### `copyUserPermission`

```java
void copyUserPermission(long, java.util.List<java.lang.Long>, boolean, boolean, boolean, java.lang.StringBuilder)
```

复制权限： 复制给多个目标用户


### `decryptData`

```java
com.alibaba.fastjson.JSONObject decryptData(long, java.lang.String)
```

数据解密


### `delDataRule`

```java
boolean delDataRule(QFilter[], java.lang.StringBuilder)
```

删除数据规则方案


### `deleteRole`

```java
boolean deleteRole(RoleInfo, java.lang.StringBuilder)
```

删除角色


### `deleteUserPermission`

```java
boolean deleteUserPermission(java.util.List<java.lang.Long>, java.lang.StringBuilder)
```

删除指定用户所有权限。


### `encryptData`

```java
com.alibaba.fastjson.JSONObject encryptData(long, java.lang.String)
```

数据加密


### `generateSignature`

```java
com.alibaba.fastjson.JSONObject generateSignature(java.lang.String, long)
```

价签签名


### `generateSignature`

```java
com.alibaba.fastjson.JSONObject generateSignature(java.lang.String, java.lang.String)
```

价签签名


### `generateSignature`

```java
com.alibaba.fastjson.JSONObject generateSignature(java.util.Map<java.lang.String,java.lang.String>, long)
```

批量价签签名


### `generateSignature`

```java
com.alibaba.fastjson.JSONObject generateSignature(java.util.Map<java.lang.String,java.lang.String>, java.lang.String)
```

批量价签签名


### `getAdminChargeApps`

```java
java.util.List<java.lang.String> getAdminChargeApps(java.lang.Long)
```

获取管理员管辖的应用


### `getAdminChargeApps`

```java
java.util.List<java.lang.String> getAdminChargeApps(java.lang.Long, java.util.Map<java.lang.String,java.lang.Object>)
```

获取管理员管辖的应用


### `getAdminChargeOrg`

```java
HasPermOrgResult getAdminChargeOrg(java.lang.Long, java.lang.String, boolean)
```

获取管理员管辖的组织范围


### `getAdminChargeUser`

```java
UserScopeResult getAdminChargeUser(java.lang.Long, boolean)
```

获取管理员管理的的用户范围


### `getAdminExtraUser`

```java
java.util.List<java.lang.Long> getAdminExtraUser(java.lang.Long)
```

获取管理员行政组织管辖范围外的用户


### `getAdminType`

```java
AdminType getAdminType(long)
```

获取当前用户的管理员类型


### `getAllCheckPermEntityMap`

```java
java.util.List<SaveEntityMapInfo> getAllCheckPermEntityMap()
```

查出验权路由表中的所有映射信息


### `getAllNoPermMenuIdsByAppId`

```java
java.util.List<java.lang.String> getAllNoPermMenuIdsByAppId(java.lang.Long, java.lang.String)
```

获取用户在指定应用下的无权菜单的范围
 返回值之所以是无权菜单的范围，而不是有权菜单范围，是因为无权菜单肯定不显示，但有权可能还需要其他业务因素的判断。


### `getAllPermDimObj`

```java
DimensionPermOrgResult getAllPermDimObj(java.lang.Long, java.lang.String, java.lang.String, java.lang.String)
```

获取用户在指定应用-表单-权限项下的主辅字段的有权组织范围。


### `getAllPermOrgs`

```java
HasPermOrgResult getAllPermOrgs(long, java.lang.String, java.lang.String, java.lang.String, java.lang.String, boolean)
```

获取有权限的业务单元。（带职能类型参数）


### `getAllPermOrgs`

```java
HasPermOrgResult getAllPermOrgs(long, java.lang.String, java.lang.String, java.lang.String, java.lang.String)
```

获取有权限的业务单元。（带职能类型参数）
 orgViewType这个入参，从目前的实现上来说，是强制指定验权的组织职能，不考虑实体表单上权限控制主字段和辅字段所对应的组织职能类型


### `getAllPermOrgs`

```java
HasPermOrgResult getAllPermOrgs(long, java.lang.String, boolean, java.lang.String, java.lang.String, java.lang.String)
```

获取有权限的业务单元。（带职能类型参数）
 orgViewType这个入参，从目前的实现上来说，是强制指定验权的组织职能，不考虑实体表单上权限控制主字段和辅字段所对应的组织职能类型


### `getAppBlackSet`

```java
java.util.Set<java.lang.String> getAppBlackSet(java.lang.Long)
```

全员应用黑名单询服务


### `getAppUser`

```java
java.util.Set<java.lang.Long> getAppUser(java.lang.String)
```

获取拥有指定应用id的权限的用户列表


### `getAuthorizedBizOrg`

```java
HasPermOrgResult getAuthorizedBizOrg(java.lang.Long, java.lang.String, java.lang.String, java.lang.String, java.lang.String)
```

获取有权限的业务组织id
 orgViewType这个入参，从目前的实现上来说，是强制指定验权的组织职能，不考虑实体表单上权限控制主字段和辅字段所对应的组织职能类型


### `getBizRolesByUserID`

```java
java.util.List<java.lang.Long> getBizRolesByUserID(java.lang.Long)
```

获取用户拥有的业务角色


### `getDataPermWithOrg`

```java
QFilter getDataPermWithOrg(long, java.lang.String, java.lang.String)
```

获取指定用户、应用，实体下的数据权限规则


### `getDataPermission`

```java
QFilter getDataPermission(long, java.lang.String, java.lang.String)
```

获取指定用户，应用，实体下有权使用的数据权限


### `getDataPermission`

```java
QFilter getDataPermission(long, java.lang.String, java.lang.String, java.util.List<java.lang.Long>)
```

获取用户在指定组织范围下，在指定表单的查询权下配置的数据规则。


### `getDataRule`

```java
QFilter getDataRule(long, java.lang.String, java.lang.String, java.lang.String)
```

获取用户在指定表单的权限项下被分配的过滤条件（不考虑隔离维度（如组织，体系，渠道等））


### `getDataRule`

```java
QFilter getDataRule(long, java.lang.String, java.lang.String, java.lang.String, java.lang.Long)
```

获取用户在指定组织范围下在指定表单的权限项下被分配的过滤条件


### `getDataRuleForBdProp`

```java
QFilter getDataRuleForBdProp(long, java.lang.String, java.lang.String, java.lang.String)
```

获取用户在指定表单的基础资料属性上被分配的过滤条件（不考虑隔离维度（如组织，体系，渠道等））


### `getDirectorChargeOrgs`

```java
java.util.List<java.lang.Long> getDirectorChargeOrgs(java.lang.String, java.lang.String, java.lang.String, java.lang.Long)
```

特殊数据权限-获取指定用户在指定应用-表单-操作下在特殊数据权限中配置的的指定负责组织的范围


### `getEntityIdByEntityNum`

```java
java.lang.String getEntityIdByEntityNum(java.lang.String)
```

根据实体编码查对应的实体id


### `getFieldControlRule`

```java
FieldControlRule getFieldControlRule(long, long, java.lang.String, java.lang.String)
```

获取字段权限


### `getFieldControlRules`

```java
FieldControlRules getFieldControlRules(long, java.lang.String, java.lang.String)
```

获取字段权限


### `getFieldRulesSum`

```java
FieldControlRule getFieldRulesSum(java.lang.Long, java.lang.String, java.lang.String)
```

获取指定用户、应用，实体的字段权限规则（不区分组织）


### `getHasPermDimObjs`

```java
HasPermDimObjResult getHasPermDimObjs(long, java.lang.String, java.lang.String, java.lang.String)
```

获取有权的隔离维度对象范围


### `getHasPermDimObjs`

```java
HasPermDimObjResult getHasPermDimObjs(long, java.lang.String, java.lang.String)
```

获取授权的隔离维度对象范围（没有加入管理员的校验）


### `getHasPermItems`

```java
java.util.Map<java.lang.String,java.lang.Boolean> getHasPermItems(java.lang.Long, java.lang.String, java.lang.String)
```

获取用户在指定应用-表单下的有权和无权的权限项情况（不考虑隔离维度分配情况）


### `getMultiPermItemInfos`

```java
java.util.Map<java.lang.String,java.lang.Boolean> getMultiPermItemInfos(long, java.lang.String, java.lang.String)
```

获取当前表单所有权限项的授权情况


### `getOperationRuleFilter`

```java
QFilter getOperationRuleFilter(java.lang.Long, java.lang.String, java.lang.String, java.lang.String, java.lang.StringBuilder)
```

获取指定参数范围对应的特殊数据权限的过滤条件


### `getOperationRuleFilter`

```java
QFilter getOperationRuleFilter(java.lang.String, java.lang.String, java.lang.String, java.lang.StringBuilder)
```

获取指定参数范围对应的特殊数据权限的过滤条件
 这个方法不包含用户id，默认为上下文中的当前用户


### `getPermCtrlTypeNameByNumber`

```java
java.lang.String getPermCtrlTypeNameByNumber(java.lang.String)
```

根据权限控制类型的编码，获取权限控制类型的名称


### `getPermItemNameById`

```java
java.lang.String getPermItemNameById(java.lang.String)
```

根据权限项id，获取权限项的名称


### `getPermItemNameByNumber`

```java
java.lang.String getPermItemNameByNumber(java.lang.String)
```

根据权限项编码，获取权限项名称


### `getRoleInfos`

```java
RoleInfo getRoleInfos(java.lang.String)
```

获取指定通用角色的信息


### `getRolesByUser`

```java
java.util.Set<java.lang.String> getRolesByUser(java.lang.Long)
```

获取当前用户拥有的所有通用角色


### `getSchemes`

```java
java.util.List<DynamicObject> getSchemes()
```

获取加密方案


### `getSupportAlgorithms`

```java
java.util.Map<java.lang.String,java.util.List<java.lang.Integer>> getSupportAlgorithms()
```

获取加密方案支持算法


### `getUsableEntitiesInfo`

```java
java.lang.String getUsableEntitiesInfo(java.lang.Long)
```

获取指定用户有权使用的实体信息（不考虑隔离维度的范围）


### `getUserBeyondChargeOrg`

```java
java.util.List<java.lang.Long> getUserBeyondChargeOrg(long)
```

获取管理员管辖的行政组织管辖范围外用户


### `getUserBizApps`

```java
java.util.List<java.lang.String> getUserBizApps(java.lang.Long)
```

获取用户有权使用的应用ID列表


### `getUserHasPermDimObjs`

```java
HasPermDimObjResult getUserHasPermDimObjs(long, java.lang.String)
```

获得用户所有授权的隔离维度范围（指定隔离维度）


### `getUserHasPermOrgs`

```java
HasPermOrgResult getUserHasPermOrgs(long, boolean)
```

获取用户的有权的组织范围（同首页右上角的切换组织中的内容）


### `getUserNoPermMenuByBatchApp`

```java
java.util.Map<java.lang.String,java.util.Set<java.lang.String>> getUserNoPermMenuByBatchApp(java.lang.Long, java.util.Set<java.lang.String>)
```

批量应用 获取用户无权菜单

 用户进入某个应用时，需将无权的菜单隐藏掉
 根据用户ID和应用ID获取接口返回无权的菜单ID
 用户有权的菜单是已授权业务对象及没有配置权限项的业务对象的并集


### `getUserPrivacyStmt`

```java
java.util.Map<java.lang.String,java.lang.String> getUserPrivacyStmt(java.lang.String, java.lang.String, java.lang.Long)
```

隐私声明查询服务


### `getUsersByRoleID`

```java
java.util.List<java.lang.Long> getUsersByRoleID(java.lang.String)
```

根据角色ID获取该角色下所有用户


### `getUsersByRoleNum`

```java
java.util.List<java.lang.Long> getUsersByRoleNum(java.lang.String)
```

根据角色编码获取该角色下所有用户


### `hasBindingFunctionPerm`

```java
boolean hasBindingFunctionPerm(java.lang.String)
```

判断指定实体是否需要权限控制，如果当前实体在设计器中打开了权限控制开关，并且至少绑定了一个权限项，那么认为指定实体需要权限控制，否则认为不受控。


### `hasEnableOldAdmin`

```java
boolean hasEnableOldAdmin()
```

判断是否启用了旧管理员功能


### `hasNewPermission`

```java
boolean hasNewPermission(long, java.lang.String, java.lang.String)
```

判断用户是否拥有指定实体的新增权（不考虑隔离维度）


### `hasViewPermission`

```java
boolean hasViewPermission(long, java.lang.String, java.lang.String)
```

判断用户是否有指定应用-实体的查看权（不考虑隔离维度）


### `isAdminUser`

```java
boolean isAdminUser(long)
```

判断指定用户是不是管理员。


### `isAdminUser`

```java
boolean isAdminUser(long, java.lang.String)
```

描述：检查用户是不是管理员。


### `isAdminUser`

```java
boolean isAdminUser(long, AdminType)
```

检查当前用户是否指定员类型的管理员。


### `isDirector`

```java
java.lang.Boolean isDirector(java.lang.String, java.lang.String, java.lang.String, java.lang.Long, java.lang.Long)
```

特殊数据权限-判断指定用户在指定表单的操作下，是不是指定行政组织下的指定主管


### `isSuperUser`

```java
boolean isSuperUser(long)
```

判断用户是不是全功能用户。


### `justDrPermLog`

```java
PermResult justDrPermLog(LogDrInfo, LogDrInfo, java.util.Set<java.lang.String>, PermLogReq)
```

新数据规则（仅）记录权限日志
 只用于记录权限日志，不保存数据规则


### `matchDataRule`

```java
boolean matchDataRule(long, java.lang.String, java.lang.String, java.lang.String, QFilter[])
```

判断用户在指定应用-表单-权限项下，操作指定条件的表单记录时，是否匹配数据规则


### `modifyDataRule`

```java
boolean modifyDataRule(java.lang.Long, DataRuleInfo, java.lang.StringBuilder)
```

修改数据规则方案


### `modifyRole`

```java
boolean modifyRole(RoleInfo, java.lang.StringBuilder)
```

修改角色


### `newDataRule`

```java
boolean newDataRule(DataRuleInfo, java.lang.StringBuilder)
```

新增数据规则方案


### `newRole`

```java
boolean newRole(RoleInfo, java.lang.StringBuilder)
```

新建角色


### `queryDataRule`

```java
DataRuleInfo[] queryDataRule(QFilter[], java.lang.StringBuilder)
```

查询数据规则


### `queryRoles`

```java
RoleInfo[] queryRoles(QFilter)
```

根据给定的过滤条件查询出角色信息


### `roleAssignDataRules`

```java
boolean roleAssignDataRules(java.lang.String, DataRulesInfo, java.lang.String, java.lang.StringBuilder)
```

通用角色分配数据规则


### `roleAssignFuncPerm`

```java
boolean roleAssignFuncPerm(java.lang.String, java.util.Map<java.lang.String,java.util.Map<java.lang.String,java.util.List<java.lang.String>>>, boolean, java.lang.StringBuilder)
```

通用角色分配功能权限


### `roleAssignOrgUser`

```java
boolean roleAssignOrgUser(java.lang.String, java.util.Map<java.lang.Long,java.util.List<java.lang.Long>>, java.util.Map<java.lang.Long,java.lang.Boolean>, boolean)
```

通用角色-分配组织用户


### `roleAssignOrgUser`

```java
boolean roleAssignOrgUser(java.lang.String, java.lang.String, java.util.Map<java.lang.Long,java.util.List<java.lang.Long>>, java.util.Map<java.lang.Long,java.lang.Boolean>, boolean)
```

通用角色-分配组织用户


### `roleAssignOrgUser`

```java
boolean roleAssignOrgUser(java.lang.String, java.util.Map<java.lang.Long,java.util.List<java.lang.Object[]>>, java.lang.String, java.util.Map<java.lang.Long,java.lang.Boolean>, boolean)
```

通用角色-分配组织用户


### `roleAssignUserDim`

```java
PermResult roleAssignUserDim(java.util.List<RoleAssignUserDimReq>, PermLogReq)
```

通用角色分配用户-隔离维度
 例如：通用角色分配组织-用户、通用角色分配用户-组织
 ps：先执行req中 addList，再执行 delList


### `roleAssignUserOrg`

```java
boolean roleAssignUserOrg(java.lang.String, java.util.Map<java.lang.Long,java.util.List<java.lang.Long>>, java.util.Map<java.lang.Long,java.lang.Boolean>, boolean)
```

通用角色-分配用户组织


### `roleAssignUserOrg`

```java
boolean roleAssignUserOrg(java.lang.String, java.lang.String, java.util.Map<java.lang.Long,java.util.List<java.lang.Long>>, java.util.Map<java.lang.Long,java.lang.Boolean>, boolean)
```

通用角色-分配用户组织


### `roleAssignUserOrg`

```java
boolean roleAssignUserOrg(java.lang.String, java.util.Map<java.lang.Long,java.util.List<java.lang.Object[]>>, java.lang.String, java.util.Map<java.lang.Long,java.lang.Boolean>, boolean)
```

通用角色-分配用户组织


### `saveCheckPermEntMap`

```java
PermResult saveCheckPermEntMap(java.util.List<SaveEntityMapInfo>, boolean)
```

保存 源对象和目标业务对象的关联关系
 保存时，可以只提供目标业务对象，和源业务对象和描述，其他为空。
 删除时，可以只提供目标业务对象，其他为空（null，空格，空串），此时按目标业务对象删除所有对应记录


### `userAssignDimRole`

```java
PermResult userAssignDimRole(java.util.List<UserAssignDimRoleReq>, PermLogReq)
```

用户分配隔离维度-通用角色
 例如：用户分配组织-用户
 ps：先执行req中 addList，再执行 delList


### `userAssignRole`

```java
boolean userAssignRole(java.lang.Long, java.lang.String, java.util.Map<java.lang.Long,java.util.List<java.lang.String>>, java.util.Map<java.lang.Long,java.lang.Boolean>, boolean)
```

用户分配通用角色

 实现指定用户在指定组织下，分配角色。可以分配，也可以取消分配。


### `userAssignRole`

```java
boolean userAssignRole(java.lang.Long, java.util.Map<java.lang.Long,java.util.List<java.lang.Object[]>>, java.lang.String, java.util.Map<java.lang.Long,java.lang.Boolean>, boolean)
```

用户分配通用角色

 实现指定用户在指定组织下，分配角色。可以分配，也可以取消分配。


### `userDirectAssignPerm`

```java
boolean userDirectAssignPerm(java.lang.Long, java.lang.String, java.lang.Long, java.util.Map<java.lang.String,java.util.Map<java.lang.String,java.util.List<java.lang.String>>>, boolean, boolean)
```

用户直接授权


### `userDisFuncPerm`

```java
boolean userDisFuncPerm(java.lang.Long, java.lang.String, java.util.List<java.lang.Long>, java.util.Map<java.lang.String,java.util.Map<java.lang.String,java.util.List<java.lang.String>>>, boolean)
```

用户禁用权限

