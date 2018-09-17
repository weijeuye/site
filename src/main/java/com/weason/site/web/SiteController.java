package com.weason.site.web;

import com.weason.site.pojo.Site;
import com.weason.site.service.SiteService;
import com.weason.util.ResultMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

/**
 * @Author Administrator
 * @CreateTime 2018/9/17 17:44
 **/
@Controller
@RequestMapping(value = "/site")
public class SiteController {
    @Autowired
    private SiteService siteService;

    /***
     * 获取所有工地信息
     * @return
     */
    @RequestMapping(value = "/getAll",method = RequestMethod.GET)
    @ResponseBody
    public ResultMessage querySites(Site site){
        return siteService.querySites(site);
    }

    /***
     * 获取单个工地信息
     * @param id
     * @return
     */
    @RequestMapping(value = "/getSingle/{id}",method = RequestMethod.GET)
    @ResponseBody
    public ResultMessage querySite(@PathVariable Long id){
        return siteService.querySite(id);
    }

    /***
     * 添加工地
     * @param site
     * @return
     */
    @RequestMapping(value = "/add",method = RequestMethod.POST)
    @ResponseBody
    public ResultMessage addSite(@RequestBody Site site){
        return siteService.addSite(site);
    }

    /***
     * 修改工地信息
     * @param site
     * @return
     */
    @RequestMapping(value = "/update",method = RequestMethod.PUT)
    @ResponseBody
    public ResultMessage updateSite(@RequestBody Site site){
        return siteService.updateSite(site);
    }

    /***
     * 删除工地
     * @param id
     * @return
     */
    @RequestMapping(value = "/delete/{id}",method = RequestMethod.PUT)
    @ResponseBody
    public ResultMessage deleteSite(@PathVariable Long id){
        return siteService.deleteSite(id);
    }
}
