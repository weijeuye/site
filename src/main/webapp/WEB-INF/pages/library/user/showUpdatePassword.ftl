<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/html">
<head>
</head>
<body>
<form id="dataForm">
    <input type="hidden" value="${user.userId!''}" name="bookUser.userId">
    <input type="hidden" value="${user.userAccount!''}" name="bookUser.userAccount">
    <table class="p_table form-inline">
        <tbody>

            <tr>
                <td class="p_label"><i class="cc1">*</i>原密码：</td>
                <td>
                    <input type="password"  id="oldPassword" name="oldPassword" style="width:200px; height:25px;"  required="true" />
                </td>
            </tr>

            <tr>
                <td class="p_label"><i class="cc1">*</i>新密码：</td>
                <td>
                    <input type="password"  id="newPassword" name="newPassword" required="true" style="width:200px; height:25px;"  maxlength="20"/>
                </td>
            </tr>

            <tr>
                <td class="p_label"><i class="cc1">*</i>确认新密码：</td>
                <td>
                    <input type="password"  id="comfirmNewPassword" name="comfirmNewPassword"  style="width:200px; height:25px;" required="true" />
                </td>

            </tr>


        </tbody>
    </table>

</form>
<button class="pbtn pbtn-small btn-ok" style="float: right; margin-top: 20px;" id="saveButton">确认修改</button>

<script type="text/javascript" src="${basePath}/bootstrap/js/My97DatePicker/WdatePicker.js"</script>
<script type="text/javascript" src="${basePath}/js/jquery.barcode.js"> </script>
<#--<script type="text/javascript" src="${basePath}/bootstrap/js/jquery-1.11.3.min.js" </script>-->
<script type="text/javascript">

$("#dataForm").validate({
    rules: {
        airline: "required"
    }
});
//保存
$("#saveButton").on("click", function() {
    debugger;
    if(!$("#dataForm").validate().form()){
        return false;
    }
    var oldPassword=$("#oldPassword").val();
    var newPassword=$("#newPassword").val();
    var comfirmNewPassword=$("#comfirmNewPassword").val();
    if(newPassword!=comfirmNewPassword ){
        $.alert("两次新密码不一致，请重新输入！");
        return false;
    }
    $.ajax({
        url : "${basePath}/user/updatePassWord.do",
        type : "post",
        dataType : "json",
        //async : false,
        data : $("#dataForm").serialize(),
        success : function(result) {
            if (result.code == "success") {
                alert(result.message);
                window.location.href= "${basePath}"+"/loginout.do";
            } else {
                $.alert(result.message);
            }
        }
    });
});


</script>
</body>
</html>
