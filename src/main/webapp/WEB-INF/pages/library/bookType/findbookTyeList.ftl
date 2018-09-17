<!DOCTYPE html>
<html>
<head>

<#include "/pages/base/head_meta.ftl"/>

    <link rel="stylesheet" href="${basePath}/css/ztree/zTreeStyle.css" >
    <link rel="stylesheet" href="${basePath}/css/ztree/ebk.css" >

</head>
<body>
<div class="iframe_header">
 <i class="icon-home ihome"></i>
    <ul class="iframe_nav">
        <li><a href="#">首页</a> &gt;</li>
        <li><a href="#">图书管理</a> &gt;</li>
        <li class="active">图书分类</li>
    </ul>
</div>

<div class="iframe_search">
	<form method="post" action='/library/book/findBookTypeList.do' id="searchForm">
    <table class="s_table">
        <tbody>
            <tr>
                <td class="s_label">名称：</td>
                <td class="w18"><input type="text" name="bookTypeName" value="${bookTypeName!''}"></td>
                <td class=" operate mt10"><a class="btn btn_cc1" id="search_button">查询</a></td>
                <td class=" operate mt10"><a class="btn btn_cc1" id="new_button">新增</a></td>
                <input type="hidden" name="page" value="${page}">
            </tr>
        </tbody>
    </table>	
	</form>
</div>
	
<!-- 主要内容显示区域\\ -->
<div class="iframe_content">   
    <div class="p_box">
	<table class="p_table table_center">
        <thead>
            <tr>
        	<th>id</th>
            <th>分类名称</th>
            <th>上级分类</th>
         <#--   <th>分类等级</th>-->
			<th>操作</th>
            </tr>
        </thead>
        <tbody>
			<#list pageParam.items as bookType>
			<tr>
			<td>${bookType.bookTypeId!''} </td>
			<td>&nbsp;&nbsp;${bookType.bookTypeName!''} </td>
			<td>&nbsp;&nbsp;${bookType.bookTypeParentName!''} </td>
		<#--	<td>${bookType.levelCode!''} </td>-->
			<td class="oper">
                    <a class="editCate" href="javascript:void(0);" data="${bookType.bookTypeId!''}" >编辑</a>
                    <#--<a class="editBranch" href="javascript:void(0);" data="${bookType.bookTypeId!''}" >编辑规格</a>-->
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
<script type="text/javascript" src="${basePath}/bootstrap/js/novaDialog.js" ></script>
<script>
var categoryPropListDialog,categoryPropGroupsDialog,branchListDialog;
$(function(){

$("searchForm input[name='categoryName']").focus();
	$("#search_button").bind("click",function(){
		$("#searchForm").submit();
});



//新增品类
$("#new_button").bind("click",function(){
    dialog("${basePath}/book/showAddBookType.do", "新增图书分类", 800, "auto",function(){
        if(!$("#dataForm").validate().form()){
            return false;
        }
        var resultCode;
        var nodeList=JSON.parse($("#nodeList").val());
        var bookTypeParentId=$("#bookTypeParentId").val();
        if(nodeList && nodeList.length > 0){

            if(bookTypeParentId && bookTypeParentId!=''){
                updateBookType();
            }else {
                $.confirm("未选择上级分类，如不选择，保存成功后为一级分类，确认保存吗 ？", function () {
                    debugger;
                    updateBookType();

                },"保存");
                return false;
            }
        }else {
            $.confirm("暂无图书分类，此次添加可不选择，保存成功为图书一级分类，是否继续？", function () {
                debugger;
                updateBookType();
            },"保存");
            return false;
		}


    });
});

//编辑基图书分类
$("a.editCate").bind("click",function(){
    var bookTypeId=$(this).attr("data");
    var url = "${basePath}/book/showAddBookType.do?bookTypeId="+bookTypeId;
	dialog(url, "编辑基图书分类", 800, "auto",function(){
	    if(!$("#dataForm").validate().form()){
			return false;
		}
        var bookTypeParentId=$("#bookTypeParentId").val();
	    if(bookTypeParentId && bookTypeParentId==bookTypeId){
			$.alert("不能选择与自己同级的分类，请重新选择！");
			return false;
		}
	    var resultCode; 
	    $.confirm("确认修改吗 ？", function () {
		$.ajax({
			url : "${basePath}/book/updateBookType.do",
			type : "post",
			async: false,
			data : $(".dialog #dataForm").serialize(),
			dataType:'JSON',
			success : function(data) {
			    resultCode=data.code;
				confirmAndRefresh(data);
			}
		});
	},"保存");
	return false;
	});
});
 function updateBookType() {
     $.ajax({
         url : "${basePath}/book/addBookType.do",
         type : "post",
         async: false,
         data : $(".dialog #dataForm").serialize(),
         dataType:'JSON',
         success : function(result) {
             if(result && result.code =='success'){
                 $.alert(result.message);
			 }
             confirmAndRefresh(result);
         }
     });
 }

$("a.editCategoryFlag").bind("click",function(){
	 var categoryId=$(this).attr("data");
	 var cancelFlag=$(this).attr("data2") == "N" ? "Y": "N";
	 var url = "/vst_admin/biz/category/editFlag.do?categoryId="+categoryId+"&cancelFlag="+cancelFlag+"&newDate="+new Date();
	 msg = cancelFlag === "N" ? "确认设为无效  ？" : "确认设为有效  ？";
	 $.confirm(msg, function () {
		 $.get(url, function(result){
	         confirmAndRefresh(result);
	     });
     });
	 return false;
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
});

</script>

