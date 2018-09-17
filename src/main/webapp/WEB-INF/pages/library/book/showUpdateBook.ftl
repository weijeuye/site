<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/html">
<head>
</head>
<body>
<form id="uatoAddBookDialogDataForm">
    <input id="nodeList" type="hidden" name="nodeList" value=${nodeList} disabled=“true”>
    <table class="p_table form-inline">
        <tbody>
        <tr>

            <td class="p_label"><i class="cc1">*</i>账号：</td>
            <input type="hidden" id="bookId" name="bookId" value="${book.bookId!''}">
            <td><input type="text" id="isbn" name="isbn" required="true"  class="searchInput" value="${book.isbn!''}" readonly></td>
        </tr>
        <tr>
            <td class="p_label"><i class="cc1">*</i>数量：</td>
            <td>
                <input type="text"  id="bookNum" name="bookNum" errorele="searchValidate" value="${book.bookNum!''}">
            </td>


        </tr>
        <tr>
            <td class="p_label"><i class="cc1">*</i>价格：</td>
            <td>
                <input type="text"  id="bookPrice" name="bookPrice" errorele="searchValidate" required="true" value="${book.bookPrice!''}">
            </td>
        </tr>
        <tr>
            <td class="p_label"><i class="cc1">*</i>图书分类：</td>
            <td>
                <label><input type="text" class="w320 form-control" id="bookTypeName" name="bookTypeName" disabled value="${book.bookTypeName!''}"></label>
                <input id="bookTypeId" name="bookTypeId" type="hidden" class="input-text" type="text" value="${book.bookTypeId!''}" />
                <a href="javascript:" class="sellectBookTypeButton mr10" data-id="1" disabled>[选择图书分类]</a>
                <a href="javascript:void(0);" class=" resetBookTypeButton" data-id="1">重置</a>
            </td>
            <!--自己增加开始-->
            <div id="retrieveSuppGroupContent" class="menuContent retrieveSuppGroupContent" style="display:none; position: absolute; top: 199px; left: 125px">
                <ul id="suppGroupTree" class="ztree" style="margin-top:0; width:160px;"></ul>
            </div>
            <!--自己增加结束-->
        </tr>
        <tr>
            <td class="p_label"><i class="cc1">*</i>书籍名称：</td>
            <td>
                <input type="text"  id="bookName" name="bookName" required="true" errorele="searchValidate" style="width:300px; height:25px;" value="${book.bookName!''}"/>
            </td>
        </tr>
        <tr>
            <td class="p_label"><i class="cc1">*</i>作者：</td>
            <td>
                <input type="text"  id="bookAuthor" name="bookAuthor" errorele="searchValidate" required="true" style="width:300px; height:25px;" value="${book.bookAuthor!''}">
            </td>
        </tr>
        <tr>

            <td class="p_label">出版时间：</td>
            <td>
            <#--&lt;#&ndash; ${(user.birthday?string("yyyy-MM-dd"))!''}&ndash;&gt;-->
                <input type="text" id="bookPubTime" name="bookPubTime" errorele="searchValidate" class="Wdate" onfocus="WdatePicker({dateFmt:'yyyy-MM-dd'})" value="${book.bookPubTime?string("yyyy-MM-dd")}"/>
            </td>
        </tr>
        <tr>
            <td class="p_label"><i class="cc1">*</i>出版社：</td>
            <td>
                <input type="text"  id="bookPub" name="bookPub" errorele="searchValidate" required="true" style="width:400px; height:25px;" value="${book.bookPub!''}">
            </td>
        </tr>

        <tr>
            <td class="p_label"><i class="cc1">*</i>图片链接：</td>
            <td>
                <input type="text"  id="bookImg" name="bookImg" errorele="searchValidate" style="width:300px; height:40px;" value="${book.bookImg!''}">
                <img  id="imgSrc" src="" style="width: 100px; height:40px; display: none">
            </td>
        </tr>
        <tr height="100px">
            <td class="p_label">简介：</td>
            <td colspan="3">
                <textarea id="bookIntroduction" name="bookIntroduction" style="width:900px; height:100px;" >${book.bookIntroduction!''}"</textarea>
            </td>
        </tr>

        </tbody>
    </table>
    <input type="hidden" id="cancelFlag" name="cancelFlag" value="N" disabled=“true”/>

</form>
<button class="pbtn pbtn-small btn-ok" style="float: right; margin-top: 20px;" id="saveButton">保存</button>

<script type="text/javascript" src="${basePath}/bootstrap/js/My97DatePicker/WdatePicker.js"></script>
<script type="text/javascript" src="${basePath}/js/jquery.barcode.js"> </script>
<script type="text/javascript" src="${basePath}/js/ztree/jquery.ztree.core.js"></script>
<script type="text/javascript" src="${basePath}/js/ztree/jquery.ztree.excheck.js"></script>
<script type="text/javascript" src="${basePath}/js/ztree/jquery.ztree.exedit.js"></script>


<script>

    $("#uatoAddBookDialogDataForm").validate({
        rules: {
            airline: "required"
        }
    });

    //保存
    $("#saveButton").on("click", function() {
        debugger;
        if(!$("#uatoAddBookDialogDataForm").validate().form()){
            return false;
        }
        $.ajax({
            url : "${basePath}/book/updateBook.do",
            type : "post",
            dataType : "json",
            //async : false,
            data : $("#uatoAddBookDialogDataForm").serialize(),
            success : function(result) {
                if (result.code == "success") {
                    $.alert(result.message);
                    updateDialog.close();
                    window.location.reload();
                } else {
                    $.alert(result.message);
                }
            }
        });
    });
    //搜索表单中显示组织树供用户选择
    $(".sellectBookTypeButton").bind('click', function () {

        var nodeList=JSON.parse($("#nodeList").val());
        debugger;
        if(nodeList && nodeList.length > 0){

            initData(nodeList);
            $("#retrieveSuppGroupContent").slideDown("fast");
            $("body").bind("mousedown", onBodyDown);
        }else {
            $.alert("暂无图书分类，此次添加可不选择，保存成功为图书一级分类");
        }


    });
    //重置搜索表单中组织树的选择
    $(".resetBookTypeButton").bind('click', function () {
        debugger;
        $("#bookTypeName").val('');
        $("#bookTypeId").val('');
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

</script>
</body>
</html>