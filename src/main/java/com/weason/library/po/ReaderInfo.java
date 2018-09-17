package com.weason.library.po;

import java.io.Serializable;
import java.util.Date;

public class ReaderInfo implements Serializable{


    private static final long serialVersionUID = 6658924692472380443L;
    private  long readerId;
    private  String name;
    private String sex;
    private Date birthday;
    private String address;
    private Long telcode;

    public long getReaderId() {
        return readerId;
    }

    public void setReaderId(long readerId) {
        this.readerId = readerId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSex() {
        return sex;
    }

    public void setSex(String sex) {
        this.sex = sex;
    }

    public Date getBirthday() {
        return birthday;
    }

    public void setBirthday(Date birthday) {
        this.birthday = birthday;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public Long getTelcode() {
        return telcode;
    }

    public void setTelcode(Long telcode) {
        this.telcode = telcode;
    }

    @Override
    public String toString() {
        return super.toString();
    }
}
