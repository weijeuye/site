package com.weason.library.po;

import java.io.Serializable;
import java.util.Date;

/**
 * Created by weason on 2018-06-21
 *@Description book_type 实体类
 */


public class BookType implements Serializable{
    private Long bookTypeId;
    private Long bookTypeParentId;
    private String bookTypeParentName;
    private String bookTypeName;
    private Long levelCode;
    private Date createDateTime;
    private Date updateDateTime;

    public String getBookTypeParentName() {
        return bookTypeParentName;
    }

    public void setBookTypeParentName(String bookTypeParentName) {
        this.bookTypeParentName = bookTypeParentName;
    }

    public Long getLevelCode() {
        return levelCode;
    }

    public void setLevelCode(Long levelCode) {
        this.levelCode = levelCode;
    }

    public void setBookTypeId(Long bookTypeId){
        this.bookTypeId=bookTypeId;
    }
    public Long getBookTypeId(){
        return bookTypeId;
    }
    public void setBookTypeParentId(Long bookTypeParentId){
        this.bookTypeParentId=bookTypeParentId;
    }
    public Long getBookTypeParentId(){
        return bookTypeParentId;
    }
    public void setBookTypeName(String bookTypeName){
        this.bookTypeName=bookTypeName;
    }
    public String getBookTypeName(){
        return bookTypeName;
    }
    public void setCreateDateTime(Date createDateTime){
        this.createDateTime=createDateTime;
    }
    public Date getCreateDateTime(){
        return createDateTime;
    }
    public void setUpdateDateTime(Date updateDateTime){
        this.updateDateTime=updateDateTime;
    }
    public Date getUpdateDateTime(){
        return updateDateTime;
    }
}

