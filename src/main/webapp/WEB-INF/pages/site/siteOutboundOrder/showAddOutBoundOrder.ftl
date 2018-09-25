<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/html">
<head>
</head>
<body>
<form id="dataForm">
    <table class="p_table form-inline">
        <tbody>
            <input  type="hidden" id="siteId" name="siteId" value="${user.siteId}"/>
            <input  type="hidden" id="userId" name="userId" value="${user.id}"/>
            <tr>
                <td class="p_label"><i class="cc1">*</i>车牌号：</td>
                <td>
                    <input type="text"  id="plateNumber" name="plateNumber"  class="form-control w270 search js_supplierName" required="true" errorele="searchValidate"  maxlength="20"/>
                    <input type="hidden"  id="carId" name="carId"/>
                </td>

                <td class="p_label"><i class="cc1">*</i>方数：</td>
                <td>
                    <input type="text"  id="vehicle" name="vehicle"  errorele="searchValidate" readonly/>
                </td>
            </tr>


            <tr>

                <td class="p_label"><i class="cc1">*</i>单价</td>
                <td>
                    <input type="text"  id="price" name="price" errorele="searchValidate" 	number="true" required="true" maxlength="100">
                </td>

                <td class="p_label">金额</td>
                <td>
                    <input type="text"  id="amount" name="amount" errorele="searchValidate"  maxlength="100" readonly>
                </td>
            </tr>


            <tr>
                <td class="p_label">投放点</td>
                <td>
                    <input type="text"  id="dropPointId" name="dropPointId" errorele="searchValidate"  maxlength="100">
                </td>

                <td class="p_label">备注：</td>
                <td>
                    <input type="text"  id="memo" name="memo" errorele="searchValidate"  maxlength="1000">
                </td>
            </tr>

        </tbody>
    </table>

</form>
<button class="pbtn pbtn-small btn-ok" style="float: right; margin-top: 20px;" id="saveButton">保存</button>

<script type="text/javascript" src="${basePath}/bootstrap/js/My97DatePicker/WdatePicker.js"</script>
<script type="text/javascript" src="${basePath}/bootstrap/js/jquery-1.7.2.min.js" </script>
<script>
    vst_pet_util.commListSuggest("#plateNumber", "#carId",'/site/siteCar/searchCarList.do','');
</script>

<script type="text/javascript">
    $(function(){
        $("#carId").on('input propertychange',function(){
        debugger;
        alert("niha ");
        })
    })


    $(document).ready(function () {

        $("#carId").bind('input propertychange',function(){
            debugger;
            alert("niha ");
        })
    })


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