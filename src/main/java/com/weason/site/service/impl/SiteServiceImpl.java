package com.weason.site.service.impl;

import com.weason.constant.SystemConstant;
import com.weason.site.dao.CarTeamDao;
import com.weason.site.dao.SiteDao;
import com.weason.site.dao.SiteDropPointDao;
import com.weason.site.dao.UserDao;
import com.weason.site.pojo.CarTeam;
import com.weason.site.pojo.Site;
import com.weason.site.pojo.SiteDropPoint;
import com.weason.site.pojo.User;
import com.weason.site.service.SiteService;
import com.weason.util.ResultMessage;
import com.weason.util.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @Author Administrator
 * @CreateTime 2018/9/17 17:47
 **/
@Component
public class SiteServiceImpl implements SiteService {

    private static final Logger logger = LoggerFactory.getLogger(SiteServiceImpl.class);
    @Autowired
    private SiteDao siteDao;
    @Autowired
    private UserDao userDao;
    @Autowired
    private CarTeamDao carTeamDao;
    @Autowired
    private SiteDropPointDao siteDropPointDao;

    /***
     * 获取所有工地
     * @param param
     * @return
     */
    @Override
    public List<Site> querySites(Map<String,Object> param) {
        return siteDao.querySiteList(param);
    }

    /***
     * 获取单个工地信息
     * @param id
     * @return
     */
    @Override
    public Site querySite(Long id) {
        ResultMessage resultMessage = ResultMessage.createResultMessage();
        Site site = siteDao.querySiteById(id);
        return site;
    }

    /***
     * 添加工地
     * @param site
     * @return
     */
    @Override
    public Integer addSite(Site site) {
        String siteNumber = "BH"+System.currentTimeMillis();
        site.setSiteNumber(siteNumber);
        site.setIsValid("Y");
        return siteDao.addSite(site);
    }

    /***
     * 修改工地信息
     * @param site
     * @return
     */
    @Override
    public Integer updateSite(Site site) {
        return siteDao.updateSite(site);
    }

    /***
     * 删除工地
     * @param id
     * @return
     */
    @Override
    public Integer deleteSite(Long id) {
        Site site = siteDao.querySiteById(id);
        if (null==site){
           return 0;
        }
        Site site1 = new Site();
        site1.setId(id);
        site1.setStatus(0);
//todo 删除该工地下所有投放点
        return  siteDao.updateSite(site1);
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public Object updateSiteStatus(Site site){
        siteDao.updateSite(site);
        logger.info("已经禁用工地:{}"+site.getId());
        User user = new User();
        user.setSiteId(site.getId());
        user.setIsValid(site.getIsValid());
        int userNumber =userDao.updateUserStatus(user);
        logger.info("已经禁用用户:{}"+userNumber);
        CarTeam carTeam = new CarTeam();
        carTeam.setSiteId(site.getId());
        carTeam.setIsValid(site.getIsValid());
        int carTeamNumber = carTeamDao.updateCarTeamStatus(carTeam);
        logger.info("已经禁用车队:{}"+carTeamNumber);
        SiteDropPoint siteDropPoint = new SiteDropPoint();
        siteDropPoint.setSiteId(site.getId());
        siteDropPoint.setIsValid(site.getIsValid());
        int point = siteDropPointDao.updateSiteDropPointStatus(siteDropPoint);
        logger.info("已经禁用投放点:{}"+point);
        return ResultMessage.createResultMessage();
    }

    @Override
    public List<Site> querySitesByParam(Map<String, Object> param) {
        return siteDao.querySites(param);
    }

    @Override
    public Integer querySitesCountByParam(Map<String, Object> param) {
        return siteDao.querySitesCountByParam(param);
    }
}
