package com.weason.site.web;

import com.weason.site.pojo.CarTeam;
import com.weason.site.service.CarTeamService;
import com.weason.util.HttpUtils;
import com.weason.util.Page;
import com.weason.util.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @program: site
 * @description: ${description}
 * @author: HuangYong
 * @create: 2018-09-19 21:52
 **/
@Controller
@RequestMapping(value = "/carTeam")
public class CarTeamController {
    @Autowired
    private CarTeamService carTeamService;

    /***
     *获取车队列表
     */
    @RequestMapping(value = "getCarTeams",method = RequestMethod.GET)
    public String getCarTeams(CarTeam carTeam, Model model, Integer page, HttpServletRequest request){
        Map<String,Object> parameters=new HashMap<String,Object>();
        if (null!=carTeam){
            if (null!=carTeam.getPersonLiable()&&StringUtils.isNotBlank(carTeam.getPersonLiable())){
                parameters.put("personLiable",carTeam.getPersonLiable());
            }
            if (null!=carTeam.getCarTeamName()&&StringUtils.isNotBlank(carTeam.getCarTeamName())){
                parameters.put("carTeamName",carTeam.getCarTeamName());
            }
        }
        parameters.put("isValid",carTeam.getIsValid());
        Integer count = carTeamService.queryCarTeamCountByParam(parameters);
        int pageNum = page == null ? 1 : page;
        Page pageParam = Page.page(count, 10, pageNum);
        pageParam.buildUrl(request);
        parameters.put("_start", pageParam.getStartRows());
        parameters.put("_end", pageParam.getEndRows());
        List<CarTeam> carTeams = carTeamService.queryCarTeamsByParam(parameters);
        pageParam.setItems(carTeams);
        String basePath = HttpUtils.getBasePath(request);
        model.addAttribute("page",pageNum);
        model.addAttribute("pageParam", pageParam);
        model.addAttribute("basePath",basePath);
        model.addAttribute("carTeams",carTeams);
        return "/pages/site/carTeam/getCarTeams";
    }
}
