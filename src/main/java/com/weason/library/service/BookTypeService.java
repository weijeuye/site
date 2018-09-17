package com.weason.library.service;

import com.weason.library.po.BookType;

import java.util.List;
import java.util.Map;

/**
 * @Author weilei
 * @date 2018/6/21 18:16
 */

public interface BookTypeService {
    public List<BookType> findBookTypeList(Map<String,Object> param);
    public Integer findBookTypeCount(Map<String,Object> param);
    public Integer updateBookType(BookType bookType);
    public Integer addBookType(BookType bookType);
    public Integer deleteBookType(long id);
}
