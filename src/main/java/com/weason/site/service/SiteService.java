package com.weason.site.service;

import com.weason.site.pojo.Site;
import com.weason.util.ResultMessage;

/**
 * @Author Administrator
 * @CreateTime 2018/9/17 17:46
 **/
public interface SiteService {
    /***
     * 获取所有工地
     * @param site
     * @return
     */
    ResultMessage querySites(Site site);

    /***
     * 获取单个工地信息
     * @param id
     * @return
     */
    ResultMessage querySite(Long id);

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
}
