package com.weason.site.dao;

import com.weason.site.pojo.CarTeam;
import com.weason.util.mybaties.MyBatisDao;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

/**
 * @program: library
 * @description: ${description}
 * @author: HuangYong
 * @create: 2018-09-15 11:25
 * 车队实现类
 **/
@Repository
public class CarTeamDao extends MyBatisDao {
    public CarTeamDao() {
        super("carTeamMapper");
    }

    /***
     * 查询车队列表
     * @param param
     * @return
     */
    public List<CarTeam> queryCarTeamsByParam(Map<String,Object> param){
        return super.queryForList("queryCarTeamsByParam",param);
    }

    /**
     * 查询车队数量
     * @param param
     * @return
     */
    public Integer queryCarTeamCountByParam(Map<String,Object> param){
        return super.get("queryCarTeamCountByParam",param);
    }

    /***
     * 查询单个车队信息
     * @param id
     * @return
     */
    public CarTeam queryCarTeamById(Long id){
        return super.get("selectByPrimaryKey",id);
    }

    /***
     * 添加车队
     * @param carTeam
     * @return
     */
    public int addCarTeam(CarTeam carTeam){
        return super.insert("insertSelective",carTeam);
    }

    /***
     * 修改车队信息
     * @param carTeam
     * @return
     */
    public int updateCarTeam(CarTeam carTeam){
        return super.update("updateByPrimaryKeySelective",carTeam);
    }

}
