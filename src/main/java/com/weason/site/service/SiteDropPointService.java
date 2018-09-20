package com.weason.site.service;

import com.weason.site.pojo.SiteDropPoint;
import com.weason.util.ResultMessage;

import java.util.List;
import java.util.Map;

/**
 * @Author Administrator
 * @CreateTime 2018/9/18 10:14
 **/
public interface SiteDropPointService {
    /***
     * 查询所有工地投放点
     * @param param
     * @return
     */
    List<SiteDropPoint> querySiteDropPoints(Map<String,Object> param);

    /**
     * 查询工地投放点数量
     * @param param
     * @return
     */
    public Integer querySiteDropPointsCount(Map<String,Object> param);
    /***
     * 获取单个工地投放点信息
     * @param id
     * @return
     */
    SiteDropPoint querySiteDropPoint(Long id);

    /***
     * 添加工地投放点
     * @param siteDropPoint
     * @return
     */
    Integer addSiteDropPoint(SiteDropPoint siteDropPoint);

    /***
     * 修改工地投放点信息
     * @param siteDropPoint
     * @return
     */
    Integer updateSiteDropPoint(SiteDropPoint siteDropPoint);

    /***
     * 删除工地投放点
     * @param id
     * @return
     */
    Integer deleteSiteDropPoint(Long id);
}
