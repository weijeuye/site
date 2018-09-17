package com.weason.library.vo;

import java.io.Serializable;
import java.util.Date;

/**
* Created by weason on 2018-07-18
*@Description book_borrow vo类
*/ 


public class BookBorrowVo implements Serializable{
	private long borrowId;
	private long userId;
	private long bookId;
	private Date borrowTime;
	private Date returnTime;
	private Date actReturnTime;
	private String isReturn;
	private long operatorId;

	private String userName;
	private String bookName;
	private String isbn;
	private String userAccount;

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public String getBookName() {
		return bookName;
	}

	public void setBookName(String bookName) {
		this.bookName = bookName;
	}

	public Date getReturnTime() {
		return returnTime;
	}

	public void setReturnTime(Date returnTime) {
		this.returnTime = returnTime;
	}

	public String getIsbn() {
		return isbn;
	}

	public void setIsbn(String isbn) {
		this.isbn = isbn;
	}

	public String getUserAccount() {
		return userAccount;
	}

	public void setUserAccount(String userAccount) {
		this.userAccount = userAccount;
	}

	public void setBorrowId(long borrowId){
	this.borrowId=borrowId;
	}
	public long getBorrowId(){
		return borrowId;
	}
	public void setUserId(long userId){
	this.userId=userId;
	}
	public long getUserId(){
		return userId;
	}
	public void setBookId(long bookId){
	this.bookId=bookId;
	}
	public long getBookId(){
		return bookId;
	}
	public void setBorrowTime(Date borrowTime){
	this.borrowTime=borrowTime;
	}
	public Date getBorrowTime(){
		return borrowTime;
	}
	public void setReturnIme(Date returnIme){
	this.returnTime=returnIme;
	}
	public Date getReturnIme(){
		return returnTime;
	}
	public void setActReturnTime(Date actReturnTime){
	this.actReturnTime=actReturnTime;
	}
	public Date getActReturnTime(){
		return actReturnTime;
	}
	public void setIsReturn(String isReturn){
	this.isReturn=isReturn;
	}
	public String getIsReturn(){
		return isReturn;
	}
	public void setOperatorId(long operatorId){
	this.operatorId=operatorId;
	}
	public long getOperatorId(){
		return operatorId;
	}
}

