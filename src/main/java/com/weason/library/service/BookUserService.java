package com.weason.library.service;

import com.weason.library.po.BookUser;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public interface BookUserService {
    public List<BookUser> queryBookUsers(Map<String,Object> param);
    public Integer findBookUsersCount(Map<String,Object> param);
    public BookUser findBookUser(Map<String,Object> param);
    public Integer addBookUser(BookUser bookUser);
    public Integer updateBookUser(BookUser bookUser);
    public Integer deleteBookUser(Long userId);
    public BookUser findBookUserByPassword(Map<String,Object> param);
}
