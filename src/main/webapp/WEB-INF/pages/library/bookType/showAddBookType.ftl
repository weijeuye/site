<#--<link rel="stylesheet" href="http://pic.lvmama.com/min/index.php?f=/styles/backstage/v1/vst/base.css,/styles/v5/modules/dialog.css,/styles/lv/icons.css,/styles/lv/tips.css,/styles/backstage/v1/common.css,/styles/v5/ebk.css,/styles/v5/zTreeStyle.css" rel="stylesheet">-->

<style type="text/css">　　
 #parentType :{ position: relative}
</style>　
<form  id="dataForm">
   <#-- <input id="categoryId" type="hidden" name="categoryId" value="${bizCategory.categoryId!''}">
    <input id="cancelFlag" type="hidden" name="cancelFlag" value="${bizCategory.cancelFlag!''}"> -->
    <input id="nodeList" type="hidden" name="nodeList" value=${nodeList}>
    <table class="p_table form-inline">
    <tbody>
        <tr>
        	<td class="p_label">品类名称：<span class="notnull">*</span></td>
            <td><input autocomplete="off" type="text" name="bookTypeName"  required=true value="${bookType.bookTypeName!''}"></td>
            <input id="bookTypeId" type="hidden" name="bookTypeId" value="${bookType.bookTypeId!''}">
		</tr>
        <tr id="parentType">

        	<td class="p_label">品类上级：</td>
            <td>
                <label><input type="text" class="w320 form-control" id="bookTypeParentName" name="bookTypeParentName" disabled value="${bookType.bookTypeParentName!''}"></label>
                <input id="bookTypeParentId" name="bookTypeParentId" type="hidden" class="input-text" type="text" />
                <input id="oldSupplierGroupId" name="oldSupplierGroupId" type="hidden" />
                <input id="oldSupplierGroupName" name="oldSupplierGroupName" type="hidden" />
                <a href="javascript:" class="JS_choose_supp_group mr10" data-id="${bookType.bookTypeParentId!''}" disabled>[选择父级类型]</a>
                <a href="javascript:void(0);" class=" JS_reset_supp_group" data-id="${bookType.bookTypeParentId!''}">重置</a>
            </td>
            <!--自己增加开始-->
            <div id="retrieveSuppGroupContent" class="menuContent retrieveSuppGroupContent" style="display:none; position: absolute; top: 145px; left: 188px">
                <ul id="suppGroupTree" class="ztree" style="margin-top:0; width:160px;"></ul>
            </div>
            <!--自己增加结束-->

		</tr>

    </tbody>
    </table>
</form>
<script type="text/javascript" src="${basePath}/js/ztree/jquery.ztree.core.js"></script>
<script type="text/javascript" src="${basePath}/js/ztree/jquery.ztree.excheck.js"></script>
<script type="text/javascript" src="${basePath}/js/ztree/jquery.ztree.exedit.js"></script>
<script>

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
        $("#bookTypeParentName").val('');
        $("#bookTypeParentId").val('');
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
                $ebkSupplierGroupIdInput = $("#bookTypeParentId");
        while(!!tempTreeNode){
            _newGroupName = tempTreeNode.name + " > " + _newGroupName;
            tempTreeNode = tempTreeNode.getParentNode();
        }

        var $tempSuppGroupName = $("#bookTypeParentName");
        $tempSuppGroupName.attr("value", _newGroupName);
        hideMenu();
        $ebkSupplierGroupIdInput.val(treeNode.id);
    }
</script>
