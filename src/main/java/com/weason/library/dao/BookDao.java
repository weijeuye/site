package com.weason.library.dao;

import com.weason.library.po.Book;
import com.weason.util.mybaties.MyBatisDao;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

/**
 * @Author weilei
 * @date 2018/7/12 16:35
 */
@Repository
public class BookDao extends MyBatisDao{
    public  BookDao(){
        super("book_book");
    }
    public List<Book> findBooksByParam(Map<String, Object> param) {
        return super.queryForList("queryBooksByParam",param);
    }
    public Integer queryBooksCount(Map<String, Object> param) {
        return super.get("queryBooksCount",param);
    }
    public Book queryBookByParam(Map<String, Object> param) {
        return super.get("queryBookByParam",param);
    }

    public Integer addBook(Book book) {
        return super.insert("addBook",book);
    }

    public Integer updateBookById(Map<String, Object> param) {
        return super.update("updateBookById",param);
    }

    public Integer deleteBookById(Long bookId) {
        return super.delete("deleteBookById",bookId);
    }
}
