package com.weason.util;

import com.google.gson.*;
import com.google.gson.reflect.TypeToken;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.lang.reflect.Field;
import java.lang.reflect.Type;
import java.sql.Timestamp;
import java.text.DateFormat;
import java.text.MessageFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

/**
 * Created by chenrui on 15/8/11.
 */
public class GsonUtils {
    public static final String EMPTY = "";
    /** 空的 {@code JSON} 数据 - <code>"{}"</code>。 */
    public static final String EMPTY_JSON = "{}";
    /** 空的 {@code JSON} 数组(集合)数据 - {@code "[]"}。 */
    public static final String EMPTY_JSON_ARRAY = "[]";
    /** 默认的 {@code JSON} 日期/时间字段的格式化模式。 */
    public static final String DEFAULT_DATE_PATTERN = "yyyy-MM-dd HH:mm:ss";
    /** {@code Google Gson} 的 {@literal @Since} 注解常用的版本号常量 - {@code 1.0}。 */
    public static final Double SINCE_VERSION_10 = 1.0d;
    /** {@code Google Gson} 的 {@literal @Since} 注解常用的版本号常量 - {@code 1.1}。 */
    public static final Double SINCE_VERSION_11 = 1.1d;
    /** {@code Google Gson} 的 {@literal @Since} 注解常用的版本号常量 - {@code 1.2}。 */
    public static final Double SINCE_VERSION_12 = 1.2d;
    private static final Logger log = LoggerFactory.getLogger(GsonUtils.class);

    /**
     * 将给定的目标对象根据指定的条件参数转换成 {@code JSON} 格式的字符串。
     * <p />
     * <strong>该方法转换发生错误时，不会抛出任何异常。若发生错误时，曾通对象返回 <code>"{}"</code>； 集合或数组对象返回
     * <code>"[]"</code></strong>
     *
     * @param target
     *            目标对象。
     * @param targetType
     *            目标对象的类型。
     * @param isSerializeNulls
     *            是否序列化 {@code null} 值字段。
     * @param version
     *            字段的版本号注解。
     * @param datePattern
     *            日期字段的格式化模式。
     * @param excludesFieldsWithoutExpose
     *            是否排除未标注 {@literal @Expose} 注解的字段。
     * @return 目标对象的 {@code JSON} 格式的字符串。
     */
    public static String toJson(Object target, Type targetType,
                                boolean isSerializeNulls, Double version, String datePattern,
                                boolean excludesFieldsWithoutExpose) {
        if (target == null)
            return EMPTY_JSON;
        GsonBuilder builder = new GsonBuilder();
        if (isSerializeNulls)
            builder.serializeNulls();
        if (version != null)
            builder.setVersion(version.doubleValue());
        if (isEmpty(datePattern))
            datePattern = DEFAULT_DATE_PATTERN;
        builder.setDateFormat(datePattern);
        if (excludesFieldsWithoutExpose)
            builder.excludeFieldsWithoutExposeAnnotation();

        builder.addDeserializationExclusionStrategy(new SuperclassExclusionStrategy());
        builder.addSerializationExclusionStrategy(new SuperclassExclusionStrategy());
        builder.serializeSpecialFloatingPointValues();
        String result = EMPTY;
        Gson gson = builder.create();
        try {
            if (targetType != null) {
                result = gson.toJson(target, targetType);
            } else {
                result = gson.toJson(target);
            }
        } catch (Exception ex) {
            log.warn("目标对象 " + target.getClass().getName()
                    + " 转换 JSON 字符串时，发生异常！", ex);
            if (target instanceof Collection || target instanceof Iterator
                    || target instanceof Enumeration
                    || target.getClass().isArray()) {
                result = EMPTY_JSON_ARRAY;
            } else
                result = EMPTY_JSON;
        }
        return result;
    }

    /**
     * 将给定的目标对象转换成 {@code JSON} 格式的字符串。<strong>此方法只用来转换普通的 {@code JavaBean}
     * 对象。</strong>
     * <ul>
     * <li>该方法只会转换标有 {@literal @Expose} 注解的字段；</li>
     * <li>该方法不会转换 {@code null} 值字段；</li>
     * <li>该方法会转换所有未标注或已标注 {@literal @Since} 的字段；</li>
     * <li>该方法转换时使用默认的 日期/时间 格式化模式 - {@code yyyy-MM-dd HH:mm:ss SSS}；</li>
     * </ul>
     *
     * @param target
     *            要转换成 {@code JSON} 的目标对象。
     * @return 目标对象的 {@code JSON} 格式的字符串。
     */
    public static String toJson(Object target) {
        return toJson(target, null, false, null, null, false);
    }

    /**
     * 将给定的目标对象转换成 {@code JSON} 格式的字符串。<strong>此方法只用来转换普通的 {@code JavaBean}
     * 对象。</strong>
     * <ul>
     * <li>该方法只会转换标有 {@literal @Expose} 注解的字段；</li>
     * <li>该方法不会转换 {@code null} 值字段；</li>
     * <li>该方法会转换所有未标注或已标注 {@literal @Since} 的字段；</li>
     * </ul>
     *
     * @param target
     *            要转换成 {@code JSON} 的目标对象。
     * @param datePattern
     *            日期字段的格式化模式。
     * @return 目标对象的 {@code JSON} 格式的字符串。
     */
    public static String toJson(Object target, String datePattern) {
        return toJson(target, null, false, null, datePattern, false);
    }

    /**
     * 将给定的目标对象转换成 {@code JSON} 格式的字符串。<strong>此方法只用来转换普通的 {@code JavaBean}
     * 对象。</strong>
     * <ul>
     * <li>该方法只会转换标有 {@literal @Expose} 注解的字段；</li>
     * <li>该方法不会转换 {@code null} 值字段；</li>
     * <li>该方法转换时使用默认的 日期/时间 格式化模式 - {@code yyyy-MM-dd HH:mm:ss SSS}；</li>
     * </ul>
     *
     * @param target
     *            要转换成 {@code JSON} 的目标对象。
     * @param version
     *            字段的版本号注解({@literal @Since})。
     * @return 目标对象的 {@code JSON} 格式的字符串。
     */
    public static String toJson(Object target, Double version) {
        return toJson(target, null, false, version, null, true);
    }

    /**
     * 将给定的目标对象转换成 {@code JSON} 格式的字符串。<strong>此方法只用来转换普通的 {@code JavaBean}
     * 对象。</strong>
     * <ul>
     * <li>该方法不会转换 {@code null} 值字段；</li>
     * <li>该方法会转换所有未标注或已标注 {@literal @Since} 的字段；</li>
     * <li>该方法转换时使用默认的 日期/时间 格式化模式 - {@code yyyy-MM-dd HH:mm:ss SSS}；</li>
     * </ul>
     *
     * @param target
     *            要转换成 {@code JSON} 的目标对象。
     * @param excludesFieldsWithoutExpose
     *            是否排除未标注 {@literal @Expose} 注解的字段。
     * @return 目标对象的 {@code JSON} 格式的字符串。
     */
    public static String toJson(Object target,
                                boolean excludesFieldsWithoutExpose) {
        return toJson(target, null, false, null, null,
                excludesFieldsWithoutExpose);
    }

    /**
     * 将给定的目标对象转换成 {@code JSON} 格式的字符串。<strong>此方法只用来转换普通的 {@code JavaBean}
     * 对象。</strong>
     * <ul>
     * <li>该方法不会转换 {@code null} 值字段；</li>
     * <li>该方法转换时使用默认的 日期/时间 格式化模式 - {@code yyyy-MM-dd HH:mm:ss SSS}；</li>
     * </ul>
     *
     * @param target
     *            要转换成 {@code JSON} 的目标对象。
     * @param version
     *            字段的版本号注解({@literal @Since})。
     * @param excludesFieldsWithoutExpose
     *            是否排除未标注 {@literal @Expose} 注解的字段。
     * @return 目标对象的 {@code JSON} 格式的字符串。
     */
    public static String toJson(Object target, Double version,
                                boolean excludesFieldsWithoutExpose) {
        return toJson(target, null, false, version, null,
                excludesFieldsWithoutExpose);
    }

    /**
     * 将给定的目标对象转换成 {@code JSON} 格式的字符串。<strong>此方法通常用来转换使用泛型的对象。</strong>
     * <ul>
     * <li>该方法只会转换标有 {@literal @Expose} 注解的字段；</li>
     * <li>该方法不会转换 {@code null} 值字段；</li>
     * <li>该方法会转换所有未标注或已标注 {@literal @Since} 的字段；</li>
     * <li>该方法转换时使用默认的 日期/时间 格式化模式 - {@code yyyy-MM-dd HH:mm:ss SSSS}；</li>
     * </ul>
     *
     * @param target
     *            要转换成 {@code JSON} 的目标对象。
     * @param targetType
     *            目标对象的类型。
     * @return 目标对象的 {@code JSON} 格式的字符串。
     */
    public static String toJson(Object target, Type targetType) {
        return toJson(target, targetType, false, null, null, true);
    }

    /**
     * 将给定的目标对象转换成 {@code JSON} 格式的字符串。<strong>此方法通常用来转换使用泛型的对象。</strong>
     * <ul>
     * <li>该方法只会转换标有 {@literal @Expose} 注解的字段；</li>
     * <li>该方法不会转换 {@code null} 值字段；</li>
     * <li>该方法转换时使用默认的 日期/时间 格式化模式 - {@code yyyy-MM-dd HH:mm:ss SSSS}；</li>
     * </ul>
     *
     * @param target
     *            要转换成 {@code JSON} 的目标对象。
     * @param targetType
     *            目标对象的类型。
     * @param version
     *            字段的版本号注解({@literal @Since})。
     * @return 目标对象的 {@code JSON} 格式的字符串。
     */
    public static String toJson(Object target, Type targetType, Double version) {
        return toJson(target, targetType, false, version, null, true);
    }

    /**
     * 将给定的目标对象转换成 {@code JSON} 格式的字符串。<strong>此方法通常用来转换使用泛型的对象。</strong>
     * <ul>
     * <li>该方法不会转换 {@code null} 值字段；</li>
     * <li>该方法会转换所有未标注或已标注 {@literal @Since} 的字段；</li>
     * <li>该方法转换时使用默认的 日期/时间 格式化模式 - {@code yyyy-MM-dd HH:mm:ss SSS}；</li>
     * </ul>
     *
     * @param target
     *            要转换成 {@code JSON} 的目标对象。
     * @param targetType
     *            目标对象的类型。
     * @param excludesFieldsWithoutExpose
     *            是否排除未标注 {@literal @Expose} 注解的字段。
     * @return 目标对象的 {@code JSON} 格式的字符串。
     */
    public static String toJson(Object target, Type targetType,
                                boolean excludesFieldsWithoutExpose) {
        return toJson(target, targetType, false, null, null,
                excludesFieldsWithoutExpose);
    }

    /**
     * 将给定的目标对象转换成 {@code JSON} 格式的字符串。<strong>此方法通常用来转换使用泛型的对象。</strong>
     * <ul>
     * <li>该方法不会转换 {@code null} 值字段；</li>
     * <li>该方法转换时使用默认的 日期/时间 格式化模式 - {@code yyyy-MM-dd HH:mm:ss SSS}；</li>
     * </ul>
     *
     * @param target
     *            要转换成 {@code JSON} 的目标对象。
     * @param targetType
     *            目标对象的类型。
     * @param version
     *            字段的版本号注解({@literal @Since})。
     * @param excludesFieldsWithoutExpose
     *            是否排除未标注 {@literal @Expose} 注解的字段。
     * @return 目标对象的 {@code JSON} 格式的字符串。
     */
    public static String toJson(Object target, Type targetType, Double version,
                                boolean excludesFieldsWithoutExpose) {
        return toJson(target, targetType, false, version, null,
                excludesFieldsWithoutExpose);
    }

    /**
     * 将给定的 {@code JSON} 字符串转换成指定的类型对象。
     *
     * @param <T>
     *            要转换的目标类型。
     * @param json
     *            给定的 {@code JSON} 字符串。
     * @param token
     *            {@code com.google.gson.reflect.TypeToken} 的类型指示类对象。
     * @param datePattern
     *            日期格式模式。
     * @return 给定的 {@code JSON} 字符串表示的指定的类型对象。
     */
    public static <T> T fromJson(String json, TypeToken<T> token,
                                 String datePattern) {
        if (isEmpty(json)) {
            return null;
        }
        GsonBuilder builder = new GsonBuilder();
        if (isEmpty(datePattern)) {
            datePattern = DEFAULT_DATE_PATTERN;
        }
        builder.setDateFormat(datePattern);
        Gson gson = builder.create();
        try {
            return gson.fromJson(json, token.getType());
        } catch (Exception ex) {
            log.error(json + " 无法转换为 " + token.getRawType().getName() + " 对象!",
                    ex);
            return null;
        }
    }

    /**
     * 将给定的 {@code JSON} 字符串转换成指定的类型对象。
     *
     * @param <T>
     *            要转换的目标类型。
     * @param json
     *            给定的 {@code JSON} 字符串。
     * @param token
     *            {@code com.google.gson.reflect.TypeToken} 的类型指示类对象。
     * @return 给定的 {@code JSON} 字符串表示的指定的类型对象。
     */
    public static <T> T fromJson(String json, TypeToken<T> token) {
        return fromJson(json, token, null);
    }

    /**
     * 将给定的 {@code JSON} 字符串转换成指定的类型对象。<strong>此方法通常用来转换普通的 {@code JavaBean}
     * 对象。</strong>
     *
     * @param <T>
     *            要转换的目标类型。
     * @param json
     *            给定的 {@code JSON} 字符串。
     * @param clazz
     *            要转换的目标类。
     * @param datePattern
     *            日期格式模式。
     * @return 给定的 {@code JSON} 字符串表示的指定的类型对象。
     */
    public static <T> T fromJson(String json, Class<T> clazz, String datePattern) {
        if (isEmpty(json)) {
            return null;
        }
        GsonBuilder builder = new GsonBuilder();
        if (isEmpty(datePattern)) {
            datePattern = DEFAULT_DATE_PATTERN;
        }
        builder.setDateFormat(datePattern);
        builder.registerTypeAdapter(Date.class, new DateTypeAdapter(datePattern));
        Gson gson = builder.create();
        try {
            return gson.fromJson(json, clazz);
        } catch (Exception ex) {
            log.error(json + " 无法转换为 " + clazz.getName() + " 对象!", ex);
            return null;
        }
    }

    /**
     * 将给定的 {@code JSON} 字符串转换成指定的类型对象。<strong>此方法通常用来转换普通的 {@code JavaBean}
     * 对象。</strong>
     *
     * @param <T>
     *            要转换的目标类型。
     * @param json
     *            给定的 {@code JSON} 字符串。
     * @param clazz
     *            要转换的目标类。
     * @return 给定的 {@code JSON} 字符串表示的指定的类型对象。
     */
    public static <T> T fromJson(String json, Class<T> clazz) {
        return fromJson(json, clazz, null);
    }

    public static boolean isEmpty(String inStr) {
        boolean reTag = false;
        if (inStr == null || "".equals(inStr)) {
            reTag = true;
        }
        return reTag;
    }

    /**
     * 功能描述: <br>
     * 生成一个简单的json格式的提示信息
     *
     * @param objects
     * @return
     * @see [相关类/方法](可选)
     * @since [产品/模块版本](可选)
     */
    public static String formatTagMsg(boolean tag, String messager) {
        StringBuilder bud = new StringBuilder("{");
        MessageFormat format = new MessageFormat("\"tag\":{0}, \"msg\":\"{1}\"");
        bud.append(format.format(new Object[] { tag, messager })).append("}");
        return bud.toString();
    }

    public static class SuperclassExclusionStrategy implements ExclusionStrategy
    {
        public boolean shouldSkipClass(Class<?> arg0)
        {
            return false;
        }

        public boolean shouldSkipField(FieldAttributes fieldAttributes)
        {
            String fieldName = fieldAttributes.getName();
            Class<?> theClass = fieldAttributes.getDeclaringClass();

            return isFieldInSuperclass(theClass, fieldName);
        }

        private boolean isFieldInSuperclass(Class<?> subclass, String fieldName)
        {
            Class<?> superclass = subclass.getSuperclass();
            Field field;

            while(superclass != null)
            {
                field = getField(superclass, fieldName);

                if(field != null)
                    return true;

                superclass = superclass.getSuperclass();
            }

            return false;
        }

        private Field getField(Class<?> theClass, String fieldName)
        {
            try
            {
                return theClass.getDeclaredField(fieldName);
            }
            catch(Exception e)
            {
                return null;
            }
        }
    }


    //毫秒转日期的适配器
    private static class DateTypeAdapter implements JsonSerializer<Date>, JsonDeserializer<Date> {

        // TODO: migrate to streaming adapter

        private final DateFormat enUsFormat;
        private final DateFormat localFormat;
        private final DateFormat iso8601Format;

        DateTypeAdapter() {
            this(DateFormat.getDateTimeInstance(DateFormat.DEFAULT, DateFormat.DEFAULT, Locale.US),
                    DateFormat.getDateTimeInstance(DateFormat.DEFAULT, DateFormat.DEFAULT));
        }

        DateTypeAdapter(String datePattern) {
            this(new SimpleDateFormat(datePattern, Locale.US), new SimpleDateFormat(datePattern));
        }

        DateTypeAdapter(int style) {
            this(DateFormat.getDateInstance(style, Locale.US), DateFormat.getDateInstance(style));
        }

        public DateTypeAdapter(int dateStyle, int timeStyle) {
            this(DateFormat.getDateTimeInstance(dateStyle, timeStyle, Locale.US),
                    DateFormat.getDateTimeInstance(dateStyle, timeStyle));
        }

        DateTypeAdapter(DateFormat enUsFormat, DateFormat localFormat) {
            this.enUsFormat = enUsFormat;
            this.localFormat = localFormat;
            this.iso8601Format = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss'Z'", Locale.US);
            this.iso8601Format.setTimeZone(TimeZone.getTimeZone("UTC"));
        }

        // These methods need to be synchronized since JDK DateFormat classes are not thread-safe
        // See issue 162
        public JsonElement serialize(Date src, Type typeOfSrc, JsonSerializationContext context) {
            synchronized (localFormat) {
                String dateFormatAsString = enUsFormat.format(src);
                return new JsonPrimitive(dateFormatAsString);
            }
        }

        public Date deserialize(JsonElement json, Type typeOfT, JsonDeserializationContext context)
                throws JsonParseException {
            if (!(json instanceof JsonPrimitive)) {
                throw new JsonParseException("The date should be a string value");
            }
            Date date = deserializeToDate(json);
            if (typeOfT == Date.class) {
                return date;
            } else if (typeOfT == Timestamp.class) {
                return new Timestamp(date.getTime());
            } else if (typeOfT == java.sql.Date.class) {
                return new java.sql.Date(date.getTime());
            } else {
                throw new IllegalArgumentException(getClass() + " cannot deserialize to " + typeOfT);
            }
        }

        private Date deserializeToDate(JsonElement json) {
            synchronized (localFormat) {
                JsonPrimitive jsonPrimitive = null;
                if(json instanceof JsonPrimitive){
                    jsonPrimitive= (JsonPrimitive) json;
                    if(jsonPrimitive.isNumber()){
                        return new Date(jsonPrimitive.getAsLong());
                    }
                }
                try {
                    return localFormat.parse(json.getAsString());
                } catch (ParseException ignored) {
                }
                try {
                    return enUsFormat.parse(json.getAsString());
                } catch (ParseException ignored) {
                }
                try {
                    return iso8601Format.parse(json.getAsString());
                } catch (ParseException e) {
                    if(jsonPrimitive!=null){
                        try {
                            return new Date(Long.parseLong(jsonPrimitive.getAsString()));
                        } catch (NumberFormatException e2){
                        }
                    }
                    throw new JsonSyntaxException(json.getAsString(), e);
                }
            }
        }
    }
}
