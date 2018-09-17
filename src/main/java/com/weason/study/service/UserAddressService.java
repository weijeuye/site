package com.weason.study.service;

import com.weason.study.po.UserAddress;

import java.util.List;
import java.util.Map;

public interface UserAddressService {
    public List<UserAddress> findAllUserAddress(Map param);

    public UserAddress findUserAddress(Map param);

    public  int addUserAddress(UserAddress userAddress);

    public int updateUserAddress(UserAddress userAddress);
}
