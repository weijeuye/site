package com.weason.site.service;

import com.weason.site.pojo.User;
import com.weason.util.ResultMessage;

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
     * @param user
     */
    ResultMessage queryUsers(User user);

    /***
     * 查询单个用户
     * @param id
     * @return
     */
    ResultMessage queryUser(Long id);

    /***
     * 添加用户
     * @param user
     * @return
     */
    ResultMessage addUser(User user);

    /***
     * 修改用户信息
     * @param user
     * @return
     */
    ResultMessage updateUser(User user);

    /***
     * 删除用户
     * @param id
     * @return
     */
    ResultMessage deleteUser(Long id);
}
