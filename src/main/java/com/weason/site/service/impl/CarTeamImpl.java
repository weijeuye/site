package com.weason.site.service.impl;

import com.weason.site.dao.CarDao;
import com.weason.site.dao.CarTeamDao;
import com.weason.site.pojo.CarTeam;
import com.weason.site.service.CarTeamService;
import com.weason.util.ResultMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;

/**
 * @Author weilei
 * @date 2018-09-19 18:19
 */
@Component
public class CarTeamImpl implements CarTeamService {

    @Autowired
    private CarTeamDao carTeamDao;
    @Autowired
    private CarDao carDao;

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
    @Transactional(rollbackFor = Exception.class)
    public Object updateCarTeamStatus(CarTeam carTeam) {
        carTeamDao.updateCarTeam(carTeam);
        carDao.updateByCarTeamId(carTeam.getId());
        return ResultMessage.UPDATE_SUCCESS_RESULT;
    }
    @Override
    public Integer deleteCarTeam(Long id) {
        CarTeam carTeam = new CarTeam();
        carTeam.setId(id);
        carTeam.setStatus(0);
        return carTeamDao.updateCarTeam(carTeam);
    }
}
