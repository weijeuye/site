package com.weason.site.web;

import com.weason.constant.SystemConstant;
import com.weason.site.pojo.Car;
import com.weason.site.pojo.CarTeam;
import com.weason.site.pojo.Site;
import com.weason.site.pojo.User;
import com.weason.site.service.CarService;
import com.weason.util.HttpUtils;
import com.weason.util.Page;
import com.weason.util.ResultMessage;
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
 * @Author weilei
 * @date 2018-09-20 16:33
 */
@Controller
@RequestMapping(value = "/siteCar")
public class CarController {
    @Autowired
    private CarService carService;

    @RequestMapping(value = "/findCarList",method = RequestMethod.GET)
    public String querySites(Car queryParam, HttpServletRequest request, Model model, Integer page){
        Map<String,Object> parameters=new HashMap<String,Object>();
        model.addAttribute("queryParam",queryParam);
        parameters.put("plateNumber",queryParam.getPlateNumber());
        parameters.put("isHeighten",queryParam.getIsHeighten());
        parameters.put("carColor",queryParam.getCarColor());
        parameters.put("driver",queryParam.getDriver());
        User user=(User) request.getSession().getAttribute(SystemConstant.SITE_USER_SESSION);
        parameters.put("siteId",user.getSiteId());
        int count = carService.queryCarTeamCountByParam(parameters);

        int pagenum = page == null ? 1 : page;
        Page pageParam = Page.page(count, 10, pagenum);
        pageParam.buildUrl(request);
        parameters.put("_start", pageParam.getStartRows());
        parameters.put("_end", pageParam.getEndRows());
        List<Car> cars = carService.queryCarTeamsByParam(parameters);
        pageParam.setItems(cars);
        String basePath = HttpUtils.getBasePath(request);
        model.addAttribute("page",pagenum);
        model.addAttribute("pageParam", pageParam);
        model.addAttribute("basePath",basePath);
        model.addAttribute("cars",cars);
        return "/pages/site/siteCar/findCarList";

    }
    /***
     * 获取单个车辆信息
     * @param id
     * @return
     */
    @RequestMapping(value = "/getSingle",method = RequestMethod.GET)
    @ResponseBody
    public Object querySite(Long id, Model model, HttpServletRequest request){
        ResultMessage resultMessage=ResultMessage.createResultMessage();
        if(id==null){
            return ResultMessage.PARAM_EXCEPTION_RESULT;
        }
        Car car=carService.queryCarById(id);
        resultMessage.addObject("car",car);
        return resultMessage;
    }


    @RequestMapping(value = "/showAddCar")
    public String showAddsite(HttpServletRequest request,Model model,Car car){
        String basePath=HttpUtils.getBasePath(request);
        model.addAttribute("basePath",basePath);
        model.addAttribute("car",car);
        return "/pages/site/siteCar/showAddCar";
    }
    @RequestMapping(value = "/showUpdateCar")
    public String showUpdateSitePlace(HttpServletRequest request,Model model,Long id){
        if(id==null){
            model.addAttribute("error","参数异常，不能修改");
            return "/pages/site/siteCar/showAddCar";
        }
        String basePath=HttpUtils.getBasePath(request);
        Car car =carService.queryCarById(id);
        model.addAttribute("basePath",basePath);
        model.addAttribute("car",car);
        return "/pages/site/siteCar/showAddCar";
    }
    /***
     * 保存车辆信息
     * @param car
     * @return
     */
    @RequestMapping(value = "/saveCar",method = RequestMethod.POST)
    @ResponseBody
    public ResultMessage addSite( Car car,HttpServletRequest request){
        int count=0;
        if(car!=null && car.getId()!=null){
            count=carService.updateCar(car);
            if(count > 0){
                return ResultMessage.UPDATE_SUCCESS_RESULT;
            }
            return ResultMessage.UPDATE_FAIL_RESULT;
        }else {
            car.setIsValid("Y");
            User user=(User) request.getSession().getAttribute(SystemConstant.SITE_USER_SESSION);
            car.setSiteId(user.getSiteId());
            count =carService.AddCar(car);
            if(count > 0){
                return ResultMessage.ADD_SUCCESS_RESULT;
            }
            return ResultMessage.ADD_FAIL_RESULT;
        }
    }

    /***
     * 修改车辆信息
     * @param car
     * @return
     */
    @RequestMapping(value = "/update",method = RequestMethod.PUT)
    @ResponseBody
    public ResultMessage updateSite(@RequestBody Car car){
        ResultMessage resultMessage=ResultMessage.createResultMessage();
        int count =carService.updateCar(car);
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
        Car car=new Car();
        car.setId(id);
        car.setIsValid(isValid);
        int count =carService.updateCar(car);
        if( count > 0){
            return ResultMessage.UPDATE_SUCCESS_RESULT;
        }else {
            return ResultMessage.UPDATE_FAIL_RESULT;
        }
    }
    /***
     * 删除车辆
     * @param id
     * @return
     */
    @RequestMapping(value = "/delete/{id}",method = RequestMethod.PUT)
    @ResponseBody
    public ResultMessage deleteSite(@PathVariable Long id){
        ResultMessage resultMessage=ResultMessage.createResultMessage();
        Car car=new Car();
        car.setId(id);
        int count= carService.updateCar(car);
        if(count > 0){
            return resultMessage;
        }
        resultMessage.addObject("error","删除失败！");
        return resultMessage;
    }

    /**
     * 根据车车牌号模糊查询列表数据
     * @param search
     * @param request
     */
    @RequestMapping(value = "/searchCarList")
    @ResponseBody
    public Object searchCarList(String search, HttpServletRequest request){
        JSONArray array = null;
        Map<String, Object> param=new HashMap<String, Object>();
        if(search!=null){
            param.put("plateNumber",search);
            param.put("isValid","Y");
        }
        User user=(User) request.getSession().getAttribute(SystemConstant.SITE_USER_SESSION);
        if(user!=null && !"S".equals(user.getUserType())){
            param.put("siteId",user.getSiteId());
        }
        try {
            List<Car> list = carService.queryCarTeamsByParam(param);
            array = new JSONArray();
            if(list != null && list.size() > 0){
                for(Car car:list){
                    JSONObject obj=new JSONObject();
                    obj.put("id", car.getId());
                    obj.put("text", car.getPlateNumber());
                    array.add(obj);
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return array;
    }
}
