package com.weason.library.web;

import com.weason.library.po.BookUser;
import com.weason.library.service.BookUserService;
import com.weason.util.HttpUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Controller
public class Login {
    @Autowired
    private BookUserService bookUserService;
    @RequestMapping("/login")
    @ResponseBody
    public Object login(HttpServletRequest request, HttpServletResponse response, Model model,BookUser bookUser) {
        Map<String,Object> result =new HashMap<String, Object>();

        if(bookUser==null){
            result.put("status",0);
            result.put("message","请填写用户名和密码！");
            return result;
        }
        Map<String,Object> param =new HashMap<String, Object>();
        param.put("userName",bookUser.getUserAccount());
        param.put("password",bookUser.getUserPassword());
        BookUser loginUser=bookUserService.findBookUser(param);
        if(loginUser==null){
            result.put("status",0);
            result.put("message","用户名或者密码不对！");
            return result;
        }
        result.put("status",1);
        result.put("message","登录成功！");
        HttpSession session=request.getSession(true);
        loginUser.setUpdateTime(new Date());
        //bookUserService.updateBookUser(loginUser);
        session.setAttribute("library_user_session",loginUser);
        return  result;
        /*HttpSession session=request.getSession(true);
        ArrayList<BookUser> bookUsers=bookUserService.queryBookUsers();

         session.setAttribute("library_user_session",bookUsers.get(0));
        BookUser readerInfoSession =(BookUser) session.getAttribute("library_user_session");

        //session无效设置
        //session.invalidate();
        return "";*/
    }
    @RequestMapping("/loginout")
    private Object loginout(Model model,HttpServletRequest request,HttpServletResponse response){
        String basePath = HttpUtils.getBasePath(request);
        model.addAttribute("basePath",basePath);
        request.getSession().invalidate();
       return   "login";
    }
    @RequestMapping("/index")
    public Object index(Model model,HttpServletRequest request,HttpServletResponse response){
        BookUser bookUser =(BookUser)request.getSession().getAttribute("library_user_session");
        String basePath = HttpUtils.getBasePath(request);
        model.addAttribute("basePath",basePath);
        model.addAttribute("user",bookUser);
        if(bookUser==null){
            return "login";
        }
        return "indexNew";

    };
}
