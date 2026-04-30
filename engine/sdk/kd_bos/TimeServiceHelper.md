# TimeServiceHelper


**包路径**: kd.bos.servicehelper

**类型**: CLASS

**父类**: 无

**说明**: 时间服务


```java
public class TimeServiceHelper
```


## 方法 (25 个)


### `GetSystemDateTime`

```java
java.util.Date GetSystemDateTime()
```

请用now()替代


### `formatDate`

```java
java.lang.String formatDate(java.util.Date)
```

格式化当前时间


### `formatOrgNow`

```java
java.lang.String formatOrgNow(java.lang.Long)
```

格式化组织的当前时间（组织时区+默认格式）


### `formatOrgTime`

```java
java.lang.String formatOrgTime(java.util.Date, java.lang.Long)
```

格式化组织的时间（组织时区+默认格式）


### `formatToday`

```java
java.lang.String formatToday()
```

格式化当前日期


### `formatUserNow`

```java
java.lang.String formatUserNow()
```

格式化当前用户的当前时间（当前登录的用户时区+默认格式）


### `formatUserNow`

```java
java.lang.String formatUserNow(java.lang.Long)
```

格式化用户当前时间（用户时区+默认格式）


### `formatUserTime`

```java
java.lang.String formatUserTime(java.util.Date, java.lang.Long)
```

格式化用户时间（用户时区+默认格式）


### `formatUserTime`

```java
java.lang.String formatUserTime(java.util.Date, java.lang.Long, java.text.DateFormat)
```

格式化用户时间（用户时区+默认格式）


### `getCurrentSystemTime`

```java
java.util.Date getCurrentSystemTime()
```

请用now()替代


### `getCurrentUserTime`

```java
java.util.Date getCurrentUserTime()
```

请用now()替代


### `getDateFormatString`

```java
java.lang.String getDateFormatString()
```

获取日期格式


### `getDateTimeFormatString`

```java
java.lang.String getDateTimeFormatString()
```

获取时间格式


### `getOrgTimeZone`

```java
InteTimeZone getOrgTimeZone(java.lang.Long)
```

获取组织时区


### `getSysTimeStamp`

```java
long getSysTimeStamp()
```

请用getTimeStamp()替代


### `getSysTimeZone`

```java
InteTimeZone getSysTimeZone()
```

获取系统时区


### `getTimeStamp`

```java
long getTimeStamp()
```

获取系统时间戳


### `getUserTimeZone`

```java
InteTimeZone getUserTimeZone()
```

获取当前用户时区


### `getUserTimeZone`

```java
InteTimeZone getUserTimeZone(java.lang.Long)
```

获取用户时区


### `now`

```java
java.util.Date now()
```

获取当前时刻


### `parseOrgTime`

```java
java.util.Date parseOrgTime(java.lang.String, java.lang.Long)
```

解析组织时间（组织时区+默认格式）


### `parseOrgTime`

```java
java.util.Date parseOrgTime(java.lang.String, java.lang.Long, java.text.DateFormat)
```

解析组织时间（组织时区+自定义格式）


### `parseUserTime`

```java
java.util.Date parseUserTime(java.lang.String, java.lang.Long)
```

解析用户时间（用户时区+默认格式）


### `parseUserTime`

```java
java.util.Date parseUserTime(java.lang.String, java.lang.Long, java.text.DateFormat)
```

解析用户时间（用户时区+自定义格式）


### `today`

```java
java.util.Date today()
```

获取当前时刻

