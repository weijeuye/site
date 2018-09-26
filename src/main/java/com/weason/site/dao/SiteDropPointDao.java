package com.weason.site.dao;

import com.weason.site.pojo.SiteDropPoint;
import com.weason.util.mybaties.MyBatisDao;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

/**
 * @program: library
 * @description: ${description}
 * @author: HuangYong
 * @create: 2018-09-15 11:49
 * 投放点实现类
 **/
@Repository
public class SiteDropPointDao extends MyBatisDao {
    public SiteDropPointDao() {
        super("siteDropPointMapper");
    }

    /***
     * 查询投放点列表
     * @param param
     * @return
     */
    public List<SiteDropPoint> querySiteDropPointsByParam(Map<String,Object> param){
        return super.queryForList("querySiteDropPointsByParam",param);
    }

    /***
     * 查询投放点数量
     * @param param
     * @return
     */
    public Integer querySiteDropPointsCountByParam(Map<String,Object> param){
        return super.get("querySiteDropPointsCountByParam",param);
    }
    /***
     * 查询单个投放点信息
     * @param id
     * @return
     */
    public SiteDropPoint querySiteDropPointById(Long id){
        return super.get("selectByPrimaryKey",id);
    }

    /***
     * 添加投放点
     * @param siteDropPoint
     * @return
     */
    public int addSiteDropPoint(SiteDropPoint siteDropPoint){
        return super.insert("insertSelective",siteDropPoint);
    }

    /***
     * 修改投放点信息
     * @param siteDropPoint
     * @return
     */
    public int updateSiteDropPoint(SiteDropPoint siteDropPoint){
        return super.update("updateByPrimaryKeySelective",siteDropPoint);
    }
    /***
     * 修改投放点信息
     * @param siteDropPoint
     * @return
     */
    public int updateSiteDropPointStatus(SiteDropPoint siteDropPoint){
        return super.update("updateStatusBySiteId",siteDropPoint);
    }

    /***
     * 删除投放点
     * @param id
     * @return
     */
    public int deleteSiteDropPoint(Long id){
        return super.delete("deleteSiteDropPoint",id);
    }
}

