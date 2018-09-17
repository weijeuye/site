function isLogin(str) {
    if (str.substr(0, 20).indexOf('<script') != 0 && str.indexOf('用户登录') > 0) {
        return false;
    }
    return true;
};