/**
*vst_pet工具类
*@author ranlongfei
*@date 2013-11-20
*/

var vst_util = {
		/**
		 * 判断输入字符长度
		 * @param id 保存ID的控件，一般是个隐藏域
		 */
		countLenth : function(id) {
			var realLength = 0;
		    var len = id.val().length;
		    var charCode = -1;
		    var maxlen = 0;
		    for(var i = 0; i < len; i++){
		    	if(realLength<=id.attr("maxlength")){
			        charCode = $(id).val().charCodeAt(i);
			        if (charCode >= 0 && charCode <= 128) { 
			            realLength += 1;
			        }else{ 
			            // 如果是中文则长度加3
			            realLength += 2;
			        }
		        }
		    	if(realLength<=id.attr("maxlength")){
		    		maxlen = maxlen+1;
		    	}
		    } 
			var wordsLenth = id.attr("maxlength") - realLength;
			id.siblings("#textWidthTip").remove();
			if(wordsLenth<0){
				id.val(id.val().substring(0,maxlen));
				wordsLenth=0;
			}
			id.after("<span id = 'textWidthTip'>还能输入" + parseInt(wordsLenth/2) + "个汉字或者"+wordsLenth+"个字母</span>");
		},
		/**
		 * 获取项目名
		 * @returns
		 */
		getRootPath:function(){
		    var curWwwPath = window.document.location.href;
		    var pathName = window.document.location.pathname;
		    return pathName.substring(0,pathName.substr(1).indexOf('/')+1);
		}
};
