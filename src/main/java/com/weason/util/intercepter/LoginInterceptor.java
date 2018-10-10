package com.weason.util.intercepter;

import com.weason.constant.SystemConstant;
import com.weason.library.po.BookUser;
import com.weason.site.pojo.User;
import com.weason.util.HttpUtils;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**请求判断是否登录拦截器
 * @Author weilei
 * @date 2018/7/20 14:43
 */

public class LoginInterceptor implements HandlerInterceptor{
    @Override
    public boolean preHandle(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, Object o) throws Exception {
        System.out.println(httpServletRequest.getRequestURI());
        User user=(User) httpServletRequest.getSession().getAttribute(SystemConstant.SITE_USER_SESSION);
        String basePath = HttpUtils.getBasePath(httpServletRequest);
        if(user ==null){
            httpServletResponse.sendRedirect(basePath+"/index.do");
            return  false;
        }

        return true;
    }

    @Override
    public void postHandle(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, Object o, ModelAndView modelAndView) throws Exception {

    }

    @Override
    public void afterCompletion(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, Object o, Exception e) throws Exception {

    }
}
