package com.weason.site.service.impl;

import com.weason.site.dao.CarTeamDao;
import com.weason.site.pojo.CarTeam;
import com.weason.site.service.CarTeamService;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;
import java.util.Map;

/**
 * @Author weilei
 * @date 2018-09-19 18:19
 */

public class CarTeamImpl implements CarTeamService {

    @Autowired
    private CarTeamDao carTeamDao;

    @Override
    public List<CarTeam> queryCarTeam(CarTeam carTeam) {
        return null;
    }

    @Override
    public List<CarTeam> queryCarTeamsByParam(Map<String, Object> param) {
        return carTeamDao.queryCarTeamsByParam(param);
    }

    @Override
    public Integer queryCarTeamCountByParam(Map<String, Object> param) {
        return carTeamDao.queryCarTeamCountByParam(param);
    }

    @Override
    public CarTeam queryCarTeamById(Long id) {
        return carTeamDao.queryCarTeamById(id);
    }

    @Override
    public Integer AddCarTeam(CarTeam carTeam) {
        return carTeamDao.addCarTeam(carTeam);
    }

    @Override
    public Integer updateCarTeam(CarTeam carTeam) {
        return carTeamDao.updateCarTeam(carTeam);
    }

    @Override
    public Integer deleteCarTeam(Long id) {
        return carTeamDao.deleteCarTeam(id);
    }
}
