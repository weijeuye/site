<!DOCTYPE html>
<html>
<head>

<#include "/pages/base/head_meta.ftl"/>
    <link rel="stylesheet" href="${basePath}/css/ztree/zTreeStyle.css" >
    <link rel="stylesheet" href="${basePath}/css/ztree/ebk.css" >
   <#-- <link rel="stylesheet" href="/library/css/novaDialog.css">-->
	<link type="text/css" href="${basePath}/js/My97DatePicker/skin/WdatePicker.css">
    <style type="text/css">

    </style>
</head>
<body>
<div class="iframe_header">
    <ul class="iframe_nav">
        <li><a href="#">首页</a> &gt;</li>
        <li><a href="#">图书管理</a> &gt;</li>
        <li class="active">图书信息管理</li>
    </ul>
</div>

<div class="iframe_search">
<form method="post" action='${basePath}/book/findBooks.do' id="searchForm">
    <input id="nodeList" type="hidden"  value=${nodeList}>
    <table class="s_table">
        <tbody>
            <tr>
                <td class="s_label">图书名称</td>
                <td class="w18"><input type="text" name="bookName" value="${queryParam.bookName!''}"></td>

                <td class="s_label">ISBN号&nbsp</td>
                <td class="w18"><input type="text" name="isbn" value="${queryParam.isbn!''}"></td>
                <td class="s_label">出版社&nbsp</td>
                <td class="w18"><input type="text" name="bookPub" value="${queryParam.bookPub!''}"></td>
                <td class="s_label">作者</td>
                <td class="w18"><input type="text" name="bookAuthor" value="${queryParam.bookAuthor!''}"></td>

              </tr>
              <tr>
                  <td class="s_label">是否在库</td>
                  <td class="w18">
                      <select name="bookState">
                      <#if queryParam.bookState??>

                          <option value="" <#if queryParam.bookState == "" >selected</#if> >不限</option>
                          <option value="Y" <#if queryParam.bookState == "Y">selected</#if> >在库</option>
                          <option value="N" <#if queryParam.bookState == "N">selected</#if> >不在库</option>
                      <#else >
                          <option value="" selected>不限</option>
                          <option value="Y"  >在库</option>
                          <option value="N" >不在库</option>
                      </#if>
                      </select>
                  </td>

                  <td class="s_label">是否有效</td>
                  <td class="w18">
                      <select name="isValid">
                      <#if queryParam.isValid??>

                          <option value="" <#if queryParam.isValid == "" >selected</#if> >不限</option>
                          <option value="Y" <#if queryParam.isValid == "Y">selected</#if> >有效</option>
                          <option value="N" <#if queryParam.isValid == "N">selected</#if> >无效</option>
                      <#else >
                          <option value="" selected>不限</option>
                          <option value="Y"  >有效</option>
                          <option value="N" >无效</option>
                      </#if>
                      </select>
                  </td>


                  <td class="s_label">图书分类</td>
                  <td ><th ><input type="text" id="bookTypeName" name="bookTypeName" value="${queryParam.bookTypeName!''}" readonly>
                      <a href="javascript:" class="JS_choose_supp_group mr10" data-id="${queryParam.bookTypeId!''}" disabled >[选择图书分类]</a>
                      <a href="javascript:void(0);" class=" JS_reset_supp_group" data-id="${queryParam.bookTypeId!''}">重置</a>
                      </th>
                  </td>
                  <!--自己增加开始-->
                  <div id="retrieveSuppGroupContent" class="menuContent retrieveSuppGroupContent" style="display:none; position: absolute; top: 115px; left: 600px">
                      <ul id="suppGroupTree" class="ztree" style="margin-top:0; width:160px;"></ul>
                  </div>
                  <!--自己增加结束-->
                  <input type="hidden"  id="bookTypeId" name="bookTypeId" value="${queryParam.bookTypeId!''}">

                  <#--<td class="s_label">价格</td>
                  <td class="w18"><input type="text" name="bookPrice" value="${queryParam.bookPrice!''}"></td>
-->         </tr>

             <tr position:absolute;right:30px;>
                <div>
                    <td class="s_label"><a class="btn btn_cc1" id="search_button">查询</a></td>
                    <td class="s_label"><a class="btn btn_cc1" id="addUser_button">手动新增</a></td>
                    <td class="s_label"><a class="btn btn_cc1" id="atuoAddBook_button">扫描新增</a></td>
                </div>

            </tr>
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
	<table class="p_table table_center" style="table-layout: fixed;">
        <thead>
            <tr>
                <th>图书名称</th>
            	<th>分类名称</th>
                <th>作者</th>
                <th>出版社</th>
                <th>出版时间</th>
                <th>总数</th>
                <th>在库数量</th>
                <th>是否在库</th>
                <th>价格</th>
                <th>ISBN</th>
                <th>简介</th>
                <th>是否有效</th>
                <th>编辑</th>
            </tr>
        </thead>
        <tbody>
			<#list books as book>
				<tr>
					<td>${book.bookName!''} </td>
					<td>${book.bookTypeName!''} </td>
					<td>${book.bookAuthor!'未知'} </td>
                    <td>${book.bookPub!'未知'} </td>
                    <td>${book.bookPubTime?string("yyyy-MM-dd")!''} </td>
                    <td>${book.bookNum!''} </td>
                    <td>${book.bookLeftNum!''} </td>
					<td>
						<#if book.bookState?? && book.bookState== 'Y'>
							<span style="color:green" class="cancelProp">在库</span>
						<#else>
							<span style="color:red" class="cancelProp">不在库</span>
						</#if> 
					</td>
                    <td>${book.bookPrice!''} </td>
                    <td>${book.isbn!''} </td>
                    <td class="autocut" style="white-space:nowrap;overflow: hidden;text-overflow:ellipsis" title="${book.bookIntroduction!''}">${book.bookIntroduction!''} </td>
                    <td>
                        <#if book.isValid?? && book.isValid == 'Y'>
                            <span style="color:green" class="cancelProp">有效</span>
                        <#else>
                            <span style="color:red" class="cancelProp">无效</span>
                        </#if>
                    </td>
					<td class="oper">
						<a class="editDict" href="javascript:;" data="${book.bookId!''}" data2="" >编辑</a>

						<a href="javascript:;"  class="editFlag" data1="${book.bookId!''}" data2="${book.isValid}">${(book.isValid=='Y')?string("设为无效", "设为有效")}</a>

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
<script type="text/javascript" src="${basePath}/js/ztree/jquery.ztree.core.js"></script>
<script type="text/javascript" src="${basePath}/js/ztree/jquery.ztree.excheck.js"></script>
<script type="text/javascript" src="${basePath}/js/ztree/jquery.ztree.exedit.js"></script>
<script type="text/javascript" src="${basePath}/js/jquery.barcode.js"> </script>
<script>
//属性列表弹出框对象，不要有重名的
var dictPropDefListDialog, dictPropListDialog, updateDialog,updateDictPropDialog;

$(function(){

    //搜索表单中显示组织树供用户选择
    $(".JS_choose_supp_group").bind('click', function () {

        var nodeList=JSON.parse($("#nodeList").val());
        if(nodeList && nodeList.length > 0){

            initData(nodeList);
            $("#retrieveSuppGroupContent").slideDown("fast");
            $("body").bind("mousedown", onBodyDown);
        }else {
            $.alert("暂无图书分类，此次添加可不选择，保存成功为图书一级分类");
        }


    });
    //重置搜索表单中组织树的选择
    $(".JS_reset_supp_group").bind('click', function () {
        $("#bookTypeName").val('');
        $("#bookTypeId").val(0);
    });
    function initData(nodeList) {
        var _selectTreeSetting = {
            view: {
                dblClickExpand: false,
                showIcon: false,
                selectedMulti: false
            },
            data: {
                simpleData: {
                    enable: true
                }
            },
            callback: {
                onClick: suppGroupChecked
            }
        };
        if(nodeList){
            $.fn.zTree.init($("#suppGroupTree"), _selectTreeSetting, nodeList);
        }
    }
    //点击body隐藏下拉列表事件
    function hideMenu() {
        $("#retrieveSuppGroupContent").fadeOut("fast");
        $("body").unbind("mousedown", onBodyDown);
    }
    function onBodyDown(event) {
        if (!(event.target.id == "menuBtn" || event.target.id == "retrieveSuppGroupContent" || $(event.target).parents("#retrieveSuppGroupContent").length>0)) {
            hideMenu();
        }
    };
    //查询表单中组织被选中时隐藏下拉列表
    function suppGroupChecked(e, treeId, treeNode) {
        var _newGroupName = treeNode.name,
                tempTreeNode = treeNode.getParentNode(),
                $ebkSupplierGroupIdInput = $("#bookTypeId");
        while(!!tempTreeNode){
            _newGroupName = tempTreeNode.name + " > " + _newGroupName;
            tempTreeNode = tempTreeNode.getParentNode();
        }

        var $tempSuppGroupName = $("#bookTypeName");
        $tempSuppGroupName.attr("value", _newGroupName);
        hideMenu();
        $ebkSupplierGroupIdInput.val(treeNode.id);
    }

	$("#search_button").bind("click",function(){
		$("#searchForm").submit();
	});
    //新增
    $("#addUser_button").on('click',function(){
        var url = "${basePath}/book/showAddBookBySelf.do";
        updateDialog = new xDialog(url, {}, {title:"手动新增书籍",width:1200});
    });

    //扫描新增
    $("#atuoAddBook_button").on('click',function(){
        var url = "${basePath}/book/showAddBookByAuto.do";
        updateDialog = new xDialog(url, {}, {title:"自动新增书籍",width:1200});
    });

    //修改
    $("a.editDict").on('click',function(){
        var bookId = $(this).attr("data");
        var url = "${basePath}/book/showUpdateBook.do?bookId="+bookId;
        updateDialog = new xDialog(url, {}, {title:"修改书籍信息",width:1200});
    });



	
	//设置状态
	$("a.editFlag").bind("click",function(){
		 var bookId=$(this).attr("data1");
		 var isValid=$(this).attr("data2") == "N" ? "Y": "N";
		 var url = "${basePath}/book/updateBookState.do?bookId="+bookId+"&isValid="+isValid;
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

