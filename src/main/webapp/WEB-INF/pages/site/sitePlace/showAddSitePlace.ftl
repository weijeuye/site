<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/html">
<head>
</head>
<body>
<form id="dataForm">
    <table class="p_table form-inline">
        <tbody>
            <tr>
             
                <input type="hidden"  id="id" name="id"  value="${site.id!''}" />
                <#if site.siteNumber??>
                    <td class="p_label"><i class="cc1">*</i>工地编号：</td>
                    <td><input type="text" id="siteNumber" name="siteNumber" required="true"  value="${site.siteNumber!''}" disabled/> </td>
                </#if>
                <td class="p_label"><i class="cc1">*</i>工地名称：</td>
                <td>
                    <input type="text"  id="siteName" name="siteName" required="true" errorele="searchValidate" value="${site.siteName!''}" maxlength="20"/>
                </td>
            </tr>

            <tr>
                <td class="p_label">备注：</td>
                <td>
                    <input type="text"  id="memo" name="memo" errorele="searchValidate" value="${site.memo!''}" maxlength="100">
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
            url : "${basePath}/sitePlace/saveSitePlace.do",
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