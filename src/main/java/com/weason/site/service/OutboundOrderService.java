package com.weason.site.service;

import com.weason.site.pojo.OutboundOrder;

import java.util.List;
import java.util.Map;

/**
 * @Author weilei
 * @date 2018-09-25 16:13
 */

public interface OutboundOrderService {
    /**
     * 根据条件查询出库单
     * @param param
     * @return
     */
    public List<OutboundOrder> queryOutBoundOrdersListByParam(Map<String,Object> param);

    /**
     * 新增出库单
     * @param outboundOrder
     * @return
     */
    public Integer addOutboundOrder(OutboundOrder outboundOrder);
}
