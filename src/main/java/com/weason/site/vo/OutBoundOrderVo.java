package com.weason.site.vo;

import java.io.Serializable;
import java.util.Date;

/**
 * @Author weilei
 * @date 2018-09-28 15:53
 */

public class OutBoundOrderVo implements Serializable{

    private static final long serialVersionUID = 2653831200369183560L;

    private String billNo;
    private Double amount;
    private Date createTime;
    private String memo;
    private Double mileage;
    private String plateNumber;
    private Double price;
    private Double vehicle;
    private String dropPoint;
    private String siteName;
    private String alias;
    private String driver;
    private Long userId;
    private Long dropPointId;
    private Long siteId;
    private Long carTeamId;
    private String carTeam;

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Long getDropPointId() {
        return dropPointId;
    }

    public void setDropPointId(Long dropPointId) {
        this.dropPointId = dropPointId;
    }

    public Long getSiteId() {
        return siteId;
    }

    public void setSiteId(Long siteId) {
        this.siteId = siteId;
    }

    public Long getCarTeamId() {
        return carTeamId;
    }

    public void setCarTeamId(Long carTeamId) {
        this.carTeamId = carTeamId;
    }

    public String getCarTeam() {
        return carTeam;
    }

    public void setCarTeam(String carTeam) {
        this.carTeam = carTeam;
    }

    public String getBillNo() {
        return billNo;
    }

    public String getDriver() {
        return driver;
    }

    public void setDriver(String driver) {
        this.driver = driver;
    }

    public void setBillNo(String billNo) {
        this.billNo = billNo;
    }

    public Double getAmount() {
        return amount;
    }

    public void setAmount(Double amount) {
        this.amount = amount;
    }

    public Date getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }

    public String getMemo() {
        return memo;
    }

    public void setMemo(String memo) {
        this.memo = memo;
    }

    public Double getMileage() {
        return mileage;
    }

    public void setMileage(Double mileage) {
        this.mileage = mileage;
    }

    public String getPlateNumber() {
        return plateNumber;
    }

    public void setPlateNumber(String plateNumber) {
        this.plateNumber = plateNumber;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public Double getVehicle() {
        return vehicle;
    }

    public void setVehicle(Double vehicle) {
        this.vehicle = vehicle;
    }

    public String getDropPoint() {
        return dropPoint;
    }

    public void setDropPoint(String dropPoint) {
        this.dropPoint = dropPoint;
    }

    public String getSiteName() {
        return siteName;
    }

    public void setSiteName(String siteName) {
        this.siteName = siteName;
    }

    public String getAlias() {
        return alias;
    }

    public void setAlias(String alias) {
        this.alias = alias;
    }


}
