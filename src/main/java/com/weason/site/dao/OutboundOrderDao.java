package com.weason.site.dao;

import com.weason.site.pojo.OutboundOrder;
import com.weason.util.mybaties.MyBatisDao;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

/**
 * @program: library
 * @description: ${description}
 * @author: HuangYong
 * @create: 2018-09-15 11:25
 **/
@Repository
public class OutboundOrderDao extends MyBatisDao {

    public OutboundOrderDao(){
        super("outboundOrderMapper");
    }

    public List<OutboundOrder> queryOutBoundOrdersListByParam(Map<String, Object> param) {
        return super.queryForList("",param);
    }

    public Integer addOutboundOrder(OutboundOrder outboundOrder) {
        return super.insert("insertSelective",outboundOrder);
    }
}
