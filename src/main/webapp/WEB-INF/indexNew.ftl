<!DOCTYPE html>
<html >
<head>
<#include "/pages/base/head_meta.ftl"/>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" name="renderer" content="webkit">
    <title>成长记图书管理系统</title>
    <link rel="icon" href="${basePath}//css/images/favicon.ico" type="image/x-icon" />
    <link rel="shortcut icon" href="${basePath}//css/images/favicon.ico" type="image/x-icon" />
    <link rel="bookmark" href="${basePath}//css/images/favicon.ico" type="image/x-icon" />

    <link rel="stylesheet" href="${basePath}/css/newVersion1/framework/bootstrap.css">
    <link rel="stylesheet" href="${basePath}/css/newVersion1/framework/messenger.css">
    <link rel="stylesheet" href="${basePath}/css/newVersion1/framework/messenger-theme-flat.css">
    <link rel="stylesheet" href="${basePath}/css/newVersion1/framework/vst.css">
    <link rel="stylesheet" href="${basePath}/css/newVersion1/framework/index.css">
    <link rel="stylesheet" href="${basePath}/css/newVersion1/framework/verify.css">

    <script type="text/javascript">

        function loginFuc(){ // 当登录超时的时候调用此方法
            this.location='./login.do';
        };

        function loginOut(t) {
            t.href='${basePath}'+"/loginout.do";
        };

    </script>
   <#-- <style type="text/css">
        .chengzhangji:before  {
            background: url("${basePath}/img/next.png") no-repeat;
        }

    </style>-->
</head>
<body>
<div class="header clearfix">
    <div class="left clearfix">
        <a class="logo"><i></i><em>成长记</em></a>
    </div>
    <div class="right clearfix">
	<#--<div class="search">-->
	<#--<input type="text" placeholder="搜索...">-->
	<#--<i></i>-->
	<#--</div>-->
        <#--<a href='/super_back/push/task_input.zul' data-id="task_input" data-toggle="tooltip" data-placement="bottom" title="" data-name="新增任务" class="new-task"><i></i><em>新增任务</em></a>-->
        <div class="header-dropdown">
            <a class="header-dropdown-toggle">
                <strong></strong><em>${(user.userName)!""}-${(user.userName)!""}</em><i></i>
            </a>
            <ul class="header-dropdown-menu">
              <#--  <li class="nest-show"><a class="my-task" href='/super_back/log/viewTaskQuery.zul' data-id="viewTask" data-toggle="tooltip" data-placement="bottom" title="" data-name="我的任务"><i></i><em>我的任务</em></a></li>
                <li class="nest-show"><a class="my-msg"href='/super_back/log/viewMessageQuery.zul' data-id="viewMessage" data-toggle="tooltip" data-placement="bottom" title="" data-name="我的消息"><i></i><em>我的消息</em></a></li>
                <li class="nest-show"><a class="my-info" href='/super_back/log/viewAnnounceQuery.zul' data-id="viewAnnounce" data-toggle="tooltip" data-placement="bottom" title="" data-name="我的公告"><i></i><em>我的公告</em></a></li>
                <li class="nest-show"><a class="my-nty" href='/pet_back/notification/notification_configure!myNotification.do' data-id="viewNotification" data-toggle="tooltip" data-placement="bottom" title="" data-name="我的通知"><i></i><em>我的通知</em></a></li>-->
                <#--<li class="nest-show"><a class="my-pwd"  data-id="change_password" data-toggle="tooltip" data-placement="bottom" title="" data-name="修改密码"><i></i><em>修改密码</em></a></li>-->
                  <li class="nest-show" id="updatePassword"><em>修改密码</em></a></li>
                <input type="hidden" value="${user}" id="user"/>
            </ul>
        </div>
        <a onClick="loginOut(this)" data-toggle="tooltip" data-placement="bottom" title="" class="exit">退出</a>
    </div>
</div>

<div class="container-fluid">
    <div class="row console">
        <div class="sidebar">
            <div class="shrink" ><i></i></div>
            <div class="sidebar-box-wrap">


			<#--<#list menuList as obj>-->
			<#--<dl class="nav nav-sidebar ${(obj.iconName)!''}">-->
			<#--<dt><i></i><em title="${obj.name}">${obj.name}</em><b></b></dt>-->
			<#--<dd>-->
			<#--<#list obj.subList as subObj>-->
			<#--<#if subObj.container>-->
			<#--<dl>-->
			<#--<dt>-->
			<#--<span class="dt-icon"><i></i></span>-->
			<#--<a  href="${subObj.url?if_exists}" permId="${subObj.permissionId?c}" data-id="${subObj.permissionId?c}" data-name="${subObj.name}"> ${subObj.name}</a></dt>-->
			<#--<dd>-->
			<#--<#list subObj.subList as thirdObj>-->
			<#--<a data-id="${thirdObj.permissionId?c}"  href="${thirdObj.url?if_exists}" permId="${thirdObj.permissionId?c}" data-name="${thirdObj.name}">${thirdObj.name}</a>-->
			<#--</#list>-->
			<#--</dd>-->
			<#--</dl>-->
			<#--<#else>-->
			<#--<a data-id="${subObj.permissionId?c}"  href="${subObj.url?if_exists}" permId="${subObj.permissionId?c}"  data-name="${subObj.name}">${subObj.name}</a>-->
			<#--</#if>-->
			<#--</#list>-->
			<#--</dd>-->
			<#--</dl>-->
			<#--</#list>-->



                <#--<div class="sidebar-box">
				<#list menuList as obj>

                    <dl class="nav nav-sidebar ${(obj.iconName)!''}">
                        <dt><i></i><em title="${obj.name}">${obj.name}</em><b></b></dt>
                        <dd>
							<#list obj.subList as subObj>
								<#if subObj.container>

                                    <dl>
                                        <dt>
                                            <span class="dt-icon"></span>
                                            <a  href="${subObj.url?if_exists}" permId="${subObj.permissionId?c}" data-id="${subObj.permissionId?c}" data-name="${subObj.name}"> ${subObj.name}</a>
                                        </dt>
                                        <dd>
											<#list subObj.subList as thirdObj>
                                                <a data-id="${thirdObj.permissionId?c}"  href="${thirdObj.url?if_exists}" permId="${thirdObj.permissionId?c}" data-name="${thirdObj.name}"><i></i>${thirdObj.name}</a>
											</#list>
                                        </dd>
                                    </dl>
								<#else>
                                    <a data-id="${subObj.permissionId?c}"  href="${subObj.url?if_exists}" permId="${subObj.permissionId?c}"  data-name="${subObj.name}">${subObj.name}</a>
								</#if>
							</#list>
                        </dd>
                    </dl>
				</#list>
                </div>-->


                <div class="sidebar-box">
                    <dl class="nav nav-sidebar tab-system-management">
                        <dt><i></i><em title="学员管理">学员管理</em><b></b></dt>
                        <dd>
                            <a data-id="1"  href="${basePath}/user/findUsers.do" permId="1"  data-name="学员信息管理">学员信息管理</a>
                            <a data-id="2"  href="${basePath}/bookBorrow/findBookBorrows.do" permId="2"  data-name="借阅管理">借阅管理</a>
                        </dd>
                    </dl>

                    <dl class="nav nav-sidebar tab-content-management">
                        <dt><i></i><em title="图书管理">图书管理</em><b></b></dt>
                        <dd>
                            <a data-id="3"  href="${basePath}/book/findBookTypeList.do" permId="3"  data-name="图书类别信息">图书类别信息</a>
                            <a data-id="4"  href="${basePath}/book/findBooks.do" permId="4"  data-name="图书信息">图书信息</a>
                        </dd>
                    </dl>
				<#--<#list menuList as obj>

                    <dl class="nav nav-sidebar ${(obj.iconName)!''}">
                        <dt><i></i><em title="${obj.name}">${obj.name}</em><b></b></dt>
                        <dd>
							<#list obj.subList as subObj>
								<#if subObj.container>

                                    <dl>
                                        <dt>
                                            <span class="dt-icon"></span>
                                            <a  href="${subObj.url?if_exists}" permId="${subObj.permissionId?c}" data-id="${subObj.permissionId?c}" data-name="${subObj.name}"> ${subObj.name}</a>
                                        </dt>
                                        <dd>
											<#list subObj.subList as thirdObj>
                                                <a data-id="${thirdObj.permissionId?c}"  href="${thirdObj.url?if_exists}" permId="${thirdObj.permissionId?c}" data-name="${thirdObj.name}"><i></i>${thirdObj.name}</a>
											</#list>
                                        </dd>
                                    </dl>
								<#else>
                                    <a data-id="${subObj.permissionId?c}"  href="${subObj.url?if_exists}" permId="${subObj.permissionId?c}"  data-name="${subObj.name}">${subObj.name}</a>
								</#if>
							</#list>
                        </dd>
                    </dl>
				</#list>-->
                </div>

                <div class="sidebar-box-scroll">
                    <div class="sidebar-box-thumb"></div>
                </div>

            </div>
        </div>
        <div class="main">
            <ul id="myTab" class="nav nav-tabs">
                <li role="presentation" class="active" data-id="0">
                    <a>新标签页</a>
                    <button type="button" class="close" data-dismiss="modal">
                        <span aria-hidden="true">×</span>
                        <span class="sr-only">Close</span>
                    </button>
                </li>
            </ul>
            <div id="myTabContent" class="tab-content">
                <div role="tabpanel" class="tab-pane active">
                    <div class="container theme-showcase">

                        <div class="jumbotron">
                            <p style="font-size:25px;">成长记使用小贴士</p>
                            <ul>
                                <li style="font-size:19px;">左侧边栏可以缩进、展开</li>
                                <li style="font-size:19px;">左键点击左侧边栏内的页面，会直接打开新标签页。</li>
                                <li style="font-size:19px;">每种页面只能打开一个标签页，在左侧边栏点击的页面如果已打开，则会自动定位到之前已打开的标签页位置。</li>
                                <li style="font-size:19px;">右键单击标签，可以选择刷新该标签页或关闭其他标签页。</li>

                            </ul>


                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<!-- Small modal -->
<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span
                        class="sr-only">Close</span></button>
                <h4 class="modal-title" id="myModalLabel">提示</h4>
            </div>
            <div class="modal-body">
                无法关闭最后一个标签页。
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
            </div>
        </div>
    </div>
</div>

<!-- Small modal -->
<div class="modal fade" id="maxDialog" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span
                        class="sr-only">Close</span></button>
                <h4 class="modal-title" id="maxDialogLabel">提示</h4>
            </div>
            <div class="modal-body">
                最多打开20个标签页。
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
            </div>
        </div>
    </div>
</div>
<div id="contextmenu-mask"></div>
<ul id="contextmenu" class="dropdown-menu">
    <!--<li class="JS_open_new_tab"><a>新标签页打开</a></li>-->
    <li class="JS_refresh_tab"><a>刷新标签页</a></li>
    <li role="presentation" class="divider"></li>
    <li class="JS_close_other_tab"><a>关闭其他标签页</a></li>
</ul>
<#include "/pages/base/foot.ftl"/>
<#--<script src="http://pic.lvmama.com/js/backstage/vst/framework/jquery-1.11.3.min.js"></script>-->
<#--<script type="text/javascript" src="${basePath}/bootstrap/js/jquery-1.11.3.min.js"></script>-->
<script src="${basePath}/js/newVersion1/bootstrap.js"></script>
<script src="${basePath}/js/newVersion1/index.js"></script>
<script src="${basePath}/js/newVersion1/messenger.min.js"></script>

<#--<script src="/pet_back/js/newVersion/messenger.min.js"></script>-->
<script>

    $("#updatePassword").bind("click",function(){
        var url = "${basePath}/user/showUpdatePassWord.do";
        updateDialog = new xDialog(url, {}, {title:"密码修改",width:900});
    });

    function confirmAndRefresh(result){
        if (result.code == "success") {
            pandora.dialog({wrapClass: "dialog-mini", content:result.message, okValue:"确定",ok:function(){
                $("#searchForm").submit();
            }});
        }else {
            pandora.dialog({wrapClass: "dialog-mini", content:result.message, okValue:"确定",ok:function(){
                //$.alert(result.message);
            }});
        }
    }
</script>

</body>
</html>