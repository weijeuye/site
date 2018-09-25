package com.weason.site.dao;

import com.weason.site.pojo.User;
import com.weason.util.ResultMessage;
import com.weason.util.mybaties.MyBatisDao;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

/**
 * @program: library
 * @description: ${description}
 * @author: HuangYong
 * @create: 2018-09-15 11:26
 * 用户实现类
 **/
@Repository
public class UserDao extends MyBatisDao {
    public UserDao() {
        super("userMapper");
    }

    /***
     * 查询用户列表
     * @param param
     * @return
     */
    public List<User> queryUsers(Map<String,Object> param){
        return super.queryForList("queryUsers",param);
    }

    /**
     * 查询用户总数
     * @param param
     * @return
     */
    public Integer queryUsersCount(Map<String,Object> param){
        return super.get("queryUsersCount",param);
    }

    /***
     * 查询单个用户信息
     * @param id
     * @return
     */
    public User queryUserById(Long id){
        return super.get("selectByPrimaryKey",id);
    }

    /***
     * 添加用户
     * @param user
     * @return
     */
    public int addUser(User user){
        return super.insert("insertSelective",user);
    }

    /***
     * 修改用户信息
     * @param user
     * @return
     */
    public int updateUser(User user){
        return super.update("updateByPrimaryKeySelective",user);
    }
    /***
     * 修改用户状态
     * @param user
     * @return
     */
    public int updateUserStatus(User user){
        return super.update("updateStatusBySiteId",user);
    }

}
