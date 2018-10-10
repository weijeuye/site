package com.weason.site.service.impl;

import com.weason.site.dao.OutboundOrderDao;
import com.weason.site.pojo.OutboundOrder;
import com.weason.site.service.OutboundOrderService;
import com.weason.site.vo.OutBoundOrderVo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Map;

/**
 * @Author weilei
 * @date 2018-09-25 16:20
 */
@Component
public class OutboundOrderServiceImpl implements OutboundOrderService {
    @Autowired
    private OutboundOrderDao outboundOrderDao;

    @Override
    public OutboundOrder queryOutBoundOrderByParam(Map<String, Object> param) {
        return outboundOrderDao.queryOutBoundOrderByParam(param);
    }

    @Override
    public Integer addOutboundOrder(OutboundOrder outboundOrder) {
        return outboundOrderDao.addOutboundOrder(outboundOrder);
    }

    @Override
    public OutBoundOrderVo selectOutBoundOrderByBillNo(Map<String, Object> param) {
        return outboundOrderDao.selectOutBoundOrderByBillNo(param);
    }

    @Override
    public List<OutBoundOrderVo> selectOutBoundOrderListByParam(Map<String, Object> param) {
        return outboundOrderDao.selectOutBoundOrderListByParam(param);
    }

    @Override
    public Integer selectOutBoundOrderCountByParam(Map<String, Object> param) {
        return outboundOrderDao.selectOutBoundOrderCountByParam(param);
    }
}
