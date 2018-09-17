<!DOCTYPE html>
<html>
<head>
    <script language="javascript" src="${basePath}/lodop/LodopFuncs.js"></script>
    <script language="javascript" src="${basePath}/lodop/CLodopFuncs.js"></script>
    <object  id="LODOP_OB" classid="clsid:2105C259-1E0C-4534-8141-A753534CB4CA" width=0 height=0>
        <embed id="LODOP_EM" type="application/x-print-lodop" width=0 height=0></embed>
    </object>
<#include "/pages/base/head_meta.ftl"/>
	<link type="text/css" href="${basePath}/js/My97DatePicker/skin/WdatePicker.css">
</head>
<body>
<div class="iframe_header">
    <ul class="iframe_nav">
        <li><a href="#">首页</a> &gt;</li>
        <li><a href="#">学员管理</a> &gt;</li>
        <li class="active">借阅管理</li>
    </ul>
</div>

<div class="iframe_search">
<form method="post" action='${basePath}/bookBorrow/findBookBorrows.do' id="searchForm">
    <table class="s_table">
        <tbody>
            <tr>
                <td class="s_label">账号</td>
                <td class="w18"><input type="text" name="userAccount" value="${queryParam.userAccount!''}"></td>
                <td class="s_label">学员名字</td>
                <td class="w18"><input type="text" name="userName" value="${queryParam.userName!''}"></td>
                <td class="s_label">书籍名称：</td>
                <td class="w18"><input type="text" name="bookName" value="${queryParam.bookName!''}"></td>
            	<td class="s_label"></td>
              </tr>
              <tr>
                  <td class="s_label">ISBN：</td>
                  <td class="w18"><input type="text" name="telephone" value="${queryParam.isbn!''}"></td>

              	<td class="s_label">是否归还：</td>
                <td class="w18">
	                <select name="isReturn">
						<#if queryParam.isReturn??>

                            <option value="" <#if queryParam.isReturn == "" >selected</#if> >不限</option>
                            <option value="Y" <#if queryParam.isReturn == "Y">selected</#if> >已归还</option>
                            <option value="N" <#if queryParam.isReturn == "N">selected</#if> >未归还</option>
							<#else >
                                <option value="" selected>不限</option>
                                <option value="Y"  >已归还</option>
                                <option value="N" >未归还</option>
						</#if>
	                </select>
                </td>
                  <td class="s_label">借书日期：</td>
                  <td class="w18"><input type="text" name="borrowTime"  class="Wdate" onfocus="WdatePicker({dateFmt:'yyyy-MM-dd'})" value="${(queryParam.borrowTime?string("yyyy-MM-dd"))!''}"></td>

                  <td class="s_label">还书日期：</td>
                  <td class="w18"><input type="text" name="returnTime"  class="Wdate" onfocus="WdatePicker({dateFmt:'yyyy-MM-dd'})"  value="${(queryParam.returnTime?string("yyyy-MM-dd"))!''}"></td>
                <td class="s_label"><a class="btn btn_cc1" id="search_button">查询</a></td>
              <#--  <td class="s_label"><a class="btn btn_cc1" id="addUser_button">新增</a></td>-->
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
                <th>账号</th>
            	<th>姓名</th>
                <th>ISBN</th>
                <th>书籍名称</th>
                <th>借书日期</th>
                <th>到期日期</th>
                <th>是否归还</th>
                <th>实际归还日期</th>
                <th>编辑</th>
            </tr>
        </thead>
        <tbody>
			<#list bookBorrows as bookBorrow>
				<tr>
					<td>${bookBorrow.userAccount!''} </td>
					<td>${bookBorrow.userName!''} </td>
                    <td>${bookBorrow.isbn!''} </td>
                    <td>${bookBorrow.bookName!''} </td>
                    <td>${(bookBorrow.borrowTime?string("yyyy-MM-dd"))!''} </td>
                    <td>${(bookBorrow.returnTime?string("yyyy-MM-dd"))!''} </td>
                    <td>
                        <#if bookBorrow.isReturn == 'Y'>
                            <span style="color:green" class="cancelProp">已归还</span>
                        <#else>
                            <span style="color:red" class="cancelProp">未归还</span>
                        </#if>
                    </td>
                    <td>${(bookBorrow.actReturnTime?string("yyyy-MM-dd"))!''} </td>
					<td class="oper">

                        <#if bookBorrow.isReturn == 'N'>
                            <a class="editDict" href="javascript:;" data="${bookBorrow.borrowId!''}" data2="" >还书</a>
                            <a class="borrowAgain" href="javascript:;" data="${bookBorrow.bookId!''}" data1="${bookBorrow.borrowId!''}" data2="${bookBorrow.userId!''}" data3="${bookBorrow.isbn!''}">续借</a>
                        </#if>

						<#--<a href="javascript:void(0);" class="showLogDialog" param='parentId=${bookBorrow.userId}&objectId=${bookBorrow.userId}&parentType=DICT_BUSINESS&sysName=VST'>操作日志</a>

						
						<a href="javascript:;"  class="editFlag" data1="${bookBorrow.userId!''}" data2="${bookBorrow.isValid}">${(bookBorrow.isValid=='y')?string("设为无效", "设为有效")}</a>

						<a href="javascript:void(0);" class="showPhoto" data=${bookBorrow.userId}>删除</a>-->
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

    var LODOP=getLodop();
//属性列表弹出框对象，不要有重名的
var dictPropDefListDialog, dictPropListDialog, updateDialog,updateDictPropDialog;

$(function(){

	$("#search_button").bind("click",function(){
		$("#searchForm").submit();
	});

    //续借
    $(".borrowAgain").on('click',function(){
        var bookId = $(this).attr("data");
        var userId = $(this).attr("data2");
        var isbn=$(this).attr("data3");
        var borrowId=$(this).attr("data1");
        var url = "${basePath}/bookBorrow/showBorrowBookAgain.do?bookId="+bookId+"&userId="+userId+"&isbn="+isbn+"&borrowId="+borrowId;
        updateDialog = new xDialog(url, {}, {title:"续借信息",width:900});
    });

    //修改
    $("a.editDict").on('click',function(){
        var bookBorrowId = $(this).attr("data");
        var isValid=$(this).attr("data2") == "N" ? "Y": "N";
        var url = "${basePath}/bookBorrow/returnBook.do?bookBorrowId="+bookBorrowId;
        var   msg = "是否确认还书？";
        $.confirm(msg, function () {
            $.get(url, function(data){
                if(data && data.code=='success'){
                    $.alert("还书成功！");
                    $("#searchForm").submit();
                }else {
                    $.alert(data.message);
                }
            });
        });
    });



	
	//设置状态
	$("a.editFlag").bind("click",function(){
		 var userId=$(this).attr("data1");
		 var isValid=$(this).attr("data2") == "N" ? "Y": "N";
		 var url = "${basePath}/user/showUpdateUser.do?userId="+userId+"&isValid="+isValid;
		 msg = isValid === "N" ? "确认设为无效  ？" : "确认设为有效  ？";
	 	 $.confirm(msg, function () {
			 $.get(url, function(data){
                 if(data && data.code=='SUCCESS'){
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

