
package com.weason.util;

import java.io.Serializable;
import java.util.Date;

/**
 * 交集日期范围
 *
 */
public class IntersectionDate implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = -2385670473420025323L;

	// 交集日期开始
	private Date startDate;

	// 交集日期结束
	private Date endDate;

	public Date getStartDate() {
		return startDate;
	}

	public void setStartDate(Date startDate) {
		this.startDate = startDate;
	}

	public Date getEndDate() {
		return endDate;
	}

	public void setEndDate(Date endDate) {
		this.endDate = endDate;
	}
}
