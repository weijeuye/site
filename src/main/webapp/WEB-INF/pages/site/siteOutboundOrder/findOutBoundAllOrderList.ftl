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
        <li><a href="#">单据管理</a> &gt;</li>
        <li class="active">出库单管理</li>
    </ul>
</div>

<div class="iframe_search">
<form method="get" action='${basePath}/siteOrder/findAllOrders.do' id="searchForm">
    <table class="s_table">
        <tbody>
            <tr>
                <td class="s_label">单据号</td>
                <td class="w18"><input type="text" name="billNo"  value="${queryParam.billNo!''}"></td>

                <td class="s_label">车牌号</td>
                <td class="w18"><input type="text" name="plateNumber" value="${queryParam.plateNumber!''}"></td>
                <td class="s_label">车队</td>
                <td  class="w18"><input type="text" class="form-control w270 search js_supplierName" name="carTeamName" id="carTeamName" value="${queryParam.carTeamName!''}">
                    <input type="hidden" name="carTeamId" id="carTeamId" value="${queryParam.carTeamId!''}">
                </td>

              </tr>
            <tr>

                <td class="s_label">出库人</td>
                <td class="w18"><input type="text" class=" w260 search" name="alias" id="alias"  value="${queryParam.alias!''}"></td>
               <input type="hidden" name="userId" id="userId" value="${queryParam.userId!''}">

                <td class="s_label">投放点</td>
                <td class="w18"><input type="text" name="dropPoint"  id="dropPoint" class="form-control w270 search js_supplierName" value="${queryParam.dropPoint!''}"></td>
                <input type="hidden" name="dropPointId" id="dropPointId" value="${queryParam.dropPointId!''}">

                <td class="s_label">工地</td>
                <td class="w18"><input type="text" class="form-control w270 search js_supplierName" name="siteName" id="siteName" value="${queryParam.siteName!''}"></td>
               <input type="hidden" name="siteId" id="siteId" value="${queryParam.siteId!''}">


            </tr>

            <tr>
                <td class="s_label">开始时间</td>
                <td class="w18"><input type="text" name="createTime" class="Wdate" onfocus="WdatePicker({dateFmt:'yyyy-MM-dd'})" value="${queryParam.createTime!''}"></td>

                <td class="s_label">结束时间</td>
                <td class="w18"><input type="text" name="endCreateTime" class="Wdate" onfocus="WdatePicker({dateFmt:'yyyy-MM-dd'})" value="${queryParam.createTime!''}"></td>

                <td class="s_label"><a class="btn btn_cc1" id="search_button">查询</a></td>

                <td></td>
                <input type="hidden" name="page" value="${page}">
            </tr>
        </tbody>
    </table>	
</form>
</div>
	
<!-- 主要内容显示区域\\ -->
<div class="iframe-content mt20">
    <#if outboundOrderVos?? &&outboundOrderVos?size gt 0>
        <div class="p_box">
            <table class="p_table table_center">
                <thead>
                <tr>
                    <th>单据号</th>
                    <th>车牌号</th>
                    <th>投放点</th>
                    <th>单价</th>
                    <th>方数</th>
                    <th>金额</th>
                    <th>制单人</th>
                    <th>备注</th>
                </tr>
                </thead>
                <tbody>
                    <#list outboundOrderVos as outboundOrderVo>
                    <tr>
                        <td>${outboundOrderVo.billNo!''} </td>
                        <td>${outboundOrderVo.plateNumber!''} </td>
                        <td>${outboundOrderVo.dropPoint!''} </td>
                        <td>${outboundOrderVo.price!''} </td>
                        <td>${outboundOrderVo.vehicle!''} </td>
                        <td>${outboundOrderVo.amount!''} </td>
                        <td>${outboundOrderVo.alias!''} </td>
                        <td>${outboundOrderVo.memo!''} </td>

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
    vst_pet_util.commListSuggest("#alias", "#userId",'/site/siteUser/searchUserList.do','');
    vst_pet_util.commListSuggest("#dropPoint", "#dropPointId",'/site/siteDropPoint/searchDropPointList.do','');
    vst_pet_util.commListSuggest("#carTeamName", "#carTeamId",'/site/siteCarTeam/searchCarTeamList.do','');
    vst_pet_util.commListSuggest("#siteName", "#siteId",'/site/sitePlace/searchSiteList.do','');

</script>


<script>
//属性列表弹出框对象，不要有重名的
var  updateDialog;

$(function(){

	$("#search_button").bind("click",function(){
		$("#searchForm").submit();
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

