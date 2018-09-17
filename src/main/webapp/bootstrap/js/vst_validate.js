/**
*扩展JQuery 的验证规则，自定义验证规则不能使用属性配置方式，而且方法名不能用重复
*@author mayonghua
*@date 2013-10-28
*/

/**
 * 验证固定电话
 */
jQuery.validator.addMethod("isTel", function(value, element) {
    var tel = /^\d{3,4}-?\d{7,9}$/;//电话号码格式010-12345678   
    return this.optional(element) || (tel.test(value));       
 }, "请正确填写您的电话号码");

/**
 * 验证传真
 */
jQuery.validator.addMethod("isFax", function(value, element) {
    var fax = /^\d{3,4}-?\d{7,9}$/;//电话号码格式010-12345678   
    return this.optional(element) || (fax.test(value));       
 }, "请正确填写您的传真号码");

/**
 * 验证数字
 */
jQuery.validator.addMethod("isNum", function(value, element) {
    var num = /^[1-9]{0}\d*(\.\d{1,2})?$/;
    return this.optional(element) || (num.test(value));       
 }, "只能填写数字");
/**
 * 验证特殊字符
 */
jQuery.validator.addMethod("isChar", function(value, element) {
    var chars =  /^([\u4e00-\u9fa5]|[a-zA-Z0-9])+$/;//验证特殊字符  
    return this.optional(element) || (chars.test(value));       
 }, "不可输入特殊字符");
/**
 * 验证正整数
 */
jQuery.validator.addMethod("isInteger", function(value, element) {
    var chars =  /^[1-9]\d*|0$/;//验证正整数  
    return this.optional(element) || (chars.test(value));       
 }, "只能填写整数");

$(function(){
	
    	//文本框只能输入数字，并屏蔽输入法和粘贴 
	    $.fn.numeral = function() {      
	     $(this).css("ime-mode", "disabled"); 
	     
		    this.bind("keypress",function(e) {      
		       var code = (e.keyCode ? e.keyCode : e.which);  //兼容火狐 IE       
		            if(!$.browser.msie&&(e.keyCode==0x8))  //火狐下不能使用退格键      
		           {      
		               return ;      
		                }      
		              return code >= 48 && code<= 57;      
		   });
		    
	       this.bind("blur", function() {      
	          if (this.value.lastIndexOf(".") == (this.value.length - 1)) {      
	              this.value = this.value.substr(0, this.value.length - 1);      
	         } else if (isNaN(this.value)) {      
	           this.value = "";      
	          }      
	       });
	       
	       this.bind("paste", function() {      
	       var s = clipboardData.getData('text');      
	          if (!/\D/.test(s));      
	         value = s.replace(/^0*/, '');      
	         return false;      
	       });
	       
	       this.bind("dragenter", function() {      
	            return false;      
	        });
	       
	      this.bind("keyup", function() {      
	      if (/(^0+)/.test(this.value)) {      
	            this.value = this.value.replace(/^0*/, '');      
	           }      
	      });      
	 };
	 
	 
 	//文本框只能输入带两位小数的数字，并屏蔽输入法和粘贴 
	    $.fn.numeralTwo = function() {      
	     $(this).css("ime-mode", "disabled"); 
	     
		    this.bind("keypress",function(e) {      
		    	if (!$.browser.mozilla) {
		            if (e.keyCode && (e.keyCode < 48 || e.keyCode > 57) && e.keyCode != 46) {
		                // ie6,7,8,opera,chrome管用
		                e.preventDefault();
		            }
		        } else {
		        	if (e.charCode && (e.charCode < 48 || e.charCode > 57) && e.charCode != 46) {
		                // firefox管用
		                e.preventDefault();
		            }
		        } 
		   });
		    
	       this.bind("blur", function() {      
	          if (this.value.lastIndexOf(".") == (this.value.length - 1)) {      
	              this.value = this.value.substr(0, this.value.length - 1);      
	          } else if (isNaN(this.value)) {      
	        	  this.value = "";      
	          }
	       });
	       
	       this.bind("paste", function() {      
	       var s = clipboardData.getData('text');      
	          if (!/\D/.test(s));      
	         value = s.replace(/^0*/, '');      
	         return false;      
	       });
	       
	       this.bind("dragenter", function() {      
	            return false;      
	        });
	       
	 }; 
 
})

