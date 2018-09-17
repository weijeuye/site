<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/html">
<head>

</head>
<body>
<div id="printdiv">
<form id="borrowBookForm">
    <table class="p_table form-inline">
        <tbody>
        <input type="hidden" id="bookId" name="bookId" value="${book.bookId!''}">
        <input type="hidden" id="borrowId" name="borrowId" value="${bookBorrow.borrowId!''}">

        <tr>

            <td class="p_label"><i class="cc1">*</i>ISBN号：</td>
            <td><input type="text" id="isbn" name="isbn" required="true"   value="${book.isbn!''}" disabled></td>
        </tr>
        <tr>
            <td class="p_label">借阅人：</td>
            <td>
                <input type="text"  id="userName" name="userName"  value="${user.userName!''}" disabled>
                <input type="hidden"  id="userId" name="userId" value="${user.userId!''}" >
            </td>


        </tr>
        <tr>
            <td class="p_label">总数：</td>
            <td>
                <input type="text"  id="bookNum" name="bookNum" errorele="searchValidate" value="${book.bookNum!0}" disabled >
            </td>
        </tr>
        <tr>
            <td class="p_label">在库数量：</td>
            <td>
                <input type="text"  id="bookLeftNum" name="bookLeftNum"  value="${book.bookLeftNum!0}" disabled>
            </td>
        </tr>
        <tr>
            <td class="p_label">价格：</td>
            <td>
                <input type="text"  id="bookPrice" name="bookPrice" errorele="searchValidate" required="true" value="${book.bookPrice!0}" disabled>
            </td>
        </tr>
        <tr>
            <td class="p_label">图书分类：</td>
            <td>
                <label><input type="text" class="w320 form-control" id="bookTypeName" name="bookTypeName" disabled value="${book.bookTypeName!''}" disabled></label>
            </td>
        </tr>
        <tr>
            <td class="p_label">书籍名称：</td>
            <td>
                <input type="text"  id="bookName" name="bookName" required="true" errorele="searchValidate" style="width:300px; height:25px;" value="${book.bookName!''}" disabled/>
            </td>
        </tr>
        <tr>
            <td class="p_label">作者：</td>
            <td>
                <input type="text"  id="bookAuthor" name="bookAuthor" errorele="searchValidate" required="true" style="width:300px; height:25px;" value="${book.bookAuthor!''}" disabled>
            </td>
        </tr>

        <tr>
            <td class="p_label">出版社：</td>
            <td>
                <input type="text"  id="bookPub" name="bookPub" errorele="searchValidate" required="true" style="width:400px; height:25px;" value="${book.bookPub!''}" disabled>
            </td>
        </tr>

        <tr>

            <td class="p_label">借书时间：</td>
            <td>
            <#--&lt;#&ndash; ${(user.birthday?string("yyyy-MM-dd"))!''}&ndash;&gt;-->
                <input type="text" id="borrowTime" name="borrowTime" errorele="searchValidate" class="Wdate" onfocus="WdatePicker({dateFmt:'yyyy-MM-dd'})" value="${bookBorrow.borrowTime?string("yyyy-MM-dd")}" required disabled/>
            </td>
        </tr>
        <tr>

            <td class="p_label">原计划还书时间：</td>
            <td>
                <input type="text"  id="oldReturnTime" errorele="searchValidate" class="Wdate" onfocus="WdatePicker({dateFmt:'yyyy-MM-dd'})" value="${bookBorrow.returnTime?string("yyyy-MM-dd")}" required  disabled/>
            </td>
        </tr>
        <tr>

            <td class="p_label"><i class="cc1">*</i>续借还书时间：</td>
            <td>
                <input type="text" id="returnTime" name="returnTime" errorele="searchValidate" class="Wdate" onfocus="WdatePicker({dateFmt:'yyyy-MM-dd'})"  required />
            </td>
        </tr>

        </tbody>
    </table>
</form>
</div>
<button class="pbtn pbtn-small btn-ok" style="float: right; margin-top: 20px;" id="saveButton">续借</button>
<button class="pbtn pbtn-small btn-ok" style="float: right; margin-top: 20px;" id="printButton">打印</button>

<script type="text/javascript" src="${basePath}/bootstrap/js/My97DatePicker/WdatePicker.js"></script>
<script type="text/javascript" src="${basePath}/js/jquery.barcode.js"> </script>
<script type="text/javascript" src="${basePath}/js/ztree/jquery.ztree.core.js"></script>
<script type="text/javascript" src="${basePath}/js/ztree/jquery.ztree.excheck.js"></script>
<script type="text/javascript" src="${basePath}/js/ztree/jquery.ztree.exedit.js"></script>
<script type="text/javascript" src="${basePath}/bootstrap/js/jquery.jqprint-0.3.js"></script>



<script>



    function printTest() {
        LODOP.PRINT_INIT("test套打");
        debugger;
        LODOP.ADD_PRINT_HTM(10,55,"100%","100%", $('#printdiv').html());
        //LODOP.PRINT(); //直接打印
        LODOP.PREVIEW(); //打印预览
    }

    $("#printButton").on("click", function() {
        printTest();
        /*$('#borrowBookForm').jqprint({
            debug: false,
            importCSS: true,
            printContainer: true,
            operaSupport: false
        });*/
        return false
    });
    $("#borrowBookForm").validate({
        rules: {
            airline: "required"
        }
    });

    //保存
    $("#saveButton").on("click", function() {
        if(!$("#borrowBookForm").validate().form()){
            return false;
        }
        var oldReturnTime=$("#oldReturnTime").val();
        var returnTime=$("#returnTime").val();
        if(!returnTime ||  returnTime==""){
            $.alert("请输入续借时间！");
            return;
        }
        if(returnTime < oldReturnTime ){
            $.alert("续借时间不能早于原计划还书时间");
            return;
        }
        $.ajax({
            url : "${basePath}/bookBorrow/borrowBookAgain.do",
            type : "post",
            dataType : "json",
            //async : false,
            data : $("#borrowBookForm").serialize(),
            success : function(result) {
                if (result.code == "success") {
                    alert(result.message);
                    updateDialog.close();
                    window.location.reload();
                } else {
                    $.alert(result.message);
                }
            }
        });
    });
    //查询数据信息
    $("#findBook_button").on("click", function() {
        var isbn=$("#isbn").val();
        if(!isbn || isbn==""){
            $.alert("请输入ISBN编号");
            return;
        }

        $.ajax({
            url : "${basePath}/book/findBookByIsbn.do",
            type : "get",
            dataType : "json",
            //async : false,
            data : {isbn:isbn},
            success : function(book) {
                if (book) {
                    drawHtml(book);
                   /* updateDialog.close();
                    window.location.reload();*/
                } else {
                    $.alert("未查询到改书,请检查isbn号是否正确！");
                }
            }
        });
    });
    function  drawHtml(book) {
       var $bookBorrowHtml=$("#borrowBookForm");
        $bookBorrowHtml.find("#bookNum").val(book.bookNum);
        $bookBorrowHtml.find("#bookLeftNum").val(book.bookLeftNum);
        $bookBorrowHtml.find("#bookPrice").val(book.bookPrice);
        $bookBorrowHtml.find("#bookTypeName").val(book.bookTypeName);
        $bookBorrowHtml.find("#bookName").val(book.bookName);
        $bookBorrowHtml.find("#bookAuthor").val(book.bookAuthor);
        $bookBorrowHtml.find("#bookPub").val(book.bookPub);
        $bookBorrowHtml.find("#bookId").val(book.bookId);

    }

</script>
</body>
</html>