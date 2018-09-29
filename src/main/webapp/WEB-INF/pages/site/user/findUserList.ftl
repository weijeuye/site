<!DOCTYPE html>
<html>
<head>

<#include "/pages/base/head_meta.ftl"/>
	<link type="text/css" href="${basePath}/js/My97DatePicker/skin/WdatePicker.css">
</head>
<body>
<div class="iframe_header">
    <ul class="iframe_nav">
        <li><a href="#">首页</a> &gt;</li>
        <li><a href="#">基础信息</a> &gt;</li>
        <li class="active">用户管理</li>
    </ul>
</div>

<div class="iframe_search">
<form method="get" action='${basePath}/siteUser/findUsers.do' id="searchForm">
    <table class="s_table">
        <tbody>
            <tr>
                <td class="s_label">账号</td>
                <td class="w18"><input type="text" name="account" value="${queryParam.account!''}"></td>
                <td class="s_label">用户名称</td>
                <td class="w18"><input type="text" name="alias" value="${queryParam.alias!''}"></td>
                <td class="s_label">性别：</td>
                <td class="w18">
                    <select name="gender">
                    <#if queryParam.gender??>

                        <option value='' <#if queryParam.gender == '' >selected</#if> >不限</option>
                        <option value="M" <#if queryParam.gender == "M">selected</#if> >男</option>
                        <option value="F" <#if queryParam.gender == "F">selected</#if> >女</option>
                    <#else >
                        <option value='' selected>不限</option>
                        <option value="M"  >男</option>
                        <option value="F" >女</option>
                    </#if>
                    </select>
                </td>
              </tr>
            <tr>
                <#--<td class="s_label">是否有效：</td>
                <td class="w18">
                    <select name="isValid">
                    <#if queryParam.isValid??>

                        <option value='' <#if queryParam.isValid == '' >selected</#if> >不限</option>
                        <option value="Y" <#if queryParam.isValid == "Y">selected</#if> >有效</option>
                        <option value="N" <#if queryParam.isValid == "N">selected</#if> >无效</option>
                    <#else >
                        <option value='' selected>不限</option>
                        <option value="Y"  >有效</option>
                        <option value="N" >无效</option>
                    </#if>
                    </select>
                </td>-->
                <td class="s_label"><a class="btn btn_cc1" id="search_button">查询</a></td>
                <td class="s_label"><a class="btn btn_cc1" id="addUser_button">新增</a></td>
                <td></td>
                <td></td>
                <input type="hidden" name="page" value="${page}">
            </tr>
        </tbody>
    </table>	
</form>
</div>
	
<!-- 主要内容显示区域\\ -->
<div class="iframe-content mt20">
    <#if users?? && users?size gt 0>

        <div class="p_box">
            <table class="p_table table_center">
                <thead>
                <tr>
                    <th>用户ID</th>
                    <th>账号</th>
                    <th>姓名</th>
                    <th>性别</th>
                    <th>电话</th>
                <#--<th>是否有效</th>-->
                    <th>备注</th>
                    <th>编辑</th>
                </tr>
                </thead>
                <tbody>
                    <#list users as user>
                    <tr>
                        <td>${user.id!''} </td>
                        <td>${user.account!''} </td>
                        <td>${user.alias!''} </td>
                        <td>
                            <#if user.gender?? && user.gender == 'M'>
                                <span style="color:green" class="cancelProp">男</span>
                            <#else>
                                <span style="color:red" class="cancelProp">女</span>
                            </#if>
                        </td>

                        <td>${user.phone!''} </td>
                    <#--<td>
						<#if user?? && user.isValid == "Y">
                            <span style="color:green" class="cancelProp">有效</span>
						<#else >
                            <span style="color:red" class="cancelProp">无效</span>
						</#if>
					</td>-->
                        <td>${user.memo!''} </td>
                        <td class="oper">
                            <a class="editDict" href="javascript:;" data="${user.id!''}" data2="" >编辑</a>
                            <a href="javascript:;"  class="editFlag" data1="${user.id!''}" data2="${user.isValid}">${(user.isValid=="Y")?string("禁用", "设为有效")}</a>

                        </td>
                    </tr>
                    </#list>
                </tbody>
            </table>

            <#if pageParam.items?exists>
                <div class="paging" >
                ${pageParam.getPagination()}
                </div>
            </#if>

        </div><!-- div p_box -->
    <#else>
        <!-- 无结果 -->
        <div class="no_data mt20"><i class="icon-warn32"></i>暂无相关数据！</div>
    </#if>

</div><!-- //主要内容显示区域 -->
<#include "/pages/base/foot.ftl"/>
</body>
</html>

<script>
//属性列表弹出框对象，不要有重名的
var  updateDialog;

$(function(){

	$("#search_button").bind("click",function(){
		$("#searchForm").submit();
	});
    //新增
    $("#addUser_button").on('click',function(){
        var url = "${basePath}/siteUser/showAddUser.do";
        updateDialog = new xDialog(url, {}, {title:"新增用户信息",width:900});
    });

    //修改
    $("a.editDict").on('click',function(){
        var userId = $(this).attr("data");
        var url = "${basePath}/siteUser/showUpdateUser.do?id="+userId;
        updateDialog = new xDialog(url, {}, {title:"修改用户信息",width:900});
    });

	//设置状态
	$("a.editFlag").bind("click",function(){
		 var userId=$(this).attr("data1");
		 var isValid=$(this).attr("data2") == "N" ? "Y": "N";
		 var url = "${basePath}/siteUser/updateStatus.do?id="+userId+"&isValid="+isValid;
		 msg = isValid === "N" ? "确认禁用  ？" : "确认设为有效  ？";
	 	 $.confirm(msg, function () {
			 $.get(url, function(data){
                 if(data && data.code=='success'){
                     $.alert(data.message);
                     $("#searchForm").submit();
                 }else {
                     $.alert(data.message);
                 }
		     });
	     });
	});

	function confirmAndRefresh(result){
		if (result.code == "success") {
			pandora.dialog({wrapClass: "dialog-mini", content:result.message, okValue:"确定",ok:function(){
				$("#searchForm").submit();
			}});
		}else {
			pandora.dialog({wrapClass: "dialog-mini", content:result.message, okValue:"确定",ok:function(){
				$("#searchForm").submit();
			}});
		}
	} 
});

</script>

