package com.weason.library.po;

import java.io.Serializable;
import java.util.Date;

/**
* Created by weason on 2018-07-18
*@Description book_borrow 实体类
*/ 


public class BookBorrow implements Serializable{
	private long borrowId;
	private long userId;
	private long bookId;
	private Date borrowTime;
	private Date returnTime;
	private Date actReturnTime;
	private String isReturn;
	private Date createDateTime;
	private Date updateDateTime;
	private long operatorId;
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

	public Date getReturnTime() {
		return returnTime;
	}

	public void setReturnTime(Date returnTime) {
		this.returnTime = returnTime;
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
	public void setOperatorId(long operatorId){
	this.operatorId=operatorId;
	}
	public long getOperatorId(){
		return operatorId;
	}
}

