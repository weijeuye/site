package com.weason.study.web;

import com.weason.study.po.UserAddress;
import com.weason.study.service.UserAddressService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.HashMap;
import java.util.Map;

@Controller
public class Day1Test{
    @Autowired
    UserAddressService userAddressService;
    @RequestMapping("/dayTest")
    public  Object day01Test(Model model, HttpServletRequest request, HttpServletResponse response){
        System.out.print(request.getRequestURI());
        Map<String,Long> param=new HashMap<String, Long>();
        param.put("addressId",3637l);
        UserAddress userAddress=userAddressService.findUserAddress(param);

        if( userAddress!=null){
            userAddress.setUserName("自测！");
            int count = userAddressService.updateUserAddress(userAddress);
        }
        model.addAttribute("userAddress",userAddress);
       return "/day01Html";
    }
}
