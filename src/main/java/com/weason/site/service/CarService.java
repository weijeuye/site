package com.weason.site.service;

import com.weason.site.pojo.Car;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Map;

/**
 * @Author weilei
 * @date 2018-09-20 15:42
 */
public interface CarService {
    /***
     * 获取所有车队
     * @param param
     * @return
     */
    public List<Car> queryCarTeamsByParam(Map<String, Object> param);

    /***
     *查询车队数量
     * @param param
     * @return
     */
    public Integer queryCarTeamCountByParam(Map<String, Object> param);

    /***
     * 获取单个车队信息
     * @param id
     * @return
     */
    Car queryCarById(Long id);

    /***
     * 添加工地
     * @param car
     * @return
     */
    Integer AddCar(Car car);

    /***
     * 修改工地信息
     * @param car
     * @return
     */
    Integer updateCar(Car car);

    /***
     * 删除工地
     * @param car
     * @return
     */
    Integer deleteCar(Car car);
}
