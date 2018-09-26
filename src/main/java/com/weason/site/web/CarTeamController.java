package com.weason.site.web;

import com.weason.site.pojo.Car;
import com.weason.site.pojo.CarTeam;
import com.weason.site.service.CarTeamService;
import com.weason.util.HttpUtils;
import com.weason.util.Page;
import com.weason.util.ResultMessage;
import com.weason.util.StringUtils;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
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
@RequestMapping(value = "/siteCarTeam")
public class CarTeamController {
    @Autowired
    private CarTeamService carTeamService;

    /***
     *获取车队列表
     */
    @RequestMapping(value = "findCarTeamList",method = RequestMethod.GET)
    public String getCarTeams(CarTeam queryParam, Model model, Integer page, HttpServletRequest request){
        Map<String,Object> parameters=new HashMap<String,Object>();
        model.addAttribute("queryParam",queryParam);
        if (null!=queryParam){
            if (null!=queryParam.getPersonLiable()&&StringUtils.isNotBlank(queryParam.getPersonLiable())){
                parameters.put("personLiable",queryParam.getPersonLiable());
            }
            if (null!=queryParam.getCarTeamName()&&StringUtils.isNotBlank(queryParam.getCarTeamName())){
                parameters.put("carTeamName",queryParam.getCarTeamName());
            }
            if (null!=queryParam.getContactWay()&&StringUtils.isNotBlank(queryParam.getContactWay())){
                parameters.put("contactWay",queryParam.getContactWay());
            }
            if (null!=queryParam.getIsValid()&&StringUtils.isNotBlank(queryParam.getIsValid())){
                parameters.put("isValid",queryParam.getIsValid());
            }
        }

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
        return "/pages/site/siteCarTeam/findCarTeamList";
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
        return "/pages/site/siteCarTeam/getCarTeam";
    }

    @RequestMapping(value = "/showAddCarTeam")
    public String showAddCarTeam(HttpServletRequest request,Model model,CarTeam carTeam){
        String basePath=HttpUtils.getBasePath(request);
        model.addAttribute("basePath",basePath);
        model.addAttribute("carTeam",carTeam);
        return "/pages/site/siteCarTeam/showAddCarTeam";
    }
    @RequestMapping(value = "/showUpdateCarTeam")
    public String showUpdateCarTeam(HttpServletRequest request,Model model,Long id){
        if(id==null){
            model.addAttribute("error","参数异常，不能修改");
            return "/pages/site/siteCarTeam/showAddCarTeam";
        }
        String basePath=HttpUtils.getBasePath(request);
        CarTeam carTeam =carTeamService.queryCarTeamById(id);
        model.addAttribute("basePath",basePath);
        model.addAttribute("carTeam",carTeam);
        return "/pages/site/siteCarTeam/showAddCarTeam";
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
        int count = carTeamService.AddCarTeam(carTeam);
        if(count == 0){
            return ResultMessage.ADD_FAIL_RESULT;
        }
        return resultMessage;
    }

    /***
     * 修改车队
     * @param carTeam
     * @return
     */
    @RequestMapping(value = "/updateCarTeam",method = RequestMethod.PUT)
    public ResultMessage updateCarTeam(CarTeam carTeam){
        ResultMessage resultMessage = ResultMessage.createResultMessage();
        Long id = carTeam.getId();
        CarTeam carTeam1 = carTeamService.queryCarTeamById(id);
        if (null == carTeam1){
            resultMessage.setMessage("修改的车队信息不存在");
            return resultMessage;
        }
        if (carTeam1.getCarTeamName().equals(carTeam.getCarTeamName())){
            carTeam.setCarTeamName(null);
        }else {
            Map map = new HashMap();
            map.put("carTeamName",carTeam.getCarTeamName());
            List list = carTeamService.queryCarTeamsByParam(map);
            if (list.size()>0){
                resultMessage.setMessage("修改的车队名称已存在");
            }
        }

        int count = carTeamService.updateCarTeam(carTeam);
        if(count == 0){
            return ResultMessage.UPDATE_FAIL_RESULT;
        }
        return resultMessage;
    }
    /**
     * 修改车队状态
     * @param id
     * @param isValid
     * @return
     */
    @RequestMapping(value = "/updateStatus",method = RequestMethod.POST)
    @ResponseBody
    public Object updateStatus(Long id ,String isValid) {
        if (id == 0 || id == null) {
            return ResultMessage.PARAM_EXCEPTION_RESULT;
        }
        CarTeam carTeam = new CarTeam();
        carTeam.setId(id);
        carTeam.setIsValid(isValid);
        return  carTeamService.updateCarTeamStatus(carTeam);
    }
    /**
     * 根据车队名称模糊查询列表数据
     * @param search
     * @param resp
     */
    @RequestMapping(value = "/searchCarTeamList")
    @ResponseBody
    public Object searchSupplierList(String search, HttpServletResponse resp){
        JSONArray array = null;
        Map<String, Object> param=new HashMap<String, Object>();
        if(search!=null){
            param.put("carTeamName",search);
            param.put("isValid","Y");
        }
        try {
            List<CarTeam> list = carTeamService.queryCarTeamsByParam(param);
            array = new JSONArray();
            if(list != null && list.size() > 0){
                for(CarTeam carTeam:list){
                    JSONObject obj=new JSONObject();
                    obj.put("id", carTeam.getId());
                    obj.put("text", carTeam.getCarTeamName());
                    array.add(obj);
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return array;
    }
}