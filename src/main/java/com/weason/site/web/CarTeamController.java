package com.weason.site.web;

import com.weason.site.pojo.CarTeam;
import com.weason.site.service.CarTeamService;
import com.weason.util.HttpUtils;
import com.weason.util.Page;
import com.weason.util.ResultMessage;
import com.weason.util.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

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

    /***
     * 获取单个车队信息
     * @param id
     * @param model
     * @return
     */
    @RequestMapping(value = "/getCarTeam",method = RequestMethod.GET)
    public String getCarTeam(Long id,Model model){
        CarTeam carTeam = carTeamService.queryCarTeamById(id);
        model.addAttribute("carTeam",carTeam);
        return "/pages/site/carTeam/getCarTeam";
    }

    /***
     * 添加车队信息
     * @param carTeam
     * @return
     */
    @RequestMapping(value = "/addCarTeam",method = RequestMethod.POST)
    @ResponseBody
    public ResultMessage addCarTeam(CarTeam carTeam){
        ResultMessage resultMessage = ResultMessage.createResultMessage();
        Map<String,Object> map=new HashMap<String,Object>();
        if (null==carTeam){
            resultMessage.setMessage("添加得车队信息不能为空");
            return resultMessage;
        }
        if(null == carTeam.getCarTeamName()){
            resultMessage.setMessage("添加得车队名称不能为空");
            return resultMessage;
        }
        if (null == carTeam.getPersonLiable()){
            resultMessage.setMessage("添加得车队负责人不能为空");
            return resultMessage;
        }
        if (null == carTeam.getContactWay()){
            resultMessage.setMessage("添加得联系方式不能为空");
            return resultMessage;
        }
        map.put("carTeamName",carTeam.getCarTeamName());
        List<CarTeam> carTeams = carTeamService.queryCarTeamsByParam(map);
        if (carTeams.size()>0){
            resultMessage.setMessage("需要添加得车队名称已存在");
            return resultMessage;
        }
        carTeamService.AddCarTeam(carTeam);
        return resultMessage;
    }

    /***
     * 修改车队
     * @param carTeam
     * @param model
     * @return
     */
    @RequestMapping(value = "/updateCarTeam",method = RequestMethod.PUT)
    public String updateCarTeam(CarTeam carTeam,Model model){
        Long id = carTeam.getId();
        CarTeam carTeam1 = carTeamService.queryCarTeamById(id);
        if (null == carTeam1){
            model.addAttribute(ResultMessage.ERROR,"车队信息不存在");
            return null;
        }
        if (carTeam1.getCarTeamName().equals(carTeam.getCarTeamName())){
            carTeam.setCarTeamName(null);
        }else {
            Map map = new HashMap();
            map.put("carTeamName",carTeam.getCarTeamName());
            List list = carTeamService.queryCarTeamsByParam(map);
            if (list.size()>0){
                model.addAttribute(ResultMessage.ERROR,"车队信息不存在");
                return null;
            }
        }
        carTeamService.updateCarTeam(carTeam);
        return "/pages/site/carTeam/getCarTeams";
    }
}


