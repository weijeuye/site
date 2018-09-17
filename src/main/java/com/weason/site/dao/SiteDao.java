package com.weason.site.dao;

import com.weason.site.pojo.Site;
import com.weason.util.mybaties.MyBatisDao;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

/**
 * @program: library
 * @description: ${description}
 * @author: HuangYong
 * @create: 2018-09-15 11:26
 * 工地实现类
 **/
@Repository
public class SiteDao extends MyBatisDao {
    public SiteDao() {
        super("siteMapper");
    }

    /***
     * 查询工地列表
     * @param param
     * @return
     */
    public List<Site> querySites(Map<String,Object> param){
        return super.queryForListForReport("querySites",param);
    }

    /***
     * 查询单个工地信息
     * @param id
     * @return
     */
    public Site querySiteById(Long id){
        return super.get("selectByPrimaryKey",id);
    }

    /***
     * 添加工地
     * @param site
     * @return
     */
    public int addSite(Site site){
        return super.insert("insertSelective",site);
    }

    /***
     * 修改工地信息
     * @param site
     * @return
     */
    public int updateSite(Site site){
        return super.update("updateByPrimaryKeySelective",site);
    }
}
