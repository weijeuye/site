package com.weason.constant;


import com.weason.util.PropertyUtils;

/**
 * 系统常量
 * 
 * @author GunnyZeng
 * 
 */
public class SystemConstant {
	//自定义标签头部
	public static String TAGHEAD = "shamrock";
	//bootstrap文件夹名称
	public static String BOOTSTRAP_PATH = "bootstrap-3.3.7";
	/**
	 * 应用部署路径的KEY
	 */
	public static String SHAMROCK_CMS_ROOT = PropertyUtils.getRoot();

	/**
	 * 上传文件夹
	 */
	public static String UPLOAD_FOLDER = "upload/photo";

	/**
	 * 备份文件夹
	 */
	public static String BACKUP_FOLDER = "/WEB-INF/backup";

	/**
	 * Session中的管理员Key
	 */
	public static final String SESSION_ADMIN = "SESSION_ADMIN";

	/**
	 * 头像URL 180x180
	 */
	public static final String FACE_URL = "http://faceurl.shishuo.com/face";

	/**
	 * 
	 */
	public static final String LANGUAGE = "language";

}
