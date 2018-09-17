<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/html">
<head>
</head>
<body>
<form id="dataForm">
    <table class="p_table form-inline">
        <tbody>
            <tr>
             
                <td class="p_label"><i class="cc1">*</i>账号：</td>
                <input type="hidden"  id="userId" name="userId"  value="${user.userId}" />
                <td><input type="text" id="userAccount" name="userAccount" required="true" digits:true value="${user.userAccount!''}" <#if user.userAccount?? >readonly </#if> placeholder="请输入父亲或者母亲的手机号作为账号"> </td>
                <td class="p_label"><i class="cc1">*</i>姓名：</td>
                <td>
                    <input type="text" class="searchInput" id="userName" name="userName" required="true" errorele="searchValidate" value="${user.userName!''}" maxlength="20"/>
                </td>
            </tr>

            <tr>
                <td class="p_label">性别：</td>
                <td>
                    <select id="gender" name="gender">
                        <#if user.gender??>
                            <option value="m" <#if user.gender=='m'>selected</#if>>男</option>
                            <option value="f" <#if user.gender=='f'>selected</#if>>女</option>

                        <#else>
                            <option value="m" selected>男</option>
                            <option value="f" >女</option>
                        </#if>
                    </select>
                </td>
                <td class="p_label"><i class="cc1">*</i>出生日期：</td>
                <td>
                   <#-- ${(user.birthday?string("yyyy-MM-dd"))!''}-->
                    <input type="text" id="birthday" name="birthday" errorele="searchValidate" class="Wdate" onfocus="WdatePicker({dateFmt:'yyyy-MM-dd'})" value="${user.birthday!''}" required="true"/>
                </td>
            </tr>

            <tr>
                <td class="p_label">学校：</td>
                <td>
                    <input type="text" id="school" name="school" value="${user.school!''}" maxlength="30">
                </td>
                <td class="p_label">班级：</td>
                <td>
                    <input type="text" id="className" name="className" value="${user.className!''}" maxlength="30">
                </td>
            </tr>

            <tr>
                <td class="p_label">父亲名字：</td>
                <td>
                    <input type="text" id="fatherName" name="fatherName" value="${user.fatherName!''}" maxlength="=30">
                </td>
                <td class="p_label">母亲名字：</td>
                <td>
                    <input type="text" id="motherName" name="motherName" value="${user.motherName!''}" maxlength="30">
                </td>
            </tr>

            <tr>
                <td class="p_label">父亲电话：</td>
                <td>
                    <input type="text"  id="fatherTelephone" name="fatherTelephone" errorele="searchValidate"  value="${user.fatherTelephone!''}" maxlength="11">
                </td>
                <td class="p_label">母亲电话：</td>
                <td>
                    <input type="text"  id="motherTelephone" name="motherTelephone" errorele="searchValidate"  value="${user.motherTelephone!''}" maxlength="11">
                </td>
            </tr>

            <tr>
                <td class="p_label">住址：</td>
                <td>
                    <input type="text"  id="address" name="address" errorele="searchValidate" value="${user.address!''}" maxlength="60">
                </td>
                <td class="p_label">备注：</td>
                <td>
                    <input type="text"  id="memo" name="memo" errorele="searchValidate" value="${user.memo!''}" maxlength="100">
                </td>
            </tr>

        </tbody>
    </table>
    <input type="hidden" id="cancelFlag" name="cancelFlag" value="N"/>

</form>
<button class="pbtn pbtn-small btn-ok" style="float: right; margin-top: 20px;" id="saveButton">保存</button>

<script type="text/javascript" src="${basePath}/bootstrap/js/My97DatePicker/WdatePicker.js"</script>
<script type="text/javascript" src="${basePath}/bootstrap/js/jquery-1.7.2.min.js" </script>
<script>
    
    $("#dataForm").validate({
      rules: {
        airline: "required"
      }
    });

    //手机号正则
    var r=/^((0\d{2,3}-\d{7,8})|(1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}))$/;


    function testTelephone(str,phone) {
        if(!phone || phone==""){
            return true;
        }
        if(!r.test(phone)){
            $.alert(str+"请输入正确的手机格式！");
            return false;
        };
        return true;
    }

    //保存
    $("#saveButton").on("click", function() {
        debugger;
        if(!$("#dataForm").validate().form()){
            return false;
        }
        var userAccount=$("#userAccount").val();
        var fatherTelephone=$("#fatherTelephone").val();
        var motherTelephone=$("#motherTelephone").val();
        if( !testTelephone ("账号输入框",userAccount)){
            return false;
        }
        if( !testTelephone ("父亲手机号输入框",fatherTelephone)){
            return false;
        }
        if( !testTelephone ("母亲手机号输入框",motherTelephone)){
            return false;
        }
        $.ajax({
            url : "${basePath}/user/saveUser.do",
            type : "post",
            dataType : "json",
            //async : false,
            data : $("#dataForm").serialize(),
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
    
    
</script>
</body>
</html>