package com.weason.site.web;

import com.weason.site.pojo.User;
import com.weason.site.service.UserService;
import com.weason.util.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @program: library
 * @description: ${description}
 * @author: HuangYong
 * @create: 2018-09-15 16:25
 **/

@Controller
@RequestMapping(value = "/siteUser")
public class UserController {
    private static final Logger logger = LoggerFactory.getLogger(UserController.class);
    @Autowired
    private UserService userService;

    /***
     * 获取所有用户
     * @return
     */
    @RequestMapping(value = "/findUsers",method = RequestMethod.GET)

    public String queryUsers(User queryParam, Model model,HttpServletRequest request,Integer page){
        Map<String,Object> parameters=new HashMap<String,Object>();
        model.addAttribute("queryParam",queryParam);
        if (null != queryParam){
            if (null !=queryParam.getAccount()&& !StringUtils.isBlank(queryParam.getAccount())){
                parameters.put("account",queryParam.getAccount());
            }
            if (null !=queryParam.getAlias()&& !StringUtils.isBlank(queryParam.getAlias())){
                parameters.put("alias",queryParam.getAlias());
            }
        }
        parameters.put("gender",queryParam.getGender());
        //parameters.put("status",queryParam.getStatus());
        parameters.put("isValid",queryParam.getIsValid());
        int count = userService.queryUsersCount(parameters);

        int pagenum = page == null ? 1 : page;
        Page pageParam = Page.page(count, 10, pagenum);
        pageParam.buildUrl(request);
        parameters.put("_start", pageParam.getStartRows());
        parameters.put("_end", pageParam.getEndRows());
        List<User> users = userService.queryUsers(parameters);
        pageParam.setItems(users);
        String basePath = HttpUtils.getBasePath(request);
        model.addAttribute("page",pagenum);
        model.addAttribute("pageParam", pageParam);
        model.addAttribute("basePath",basePath);
        model.addAttribute("users",users);
        return "/pages/site/user/findUserList";
    }

    /***
     * 获取单个用户
     * @param user
     * @return
     */
    @RequestMapping(value = "/showAddUser")
    public String showAddUser(HttpServletRequest request,Model model,User user){
        String basePath=HttpUtils.getBasePath(request);
        model.addAttribute("basePath",basePath);
        model.addAttribute("user",user);
        return "/pages/site/user/showAddUser";
    }
    /***
     * 添加用户/修改用户
     * @param user
     * @return
     */
    @RequestMapping(value = "/addUser",method = RequestMethod.POST)
    @ResponseBody
    public ResultMessage addUser( User user){
        ResultMessage resultMessage = ResultMessage.createResultMessage();
        if(user!=null && user.getId() !=null){
            User user1 = userService.queryUser(user.getId());
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
          /*  //判断是否有需要修改得信息
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
            }*/
            Integer i=userService.updateUser(user);
            if (i==0){
                resultMessage.setMessage("修改用户信息失败");
                resultMessage.setCode(ResultMessage.SYS_ERROR);
                return resultMessage;
            }else {
                return resultMessage;
            }
        }
        user.setIsValid("Y");
        user.setUserType("N");
        user.setPassword("123456");
        String account = user.getAccount();
        String password = user.getPassword();
        if(StringUtils.isBlank(account)||StringUtils.isBlank(password)){
            resultMessage.setCode(ResultMessage.ERROR);
            resultMessage.setMessage("用户账户或密码为空");
            return resultMessage;
        }
        Map<String,Object> param = new HashMap<>();
        param.put("account",account);
        param.put("status",1);
        List<User> users = userService.queryUsers(param);
        if (users.size()>0){
            resultMessage.setCode(ResultMessage.ERROR);
            resultMessage.setMessage("创建用户账号已存在,不允许重复创建");
            return resultMessage;
        }
        user.setPassword(CryptographyUtil.md5(password));
        int i = userService.addUser(user);
        if(i==0){
            resultMessage.setCode(ResultMessage.SYS_ERROR);
            resultMessage.setMessage("创建账户失败");
            return resultMessage;
        }
        return resultMessage;
    }


    @RequestMapping(value = "/showUpdateUser")
    public String showAddUser(HttpServletRequest request,Model model,Long id){
        if(id==null){
            model.addAttribute("error","参数异常，不能修改");
            return "/pages/site/user/showAddUser";
        }
        String basePath=HttpUtils.getBasePath(request);
        User user =userService.queryUser(id);
        model.addAttribute("basePath",basePath);
        model.addAttribute("user",user);
        return "/pages/site/user/showAddUser";
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
    @RequestMapping("/updateStatus")
    @ResponseBody
    public Object updateStatus(Long id ,String isValid){
        Map<String,Object> result=new HashMap<String,Object>();
        if(id ==0 || id == null ){
            return ResultMessage.PARAM_EXCEPTION_RESULT;
        }
        User user=new User();
        user.setId(id);
        user.setIsValid(isValid);
        int count =userService.updateUser(user);
        if( count > 0){
            return ResultMessage.UPDATE_SUCCESS_RESULT;
        }else {
            return ResultMessage.UPDATE_FAIL_RESULT;
        }
    }
}
