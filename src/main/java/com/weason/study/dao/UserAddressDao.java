package com.weason.study.dao;

import com.weason.study.po.UserAddress;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;
@Repository
public interface UserAddressDao {
    public UserAddress findUserAddressById(Map param);
    public List<UserAddress> findAllUserAddress(Map param);
    public int  insertUserAddress(UserAddress userAddress);
    public int updateUserAddress(UserAddress userAddress);

}
