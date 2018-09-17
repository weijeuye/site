if(!basePath) {
	var basePath = "/vst_ebooking";
}
//写cookies
function setCookie(name, value) {
	var Days = 30;
	var exp = new Date();
	exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
	document.cookie = name + "=" + escape(value) + ";expires="
			+ exp.toGMTString();
}
// 读取cookies
function getCookie(name) {
	var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
	if (arr = document.cookie.match(reg))
		return unescape(arr[2]);
	else
		return null;
}

function searchData(type) {
	if(!type){
		type="";
	}
	var sd = 0;
	$.ajax({
		type : 'POST',
		url : basePath + '/findCreateTaskCount.do',
		async : false,
		cache : false,
		data : {
			count : 2, productType:type
		},
		dataType : 'json',
		success : function(data) {
			sd = data;
		}
	});
	return sd;
}
var cookieName = "NONETRUNON";
var titleValue = "驴妈妈供应商管理系统";
function isTurnOn(name) {
	if (getCookie(name) == "true") {
		return true;
	} else {
		return false;
	}
}
function turnOff() {
	setCookie(cookieName, "false");
	changeHtmlView(false);
}

function turnOn() {
	setCookie(cookieName, "true");
	changeHtmlView(true);
}
function changeHtmlView(turnOn) {
	is_flash_title = turnOn;
	if (turnOn) {
		$('#pageMessage').addClass('icon_kai');
		flash_title();
	} else {
		// 关闭
		$('#pageMessage').removeClass('icon_kai');
		document.title = titleValue;
	}
}

function flash_title() {
	if (!isTurnOn(cookieName)) {
		return;
	}
	var searchCount = searchData();
	if (searchCount > 0) {
		is_flash_title = true;
	}else{
		is_flash_title = false;
	}
}
setInterval("flash_title()", 180000);
// 闪烁
setInterval("tile_Change()",1000);
var is_flash_title = false;
var i = 0;
function tile_Change() {
/*	if($("#menuConfirmOrderCountSpan").html()==0) {
		return;
	}*/
	if(!is_flash_title) {
		document.title = "驴妈妈供应商管理系统_首页";
		return;
	}
	if (i == 0) {
		document.title = titleValue;
		i = 1;
	} else {
		document.title = "您有待处理订单-" + titleValue;
		i = 0;
	}
}
/**
 * 菜单上的待处理订单数量
 *//*
function changeMenuConfirmOrderCount() {
	 var orderCount = $("#menuConfirmOrderCountSpan");
	 if(orderCount.size() <= 0) {
		 return;
	 }
	 var countH = searchData("HOTEL");
	 if(countH && countH > 0) {
		 $("#menuConfirmHotelOrderCountSpan").html(countH);
	 }
	 var countR = searchData("ROUTE");
	 if(countR && countR > 0) {
		 $("#menuConfirmRouteOrderCountSpan").html(countR);
	 }
	 var count = countR+countH;
	 if(count && count > 0) {
		 orderCount.html(count);
	 }
}
setInterval("changeMenuConfirmOrderCount()", 60000);*/
////////////////////////////
////弹出窗口提示
////////////////////////////
function tipMessageShow(msg,title) {
	$('div.window .panel-tool-close').click();
	$.messager.show({
		id: 'taskMessageDiv',
		name: 'taskMessageDiv',
		title: title,
		msg: msg,
		timeout: 60000,
		height:'110',
		width:'200',
		showType: 'slide'
	});
};
var is_tip_show = false;
var tip_show_cookie_name = "NONE_TIP_TRUNON";
function changeTipShowHtmlView(turnOn) {
	is_tip_show = turnOn;
	if (turnOn) {
		$('#windowMessage').addClass('icon_kai');
	} else {
		// 关闭
		$('#windowMessage').removeClass('icon_kai');
		document.title = titleValue;
	}
}
function turnTipShowOff() {
	setCookie(tip_show_cookie_name, "false");
	changeTipShowHtmlView(false);
}

function turnTipShowOn() {
	setCookie(tip_show_cookie_name, "true");
	changeTipShowHtmlView(true);
}
function tipshowtime(){
	if(!is_tip_show) {
		return;
	}
	$.ajax( {
	url : basePath + "/findEbookingMessage.do",
	type: "POST",
	success : function(result) {
			if(result.code=="success" && result.message.length>0){
				tipMessageShow(result.message,"系统提醒消息");
			}
		}
	});
};
setInterval("tipshowtime()",240000);

/**
 * 初始化
 */
$(function() {
	if($("div #sessionUserName").size() > 0){
		titleValue = document.title;
		var sessionUserName = encodeURI($("#sessionUserName").html());
		//标题提醒
		cookieName = sessionUserName+"TRUNON";
		changeHtmlView(isTurnOn(cookieName));
		//弹出提醒
		tip_show_cookie_name = sessionUserName = "_TIP_TRUNON";
		changeTipShowHtmlView(isTurnOn(tip_show_cookie_name));
		
/*		var orderCount = $("#menuConfirmOrderCountSpan");
		if(orderCount.size() > 0) {
			changeMenuConfirmOrderCount();
		}*/
	}
});

/**
 * 增加搜索，导出，跳页时loading的overlay。
 */
$(function () {
	var $document = $(document);
	$document.on("click", "#search_button", loadingHandler);
	$document.on("click", ".btn.PageLink_page", loadingHandler);
	function loadingHandler() {
		var $template = $('<div id="loading"></div>');
		$("body").append($template);
	}
	$document.on("click", ".pbtn.btn-ok", removeLoadingHandler);
	function removeLoadingHandler() {
		$("#loading").remove();
	}
});