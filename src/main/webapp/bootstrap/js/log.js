/******************
 * 日志页面.
 * 
 */
$(function(){
	$("a.showLogDialog").live("click",function(){
		var param=$(this).attr("param");

		if(param.indexOf('&') != -1){
				new xDialog("/lvmm_log/bizLog/showVersatileLogList?"+param,{},{title:"查看日志",iframe:true,width:1000,hight:300,iframeHeight:680,scrolling:"yes"});
				return;
			}
//			new xDialog("/lvmm_log/bizLog/find?"+param,{},{title:"日志详情页",iframe:true,width:1000,hight:500,iframeHeight:680,scrolling:"yes"});
//			return;
//		}
	    new xDialog("/vst_back/pub/comLog/findComLogList.do?param="+param,{},{title:"日志详情页",iframe:true,width:1000,hight:500,scrolling:"yes"});
	});
});