<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/html" xmlns="http://www.w3.org/1999/html">
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
<button class="pbtn pbtn-small btn-ok" style="float: right; margin-top: 20px;" id="printDesignButton">打印</button>

<script type="text/javascript" src="${basePath}/bootstrap/js/My97DatePicker/WdatePicker.js"></script>
<script type="text/javascript" src="${basePath}/lodop/LodopFuncs.js"></script>
<script type="text/javascript" src="${basePath}/lodop/my.js"></script>
<script type="text/javascript" src="${basePath}/lodop/jquery.tmpl.js"></script>
<script type="text/javascript" src="${basePath}/bootstrap/js/vst_pet_util.js"></script>

<script>
    vst_pet_util.commListSuggest("#plateNumber", "#carId",'${basePath}/siteCar/searchCarList.do','');
    vst_pet_util.commListSuggest("#dropPoint", "#dropPointId",'${basePath}/siteDropPoint/searchDropPointList.do','');
</script>
<!-- 打印模版：出库单 -->
<script id="tmpl_print" type="text/x-jquery-tmpl" style="display: none">
    <div>
    <div id="print-header" style="height: 30%">
        <table class="header" cellpadding="0" cellspacing="0" style="width: 99%;">
            <tr>
                <td align="center" colspan="3">
                    <div style="width: 100%;height: 110px;position: relative;">

                        <h2 style="width: 60%;margin:0 auto;line-height: 80px;">{{= data.siteName}} 出库单</h2>

                    </div>
                </td>
            </tr>
            <tr valign="bottom">
                <td style="width: 35%"><b>工地：</b>{{= data.siteName}}</td>
                <td style="width: 30%"><b>发货单号：</b>{{= data.billNo}}</td>
                <td style="width: 35%;text-align:right;" ><b>出库日期：</b>{{= toFormatDate(data.createTime, 'yyyy.MM.dd')}}</td>
            </tr>
        </table>
    </div>
    <div id="print-body" style="height: 3px">
        <table class="body" cellpadding="20" cellspacing="0" style="width: 99%;" >
            <thead>
                <tr>
                    <th width="8%">车牌号</th>
                    <th width="12%">司机</th>
                    <th width="17%">投放点</th>
                    <th width="12%">方数</th>
                    <th width="5%">单价(/方)</th>
                    <th width="5%">金额(元)</th>
                    <th width="8%">金额(大写)</th>
                    <th width="8%">备注</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>{{= data.plateNumber}}</td>
                    <td>{{= data.driver}}</td>
                    <td>{{= data.dropPoint}}</td>
                    <td>{{= data.vehicle}}</td>
                    <td align="center">{{= data.price}}</td>
                    <td align="center">{{= data.amount}}</td>
                    <td align="right">{{= toFormatMoney(data.amount, 3)}}</td>
                    <td align="center">{{= data.memo}}</td>

                </tr>
            <tbody>
           <#-- <tfoot>
                <tr>
                    <td>本页小计</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td align="center" tdata="subSum">###</td>
                    <td align="right" tdata="subSum" format="#,##0.000">######</td>
                    <td align="center" tdata="subSum">###</td>
                </tr>
                <tr>
                    <td>合计</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td align="center">{{if data.allNum}}{{= data.allNum}}{{else}}0{{/if}}</td>
                    <td align="right">{{= toFormatMoney(data.allMoney, 3)}}</td>
                    <td align="center">{{if data.allgetNum}}{{= data.allgetNum}}{{else}}0{{/if}}</td>
                </tr>
            </tfoot>-->
        </table>
    </div>
    <div id="print-footer"  style="height: 15%">
        <table class="footer" cellpadding="0" cellspacing="0" style="width: 90%;">
            <tr>
                <td align="right"><b>出库人：</b>{{= data.alias}}</td>
            </tr>
            <#--<tr>
                <td><b>配送人：</b>{{= data.deliveryPerson}}</td>
                <td><b>发货时温湿度：</b></td>
                <td><b>收货时温湿度：</b></td>
            </tr>
            <tr>
                <td><b>配送人联系电话：</b>{{= data.deliveryContact}}</td>
                <td><b>收货人：</b></td>
                <td><b>收货时间：</b></td>
            </tr>-->
        </table>
    </div>
    <div id="print-pages"  style="height: 15%">
        <p style='text-align:center;font-size:12px;'>
            页码：<span tdata='pageNO'>第 ## 页</span> / <span tdata='pageCount'>共 ## 页</span>
        </p>
    </div>
    </div>
</script>
<script type="text/javascript">


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
                    var outboundOrder=result.attributes.outboundOrder;
                    if(outboundOrder){
                        print(outboundOrder)
                    }
                    updateDialog.close();
                    window.location.reload();
                } else {
                    $.alert(result.message);
                }
            }
        });
    });
    $("#printDesignButton").on("click",function () {
        $.ajax({
            url : "${basePath}/siteOrder/testOrderPrint.do",
            type : "get",
            dataType : "json",
            //async : false,
            data : "",
            success : function(result) {
                if (result.code == "success") {
                    $.alert(result.message);
                    var outboundOrder=result.attributes.outboundOrder;
                    if(outboundOrder){
                        print(outboundOrder)
                    }
                    updateDialog.close();
                    window.location.reload();
                } else {
                    $.alert(result.message);
                }
            }
        });
        //printDesign();
    })
    function printDesign(){
        LODOP = getLodop();
        if (!LODOP) {
            return false;
        }
        LODOP.PRINT_DESIGN();
    }
    function print(outboundOrder) {
        // 数据、打印组件初始化
        $('#print-area').remove();
        $('<div></div>').prop('id', 'print-area').hide().appendTo('body');
        $("#tmpl_print").tmpl({data: outboundOrder}).appendTo('#print-area');
        var strBodyStyle='<style>body { margin: 0; padding: 0; border: 0;} table tr { font-size: 12px; line-height: 20px; }' +
                'table.body  { border-bottom: 1px solid #800000; border-right: 1px solid #800000; } table.body th,table.body ' +
                'td { border-left: 1px solid #800000; border-top: 1px solid #800000; font-weight: normal; padding: 1px; }' +
                'table.body td { padding: 0 5px; } table.header tr, table.footer tr { font-size: 14px; } </style>';
        LODOP = getLodop();
        if (!LODOP) {
            return false;
        }
        LODOP.PRINT_INIT("");
        LODOP.SET_PRINT_PAGESIZE(2,1400,2400,"241-XX"); // 0 操作者自行决定或打印机缺省设置 1 纵向打印，固定纸张；2 横向打印，固定纸张
        // LODOP.SET_PREVIEW_WINDOW(1,0,0,1000,600,""); // 初始预览窗口大小
        LODOP.SET_SHOW_MODE("LANDSCAPE_DEFROTATED",1); // 横向打印时正向显示
        LODOP.SET_SHOW_MODE("HIDE_PAPER_BOARD",1); // 去除背景滚动线
        LODOP.SET_PRINT_MODE("AUTO_CLOSE_PREWINDOW",1); // 打印后自动关闭预览
        LODOP.SET_PRINT_MODE("CUSTOM_TASK_NAME","出库单打印"); // 打印队列中的文档名

        // 追加打印头部
        LODOP.ADD_PRINT_TABLE(5,5,"100%",180,strBodyStyle + $('#print-header').html());
        LODOP.SET_PRINT_STYLEA(0,"ItemType",1); // 页眉页脚项

        // 追加打印主体：分页、循环表格
        LODOP.ADD_PRINT_TABLE(185,5,"100%",370, strBodyStyle + $('#print-body').html());
        // LODOP.SET_PRINT_STYLEA(0,"Vorient",3);

        // 追加打印底部
        LODOP.ADD_PRINT_TABLE(570,5,"100%",150,strBodyStyle + $('#print-footer').html());
        LODOP.SET_PRINT_STYLEA(0,"ItemType",1); // 页眉页脚项
        LODOP.SET_PRINT_STYLEA(0,"LinkedItem",2);

        LODOP.NewPageA();

        // 追加页码
        LODOP.ADD_PRINT_HTM(745,5,"100%",15,$('#print-pages').html());
        LODOP.SET_PRINT_STYLEA(0,"ItemType",1);
        // LODOP.SET_PRINT_STYLEA(0,"LinkedItem",3);
        LODOP.SET_PRINT_STYLEA(0,"Horient",1);

        LODOP.PREVIEW();
    }
</script>
</body>
</html>