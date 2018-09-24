package com.weason.site.vo;

import com.weason.site.pojo.User;

/**
 * @program: site
 * @description: ${description}
 * @author: HuangYong
 * @create: 2018-09-23 13:00
 **/
public class UserVo extends User {
    private String siteName;

    public String getSiteName() {
        return siteName;
    }

    public void setSiteName(String siteName) {
        this.siteName = siteName;
    }
}
