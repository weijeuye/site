package com.weason.site.service;

import com.weason.site.pojo.Site;
import com.weason.util.ResultMessage;

import java.util.List;
import java.util.Map;

/**
 * @Author Administrator
 * @CreateTime 2018/9/17 17:46
 **/
public interface SiteService {
    /***
     * 获取所有工地
     * @param param
     * @return
     */
    List<Site> querySites(Map<String,Object> param);

    List<Site> querySitesByParam(Map<String,Object> param);

    Integer querySitesCountByParam(Map<String,Object> param);

    /***
     * 获取单个工地信息
     * @param id
     * @return
     */
    Site querySite(Long id);

    /***
     * 添加工地
     * @param site
     * @return
     */
    Integer addSite(Site site);

    /***
     * 修改工地信息
     * @param site
     * @return
     */
    Integer updateSite(Site site);

    /***
     * 删除工地
     * @param id
     * @return
     */
    Integer deleteSite(Long id);

    /***
     * 修改工地状态
     * @param site
     * @return
     */
    Object updateSiteStatus(Site site);
}
