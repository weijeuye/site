package com.weason.util;

import java.io.Serializable;
import java.util.HashMap;
import java.util.Map;

public class ResultMessage implements Serializable {

	/**
	 * 序列
	 */
	private static final long serialVersionUID = -7563387945976477789L;

	public static final String SUCCESS = "success";

	public static final String ERROR = "error";
	
	public static final String SYS_ERROR = "sysError";

	public static final ResultMessage ADD_SUCCESS_RESULT = new ResultMessage(SUCCESS, "新增成功");
	public static final ResultMessage ADD_FAIL_RESULT = new ResultMessage(ERROR, "新增失败");
	

	public static final ResultMessage UPDATE_SUCCESS_RESULT = new ResultMessage(SUCCESS, "修改成功");
	public static final ResultMessage UPDATE_FAIL_RESULT = new ResultMessage(ERROR, "修改失败");

	public static final ResultMessage DELETE_SUCCESS_RESULT = new ResultMessage(SUCCESS, "删除成功");
	public static final ResultMessage DELETE_FAIL_RESULT = new ResultMessage(ERROR, "删除失败");

	public static final ResultMessage PARAM_EXCEPTION_RESULT = new ResultMessage(ERROR, "参数异常");
	public static final ResultMessage BORROW_EXCEPTION_RESULT = new ResultMessage(ERROR, "该学员已经借过本书且未归还，请仔细核对！");
	public static final ResultMessage OLDPASSWORD_ISNOT_RIGHT = new ResultMessage(ERROR, "输入的原始密码错误，请仔细核对！");
	public static final ResultMessage UPDATE_PASSWORD_SUCCESS = new ResultMessage(SUCCESS, "密码修改成功！");
	public static final ResultMessage LOGIN_TIMEOUT = new ResultMessage(ERROR, "登录信息过时，刷新页面重新登录！");
	

	private String code;

	private String message;

	private Map<String, Object> attributes;

	public ResultMessage(String code, String message) {
		this.code = code;
		this.message = message;
	}

	public ResultMessage(Map<String, Object> attributes, String code, String message) {
		this.code = code;
		this.message = message;
		this.attributes = attributes;
	}

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public boolean isSuccess() {
		return SUCCESS.equalsIgnoreCase(code);
	}

	@Override
	public String toString() {
		return "ResultMessage [code=" + code + ", message=" + message + "]";
	}

	public Map<String, Object> getAttributes() {
		return attributes;
	}

	public void setAttributes(Map<String, Object> attributes) {
		this.attributes = attributes;
	}

	public void addObject(String key, Object value) {
		if (attributes == null) {
			attributes = new HashMap<String, Object>();
		}
		attributes.put(key, value);
	}

	/**
	 * 调用当前方法把状态改为异常
	 * 
	 * @param msg
	 */
	public void raise(String msg) {
		code = ERROR;
		message = msg;
	}

	public void raise(ResultHandle handle) {
		if (handle.isFail()) {
			raise(handle.getMsg());
		}
	}
	
	public static ResultMessage createResultMessage(){
		ResultMessage msg = new ResultMessage(SUCCESS, "操作成功");
		return msg;
	}
}
