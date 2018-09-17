package com.weason.library.vo;

import com.weason.library.po.BookUser;

import java.io.Serializable;

/**
 * @Author weilei
 * @date 2018/8/23 13:54
 */

public class UpdatePasswordVo  implements Serializable {
    private static final long serialVersionUID = -3135267005801082557L;


    private BookUser bookUser;
    private String oldPassword;
    private String newPassword;


    public BookUser getBookUser() {
        return bookUser;
    }

    public void setBookUser(BookUser bookUser) {
        this.bookUser = bookUser;
    }

    public String getOldPassword() {
        return oldPassword;
    }

    public void setOldPassword(String oldPassword) {
        this.oldPassword = oldPassword;
    }

    public String getNewPassword() {
        return newPassword;
    }

    public void setNewPassword(String newPassword) {
        this.newPassword = newPassword;
    }
}
