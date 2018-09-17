package com.weason.library.service;

import com.weason.library.po.Book;

import java.util.List;
import java.util.Map;

/**
 * @Author weilei
 * @date 2018/6/21 18:16
 */

public interface BookService {
    public List<Book> findBooksByParam(Map<String,Object> param);
    public Integer findBooksCountByParam(Map<String,Object> param);
    public Book findBookByParam(Map<String,Object> param);
    public Integer addBook(Book book);
    public Integer updateBookById(Map<String,Object> param);
    public Integer deleteBookById(Map<String,Object> param);
    public Integer deleteBookById(Long bookId);
}
