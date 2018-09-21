package com.weason.site.web;

import com.weason.site.pojo.CarTeam;
import com.weason.site.pojo.Site;
import com.weason.site.pojo.User;
import com.weason.site.service.SiteService;
import com.weason.util.HttpUtils;
import com.weason.util.Page;
import com.weason.util.ResultMessage;
import com.weason.util.StringUtils;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @Author Administrator
 * @CreateTime 2018/9/17 17:44
 **/
@Controller
@RequestMapping(value = "/sitePlace")
public class SiteController {
    @Autowired
    private SiteService siteService;

    /***
     * 获取所有工地信息
     * @return
     */
    /*@RequestMapping(value = "/getAll",method = RequestMethod.GET)
    @ResponseBody
    *//*public ResultMessage querySites(Site site){
        return siteService.querySites(site);
    }*/

    @RequestMapping(value = "/findSitePlaceList",method = RequestMethod.GET)
    public String querySites(Site queryParam, HttpServletRequest request, Model model,Integer page){
        Map<String,Object> parameters=new HashMap<String,Object>();
        model.addAttribute("queryParam",queryParam);
        parameters.put("siteNumber",queryParam.getSiteName());
        parameters.put("isValid",queryParam.getIsValid());
        parameters.put("siteName",queryParam.getSiteName());
        int count = siteService.querySitesCountByParam(parameters);

        int pagenum = page == null ? 1 : page;
        Page pageParam = Page.page(count, 10, pagenum);
        pageParam.buildUrl(request);
        parameters.put("_start", pageParam.getStartRows());
        parameters.put("_end", pageParam.getEndRows());
        List<Site> sites = siteService.querySitesByParam(parameters);
        pageParam.setItems(sites);
        String basePath = HttpUtils.getBasePath(request);
        model.addAttribute("page",pagenum);
        model.addAttribute("pageParam", pageParam);
        model.addAttribute("basePath",basePath);
        model.addAttribute("sites",sites);
        return "/pages/site/sitePlace/findSitePlaceList";

    }
    /***
     * 获取单个工地信息
     * @param id
     * @return
     */
    @RequestMapping(value = "/getSingle/{id}",method = RequestMethod.GET)
    public Object querySite(@PathVariable Long id,Model model,HttpServletRequest request){
        ResultMessage resultMessage=ResultMessage.createResultMessage();
        if(id==null){
            return ResultMessage.PARAM_EXCEPTION_RESULT;
        }
        String basePath=HttpUtils.getBasePath(request);
        Site site=siteService.querySite(id);
        model.addAttribute("site",site);
        model.addAttribute("basePath",basePath);
        return "/pages/site/sitePlace/showAddSitePlace";
    }


    @RequestMapping(value = "/showAddsitePlace")
    public String showAddsite(HttpServletRequest request,Model model,Site site){
        String basePath=HttpUtils.getBasePath(request);
        model.addAttribute("basePath",basePath);
        model.addAttribute("site",site);
        return "/pages/site/sitePlace/showAddSitePlace";
    }
    @RequestMapping(value = "/showUpdateSitePlace")
    public String showUpdateSitePlace(HttpServletRequest request,Model model,Long id){
        if(id==null){
            model.addAttribute("error","参数异常，不能修改");
            return "/pages/site/sitePlace/showAddSitePlace";
        }
        String basePath=HttpUtils.getBasePath(request);
        Site site =siteService.querySite(id);
        model.addAttribute("basePath",basePath);
        model.addAttribute("site",site);
        return "/pages/site/sitePlace/showAddSitePlace";
    }
    /***
     * 保存工地
     * @param site
     * @return
     */
    @RequestMapping(value = "/saveSitePlace",method = RequestMethod.POST)
    @ResponseBody
    public ResultMessage addSite( Site site){
        int count=0;
        if(site!=null && site.getId()!=null){
            count=siteService.updateSite(site);
            if(count > 0){
                return ResultMessage.UPDATE_SUCCESS_RESULT;
            }
            return ResultMessage.UPDATE_FAIL_RESULT;
        }else {
            count =siteService.addSite(site);
            if(count > 0){
                return ResultMessage.ADD_SUCCESS_RESULT;
            }
            return ResultMessage.ADD_FAIL_RESULT;
        }
    }

    /***
     * 修改工地信息
     * @param site
     * @return
     */
    @RequestMapping(value = "/update",method = RequestMethod.PUT)
    @ResponseBody
    public ResultMessage updateSite(@RequestBody Site site){
        ResultMessage resultMessage=ResultMessage.createResultMessage();
        int count =siteService.updateSite(site);
        if(count > 0){
            return resultMessage;
        }
        resultMessage.addObject("error","修改失败！");
        return resultMessage;
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
        Site site=new Site();
        site.setId(id);
        site.setIsValid(isValid);
        int count =siteService.updateSite(site);
        if( count > 0){
            return ResultMessage.UPDATE_SUCCESS_RESULT;
        }else {
            return ResultMessage.UPDATE_FAIL_RESULT;
        }
    }
    /***
     * 删除工地
     * @param id
     * @return
     */
    @RequestMapping(value = "/delete/{id}",method = RequestMethod.PUT)
    @ResponseBody
    public ResultMessage deleteSite(@PathVariable Long id){
        ResultMessage resultMessage=ResultMessage.createResultMessage();
       int count= siteService.deleteSite(id);
        if(count > 0){
            return resultMessage;
        }
        resultMessage.addObject("error","删除失败！");
        return resultMessage;
    }

    /**
     * 根据工地名称模糊查询列表数据
     * @param search
     * @param resp
     */
    @RequestMapping(value = "/searchSiteList")
    @ResponseBody
    public Object searchSupplierList(String search, HttpServletResponse resp){
        JSONArray array = null;
        Map<String, Object> param=new HashMap<String, Object>();
        if(search!=null){
            //param.put("siteNumber",search);
            param.put("siteName",search);
            param.put("isValid","Y");
        }
        try {
            List<Site> list = siteService.querySitesByParam(param);
            array = new JSONArray();
            if(list != null && list.size() > 0){
                for(Site site:list){
                    JSONObject obj=new JSONObject();
                    obj.put("id", site.getId());
                    obj.put("text", site.getSiteName());
                    array.add(obj);
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return array;
    }
}
