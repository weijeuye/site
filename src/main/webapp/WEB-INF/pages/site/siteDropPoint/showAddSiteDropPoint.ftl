<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/html">
<head>
</head>
<body>
<form id="dataForm">
    <table class="p_table form-inline">
        <tbody>
            <tr>
             
                <#--<td class="p_label"><i class="cc1">*</i>投放点编号：</td>
                <input type="hidden"  id="id" name="id"  value="${siteDropPoint.id!''}" />
                <td><input type="text" id="siteDropPointNumber" name="siteDropPointNumber" required="true"  value="${siteDropPoint.siteDropPointNumber!''}" <#if siteDropPoint.siteDropPointNumber?? >readonly </#if> </td>-->


                 <td class="p_label"><i class="cc1">*</i>投放点名称：</td>
                <td>
                    <input type="text"  id="dropPoint" name="dropPoint" required="true" errorele="searchValidate" value="${siteDropPoint.dropPoint!''}" maxlength="20"/>
                </td>

                    <td class="p_label"><i class="cc1">*</i>公里数：</td>
                    <input type="hidden"  id="id" name="id"  value="${siteDropPoint.id!''}" />
                    <td><input type="text" id="mileage" name="mileage" digits="true"  value="${siteDropPoint.mileage!''}"</td>
            </tr>

            <tr>
                <td class="p_label">备注：</td>
                <td>
                    <input type="text"  id="memo" name="memo" errorele="searchValidate" value="${siteDropPoint.memo!''}" maxlength="100">
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

    //保存
    $("#saveButton").on("click", function() {
        debugger;
        if(!$("#dataForm").validate().form()){
            return false;
        }

        $.ajax({
            url : "${basePath}/siteDropPoint/saveSiteDropPoint.do",
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