package com.weason.site.service.impl;

import com.weason.site.dao.SiteDao;
import com.weason.site.dao.UserDao;
import com.weason.site.pojo.Site;
import com.weason.site.pojo.User;
import com.weason.site.service.UserService;
import com.weason.site.vo.UserVo;
import com.weason.util.BeanUtils;
import com.weason.util.CryptographyUtil;
import com.weason.util.ResultMessage;
import com.weason.util.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @program: library
 * @description: ${description}
 * @author: HuangYong
 * @create: 2018-09-15 16:22
 **/
@Component
public class UserServiceImpl implements UserService {
    private static final Logger logger = LoggerFactory.getLogger(UserServiceImpl.class);
    @Autowired
    private UserDao userDao;
    @Autowired
    private SiteDao siteDao;

    @Override
    public List<User> queryUsers(Map<String,Object> param) {
        List<User> userList=userDao.queryUsers(param);
        return userList;
    }

    @Override
    public Integer queryUsersCount(Map<String, Object> param) {
        return userDao.queryUsersCount(param);
    }

    @Override
    public UserVo queryUser(Long id) {
        User user = userDao.queryUserById(id);
        UserVo userVo = BeanUtils.copyProperties(user,UserVo.class);
        Long siteId = user.getSiteId();
        Site site = siteDao.querySiteById(siteId);
        userVo.setSiteName(site.getSiteName());
        return userVo;
    }

    @Override
    public Integer addUser(User user) {


        return userDao.addUser(user);
    }

    @Override
    public Integer updateUser(User user) {
        return userDao.updateUser(user);
    }

    @Override
    public ResultMessage deleteUser(Long id) {
        ResultMessage resultMessage = ResultMessage.createResultMessage();
        User userReturn = userDao.queryUserById(id);
        if (null == userReturn){
            resultMessage.setMessage("删除得用户不存在");
            return resultMessage;
        }
        User user = new User();
        user.setId(id);
        user.setStatus(0);
        int i = userDao.updateUser(user);
        if (i==0){
            resultMessage.setMessage("删除失败");
            resultMessage.setCode(ResultMessage.SYS_ERROR);
        }
        return resultMessage;
    }

    @Override
    public User queryUserByAccount(String account, String password) {
        Map map = new HashMap();
        map.put("account",account);
        map.put("password",password);
        List list = userDao.queryUsers(map);
        if (list.size()>0){
            return (User) list.get(0);
        }
        return null;
    }
}
