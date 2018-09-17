package com.weason.library.po;

/**
 * @Author weilei
 * @date 2018/6/21 15:30
 */

import java.io.Serializable;
import java.util.Date;

public class Book implements Serializable {
    private long bookId;
    private String bookName;
    private long bookTypeId;
    private String bookTypeName;
    private String bookAuthor;
    private String bookPub;
    private Date bookPubTime;
    private Integer bookNum;
    private Integer bookLeftNum;
    private String bookState;
    private String bookLanguage;
    private String bookIntroduction;
    private Double bookPrice;
    private String isbn;
    private String bookImg;
    private String isValid;
    private Date createDateTime;
    private Date updateDateTime;

    public String getIsValid() {
        return isValid;
    }

    public void setIsValid(String isValid) {
        this.isValid = isValid;
    }

    public String getBookTypeName() {
        return bookTypeName;
    }

    public void setBookTypeName(String bookTypeName) {
        this.bookTypeName = bookTypeName;
    }

    public void setBookId(long bookId){
        this.bookId=bookId;
    }
    public long getBookId(){
        return bookId;
    }
    public void setBookName(String bookName){
        this.bookName=bookName;
    }
    public String getBookName(){
        return bookName;
    }
    public void setBookTypeId(long bookTypeId){
        this.bookTypeId=bookTypeId;
    }
    public long getBookTypeId(){
        return bookTypeId;
    }
    public void setBookAuthor(String bookAuthor){
        this.bookAuthor=bookAuthor;
    }
    public String getBookAuthor(){
        return bookAuthor;
    }
    public void setBookPub(String bookPub){
        this.bookPub=bookPub;
    }
    public String getBookPub(){
        return bookPub;
    }
    public void setBookPubTime(Date bookPubTime){
        this.bookPubTime=bookPubTime;
    }
    public Date getBookPubTime(){
        return bookPubTime;
    }
    public void setBookNum(Integer bookNum){
        this.bookNum=bookNum;
    }
    public Integer getBookNum(){
        return bookNum;
    }
    public void setBookLeftNum(Integer bookLeftNum){
        this.bookLeftNum=bookLeftNum;
    }
    public Integer getBookLeftNum(){
        return bookLeftNum;
    }
    public void setBookState(String bookState){
        this.bookState=bookState;
    }
    public String getBookState(){
        return bookState;
    }
    public void setBookLanguage(String bookLanguage){
        this.bookLanguage=bookLanguage;
    }
    public String getBookLanguage(){
        return bookLanguage;
    }
    public void setBookIntroduction(String bookIntroduction){
        this.bookIntroduction=bookIntroduction;
    }
    public String getBookIntroduction(){
        return bookIntroduction;
    }
    public void setBookPrice(Double bookPrice){
        this.bookPrice=bookPrice;
    }
    public Double getBookPrice(){
        return bookPrice;
    }
    public void setIsbn(String isbn){
        this.isbn=isbn;
    }
    public String getIsbn(){
        return isbn;
    }
    public void setBookImg(String bookImg){
        this.bookImg=bookImg;
    }
    public String getBookImg(){
        return bookImg;
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

