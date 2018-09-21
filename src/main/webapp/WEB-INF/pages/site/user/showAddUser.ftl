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
                <input type="hidden"  id="id" name="id"  value="${user.id!''}" />
                <td><input type="text" id="account" name="account" required="true" digits:true value="${user.account!''}" <#if user.account?? >readonly </#if> </td>
                <td class="p_label"><i class="cc1">*</i>姓名：</td>
                <td>
                    <input type="text" class="searchInput" id="alias" name="alias" required="true" errorele="searchValidate" value="${user.alias!''}" maxlength="20"/>
                </td>
            </tr>

            <tr>
                <td class="p_label">性别：</td>
                <td>
                    <select id="gender" name="gender">
                        <#if user.gender??>
                            <option value="M" <#if user.gender=='M'>selected</#if>>男</option>
                            <option value="F" <#if user.gender=='F'>selected</#if>>女</option>

                        <#else>
                            <option value="M" selected>男</option>
                            <option value="F" >女</option>
                        </#if>
                    </select>
                </td>
                <td class="p_label">电话：</td>
                <td>
                    <input type="text"  id="phone" name="phone" errorele="searchValidate"  value="${user.phone!''}" maxlength="11" placeholder="请输入十一位手机号码">
                </td>
               <#-- <td class="p_label"><i class="cc1">*</i>出生日期：</td>
                <td>
                   &lt;#&ndash; ${(user.birthday?string("yyyy-MM-dd"))!''}&ndash;&gt;
                    <input type="text" id="birthday" name="birthday" errorele="searchValidate" class="Wdate" onfocus="WdatePicker({dateFmt:'yyyy-MM-dd'})" value="${user.birthday!''}" required="true"/>
                </td>-->
            </tr>



            <tr>
                <td class="p_label">工地：</td>
                <td>
                    <input type="hidden"  id="siteId" name="siteId" errorele="searchValidate" value="${user.siteId!''}" maxlength="100">
                    <input type="text"  class="form-control w270 search js_supplierName" id="siteName" name="siteName" errorele="searchValidate" value="${user.siteName!''}" maxlength="100">
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
    vst_pet_util.commListSuggest("#siteName", "#siteId",'/site/sitePlace/searchSiteList.do','');
</script>
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
        var phone=$("#phone").val();
        if( !testTelephone ("账号输入框",phone)){
            return false;
        }

        $.ajax({
            url : "${basePath}/siteUser/addUser.do",
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