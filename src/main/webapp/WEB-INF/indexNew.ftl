<!DOCTYPE html>
<html>
<head>
<#include "/pages/base/head_meta.ftl"/>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" name="renderer" content="webkit">
    <title>成长记图书管理系统</title>
    <link rel="icon" href="${basePath}//css/images/favicon.ico" type="image/x-icon"/>
    <link rel="shortcut icon" href="${basePath}//css/images/favicon.ico" type="image/x-icon"/>
    <link rel="bookmark" href="${basePath}//css/images/favicon.ico" type="image/x-icon"/>

    <link rel="stylesheet" href="${basePath}/css/newVersion1/framework/bootstrap.css">
    <link rel="stylesheet" href="${basePath}/css/newVersion1/framework/messenger.css">
    <link rel="stylesheet" href="${basePath}/css/newVersion1/framework/messenger-theme-flat.css">
    <link rel="stylesheet" href="${basePath}/css/newVersion1/framework/vst.css">
    <link rel="stylesheet" href="${basePath}/css/newVersion1/framework/index.css">
    <link rel="stylesheet" href="${basePath}/css/newVersion1/framework/verify.css">

    <script type="text/javascript">

        function loginFuc() { // 当登录超时的时候调用此方法
            this.location = './login.do';
        };

        function loginOut(t) {
            t.href = '${basePath}' + "/loginOut.do";
        };

    </script>
</head>
<body>
<div class="header clearfix">
    <div class="left clearfix">
        <a class="logo"><i></i><em>成长记</em></a>
    </div>
    <div class="right clearfix">
        <div class="header-dropdown">
            <a class="header-dropdown-toggle">
                <strong></strong><em>${(user.alias)!""}</em><i></i>
            </a>
            <ul class="header-dropdown-menu">
                <li><a id="updatePassword"><i></i><em>修改密码</em></a></li>
                <input type="hidden" value="${user}" id="user"/>
            </ul>
        </div>
        <a onClick="loginOut(this)" data-toggle="tooltip" data-placement="bottom" title="" class="exit">退出</a>
    </div>
</div>

<div class="container-fluid">
    <div class="row console">
        <div class="sidebar">
            <div class="shrink"><i></i></div>
            <div class="sidebar-box-wrap">
                <div class="sidebar-box">
                    <!--工地系统--->

                    <dl class="nav nav-sidebar tab-client-relation">
                        <dt><i></i><em title="学员管理">基础设置</em><b></b></dt>
                        <#if user.userType=="S">
                             <dd>
                                <a data-id="5" href="${basePath}/siteUser/findUsers.do" permId="5"
                                   data-name="用户管理">用户信息管理</a>
                                <a data-id="6" href="${basePath}/sitePlace/findSitePlaceList.do" permId="6"
                                   data-name="工地管理">工地管理</a>
                             </dd>
                        <#else>
                            <dd>
                                <!--以下为普通用户菜单-->
                                <a data-id="7" href="${basePath}/siteCar/findCarList.do" permId="7"
                                   data-name="车辆管理">车辆管理</a>
                                <a data-id="8" href="${basePath}/siteCarTeam/findCarTeamList.do" permId="8"
                                   data-name="车队管理">车队管理</a>
                                <a data-id="9" href="${basePath}/siteDropPoint/findSiteDropPointList.do" permId="9"
                                   data-name="方点管理">方点管理</a>
                            </dd>
                        </#if>
                    </dl>

                    <dl class="nav nav-sidebar tab-financial-management">
                        <dt><i></i><em title="单据管理">单据管理</em><b></b></dt>
                        <dd>
                        <#if user.userType=="S">
                            <a data-id="10" href="${basePath}/siteOrder/findOrders.do" permId="10"
                               data-name="出库单管理">管理员出库单管理</a>
                        <#else>
                            <a data-id="10" href="${basePath}/siteOrder/findOrders.do" permId="10"
                               data-name="出库单管理">普通出库单管理</a>
                        </#if>

                        </dd>
                    </dl>
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
    <li class="JS_refresh_tab"><a>刷新标签页</a></li>
    <li role="presentation" class="divider"></li>
    <li class="JS_close_other_tab"><a>关闭其他标签页</a></li>
</ul>
<#include "/pages/base/foot.ftl"/>
<script src="${basePath}/js/newVersion1/bootstrap.js"></script>
<script src="${basePath}/js/newVersion1/index.js"></script>
<script src="${basePath}/js/newVersion1/messenger.min.js"></script>

<script>

    $("#updatePassword").bind("click", function () {
        var url = "${basePath}/siteUser/showUpdatePassword.do";
        updateDialog = new xDialog(url, {}, {title: "密码修改", width: 900});
    });

    function confirmAndRefresh(result) {
        if (result.code == "success") {
            pandora.dialog({
                wrapClass: "dialog-mini", content: result.message, okValue: "确定", ok: function () {
                    $("#searchForm").submit();
                }
            });
        } else {
            pandora.dialog({
                wrapClass: "dialog-mini", content: result.message, okValue: "确定", ok: function () {
                    //$.alert(result.message);
                }
            });
        }
    }
</script>

</body>
</html>