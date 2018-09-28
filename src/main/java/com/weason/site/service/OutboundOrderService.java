package com.weason.site.service;

import com.weason.site.pojo.OutboundOrder;
import com.weason.site.vo.OutBoundOrderVo;

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
    public OutboundOrder queryOutBoundOrderByParam(Map<String,Object> param);

    /**
     * 新增出库单
     * @param outboundOrder
     * @return
     */
    public Integer addOutboundOrder(OutboundOrder outboundOrder);

    /**
     * 用于打印 显示
     * @param param
     * @return
     */
    public OutBoundOrderVo selectOutBoundOrderByBillNo(Map<String, Object> param);

    /**
     * 查询出库单列表
     * @param param
     * @return
     */
    public List<OutBoundOrderVo> selectOutBoundOrderListByParam(Map<String, Object> param);

    /**
     * 查询出库单数量
     * @param param
     * @return
     */
    public Integer selectOutBoundOrderCountByParam(Map<String, Object> param);
}
