package com.weason.library.interceptor;

import com.weason.library.po.BookUser;
import com.weason.util.HttpUtils;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * @Author weilei
 * @date 2018/7/20 14:43
 */

/**
 * 请求判断是否登录拦截器
 */
public class LoginInterceptor  implements HandlerInterceptor{
    @Override
    public boolean preHandle(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, Object o) throws Exception {
        System.out.println(httpServletRequest.getRequestURI());
        BookUser loginUser=(BookUser) httpServletRequest.getSession().getAttribute("library_user_session");
        String basePath = HttpUtils.getBasePath(httpServletRequest);
        if(loginUser ==null){
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
