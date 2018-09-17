/* ebk.js */

$(function(){
	
    function ebk_hover(box_hover,hover_class){
        $(box_hover).hover(
        function(){
            $(this).addClass(hover_class);
        },function(){
            $(this).removeClass(hover_class);
        })
    };
    ebk_hover("li.nav-item","nav-item-hover");
    ebk_hover("div.nav-quick li","hover");
    
    
    // tabs
    function JS_tab_nav(tab_nav,tab_con,selected,tri_type){
        $tab_obj=$(tab_nav);
        $tab_obj.bind(tri_type,function(){
            var tab_li_index = $(tab_nav).index(this);
            $(this).addClass(selected).siblings().removeClass(selected);
            $(tab_con).eq(tab_li_index).show().siblings().hide();
            // return false;
        });
    };
    JS_tab_nav(".J-tabs li",".J-switch>.tabcon","current","click");
    
})


$(function(){ 
    
/*登陆页时间日期*/
	$(function(){
		function new_time(){ 
	        var timee = new Date();
	        var yy= timee.getFullYear();
	        var MM= timee.getMonth()+1;
	        var rr= timee.getDate();
	        var ww= timee.getDay();
	        var days= ["日","一","二","三","四","五","六" ];
	        var n="今天是："+yy+"年" +MM +"月" + rr+"日　" + "星期"+days[ww];
	        $('.login_time').text(n);
        };
        new_time();
        setInterval(new_time, 5000); 
    });
    
    
    $('#pageMessage').toggle(function(){ 
        $(this).addClass('icon_kai');
        turnOn();
    },function(){ 
        $(this).removeClass('icon_kai');
        turnOff();
    });
    
    $('#windowMessage').toggle(function(){ 
        $(this).addClass('icon_kai');
        turnTipShowOn();
    },function(){ 
        $(this).removeClass('icon_kai');
        turnTipShowOff();
    });
	
	/*时间价格表弹层*/
	$('.caldate').live('click',function(){ 
		/*整加了审核8%利润逻辑      这里定义的变量是为了酒店产品并且是目的地BU而用 */
		var $salePrice = $(this).find("input").val();
		var $payTarget = $(this).find("input").attr("data");
		var $bu = $(this).find("input").attr("data1");
		
		//dongningbo 没有时间价格表的day_box不弹出编辑窗口 start
		if (!$salePrice && !$bu && !$payTarget) {
			//空日历不弹窗，ebk不能新增时间价格。
			return;
		}
		//end
		
		var L1 = $(this).offset().left+$(this).width()+24;
		var L2 = $(this).offset().left-$('.maintain_tan').width()-4;
		var T = $(this).offset().top;
		if(L1+360>$(window).width()){
			$('.maintain_tan').show().css({'left':L2,'top':T}).find('.i_left').addClass('i_right');
		}else{
			$('.maintain_tan').show().css({'left':L1,'top':T}).find('.i_left').removeClass('i_right');
		}
		//清空数据
		$("#breakfastOne option[value='0']").attr("selected", true);
		$("#settlementPriceInputOne").val("");
		
		/*整加了审核8%利润逻辑      这里定义是预付并且是目的地BU而用 */
		if($payTarget == "PREPAID" && $bu == "DESTINATION_BU"){
			$("#marketPriceInputOne").val($salePrice);
		}else{
			$("#marketPriceInputOne").val("");
		}
		
		$("input[name=aheadBookTimeOne]").val("");
		$("#aheadHour_dayOne option[value='0']").attr("selected", true);
		$("#aheadHour_hourOne option[value='0']").attr("selected", true);
		$("#aheadHour_minuteOne option[value='0']").attr("selected", true);
		$("#stockStatusOne option[value='FULL']").attr("selected", true);
		$("input[type=radio][name=countStockOne]").each(function(){
	 		if($(this).val() == "add"){
	 			$(this).attr("checked","checked");
	 		}
		});
		$("#addStockOne").val("");
		$("#minusStockOne").val("");
		$('.maintain_tan p').html($(this).parent().attr("date-map"));
		$("input[name=applyWeekOne]").val($(this).parent().attr("week")*1+1);
		$("input[name=startDateOne]").val($(this).parent().attr("date-map"));
		$("input[name=endDateOne]").val($(this).parent().attr("date-map"));
		$("input[type=radio][name=applyTypeOne]").each(function(){
	 		if($(this).val() == "PRICE_APPLY"){
	 			$(this).attr("checked","checked");
	 			$("tr[name='fangtai']").hide();
	 			$("tr[name='jiage']").show();
	 		}
		});
		
		/*整加了审核8%利润逻辑      这里定义是预付并且是目的地BU隐藏销售价 */
		if($payTarget == "PREPAID" && $bu == "DESTINATION_BU"){
			$("#marketPriceInputOne").closest("tr").hide();
		}
		
		$("input[type=radio][name=countStock]").each(function(){
	 		if($(this).val() == "add"){
	 			$(this).attr("checked","checked");
	 		}
		});
		$("#breakfastCountOne option[value='0']").attr("selected", true);
		$("#subjectInputOne").val("");
		$("#suggestPriceInputOne").val("");
		$("#memoInputOne").val("");
		$("input[type=radio][name=baoliuOne]").each(function(){
	 		if($(this).val() == "true"){
	 			$(this).attr("checked","checked");
	 		}
		});
		$("input[type=radio][name=manfangOne]").each(function(){
	 		if($(this).val() == "MAN_FANG_FALSE"){
	 			$(this).attr("checked","checked");
	 		}
		});
		$("input[type=radio][name=chaomaiOne]").each(function(){
	 		if($(this).val() == "true"){
	 			$(this).attr("checked","checked");
	 		}
		});
		$("#baoliuQuantityOne").val(0);
	});
	
	/*关闭时间价格表弹层*/
	$('.js_close').live('click',function(){ 
		$('.maintain_tan').hide();
	});
	
	$('.maintain_tab li').click(function(){ 
		  var num = $(this).index();
		  $(this).addClass('tab_this').siblings('li').removeClass('tab_this');
		  if(num == 1){
		   $('.table_bianjia').hide();
		   $('.table_fangtai').show();
		   $('.span_superbianjia').hide();
		   $('.span_superfangtai').show();
		   
		   $('.suppGoodsGroupDiv').hide();
		   $('.hidden4Group').show();
		   $('.table_riqi').show();
		  }else if(num==2){
		   $('.table_bianjia').hide();
		   $('.table_fangtai').hide();
		   $('.hidden4Group').hide();
		   $('.table_riqi').hide();
		   $('.suppGoodsGroupDiv').show();
		   
		  }else {
		   $('.table_fangtai').hide();
		   $('.table_bianjia').show();
		   $('.span_superfangtai').hide();
		   $('.span_superbianjia').show();
		   
		   $('.suppGoodsGroupDiv').hide();
		   $('.hidden4Group').show();
		   $('.table_riqi').show();
		  };
	});
	

/*页面底部电话展开*/
    if($('.telephone_list li').length>4){
        $('.btn_show').show();
    }
    var nowH = $('.h_162').height();
    $('.btn_show').toggle(function(){ 
        var Stop = $('.telephone_box').offset().top;
        $(this).find('i').addClass('btn_hide');
        $(this).siblings('.telephone_list').css('height','auto').removeClass('h_162');
        $('html,body').animate({'scrollTop':Stop},500)
    },function(){ 
        $(this).find('i').removeClass('btn_hide');
        $(this).siblings('.telephone_list').animate({'height':nowH},300,function(){$(this).addClass('h_162');});
    });
    

/*公告信息展开收起*/
    $('.announcement_list_t h4').toggle(function(){ 
        var This = this;
        $(This).parent().next().slideDown(300,function(){
            $(This).siblings('.icon_down').addClass('icon_up');
        });
        $(This).parents('li').addClass('yidu gg_bg');
    },function(){ 
        var This = this;
        $(This).parent().next().slideUp(300,function(){
            $(This).siblings('.icon_down').removeClass('icon_up');
        });
        $(This).parents('li').removeClass('gg_bg');
    });
    
    
/*检测是否有附件*/
    var ggList = $('.js_announcement li');
    for(var i=0;i<ggList.length;i++){
        if(ggList.eq(i).find('.fujian').length>0){
            ggList.eq(i).addClass('has_fujian');
        };
    };
    
    
});


$(function(){
    // 弹窗全局配置
    (function (d) {
        d["skin"] = "dialog-blue";
        d["okClassName"] = "btn-ok";
        d["cancelClassName"] = "btn-cancel";
    }(pandora.dialog.defaults));
    
    $(".test1").click(function(){
        pandora.dialog({
            wrapClass: "dialog-info",
            width: 780,
            title: "操作日志",
            content:$("#dialog1")
        });
    })

});

//判断字符窜前后是否包含空格，true:存在、 false：不存在
function isSpaceStr(s){
	var size = s.length;
	for(var i=0;i<size;i++){
		if(i==0){
			if(s.charAt(i)==" "){
				return false;
			}
		}else if(i==size-1){
			if(s.charAt(i)==" "){
				return false;
			}	
		}
	 }
	 return true; 
}



