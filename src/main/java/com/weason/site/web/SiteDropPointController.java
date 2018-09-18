package com.weason.site.web;

import com.weason.site.pojo.Site;
import com.weason.site.pojo.SiteDropPoint;
import com.weason.site.service.SiteDropPointService;
import com.weason.util.ResultMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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
     * @param siteDropPoint
     * @param model
     * @return
     */
    @RequestMapping(value = "getAll",method = RequestMethod.GET)
    public String querySiteDropPoints(SiteDropPoint siteDropPoint, Model model){
        List<SiteDropPoint> siteDropPoints = siteDropPointService.querySiteDropPoints(siteDropPoint);
        model.addAttribute(siteDropPoints);
        return "";
    }
    /***
     * 获取单个工地投放点信息
     * @param id
     * @return
     */
    @RequestMapping(value = "/getSingle/{id}",method = RequestMethod.GET)
    @ResponseBody
    public ResultMessage querySiteDropPoint(@PathVariable Long id){
        return siteDropPointService.querySiteDropPoint(id);
    }

    /***
     * 添加工地投放点
     * @param siteDropPoint
     * @return
     */
    @RequestMapping(value = "/add",method = RequestMethod.POST)
    @ResponseBody
    public ResultMessage addSiteDropPoint(@RequestBody SiteDropPoint siteDropPoint){
        return siteDropPointService.addSiteDropPoint(siteDropPoint);
    }
    /***
     * 修改工地投放点信息
     * @param siteDropPoint
     * @return
     */
    @RequestMapping(value = "/update",method = RequestMethod.PUT)
    @ResponseBody
    public ResultMessage updateSiteDropPoint(@RequestBody SiteDropPoint siteDropPoint){
        return siteDropPointService.updateSiteDropPoint(siteDropPoint);
    }

    /***
     * 删除工地投放点
     * @param id
     * @return
     */
    @RequestMapping(value = "/delete/{id}",method = RequestMethod.PUT)
    @ResponseBody
    public ResultMessage deleteSiteDropPoint(@PathVariable Long id){
        return siteDropPointService.deleteSiteDropPoint(id);
    }
}
