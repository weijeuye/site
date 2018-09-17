package com.weason.library.po;

import java.io.Serializable;
import java.util.Date;

public class BookUser implements Serializable {


    private static final long serialVersionUID = 3128326781722935074L;

    private long userId;
    private String userAccount;
    private String userName;
    private String gender;
    private String telephone;
    private String address;
    private String birthday;
    private Long recommendUserId;
    private Date recommendDateTime;
    private Date createTime;
    private String userPassword;
    private String email;
    private Date updateTime;
    private Date loginTime;
    private String qqAccount;
    private String webchatAccount;
    private String memo;
    private String userType;
    private String idNumber;
    private Integer point;
    private String isValid;
    private String motherName;
    private String fatherName;
    private String school;
    private String className;
    private String motherTelephone;
    private String fatherTelephone;
    //借阅次数
    public Integer borrowNum;

    public Integer getBorrowNum() {
        return borrowNum;
    }

    public void setBorrowNum(Integer borrowNum) {
        this.borrowNum = borrowNum;
    }

    public String getMotherName() {
        return motherName;
    }

    public void setMotherName(String motherName) {
        this.motherName = motherName;
    }

    public String getFatherName() {
        return fatherName;
    }

    public void setFatherName(String fatherName) {
        this.fatherName = fatherName;
    }

    public String getSchool() {
        return school;
    }

    public void setSchool(String school) {
        this.school = school;
    }

    public String getClassName() {
        return className;
    }

    public void setClassName(String className) {
        this.className = className;
    }

    public String getMotherTelephone() {
        return motherTelephone;
    }

    public void setMotherTelephone(String motherTelephone) {
        this.motherTelephone = motherTelephone;
    }

    public String getFatherTelephone() {
        return fatherTelephone;
    }

    public void setFatherTelephone(String fatherTelephone) {
        this.fatherTelephone = fatherTelephone;
    }

    public long getUserId() {
        return userId;
    }

    public void setUserId(long userId) {
        this.userId = userId;
    }

    public String getUserAccount() {
        return userAccount;
    }

    public void setUserAccount(String userAccount) {
        this.userAccount = userAccount;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public String getTelephone() {
        return telephone;
    }

    public void setTelephone(String telephone) {
        this.telephone = telephone;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getBirthday() {
        return birthday;
    }

    public void setBirthday(String birthday) {
        this.birthday = birthday;
    }

    public Long getRecommendUserId() {
        return recommendUserId;
    }

    public void setRecommendUserId(Long recommendUserId) {
        this.recommendUserId = recommendUserId;
    }

    public Date getRecommendDateTime() {
        return recommendDateTime;
    }

    public void setRecommendDateTime(Date recommendDateTime) {
        this.recommendDateTime = recommendDateTime;
    }

    public Date getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }

    public String getUserPassword() {
        return userPassword;
    }

    public void setUserPassword(String userPassword) {
        this.userPassword = userPassword;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Date getUpdateTime() {
        return updateTime;
    }

    public void setUpdateTime(Date updateTime) {
        this.updateTime = updateTime;
    }

    public Date getLoginTime() {
        return loginTime;
    }

    public void setLoginTime(Date loginTime) {
        this.loginTime = loginTime;
    }

    public String getQqAccount() {
        return qqAccount;
    }

    public void setQqAccount(String qqAccount) {
        this.qqAccount = qqAccount;
    }

    public String getWebchatAccount() {
        return webchatAccount;
    }

    public void setWebchatAccount(String webchatAccount) {
        this.webchatAccount = webchatAccount;
    }

    public String getMemo() {
        return memo;
    }

    public void setMemo(String memo) {
        this.memo = memo;
    }

    public String getUserType() {
        return userType;
    }

    public void setUserType(String userType) {
        this.userType = userType;
    }

    public String getIdNumber() {
        return idNumber;
    }

    public void setIdNumber(String idNumber) {
        this.idNumber = idNumber;
    }

    public Integer getPoint() {
        return point;
    }

    public void setPoint(Integer point) {
        this.point = point;
    }

    public String getIsValid() {
        return isValid;
    }

    public void setIsValid(String isValid) {
        this.isValid = isValid;
    }
}
