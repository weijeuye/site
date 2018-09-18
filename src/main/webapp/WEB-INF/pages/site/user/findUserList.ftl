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
<form method="post" action='${basePath}/site/user/findUsers.do' id="searchForm">
    <table class="s_table">
        <tbody>
            <tr>
                <td class="s_label">账号</td>
                <td class="w18"><input type="text" name="userAccount" value="${queryParam.account!''}"></td>
                <td class="s_label">用户名称</td>
                <td class="w18"><input type="text" name="userName" value="${queryParam.alias!''}"></td>
                <td class="s_label">是否有效：</td>
                <td class="w18">
                    <select name="status">
                    <#if queryParam.status??>

                        <option value="" <#if queryParam.status == "" >selected</#if> >不限</option>
                        <option value="1" <#if queryParam.status == 1>selected</#if> >有效</option>
                        <option value="0" <#if queryParam.status == 0>selected</#if> >无效</option>
                    <#else >
                        <option value="" selected>不限</option>
                        <option value="1"  >有效</option>
                        <option value="0" >无效</option>
                    </#if>
                    </select>
                </td>
                <#--<td class="s_label">父亲电话：</td>
                <td class="w18"><input type="text" name="fatherTelephone" value="${queryParam.fatherTelephone!''}"></td>
            	<td class="s_label"></td>-->
              </tr>
            <#--  <tr>
                  <td class="s_label">母亲电话：</td>
                  <td class="w18"><input type="text" name="motherTelephone" value="${queryParam.motherTelephone!''}"></td>
              	<td class="s_label">性别：</td>
                <td class="w18">
	                <select name="gender">
						<#if queryParam.gender??>

                            <option value="" <#if queryParam.gender == "" >selected</#if> >不限</option>
                            <option value="m" <#if queryParam.gender == "m">selected</#if> >男</option>
                            <option value="f" <#if queryParam.gender == "f">selected</#if> >女</option>
							<#else >
                                <option value="" selected>不限</option>
                                <option value="m"  >男</option>
                                <option value="f" >女</option>
						</#if>
	                </select>
                </td>-->
            <tr>
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
    <div class="p_box">
	<table class="p_table table_center">
        <thead>
            <tr>
            	<th>用户ID</th>
                <th>账号</th>
            	<th>姓名</th>
                <#--<th>性别</th>
                <th>学校</th>
                <th>班级</th>
                <th>父亲电话</th>
                <th>母亲电话</th>
                <th>住址</th>
                <th>出生日期</th>-->
              <#--  <th>推荐人</th>-->
                <th>是否有效</th>
              <#--  <th>借阅次数</th>
                <th>备注</th>-->
               <#-- <th>图片</th>-->
                <th>编辑</th>
            </tr>
        </thead>
        <tbody>
			<#list users as user>
				<tr>
                    <td>${user.id!''} </td>
					<td>${user.account!''} </td>
					<td>${user.alias!''} </td>

					<#--<td>
						<#if user.gender?? && bookUser.gender == 'm'>
							<span style="color:green" class="cancelProp">男</span>
						<#else>
							<span style="color:red" class="cancelProp">女</span>
						</#if> 
					</td>-->
                 <#--   <td>${bookUser.school!''} </td>
                    <td>${bookUser.className!''} </td>
                    <td>${bookUser.fatherTelephone!''} </td>
                    <td>${bookUser.motherTelephone!''} </td>
                    <td>${bookUser.address!''} </td>
                    <td>${bookUser.birthday!''} </td>-->
                    <#--<td>${bookUser.recommendUserId!''} </td>-->
                    <td>
						<#if user?? && user.status == 1>
                            <span style="color:green" class="cancelProp">有效</span>
						<#else >
                            <span style="color:red" class="cancelProp">无效</span>
						</#if>
					</td>

                    <#--<td><img src="https://img1.doubanio.com\/view\/subject\/s\/public\/s3272509.jpg"></td>-->
					<td class="oper">
						<a class="editDict" href="javascript:;" data="${user.id!''}" data2="" >编辑</a>
						<a href="javascript:;"  class="editFlag" data1="${user.id!''}" data2="${user.status}">${(user.status==1)?string("设为无效", "设为有效")}</a>

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
	
</div><!-- //主要内容显示区域 -->
<#include "/pages/base/foot.ftl"/>
</body>
</html>

<script>
//属性列表弹出框对象，不要有重名的
var dictPropDefListDialog, dictPropListDialog, updateDialog,updateDictPropDialog;

$(function(){

	$("#search_button").bind("click",function(){
		$("#searchForm").submit();
	});
    //新增
    $("#addUser_button").on('click',function(){
        var url = "${basePath}/user/addUser.do";
        updateDialog = new xDialog(url, {}, {title:"新增用户信息",width:900});
    });

    //修改
    $("a.editDict").on('click',function(){
        var userId = $(this).attr("data");
        var url = "${basePath}/user/showUpdateUser.do?userId="+userId;
        updateDialog = new xDialog(url, {}, {title:"修改用户信息",width:900});
    });

    //借书
    $("a.borrowBook").on('click',function(){
        var userId = $(this).attr("data");
        var url = "${basePath}/bookBorrow/showBorrowBook.do?userId="+userId;
        updateDialog = new xDialog(url, {}, {title:"借阅图书",width:1200});
    });


	
	//设置状态
	$("a.editFlag").bind("click",function(){
		 var userId=$(this).attr("data1");
		 var isValid=$(this).attr("data2") == "N" ? "Y": "N";
		 var url = "${basePath}/user/updateStatus.do?userId="+userId+"&isValid="+isValid;
		 msg = isValid === "N" ? "确认设为无效  ？" : "确认设为有效  ？";
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
	
	// Comphoto
	$("a.showPhoto").bind("click",function(){
		var url="/vst_back/pub/comphoto/findComPhotoList.do?objectId="+$(this).attr("data")+"&objectType=DICT_ID";
		new xDialog(url,{},{title:"图片列表",iframe:true,width:1000});
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

