package com.weason.site.pojo;

import java.io.Serializable;
import java.util.Date;

public class Car implements Serializable {

    private static final long serialVersionUID = -3582420953917379031L;

    private Long id;
    /**
     * 状态
     */
    private Integer status;

    private Date createTime;

    private Date updateTime;
    /**
     * 车牌号
     */
    private String plateNumber;
    /**
     * 车辆方数
     */
    private Double vehicle;

    /**
     * 司机
     */
    private String driver;

    /**
     * 所属车队ID
     */
    private Long carTeamId;
    /**
     * 是否加高
     */
    private String isHeighten;

    /**
     * 加高数量
     */
    private Double heightenNumber;
    /**
     * 车辆颜色
     */
    private String carColor;

    /**
     * 是否有效
     */
    private String isValid;
    /**
     * 备注
     */
    private String memo;

    public String getCarColor() {
        return carColor;
    }

    public void setCarColor(String carColor) {
        this.carColor = carColor;
    }

    public String getIsHeighten() {
        return isHeighten;
    }

    public void setIsHeighten(String isHeighten) {
        this.isHeighten = isHeighten;
    }

    public Double getHeightenNumber() {
        return heightenNumber;
    }

    public void setHeightenNumber(Double heightenNumber) {
        this.heightenNumber = heightenNumber;
    }

    public String getIsValid() {
        return isValid;
    }

    public void setIsValid(String isValid) {
        this.isValid = isValid;
    }

    public String getMemo() {
        return memo;
    }

    public void setMemo(String memo) {
        this.memo = memo;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    public Date getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }

    public Date getUpdateTime() {
        return updateTime;
    }

    public void setUpdateTime(Date updateTime) {
        this.updateTime = updateTime;
    }

    public String getPlateNumber() {
        return plateNumber;
    }

    public void setPlateNumber(String plateNumber) {
        this.plateNumber = plateNumber == null ? null : plateNumber.trim();
    }

    public Double getVehicle() {
        return vehicle;
    }

    public void setVehicle(Double vehicle) {
        this.vehicle = vehicle;
    }

    public String getDriver() {
        return driver;
    }

    public void setDriver(String driver) {
        this.driver = driver == null ? null : driver.trim();
    }

    public Long getCarTeamId() {
        return carTeamId;
    }

    public void setCarTeamId(Long carTeamId) {
        this.carTeamId = carTeamId;
    }

    @Override
    public boolean equals(Object that) {
        if (this == that) {
            return true;
        }
        if (that == null) {
            return false;
        }
        if (getClass() != that.getClass()) {
            return false;
        }
        Car other = (Car) that;
        return (this.getId() == null ? other.getId() == null : this.getId().equals(other.getId()))
            && (this.getStatus() == null ? other.getStatus() == null : this.getStatus().equals(other.getStatus()))
            && (this.getCreateTime() == null ? other.getCreateTime() == null : this.getCreateTime().equals(other.getCreateTime()))
            && (this.getUpdateTime() == null ? other.getUpdateTime() == null : this.getUpdateTime().equals(other.getUpdateTime()))
            && (this.getPlateNumber() == null ? other.getPlateNumber() == null : this.getPlateNumber().equals(other.getPlateNumber()))
            && (this.getVehicle() == null ? other.getVehicle() == null : this.getVehicle().equals(other.getVehicle()))
            && (this.getDriver() == null ? other.getDriver() == null : this.getDriver().equals(other.getDriver()))
            && (this.getCarTeamId() == null ? other.getCarTeamId() == null : this.getCarTeamId().equals(other.getCarTeamId()));
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((getId() == null) ? 0 : getId().hashCode());
        result = prime * result + ((getStatus() == null) ? 0 : getStatus().hashCode());
        result = prime * result + ((getCreateTime() == null) ? 0 : getCreateTime().hashCode());
        result = prime * result + ((getUpdateTime() == null) ? 0 : getUpdateTime().hashCode());
        result = prime * result + ((getPlateNumber() == null) ? 0 : getPlateNumber().hashCode());
        result = prime * result + ((getVehicle() == null) ? 0 : getVehicle().hashCode());
        result = prime * result + ((getDriver() == null) ? 0 : getDriver().hashCode());
        result = prime * result + ((getCarTeamId() == null) ? 0 : getCarTeamId().hashCode());
        return result;
    }

    @Override
    public String toString() {
        StringBuilder sb = new StringBuilder();
        sb.append(getClass().getSimpleName());
        sb.append(" [");
        sb.append("Hash = ").append(hashCode());
        sb.append(", id=").append(id);
        sb.append(", status=").append(status);
        sb.append(", createTime=").append(createTime);
        sb.append(", updateTime=").append(updateTime);
        sb.append(", plateNumber=").append(plateNumber);
        sb.append(", vehicle=").append(vehicle);
        sb.append(", driver=").append(driver);
        sb.append(", carTeamId=").append(carTeamId);
        sb.append(", serialVersionUID=").append(serialVersionUID);
        sb.append("]");
        return sb.toString();
    }
}