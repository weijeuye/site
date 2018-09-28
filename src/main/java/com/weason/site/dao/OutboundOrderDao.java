package com.weason.site.dao;

import com.weason.site.pojo.OutboundOrder;
import com.weason.site.vo.OutBoundOrderVo;
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


    public OutboundOrder queryOutBoundOrderByParam(Map<String, Object> param) {
        return super.get("selectByParam",param);
    }

    public Integer addOutboundOrder(OutboundOrder outboundOrder) {
        return super.insert("insertSelective",outboundOrder);
    }

    public OutBoundOrderVo selectOutBoundOrderByBillNo(Map<String, Object> param) {
        return super.get("selectOutBoundOrderByBillNo",param);
    }

    public List<OutBoundOrderVo> selectOutBoundOrderListByParam(Map<String, Object> param) {
        return super.queryForList("selectOutBoundOrderListByParam",param);
    }

    public Integer selectOutBoundOrderCountByParam(Map<String, Object> param) {
        return super.get("selectOutBoundOrderCountByParam",param);
    }
}
