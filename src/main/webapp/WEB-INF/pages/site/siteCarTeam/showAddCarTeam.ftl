<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/html">
<head>
</head>
<body>
<form id="dataForm">
    <table class="p_table form-inline">
        <tbody>
            <tr>

                <input type="hidden"  id="id" name="id"  value="${carTeam.id!''}" />
                <td class="p_label"><i class="cc1">*</i>车队名称：</td>
                <td><input type="text" id="carTeamName" name="carTeamName" required="true"  value="${carTeam.carTeamName!''}" <#if carTeam.carTeamName?? >readonly </#if> </td>
                <td class="p_label"><i class="cc1">*</i>负责人：</td>
                <td>
                    <input type="text"  id="personLiable" name="personLiable" required="true" errorele="searchValidate" value="${carTeam.personLiable!''}" maxlength="20"/>
                </td>
            </tr>

            <tr>
                <td class="p_label">联系方式：</td>
                <td>
                    <input type="text"  id="contactWay" name="contactWay" errorele="searchValidate" value="${carTeam.contactWay!''}" maxlength="100">
                </td>
                <td class="p_label">备注：</td>
                <td>
                    <input type="text"  id="memo" name="memo" errorele="searchValidate" value="${carTeam.memo!''}" maxlength="100">
                </td>
            </tr>



        </tbody>
    </table>

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
        var phone=$("#contactWay").val();
            if( !testTelephone ("联系方式输入框",phone)){
            return false;
        }
        var id=$("#id").val();
        if(id && id !=""){
            $.ajax({
                url : "${basePath}/siteCarTeam/updateCarTeam.do",
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
        }else {

            $.ajax({
                url : "${basePath}/siteCarTeam/addCarTeam.do",
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
        }
    });
    
    
</script>
</body>
</html>