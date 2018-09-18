package com.weason.site.web;

import com.weason.library.po.BookType;
import com.weason.site.pojo.User;
import com.weason.site.service.UserService;
import com.weason.util.HttpUtils;
import com.weason.util.Page;
import com.weason.util.ResultMessage;
import com.weason.util.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

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
@RequestMapping(value = "/site/user")
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
            if (null !=queryParam.getAccount()&& StringUtils.isBlank(queryParam.getAccount())){
                parameters.put("account",queryParam.getAccount());
            }
            if (null !=queryParam.getAlias()&&StringUtils.isBlank(queryParam.getAlias())){
                parameters.put("alias",queryParam.getAlias());
            }
        }
        parameters.put("status",queryParam.getStatus());
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
