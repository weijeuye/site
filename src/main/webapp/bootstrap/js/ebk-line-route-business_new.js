/**
 * 线路行程业务 相关JS
 */
$(function() {
    var $document = $(document);

    //一、绑定行程菜单按钮事件
    $document.on("click", ".gi-nav", function() {
        var productId = $("#productId").val();
        var productType = $("#productType").val();
        var categoryId=$("#categoryId").val();
        if (isEmpty(productId) || isEmpty(productType)) {
            backstage.alert({
                content: "请先创建产品"
            });
            return;
        }

        var $activeGiContent = $(".gi-contents>.gi-content.active");
        var contentType = $(this).data("content");
        var lineRouteId = $(".gi-tabs>.gi-tab.active").attr("data-id");

        if (isEmpty(lineRouteId)) {
            if (contentType != "line_route") {
                backstage.alert({
                    content: "请先创建行程"
                });
                $activeGiContent.find(".JS_line_route").trigger("click");
            }
            return;
        }

        if (contentType != "line_route") {
            var hasRouteDetail = $activeGiContent.find(".gi-form.JS_inner_line").find(".JS_has_route_detail").val();
            if (hasRouteDetail == "N") {
                backstage.alert({
                    content: "请先维护行程明细"
                });
                $activeGiContent.find(".JS_line_route").trigger("click");
                return;
            }
        }

        //获取当前点击的gi-content
        var $giContent = $(this).closest(".gi-content");
        //获取当前点击的gi-forms
        var $giForms = $giContent.find(".gi-forms");

        switch (contentType) {
            case "line_route"://行程维护
                loadLineRoute($giForms, productId, productType, lineRouteId);
                break;
            case "cost_include"://费用包含
                loadCostInclude($giForms, productId, productType, lineRouteId);
                break;
            case "cost_exclude"://费用不包含
                loadCostExclude($giForms, productId, productType, lineRouteId);
                break;
            case "activity_recommended"://活动推荐
                loadActivityRecommended($giForms, productId, lineRouteId,categoryId);
                break;
            default :
                console.log("contentType occurs error, contentType:" + contentType);
                break;
         }
    });

    //二、绑定保存or保存并下一步事件
    $document.off("click", ".JS_line_travel_save,.JS_line_travel_save_and_next");
    $document.on("click", ".JS_line_travel_save,.JS_line_travel_save_and_next", function() {

        validatorHandler(this, function($this) {

            var saveContentType = $this.attr("data-type");
            switch (saveContentType) {
                case "line_route_save": //线路行程
                    saveLineRoute($this);
                    break;
                case "cost_include_inner"://保存费用包含（国内）
                    saveCostIncludeInner($this);
                    break;
                case "cost_include_outside"://保存费用包含（出境）
                    saveCostIncludeOutside($this);
                    break;
                case "cost_exclude_inner"://保存费用不包含（国内）
                    saveCostExcludeInner($this);
                    break;
                case "cost_exclude_outside"://保存费用不包含（出境）
                    saveCostExcludeOutside($this);
                    break;
                default :
                   console.log("saveContentType occurs error, saveContentType:" + saveContentType);
                   break;
            }

        });

    });

    //（三）为行程查看操作日志按钮绑定事件
    $document.off("click", ".JS_line_travel_view_log");
    $document.on("click", ".JS_line_travel_view_log", function() {
        var $giTab = $(".JS_line_travel").find(".gi-tabs>.gi-tab.active");
        var routeId = $giTab.attr("data-id");
        if (isEmpty(routeId)) {
            backstage.alert({
                content: "请先选择行程天数，并点击保存。"
            });
            return;
        }
        var objectType='PROD_LINE_ROUTE';
        var param = 'objectId='+routeId+'&objectType=PROD_LINE_ROUTE&sysName=VST';
        var winHeight = $(window).height();
        window.dialogViewOperateLogIframe = backstage.dialog({
            title: "日志",
            iframe: true,
            url: "http://super.lvmama.com/lvmm_log/bizLog/findLogList?"+param,
            width: 1200,
            height: winHeight-40,
            className: "dialog-iframe dialog-operate-log"
        });
        window.dialogViewOperateLogIframe.$dialog.css("height", winHeight);
    });

    //（四）为新行程明细维护提供入口
    $document.off("click", ".JS_go_new_route_detail");
    $document.on("click", ".JS_go_new_route_detail", function() {
        var $giTab = $(".JS_line_travel").find(".gi-tabs>.gi-tab.active");
        var routeId = $giTab.attr("data-id");
        var categoryId=$("#categoryId").val();
        if (isEmpty(routeId)) {
            backstage.alert({
                content: "请先选择行程天数，并点击保存。"
            });
            return;
        }
        window.open("/vst_ebooking/ebooking/dujia/comm/route/detail/showRouteDetail.do?routeId="+routeId+"&categoryId="+categoryId);
    });

    /*           加载页面JS start            */
    //1. 加载行程维护页面
    function loadLineRoute($giForms, productId, productType, lineRouteId) {
        var $fillPosition = $giForms.find(".JS_inner_line");
        var requestUrl = "/vst_ebooking/ebooking/dujia/group/route/showLineRoute.do?productId="+productId+"&productType="+productType+"&lineRouteId="+lineRouteId+"&isNewLine=Y";
        showMainContent($fillPosition, requestUrl);
    }

    //2. 加载费用包含页面
    function loadCostInclude($giForms, productId, productType, lineRouteId) {
        var requestUrl = "";
        var $fillPosition = "";
        if (productType == 'INNERSHORTLINE' || productType == 'INNERLONGLINE' || productType == 'INNER_BORDER_LINE') {// 国内-短线 or 国内-长线
            requestUrl = "/vst_ebooking/ebooking/dujia/group/route/costinclude/showCostIncludeInner.do?productId="+productId+"&productType="+productType+"&lineRouteId="+lineRouteId+"&isNewLine=Y";
            $fillPosition = $giForms.find(".JS_inner_include_internal");
        } else if (productType == 'FOREIGNLINE') {// 出境/港澳台
            requestUrl="/vst_ebooking/ebooking/dujia/group/route/costinclude/showCostIncludeOutside.do?productId="+productId+"&productType="+productType+"&lineRouteId="+lineRouteId+"&isNewLine=Y";
            $fillPosition = $giForms.find(".JS_inner_include_abroad");
        }
        showMainContent($fillPosition, requestUrl);
    }

    //3. 加载费用不包含页面
    function loadCostExclude($giForms, productId, productType, lineRouteId) {
        var requestUrl = "";
        var $fillPosition = "";
        if (productType == 'INNERSHORTLINE' || productType == 'INNERLONGLINE' || productType == 'INNER_BORDER_LINE') {// 国内-短线 or 国内-长线
            requestUrl = "/vst_ebooking/ebooking/dujia/group/route/costexclude/showCostExcludeInner.do?productId="+productId+"&productType="+productType+"&lineRouteId="+lineRouteId+"&isNewLine=Y";
            $fillPosition = $giForms.find(".JS_inner_not_include_internal");
        } else if (productType == 'FOREIGNLINE') {// 出境/港澳台
            requestUrl = "/vst_ebooking/ebooking/dujia/group/route/costexclude/showCostExcludeOutside.do?productId="+productId+"&productType="+productType+"&lineRouteId="+lineRouteId+"&isNewLine=Y";
            $fillPosition = $giForms.find(".JS_inner_not_include_abroad");
        }
        showMainContent($fillPosition, requestUrl);
    }

    //4. 加载活动推荐页面
    function loadActivityRecommended($giForms, productId, lineRouteId,categoryId) {
        var requestUrl = "/vst_ebooking/ebooking/dujia/group/route/showActivityRecommended.do?productId="+productId+"&lineRouteId="+lineRouteId+"&categoryId="+categoryId+"&isNewLine=Y";
        var $fillPosition = $giForms.find(".JS_inner_activity");
        showMainContent($fillPosition, requestUrl);
    }

    //渲染页面内容（$fillPositionDiv：要填入的div的class对象，requestUrl：请求url）
    function showMainContent($fillPositionDiv, requestUrl) {
        if ($fillPositionDiv.length <= 0 || requestUrl == "") {
            console.log("Call showMainContent method occurs error, params exists null");
            return;
        }

        $fillPositionDiv.html("正在努力加载中......");
        $.get(requestUrl, function(result) {
            $fillPositionDiv.html(result);
        });
    }
    /*           加载页面JS end            */

    /*           保存表单JS start            */
    //1.行程相关JS
    //（1） 保存行程
    function saveLineRoute($this){
        //校验当前行程前是否有尚未保存的其他行程
        var $giTabs = $(".gi-tabs>.gi-tab.active").prevAll();
        if ($giTabs.length > 0) {
            //转化为数组并对其倒排序
            var giTabArr = $.makeArray($giTabs);
            giTabArr.reverse();

            var noSaveRouteName = "";
            $.each(giTabArr, function(index, giTab) {
                if (isEmpty($(giTab).attr("data-id"))) {
                    noSaveRouteName += $(giTab).find("em>i").html() + "、";
                }
            });

            if (noSaveRouteName) {
                noSaveRouteName = noSaveRouteName.substring(0, noSaveRouteName.length-1);
                backstage.alert({
                    content: noSaveRouteName + "尚未保存，请先将其保存"
                });
                return;
            }
        }

        //获得当前的FORM
        $form = $this.closest(".prodLineRouteForm");


        //将productId填入行程form中
        var $hideProductId = $form.find(".lineRouteHiddenDiv>input[name='productId']");
        if (isEmpty($hideProductId.val())) {
            var productId = $("#productId").val();
            $hideProductId.val(productId);
        }

        //使用新行程明细维护页所以此处不再做该事情
        //处理行程明细中的title（输入的多个地点信息）拼接为title字段
        /*var result = buildRouteDetailTitle($form);
        if (result.tip) {
            $.alert(result.message);
            return;
        }

        if ($this.data("saving")) {
            return;
        }

        //改变保存按钮状态
        changeSaveButtonStatus($form, true);

        //校验是否存在敏感词
        var msg = '';
        //（调用的是showProductFrame.ftl中的方法，第二个参数为是否异步）
        if(validateSensitiveWord($form.find("textarea"), false)){
            $("input[name=senisitiveFlag]").val("Y");
            msg = '内容含有敏感词,是否继续?';
        }else {
            $("input[name=senisitiveFlag]").val("N");
        }

        if (isEmpty(msg)) {
            sendAjaxSaveRouteValid($this, $form);
        } else {
            $.confirm(msg, function() {
                sendAjaxSaveRouteValid($this, $form);
            }, function() {
                changeSaveButtonStatus($form, false);
            });
            $(".overlay").show();
            $(".dialog-close").remove();
        }*/

        sendAjaxSaveRoute($this, $form);
    }

    function sendAjaxSaveRouteValid($this, $form) {
        //校验行程中的行程天数与行程明细是否一致，不一致给出提示
        var routeNum = $form.find("select[name='routeNum']").val();
        var stayNum = $form.find("select[name='stayNum']").val();
        var routeDeailNum = $form.find(".JS_days>.JS_day").length;
        if (routeNum != routeDeailNum) {
            var tipMessage = "实际输入行程天数为"+routeDeailNum+"天"+stayNum+"晚，与下拉框日期不符，是否确定？";
            backstage.confirm({
            	content:tipMessage,
            	width:500,
                height:150,
                padding:30,
                determineCallback: function () {
                	sendAjaxSaveRoute($this, $form);
                },
                cancelCallback: function () {
                	changeSaveButtonStatus($form, false);
                }
            });
            $(".overlay").show();
            $(".dialog-close").remove();
        } else {
            sendAjaxSaveRoute($this, $form);
        }

    }

    //发送ajax保存行程信息
    function sendAjaxSaveRoute($this, $form) {

        $.ajax({
            url: "/vst_ebooking/ebooking/dujia/group/route/saveLineRoute.do",
            data: $form.serialize(),
            type: "POST",
            dataType: "JSON",
            success: function(result) {
                if (result.code=="success") {
                    //重新渲染左侧的gi-tab标签
                    reShowGiTab(result.attributes.lineRouteId);

                    var $avtiveGiContent = $(".gi-contents>.gi-content.active");
                    //如果是保存并下一步
                    if ($this.is(".JS_line_travel_save_and_next")) {
                        //点击一下 费用包含
                        $avtiveGiContent.find(".JS_cost_include").trigger("click");
                    } else {
                        //点击一下 线路行程
                        $avtiveGiContent.find(".JS_line_route").trigger("click");
                    }

                    $.saveAlert({"width": 150,"type": "success","text": result.message});
                } else {
                    $.saveAlert({"width": 250,"type": "danger","text": result.message});
                }
                 //刷新线路行程
                if($this.is(".JS_line_travel_save")){
                  
                 if($("#btnLineTravel")){
                     $("#btnLineTravel").trigger("click");
                  }
                }

                changeSaveButtonStatus($form, false);
            },
            error: function() {
                //改变保存按钮状态
                changeSaveButtonStatus($form, false);
                console.log("Call sendAjaxSaveRoute method occurs error");
                $.saveAlert({"width": 250,"type": "danger","text": "网络服务异常, 请稍后重试"});
            }
        });
    }

    //重新渲染左侧的gi-tab标签
    function reShowGiTab(lineRouteId) {
        //当前选中的tab
        $activeTab = $(".gi-tabs>.gi-tab.active");
        //当前选中的content
        $activeContent = $(".gi-contents>.gi-content.active");

        $activeTab.attr("data-id", lineRouteId);
        $activeTab.attr("data-status", "Y");
        $activeTab.removeClass("disabled");
        $activeTab.find(".JS_button_copy").show();
        $activeTab.find(".JS_button_disable").show();
        $activeTab.find(".JS_text_disabled").text("有效");
        $activeTab.find(".JS_button_disable").html("设为无效");
        $activeContent.find(".JS_is_disabled").val(false);
    }

    //构建行程明细中的title
    function buildRouteDetailTitle($form) {
        var result = {};
        result.message = "";
        result.tip = false;

        $JS_days = $form.find(".JS_days>.JS_day");
        if ($JS_days.length <= 0) {
            return;
        }

        $.each($JS_days, function(index, JS_day) {
            $JS_day = $(JS_day);
            $JS_destinations = $JS_day.find(".JS_destinations>.JS_destination");
            if ($JS_destinations.length <= 0) {
                return true;
            }

            $JS_title = $JS_day.find(".lineRouteDetailHiddenDiv>.JS_title");
            var title = "";
            $.each($JS_destinations, function(index, JS_destination) {
                $JS_destination = $(JS_destination);
                $dest_input = $JS_destination.find("input[type='text']");
                title += $dest_input.val() + "—";
            });

            //删除字符串中最后一个'—'号
            if (title != "") {
                title = title.substring(0, title.length-1);
            } else {
               result.tip = true;
               result.message = "行程明细中地点信息不能为空";
            }

            $JS_title.val(title);
        });

        return result;
    }

    //绑定行程的复制or有效、无效事件
    $(document).on("click", ".JS_button_copy, .JS_button_disable", function() {
        $this = $(this);
        if ($this.is(".JS_button_copy")) {//复制
            copyRoute($this);
        } else if ( $this.is(".JS_button_disable")) {//设置有效、无效
            invalidRoute($this);
        }
    });

    //（2）行程复制
    function copyRoute($this) {
        var $tab = $this.closest(".gi-tab");
        var routeId = $tab.data("id");
        var routeName = $tab.find("em>i").html();
        if (isEmpty(routeId)) {
            backstage.alert({
                content: "无效的行程ID"
            });
        }

        backstage.confirm({
        	content:"确认要复制\""+routeName+"\"？",
        	width:500,
            height:150,
            padding:30,
            determineCallback: function () {
            	 $this.text("复制中...");
                 $this.addClass("disabled");
                 
                 $.ajax({
                     url: '/vst_ebooking/ebooking/dujia/group/route/copyRoute.do',
                     data: {lineRouteId:routeId},
                     type: 'GET',
                     dataType: 'JSON',
                     error: function() {
                         $this.text("复制");
                         $this.removeClass("disabled");
                         console.log("Call copyRoute method occurs error");
                         $.saveAlert({"width": 250,"type": "danger","text": "网络服务异常, 请稍后重试"});
                     },
                     success: function(result) {
                         if (result.code=="success") {
                              $.saveAlert({"width": 150,"type": "success","text": result.message});
                              $("#btnLineTravel").trigger("click");
                         } else {
                             $.saveAlert({"width": 250,"type": "danger","text": result.message});
                         }

                         $this.text("复制");
                         $this.removeClass("disabled");

                         $("#btnLineTravel").removeClass("active");
                         $("#btnLineTravel").trigger("click");
                     }
                 });
            }
        });
    }

    //（3）设置行程（有效/无效）
    function invalidRoute($this) {
        var $tab = $this.closest(".gi-tab");
        var routeId = $tab.attr("data-id");
        var routeStatus = $tab.attr("data-status");

        var routeName = $tab.find("em>i").html();
        if (isEmpty(routeId)) {
            backstage.alert({
                content: "无效的行程ID"
            });
        }

        //如果将行程由 有效->无效时给出提示
        if (routeStatus == "Y") {
            backstage.confirm({
            	content:"设置无效，对应的\""+routeName+"\"的时间价格表也会无效，确认操作？",
            	width:500,
                height:150,
                padding:30,
                determineCallback: function () {
                	sendAjaxSetRouteStatus($this, routeId, routeStatus);
                }
            });
        } else {
        	sendAjaxSetRouteStatus($this, routeId, routeStatus);
        }

    }

    //发送ajax请求设置行程的状态
    function sendAjaxSetRouteStatus($this, routeId, routeStatus) {
        $this.text("设置中...");
        $this.addClass("disabled");

        var aFailedText = "";
        var aSuccessText = "";
        var pText = "";
        if (routeStatus == "Y") {
            aFailedText = "设为无效";
            aSuccessText = "设为有效";
            pText = "无效";
        } else {
            aFailedText = "设为有效";
            aSuccessText = "设为无效";
            pText = "有效";
        }

        $.ajax({
            url: '/vst_ebooking/ebooking/dujia/group/route/setStatus.do',
            data: {lineRouteId:routeId},
            type: 'GET',
            dataType: 'JSON',
            error: function() {
                $this.text(aFailedText);
                $this.removeClass("disabled");
                console.log("Call sendAjaxSetRouteStatus method occurs error");
                $.saveAlert({"width": 250,"type": "danger","text": "网络服务异常, 请稍后重试"});
            },
            success: function(result) {
                if (result.code=="success") {
                     $this.text(aSuccessText);
                     $this.closest(".gi-tab").find(".JS_text_disabled").text(pText);
                     $tab = $this.closest(".gi-tab");
                     if (routeStatus == "Y") {
                         $tab.attr("data-status", "N");
                         $tab.addClass("disabled");
                     } else {
                         $tab.removeClass("disabled");
                         $tab.attr("data-status", "Y");
                     }
                     $.saveAlert({"width": 150,"type": "success","text": result.message});
                } else {
                    $this.text(aFailedText);
                    $.saveAlert({"width": 250,"type": "danger","text": result.message});
                }

                $this.removeClass("disabled");
            }
        });
    }

    //2. 保存费用包含（国内）
    function saveCostIncludeInner($this){
        //获得当前的FORM
        var $form = $this.closest(".costIncludeInnerForm");
        //获得当前FORM下的隐藏域DIV
        var $hiddenDiv = $form.find(".costIncludeInnerHiddenDiv");
        var result = assignForHidenInput($hiddenDiv);
        if (result.tip) {
            backstage.alert({
                content: result.message
            });
            return;
        }

        //判断当前保存状态
        if ($this.data("saving")) {
            return;
        }
        //改变保存按钮状态
        changeSaveButtonStatus($form, true);

        $.ajax({
            url: "/vst_ebooking/ebooking/dujia/group/route/costinclude/saveCostIncludeInner.do",
            data: $form.serialize(),
            type: "POST",
            dataType: "JSON",
            success: function(result) {
                if (result.code=="success") {
                    var $avtiveGiContent = $(".gi-contents>.gi-content.active");
                    //如果是保存并下一步
                    if ($this.is(".JS_line_travel_save_and_next")) {
                        //点击一下 费用不包含
                        $avtiveGiContent.find(".JS_cost_exclude").trigger("click");
                    } else {
                        //点击一下 费用包含
                        $avtiveGiContent.find(".JS_cost_include").trigger("click");
                    }

                    $.saveAlert({"width": 150,"type": "success","text": result.message});
                } else {
                    $.saveAlert({"width": 250,"type": "danger","text": result.message});
                }

                //改变保存按钮状态
                changeSaveButtonStatus($form, false);
            },
            error: function() {
                //改变保存按钮状态
                changeSaveButtonStatus($form, false);
                console.log("Call saveCostIncludeInner method occurs error");
                $.saveAlert({"width": 250,"type": "danger","text": "网络服务异常, 请稍后重试"});
            }
         });
      }

    //3. 保存费用包含（出境）
    function saveCostIncludeOutside($this){
        //获得当前的FORM
        var $form = $this.closest(".costIncludeOutsideForm");

        //获得当前FORM下的隐藏域DIV
        var $hiddenDiv = $form.find(".costIncludeOutsideHiddenDiv");
        var result = assignForHidenInput($hiddenDiv);
        if (result.tip) {
            backstage.alert({
                content: result.message
            });
            return;
        }

        //判断当前保存状态
        if ($this.data("saving")) {
            return;
        }
        //改变保存按钮状态
        changeSaveButtonStatus($form, true);

        $.ajax({
            url: "/vst_ebooking/ebooking/dujia/group/route/costinclude/saveCostIncludeOutside.do",
            data: $form.serialize(),
            type: "POST",
            dataType: "JSON",
            success: function(result) {
                if (result.code=="success") {
                    var $avtiveGiContent = $(".gi-contents>.gi-content.active");
                    //如果是保存并下一步
                    if ($this.is(".JS_line_travel_save_and_next")) {
                        //点击一下 费用不包含
                        $avtiveGiContent.find(".JS_cost_exclude").trigger("click");
                    } else {
                        //点击一下 费用包含
                        $avtiveGiContent.find(".JS_cost_include").trigger("click");
                    }

                    $.saveAlert({"width": 150,"type": "success","text": result.message});
                } else {
                    $.saveAlert({"width": 250,"type": "danger","text": result.message});
                }

                //改变保存按钮状态
                changeSaveButtonStatus($form, false);
            },
            error: function() {
                //改变保存按钮状态
                changeSaveButtonStatus($form, false);
                console.log("Call saveCostIncludeOutside method occurs error");
                $.saveAlert({"width": 250,"type": "danger","text": "网络服务异常, 请稍后重试"});
            }
         });
    }

    //4. 保存费用不包含（国内）
    function saveCostExcludeInner($this){
        //获得当前的FORM
        var $form = $this.closest(".costExcludeInnerForm");

        //获得当前FORM下的隐藏域DIV
        var $hiddenDiv = $form.find(".costExcludeInnerHiddenDiv");
        var result = assignForHidenInput($hiddenDiv);
        if (result.tip) {
        	backstage.alert({
                content: result.message
            });
            return;
        }

        //判断当前保存状态
        if ($this.data("saving")) {
            return;
        }
        //改变保存按钮状态
        changeSaveButtonStatus($form, true);

        $.ajax({
            url: "/vst_ebooking/ebooking/dujia/group/route/costexclude/saveCostExcludeInner.do",
            data: $form.serialize(),
            type: "POST",
            dataType: "JSON",
            success: function(result) {
                if (result.code=="success") {
                    var $avtiveGiContent = $(".gi-contents>.gi-content.active");
                    //如果是保存并下一步
                    if ($this.is(".JS_line_travel_save_and_next")) {
                        //点击一下 活动推荐
                        $avtiveGiContent.find(".JS_activity_recommended").trigger("click");
                    } else {
                        //点击一下 费用不包含
                        $avtiveGiContent.find(".JS_cost_exclude").trigger("click");
                    }

                    $.saveAlert({"width": 150,"type": "success","text": result.message});
                } else {
                    $.saveAlert({"width": 250,"type": "danger","text": result.message});
                }

                //改变保存按钮状态
                changeSaveButtonStatus($form, false);
            },
            error: function() {
                //改变保存按钮状态
                changeSaveButtonStatus($form, false);
                console.log("Call saveCostExcludeInner method occurs error");
                $.saveAlert({"width": 250,"type": "danger","text": "网络服务异常, 请稍后重试"});
            }
        });
    }

    //5. 保存费用不包含（出境）
    function saveCostExcludeOutside($this){
        //获得当前的FORM
        var $form = $this.closest(".costExcludeOutsideForm");

        //获得当前FORM下的隐藏域DIV
        var $hiddenDiv = $form.find(".costExcludeOutsideHiddenDiv");
        var result = assignForHidenInput($hiddenDiv);
        if (result.tip) {
        	backstage.alert({
                content: result.message
            });
            return;
        }

        //判断当前保存状态
        if ($this.data("saving")) {
            return;
        }
        //改变保存按钮状态
        changeSaveButtonStatus($form, true);

        $.ajax({
            url: "/vst_ebooking/ebooking/dujia/group/route/costexclude/saveCostExcludeOutside.do",
            data: $form.serialize(),
            type: "POST",
            dataType: "JSON",
            success: function(result){
                if (result.code=="success") {
                    var $avtiveGiContent = $(".gi-contents>.gi-content.active");
                    //如果是保存并下一步
                    if ($this.is(".JS_line_travel_save_and_next")) {
                        //点击一下 活动推荐
                        $avtiveGiContent.find(".JS_activity_recommended").trigger("click");
                    } else {
                        //点击一下 费用不包含
                        $avtiveGiContent.find(".JS_cost_exclude").trigger("click");
                    }

                    $.saveAlert({"width": 150,"type": "success","text": result.message});
                } else {
                    $.saveAlert({"width": 250,"type": "danger","text": result.message});
                }

                //改变保存按钮状态
                changeSaveButtonStatus($form, false);
            },
            error: function() {
                //改变保存按钮状态
                changeSaveButtonStatus($form, false);
                console.log("Call saveCostExcludeOutside method occurs error");
                $.saveAlert({"width": 250,"type": "danger","text": "网络服务异常, 请稍后重试"});
            }
        });
    }

    //公共方法：为FORM中的隐藏域赋值
    function assignForHidenInput($hiddenDiv) {
        var result = {};
        result.tip = false;
        result.message = "";

        var lineRouteDescId = $hiddenDiv.find("input[name='lineRouteDescId']").val();

        //如果是新增
        if (isEmpty(lineRouteDescId)) {
            var categoryId = $("#categoryId").val();
            var productId = $("#productId").val();
            var productType = $("#productType").val();

            if (isEmpty(categoryId) || isEmpty(productId) || isEmpty(productType)) {
                result.tip = true;
                result.message = "产品基础信息不全，请先尝试维护产品信息";
                return result;
            }

            //当前选中的tab
            $activeTab = $(".gi-tabs>.gi-tab.active");
            var lineRouteId = $activeTab.attr("data-id");
            if (isEmpty(lineRouteId)) {
                result.tip = true;
                result.message = "请先创建行程";
                return result;
            }

            $hiddenDiv.find("input[name='categoryId']").val(categoryId);
            $hiddenDiv.find("input[name='productId']").val(productId);
            $hiddenDiv.find("input[name='productType']").val(productType);
            $hiddenDiv.find("input[name='lineRouteId']").val(lineRouteId);
        }

        return result;
    }

    //公共方法：改变 保存、保存并下一步 按钮的状态（isLoading：true 保存前 false 保存结束后）
    function changeSaveButtonStatus($form, isLoading) {
        var $saveButton = $form.find(".JS_line_travel_save");
        var $saveButtonNext = $form.find(".JS_line_travel_save_and_next");

        if (isLoading) {
            $saveButton.html("保存中");
            $saveButtonNext.html("保存中");
            $saveButton.attr("data-saving", true);
            $saveButtonNext.attr("data-saving", true);
            $saveButton.addClass("disabled");
            $saveButtonNext.addClass("disabled");
        } else {
            $saveButton.html("保存");
            $saveButtonNext.html("保存并下一步");
            $saveButton.attr("data-saving", false);
            $saveButtonNext.attr("data-saving", false);
            $saveButton.removeClass("disabled");
            $saveButtonNext.removeClass("disabled");
        }
    }

    /*           保存表单JS end            */

    /*           预览JS start            */
    //预览费用包含国内
    $document.on("click", ".JS_cost_include_preview", function () {
        var $form = $(this).closest(".costIncludeInnerForm");
        var params = decodeURIComponent($form.serialize(),true);
        params = encodeURI(encodeURI(params));
        window.dialogLineTravelPreviewsIframe = backstage.dialog({
            title: "费用包含（国内）",
            iframe: true,
            url: "/vst_ebooking/ebooking/dujia/group/route/costinclude/previewCostIncludeNew.do?preview=inner&" + params,
            width: 580,
            height: 430,
            className: "dialog-iframe"
        });
        window.dialogLineTravelPreviewsIframe.$dialog.css("height", 480);
    });

    //预览费用包含出境
    $document.on("click", ".JS_cost_include_outside_preview", function () {
        var $form = $(this).closest(".costIncludeOutsideForm");
        var params = decodeURIComponent($form.serialize(),true);
        params = encodeURI(encodeURI(params));
        window.dialogLineTravelPreviewsIframe = backstage.dialog({
            title: "费用包含（出境）",
            iframe: true,
            url: "/vst_ebooking/ebooking/dujia/group/route/costinclude/previewCostIncludeNew.do?preview=outside&" + params,
            width: 580,
            height: 430,
            className: "dialog-iframe"
        });
        window.dialogLineTravelPreviewsIframe.$dialog.css("height", 480);
    });

    //预览费用不包含 国内 
    $document.on("click", ".JS_cost_exclude_preview", function () {
        var $form = $(this).closest(".costExcludeInnerForm");
        var params = decodeURIComponent($form.serialize(),true);
        params = encodeURI(encodeURI(params));
        window.dialogLineTravelPreviewsIframe = backstage.dialog({
            title: "费用不包含（国内）",
            iframe: true,
            url: "/vst_ebooking/ebooking/dujia/group/route/costexclude/previewCostExcludeNew.do?preview=inner&" + params,
            width: 580,
            height: 430,
            className: "dialog-iframe"
        });
        window.dialogLineTravelPreviewsIframe.$dialog.css("height", 480);
    });

    //预览费用不包含 出境
    $document.on("click", ".JS_cost_exclude_outside_preview", function () {
        var requestUrl = "/vst_ebooking/ebooking/dujia/group/route/costexclude/previewCostExclude.do?preview=outside";
        var $form = $(this).closest(".costExcludeOutsideForm");
        var params = decodeURIComponent($form.serialize(),true);
        params = encodeURI(encodeURI(params));
        window.dialogLineTravelPreviewsIframe = backstage.dialog({
            title: "费用不包含（出境）",
            iframe: true,
            url: "/vst_ebooking/ebooking/dujia/group/route/costexclude/previewCostExcludeNew.do?preview=outside&" + params,
            width: 580,
            height: 430,
            className: "dialog-iframe"
        });
        window.dialogLineTravelPreviewsIframe.$dialog.css("height", 480);
    });

    /*           预览JS end            */

    //公共方法：判断参数为空
    function isEmpty(value) {
        if (typeof(value) == 'undefined' || value == null || value == "") {
            return true;
        } else {
            return false;
        }
    }
});
