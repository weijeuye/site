package com.weason.site.service.impl;

import com.weason.site.dao.SiteDropPointDao;
import com.weason.site.pojo.SiteDropPoint;
import com.weason.site.service.SiteDropPointService;
import com.weason.util.ResultMessage;
import com.weason.util.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @Author Administrator
 * @CreateTime 2018/9/18 10:14
 **/
@Component
public class SiteDropPointServiceImpl implements SiteDropPointService {

    @Autowired
    private SiteDropPointDao siteDropPointDao;
    /***
     * 查询所有工地投放点
     * @param param
     * @return
     */
    @Override
    public List<SiteDropPoint> querySiteDropPoints(Map<String,Object> param) {

        param.put("status",1);
        return siteDropPointDao.querySiteDropPointsByParam(param);
    }

    @Override
    public Integer querySiteDropPointsCount(Map<String,Object> param) {

        param.put("status",1);
        return siteDropPointDao.querySiteDropPointsCountByParam(param);
    }

    /***
     * 获取单个工地投放点信息
     * @param id
     * @return
     */
    @Override
    public SiteDropPoint querySiteDropPoint(Long id) {
        return siteDropPointDao.querySiteDropPointById(id);
    }

    /***
     * 添加工地投放点
     * @param siteDropPoint
     * @return
     */
    @Override
    public Integer addSiteDropPoint(SiteDropPoint siteDropPoint) {
        return siteDropPointDao.addSiteDropPoint(siteDropPoint);
    }

    /***
     * 修改工地投放点信息
     * @param siteDropPoint
     * @return
     */
    @Override
    public Integer updateSiteDropPoint(SiteDropPoint siteDropPoint) {
        return siteDropPointDao.updateSiteDropPoint(siteDropPoint);
    }

    /***
     * 删除工地投放点
     * @param id
     * @return
     */
    @Override
    public Integer deleteSiteDropPoint(Long id) {
        return siteDropPointDao.deleteSiteDropPoint(id);
    }
}
