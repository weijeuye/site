package com.weason.library.dao;

import com.weason.library.po.BookType;
import com.weason.util.mybaties.MyBatisDao;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

/**
 * @Author weilei
 * @date 2018/7/9 11:35
 */
@Repository
public class BookTypeDao extends MyBatisDao{
    public  BookTypeDao(){
        super("book_type");
    }
    public List<BookType> findBookTypeList(Map<String,Object> param){
        return super.queryForList("findBookTypeList",param);
    }
    public Integer findBookTypeCount(Map<String,Object> param){
        return super.get("findBookTypeCount",param);
    }
    public Integer updateBookType(BookType bookType){
        return super.update("updateBookType",bookType);
    }
    public Integer addBookType(BookType bookType){
        return super.insert("addBookType",bookType);
    }
    public Integer deleteBookType(Long id){
        return super.delete("deleteBookeTypeById",id);
    }
}

