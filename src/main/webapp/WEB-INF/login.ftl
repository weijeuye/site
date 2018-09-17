
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>成长记图书管理系统</title>
    <link rel="stylesheet" type="text/css" href="${basePath}/css/login/zui.css" media="all">
    <link rel="stylesheet" type="text/css" href="${basePath}/css/login/login.css" media="all">
    <link href="${basePath}/css/login/animate.min.css" rel="stylesheet">
    <link href="${basePath}/css/login/font-awesome.min.css" rel="stylesheet">
    <style> body { background-image: url(${basePath}/css/images/login/4.jpg);}</style>

    <link rel="icon" href="${basePath}//css/images/favicon.ico" type="image/x-icon" />
    <link rel="shortcut icon" href="${basePath}//css/images/favicon.ico" type="image/x-icon" />
    <link rel="bookmark" href="${basePath}//css/images/favicon.ico" type="image/x-icon" />
</head>

<body>
<div id="main-box"></div>
<div id="main-content">
    <div class="login-body  animated fadeInLeft">
        <div class="login-main pr">
            <form action="javascript:;" method="post" class="login-form" id="loginForm">
                <h3> 管理中心 </h3>
                <h5 style="padding-bottom: 10px"> System Management Center </h5>
                <!-- 账号登陆 -->
                <div id="MobileBox" class="item-box"  >
                    <div class="input-group user-name"> <span class="input-group-addon"><i class="icon-user"></i></span>
                        <input type="text" id="userAccount" name="userAccount" class="form-control" placeholder="用户名/手机号">
                    </div>
                    <div class="input-group password"> <span class="input-group-addon"><i class="icon-lock"></i></span>
                        <input type="password" id="userPassword" name="userPassword" class="form-control" placeholder="密码">
                    </div>

                    <div class="use-qrcode-a" id="message"> </div>


                    <div class="login_btn_panel">
                        <button class=" btn btn-primary btn-block btn-lg" data-ajax="post" type="submit" data-callback="success">登录</button>
                        <div class="check-tips"></div>
                    </div>
            </form>
        </div>
    </div>
</div>
</body>
<#--<script src="http://pic.lvmama.com/js/new_v/jquery-1.7.min.js"></script>-->
<script type="text/javascript" src="${basePath}/bootstrap/js/jquery-1.7.min.js"></script>
<script type="text/javascript">
    $(".btn-primary").on("click",function () {
        if($("#userAccount").val()==null || $("#userAccount").val()==''){
            alert("请填写用户名！");
            return;
        }
        if($("#userPassword").val()==null || $("#userPassword").val()==''){
            alert("请填写密码！");
            return;
        }
        $.ajax({
            type:"post",
            url:"${basePath}/login.do",
            data:$("#loginForm").serialize(),
            dataType:"json",
            success:function (data) {
                if(data.status == 1){
                    $("#message").text(data.message+",跳转中...");
                    window.location.href="${basePath}/index.do";

                }else {
                   $("#message").text(data.message) ;
                }
            }
        })
    });
    function index() {
        $.ajax({
            type:"post",
            url:"${basePath}/index.do",
            data:"",
            dataType:"json",
            success:function (data) {
            }
        })
    }

</script>