package com.weason.library.service.impl;

import com.weason.library.dao.BookTypeDao;
import com.weason.library.po.BookType;
import com.weason.library.service.BookTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Map;

/**
 * @Author weilei
 * @date 2018/7/9 11:19
 */
@Component
public class BookTypeServiceImpl implements BookTypeService {
    @Autowired
    private BookTypeDao bookTypeDao;
    @Override
    public List<BookType> findBookTypeList(Map<String, Object> param) {
        return bookTypeDao.findBookTypeList(param);
    }

    @Override
    public Integer findBookTypeCount(Map<String, Object> param) {
        return bookTypeDao.findBookTypeCount(param);
    }

    @Override
    public Integer updateBookType(BookType bookType) {
        return bookTypeDao.updateBookType(bookType);
    }

    @Override
    public Integer addBookType(BookType bookType) {
        return bookTypeDao.addBookType(bookType);
    }

    @Override
    public Integer deleteBookType(long id) {
        return bookTypeDao.deleteBookType(id);
    }
}
