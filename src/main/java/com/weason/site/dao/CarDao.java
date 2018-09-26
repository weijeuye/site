package com.weason.site.dao;

import com.weason.site.pojo.Car;
import com.weason.util.mybaties.MyBatisDao;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

/**
 * @program: library
 * @description: ${description}
 * @author: HuangYong
 * @create: 2018-09-15 11:25
 * 车辆实现类
 **/
@Repository
public class CarDao extends MyBatisDao {
    public CarDao() {
        super("carMapper");
    }

    /***
     * 查询车辆列表
     * @param param
     * @return
     */
    public List<Car> queryCarsByParam(Map<String,Object> param){
        return super.queryForList("queryCarsByParam",param);
    }

    /**
     *查询车辆数量
     * @param param
     * @return
     */
    public Integer queryCarsCountByParam(Map<String,Object> param){
        return super.get("queryCarsCountByParam",param);
    }

    /***
     * 查询单个车辆信息
     * @param id
     * @return
     */
    public Car queryCarById(Long id){
        return super.get("selectByPrimaryKey",id);
    }

    /***
     * 添加车辆
     * @param car
     * @return
     */
    public int addCar(Car car){
        return super.insert("insertSelective",car);
    }

    /***
     * 修改车辆信息
     * @param car
     * @return
     */
    public int updateCar(Car car){
        return super.update("updateByPrimaryKeySelective",car);
    }

    public int updateByCarTeamId(Long id) {return super.update("updateByCarTeamId",id);}
}
