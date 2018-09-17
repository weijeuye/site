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
                <td><input type="text" id="isbn" name="isbn" required="true"  class="searchInput" placeholder="请用扫描枪扫描书籍的ISBN号"></td>
            </tr>
            <tr>
                <td class="p_label"><i class="cc1">*</i>数量：</td>
                <td>
                    <input type="text"  id="bookNum" name="bookNum" errorele="searchValidate" digits="true">
                </td>


            </tr>
            <tr>
                <td class="p_label"><i class="cc1">*</i>价格：</td>
                <td>
                    <input type="text"  id="bookPrice" name="bookPrice" errorele="searchValidate" required="true"number="true" >
                </td>
            </tr>
            <tr>
                <td class="p_label"><i class="cc1">*</i>图书分类：</td>
                <td>
                    <label><input type="text" class="w320 form-control" id="bookTypeName" name="bookTypeName" disabled value="" required="true" ></label>
                    <input id="bookTypeId" name="bookTypeId" type="hidden" class="input-text" type="text" />
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
                    <input type="text"  id="bookName" name="bookName" required="true" errorele="searchValidate" style="width:300px; height:25px;"/>
                </td>
            </tr>
            <tr>
                <td class="p_label"><i class="cc1">*</i>作者：</td>
                <td>
                    <input type="text"  id="bookAuthor" name="bookAuthor" errorele="searchValidate" required="true" style="width:300px; height:25px;">
                </td>
            </tr>
            <tr>

                <td class="p_label"><i class="cc1">*</i>出版时间：</td>
                <td>
                <#--&lt;#&ndash; ${(user.birthday?string("yyyy-MM-dd"))!''}&ndash;&gt;-->
                    <input type="text" id="bookPubTime" name="bookPubTime" errorele="searchValidate" class="Wdate" onfocus="WdatePicker({dateFmt:'yyyy-MM-dd'})" required="true"/>
                </td>
            </tr>
            <tr>
                <td class="p_label"><i class="cc1">*</i>出版社：</td>
                <td>
                    <input type="text"  id="bookPub" name="bookPub" errorele="searchValidate" required="true" style="width:400px; height:25px;">
                </td>
            </tr>

            <tr>
                <td class="p_label">图片链接：</td>
                <td>
                    <input type="text"  id="bookImg" name="bookImg" errorele="searchValidate" style="width:300px; height:40px;">
                    <img  id="imgSrc" src="" style="width: 100px; height:40px; display: none">
                </td>
            </tr>
        <tr height="100px">
            <td class="p_label">简介：</td>
            <td colspan="3">
                <textarea id="bookIntroduction" name="bookIntroduction" style="width:900px; height:100px;"></textarea>
            </td>
        </tr>

        </tbody>
    </table>
    <input type="hidden" id="cancelFlag" name="cancelFlag" value="N" disabled=“true”/>

</form>
<#--<button class="pbtn pbtn-small btn-ok" style="float: right; margin-top: 20px;" id="testButton">测试</button>-->
<button class="pbtn pbtn-small btn-ok" style="float: right; margin-top: 20px;" id="saveButton">保存</button>

<script type="text/javascript" src="${basePath}/bootstrap/js/My97DatePicker/WdatePicker.js"></script>
<#--<script type="text/javascript" src="/library/bootstrap/js/jquery-1.7.2.min.js"> </script>-->
<script type="text/javascript" src="${basePath}/js/jquery.barcode.js"> </script>
<script type="text/javascript" src="${basePath}/js/ztree/jquery.ztree.core.js"></script>
<script type="text/javascript" src="${basePath}/js/ztree/jquery.ztree.excheck.js"></script>
<script type="text/javascript" src="${basePath}/js/ztree/jquery.ztree.exedit.js"></script>
<#--<script type="text/javascript" src="http://pic.lvmama.com/js/new_v/jquery-1.7.min.js"></script>
<script type="text/javascript" src="/library/bootstrap/js/novaDialog.js" ></script>-->

<script>


    $("#isbn").startListen({
        barcodeLen : 13,
        letter : false,
        number : true,
        show : function(code){
            $("#isbn").val(code);
            findIsbnInfo(code);
        }
    });
    $("#testButton").on("click",function () {
        var code=9787121232930;
        $("#isbn").val(code);
        //校验库存
        $.ajax({
            url : "${basePath}/book/findBookByIsbn.do?isbn="+code,
            type : "get",
            dataType : "json",
            //async : false,
            // data : $("#uatoAddBookDialogDataForm").serialize(),
            success : function(book) {
                if (book && book.bookNum) {
                    debugger;
                    $.alert("库中已存在该图书，当前数量为"+book.bookNum+",如要添加，请到图书信息修改中自行修改图书数量!");
                   /* $.confirm("库中已存在该图书，当前数量为"+book.bookNum+",确认要添加吗？", function () {
                        findIsbnInfo(code);
                    });*/

                } else {
                    findIsbnInfo(code);
                }
            }
        });
    });
    function findIsbnInfo(code){
        $.ajax({
            url : "${basePath}/book/findIsbnInfo.do?isbn="+code,
            type : "get",
            dataType : "json",
            //async : false,
           // data : $("#uatoAddBookDialogDataForm").serialize(),
            success : function(result) {
                if (result && result.book ) {

                    var book=result.book;
                    drawHtml(book);

                } else {
                    $.alert("无法查阅到本图书,请手动添加！");
                }
            }
        });
    }
        //渲染新增书籍页面
        function drawHtml() {
            var $dialogHtml=$("#uatoAddBookDialogDataForm");
            $dialogHtml.find("#bookName").val(book.bookName);
            $dialogHtml.find("#bookAuthor").val(book.bookAuthor);
            $dialogHtml.find("#bookPub").val(book.bookPub);
            $dialogHtml.find("#bookPubTime").val(timetrans(book.bookPubTime));
            $dialogHtml.find("#bookIntroduction").val(book.bookIntroduction);
            $dialogHtml.find("#bookPrice").val(book.bookPrice);
            $dialogHtml.find("#bookImg").val(book.bookImg);
            if(book.bookImg && book.bookImg !=''){

                $dialogHtml.find("#imgSrc").attr("src",book.bookImg).show();
            }


        }

        function timetrans(date){
            var date = new Date(date);//如果date为10位不需要乘1000
            var Y = date.getFullYear() + '-';
            var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
            var D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()) + ' ';
            var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
            var m = (date.getMinutes() <10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
            var s = (date.getSeconds() <10 ? '0' + date.getSeconds() : date.getSeconds());
            return Y+M+D;

        }

    /*//监听isbn input值变化事件
    $('#isbn').bind('input onKeyPress', function() {
        if($(this).val() && $(this).val()!=""){
            alert($(this).val());
        }
    });*/

    $("#uatoAddBookDialogDataForm").validate({
      rules: {
        airline: "required"
      }
    });
    
    //保存
    $("#saveButton").on("click", function() {

        if(!$("#uatoAddBookDialogDataForm").validate().form()){
            return false;
        }
        $.ajax({
            url : "${basePath}/book/saveBook.do",
            type : "post",
            dataType : "json",
            //async : false,
            data : $("#uatoAddBookDialogDataForm").serialize(),
            success : function(result) {
                if (result.code == "success") {
                    alert(result.message);
                    updateDialog.close();
                    window.location.reload();
                } else {
                    alert(result.message);
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