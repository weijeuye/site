package com.weason.site.service;

import com.weason.site.pojo.User;
import com.weason.util.ResultMessage;

import java.util.List;
import java.util.Map;

/**
 * @program: library
 * @description: ${description}
 * @author: HuangYong
 * @create: 2018-09-15 16:21
 **/
public interface UserService {
    /***
     * 查询用户列表
     * @return
     * @param param
     */
    List<User> queryUsers(Map<String,Object> param);

    Integer  queryUsersCount(Map<String,Object> param);

    /***
     * 查询单个用户
     * @param id
     * @return
     */
    User queryUser(Long id);

    /***
     * 添加用户
     * @param user
     * @return
     */
    Integer addUser(User user);

    /***
     * 修改用户信息
     * @param user
     * @return
     */
    Integer updateUser(User user);

    /***
     * 删除用户
     * @param id
     * @return
     */
    ResultMessage deleteUser(Long id);
}
