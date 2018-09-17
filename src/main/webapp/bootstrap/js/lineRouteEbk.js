// JavaScript Document
$(document).ready(function(){

	//顶部总的切换
	$('.lineEbk_nav .ul_tab li').click(function(){
		$('.lineEbk_nav .ul_tab li').removeClass('active');
		$(this).addClass('active');
//		$('.lineEbk_con').hide();
//		$('.lineEbk_con').eq($(this).index()).show();
	});
	
	//顶部分栏切换
	$('.lineEbk_pro_nav a').click(function(){
		//console.log($(this).index()/2);
//		$(this).siblings('a').removeClass('active');
//		$(this).addClass('active');
		if($(this).attr("showFlg")!='Y'){
			$(this).parent().siblings('.lineEbk_info').hide();
			$(this).parent().siblings('.lineEbk_info').eq(Math.floor( $(this).index()/2 )).show();
		}
		
		
	})
	
	//图片上传
	$('.localBtn').live('click',function(){
		$(this).parent().find('.localFile').click();
	});
	
	$('.picChoice').live('click',function(){
		$(this).parent().find('.picChoiceFile').click();
	});
	
	
	//选择交通工具
	$('#selecTraffic_go').change(function(){
		var val = $(this).val();
		switch(val){
			case 'plane':
				$('#train_go').hide();
				$('#car_go').hide();
				$('#plane_go').show();
				$('#save_traffic').show();
				break;
			case 'train':
				$('#train_go').show();
				$('#car_go').hide();
				$('#plane_go').hide();
				$('#save_traffic').show();
				break;
			case 'car':
				$('#car_go').show();
				$('#plane_go').hide();
				$('#train_go').hide();
				$('#save_traffic').show();
				break;
			case '0':
				$('#car_go').hide();
				$('#plane_go').hide();
				$('#train_go').hide();
				break;
		};
		
		if(val=='0'&& $('#selecTraffic_back').val()=='0'){
			$('#save_traffic').hide();
		}
	});
	$('#selecTraffic_back').change(function(){
		var val = $(this).val();
		switch(val){
			case 'plane':
				$('#train_back').hide();
				$('#car_back').hide();
				$('#plane_back').show();
				$('#save_traffic').show();
				break;
			case 'train':
				$('#train_back').show();
				$('#car_back').hide();
				$('#plane_back').hide();
				$('#save_traffic').show();
				break;
			case 'car':
				$('#car_back').show();
				$('#plane_back').hide();
				$('#train_back').hide();
				$('#save_traffic').show();
				break;
			case '0':
				$('#car_back').hide();
				$('#plane_back').hide();
				$('#train_back').hide();
				break;
		};
		
		if(val=='0'&& $('#selecTraffic_go').val()=='0'){
			$('#save_traffic').hide();
		}
	})
	
	//选择交通工具添加航班
	$('.add_zz_plane').live('click',function(){
		
		var template = $("#addPlan_go").html();
		$(this).parents('.line_ebk_trafficTable').append(template);
		
	});
	$('.del_add_zz_plane').live('click',function(){
		$(this).parents('table').remove();
	});
	
	$('.add_zz_train').live('click',function(){
		
		var template = $("#addTrain_go").html();
		$(this).parents('.line_ebk_trafficTable').append(template);
		
	});
	$('.del_add_zz_train').live('click',function(){
		$(this).parents('table').remove();
	});
	
	$('.add_zz_car').live('click',function(){
		
		var template = $("#addCar_go").html();
		$(this).parent().next().find('.line_ebk_trafficTable').append(template);
		
	});
	$('.del_add_zz_car').live('click',function(){
		$(this).parents('table').remove();
	});
	
	var Dayslen = $('.lineDaysEbk').length;
	
	$('.add_ebk_oneDay').live('click',function(){
			
		var templateData = {
            day: ++Dayslen
        };
        var template = $("#add_ebk_oneDay").html();

        template = _.template(template, templateData);
		
		 $(this).parents('.line_ebk_trafficBox').append(template);
	});
	
	$('.del_add_oneDay').live('click',function(){
	
		$(this).parents('.line_ebk_trafficInfo').remove();
	})
	
	
	
	//全选与反选
	$('#selectAllItem').click(function(){
		if(!$(this).attr('checked')){
			$(this).parent().parent().next().find('input[type="checkbox"]').attr('checked',false);
		}else{
			$(this).parent().parent().next().find('input[type="checkbox"]').attr('checked',true);
		}
		
	});
	
	$('#item_ebk_check').find('input[type="checkbox"]').click(function(){
		if(!$(this).attr('checked')){
			$('#selectAllItem').attr('checked',false)
		}
	})
	
	//添加一栏
	$('.add_activtiyRow').click(function(){
		var oTr = $('<tr>'+
						  '<td>'+
							'<select>'+
								'<option selected="">行程上限</option>'+
								'<option selected="">其他</option>'+
							'</select>'+
						  '</td>'+
						  '<td><p class="line_ebk_txtOverflow1">上海市普陀区金沙江路上海市普陀区金沙江路</p></td>'+
						  '<td><p class="line_ebk_txtOverflow2">本项目为独立开发项目，无协上海市普陀区金沙江路</p></td>'+
						  '<td>￥2500</td>'+
						  '<td>18:52:20</td>'+
						  '<td><p class="line_ebk_txtOverflow3">本项目为独立开发项目，无协上海市普陀区金沙江路</p></td>'+
						  '<td><a href="javascript:;" class="del_activeRow">删除</a></td>'+
					 '</tr>')
		$(this).parent().next().find('tbody').append(oTr);
	});
	
	$('.del_activeRow').live('click',function(){
		$(this).parent().parent().remove();
	})
	
	
	
	
	
	
	//添加目的地景点
	$('#add_address_view').click(function(){
		var str = $('#line_ebk_otherView').val(); 
		if(str != ''){
			var arr = str.split('-');
			$('#addAdressViewUl li').eq(0).append($('<div class="con_ebk_dd">中国-'+ arr[0] +'<i class="icon_closed_ebk">×</i></div>'));
			$('#addAdressViewUl li').eq(1).append($('<div class="con_ebk_dd">'+arr[0]+'-'+ arr[1] +'<i class="icon_closed_ebk">×</i></div>'))
		}
		$('#line_ebk_otherView').val('')
	});
	$('.icon_closed_ebk').live('click',function(){
		$(this).parent().remove();
	});
	
	
	//文本输入字数检测
	$('.line_ebk_ms_textarea').live('keyup',function(){
		var l = $(this).val().length;
		if(l <=1000){
		 	$(this).siblings().find('span i').html(1000-l);
		}else{
			//alert('请确保在1000字以内')
		}
		
	})
	
	//其他内容生成部分
	$('.line_ebkOther').click(function(ev){
		if($(this).attr('checked')){
			if($('.lineEbkOtherDiv')){
				$('.lineEbkOtherDiv').remove();
			}
			var l = $(this).position().left+50;
			var t = $(this).position().top;
			var $div = $('<div class="lineEbkOtherDiv"><input type="text" class="line_ebk_itemOther"><div class="line_ebk_noticeBlue"><i class="icon_warning_blue"></i>若包含多项请用“；”隔开</div></div>').css({
				left : l,
				top: t
			})
			$(this).parent().parent().append($div);
		}else{
			$('.lineEbkOtherDiv').remove();
		}
		
	});
	
	//删除文字重新写效果
	$('#del_txt').click(function(){
		var $txt = $('<textarea class="line_ebk_ms_textareaBig line_ebk_ms_textarea"></textarea>');
		$(this).parent().parent().replaceWith($txt);
		
		
	})
	
	
	//出团通知书动态添加部分
	function ebkAddTr(btnID,objID){
		
		$('#'+btnID).click(function(){
			var $Tr = $('#'+objID).find('tbody tr').eq(0).clone();
			$Tr.find('input').val('');
			$('#'+objID).find('tbody').append($Tr);
			calendar();
		})
	
	}
	
	ebkAddTr('addPeople','addPeopleTab');
	ebkAddTr('addPlane','addPlaneTab');
	ebkAddTr('addTrain','addTrainTab');
	ebkAddTr('addCar','addCarTab');
	ebkAddTr('addHotel','addHotelTab');
	ebkAddTr('addTroup','addTroupTab');
	
	
	//日历按周按日期显示部分
	$('.line_tbk_byDate').live('click',function(){
		//$(this).attr('checked',true);
		//$(this).parent('label').find('.line_tbk_byWeek').attr('checked',false);
		$(this).parents('.tempEbkmodel').find('.line_ebk_DateBix').eq(1).hide();
		$(this).parents('.tempEbkmodel').find('.line_ebk_DateBix').eq(0).show();
	});
	$('.line_tbk_byWeek').live('click',function(){
		//$(this).attr('checked',true);
		//$(this).parent('label').find('.line_tbk_byDate').attr('checked',false);
		$(this).parents('.tempEbkmodel').find('.line_ebk_DateBix').eq(0).hide();
		$(this).parents('.tempEbkmodel').find('.line_ebk_DateBix').eq(1).show();
	});
	

    var flag = 0;
    // var $lineEbkInfo = $("")
	$('.addEbkPriceKu').live('click',function(){
        var templateData = {
            flag: ++flag
        };
        var template = $("#add-price-rep").html();

        template = _.template(template, templateData);
		$(this).parent().before(template);

        var calendarArea = $("#line_ebk_openChoice_" + flag);

        ebkPandora.calendar({
            target: ".calendar-container-" + flag,
            selectDateCallback: selectDateCallBack,
            cancelDateCallback: cancelDateCallBack,
            completeCallback: reRendarSelectedDate,
            autoRender: true,
            allowMutiSelected: true,
            template: "small"
        }); 
		
		calendar();

	});
	
	
	var exflag =0;
	$('.add_extend_pro').click(function(){
		
		var templateData = {
            exflag: ++exflag
        };
        var template = $("#add-extend-pro").html();

        template = _.template(template, templateData);
		$(this).parent().before(template);

        var calendarArea = $("#line_ebk_openChoice_" + exflag);

        ebkPandora.calendar({
            target: ".calendar-container-" + exflag,
            selectDateCallback: selectDateCallBack,
            cancelDateCallback: cancelDateCallBack,
            completeCallback: reRendarSelectedDate,
            autoRender: true,
            allowMutiSelected: true,
            template: "small"
        }); 
		
		calendar();
		
	})
	
	
	
	var upflag =0;
	
	$('.addUpdate_plan').live('click',function(){
		
		var templateData = {
            upflag: ++upflag
        };
		
		var template = $("#add-update-plan").html();
		 template = _.template(template, templateData);
		$(this).parent().before(template);
		
		var calendarArea = $("#line_ebk_hotelChoice_" + upflag);
		
        ebkPandora.calendar({
            target: ".calendar-container-" + upflag, // 日历容器. 使用jquery选择器语法
            selectDateCallback: selectDateCallBack,
            cancelDateCallback: cancelDateCallBack,
            completeCallback: reRendarSelectedDate,
            autoRender:true,
            allowMutiSelected: true,
            template: "small"
        }); 
		
		calendar();
	});
	
	var idflag = 0;
	
	$('.add_hotel_room').click(function(){
		
		var templateData = {
            idflag: ++idflag
        };
		
		var template = $("#add-hotel-pro").html();
		 template = _.template(template, templateData);
		$(this).parent().before(template);
		
		
		var calendarArea = $("#line_ebk_hotelChoice_" + idflag);
		
        ebkPandora.calendar({
            target: ".calendar-container-" + idflag, // 日历容器. 使用jquery选择器语法
            selectDateCallback: selectDateCallBack,
            cancelDateCallback: cancelDateCallBack,
            completeCallback: reRendarSelectedDate,
            autoRender:true,
            allowMutiSelected: true,
            template: "small"
        }); 
		
		calendar();
		
		
		
	});
	
	
	$('.delEbkTable').live('click',function(){
		$(this).parent().parent().remove()
	})
	$('.delUpdate-plan').live('click',function(){
		$(this).parent().prev().remove();
		$(this).parent().next().remove();
		$(this).parent().remove();
	});
	$('.del_extend_pro').live('click',function(){
		$(this).parent().prev().remove();
		$(this).parent().next().remove();
		$(this).parent().remove();
	});
	$('.del_hotel_rooms').live('click',function(){
		$(this).parent().prev().remove();
		$(this).parent().next().remove();
		$(this).parent().remove();
	});
	

	$('.hotel_date_lineEbk').live('click',function(){
		$(this).parents('tr').next().find('.line_ebk_hotel_tabTimes').eq(0).show();
		$(this).parents('tr').next().find('.line_ebk_hotel_tabTimes').eq(1).hide();
	});
	$('.hotel_week_lineEbk').live('click',function(){
		$(this).parents('tr').next().find('.line_ebk_hotel_tabTimes').eq(1).show();
		$(this).parents('tr').next().find('.line_ebk_hotel_tabTimes').eq(0).hide();
	});
	
	
	//新增酒店部分 按日历按周
	$('.line_ebk_hotelChoice').live('change',function(){
		
		if($(this).val() == '+新增酒店'){
			console.log('aa')
			$(this).parents('tr').next().find('.add_hotel_detailTxt').show();
			var $obj = $('<input type="text" class="input_proName">').focus();
			$(this).replaceWith($obj);
		}
		
	})
		
	//文档就绪自动渲染日历层
    var calendarConf = {
		selectDateCallback:selectDateCallBack,
		cancelDateCallback: cancelDateCallBack,
		completeCallback: reRendarSelectedDate,
		autoRender:true,
		allowMutiSelected: true,
        template: "small"
    }


    // 基础方案日历初始化
    calendarConf.target = "#divContainer-basic"
	ebkPandora.calendar(calendarConf); 

    // 酒店日历初始化
    calendarConf.target = "#divContainer-hotel"
	ebkPandora.calendar(calendarConf); 

    // 产品升级日历初始化
    calendarConf.target = "#divContainer-update"
	ebkPandora.calendar(calendarConf); 
	
	// 附加产品日历初始化
    calendarConf.target = "#divContainer-extend"
	ebkPandora.calendar(calendarConf); 
	
	$(".btnDel").live("click",function(e){
        removeDate(e);
    });
	
	calendar();




	
	
	
	//gege
	//左侧栏hover
	$('.nav-quick').find('ul li').mouseover(function(){
		$(this).addClass('hover');
	});
	$('.nav-quick').find('ul li').mouseout(function(){
		$(this).removeClass('hover');
	});	
	//批量通关显示
	$('.moreTG').click(function(){
		$('.allBox').show();
		$(this).hide();
		$('.choice_select').show();
	});
	
	//标签的选择
	$('.tag_status a').click(function(){
		$(this).parent().parent().find('span a').removeClass('active');
		$(this).addClass('active');
	})
	
	//选项卡切换
	$('.ul_tab li').click(function(){
		$('.ul_tab li').removeClass('active');
		$(this).addClass('active');
		$('.tab_block').hide();
		$('.tab_block').eq($(this).index()).show();
	});
	//全选
	$('.allCheck').click(function(){
		if($(this).attr('checked')){
			$('.table-list td input[type="checkbox"]').attr('checked', true)
		}else{
			$('.table-list td input[type="checkbox"]').attr('checked', false)
		}
	});
	$('.table-list td input[type="checkbox"]').click(function(){
		if(!$(this).attr('checked')){
			$('.allCheck').attr('checked',false);
		}
	})
	//选择今天
	$('.choice_today').click(function(){
		var oDate = new Date();
		$(this).siblings('input').eq(0).val(oDate.getFullYear()+'-'+(oDate.getMonth()+1)+'-'+oDate.getDate());
		$(this).siblings('input').eq(1).val(oDate.getFullYear()+'-'+(oDate.getMonth()+1)+'-'+oDate.getDate());
	});
	$('.input-date').click(function(){
		$(this).parent().find('.choice_today').attr('checked',false)
	})
	
	//批量通关弹层弹框
	$('#batch').click(function(){
		var dialog = false;
		$('.table-list td input[type="checkbox"]').each(function(index, element) {
            if($(element).attr('checked')){
				dialog = true;
			}
        });
		if(!dialog){
			$.dialog({
				skin:"dialog-blue",
                width: 400,
                title: "提示",
                content: "<p class='fnsz14'>请选择订单，进行批量通关操作，可选择多个。</p>",
                okValue: "确认",
				okClassName:'btn btn-blue',
                ok: true
            });
		}
	})
	
	//订单处理
	$('.process').toggle(function(){
		$(this).siblings('.ebook_radio').show();
		$(this).find('i').addClass('icon_active')
	},function(){
		$(this).siblings('.ebook_radio').hide();
		$(this).find('i').removeClass('icon_active')
	})
	
	//添加备注弹框
	$('.remark').click(function(){
		$.dialog({
			skin:"dialog-blue",
			width: 400,
			title: "添加备注",
			content: '<p>留言信息</p><textarea class="txtarea"></textarea>',
			okValue: "确认",
			okClassName:'btn btn-blue',
			cancelValue: "取消",
			cancelClassName: "btn btn-gray",
			ok: true,
			cancel:true
		});
	})
	
	//资源确认
	$('.refuse').click(function(){
		$.dialog({
			skin:"dialog-blue",
			width: 400,
			title: "添加备注",
			content: '<p>资源确认：<label><input type="radio"> 接受</label>&nbsp;<label><input type="radio"> 拒绝</label></p><p>拒绝理由</p><textarea class="txtarea"></textarea>',
			okValue: "确认",
			okClassName:'btn btn-blue',
			cancelValue: "取消",
			cancelClassName: "btn btn-gray",
			ok: true,
			cancel:true
		});
	})
	
	//生成订单列表
	$('.downLoad').click(function(){
		$.dialog({
			skin:"dialog-blue",
			width: 830,
			title: "订单详情",
			content: '<p class="dialogTxt">订单信息</p><table class="log_table"><thead><th>订单号</th><th>取票人</th><th>手机号</th></thead><tbody><tr><td>400524155</td><td>小白兔</td><td>1502551452</td></tr></tbody></table><p class="dialogTxt">产品信息</p><table class="log_table"><thead><th>产品名称</th><th>单价/预定数量</th><th>实付金额</th><th>游玩时间</th><th>付款方式</th><th>付款状态</th><th>取票人留言</th></thead><tbody><tr><td>上海海湾国家森林公园哪里克兰懒懒的点卡</td><td>￥250*2<p class="grey">2成人，1儿童</p></td><td><strong><span>￥</span>500</strong></td><td>2014-05-26</td><td>景区支付</td><td class="red">未付款</td><td></td></tr></tbody></table><p class="dialogTxt">游客信息</p><table class="log_table"><thead><th>游客姓名</th><th>联系电话</th><th>证件类型/号码</th></thead><tbody><tr><td>400524155</td><td>小白兔</td><td>1502551452</td></tr></tbody></table><p class="dialogTxt">配送信息</p><table class="log_table"><thead><th>收件人姓名</th><th>联系电话</th><th>邮编</th><th>地址</th></thead><tbody><tr><td>400524155</td><td>小白兔</td><td>1502551452</td><td>上海海湾国家森林公园哪里克兰懒懒的点卡</td></tr></tbody></table>',
			okValue: "确认",
			okClassName:'btn btn-blue',
			ok: true
		});
	})
	
	//操作日志弹框
	$('.czlog').click(function(){
		$.dialog({
			skin:"dialog-blue",
			width: 830,
			title: "操作日志",
			content: '<table class="log_table"><thead><th>操作详情</th><th>操作人用户名</th><th>操作人/操作时间</th></thead><tbody><tr><td>了都是借口那里是南方</td><td>了都是借口那里是南方了都是借口那里是南方</td><td><p>驴妈妈工作人员</p><p>2013-04-06</p><p>12时20分50秒</p></td></tr></tbody></table>',
			okValue: "确认",
			okClassName:'btn btn-blue',
			cancelValue: "取消",
			cancelClassName: "btn btn-gray",
			ok: true,
			cancel:true
		});
	})
	
	//搬单标记
	$('.bdmark').toggle(function(){
		$(this).text('撤销标记');
		$(this).parent().parent().addClass('mark_active');
		$(this).css('color','#ff6600')
	},function(){
		$(this).text('搬单标记');
		$(this).parent().parent().removeClass('mark_active');
		$(this).css('color','#528cd7')
	})
	
	//查询交互  ebk_tg_index.html
	$('#search').click(function(){
		var dataJson = {
			orderNumber : '',
			f_code :'',
			tel : '',
			name:'',
			startTime :'',
			endTime:''	
		};
		dataJson.orderNumber = $('#orderNumber').val();
		dataJson.f_code = $('#f_code').val();
		dataJson.tel = $('#tel').val();
		dataJson.name = $('#name').val();
		dataJson.startTime = $('#startTime').val();
		dataJson.endTime = $('#endTime').val();
		$.ajax({
			type:'GET',
			url:"data.php",
			data:dataJson,
			dataType:"json",
			success: function(res){
				//if(res.startTime=='undefined'){
					createSearch(res);
				//}else{
					console.log(res.startTime)
				//}
			}
		})
	})
	
	
	function createSearch(obj){
		var html = '';
		html = '<table class="table-list table-blue">'+
					'<thead>'+
						'<tr>'+
							'<th>订单号</th>'+
							'<th>取票人/手机号</th>'+
							'<th>产品名称</th>'+
							'<th>单价/预订数量</th>'+
							'<th>游玩时间</th>'+
							'<th>付款状态</th>'+
							'<th>实付金额</th>'+
							'<th>实际数量</th>'+
							'<th>操作</th>'+
						'</tr>'+
					'</thead><tbody>';
		for(var i=0; i<obj.datas;i++){
			html+='<tr>'+
				'<td>'+obj.ordernumber[i]+'</td>'+
				'<td>'+obj.name[i]+'<p>'+obj.tel[i]+'</p></td>'+
				'<td>'+obj.proName[i]+'<p>'+obj.ticket[i]+'</p></td>'+
				'<td>￥'+obj.price[i]+'×'+obj.peoples+'<p>'+obj.extraTxt[i]+'</p></td>'+
				'<td><input type="text" class="input-date" value="'+obj.time[i]+'"></td>'+
				'<td>'+obj.payment[i]+'</td>'+
				'<td><strong>￥'+obj.paying[i]+'</strong></td>'+
				'<td>'+
					'<select class="select_people">'+
						'<option>'+obj.ticketing[i]+'</option>'+
					'</select>'+
					'<p>'+obj.extraTxt[i]+'</p>'+
				'</td>'+
				'<td><a href="#">查看</a><br><a href="#">操作日志</a></td></tr>'
		}
		html+='</tbody></table>'
		$div = $('<div class="plist mt30"></div>').html(html);
		$('.main').append($div);
	}
	
	
	
	
	
	
	
	
	
})

function removeDate(e){
    var $parentTarget = $(e.currentTarget).parents(".line_ebk_openChoice");
    var target = $parentTarget.find("option:selected");
    $.each(target, function (index, items) {
        var value = $(items).val();
        
        if (!value)
            return true;
        var next = $(items).next().val() ? $(items).next() : $(items).prev();//判断下一个被选中的目标
        $parentTarget.find("option:selected").remove();
        next.attr("selected", "selected");
        $("td[date-map='" + value + "']").removeClass("calSelected");
        var itemGoDate=value.replace(/-/gm,"");
		var igdObj=$("#item"+itemGoDate).html();
		if(igdObj!=null){
			$("#item"+itemGoDate).remove();
		}
    });
}

/**
 * 重置日历 恢复默认样式
 * @param e 日历模板路径
 * 
 * */ 
function initCalendarDate(e){
    var $parentTarget = $(e+"  .line_ebk_openChoice");
    var target = $parentTarget.find("option");
    $.each(target, function (index, items) {
        var value = $(items).val();
        if (!value)
            return true;
        $parentTarget.find("option").remove();
        $("td[date-map='" + value + "']").removeClass("calSelected");
    });
}

function selectDateCallBack(data, e){
	var date = data.selectedDate;
    var $parentTarget = $(e.currentTarget).parents(".line_ebk_openChoice");
    var $selDate = $parentTarget.find(".selDate");

    if( !date || $selDate.find("option[value='" + date + "']").length !== 0){
        return;
    }

	$selDate.append("<option value='" + date + "'>" + date + "</option>");
}

function cancelDateCallBack(data, e){
    var date = data.selectedDate;
	var $parentTarget = $(e.currentTarget).parents(".line_ebk_openChoice");
    var $selDate = $parentTarget.find(".selDate");
    if( !date ){
        return;
    }
    $selDate.find("option[value='" + date + "']").remove();
}

function reRendarSelectedDate($dom) {
    if( !$dom ){
        return;
    }

    $parentTarget = $dom.parents(".line_ebk_choiceCalendar");
    $target = $parentTarget.find(".selDate option");

    $.each($target, function (index, items) {
        var value = $(items).val();
        if( !value ){
            return;
        }
        $parentTarget.find("td[date-map='" + value + "']").addClass("calSelected");
    });
}


//日历部分

function calendar(){
	var calendar = ebkPandora.calendar({
		trigger: ".J_calendar",
		triggerClass: "J_calendar",
		isRange: true,
		selectDateCallback: clearFunction,
		cascade: {
			days: 0, // 天数叠加一天 
			trigger: ".J_calendar",
			isTodayClick: false
		},
		template: {
			warp: '<div class="ui-calendar ui-calendar-mini"></div>',
			calControl: '<span class="month-prev" {{stylePrev}} title="上一月">‹</span><span class="month-next" {{styleNext}} title="下一月">›</span>',
			calWarp: '<div class="calwarp clearfix">{{content}}</div>',
			calMonth: '<div class="calmonth">{{content}}</div>',
			calTitle: '<div class="caltitle"><span class="mtitle">{{month}}</span></div>',
			calBody: '<div class="calbox">' +
					 '<i class="monthbg">{{month}}</i>' +
					 '<table cellspacing="0" cellpadding="0" border="0" class="caltable">' +
						 '<thead>' +
							 '<tr>' +
								 '<th class="sun">日</th>' +
								 '<th class="mon">一</th>' +
								 '<th class="tue">二</th>' +
								 '<th class="wed">三</th>' +
								 '<th class="thu">四</th>' +
								 '<th class="fri">五</th>' +
								 '<th class="sat">六</th>' +
							 '</tr>' +
						 '</thead>' +
					 '<tbody>' +
					 '{{date}}' +
					 '</tbody>' +
					 '</table>' +
					 '</div>',
			weekWarp: '<tr>{{week}}</tr>',
			day: '<td {{week}} {{dateMap}} >' +
			'<div {{className}}>{{day}}</div>' +
			'</td>'
		}
	});
}

function clearFunction(obj){ 
	$(obj.options.trigger).removeClass('error').next("i.error").remove();
	} 
	

