package com.weason.site.service.impl;

import com.weason.site.dao.UserDao;
import com.weason.site.pojo.User;
import com.weason.site.service.UserService;
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

    @Override
    public ResultMessage queryUsers(User user) {
        ResultMessage resultMessage = ResultMessage.createResultMessage();
        Map<String,Object> param = new HashMap<>();
        if (null != user){
            if (null !=user.getAccount()&&StringUtils.isBlank(user.getAccount())){
                param.put("account",user.getAccount());
            }
            if (null !=user.getAlias()&&StringUtils.isBlank(user.getAlias())){
                param.put("alias",user.getAlias());
            }
        }
        param.put("status",1);
        List<User> users = userDao.queryUsers(param);
        if (users.size()==0){
            resultMessage.setMessage("暂无用户");
        }
        resultMessage.addObject("users",users);
        return resultMessage;
    }

    @Override
    public ResultMessage queryUser(Long id) {
        ResultMessage resultMessage = ResultMessage.createResultMessage();
        User user = userDao.queryUserById(id);
        if (user==null){
            resultMessage.setMessage("需要查询的用户不存在");
        }
        resultMessage.addObject("user",user);
        return resultMessage;
    }

    @Override
    public ResultMessage addUser(User user) {
        ResultMessage resultMessage = ResultMessage.createResultMessage();
        String account = user.getAccount();
        String password = user.getPassword();
        if(StringUtils.isBlank(account)||StringUtils.isBlank(password)){
            resultMessage.setCode(ResultMessage.ERROR);
            resultMessage.setMessage("用户账户或密码为空");
            return resultMessage;
        }
        if (StringUtils.isBlank(user.getSiteId())){
            resultMessage.setCode(ResultMessage.ERROR);
            resultMessage.setMessage("请选择用户所属工地");
            return resultMessage;
        }
        Map<String,Object> param = new HashMap<>();
        param.put("siteId",user.getSiteId());
        param.put("account",account);
        param.put("status",1);
        List<User> users = userDao.queryUsers(param);
        if (users.size()>0){
            resultMessage.setCode(ResultMessage.ERROR);
            resultMessage.setMessage("创建用户账号已存在,不允许重复创建");
            return resultMessage;
        }
        user.setPassword(CryptographyUtil.md5(password));
        int i = userDao.addUser(user);
        if(i==0){
            resultMessage.setCode(ResultMessage.SYS_ERROR);
            resultMessage.setMessage("创建账户失败");
            return resultMessage;
        }
        return resultMessage;
    }

    @Override
    public ResultMessage updateUser(User user) {
        ResultMessage resultMessage = ResultMessage.createResultMessage();
        Long id = user.getId();
        boolean flag = false;
        int i;
        User user1 = userDao.queryUserById(id);
        //判断用户是否存在
        if (null == user1){
            resultMessage.setMessage("修改得用户不存在");
            resultMessage.setCode(ResultMessage.ERROR);
            return resultMessage;
        }
        //不允许修改账户
        if(StringUtils.isNotBlank(user.getAccount())){
            if (!user.getAccount().equals(user1.getAccount())){
                resultMessage.setMessage("用户账户不允许修改");
                resultMessage.setCode(ResultMessage.ERROR);
                return resultMessage;
            }
        }
        //判断是否有需要修改得信息
        if (StringUtils.isNotBlank(user.getPassword())&&(!CryptographyUtil.md5(user.getPassword()).equals(user1.getPassword()))){
            user.setPassword(CryptographyUtil.md5(user.getPassword()));
            flag = true;
        }else {
            user.setPassword(null);
        }
        if (StringUtils.isNotBlank(user.getAlias())&&(!user.getAlias().equals(user1.getAlias()))){
            flag = true;
        }else {
            user.setAlias(null);
        }
        if (flag == false){
            resultMessage.setMessage("无需要修改得信息");
            resultMessage.setCode(ResultMessage.ERROR);
            return resultMessage;
        }else {
            i = userDao.updateUser(user);
        }
        if (i==0){
            resultMessage.setMessage("修改用户信息失败");
            resultMessage.setCode(ResultMessage.SYS_ERROR);
        }
        return resultMessage;
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
}
