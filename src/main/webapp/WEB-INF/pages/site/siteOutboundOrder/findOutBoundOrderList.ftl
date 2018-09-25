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
<form method="get" action='${basePath}/siteOrder/findOrders.do' id="searchForm">
    <table class="s_table">
        <tbody>
            <tr>
                <td class="s_label">车牌号</td>
                <td class="w18"><input type="text" name="plateNumber" value="${queryParam.plateNumber!''}"></td>
                <td class="s_label">车队</td>
                <td class="w18"><input type="text" name="carTeamId" value="${queryParam.carTeamId!''}"></td>

                <td class="s_label">制单人</td>
                <td class="w18"><input type="text" name="userId" value="${queryParam.userId!''}"></td>

                <td class="s_label">投放点</td>
                <td class="w18"><input type="text" name="dropPointId" value="${queryParam.dropPointId!''}"></td>
              </tr>
            <tr>
                <td class="s_label"><a class="btn btn_cc1" id="search_button">查询</a></td>
                <td class="s_label"><a class="btn btn_cc1" id="addoutboundOrder_button">新增</a></td>
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
			<#list outboundOrders as outboundOrder>
				<#--<tr>
                    <td>${outboundOrder.outboundOrderNumber!''} </td>
					<td>${outboundOrder.outboundOrderName!''} </td>
                    <td>${outboundOrder.memo!''} </td>
					<td class="oper">
						<a class="editDict" href="javascript:;" data="${outboundOrder.id!''}" data2="" >编辑</a>
						<a href="javascript:;"  class="editFlag" data1="${outboundOrder.id!''}" data2="${outboundOrder.isValid}">${(outboundOrder.isValid=="Y")?string("设为无效", "设为有效")}</a>

                    </td>
				</tr>-->
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
<script type="text/javascript" src="${basePath}/bootstrap/js/vst_pet_util.js"></script>
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
    $("#addoutboundOrder_button").on('click',function(){
        var url = "${basePath}/siteOrder/showAddOrder.do";
        updateDialog = new xDialog(url, {}, {title:"单据录入",width:900});
    });

    //修改
    $("a.editDict").on('click',function(){
        var outboundOrderId = $(this).attr("data");
        var url = "${basePath}/outboundOrderPlace/showUpdateSitePlace.do?id="+outboundOrderId;
        updateDialog = new xDialog(url, {}, {title:"修改工地信息",width:900});
    });

	//设置状态
	$("a.editFlag").bind("click",function(){
		 var outboundOrderId=$(this).attr("data1");
		 var isValid=$(this).attr("data2") == "N" ? "Y": "N";
		 var url = "${basePath}/outboundOrderPlace/updateStatus.do?id="+outboundOrderId+"&isValid="+isValid;
		 msg = isValid === "N" ? "确认设为无效  ？" : "确认设为有效  ？";
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

