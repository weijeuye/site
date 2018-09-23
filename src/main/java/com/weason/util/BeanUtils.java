package com.weason.util;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.TypeReference;
import com.alibaba.fastjson.serializer.SerializerFeature;
import org.apache.commons.collections.CollectionUtils;
import org.springframework.util.Assert;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

/**
 * Created by arno on 2016/11/21.
 */
public class BeanUtils {
    public static <T> T copyProperties(Object source,Class<T> clazz){
        Assert.notNull(source);
        String jsonStr = JSON.toJSONString(source, SerializerFeature.DisableCircularReferenceDetect);
        return JSON.parseObject(jsonStr,clazz);
    }
    public static <T> T copyProperties(Object source,TypeReference<T> type){
        Assert.notNull(source);
        String jsonStr = JSON.toJSONString(source, SerializerFeature.DisableCircularReferenceDetect);
        return JSON.parseObject(jsonStr,type);
    }

    
}
