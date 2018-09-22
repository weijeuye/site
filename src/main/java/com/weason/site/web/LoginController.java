package com.weason.site.web;

import com.weason.site.pojo.User;
import com.weason.site.service.UserService;
import com.weason.util.CryptographyUtil;
import com.weason.util.HttpUtils;
import com.weason.util.ResultMessage;
import com.weason.util.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

/**
 * @program: site
 * @description: ${description}
 * @author: HuangYong
 * @create: 2018-09-21 20:21
 **/
@Controller
public class LoginController {
    @Autowired
    private UserService userService;

    @RequestMapping("/login")
    @ResponseBody
    public ResultMessage login(HttpServletRequest request, HttpServletResponse response, Model model, User user) {
        ResultMessage resultMessage=ResultMessage.createResultMessage();
        if(user==null){
            resultMessage.setMessage("请填写用户名和密码！");
            resultMessage.setCode(ResultMessage.ERROR);
            return resultMessage;
        }
        if (StringUtils.isBlank(user.getAccount())){
            resultMessage.setMessage("请填写用户名！");
            resultMessage.setCode(ResultMessage.ERROR);
            return resultMessage;
        }
        if (StringUtils.isBlank(user.getPassword())){
            resultMessage.setMessage("请填写密码！");
            resultMessage.setCode(ResultMessage.ERROR);
            return resultMessage;
        }
        User user1 = userService.queryUserByAccount(user.getAccount(),CryptographyUtil.md5(user.getPassword()));
        if (null == user1){
            resultMessage.setMessage("用户名或密码不正确！");
            resultMessage.setCode(ResultMessage.ERROR);
            return resultMessage;
        }
        HttpSession session=request.getSession(true);
        session.setAttribute("site_user",user1);
        return  resultMessage;
    }
    @RequestMapping("/loginOut")
    private Object loginOut(Model model,HttpServletRequest request,HttpServletResponse response){
        String basePath = HttpUtils.getBasePath(request);
        model.addAttribute("basePath",basePath);
        request.getSession().invalidate();
        return   "login";
    }
    @RequestMapping("/index")
    public Object index(Model model,HttpServletRequest request,HttpServletResponse response){
        User user =(User)request.getSession().getAttribute("site_user");
        String basePath = HttpUtils.getBasePath(request);
        model.addAttribute("basePath",basePath);
        model.addAttribute("user",user);
        if(user==null){
            return "login";
        }
        return "indexNew";
    };
}
