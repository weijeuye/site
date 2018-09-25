package com.weason.site.web;

import com.weason.site.pojo.CarTeam;
import com.weason.site.pojo.OutboundOrder;
import com.weason.site.pojo.User;
import com.weason.site.service.OutboundOrderService;
import com.weason.site.service.UserService;
import com.weason.site.vo.UserVo;
import com.weason.util.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @Author weilei
 * @date 2018-09-25 16:33
 */

@Controller
@RequestMapping(value = "/siteOrder")
public class OutboundOrderController {
    private static final Logger logger = LoggerFactory.getLogger(OutboundOrderController.class);
    @Autowired
    private UserService userService;

    @Autowired
    private OutboundOrderService outboundOrderService;

    /***
     * 获取当前用户的出库单
     * @return
     */
    @RequestMapping(value = "/findOrders",method = RequestMethod.GET)
    public String queryUsers(OutboundOrder queryParam, Model model, HttpServletRequest request, Integer page){
        Map<String,Object> parameters=new HashMap<String,Object>();
        model.addAttribute("queryParam",queryParam);
        if (null != queryParam){
            if (null !=queryParam.getCarTeamId()&& !StringUtils.isBlank(queryParam.getCarTeamId())){
                parameters.put("carTeamId",queryParam.getCarTeamId());
            }
            if (null !=queryParam.getCreateTime()&& !StringUtils.isBlank(queryParam.getCreateTime())){
                parameters.put("createTime",queryParam.getCreateTime());
            }
        }
        parameters.put("dropPointId",queryParam.getDropPointId());
        int count = userService.queryUsersCount(parameters);

        int pagenum = page == null ? 1 : page;
        Page pageParam = Page.page(count, 10, pagenum);
        pageParam.buildUrl(request);
        parameters.put("_start", pageParam.getStartRows());
        parameters.put("_end", pageParam.getEndRows());
        List<User> users = userService.queryUsers(parameters);
        pageParam.setItems(users);
        String basePath = HttpUtils.getBasePath(request);
        model.addAttribute("page",pagenum);
        model.addAttribute("pageParam", pageParam);
        model.addAttribute("basePath",basePath);
        model.addAttribute("outboundOrders",users);
        return "/pages/site/siteOutboundOrder/findOutBoundOrderList";
    }

    /***
     * 弹出录入单据弹框
     * @param request
     * @return
     */
    @RequestMapping(value = "/showAddOrder")
    public String showAddUser(HttpServletRequest request,Model model){
        String basePath=HttpUtils.getBasePath(request);
        model.addAttribute("basePath",basePath);
        User user=(User) request.getSession().getAttribute("site_user");
        model.addAttribute("user",user);
        return "/pages/site/siteOutboundOrder/showAddOutBoundOrder";
    }

    /***
     * 添加出库单据
     * @param outboundOrder
     * @return
     */
    @RequestMapping(value = "/addOrder",method = RequestMethod.POST)
    @ResponseBody
    public ResultMessage addOrder(OutboundOrder outboundOrder,HttpServletRequest request){
        ResultMessage resultMessage = ResultMessage.createResultMessage();
        Map<String,Object> map=new HashMap<String,Object>();
        if (null==outboundOrder){
            resultMessage.setMessage("添加得出库信息不能为空");
            return resultMessage;
        }
        if(null == outboundOrder.getPlateNumber()){
            resultMessage.setMessage("添加的车牌号不能为空");
            return resultMessage;
        }
        if (null == outboundOrder.getUserId()){
            resultMessage.setMessage("添加得车队负责人不能为空");
            return resultMessage;
        }
        if (null == outboundOrder.getDropPointId()){
            resultMessage.setMessage("投放点不能为空");
            return resultMessage;
        }
        User user=(User) request.getSession().getAttribute("site_user");
        if(user ==null){
            resultMessage.setMessage("参数异常,请退出系统重新登录！");
            return resultMessage;
        }
        //填充制单人和工地信息
        outboundOrder.setUserId(user.getId());
        outboundOrder.setSiteId(user.getSiteId());

        int count =outboundOrderService.addOutboundOrder(outboundOrder);
        if(count == 0){
            return ResultMessage.ADD_FAIL_RESULT;
        }
        return resultMessage;
    }


}
