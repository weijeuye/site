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
     * @param siteDropPoint
     * @return
     */
    @Override
    public List<SiteDropPoint> querySiteDropPoints(SiteDropPoint siteDropPoint) {
        Map<String,Object> param = new HashMap<>();
        if (null != siteDropPoint){
            if (null !=siteDropPoint.getDropPoint()&& StringUtils.isBlank(siteDropPoint.getDropPoint())){
                param.put("dropPoint",siteDropPoint.getDropPoint());
            }
            if (null !=siteDropPoint.getSiteId()&&StringUtils.isBlank(siteDropPoint.getSiteId())){
                param.put("siteId",siteDropPoint.getSiteId());
            }
        }
        param.put("status",1);
        return siteDropPointDao.querySiteDropPoints(param);
    }

    /***
     * 获取单个工地投放点信息
     * @param id
     * @return
     */
    @Override
    public ResultMessage querySiteDropPoint(Long id) {
        return null;
    }

    /***
     * 添加工地投放点
     * @param siteDropPoint
     * @return
     */
    @Override
    public ResultMessage addSiteDropPoint(SiteDropPoint siteDropPoint) {
        return null;
    }

    /***
     * 修改工地投放点信息
     * @param siteDropPoint
     * @return
     */
    @Override
    public ResultMessage updateSiteDropPoint(SiteDropPoint siteDropPoint) {
        return null;
    }

    /***
     * 删除工地投放点
     * @param id
     * @return
     */
    @Override
    public ResultMessage deleteSiteDropPoint(Long id) {
        return null;
    }
}
