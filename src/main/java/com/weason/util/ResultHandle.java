package com.weason.util;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.Serializable;

public class ResultHandle implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 4243458760743568419L;
	private static final Logger logger = LoggerFactory.getLogger(ResultHandle.class);
	private boolean success = true;
	private String msg;
	private String errorCode;
	
	//提示信息
	private String infoMsg;

	/**
	 * @return the msg
	 */
	public String getMsg() {
		return msg;
	}

	/**
	 * @param msg
	 *            the msg to set
	 */
	public void setMsg(String msg) {
		this.success = false;
		this.msg = msg;
	}

	public void setErrorCode(String errorCode) {
        this.errorCode = errorCode;
    }
	
	public String getErrorCode() {
        return errorCode;
    }
	
	/**
	 * @return the success
	 */
	public boolean isSuccess() {
		return success;
	}

	public boolean isFail() {
		return !isSuccess();
	}

	public ResultHandle() {
	}

	public ResultHandle(String msg) {
		setMsg(msg);
	}
	
	public void setMsg(Exception ex){
		setMsg(ex.getMessage());
		if(logger.isDebugEnabled()){
			logger.error(ExceptionFormatUtil.getTrace(ex));
		}else if(ex instanceof NullPointerException ||ex instanceof IllegalArgumentException){
			logger.error(ExceptionFormatUtil.getTrace(ex));
		}
	}

	public String getInfoMsg() {
		return infoMsg;
	}

	public void setInfoMsg(String infoMsg) {
		this.infoMsg = infoMsg;
	}
}
