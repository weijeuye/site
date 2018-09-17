package com.weason.library.service.impl;

import com.weason.library.dao.BookDao;
import com.weason.library.po.Book;
import com.weason.library.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Map;

/**
 * @Author weilei
 * @date 2018/7/12 16:33
 */
@Component
public class BookServiceImpl implements BookService {
    @Autowired
    private BookDao bookDao;
    @Override
    public List<Book> findBooksByParam(Map<String, Object> param) {
        return bookDao.findBooksByParam(param);
    }

    @Override
    public Integer findBooksCountByParam(Map<String, Object> param) {
        return bookDao.queryBooksCount(param);
    }

    @Override
    public Book findBookByParam(Map<String, Object> param) {
        return bookDao.queryBookByParam(param);
    }

    @Override
    public Integer addBook(Book book) {
        return bookDao.addBook(book);
    }

    @Override
    public Integer updateBookById(Map<String, Object> param) {
        return bookDao.updateBookById(param);
    }

    @Override
    public Integer deleteBookById(Map<String, Object> param) {
        return null;
    }

    @Override
    public Integer deleteBookById(Long bookId) {
        return bookDao.deleteBookById(bookId);
    }
}
