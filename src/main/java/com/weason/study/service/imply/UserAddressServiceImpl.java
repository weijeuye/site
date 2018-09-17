package com.weason.study.service.imply;


import com.weason.study.dao.UserAddressDao;
import com.weason.study.po.UserAddress;
import com.weason.study.service.UserAddressService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Map;
@Component("userAddressServiceRemote")
public class UserAddressServiceImpl implements UserAddressService {
    @Autowired
    public UserAddressDao userAddressDao;
    @Override
    public List<UserAddress> findAllUserAddress(Map param) {
        List<UserAddress> userAddressList =userAddressDao.findAllUserAddress(param);
        return userAddressList;
    }

    @Override
    public UserAddress findUserAddress(Map param) {

        UserAddress userAddress=userAddressDao.findUserAddressById(param);

        return userAddress;
    }

    @Override
    public int addUserAddress(UserAddress userAddress) {
        int count=userAddressDao.insertUserAddress(userAddress);
        return count;
    }

    @Override
    public int updateUserAddress(UserAddress userAddress) {
        int count=userAddressDao.updateUserAddress(userAddress);
        return count;
    }
}
