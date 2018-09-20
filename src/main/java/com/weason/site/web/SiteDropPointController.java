package com.weason.site.web;

import com.weason.site.pojo.Site;
import com.weason.site.pojo.SiteDropPoint;
import com.weason.site.service.SiteDropPointService;
import com.weason.util.HttpUtils;
import com.weason.util.Page;
import com.weason.util.ResultMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @Author Administrator
 * @CreateTime 2018/9/18 10:13
 **/
@Controller
@RequestMapping(value = "/siteDropPoint")
public class SiteDropPointController {
    @Autowired
    private SiteDropPointService siteDropPointService;

    /***
     * 查询所有工地投放点
     * @param queryParam
     * @param model
     * @return
     */
    @RequestMapping(value = "/findSiteDropPointList",method = RequestMethod.GET)
    public String querySiteDropPoints(SiteDropPoint queryParam, Model model, HttpServletRequest request,Integer page){
        Map<String,Object> parameters=new HashMap<String,Object>();
        model.addAttribute("queryParam",queryParam);
        parameters.put("dropPoint",queryParam.getDropPoint());
        parameters.put("siteId",queryParam.getSiteId());
        parameters.put("status",1);
        parameters.put("isValid",queryParam.getIsValid());
        int count = siteDropPointService.querySiteDropPointsCount(parameters);

        int pagenum = page == null ? 1 : page;
        Page pageParam = Page.page(count, 10, pagenum);
        pageParam.buildUrl(request);
        parameters.put("_start", pageParam.getStartRows());
        parameters.put("_end", pageParam.getEndRows());
        List<SiteDropPoint> siteDropPoints = siteDropPointService.querySiteDropPoints(parameters);
        pageParam.setItems(siteDropPoints);
        String basePath = HttpUtils.getBasePath(request);
        model.addAttribute("page",pagenum);
        model.addAttribute("pageParam", pageParam);
        model.addAttribute("basePath",basePath);
        model.addAttribute("siteDropPoints",siteDropPoints);
        return "/pages/site/siteDropPoint/findSiteDropPointList";
    }

    //修改投放点
    @RequestMapping(value = "/showAddSiteDropPoint")
    public String showAddsite(HttpServletRequest request,Model model,SiteDropPoint siteDropPoint){
        String basePath=HttpUtils.getBasePath(request);
        model.addAttribute("basePath",basePath);
        model.addAttribute("siteDropPoint",siteDropPoint);
        return "/pages/site/siteDropPoint/showAddSiteDropPoint";
    }

    @RequestMapping(value = "/showUpdateSiteDropPoint")
    public String showUpdateSitePlace(HttpServletRequest request,Model model,Long id){
        if(id==null){
            model.addAttribute("error","参数异常，不能修改");
            return "/pages/site/siteDropPoint/showAddSiteDropPoint";
        }
        String basePath=HttpUtils.getBasePath(request);
        SiteDropPoint siteDropPoint =siteDropPointService.querySiteDropPoint(id);
        model.addAttribute("basePath",basePath);
        model.addAttribute("siteDropPoint",siteDropPoint);
        return "/pages/site/siteDropPoint/showAddSiteDropPoint";
    }
    /***
     * 保存工地(新增或者修改)
     * @param siteDropPoint
     * @return
     */
    @RequestMapping(value = "/saveSiteDropPoint",method = RequestMethod.POST)
    @ResponseBody
    public ResultMessage addSite( SiteDropPoint siteDropPoint){
        int count=0;
        if(siteDropPoint!=null && siteDropPoint.getId()!=null){
            count=siteDropPointService.updateSiteDropPoint(siteDropPoint);
            if(count > 0){
                return ResultMessage.UPDATE_SUCCESS_RESULT;
            }
            return ResultMessage.UPDATE_FAIL_RESULT;
        }else {
            count =siteDropPointService.addSiteDropPoint(siteDropPoint);
            if(count > 0){
                return ResultMessage.ADD_SUCCESS_RESULT;
            }
            return ResultMessage.ADD_FAIL_RESULT;
        }
    }
    /**
     * 修改工地状态
     * @param id
     * @param isValid
     * @return
     */
    @RequestMapping(value = "/updateStatus",method = RequestMethod.POST)
    @ResponseBody
    public Object updateStatus(Long id ,String isValid){
        if(id ==0 || id == null ){
            return ResultMessage.PARAM_EXCEPTION_RESULT;
        }
        SiteDropPoint siteDropPoint=new SiteDropPoint();
        siteDropPoint.setId(id);
        siteDropPoint.setIsValid(isValid);
        int count =siteDropPointService.updateSiteDropPoint(siteDropPoint);
        if( count > 0){
            return ResultMessage.UPDATE_SUCCESS_RESULT;
        }else {
            return ResultMessage.UPDATE_FAIL_RESULT;
        }
    }

    /***
     * 删除工地投放点
     * @param id
     * @return
     */
    /*@RequestMapping(value = "/delete/{id}",method = RequestMethod.PUT)
    @ResponseBody
    public ResultMessage deleteSiteDropPoint(@PathVariable Long id){
        return siteDropPointService.deleteSiteDropPoint(id);
    }*/
}
