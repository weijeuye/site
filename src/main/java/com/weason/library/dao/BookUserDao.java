package com.weason.library.dao;

import com.weason.library.po.BookUser;
import com.weason.util.mybaties.MyBatisDao;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Repository
public class BookUserDao extends MyBatisDao{
    public BookUserDao(){
        super("book_user");
    }

    public List<BookUser> queryBookUsers(Map<String,Object> param){
         return super.queryForListForReport("queryBookUsers",param);
    }
   public BookUser findBookUserByPassword(Map<String,Object> param){
        return super.get("findBookUserByPassword",param);
   }
    public Integer findBookUsersCount(Map<String,Object> param){
       return super.get("findBookUsersCount",param);
    }
    public Integer addBookUser(BookUser bookUser){
        return super.insert("addBookUser",bookUser);
    }
    public Integer updateBookUserById(BookUser bookUser){
        return super.update("updateBookUserById",bookUser);
    }
    public Integer deleteBookUserById(Long userId){
        return super.delete("addBookUser",userId);
    }
}
