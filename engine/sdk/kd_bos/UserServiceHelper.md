# UserServiceHelper


**包路径**: kd.bos.servicehelper.user

**类型**: CLASS

**父类**: 无

**说明**: 公共资料服务类：人员


```java
public class UserServiceHelper
```


## 字段 (12 个)


| 字段名 | 类型 | 说明 |

|--------|------|------|

| ENERGY_ORANGE_COLOR_ID | `int` | 活力橙主题ID |

| ENTITY_BIZPARTNERUSER | `java.lang.String` | 实体标识：商务伙伴用户实体 |

| ENTITY_USER_DEFAULT_ORG | `java.lang.String` | 实体标识：用户默认组织实体 |

| ORG | `java.lang.String` | 字段标识：组织 |

| ROOT_ORG_ID | `long` | 根组织ID |

| USER | `java.lang.String` | 字段标识：用户 |

| cacheKey | `java.lang.String` | 缓存key：userservice |

| entityID_uitheme | `java.lang.String` | 实体标识：界面主题 |

| entityID_user | `java.lang.String` | 实体标识：人员实体 |

| entityID_userChange | `java.lang.String` | 实体标识：人员变动 |

| entityID_userposition | `java.lang.String` | 实体标识：人员任职实体 |

| entityID_useruitheme | `java.lang.String` | 实体标识：用户界面主题 |


## 方法 (92 个)


### `add`

```java
void add(java.util.List<UserParam>)
```

人员新增


### `addOrUpdate`

```java
void addOrUpdate(java.util.List<UserParam>)
```

人员新增或新增


### `changePsw`

```java
java.util.Map<java.lang.String,java.lang.Object> changePsw(long, java.lang.String)
```

设置用户密码的接口


### `changePsw`

```java
java.util.Map<java.lang.String,java.lang.Object> changePsw(long, java.lang.String, java.lang.String)
```

设置用户密码的接口


### `delete`

```java
void delete(java.util.List<UserParam>)
```

人员删除


### `disable`

```java
void disable(java.util.List<UserParam>)
```

人员禁用


### `disableHR`

```java
void disableHR(java.util.List<UserParam>)
```

人员禁用HR


### `disableUser`

```java
void disableUser(java.util.List<UserParam>)
```

禁用用户


### `enable`

```java
void enable(java.util.List<UserParam>)
```

人员启用


### `enableHR`

```java
void enableHR(java.util.List<UserParam>)
```

人员启用禁用HR


### `enableUser`

```java
void enableUser(java.util.List<UserParam>)
```

启用用户


### `get`

```java
java.util.List<java.util.Map<java.lang.String,java.lang.Object>> get(java.util.List<java.lang.Long>)
```

获取人员信息


### `get`

```java
java.util.List<java.util.Map<java.lang.String,java.lang.Object>> get(java.util.List<java.lang.Long>, java.lang.String[], java.lang.String[])
```

获取人员信息


### `getAllDepartmentByUserId`

```java
java.util.List<java.lang.Long> getAllDepartmentByUserId(long)
```

根据人员ID获取其所有所属部门


### `getAllPartnerUsersOfOrg`

```java
java.util.Set<java.lang.Long> getAllPartnerUsersOfOrg(java.util.List<java.lang.Long>, boolean, boolean)
```

根据条件获取相应组织下所有的商务伙伴用户ID


### `getAllUserContactType`

```java
java.util.List<java.util.Map<java.lang.String,java.lang.Object>> getAllUserContactType()
```

获取人员所有的联系方式类型


### `getAllUserType`

```java
java.util.List<java.lang.Long> getAllUserType(boolean)
```

获取所有人员类型


### `getAllUsersOfOrg`

```java
java.util.List<java.lang.Long> getAllUsersOfOrg(long)
```

得到当前组织的全部人员，包括直属员工和下属组织的员工


### `getAllUsersOfOrg`

```java
java.util.List<java.lang.Long> getAllUsersOfOrg(java.util.List<java.lang.Long>)
```

得到给定组织集合的全部人员，包括直属员工和下属组织的员工


### `getAllUsersOfOrg`

```java
java.util.List<java.lang.Long> getAllUsersOfOrg(java.util.List<java.lang.Long>, boolean)
```

得到给定组织集合的全部人员


### `getAllUsersOfOrg`

```java
java.util.Set<java.lang.Long> getAllUsersOfOrg(int, java.util.List<java.lang.Long>, boolean, boolean)
```

根据指定部门查询人员


### `getAllUsersOfOrg`

```java
java.util.Set<java.lang.Long> getAllUsersOfOrg(java.util.List<java.lang.Long>, boolean, boolean)
```

根据条件获取相应组织下所有的人员ID


### `getBizPartnerByUserId`

```java
java.util.List<java.lang.Long> getBizPartnerByUserId(long)
```

获取人员所属的商务伙伴


### `getBizPartnerUserInfo`

```java
java.util.Map<java.lang.String,java.lang.Object> getBizPartnerUserInfo(java.util.Map<java.lang.String,java.lang.Object>)
```

描述：获取商务伙伴用户信息


### `getCompanyByUserIds`

```java
java.util.Map<java.lang.Long,java.lang.Long> getCompanyByUserIds(java.util.List<java.lang.Long>)
```

根据人员id获取人员主职部门所属公司


### `getCurrentUser`

```java
DynamicObject getCurrentUser(java.lang.String)
```

获取当前人员的信息


### `getCurrentUserDepts`

```java
DynamicObjectCollection getCurrentUserDepts(java.lang.String, boolean)
```

获取当前人员的部门信息


### `getCurrentUserId`

```java
long getCurrentUserId()
```

获取当前人员ID


### `getCurrentUserInchargeDepts`

```java
DynamicObjectCollection getCurrentUserInchargeDepts(java.lang.String, boolean)
```

获取当前人员负责的部门分录信息


### `getDefaultUIThemeNumAndVer`

```java
java.util.Map<java.lang.String,java.lang.Object> getDefaultUIThemeNumAndVer()
```

描述：获取默认主题


### `getDefaultUIThemeNumAndVerList`

```java
DynamicObject[] getDefaultUIThemeNumAndVerList()
```

描述：获取所有主题


### `getDefaultUIThemeNumAndVerNew`

```java
java.util.Map<java.lang.String,java.lang.Object> getDefaultUIThemeNumAndVerNew()
```

获取默认主题


### `getDirectUsersOfOrg`

```java
java.util.List<java.lang.Long> getDirectUsersOfOrg(long)
```

得到当前组织的直属员工（人员）


### `getInChargeOfBizPartnerByUserId`

```java
java.util.List<java.lang.Long> getInChargeOfBizPartnerByUserId(long)
```

获取人员负责管理的商务伙伴


### `getInchargeOrgs`

```java
java.util.List<java.lang.Long> getInchargeOrgs(long, boolean)
```

获取指定人员的负责部门


### `getManagersOfOrg`

```java
java.util.List<java.lang.Long> getManagersOfOrg(long)
```

获取当前组织的负责人，因为允许有多个人，返回列表


### `getMangedOrgsOfUser`

```java
java.util.List<java.lang.Long> getMangedOrgsOfUser(long)
```

得到当前用户负责的所有组织


### `getOrgsUserJoin`

```java
java.util.List<java.lang.Long> getOrgsUserJoin(long)
```

得到用户加入的所有组织


### `getPerson`

```java
java.lang.String getPerson(long, long, PersonQueryType, java.util.List<java.lang.Long>)
```

根据条件获取人员


### `getPerson`

```java
java.util.List<java.lang.Long> getPerson(PersonQueryParam)
```

根据条件获取人员信息


### `getPosition`

```java
java.util.List<java.util.Map<java.lang.String,java.lang.Object>> getPosition(java.util.List<java.lang.Long>)
```

获取人员职位信息


### `getThemeCSS`

```java
java.lang.String getThemeCSS(java.lang.String)
```

描述：获取界面主题样式内容


### `getUserAvatarPath`

```java
java.util.Map<java.lang.Long,java.lang.String> getUserAvatarPath(java.util.List<java.lang.Long>, boolean)
```

获取人员头像地址


### `getUserBaseTypeByIds`

```java
java.util.Map<java.lang.Long,java.lang.Integer> getUserBaseTypeByIds(java.util.List<java.lang.Long>)
```

获取人员基本类型


### `getUserChangeAbleOrg`

```java
HasPermOrgResult getUserChangeAbleOrg(long, boolean)
```

获取用户可切换的组织集合


### `getUserChangeInfos`

```java
java.util.List<java.util.Map<java.lang.String,java.lang.Object>> getUserChangeInfos(java.lang.String, boolean, boolean)
```

描述：取人员变动信息接口


### `getUserChangeInfos`

```java
java.util.List<java.util.Map<java.lang.String,java.lang.Object>> getUserChangeInfos(java.lang.String)
```

描述：取人员变动信息接口


### `getUserContact`

```java
java.util.Map<java.lang.Long,java.util.Map<java.lang.String,java.util.List<java.lang.String>>> getUserContact(java.util.List<java.lang.Long>)
```

获取人员所有的联系方式


### `getUserContact`

```java
java.util.Map<java.lang.Long,java.util.List<java.lang.String>> getUserContact(java.lang.String, java.util.List<java.lang.Long>)
```

获取人员的联系方式


### `getUserDefaultOrgID`

```java
long getUserDefaultOrgID(long)
```

获取用户默认组织


### `getUserDefaultPsw`

```java
java.lang.String getUserDefaultPsw()
```

获取用户默认密码


### `getUserDepartment`

```java
java.util.List<java.lang.Long> getUserDepartment(long, boolean)
```

获取人员的任职部门


### `getUserIndirectSuperior`

```java
java.util.List<java.util.Map<java.lang.String,java.lang.Object>> getUserIndirectSuperior(java.lang.String, long, long, java.util.Date)
```

根据业务日期获取用户的间接上级负责人


### `getUserInfoByID`

```java
java.util.Map<java.lang.String,java.lang.Object> getUserInfoByID(long)
```

根据用户id获取用户信息（单个）


### `getUserInfoByID`

```java
java.util.List<java.util.Map<java.lang.String,java.lang.Object>> getUserInfoByID(java.util.List<java.lang.Long>)
```

根据用户id获取用户信息（批量）


### `getUserInfoByID`

```java
DynamicObject getUserInfoByID(java.lang.Long, java.lang.String)
```

根据用户ID获取人员信息


### `getUserInfoByIndirectSuperior`

```java
java.util.Map<java.lang.Long,java.util.Map<java.lang.String,java.lang.Object>> getUserInfoByIndirectSuperior(long)
```

获取间接上级信息 间接上级=直接上级的直接上级 如果没有直接上级的直接上级，则返回直接上级（根组织负责人）


### `getUserInfoBySuperior`

```java
java.util.Map<java.lang.Long,java.util.Map<java.lang.String,java.lang.Object>> getUserInfoBySuperior(long)
```

获取用户所有上级负责人的信息


### `getUserMainJob`

```java
java.lang.String getUserMainJob(long)
```

根据人员ID获取人员的主职位


### `getUserMainJob`

```java
java.util.Map<java.lang.Long,java.lang.String> getUserMainJob(java.util.List<java.lang.Long>)
```

根据人员ID获取人员的主职位


### `getUserMainOrgId`

```java
long getUserMainOrgId(long)
```

获取用户的主要职务部门


### `getUserMainOrgId`

```java
java.util.List<java.util.Map<java.lang.Long,java.lang.Long>> getUserMainOrgId(java.util.List<java.lang.Long>)
```

批量获取用户的主职部门


### `getUserMainOrgIds`

```java
java.util.List<java.lang.Long> getUserMainOrgIds(java.util.List<java.lang.Long>)
```

查询用户主职部门


### `getUserSubordinate`

```java
java.util.List<java.lang.Long> getUserSubordinate(long, int)
```

获取人员下属员工


### `getUserSuperior`

```java
java.util.List<java.util.Map<java.lang.String,java.lang.Object>> getUserSuperior(java.lang.String, long, long, java.util.Date)
```

根据业务日期获取用户的直接上级负责人


### `getUserTheme`

```java
java.util.Map<java.lang.String,java.lang.Object> getUserTheme(java.lang.Long)
```

描述：获取用户界面主题


### `getUserThemeID`

```java
java.lang.Long getUserThemeID(java.lang.Long)
```

描述：获取用户界面主题


### `getUserThemeNumAndVer`

```java
java.util.Map<java.lang.String,java.lang.Object> getUserThemeNumAndVer(java.lang.Long)
```

描述：获取当前用户对应主题及主题版本号


### `getUserThemeNumAndVerNew`

```java
java.util.Map<java.lang.String,java.lang.Object> getUserThemeNumAndVerNew(java.lang.Long)
```

获取当前用户的默认主题


### `getUsersByIndirectSubordinate`

```java
java.util.List<java.lang.Long> getUsersByIndirectSubordinate(long)
```

获得间接下级，是否是只取间接下级组织的负责人？？需求待定


### `getUsersByIndirectSuperior`

```java
java.util.List<java.lang.Long> getUsersByIndirectSuperior(long)
```

获取间接上级 间接上级=直接上级的直接上级 如果没有直接上级的直接上级，则返回直接上级（根组织负责人）


### `getUsersBySubordinate`

```java
java.util.List<java.lang.Long> getUsersBySubordinate(long, boolean)
```

获得当前人的所有下属，包括直接下属，根据参数获取间接下级


### `getUsersBySubordinate`

```java
java.util.List<java.lang.Long> getUsersBySubordinate(long)
```

获取当前用户的直接下级


### `getUsersBySuperior`

```java
java.util.List<java.lang.Long> getUsersBySuperior(long)
```

得到当前用户的所有上级负责人


### `getUsersOfEqualLevel`

```java
java.util.List<java.lang.Long> getUsersOfEqualLevel(long)
```

获取当前用户（人员）A的全部平级用户（人员）,默认不包括当前用户A


### `getUsersOfEqualLevel`

```java
java.util.List<java.lang.Long> getUsersOfEqualLevel(long, boolean)
```

获取当前用户（人员）A的全部平级用户（人员）


### `isFirstLogin`

```java
java.lang.Boolean isFirstLogin(java.lang.Long)
```

描述：检查用户是否第一次登陆
 如果用户第一次登陆，则展示首页向导.


### `isUserBelongTo`

```java
boolean isUserBelongTo(java.lang.Long, java.lang.Long)
```

描述：判断某个人员是否属于某个组织（包括所有上级组织）


### `isUserBelongTo`

```java
boolean isUserBelongTo(java.lang.Long, java.lang.Long, boolean)
```

判断某个人员是否属于某个组织（包括所有上级组织）


### `isUserEnable`

```java
boolean isUserEnable(long)
```

根据用户ID判断使用状态


### `isUserEnable`

```java
java.util.Map<java.lang.Long,java.lang.Boolean> isUserEnable(java.util.List<java.lang.Long>)
```

根据用户ID判断使用状态


### `setUserDefaultOrg`

```java
void setUserDefaultOrg(long, long)
```

设置用户默认组织


### `setUserTheme`

```java
boolean setUserTheme(java.lang.Long, java.lang.String)
```

描述：设置用户界面主题


### `setUserTheme`

```java
void setUserTheme(java.lang.Long, java.lang.Long)
```

描述：设置用户界面主题


### `switchUserDefaultOrg`

```java
void switchUserDefaultOrg(long)
```

切换组织


### `update`

```java
void update(java.util.List<UserParam>)
```

人员修改


### `updateBizPartnerUserInfo`

```java
java.util.Map<java.lang.String,java.lang.String> updateBizPartnerUserInfo(java.util.Map<java.lang.String,java.lang.Object>)
```

描述：更新商务伙伴用户信息，更新EID,OpenID,UID


### `updateFirstLoginFlag`

```java
void updateFirstLoginFlag(java.lang.Long)
```

描述：更新用户首次登陆标记


### `updatePosition`

```java
void updatePosition(java.util.List<UserParam>)
```

人员职位修改


### `updateUserChange`

```java
boolean updateUserChange(java.util.Map<java.lang.String,java.lang.Object>)
```

更新人员变动表，这里分别有两个状态，新增和修改


### `updateUserChange`

```java
boolean updateUserChange(java.util.List<java.util.Map<java.lang.String,java.lang.Object>>)
```

更新人员变动表，这里分别有两个状态，新增和修改


### `verifyPSWStrategy`

```java
java.util.Map<java.lang.String,java.lang.Object> verifyPSWStrategy(java.lang.String)
```

验证密码策略

