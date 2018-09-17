package com.weason.library.service.impl;

import com.weason.library.dao.BookBorrowDao;
import com.weason.library.po.BookBorrow;
import com.weason.library.service.BookBorrowService;
import com.weason.library.vo.BookBorrowVo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Map;

/**
 * @Author weilei
 * @date 2018/7/18 17:31
 */
@Component
public class BookBorrowServiceImpl implements BookBorrowService {
    @Autowired
    private BookBorrowDao bookBorrowDao;
   @Override
    public Integer addBookBorrow(BookBorrow bookBorrow) {
        return bookBorrowDao.addBookBorrow(bookBorrow);
    }

    @Override
    public Integer updateBookBorrow(Map<String, Object> param) {
        return bookBorrowDao.updateBookBorrow(param);
    }

    @Override
    public List<BookBorrowVo> findBookBorrowListByParam(Map<String, Object> param) {
        return bookBorrowDao.findBookBorrowListByParam(param);
    }

    @Override
    public Integer findBookBorrowCountByParam(Map<String, Object> param) {
        return bookBorrowDao.findBookBorrowCountByParam(param);
    }

    @Override
    public BookBorrow findBookBorrowParam(Map<String, Object> param) {
        return bookBorrowDao.findBookBorrowParam(param);
    }
}
