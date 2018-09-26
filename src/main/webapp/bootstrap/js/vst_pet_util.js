/**
*vst_pet工具类
*@author ranlongfei
*@date 2013-11-20
*/

var vst_pet_util = {
	/**
	 * 系统用户类
	 * @param showNode 显示姓名的控件
	 * @param idNode 保存ID的控件，一般是个隐藏域
	 * @param idMobile 
	 */
	superUserSuggest : function(showNode, idNode, idMobile,idOrgId) {
		$(showNode).jsonSuggest({
			url : "/vst_ebooking/ebooking/prod/route/searchUser.do",
			maxResults : 10,
			minCharacters : 1,
			onSelect : function(item) {
				$(idNode).val(item.id);
				$(idMobile).val(item.mobile);
				$(idOrgId).val(item.departmentId);
			}
		});
		//如果没有选中则清空内容
		if(idNode!=null&&idNode!=""&&$(idNode).size()>0){
			$(showNode).live('blur',function(){
				var idNodeValue = $(idNode).val();
				var length = idNodeValue.length;
				if(length<=0){
					$(this).val('');
				}
			});
		}
	},
	
	/**
	 * 系统用户类
	 * @param showNode 显示姓名的控件
	 * @param idNode 保存ID的控件，一般是个隐藏域
	 */
	superUserSuggest2 : function(showNode, idNode) {
		$(showNode).jsonSuggest({
			//url : "/vst_back/supp/supplier/searchSupplierList.do",
			url : "/vst_back/pet/permUser/searchUser.do",
			maxResults : 10,
			minCharacters : 1,
			onSelect : function(item) {
				$(idNode).val(item.id);
			}
		});
		//如果没有选中则清空内容
		if(idNode!=null&&idNode!=""&&$(idNode).size()>0){
			$(showNode).live('blur',function(){
				var idNodeValue = $(idNode).val();
				var length = idNodeValue.length;
				if(length<=0){
					$(this).val('');
				}
			});
		}
	},
	/**
     * 目的地名称列表
     * @param showNode
     * @param idNode
     * @param _flag 是否需要选中
     */
    destListSuggest : function(showNode, idNode, _flag) {
    	$(showNode).jsonSuggest({
			url : "/vst_ebooking/dest/searchDestList.do",
			//maxResults : 10,
			minCharacters : 1,
			flag:_flag,
			onSelect :  function(item) {
				$(idNode).val(item.id);
			}
		});
	},
	
	/**
	 * 可换酒店名称列表
     * @param showNode
     * @param districtName 行政区划名称
     */
	changeHotelListSuggest : function(showNode, districtName) {
		$(showNode).jsonSuggest({
			url : "/vst_ebooking/biz/changeHotel/searchChangeHotelList.do?districtName="+districtName,
			minCharacters : 1,
			onSelect : function(item) {
				fillHotelData(item.id);
			}
		});
	},
    /**
     * 行政区域
     * @param showNode
     * @param idNode
     * @param _flag 是否需要选中
     */
    districtSuggest : function(showNode, idNode, _flag) {
 	    $(showNode).jsonSuggest({
			url : "/vst_ebooking/biz/district/seachDistrict.do",
			maxResults : 10,
			minCharacters : 1,
			onSelect : function(item) {
				$(idNode).val(item.id);
			}
		});
	},
	/**
	 * 通用列表补全查询
	 * @param showNode 显示姓名的控件
	 * @param idNode 保存ID的控件，一般是个隐藏域
	 */
   commListSuggest : function(showNode,idNode,_url, _data){
	   console.info("commListSuggest");
	   $(showNode).jsonSuggest({
			url : _url,
			maxResults : 10,
			minCharacters : 1,
			data:_data,
			onSelect : function(item) {
				if(null != idNode)
				{
					$(idNode).val(item.id);
					$(idNode).trigger('input');
				}
			}
		});
   },

	/**
	 * 通用列表补全查询，如果没有查到，则判断最后一个参数值是否需要清空表单
	 * @param showNode 显示姓名的控件
	 * @param idNode   保存ID的控件，一般是个隐藏域
	 * @param _url     请求URL
	 * @param _data    请求参数
	 * @param isClean  如果没有查询出结果，是否需要清空表单
	 */
	commListSuggest : function(showNode,idNode,_url, _data, isClean){
	   $(showNode).jsonSuggest({
			url : _url,
			maxResults : 10,
			minCharacters : 1,
			data:_data,
			onSelect : function(item) {
				if(null != idNode)
				{
					$(idNode).val(item.id);
                    $(idNode).trigger('input');
				}
			}
		});
	       //判断是否需要清空
	       if(isClean){
 	        //如果没有选中则清空内容
		        if(idNode != null && idNode != "" && $(idNode).size() > 0){
			        $(showNode).live('blur',function(){
				        var idNodeValue = $(idNode).val();
				        var length = idNodeValue.length;
				        if(length <= 0){
					        $(this).val('');
				        }
			        });
		        }
	       }
	},
  
   
	 /**
	  * 可换酒店名称列表
	  * @param showNode
	  * @param districtName 行政区划名称
	  */
	 changeHotelListSuggest : function(showNode, districtName) {
	   $(showNode).jsonSuggest({
			url : "/vst_ebooking/ebooking/route/goods/timePrice/searchChangeHotelList.do?districtName="+districtName,
			minCharacters : 1,
			onSelect : function(item) {
				fillHotelData(item.id);
			}
		});
	},
   
   /**
	 * 查询主题信息
	 * @param showNode 显示姓名的控件
	 * @param idNode 保存ID的控件，一般是个隐藏域
	 * @param categoryId 品类ID
	 */
	searchBizSubject : function(showNode, idNode, categoryId) {
		$(showNode).jsonSuggest({
			url : "/vst_ebooking/ebooking/prod/route/searchBizSubject.do?categoryId="+categoryId,
			maxResults : 10,
			minCharacters : 1,
			onSelect : function(item) {
				$(idNode).val(item.id);
			}
		});
	}
};
