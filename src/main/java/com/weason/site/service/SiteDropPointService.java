package com.weason.site.service;

import com.weason.site.pojo.SiteDropPoint;
import com.weason.util.ResultMessage;

import java.util.List;

/**
 * @Author Administrator
 * @CreateTime 2018/9/18 10:14
 **/
public interface SiteDropPointService {
    /***
     * 查询所有工地投放点
     * @param siteDropPoint
     * @return
     */
    List<SiteDropPoint> querySiteDropPoints(SiteDropPoint siteDropPoint);

    /***
     * 获取单个工地投放点信息
     * @param id
     * @return
     */
    ResultMessage querySiteDropPoint(Long id);

    /***
     * 添加工地投放点
     * @param siteDropPoint
     * @return
     */
    ResultMessage addSiteDropPoint(SiteDropPoint siteDropPoint);

    /***
     * 修改工地投放点信息
     * @param siteDropPoint
     * @return
     */
    ResultMessage updateSiteDropPoint(SiteDropPoint siteDropPoint);

    /***
     * 删除工地投放点
     * @param id
     * @return
     */
    ResultMessage deleteSiteDropPoint(Long id);
}
