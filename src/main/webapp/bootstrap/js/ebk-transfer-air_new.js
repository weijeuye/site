/*!
 * Author:      wang
 * Date:        2015-08-19
 * Description: EBK大交通-航班样式
 */
 
//<#---转换交通工具名称--->
function getTrafficName(type){
	return type == 'FLIGHT' ? '飞机' : type == 'SHIP' ? '轮船' : type == 'TRAIN' ? '火车' : type == 'BUS' ? '汽车' : ''; 
}

$(function(){
	var $baseInfo=$(".baseInfo");
	var $addTransferTemplate=$(".add_transfer_template");
	var $addZZ=$(".add_zz_transfer_template");
	var _transferSave=$(".transfer-save-one");
	var _transferSaveTwo=$(".transfer-save-two");
	var _transferSelect=$(".transfer-select");
	var _transferSelectGo=$(".transfer-select-go");
	var _transferSelectBack=$(".transfer-select-back");
	var _poptipTransfer=$(".poptip-transfer");
	var _transferContentShow=$(".transfer-content-show");
	var _getGoWay=$(".get-goway");
	var _getBackWay=$(".get-backway");
	var _transferDetail=$(".transfer-detail-default");
	var _transferContent=$(".transfer-content");
	var _transferModify=$(".transfer-modify");
	var _transferCancel=$(".transfer-cancel");
	var _addCKTransfer=$(".add_ckTransfer");
	var _addReferTransfer=$(".add_refer_transfer");
	
	var _saveTip=$(".save_tip_sub");
	var _baseInfoBg=$(".baseInfo_bg");
	var _saveTc=$(".transfer-save-next-tc");
	var _saveCancel=$(".transfer-cancel-next");
	
	var $referTable=$(".refer-table");
	
	//选择去程、返程
	_transferSelect.on('change',function(){
		if($(this).val()!=="请选择"){
			$(this).addClass("transfer-select-dark");
			}
		else{
			$(this).removeClass("transfer-select-dark");
			}
	});
	//选择去程、返程END
	
		
	//点击保存
	
	
	//点击修改
	/*_transferModify.on('click',function(){
		$(".transfer-save").addClass("transfer-save-two");
		_transferCancel.show();
		$(this).parent(".transfer-content").hide().siblings(".transfer-content").show();
	});*/
	//点击修改END
	
	
	//点击取消
	_transferCancel.on('click',function(){
		$(this).parent(".transfer-content").hide().siblings(".transfer-content").show();
	});
	
	$(".initplace_input").focus(function(){
		$(this).css({"color":"#333333"});	
	});
	
	//检索
	$referTable.on("click",".refer_search",function(){
		$(this).parents(".tr_state1").hide();
		$(this).parents(".tr_state1").next(".tr_state2").show();
		
		/*$(this).parents(".tr1").find("td").eq(1).attr("colspan",1);
		$(this).parents(".tr1").find("td").eq(1).html("上海春秋春秋春秋航空<br>波音TF738");
		$(this).parents(".tr1").find("td").eq(1).after("<td>凤凰国际机场航站楼T2<br>凤凰国际机场航站楼T2<span class='span_grey'>（经停）</span></td><td>23:25<br>01:25</td><td>10小时35分</td><td><select class='air-reference cang-reference'><option>经济舱</option><option>商务舱</option><option>头等舱</option></select></td><td><a class='a_blue' href='javascript:;'>添加中转</a></td>")*/
		
		/*$(this).parents(".tr1").find("td").eq(1).after("凤凰国际机场航站楼T2<br>凤凰国际机场航站楼T2<span class='span_grey'>（经停）</span>");
		$(this).parents(".tr1").find("td").eq(2).after("23:25<br>01:25");
		$(this).parents(".tr1").find("td").eq(3).after("10小时35分");
		$(this).parents(".tr1").find("td").eq(4).after("<select class='air-reference cang-reference'><option>经济舱</option><option>商务舱</option><option>头等舱</option></select>");
		$(this).parents(".tr1").find("td").eq(5).after("<a class='a_blue' href=''>删除</a>");*/
	})
	
	//添加中转
	$("#trafficContentDiv").on("click","tr .train_zz",function(event){
		event.stopPropagation();
		event.preventDefault();
		//var _addZZCon=$addZZ.find("table tbody").html();
		//$(this).parents("tr").after(_addZZCon);
		try{
			var appendContent =  $("#template_train_row_wrapper table tbody tr:eq(4)").clone();
			//修改‘中转1’提示信息
			var size = $(this).closest("tbody").find(".zhuan_icon:visible").size();
			appendContent.find(".zhuan_icon").text("中转" + (size + 1));
			$(this).closest("tbody").append(appendContent);	
		}catch(e) {
			console.error(e);
			alert(e);
		}
	});
	
	//删除添加中转
	$("#trafficContentDiv").on("click","tr .a_detele",function(event){
		var $current = $(event.target);
		var trainId = $current.parents("tr").attr("data");
		var $root = $current.parents("[name='to'],[name='back']");
		
		var toolType = null;
		if($root.attr("name") == 'to'){
			toolType = $("#selecTraffic_go_span").attr("value");
			if(typeof toolType == 'undefined') {
				toolType = $("#selecTraffic_go").val();
			}
		} else {
			toolType = $("#selecTraffic_back_span").attr("value");
			if(typeof toolType == 'undefined') {
				toolType = $("#selecTraffic_back").val();
			}
		}
	        	if(typeof trainId == 'undefined' || trainId == '') {
					var $tbody = $current.parents("tbody");
					$current.parents("tr").remove();	
					
					//修改'中转x'提示信息
					$tbody.find(".zhuan_icon:visible").each(function(n, item) {
						$(item).text("中转" + (n + 1));
					});
					return;
				}
				
				$.ajax({
					url : "/vst_ebooking/ebooking/prod/route/traffic/switchTrafficReference.do",
					type : "post",
					data :  {"toolType": toolType, "strIds": trainId},
					success : function(result) {
						if(result.code == "success"){
							var $tbody = $current.parents("tbody");
							$current.parents("tr").remove();	
							
							//修改'中转x'提示信息
							$tbody.find(".zhuan_icon:visible").each(function(n, item) {
								$(item).text("中转" + (n + 1));
							});
							backstage.alert({
								content:"删除中转成功"
							});
						} else {
							backstage.alert({
								content:result.message
							});
						}
					},
					error : function(result) {
						backstage.alert({
							content:"删除中转失败"
						});
					}
				});

	});
	
	//添加参考交通
	_addReferTransfer.on('click',function(){
		//var add_transfer_new=$addTransferTemplate.find(".transfer-detail-default").clone();
		var add_transfer_new=$addTransferTemplate.html();
		_transferDetail.after(add_transfer_new);	
	});
	
	
	//参考交通关闭
	/*$baseInfo.on("click", ".refer_close", function() {
		$(this).parents(".transfer-detail").remove();
	}); */

});
//点击弹出框取消
function cancelTC(){
	$(".baseInfo_bg").hide();
	$(".save_tip_sub").hide();
	$(".save_tip_mes").hide();
}	


/* add by huanggen*/
$(function(){
	//火车车次号输入框的onblur和onfocus事件处理
	$("#trafficContentDiv").on("focus", "[name=trainNo]", function(event){
		var $current = $(event.target);
		if(typeof $current.attr("old_value") == 'undefined') {
			$current.attr("old_value", $current.val());
		}
	});
	
	$("#trafficContentDiv").on("blur", "[name=trainNo]", function(event){
		var $current = $(event.target);
		var old_value = $current.attr("old_value");
		if(old_value != $current.val()) {
			$current.removeAttr("old_value");
			var $tr = $current.closest("tr");
			$tr.find("[name=startStationString]").empty();
			$tr.find("[name=arriveStationString]").empty();
			$tr.find("[name=startStation]").empty();
			$tr.find("[name=arriveStation]").empty();
			$tr.find("[name=startTime]").empty();
			$tr.find("[name=arriveTime]").empty();
			$tr.find("[name=costTimeHour]").empty();
			$tr.find("[name=costTimeMinute]").empty();
		}
	});
	
	//补全火车信息
	$("#trafficContentDiv").on("click", "input.refer_search[traffic_type='train']", function(){
		var $trainNo = $(this).siblings("[name=trainNo]");
		var trainNo = $trainNo.val();
		if(typeof trainNo == 'undefined' || trainNo == '') {
			$trainNo.parents("tr").find("[name=startStationString], [name=arriveStationString], [name=startTime]," 
					+"[name=arriveTime],[name=costTimeHour], [name=costTimeMinute]").text('');
			$trainNo.parents("tr").find("[name=startStation], [name=arriveStation], [name=trainSeatId]").empty();
			backstage.alert({
				content:"车次号必须提供"
			});
			return;
		}
		$.ajax({
			url : "/vst_ebooking/ebooking/prod/route/traffic/findTrain.do",
			type : "post",
			data : {"trainNo":trainNo},
			success : function(result) {
				var tr = $trainNo.closest("tr");
				if(result == null || result == '') {
					var customize_state = tr.attr("customize_state");
					if("error" == customize_state) {
						return;
					}
					var zzText = tr.find("i.zhuan_icon").text();
					var zzDisplay = tr.find("i.zhuan_icon").css("display");
					var content = $("#template_train_row_wrapper table tbody tr:eq(" + (zzDisplay == 'none'? 2: 3) + ")").clone();
					content.find("[name=trainNo]").val(trainNo);
					content.find("i.zhuan_icon").text(zzText);
					content.find("i.zhuan_icon").css("display", zzDisplay);
					content.attr("data", tr.attr("data"));
					tr.replaceWith(content);
				} else {
					var customize_state = tr.attr("customize_state");
					if("normal" != customize_state) {
						var zzText = tr.find("i.zhuan_icon").text();
						var zzDisplay = tr.find("i.zhuan_icon").css("display");
						var appendContent = $("#template_train_row_wrapper table tbody tr:eq(" + (zzDisplay == 'none'? 0 : 1) + ")").clone();
						appendContent.find("[name=trainNo]").val(trainNo);
						appendContent.find("i.zhuan_icon").text(zzText);
						appendContent.find("i.zhuan_icon").css("display", zzDisplay);
						appendContent.attr("data", tr.attr("data"));
						tr.replaceWith(appendContent);
						tr = appendContent;
					}
					var daysSpan = result.arriveTrainStop.runDays - result.startTrainStop.runDays;
					tr.find("span[name=daysSpan]").html(daysSpan > 0 ? ('+' + daysSpan) : '');
					
					tr.find("span[name=startStationString]").html(result.startStationString);
					tr.find("span[name=arriveStationString]").html(result.arriveStationString);
					
					tr.find("span[name=startTime]").html(result.startTime);
					tr.find("span[name=arriveTime]").html(result.arriveTime);
					
					var takeTime = calTakeTime(result.startTrainStop, result.arriveTrainStop);
					tr.find("span[name=costTimeHour]").html((takeTime - takeTime%60)/60);
					tr.find("span[name=costTimeMinute]").html(takeTime%60);
					
					//处理出发站和到达站
					var $stationSelect = tr.find("[name=startStation], [name=arriveStation]");
					$stationSelect.empty();
					$.each(result.trainStops, function(n, trainStop){
						var $option = $("<option>");
						$option.val(trainStop.stopStation).text(trainStop.stopStationString)
						//stopInfo = "${trainStop.stopId}|${trainStop.stopStep}|${trainStop.arrivalTime}|${trainStop.departureTime}"
						$option.attr("stopInfo",trainStop.stopStation + '|' + trainStop.stopStep + '|' + trainStop.runDays 
									+ '|' + trainStop.arrivalTime + '|' + trainStop.departureTime);
						$stationSelect.append($option);
					});
					$stationSelect.filter("[name=startStation]").find(":first").attr("selected",true);
					$stationSelect.filter("[name=arriveStation]").find(":last").attr("selected",true);
					//$trainNo[0].trainStops = result.trainStops;
					
					//处理坐位类型
					var $trainSeatId = tr.find("[name=trainSeatId]");
					$trainSeatId.empty();
					$.each(result.trainSeatList, function(n, seat){
						var $seat = $("<option>").val(seat.trainSeatId).text(seat.seatType);
						if(seat.isDefault == 'Y') {
							$seat.attr("selected", true);
						}
						$trainSeatId.append($seat);
					});
				}
			},
			error : function(result) {
					console.error(result);
			}
	 });
	});
	
	//是否有参考交通切换
	$("#trafficContentDiv").on("change","[name=has_reference_select]",function(){
		var $switch = $(this);
		var value = $switch.val();

		//将原有的prod_traffic_train 信息删除
		var productId = $("#productId").val();
		var $root = $switch.parents("[name='to'],[name='back']");
		var toolType = null;
		if($root.attr("name") == 'to'){
			toolType = $("#selecTraffic_go_span").attr("value");
			if(typeof toolType == 'undefined') {
				toolType = $("#selecTraffic_go").val();
			}
		} else {
			toolType = $("#selecTraffic_back_span").attr("value");
			if(typeof toolType == 'undefined') {
				toolType = $("#selecTraffic_back").val();
			}
		}

		
		//界面切换
		if('yes' == value) {
			$switch.siblings("span:eq(1)").css("display", "none");
			$switch.siblings("span:eq(2)").css("display", "none");
			if("TRAIN" == toolType) {
				//$switch.parent(".transfer-detail1-p").siblings(".transfer-detail1").css("display", "block");
				var withReference = $("#template [name='template_train_with_reference_raw'] .transfer-detail1").clone();
				withReference.find(".a_detele").remove();
				$switch.parent(".transfer-detail1-p").after(withReference);
			} else if("FLIGHT" ==  toolType){
				$switch.parent(".transfer-detail1-p").siblings(".template_x_traffic").css("display", "block");
				$switch.parent(".transfer-detail1-p").parent(".template_x_traffic").find(".refer-table").css("display", "table");
				$switch.closest("div[name=content]").find(".refer-table").css("display","table");
			}
		} else {
			var to_traffic_name = $switch.closest("div").find("span[name=to_traffic_name]").html();
			var back_traffic_name = $switch.closest("div").find("span[name=back_traffic_name]").html();

			if(to_traffic_name == "飞机" && to_traffic_name != ""){
				$switch.siblings("span:eq(2)").css("display", "inline");
			}
			if(back_traffic_name == "飞机" && back_traffic_name != ""){
				$switch.siblings("span:eq(2)").css("display", "inline");
			}
			
			//addDistrictSuggest(content);
			$switch.siblings("span:eq(1)").css("display", "inline");
			//$switch.parent(".transfer-detail1-p").siblings(".transfer-detail1").css("display", "none");
			$switch.parent(".transfer-detail1-p").siblings(".transfer-detail1").remove();
			$switch.parent(".transfer-detail1-p").siblings(".template_x_traffic").css("display", "none");
			
			$switch.parent(".transfer-detail1-p").parent(".template_x_traffic").find(".refer-table").css("display", "none");
			$switch.closest("div[name=content]").find(".refer-table").css("display","none");
		}
	});
	
	//当出发站和到达站改变的时候处理时间和总时长
	//$("[name=startStation], [name=arriveStation]").change(function(){
	$("#trafficContentDiv").on("change", "[name=startStation], [name=arriveStation]", function(){
		var $current = $(this);
		var tr = $current.closest("tr");
		var $startStation = $current.attr("name") == "startStation"?
				$current: tr.find("select[name=startStation]");
		var $arriveStation = $current.attr("name") == "arriveStation"?
				$current: tr.find("select[name=arriveStation]");
		var $startStationId = $startStation.val();
		var $arriveStationId = $arriveStation.val();

		var minArr = $startStation.find("option:selected").attr("stopInfo").split("|");
		var maxArr = $arriveStation.find("option:selected").attr("stopInfo").split("|");
		
		//${trainStop.stopId}|${trainStop.stopStep}|${trainStop.arrivalTime}|${trainStop.departureTime}
		var min = {stopStation:minArr[0], stopStep: parseInt(minArr[1]), runDays: minArr[2], arrivalTime:minArr[3], departureTime:minArr[4]};
		var max = {stopStation:maxArr[0], stopStep: parseInt(maxArr[1]), runDays: maxArr[2], arrivalTime:maxArr[3], departureTime:maxArr[4]};
		
		/*$.each(tr.find("[name=trainNo]")[0].trainStops, function(n, bizTrainStop){
			if($startStationId == bizTrainStop.stopId) {
				min = bizTrainStop;
			} else if($arriveStationId == bizTrainStop.stopId) {
				max = bizTrainStop;
			}
		});*/
		
		if($startStationId == $arriveStationId || min.stopStep > max.stopStep) {
			var msg = $startStationId == $arriveStationId ?  "火车出发站和终点站不能相同 " : "出发站不能大于终点站";
			$current.siblings(".poptip-select").find("span").html(msg);
			$current.siblings(".poptip-select").css({"display":"block"});
			//将页面相关的内容清除
			tr.find("span[name=startTime]").empty();
			tr.find("span[name=arriveTime]").empty();
			tr.find("span[name=costTimeHour]").empty();
			tr.find("span[name=costTimeMinute]").empty();
			return;
		} else {
			$current.siblings(".poptip-select").css("display", "none");
		}
		
		var takeTime = calTakeTime(min, max);
		tr.find("span[name=startTime]").html(min.departureTime);
		tr.find("span[name=arriveTime]").html(max.arrivalTime);
		tr.find("span[name=costTimeHour]").html((takeTime - takeTime%60)/60);
		tr.find("span[name=costTimeMinute]").html(takeTime%60);
		
		var daysSpan = parseInt(max.runDays) - parseInt(min.runDays);
		tr.find("span[name=daysSpan]").html(daysSpan > 0 ? ('+' + daysSpan): '');
	});
	
	/*
	$("#trafficContentDiv").on("click", "[name=from_city_search], [name=to_city_search]", function(){
		var getTimestamp=new Date().getTime();
		districtSelectDialog = new xDialog("/vst_ebooking/ebooking/prod/route/traffic/selectDistrictList.do?timestamp="+getTimestamp,{},
				{title:"选择行政区",iframe:true,width:"1000",height:"600"});
		districtSelectDialog.triggerCtl = this;
	}); */
	
	//出发地和目的地的模糊搜索框
	$("#trafficContentDiv").find("input[name=from_city_search],input[name=to_city_search]").each(function(n, item){
		var $searchBox = $(this);
		var name = $searchBox.attr("name");
		var hiddenFieldName = name.substring(0, name.length - 7);
		vst_pet_util.commListSuggest($searchBox,
				$searchBox.siblings("[name=" + hiddenFieldName + "]"),
				'/vst_ebooking/ebooking/prod/route/traffic/findDistrictListByLike.do','');
	});
	
}); //初始加载结束


//选择行政区 回调函数
/*function onSelectDistrict(params){
	var triggerCtl = $(districtSelectDialog.triggerCtl);
	var key1 = triggerCtl.attr("name").substring(0, triggerCtl.attr("name").length-7);
	if(params!=null){
		triggerCtl.val(params.districtName);
		triggerCtl.siblings("[name=" + key1 + "]").val(params.districtId);
	}
	districtSelectDialog.close();
	//$("#districtError").hide();
}*/

function calTakeTime(min, max) {
	var takeTime = null;
	var minArr = min.departureTime.split(":");
	var maxArr = max.arrivalTime.split(":");
	takeTime = parseInt(maxArr[0])*60 + parseInt(maxArr[1]) + 60 * 24 *parseInt(max.runDays)
			-parseInt(minArr[0])*60 - parseInt(minArr[1]) - 60 * 24 * parseInt(min.runDays);
	return takeTime;
}


function createTrainObjects(groupIndex,content,tripType,baseIndex){
	var productId = $("#productId").val();
	var groupId = content.closest("div[name='template_traffic']").attr("data");
	if(typeof groupId != "undefined") {
		$("#saveForm").append('<input type="hidden" name="prodTrafficGroupList['+groupIndex+'].groupId" value="'+groupId+'">');
	}
	$("#saveForm").append('<input type="hidden" name="prodTrafficGroupList['+groupIndex+'].productId" value="'+productId+'">');

	var hasReference = content.find("select[name=has_reference_select]").val();	
	if("yes" == hasReference) {
		content.find("table.refer-table tr:not('.one')").each(function(index, item){
			//每组	
			var that = $(item);
			var trainId = that.attr("data");
			var trainNo = that.find("input[name='trainNo']").val();
			var isFill = that.find("input[name='isFill']").val();
			var startStation = that.find("select[name='startStation']").val();
			var arriveStation = that.find("select[name='arriveStation']").val();
			var trainSeatId = that.find("select[name='trainSeatId']").val();
			var trName = that.attr("name");
			
			//验证
			if(typeof trainNo == 'undefined' || trainNo.length < 1) {
				throw new Error("车次号不能为空");
			} else if(typeof trName != 'undefined' && "search_train_fail_prompt" == trName) {
				throw new Error("没有检索到" + trainNo + "车次");
			} else if(isEmpty(startStation) || isEmpty(arriveStation)){
				throw new Error("出发地和目的地不能为空");
			} else if(startStation == arriveStation) {
				throw new Error("出发地和到达地不能相同");
			}
			
			if(typeof trainId != "undefined"){
				$("#saveForm").append('<input type="hidden" name="prodTrafficGroupList['+groupIndex+'].prodTrafficTrainList['+(index+baseIndex)+'].trainId" value="'+trainId+'">');
			}
			$("#saveForm").append('<input type="hidden" name="prodTrafficGroupList['+groupIndex+'].prodTrafficTrainList['+(index+baseIndex)+'].productId" value="'+productId+'">');
			$("#saveForm").append('<input type="hidden" name="prodTrafficGroupList['+groupIndex+'].prodTrafficTrainList['+(index+baseIndex)+'].trainNo" value="'+trainNo+'">');
			$("#saveForm").append('<input type="hidden" name="prodTrafficGroupList['+groupIndex+'].prodTrafficTrainList['+(index+baseIndex)+'].startDistrict" value="'+startStation+'">');
			$("#saveForm").append('<input type="hidden" name="prodTrafficGroupList['+groupIndex+'].prodTrafficTrainList['+(index+baseIndex)+'].endDistrict" value="'+arriveStation+'">');
			$("#saveForm").append('<input type="hidden" name="prodTrafficGroupList['+groupIndex+'].prodTrafficTrainList['+(index+baseIndex)+'].trainSeatId" value="'+trainSeatId+'">');
			$("#saveForm").append('<input type="hidden" name="prodTrafficGroupList['+groupIndex+'].prodTrafficTrainList['+(index+baseIndex)+'].tripType" value="'+tripType+'">');
		});
	} else {
		var index = 0;
		var from_city = content.find("input[name=from_city]").val();
		var to_city = content.find("input[name=to_city]").val();
		
		//验证
		if(typeof from_city == 'undefined' || typeof to_city == 'undefined'
			|| from_city == '' || to_city == '') {
			throw new Error("出发地和到达地不能为空");
		} else if(from_city == to_city) {
			throw new Error("出发地和到达地不能相同");
		}
		
		var trainId = content.find(".transfer-detail1-p").attr("data");
		var name = "prodTrafficGroupList[" + groupIndex + "].prodTrafficTrainList[" + (index+baseIndex) + "].";
		$("#saveForm").append($("<input type='hidden'></input>").attr("name", name + "fromCity").val(from_city));
		$("#saveForm").append($("<input type='hidden'></input>").attr("name", name + "toCity").val(to_city));
		$("#saveForm").append($("<input type='hidden'></input>").attr("name", name + "tripType").val(tripType));
		if(typeof trainId != 'undefined' && trainId != '') {
			$("#saveForm").append($("<input type='hidden'></input>").attr("name", name + "trainId").val(trainId));
		}
	}
}
//# sourceURL=ebk-transfer-air.js
/* end by huanggen*/


/*start zm*/

//交通组删除
function closeGroup(me){
	var groupId = $(me).closest("div[name=template_traffic]").attr("data");
	if(typeof groupId == 'undefined' || groupId == "") {
		$(me).closest("div[name=template_traffic]").remove();
		indexRefresh('','GROUP');
	} else {
		backstage.confirm({
			content:"你确定要永久删除该交通组信息吗?",
	        width:500,
	        height:150,
	        padding:30,
	        determineCallback: function(){
	        	$(me).closest("div[name=template_traffic]").remove();
				$.ajax({
					url : "/vst_ebooking/ebooking/prod/route/traffic/deleteOneProdTrafficGroup.do",
					type : "post",
					data :  {"groupId": groupId},
					success : function(result) {
						if(result.code == "success"){
							indexRefresh('','GROUP');
							backstage.alert({
								content:"删除交通组成功"
							});
						} else {
							backstage.alert({
								content:result.message
							});
						}
					},
					error : function(result) {
						backstage.alert({
							content:"删除交通组失败"
						});
					}
				});
				deleteFlagRefresh();
	        }
		});
	}
	deleteFlagRefresh();
}





/**
 * 添加上车点
 * @param me
 */
function addBusPointFn(me){
	var t = $(".bus_point_template tbody").html();
	var index = $(me).closest("table").find("tr").length;
	var table = $(me).closest("table");
	if(index == 20){
		backstage.alert({
			content:"您好，最多20组上车点信息"
		});
		return;
	}
	$(me).closest("tbody").append($(t));
	indexRefresh(table,'BUS');
}

/**
 * 删除上车点
 * @param me
 */
function deleteBusPointFn(me){
	var type = 'BUS';
	var id = $(me).closest("tr").attr('data');
	var table = $(me).closest("table");
	
        	if(isEmpty(id)){
    			$(me).closest("tr").remove();
    			indexRefresh(table,type);
    		}else{
    			$.ajax({
    				type:'post',
    				url:'/vst_ebooking/ebooking/prod/route/traffic/deleteProdTrafficDetail.do',
    				data:{'type':type,'id':id},
    				success:function(e){
    					$(me).closest("tr").remove();
    					indexRefresh(table,type);
    				},
    				error : function(e) {
    					backstage.alert({
    						content:"删除轮船信息失败"
    					});
    				}
    			});
    			
    		}
}

/**
 * 添加轮船中转
 * @param me
 */
function addShipFn(me){
	var t = $(".ship_point_template tbody").html();
//	var table = $(me).closest("table");
	var index = $(me).closest("table").find("tr").length-1;
	t = t.toString().replace(/{index}/,index);
	$(me).closest("tbody").append($(t));
//	$(me).closest('tr').after($(t));
//	indexRefresh(table,'SHIP');
	
}

/**
 * 删除轮船中转
 * @param me
 */
function deleteShipFn(me){
	var type = 'SHIP';
	var id = $(me).closest("tr").attr('data');
	var table = $(me).closest("table");
        	if(isEmpty(id)){
    			$(me).closest("tr").remove();
    			indexRefresh(table,type);
    		}else{
    			$.ajax({
    				type:'post',
    				url:'/vst_ebooking/ebooking/prod/route/traffic/deleteProdTrafficDetail.do',
    				data:{'type':type,'id':id},
    				success:function(e){
    					$(me).closest("tr").remove();
    					indexRefresh(table,type);
    				},
    				error : function(e) {
    					backstage.alert({
    						content:"删除轮船信息失败"
    					});
    				}
    			});
    			
    		}
}
/**
 * 刷新序号
 * @param table
 */
function indexRefresh(table,type){
	if(type == 'SHIP'){
		$(table).find("tr").each(function(index){
			if(index!=0){
				$(this).find('.zhuan_icon').html('中转' + (index-1));
			}
		});
	}else if(type == 'BUS'){
		$(table).find("tr").each(function(index){
			if(index!=0){
				$(this).find('input[name=address]').attr('placeholder','上车点' + index);
			}
		});
	}else if(type == 'GROUP'){
		$("#trafficContentDiv [name=trafficContentFirstChild]").find("[name=template_traffic]").each(function(n, item){
			var $group = $(item);
			$group.find("[name=traffic_title] span").text("交通信息" + (n + 1 ));
		}); 
	}
}
//往返交通有值 隐藏提示框
function selecTrafficChangeFn(me){
	var v = $(me).val();
	if(!isEmpty(v)){
		$('#poptip-transfer').hide();
	}
	
	if($(me).attr('name')=='goway'){
		if( v == 'BUS'){
			$('.busCheckBox').show();
		}else{
			$('.busCheckBox').hide();
		}
	}
}
//判断值是否为空
function isEmpty(text){
	if(text == null || text == '' || typeof(text)=='undefined'){
		return true;
	}else{
		return false;
	}
}

/**构建汽车对象	 ADD BY ZM*/
function createBusObjects(groupIndex,content,tripType,baseIndex){
	content.find("div[name=template_bus]").find("table").find("tr").each(function(index){
		if(index!=0){
			index = index-1;
			var that = $(this);
			var productId = $("#productId").val();
			var address = that.find("input[name='address']").val();
			var hour = that.find("select[name='hour']").val();
			var min = that.find("select[name='min']").val();
			var startTime = hour + ":" + min;
			var memo = that.find("input[name='memo']").val();
			var busId = that.attr("data");
			var groupId = that.closest("div[name='template_traffic']").attr("data");
			if(isEmpty(groupId)){
				groupId = '';
			}
			if(isEmpty(busId)){
				busId = '';
			}
			$("#saveForm").append('<input type="hidden" name="prodTrafficGroupList['+groupIndex+'].groupId" value="'+groupId+'">');
			$("#saveForm").append('<input type="hidden" name="prodTrafficGroupList['+groupIndex+'].productId" value="'+productId+'">');
			$("#saveForm").append('<input type="hidden" name="prodTrafficGroupList['+groupIndex+'].prodTrafficBusList['+(index+baseIndex)+'].busId" value="'+busId+'">');
			$("#saveForm").append('<input type="hidden" name="prodTrafficGroupList['+groupIndex+'].prodTrafficBusList['+(index+baseIndex)+'].productId" value="'+productId+'">');
			$("#saveForm").append('<input type="hidden" name="prodTrafficGroupList['+groupIndex+'].prodTrafficBusList['+(index+baseIndex)+'].groupId" value="'+groupId+'">');
			$("#saveForm").append('<input type="hidden" name="prodTrafficGroupList['+groupIndex+'].prodTrafficBusList['+(index+baseIndex)+'].tripType" value="'+tripType+'">');
			$("#saveForm").append('<input type="hidden" name="prodTrafficGroupList['+groupIndex+'].prodTrafficBusList['+(index+baseIndex)+'].adress" class="{required:true}" value="'+address+'">');
			$("#saveForm").append('<input type="hidden" name="prodTrafficGroupList['+groupIndex+'].prodTrafficBusList['+(index+baseIndex)+'].startTime" value="'+startTime+'">');
			$("#saveForm").append('<input type="hidden" name="prodTrafficGroupList['+groupIndex+'].prodTrafficBusList['+(index+baseIndex)+'].memo" value="'+memo+'">');
		}		
		
	});
}

/**构建轮船对象  ADD BY ZM */
function createShipObjects(groupIndex,content,tripType,baseIndex){
	content.find("div[name=template_ship]").find("table").find("tr").each(function(index){
		if(index!=0){
			index = index-1;
			var that = $(this);
			var productId = $("#productId").val();
			var fromAddress = that.find("input[name='fromAddress']").val();
			var toAddress = that.find("input[name='toAddress']").val();
			var memo = that.find("input[name='memo']").val();
			var shipId = that.attr("data");
			var groupId = that.closest("div[name='template_traffic']").attr("data");
			if(isEmpty(groupId)){
				groupId = '';
			}
			if(isEmpty(shipId)){
				shipId = '';
			}
			
			$("#saveForm").append('<input type="hidden" name="prodTrafficGroupList['+groupIndex+'].groupId" value="'+groupId+'">');
			$("#saveForm").append('<input type="hidden" name="prodTrafficGroupList['+groupIndex+'].productId" value="'+productId+'">');
			$("#saveForm").append('<input type="hidden" name="prodTrafficGroupList['+groupIndex+'].prodTrafficShipList['+(index+baseIndex)+'].shipId" value="'+shipId+'">');
			$("#saveForm").append('<input type="hidden" name="prodTrafficGroupList['+groupIndex+'].prodTrafficShipList['+(index+baseIndex)+'].groupId" value="'+groupId+'">');
			$("#saveForm").append('<input type="hidden" name="prodTrafficGroupList['+groupIndex+'].prodTrafficShipList['+(index+baseIndex)+'].productId" value="'+productId+'">');
			$("#saveForm").append('<input type="hidden" name="prodTrafficGroupList['+groupIndex+'].prodTrafficShipList['+(index+baseIndex)+'].tripType" value="'+tripType+'">');
			$("#saveForm").append('<input type="hidden" name="prodTrafficGroupList['+groupIndex+'].prodTrafficShipList['+(index+baseIndex)+'].fromAddress" value="'+fromAddress+'">');
			$("#saveForm").append('<input type="hidden" name="prodTrafficGroupList['+groupIndex+'].prodTrafficShipList['+(index+baseIndex)+'].toAddress" value="'+toAddress+'">');
			$("#saveForm").append('<input type="hidden" name="prodTrafficGroupList['+groupIndex+'].prodTrafficShipList['+(index+baseIndex)+'].memo" value="'+memo+'">');
		}
	});
}
/**
 *切换往返交通面板 add by 2015-08-31
 */   
 function switchT(new_selecTraffic_go,new_selecTraffic_back){
	var tcs = $("div[name=transfer-content]").find("div[name=transfer-content-save]");
	var cheseFlag2 = tcs.find('input[name=cheseFlag2]').is(':checked');
	var referFlag = tcs.find('input[name=referFlag]').is(':checked');
	tcs.remove();
	
	var modifyTemplate = $("#template").find("div[name=transfer-content-modify_parent]").html();
	$("div[name=transfer-content]").append($(modifyTemplate));
	var tcm = $("div[name=transfer-content]").find("div[name=transfer-content-modify]");
	if(cheseFlag2 == true){
		tcm.find('input[name=cheseFlag2]').attr('checked','');
	}
	if(referFlag == true){
		tcm.find('input[name=referFlag]').attr('checked','');
	}
	$("#selecTraffic_go_span").attr("value",new_selecTraffic_go);
	$("#selecTraffic_back_span").attr("value",new_selecTraffic_back);
	
	if(!isEmpty(new_selecTraffic_go)){
		$("#selecTraffic_go_span").html(getTrafficName(new_selecTraffic_go));
	}else{
		$("#selecTraffic_go_span").html('无');
	}
	
	if(!isEmpty(new_selecTraffic_back)){
		$("#selecTraffic_back_span").html(getTrafficName(new_selecTraffic_back));
	}else{
		$("#selecTraffic_back_span").html('无');
	}
 }
 
 /**
  * 点击修改
  */
 function transferModifyFn (){
	 try{
		var tcm = $("div[name=transfer-content]").find("div[name=transfer-content-modify]");
		var goway = tcm.find('span[name=goway]').attr('value');
		var backway = tcm.find('span[name=backway]').attr('value');
		var cheseFlag2 = tcm.find('input[name=cheseFlag2]:checked').val();
		var referFlag = tcm.find('input[name=referFlag]:checked').val();
		tcm.remove();
		
		var tmp = $("#template").find("div[name=transfer-content-save_parent]").html();
		$("div[name=transfer-content]").append($(tmp));
		var tcs = $("div[name=transfer-content]").find("div[name=transfer-content-save]");
		if(goway!='BUS'){
			$(tcs).find('.busCheckBox').hide();
			tcs.find('input[name=cheseFlag2]').attr('checked',cheseFlag2);
		}else{
			$(tcs).find('.busCheckBox').show();
			tcs.find('input[name=cheseFlag2]').attr('checked',cheseFlag2);
		}
		tcs.find('select[name=goway]').val(goway);
		tcs.find('select[name=backway]').val(backway);
		tcs.find('select[name=goway]').attr("oldValue",goway);
		tcs.find('select[name=backway]').attr("oldValue",backway);
		tcs.find('input[name=cheseFlag2]').attr("oldCheseFlag2",cheseFlag2);
		tcs.find('input[name=referFlag]').attr("oldReferFlag",referFlag);
		tcs.find('input[name=referFlag]').attr('checked',referFlag);
	}catch(e){
		alert(e.message);
	}
}
 
/**
 * 保存交通方式
 */	
function saveTrafficMethod(){
	var index = $("#trafficContentDiv").find("div[name=template_traffic]").size();
	var tcs = $("div[name=transfer-content]").find("div[name=transfer-content-save]");
	
	var	old_selecTraffic_go = tcs.find('select[name=goway]').attr('oldValue');
	var old_selecTraffic_back = tcs.find('select[name=backway]').attr('oldValue');
	var old_cheseFlag2 = tcs.find('input[name=cheseFlag2]').attr('oldCheseFlag2');
	var old_referFlag = tcs.find('input[name=referFlag]').attr('oldReferFlag');
	
	var new_cheseFlag2 = tcs.find('input[name=cheseFlag2]:checked').val();
	var new_referFlag = tcs.find('input[name=referFlag]:checked').val();
	var new_selecTraffic_go = tcs.find('select[name=goway]').val();
	var new_selecTraffic_back = tcs.find('select[name=backway]').val();
	
	//验证 往返程是否为空
	if(!new_selecTraffic_go && !new_selecTraffic_back){
		$('#poptip-transfer').attr('style','display:inline');
		return;
	}
	
	var productId = $("#productId").val();
	//组织用于更新PROD_TRAFFIC表的数据
	var prodTraffic = {
			"productId":productId,
			"toType":new_selecTraffic_go,
			"backType":new_selecTraffic_back,
			"referFlag":(new_referFlag)? 'Y' : 'N',
			"cheseFlag2":(new_cheseFlag2)? 'Y' : 'N'
	};
	
	
	if(index<1){
		//$.alert("还未添加过交通信息,不用保存");
		if(saveProdTraffic(prodTraffic)) {
			switchT(new_selecTraffic_go,new_selecTraffic_back);
			addTemplate();
		}
		return;
	}
	
	if(old_selecTraffic_go == new_selecTraffic_go && old_selecTraffic_back == new_selecTraffic_back){
		if(old_cheseFlag2 == new_cheseFlag2 && old_referFlag == new_referFlag){
			backstage.alert({
				content:"往返程交通工具未变,原交通信息不清除",
				height:130
			});
			return ;
		}else{
			if(saveProdTraffic(prodTraffic)) {
				switchT(new_selecTraffic_go,new_selecTraffic_back);
			}
			return ;
		}
	}
	
	if(saveProdTraffic(prodTraffic)) {
		backstage.alert({
			content:"往返程交通工具已变,原交通工具信息已被清除",
			height:130
		});
		/*往返程模板切换start*/
		switchT(new_selecTraffic_go,new_selecTraffic_back);
		//清空交通组		
		$("#trafficContentDiv").find("div[name=trafficContentFirstChild]").empty();
		addTemplate();
	}
	
}

/**验证汽车输入时间*/
function validateCarTime(me){
	var m = $(me).closest("tr").find('select[name=min]').val();
	var h = $(me).closest("tr").find('select[name=hour]').val();
	
	var currentIndex = $(me).closest("tr").index();	
	var flag=false;
	$(me).closest("table").find("tr").each(function(index){
		if(index != currentIndex){
			var mm = $(this).find('select[name=min]').val();
			var hh = $(this).find('select[name=hour]').val();
			if(m == mm && 	h == hh){
				$(me).attr('style','border:1px solid #F00');
				$(me).attr('title','上车时间不能重复');
				flag=true;
				//return false;
			}
		}
	});
	if(!flag){
		$(me).closest("tr").find('select[name=min]').removeAttr('style');
		$(me).closest("tr").find('select[name=min]').removeAttr('title');
		$(me).closest("tr").find('select[name=hour]').removeAttr('style');
		$(me).closest("tr").find('select[name=hour]').removeAttr('title');
		return true;
	}else{
		return false;
	}
}

/**
 * 失去焦点时校验
 */
function validateEmpty(me){
	var me = $(me);
	var v = me.val();
	if(isEmpty(v)){
		$(me).attr('style','border:1px solid #F00');
		$(me).attr('title','此项信息不能为空');
		return;
	}else{
		$(me).removeAttr('style');
		$(me).removeAttr('title');
	}
	/*if(me.attr('name') == 'address'){
		commonValidate(me,'汽车上车点');
	}*/
	if(me.attr('name') == 'toAddress'){
		commonValidate(me,'轮船到达地');
	}else if(me.attr('name') == 'fromAddress'){
		commonValidate(me,'轮船出发地');
	}
	/*else if(me.attr('name') == 'hour'){
		validateCarTime(me);
	}else if(me.attr('name') == 'min'){
		validateCarTime(me);
	}*/
	return;
}

/**
 * 汽车轮船表单相关 重复校验
 * @param me
 * @param message
 * @returns {Boolean}
 */
function commonValidate(me,message){
	//var v = me.val();
	var isPass = true;
	//var currentIndex = $(me).closest("tr").index();	
	
	if(me.attr('name') == 'toAddress' || me.attr('name') == 'fromAddress'){
		var toAddress = $(me).closest("tr").find('input[name=toAddress]').val();
		var	fromAddress = $(me).closest("tr").find('input[name=fromAddress]').val();
		if(toAddress == fromAddress){
			$(me).attr('style','border:1px solid #F00');
			$(me).attr('title','轮船出发地和到达地不能重复');
			isPass = false;
		}else{
			$(me).removeAttr('style');
			$(me).removeAttr('title');
		}
	}
	/*if(isPass){
		me.closest("table").find("tr").each(function(index){
			if(index!=0 && index!=currentIndex){
				
				if($(this).find('input[name='+ me.attr('name') +']').val() == v){
					//console.log(index + '====' + currentIndex );
					//console.log($(this).find('input[name='+ me.attr('name') +']').val() + '====' + v );
					$(me).attr('style','border:1px solid #F00');
					$(me).attr('title',message + '不能重复');
					isPass = false;
					return false;
				}else{
					$(me).removeAttr('style');
					$(me).removeAttr('title');
				}
			}
		});	
	}*/
	return isPass;
}
/**
 * 汽车与轮船提交的时候 表单校验
 * @returns {String}
 */
function submitValidate(){
	var validate = true;
	var message = '';
	//空校验
	$('#trafficContentDiv').find('.validateEmpty').each(function(){
		var me = $(this);
		$(me).removeAttr('style');
		$(me).removeAttr('title');
		var v = me.val();
		if(isEmpty(v)){
			$(me).attr('style','border:1px solid #F00');
			$(me).attr('title','此项信息不能为空');
			message = '请提交完整的信息';
			validate = false;
			return false;
		}
		/*上车点地址信息可以重复，验证信息去掉
		if(me.attr('name') == 'address'){
			validate = validate & commonValidate(me,'汽车上车点');
		}*/
		if(me.attr('name') == 'toAddress'){
			validate = validate & commonValidate(me,'轮船到达地');
		}else if(me.attr('name') == 'fromAddress'){
			validate = validate & commonValidate(me,'轮船出发地');
		}
		/*else if(me.attr('name') == 'hour'){
			validate = validate & validateCarTime(me);
		}*/
	});
	if(!validate){
		return isEmpty(message)?'请确认填写信息是否正确':message;
	}else{
		return '';
	}
	
}
/**
*刷新交通组 删除标志
*/
function deleteFlagRefresh(){
	var groupIndex = $("#trafficContentDiv").find("div[name=template_traffic]").size();
	if(groupIndex == 1){
		$("#trafficContentDiv").find("div[name=template_traffic]").each(function(){
			$(this).find('div[name=traffic_title]').find('a').hide();
		});
	}else{
		$("#trafficContentDiv").find("div[name=template_traffic]").each(function(){
			$(this).find('div[name=traffic_title]').find('a').show();
		});
	}
}
/*end zm*/

/**
 * 验证飞机表单验证
 */
function submitFlightValidate(){
	var success = true;
	$("#trafficContentDiv").find("div[name='template_traffic']").each(function(){
		var that = $(this);
		//构建去程对象
		var toContent = that.find("div.to");
        var toArray = toContent.find("div.template_x_traffic").find("input[name='flightNo']");
        var has_reference_select_to = toContent.find("select[name='has_reference_select']").val();
        if(has_reference_select_to == "yes"){
        	//判断去程航班号是否为空
            $.each(toArray, function(i, n){
    	        if($(n).val()==""){
    	            backstage.alert({
    	            	content:"航班号不可以为空！"
    	            });
    	            success = false;
    	            return false;
    	        }
            });
        }
        
        var backContent = that.find("div.back");
        var backArray = backContent.find("div.template_x_traffic").find("input[name='flightNo']");
        var has_reference_select_back = backContent.find("select[name='has_reference_select']").val();
        if(has_reference_select_back == "yes"){
        	//判断返程航班号是否为空 
            $.each(backArray, function(i, n){
    	        if($(n).val()==""){
    	            backstage.alert({
    	            	content:"航班号不可以为空！"
    	            });
    	            success = false;
    	            return false;
    	        }
           });
        }
        
	});
	if(!success){
		return 'false';
	}
	
}

function saveProdTraffic(data) {
	var ret = false;
	$.ajax({
		url : "/vst_ebooking/ebooking/prod/route/traffic/saveProdTraffic.do",
		type : "post",
		dataType : 'json',
		data : data,
		async: false,
		success : function(result) {
			if(result.code == 'error'){
				backstage.alert({
	            	content:result.message
	            });
				ret = false;
			} else {
				ret = true;
			}
		},
		error : function(result) {
			ret = false;
		}
	});
	return ret;
}


