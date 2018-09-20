<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/html">
<head>
</head>
<body>
<form id="dataForm">
    <table class="p_table form-inline">
        <tbody>
            <tr>

                <input type="hidden"  id="id" name="id"  value="${car.id!''}" />
                <td class="p_label"><i class="cc1">*</i>车牌号：</td>
                <td><input type="text" id="plateNumber" name="plateNumber" required="true"  value="${car.plateNumber!''}" <#if car.plateNumber?? >readonly </#if> </td>
                <td class="p_label"><i class="cc1">*</i>方数：</td>
                <td>
                    <input type="text"  id="vehicle" name="vehicle" required="true" errorele="searchValidate" value="${car.vehicle!''}" maxlength="20"/>
                </td>
            </tr>

            <tr>
                <td class="p_label">司机：</td>
                <td>
                    <input type="text"  id="driver" name="driver" errorele="searchValidate" value="${car.driver!''}" maxlength="100">
                </td>
                <td class="p_label">车队：</td>
                <td>
                    <input type="text"  id="carTeamId" name="carTeamId" errorele="searchValidate" value="${car.carTeamId!''}" maxlength="100">
                </td>
            </tr>

            <tr>
                <td class="p_label">颜色：</td>
                <td>
                    <input type="text"  id="carColor" name="carColor" errorele="searchValidate" value="${car.carColor!''}" maxlength="100">
                </td>
                <td class="p_label">备注：</td>
                <td>
                    <input type="text"  id="memo" name="memo" errorele="searchValidate" value="${car.memo!''}" maxlength="100">
                </td>
            </tr>

            <tr>
                <td class="p_label">是否加高：</td>
                <td>
                    <select id="isHeighten" name="isHeighten">
                    <#if car.isHeighten??>
                        <option value="Y" <#if car.isHeighten=='Y'>selected</#if>>加高</option>
                        <option value="N" <#if car.isHeighten=='N'>selected</#if>>无加高</option>

                    <#else>
                        <option value="Y" selected>加高</option>
                        <option value="N" >无加高</option>
                    </#if>
                    </select>
                </td>
                <td class="p_label">加高数量：</td>
                <td>
                    <input type="text"  id="heightenNumber" name="heightenNumber" errorele="searchValidate" value="${car.heightenNumber!''}" maxlength="100">
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
            url : "${basePath}/siteCar/saveCar.do",
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