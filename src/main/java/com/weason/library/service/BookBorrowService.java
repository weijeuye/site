package com.weason.library.service;

import com.weason.library.po.BookBorrow;
import com.weason.library.vo.BookBorrowVo;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Map;

/**
 * @Author weilei
 * @date 2018/7/18 17:24
 */
public interface BookBorrowService {
    public  Integer addBookBorrow(BookBorrow bookBorrow);
    public  Integer updateBookBorrow(Map<String,Object> param);
    public List<BookBorrowVo> findBookBorrowListByParam(Map<String,Object> param);
    public  Integer findBookBorrowCountByParam(Map<String,Object> param);
    public BookBorrow findBookBorrowParam(Map<String,Object> param);
}
