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
                    <input type="hidden"  id="carId" name="carId" />
                    <input type="hidden"  id="carTeamId" name="carTeamId" />
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
                    <input type="text"  id="dropPoint" name="dropPoint" class="form-control w270 search js_supplierName" errorele="searchValidate"  maxlength="100">
                    <input type="hidden"  id="dropPointId" name="dropPointId" errorele="searchValidate"  maxlength="100">
                </td>


                <td class="p_label">公里数：</td>
                <td>
                    <input type="text"  id="mileage" name="mileage" errorele="searchValidate"  maxlength="1000" readonly>
                </td>


            </tr>

            <tr>
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
    vst_pet_util.commListSuggest("#dropPoint", "#dropPointId",'/site/siteDropPoint/searchCarList.do','');
</script>

<script type="text/javascript">
    $(function(){
        $(document).ready(function () {
        })
    })

    $("#price").bind('input propertychange',function(){
        var price=this.value;
        var vehicle=$("#vehicle").val();
        calAmount(price,vehicle);

    })
    //计算金额
    function calAmount(price,vehicle) {
        if(price && price!='' && vehicle && vehicle!=""){
            var amount=Number(price)* Number(vehicle);
            if(!isNaN(amount)){
                $("#amount").val(amount);
            }
        }else {
            $("#amount").val("");
        }
    }
    //根据车牌号带出方数
    $("#carId").bind('input propertychange',function(){
        debugger;
        var id=this.value;
        if(id && id!='') {
            var url = "${basePath}/siteCar/getSingle.do?id=" + id;
            $.ajax({
                url: url,
                type: "get",
                dataType: "json",
                success: function (result) {
                    if (result.code = "success" && result.attributes!=null) {
                        var car = result.attributes.car;
                        $("#vehicle").val(car.vehicle);
                        $("#carTeamId").val(car.carTeamId);
                        var price= $("#price").val();
                        var vehicle=$("#vehicle").val();
                        calAmount(price,vehicle);
                    }
                }
            })
        }else {
            $("#vehicle").val("");
        }
        var price=$("#price").val();
        var vehicle=$("#vehicle").val();
        calAmount(price,vehicle);
    });
    //录入投放点带出公里数
    $("#dropPointId").bind('input propertychange',function(){
        debugger;
        var dropPointId=this.value;
        if(dropPointId && dropPointId!='') {
            var url = "${basePath}/siteDropPoint/getSingle.do?id=" + dropPointId;
            $.ajax({
                url: url,
                type: "get",
                dataType: "json",
                success: function (result) {
                    if (result.code = "success" && result.attributes!=null) {
                        var siteDropPoint = result.attributes.siteDropPoint;
                        $("#mileage").val(siteDropPoint.mileage);
                    }
                }
            })
        }else {
            $("#mileage").val("");
        }
        var price=$("#price").val();
        var vehicle=$("#vehicle").val();
        calAmount(price,vehicle);
    });

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
            url : "${basePath}/siteOrder/addOrder.do",
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