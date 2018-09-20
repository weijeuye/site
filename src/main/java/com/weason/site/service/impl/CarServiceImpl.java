package com.weason.site.service.impl;

import com.weason.site.dao.CarDao;
import com.weason.site.pojo.Car;
import com.weason.site.pojo.CarTeam;
import com.weason.site.service.CarService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Map;

/**
 * @Author weilei
 * @date 2018-09-20 16:27
 */
@Component
public class CarServiceImpl implements CarService {
    @Autowired
    private CarDao carDao;

    @Override
    public List<Car> queryCarTeamsByParam(Map<String, Object> param) {
        return carDao.queryCarsByParam(param);
    }

    @Override
    public Integer queryCarTeamCountByParam(Map<String, Object> param) {
        return carDao.queryCarsCountByParam(param);
    }

    @Override
    public Car queryCarById(Long id) {
        return carDao.queryCarById(id);
    }

    @Override
    public Integer AddCar(Car car) {
        return carDao.addCar(car);
    }

    @Override
    public Integer updateCar(Car car) {
        return carDao.updateCar(car);
    }

    @Override
    public Integer deleteCar(Car car) {
        return carDao.updateCar(car);
    }
}
