package com.weason.site.pojo;

import java.io.Serializable;
import java.util.Date;

public class CarTeam implements Serializable {

    private static final long serialVersionUID = -1902446180158035583L;
    private Long id;

    private Integer status;

    private Date createTime;

    private Date updateTime;

    private String carTeamName;

    private Long contactWay;

    private String personLiable;

    private Long siteId;

    private String isValid;

    private String memo;

    public Long getSiteId() {
        return siteId;
    }

    public void setSiteId(Long siteId) {
        this.siteId = siteId;
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

    public String getCarTeamName() {
        return carTeamName;
    }

    public void setCarTeamName(String carTeamName) {
        this.carTeamName = carTeamName == null ? null : carTeamName.trim();
    }

    public Long getContactWay() {
        return contactWay;
    }

    public void setContactWay(Long contactWay) {
        this.contactWay = contactWay;
    }

    public String getPersonLiable() {
        return personLiable;
    }

    public void setPersonLiable(String personLiable) {
        this.personLiable = personLiable == null ? null : personLiable.trim();
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
        CarTeam other = (CarTeam) that;
        return (this.getId() == null ? other.getId() == null : this.getId().equals(other.getId()))
            && (this.getStatus() == null ? other.getStatus() == null : this.getStatus().equals(other.getStatus()))
            && (this.getCreateTime() == null ? other.getCreateTime() == null : this.getCreateTime().equals(other.getCreateTime()))
            && (this.getUpdateTime() == null ? other.getUpdateTime() == null : this.getUpdateTime().equals(other.getUpdateTime()))
            && (this.getCarTeamName() == null ? other.getCarTeamName() == null : this.getCarTeamName().equals(other.getCarTeamName()))
            && (this.getContactWay() == null ? other.getContactWay() == null : this.getContactWay().equals(other.getContactWay()))
            && (this.getPersonLiable() == null ? other.getPersonLiable() == null : this.getPersonLiable().equals(other.getPersonLiable()));
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((getId() == null) ? 0 : getId().hashCode());
        result = prime * result + ((getStatus() == null) ? 0 : getStatus().hashCode());
        result = prime * result + ((getCreateTime() == null) ? 0 : getCreateTime().hashCode());
        result = prime * result + ((getUpdateTime() == null) ? 0 : getUpdateTime().hashCode());
        result = prime * result + ((getCarTeamName() == null) ? 0 : getCarTeamName().hashCode());
        result = prime * result + ((getContactWay() == null) ? 0 : getContactWay().hashCode());
        result = prime * result + ((getPersonLiable() == null) ? 0 : getPersonLiable().hashCode());
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
        sb.append(", carTeamName=").append(carTeamName);
        sb.append(", contactWay=").append(contactWay);
        sb.append(", personLiable=").append(personLiable);
        sb.append(", serialVersionUID=").append(serialVersionUID);
        sb.append("]");
        return sb.toString();
    }
}