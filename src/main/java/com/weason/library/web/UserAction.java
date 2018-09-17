package com.weason.library.web;

import com.weason.library.po.BookUser;
import com.weason.library.service.BookUserService;
import com.weason.library.vo.UpdatePasswordVo;
import com.weason.util.HttpUtils;
import com.weason.util.Page;
import com.weason.util.ResultMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.*;

@Controller
@RequestMapping("/user")
public class UserAction {

    @Autowired
    BookUserService bookUserService;

    @RequestMapping("/findUsers")
    public Object queryReaders(Model model, HttpServletRequest request, HttpServletResponse response,Integer page,BookUser queryParam){

        Map<String,Object> parameters=new HashMap<String,Object>();
        if(queryParam!=null ){
            parameters.put("userAccount",queryParam.getUserAccount());
            parameters.put("userName",queryParam.getUserName());
            parameters.put("motherTelephone",queryParam.getMotherTelephone());
            parameters.put("fatherTelephone",queryParam.getFatherTelephone());
            parameters.put("gender",queryParam.getGender());
        }
        model.addAttribute("queryParam",queryParam);
        //parameters.put("isvalid","Y");
        parameters.put("userType","u");
        int count =bookUserService.findBookUsersCount(parameters);
        // 分页
        int pagenum = page == null ? 1 : page;
        Page pageParam = Page.page(count, 10, pagenum);
        pageParam.buildUrl(request);
        parameters.put("_start", pageParam.getStartRows());
        parameters.put("_end", pageParam.getEndRows());

        List<BookUser> bookUserArrayList= bookUserService.queryBookUsers(parameters);
        pageParam.setParam(bookUserArrayList);
        model.addAttribute("page",pagenum);
        model.addAttribute("pageParam",pageParam);
        model.addAttribute("bookUsers",bookUserArrayList);
        String basePath = HttpUtils.getBasePath(request);
        model.addAttribute("basePath",basePath);
        return "/pages/library/user/findUserList";
    }

    @RequestMapping("/updateUser")
    public Object updateUser(Model model,HttpServletRequest request,BookUser user){
        Map<String,Object> resultMap=new HashMap<String,Object>();
        if(user ==null ){
            resultMap.put("message","参数为空！");
            resultMap.put("status","1");
            return resultMap;
        }

        return "";
    }
    @RequestMapping("/addUser")
    public Object addUser(Model model,HttpServletRequest request,BookUser user){

        model.addAttribute("user",user);
        String basePath = HttpUtils.getBasePath(request);
        model.addAttribute("basePath",basePath);
        return "/pages/library/user/showAddUser";
    }
    @RequestMapping("/showUpdateUser")
    public Object showUpdateUser(Model model,HttpServletRequest request,Long userId){
        BookUser user=null;
        if(userId ==null){
            model.addAttribute("user",user);
            return "/pages/library/user/showAddUser";
        }
        Map<String,Object> param=new HashMap<String,Object>();
        param.put("userId",userId);
        user=bookUserService.findBookUser(param);
        model.addAttribute("user",user);
        String basePath = HttpUtils.getBasePath(request);
        model.addAttribute("basePath",basePath);
        return "/pages/library/user/showAddUser";
    }

    @RequestMapping("/saveUser")
    @ResponseBody
    public Object saveUser(Model model,BookUser user,HttpServletRequest request){
        Map<String,Object> result=new HashMap<String,Object>();
        if(user ==null){
           return ResultMessage.PARAM_EXCEPTION_RESULT;
        }
        if(user.getUserId() == 0){
           int resultcount= bookUserService.addBookUser(user);
            if(resultcount > 0){
               return ResultMessage.ADD_SUCCESS_RESULT;
            }else {
               return ResultMessage.ADD_FAIL_RESULT;
            }
        }else {
            int count=bookUserService.updateBookUser(user);
            if( count > 0){
              return ResultMessage.UPDATE_SUCCESS_RESULT;
            }else {
             return ResultMessage.UPDATE_FAIL_RESULT;
            }
        }
    }
    @RequestMapping("/updateStatus")
    @ResponseBody
    public Object updateStatus(long userId ,String isValid){
        Map<String,Object> result=new HashMap<String,Object>();
        if(userId ==0 || isValid== null ){
            return ResultMessage.PARAM_EXCEPTION_RESULT;
        }
        BookUser user=new BookUser();
        user.setUserId(userId);
        user.setIsValid(isValid);
        int count =bookUserService.updateBookUser(user);
        if( count > 0){
            return ResultMessage.UPDATE_SUCCESS_RESULT;
        }else {
            return ResultMessage.UPDATE_FAIL_RESULT;
        }
    }
    @RequestMapping("/showUpdatePassWord")
    public  String showUpdatePassWord(HttpServletRequest request,Model model,BookUser user,HttpServletResponse response){
        String basePath = HttpUtils.getBasePath(request);
        model.addAttribute("basePath",basePath);
        BookUser loginUser=(BookUser) request.getSession().getAttribute("library_user_session");

        if(user!=null ){
            model.addAttribute("user",loginUser);
        }
        return   "/pages/library/user/showUpdatePassword";
    }

    @RequestMapping("/updatePassWord")
    @ResponseBody
    public  Object updatePassWord(HttpServletRequest request, UpdatePasswordVo passwordVo){
        if(passwordVo.getBookUser() ==null || passwordVo.getOldPassword()==null || passwordVo.getNewPassword()==null){
           return ResultMessage.PARAM_EXCEPTION_RESULT;
        }
        BookUser user=passwordVo.getBookUser();
        Map<String,Object> param=new HashMap<String,Object>();
        param.put("password",passwordVo.getOldPassword());
        param.put("userId",user.getUserId());
        param.put("userAccount",user.getUserAccount());
        BookUser userdb=bookUserService.findBookUserByPassword(param);
        if(userdb ==null){
            return ResultMessage.OLDPASSWORD_ISNOT_RIGHT;
        }
        userdb.setUserPassword(passwordVo.getNewPassword());
        bookUserService.updateBookUser(userdb);

        return   ResultMessage.UPDATE_PASSWORD_SUCCESS;
    }
}
