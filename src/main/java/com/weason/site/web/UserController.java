package com.weason.site.web;

import com.weason.site.pojo.User;
import com.weason.site.service.UserService;
import com.weason.util.ResultMessage;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

/**
 * @program: library
 * @description: ${description}
 * @author: HuangYong
 * @create: 2018-09-15 16:25
 **/

@Controller
@RequestMapping(value = "/user")
public class UserController {
    private static final Logger logger = LoggerFactory.getLogger(UserController.class);
    @Autowired
    private UserService userService;

    /***
     * 获取所有用户
     * @return
     */
    @RequestMapping(value = "/getAll",method = RequestMethod.GET)
    @ResponseBody
    public ResultMessage queryUsers(User user){
        return userService.queryUsers(user);
    }

    /***
     * 获取单个用户
     * @param id
     * @return
     */
    @RequestMapping(value = "/getSingle/{id}",method = RequestMethod.GET)
    @ResponseBody
    public ResultMessage queryUser(@PathVariable Long id){
       return userService.queryUser(id);
    }

    /***
     * 添加用户
     * @param user
     * @return
     */
    @RequestMapping(value = "/add",method = RequestMethod.POST)
    @ResponseBody
    public ResultMessage addUser(@RequestBody User user){
        return userService.addUser(user);
    }

    /***
     * 修改用户信息
     * @param user
     * @return
     */
    @RequestMapping(value = "/update",method = RequestMethod.PUT)
    @ResponseBody
    public ResultMessage updateUser(@RequestBody User user){
        return userService.updateUser(user);
    }

    /***
     * 删除用户
     * @param id
     * @return
     */
    @RequestMapping(value = "/delete/{id}",method = RequestMethod.PUT)
    @ResponseBody
    public ResultMessage deleteUser(@PathVariable Long id){
        return userService.deleteUser(id);
    }
}
