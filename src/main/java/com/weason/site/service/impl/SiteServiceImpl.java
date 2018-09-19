package com.weason.site.service.impl;

import com.weason.site.dao.SiteDao;
import com.weason.site.pojo.Site;
import com.weason.site.pojo.User;
import com.weason.site.service.SiteService;
import com.weason.util.ResultMessage;
import com.weason.util.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

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
    @Autowired
    private SiteDao siteDao;

    /***
     * 获取所有工地
     * @param site
     * @return
     */
    @Override
    public List<Site> querySites(Site site) {
        Map<String,Object> param = new HashMap<>();
        if (null != site){
            if (null !=site.getSiteName()&& StringUtils.isBlank(site.getSiteName())){
                param.put("siteName",site.getSiteName());
            }
            if (null !=site.getSiteNumber()&&StringUtils.isBlank(site.getSiteNumber())){
                param.put("siteNumber",site.getSiteNumber());
            }
        }
        param.put("status",1);
        List<Site> sites = siteDao.querySites(param);

        return sites;
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
        ResultMessage resultMessage = ResultMessage.createResultMessage();
      /*  if (StringUtils.isBlank(site.getSiteName())){
            resultMessage.setCode(ResultMessage.ERROR);
            resultMessage.setMessage("工地名称不能为空");
            return resultMessage;
        }
        Map<String,Object> param = new HashMap<>();
        param.put("siteName",site.getSiteName());
        param.put("status",1);
        List<Site> sites = siteDao.querySites(param);
        if (sites.size()>0){
            resultMessage.setCode(ResultMessage.ERROR);
            resultMessage.setMessage("添加的工地已存在");
            return resultMessage;
        }*/
        String siteNumber = "BH"+System.currentTimeMillis()+"";
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
        ResultMessage resultMessage = ResultMessage.createResultMessage();
        Long id = site.getId();
        Site site1 = siteDao.querySiteById(id);
        if (null==site1){
            resultMessage.setMessage("需要修改的工地不存在");
        }
        Map<String,Object> param = new HashMap<>();
        param.put("siteName",site.getSiteName());
        param.put("status",1);
        List<Site> sites = siteDao.querySites(param);
        if (sites.size()>0){
            resultMessage.setMessage("工地名称已存在");
        }

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
    public List<Site> querySitesByParam(Map<String, Object> param) {
        return siteDao.querySites(param);
    }

    @Override
    public Integer querySitesCountByParam(Map<String, Object> param) {
        return siteDao.querySitesCountByParam(param);
    }
}
