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
        <li class="active">车队管理</li>
    </ul>
</div>

<div class="iframe_search">
<form method="get" action='${basePath}/siteCarTeam/findCarTeamList.do' id="searchForm">
    <table class="s_table">
        <tbody>
            <tr>
                <td class="s_label">车队名</td>
                <td class="w18"><input type="text" name="carTeamName" value="${queryParam.carTeamName!''}"></td>
                <td class="s_label">负责人</td>
                <td class="w18"><input type="text" name="personLiable" value="${queryParam.personLiable!''}"></td>
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
              </tr>
            <tr>
                <td class="s_label">负责人联系方式</td>
                <td class="w18"><input type="text" name="contactWay" value="${queryParam.contactWay!''}"></td>

                <td class="s_label"><a class="btn btn_cc1" id="search_button">查询</a></td>
                <td class="s_label"><a class="btn btn_cc1" id="addcarTeam_button">新增</a></td>
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
    <#if carTeams?? && carTeams ?size gt 0>

        <div class="p_box">
            <table class="p_table table_center">
                <thead>
                <tr>
                    <th>车队id</th>
                    <th>车队名称</th>
                    <th>负责人</th>
                    <th>联系方式</th>
                <#--<th>是否有效</th>-->
                    <th>备注</th>
                    <th>编辑</th>
                </tr>
                </thead>
                <tbody>
                    <#list carTeams as carTeam>
                    <tr>
                        <td>${carTeam.id!''} </td>
                        <td>${carTeam.carTeamName!''} </td>
                        <td>${carTeam.personLiable!''} </td>
                        <td>${carTeam.contactWay!''} </td>
                    <#--<td>
						<#if carTeam?? && carTeam.isValid == "Y">
                            <span style="color:green" class="cancelProp">有效</span>
						<#else >
                            <span style="color:red" class="cancelProp">无效</span>
						</#if>
					</td>-->
                        <td>${carTeam.memo!''} </td>
                        <td class="oper">
                            <a class="editDict" href="javascript:;" data="${carTeam.id!''}" data2="" >编辑</a>
                            <a href="javascript:;"  class="editFlag" data1="${carTeam.id!''}" data2="${carTeam.isValid}">${(carTeam.isValid=="Y")?string("禁用", "设为有效")}</a>

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
    $("#addcarTeam_button").on('click',function(){
        var url = "${basePath}/siteCarTeam/showAddCarTeam.do";
        updateDialog = new xDialog(url, {}, {title:"新增车队信息",width:900});
    });

    //修改
    $("a.editDict").on('click',function(){
        var carTeamId = $(this).attr("data");
        var url = "${basePath}/siteCarTeam/showUpdateCarTeam.do?id="+carTeamId;
        updateDialog = new xDialog(url, {}, {title:"修改车队信息",width:900});
    });

	//设置状态
	$("a.editFlag").bind("click",function(){
		 var carTeamId=$(this).attr("data1");
		 var isValid=$(this).attr("data2") == "N" ? "Y": "N";
		 var url = "${basePath}/siteCarTeam/updateStatus.do?id="+carTeamId+"&isValid="+isValid;
		 msg = isValid === "N" ? "确认禁用  ？" : "确认设为有效  ？";
	 	 $.confirm(msg, function () {
			 $.post(url, function(data){
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

