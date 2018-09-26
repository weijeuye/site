package com.weason.site.service;

import com.weason.site.pojo.CarTeam;
import com.weason.site.pojo.Site;

import java.util.List;
import java.util.Map;

/**
 * @Author weilei
 * @CreateTime 2018/9/17 17:46
 **/
public interface CarTeamService {
    /***
     * 获取所有车队
     * @param param
     * @return
     */
    public List<CarTeam> queryCarTeamsByParam(Map<String, Object> param);

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
    CarTeam queryCarTeamById(Long id);

    /***
     * 添加工地
     * @param carTeam
     * @return
     */
    Integer AddCarTeam(CarTeam carTeam);

    /***
     * 修改工地信息
     * @param carTeam
     * @return
     */
    Integer updateCarTeam(CarTeam carTeam);

    /***
     * 删除工地
     * @param id
     * @return
     */
    Integer deleteCarTeam(Long id);

    /***
     * 修改車隊狀態
     * @param carTeam
     * @return
     */
    Object updateCarTeamStatus(CarTeam carTeam);
}
