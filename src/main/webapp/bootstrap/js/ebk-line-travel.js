/**
 * Jiang Sheng
 * 2015-08-18
 * EBK线路行程
 */

/**
 * jQuery警示框插件saveAlert
 * Jiang Sheng
 * 2015-08-18
 */
(function ($) {

    var defaults = {
        "type": "success",
        "width": 100,
        "height": 30,
        "lineHeight": 30,
        "text": "警告内容",
        "hideTime": 1000,
        "callback": function () {
        }
    };

    $.saveAlert = function (options) {

        options = $.extend(defaults, options);

        var $body = $("body");

        var $alert = $('<div class="gi-alert"></div>');
        $alert.css({
            "width": options.width + "px",
            "height": options.height + "px",
            "lineHeight": options.lineHeight + "px",
            "marginLeft": -options.width / 2 + "px",
            "marginTop": -options.height / 2 + "px"
        });
        $alert.html(options.text);

        $body.append($alert);

        switch (options.type) {
            case "success":
                $alert.addClass("gi-alert-success");
                break;
            case "danger":
                $alert.addClass("gi-alert-danger");
                break;
        }

        //执行回调函数
        options.callback();

        //自动隐藏并销毁
        setTimeout(function () {
            $alert.fadeOut(500, function () {
                $alert.remove();
            });
        }, options.hideTime);

        //返回对象方便手动销毁
        return {
            "$alert": $alert,
            "destroy": function () {
                $alert.remove();
            }
        };
    };

})(jQuery);

/**
 * jQuery弹出框 addDialog
 * Jiang Sheng
 * 2015-08-18
 */
(function ($) {

    var defaults = {
        "width": 700,
        "height": 510,
        "ok": true,
        "cancel": false,
        "okText": "确认",
        "cancelText": "取消",
        "okCallback": function ($content) {
        },
        "cancelCallback": function ($content) {
        },
        "callback": function () {
        }
    };

    $.addDialog = function (options) {

        options = $.extend(defaults, options);

        var $body = $("body");

        var $dialog = $('<div class="gi-dialog">\
        <div class="gi-dialog-title">\
            新增推荐项目\
        </div>\
        <div class="gi-dialog-content"></div>\
        <div class="gi-dialog-buttons">\
        </div>\
        <div class="gi-dialog-close">×</div>\
        </div>');

        var $buttons = $dialog.find(".gi-dialog-buttons");

        if (options.ok) {
            $ok = $('<div class="gi-button gi-dialog-ok">' + options.okText + '</div>');
            $buttons.append($ok);
            $ok.on("click", function () {


                var ret = options.okCallback($content);


                //如果返回false 不消失
                if (ret !== false) {

                    destroy();
                }


            });
        }
        if (options.cancel) {
            $cancel = $('<div class="gi-button gi-dialog-cancel">' + options.cancelText + '</div>');
            $buttons.append($cancel);
            $cancel.on("click", function () {


                var ret = options.cancelCallback($content);


                //如果返回false 不消失
                if (ret !== false) {

                    destroy();
                }


            });
        }

        $dialog.css({
            "width": options.width + "px",
            "height": options.height + "px",
            "marginLeft": -options.width / 2 + "px",
            "marginTop": -options.height / 2 + "px"
        });

        var $contentBox = $dialog.find(".gi-dialog-content");

        var $content = options.$content.clone();

        var $close = $dialog.find(".gi-dialog-close");


        $close.on("click", function () {


            destroy();

        });

        function destroy() {
            $dialog.remove();
            $mask.remove();

        }

        $contentBox.append($content);

        //遮罩
        var $mask = $('<div class="gi-mask"></div>');
        $mask.show();
        $dialog.show();

        $body.append($mask);
        $body.append($dialog);

        //执行回调函数
        options.callback();

        //返回对象方便手动销毁
        return {
            "$dialog": $dialog,
            "$mask": $mask,
            "destroy": destroy
        };
    };

})(jQuery);

(function () {

    var $document = $(document);
    var $body = $("body");

    var travelArea = "";
    var productType = $("#productType").val();
    if (productType == "INNERSHORTLINE" || productType == "INNERLONGLINE" || productType == "INNER_BORDER_LINE" || productType == "INNERLINE") {
        travelArea = "internal";
    } else {
        travelArea = "abroad";
    }

    var lineTravel = null;
    var days = null;
    var $template = null;
    var $templateInner = null;
    var $lineTravel = null;
    var Days = null;

    //线路行程初始化
    function lineTravelInit() {

        //模板
        $template = $(".JS_template");

        //模板内嵌套模板
        $templateInner = $(".JS_template_inner");

        //行程
        $lineTravel = $(".JS_line_travel");

        //AB行程
        lineTravel = {
            //行程个数
            length: $lineTravel.find(".gi-tabs").find(".gi-tab:not('.gi-tab-add')").length,

            //当前行程
            pos: 0,

            //行程对应的DOM元素
            $domEle: $lineTravel,

            //选项卡标签
            $tabs: $lineTravel.find(".gi-tabs"),
            //选项卡标签模板
            tabTemplateQuery: ".gi-tab",

            //选项卡内容
            $contents: $lineTravel.find(".gi-contents"),
            //选项卡内容模板
            contentTemplateQuery: ".gi-content"
        };

        lineTravel.numberToAlpah = function (num) {

            var str = "";

            var quotient = num;

            while (quotient > 26) {

                quotient = parseInt(num / 26);

                var remainder = num % 26;

                if (remainder === 0) {
                    quotient--;
                    remainder = 26;
                }

                str = String.fromCharCode(64 + remainder) + str;

                num = quotient;

            }

            str = String.fromCharCode(64 + quotient) + str;

            return str;

        };

        lineTravel.getNewAlpha = function () {

            var tabAlpha = "";
            tabAlpha += this.numberToAlpah(this.length);

            return tabAlpha;

        };

        /**
         * 添加
         */
        lineTravel.add = function () {

            //国外 国内
            var type = travelArea;

            this.pos = this.length;
            this.length++;

            //添加标签
            var $tab = $template.find(this.tabTemplateQuery).clone();

            var $tabAlpha = $tab.find("em>i");
            var routeName = this.getNewAlpha() + "行程";
            $tabAlpha.html(routeName);

            this.$tabs.find(".gi-tab").removeClass("active");
            this.$tabs.find(".gi-tab-add").before($tab);

            //添加内容
            var $content = $template.find(this.contentTemplateQuery).clone();

            var $forms = $content.find(".gi-forms");

            //通用模板
            var $innerLine = $template.find(".JS_inner_line").clone();
            var $innerInclude = null;
            var $innerNotInclude = null;
            var $innerActivity = $template.find(".JS_inner_activity").clone();

            //将行程名称填入INPUT隐藏域中
            $innerLine.find(".lineRouteHiddenDiv>input[name='routeName']").val(routeName);

            if (type === "internal") { //国内模板
                //将关联材料移除
                $innerLine.find(".JS_dl_related_material").remove();
                $innerInclude = $template.find(".JS_inner_include_internal").clone();
                $innerNotInclude = $template.find(".JS_inner_not_include_internal").clone();
            } else if (type === "abroad") { //国外模板
                $innerInclude = $template.find(".JS_inner_include_abroad").clone();
                $innerNotInclude = $template.find(".JS_inner_not_include_abroad").clone();
            }

            $forms.append($innerLine);
            $forms.append($innerInclude);
            $forms.append($innerNotInclude);
            $forms.append($innerActivity);

            this.$contents.find(".gi-content").removeClass("active");
            this.$contents.append($content);

            //右侧高度大于左侧
            var leftHeight = this.$tabs.height();
            this.$contents.css({
                "min-height": leftHeight
            });

            //默认无效
            if (this.length > 1) {
                //this.$tabs.find(".JS_button_copy").show();
                this.disable(this.length - 1);
            } else {
                //this.$tabs.find(".JS_button_copy").hide();
                this.$tabs.find(".JS_text_disabled").html("");
            }

        };

        /**
         * 切换显示
         */
        lineTravel.show = function (pos) {

            this.pos = pos;

            this.$tabs.find(".gi-tab").eq(pos).addClass("active").siblings().removeClass("active");
            this.$contents.find(".gi-content").eq(pos).addClass("active").siblings().removeClass("active");

        };

        /**
         * 复制确认窗口
         * @param pos
         */
        lineTravel.copyDialog = function (pos) {

            var that = this;

            //确认窗口
            var confirmWindow = $.addDialog({
                "width": 380,
                "height": 160,
                "$content": $("<p>确定要该复制到新增的行程？</div>"),
                "cancel": true,
                "okCallback": function () {
                    that.copy(pos);
                },
                "cancelCallback": function () {

                }
            });

        };

        /**
         * 复制
         */
        lineTravel.copy = function (pos) {

            this.pos = this.length;
            this.length++;

            //添加标签
            var $tab = $template.find(this.tabTemplateQuery).clone();
            $tab.addClass("disabled");

            var $tabAlpha = $tab.find("em>i");
            $tabAlpha.html(this.getNewAlpha());

            this.$tabs.find(".gi-tab").removeClass("active");
            this.$tabs.find(".gi-tab-add").before($tab);

            this.$tabs.find(".JS_button_disable").show();

            var $disabledBtn = $tab.find(".JS_button_disable");
            $disabledBtn.html("设为无效");

            //添加内容
            var $oldContent = this.$contents.find(".gi-content").eq(pos);
            var $newContent = $oldContent.clone();

            //复制表单内容

            //1 复制textarea内容
            var $newTextarea = $newContent.find("textarea");
            var $oldTextarea = $oldContent.find("textarea");
            $newTextarea.each(function (index) {

                $newTextarea.eq(index).val($oldTextarea.eq(index).val());

            });

            //2 复制select选项
            var $newSelect = $newContent.find("select");
            var $oldSelect = $oldContent.find("select");
            $newSelect.each(function (index) {

                $newSelect.eq(index).val($oldSelect.eq(index).val());

            });

            //使其无效
            var $disabled = $newContent.find(".JS_is_disabled");
            $disabled.val(true);

            this.$contents.find(".gi-content").removeClass("active");

            $newContent.addClass("active");
            this.$contents.append($newContent);

            //右侧高度大于左侧
            var leftHeight = this.$tabs.height();
            this.$contents.css({
                "min-height": leftHeight
            });
        };

        /**
         * 无效
         */
        lineTravel.disable = function (pos) {

            var $tab = this.$tabs.find(".gi-tab").eq(pos);
            var $tabDisableButton = $tab.find(".JS_button_disable");
            var $content = this.$contents.find(".gi-content").eq(pos);
            var $hidden = $content.find(".JS_is_disabled");
            var $textDisabled = $tab.find(".JS_text_disabled");

            //如果已经无效，则有效
            if ($tab.hasClass("disabled")) {
                $tab.removeClass("disabled");
                $tabDisableButton.html("设为无效");
                $textDisabled.html("");
                $hidden.val(false);
            } else {
                //否则无效
                $tab.addClass("disabled");
                $tabDisableButton.html("设为有效");
                $textDisabled.html("无效中");
                $hidden.val(true);
            }

        };

        /**
         * Day 类
         * @constructor
         */
        Days = function ($form) {

            //天数
            this.length = $form.find(".JS_day").length;

            //所在表单
            this.$days = $form.find(".JS_days");

            //模板查询字符串
            this.templateQuery = ".JS_day";

        };

        /**
         * 添加一天
         */
        Days.prototype.add = function () {
            this.length++;

            var $day = $template.find(this.templateQuery).clone();
            var $dayNum = $day.find(".JS_day_num");
            var $dayNumInput = $day.find(".JS_day_num_input");
            $dayNum.html(this.length);
            $dayNumInput.val(this.length);

            $day.hide();
            //将JS_day模板中的name值统一修改为当前的index
            var html = $day.html().replace(/{{index}}/g, this.length);
            $day.html(html);
            this.$days.append($day);
            $day.slideDown(200);

            this.refresh();

        };

        /**
         * 删除一天
         */
        Days.prototype.del = function (pos) {

            //最后一天无法删除
            if (this.length == 1) {
                return false;
            }

            this.length--;
            var that = this;

            var $day = this.$days.find(".JS_day").eq(pos);
            $day.slideUp(200, function () {
                $day.remove();
                that.refresh();
            });

        };

        /**
         * 刷新天数
         */
        Days.prototype.refresh = function () {
            var $day = this.$days.find(".JS_day");
            $day.each(function (index, domEle) {
                var $domEle = $(domEle);
                var $num = $domEle.find(".JS_day_num");
                $num.html(index + 1);
            });

            //无法删除最后一天
            var $delBtn = this.$days.find(".JS_del_day");
            if (this.length == 1) {
                $delBtn.hide();
            } else {
                $delBtn.show();
            }

        };

        //行程
        //lineTravel.add();

        var $content = lineTravel.$contents.find(".gi-content.active");
        var $form = $content.find(".JS_inner_line");

        //如果没有天数对象则创建
        if ($form.data("days") == undefined) {
            days = new Days($form);
            $form.data("days", days);
        } else {
            days = $form.data("days");
        }

        //days.add();

    }

    $document.on("click", ".gi-tab-add", lineTravelInitHandle);
    function lineTravelInitHandle() {
        var $this = $(this);
        if (!$this.data("init")) {
            $this.data("init", true);
            lineTravelInit();
        }
    }

    //添加新行程按钮
    $document.on("click", ".gi-tab-add", addTravelHandle);
    function addTravelHandle() {

        //添加行程
        lineTravel.add();

        var $content = lineTravel.$contents.find(".gi-content.active");
        var $form = $content.find(".JS_inner_line");

        //如果没有天数对象则创建
        var days = null;
        if ($form.data("days") == undefined) {
            days = new Days($form);
            $form.data("days", days);
        } else {
            days = $form.data("days");
        }

        days.add();

    }

    //切换行程按钮
    $document.on("click", ".gi-tab", switchTravelHandle);
    function switchTravelHandle(e) {
        var $this = $(this);
        var $target = $(e.target);

        var $giTabAdd = $this.next(".gi-tab-add");
        if (!$giTabAdd.data("init")) {
            $giTabAdd.data("init", true);
            lineTravelInit();
        }

        //如果是添加按钮
        if ($this.hasClass("gi-tab-add")) {
            return false;
        }

        var index = $this.index();

        //如果是无效链接
        if ($target.hasClass("JS_button_disable")) {
            //lineTravel.disable(index);
            return false;
        }

        //如果是复制按钮
        if ($target.hasClass("JS_button_copy")) {
            //lineTravel.copyDialog(index);
            return false;
        }

        //如果该标签页无效
        if ($this.hasClass("disabled")) {
            //return false;
        }

        lineTravel.show(index);
    }

    //提示框
    $document.on("mouseenter", "[data-gi-title]", showTitleHandle);
    function showTitleHandle() {
        var $this = $(this);
        var width = parseInt($this.data("title-width"));

        $(".gi-pop-tip").remove();

        var position = {};
        position.top = parseInt($this.offset().top);
        position.left = parseInt($this.offset().left);

        var text = $this.data("gi-title");

        var $popTip = $('<div class="gi-pop-tip"><div class="gi-pop-tip-text"></div><div class="gi-pop-tip-close"></div></div>');

        $popTip.css({
            "width": width,
            "top": position.top + 14,
            "left": position.left
        });

        var $popTipText = $popTip.find(".gi-pop-tip-text");

        text = text.replace(/\\n/g, "<br/>");
        text = text.replace(/\[/g, "<");
        text = text.replace(/]/g, ">");

        $popTipText.html(text);

        $body.append($popTip);

    }

    $document.on("click", hideTitleHandle);
    function hideTitleHandle(e) {
        var $target = $(e.target);

        var $parent = $target.parents(".gi-pop-tip");

        if ($parent.hasClass("gi-pop-tip")) {
            if ($target.hasClass("gi-pop-tip-close")) {
                $(".gi-pop-tip").remove();
            } else {
                return false;
            }
        } else {
            $(".gi-pop-tip").remove();
        }
    }

    //复选框控制表单可用性
    $document.on("change", ".JS_checkbox_switch", checkboxSwitchHandle);
    function checkboxSwitchHandle() {
        var $this = $(this);

        var $box = $this.parents(".JS_checkbox_switch_box");
        var $disabled = $box.find(".JS_checkbox_disabled");
        var $hidden = $box.find(".JS_checkbox_hidden");

        if ($this.is(":checked")) {
            $disabled.attr("disabled", false);
            $("#trafficNumVal").removeAttr("name");
            $hidden.show();
        } else {
            $disabled.attr("disabled", true);
            $("#trafficNumVal").attr("name","trafficNum");
            $hidden.hide();
            $disabled.each(function (index) {
                var $ele = $disabled.eq(index);
                if ($ele.attr("type") == "checkbox") {
                    $ele.removeAttr("checked");
                }
            });
        }
    }

    //单选按钮控制表单可用性
    $document.on("click", ".JS_radio_switch", radioSwitchHandle);
    function radioSwitchHandle() {
        var $this = $(this);
        var name = $this.attr("name");
        var $parent = $this.parents(".JS_radio_box");
        var $switchBox = $parent.find(".JS_radio_switch_box");

        $switchBox.each(function (index) {
            var $ele = $switchBox.eq(index);
            var $switch = $ele.find(".JS_radio_switch");
            var $disabled = $ele.find(".JS_radio_disabled");
            if ($switch.is(":checked")) {
                $disabled.attr("disabled", false);
            } else {
                //如果是复选框 则取消选择
                $disabled.filter('[type="checkbox"]').attr("checked", false).change();

                $disabled.attr("disabled", true);
            }
        });
    }

    //占位字符 placeholder
    (function () {
        var $placeHolder = $("input[data-placeholder]");

        $document.on("focus", "input[data-placeholder]", placeholderFocusHandle);

        function placeholderFocusHandle() {
            var $this = $(this);
            var text = $this.data("placeholder");
            if ($this.val() === text) {
                $this.removeClass("placeholder");
                $this.val("");
            }

        }

        $document.on("blur", "input[data-placeholder]", placeholderBlurHandle);

        function placeholderBlurHandle() {
            var $this = $(this);
            var text = $this.data("placeholder");
            if ($this.val() === "") {
                $this.addClass("placeholder");
                $this.val(text);
            }

        }

        $placeHolder.blur();

    })();

    //增加一天行程
    $document.on("click", ".JS_add_day", addDayHandle);
    function addDayHandle() {
        var $this = $(this);
        var $form = $this.parents(".gi-form");

        //如果没有天数对象则创建
        var days = null;

        days = new Days($form);
        $form.data("days", days);
        days.add();

    }

    //删除一天行程
    $document.on("click", ".JS_del_day", delDayHandle);
    function delDayHandle() {
        var $this = $(this);
        var $day = $this.parents(".JS_day");
        var dayIndex = $day.index();

        var $form = $this.parents(".gi-form");

        //如果没有天数对象则创建
        var days = null;
        days = new Days($form);
        $form.data("days", days);

        /*if ($form.data("days") == undefined) {
            days = new Days($form);
            $form.data("days", days);
        } else {
            days = $form.data("days");
        }*/

        days.del(dayIndex);

    }

    //行程内部tab切换
    $document.on("click", ".gi-nav", innerTabSwitchHandle);
    function innerTabSwitchHandle() {
        var $this = $(this);
        var $navs = $this.parents(".gi-navs");

        var $nav = $navs.find(".gi-nav");
        var $content = $this.parents(".gi-content");
        var $forms = $content.find(".gi-forms");
        var $form = $forms.find(".gi-form");

        var index = $nav.index($this);

        $this.addClass("active").siblings().removeClass("active");
        $form.eq(index).addClass("active").siblings().removeClass("active");

    }
    
    $document.on("mouseenter",".JS_destination", function(e) {
        var $this = $(this);
        var $del = $this.find(".JS_del_destination");

        $del.css({
            "left": 0,
            "top": 30
        });
        $del.show();
    });

    $document.on("mouseleave",".JS_destination", function () {
        var $this = $(this);
        var $del = $this.find(".JS_del_destination");
        $del.hide();
    });

    //通用列表
    function generalList(parameter) {

        //添加
        $document.on("click", parameter.addBtn, function () {

            var $this = $(this);

            var $area = $this.parents(parameter.area);

            if (parameter.isJudged && $area.find(parameter.judgeCtrl).attr("checked") != "checked") {
                return;
            }

            var $parent = $area.find(parameter.parent);

            if (parameter.isLengthLimited && $parent.find(parameter.item).length >= 10) {
                return;
            }
            var $add = $area.find(parameter.add);
            if($templateInner == null){
            	 $templateInner = $(".JS_template_inner");
            }
            var $destination = $templateInner.find(parameter.itemTemplate).clone();

            if (parameter.parentAdd) {

                $parent.append($destination);
            } else {

                $add.before($destination);
            }

            /*if (parameter.hiddenDelBtn) {
                $destination.on("mouseenter", function (e) {
                    var $this = $(this);
                    var $del = $this.find(parameter.delBtn);

                    $del.css({
                        "left": 0,
                        "top": 30
                    });
                    $del.show();
                });

                $destination.on("mouseleave", function () {
                    var $this = $(this);
                    var $del = $this.find(parameter.delBtn);
                    $del.hide();
                });
            }*/

            //隐藏最后的
            if (parameter.hiddenLastQuery) {
                var $visit = $area.find(parameter.item).find(parameter.hiddenLastQuery);
                $visit.show();

                var $hidden = $destination.find(parameter.hiddenLastQuery);
                $hidden.hide();

            }

        });

        //删除
        $document.on("click", parameter.delBtn, function () {
            var $this = $(this);
            var $area = $this.parents(parameter.area);
            var $parent = $area.find(parameter.parent);

            var $item = $this.parents(parameter.item);
            $item.slideUp(200, function () {

                $item.remove();

                if($("#categoryId").val() == 15){
                	validateExtend($parent);
                }

            });

        });

    }

    //行程线路 天数 添加目的地
    generalList({
        "area": ".JS_day",
        "parent": ".JS_destinations",
        "item": ".JS_destination",
        "add": ".JS_destination_add",
        "addBtn": ".JS_add_destination",
        "delBtn": ".JS_del_destination",
        "itemTemplate": ".JS_destination",
        "hiddenDelBtn": true,
        "hiddenLastQuery": "b",
        "isLengthLimited": true
    });

    //行程线路 关联材料 增加签证类型
    generalList({
        "area": ".gi-form",
        "parent": ".gi-visa-types",
        "item": ".gi-visa-type",
        "add": ".JS_add_visa_type",
        "addBtn": ".JS_add_visa_type",
        "delBtn": ".JS_del_visa_type",
        "itemTemplate": ".gi-visa-type"
    });

    $document.on("click", ".JS_other_add_btn", function () {
        $templateInner = $(".JS_template_inner");
    });
    //费用包含 其他 添加
    generalList({
        "area": ".gi-other-box",
        "parent": ".gi-others",
        "item": ".gi-other",
        "add": ".gi-other-add",
        "addBtn": ".JS_other_add_btn",
        "delBtn": ".gi-other-del",
        "itemTemplate": ".gi-other",
        "isJudged": true,
        "judgeCtrl": ".JS_other_judge_ctrl"
    });

    $document.on("click", ".JS_add_stay", function () {
        $templateInner = $(".JS_template_inner");
    });
    //费用包含 住宿 添加
    generalList({
        "area": ".gi-other-box",
        "parent": ".gi-stays",
        "item": ".gi-stay",
        "add": ".gi-stay-add",
        "addBtn": ".JS_add_stay",
        "delBtn": ".JS_del_stay",
        "itemTemplate": ".gi-stay",
        "isJudged": true,
        "judgeCtrl": ".JS_other_judge_ctrl",
        "isLengthLimited": true
    });

    //费用包含 国外 住宿 添加
    generalList({
        "area": ".gi-other-box",
        "parent": ".gi-abroad-stays",
        "item": ".gi-abroad-stay",
        "add": ".gi-abroad-stay-add",
        "addBtn": ".gi-abroad-stay-add-btn",
        "delBtn": ".gi-abroad-stay-del-btn",
        "itemTemplate": ".gi-abroad-stay",
        "isJudged": true,
        "judgeCtrl": ".JS_other_judge_ctrl",
        "isLengthLimited": true
    });

    $document.on("click", ".gi-ni-other-add-btn", function () {
        $templateInner = $(".JS_template_inner");
    });
    //费用不包含 其他 添加
    generalList({
        "area": ".gi-other-box",
        "parent": ".gi-ni-others",
        "item": ".gi-ni-other",
        "add": ".gi-ni-other-add",
        "addBtn": ".gi-ni-other-add-btn",
        "delBtn": ".gi-ni-other-del",
        "itemTemplate": ".gi-ni-other",
        "isJudged": true,
        "judgeCtrl": ".JS_other_judge_ctrl"
    });

    //费用不包含 国外 单人房差
    generalList({
        "area": ".gi-other-box",
        "parent": ".JS_single_rooms",
        "item": ".JS_single_room",
        "add": ".JS_single_room_add",
        "addBtn": ".JS_single_room_add_btn",
        "delBtn": ".JS_single_room_add_del",
        "itemTemplate": ".JS_single_room",
        "isJudged": true,
        "judgeCtrl": ".JS_other_judge_ctrl"
    });

    //费用包含 其他 国外 添加
    generalList({
        "area": ".gi-other-box",
        "parent": ".gi-abroad-others",
        "item": ".gi-abroad-other",
        "add": ".gi-abroad-other-add",
        "addBtn": ".JS_abroad_other_add_btn",
        "delBtn": ".gi-abroad-other-del",
        "itemTemplate": ".gi-abroad-other",
        "isJudged": true,
        "judgeCtrl": ".JS_abroad_other_judge_ctrl"
    });
    
    //费用不包含 其他 国外 添加
    generalList({
        "area": ".gi-other-box",
        "parent": ".gi-ni-abroad-others",
        "item": ".gi-ni-abroad-other",
        "add": ".gi-ni-abroad-other-add",
        "addBtn": ".gi-ni-abroad-other-add-btn",
        "delBtn": ".gi-ni-abroad-other-del",
        "itemTemplate": ".gi-ni-abroad-other",
        "isJudged": true,
        "judgeCtrl": ".JS_ni_abroad_other_judge_ctrl"
    });

    //退改说明 其他
    $document.on("click", ".gi-rr-other-add-btn", function () {
        $templateInner = $(".JS_template_inner");
    });
    generalList({
        "area": ".gi-rr-other-box",
        "parent": ".gi-rr-others",
        "item": ".gi-rr-other",
        "add": ".gi-rr-other-add",
        "addBtn": ".gi-rr-other-add-btn",
        "delBtn": ".gi-rr-other-del",
        "itemTemplate": ".gi-rr-other",
        "isJudged": true,
        "judgeCtrl": ".JS_other_judge_ctrl"
    });

    var $mask = $document.find(".gi-mask");

    //早餐
    $document.on("click", ".JS_dinner_checkbox", function () {
        var $this = $(this);
        var $dinner = $this.parents(".JS_dinner_box");
        var $checkbox_box = $this.parents(".JS_dinner_checkbox_box");
        var $input = $checkbox_box.find(".JS_dinner_input");

        if ($this.is(":checked")) {
            $input.val("含");
        } else {
            $input.val("敬请自理");

        }

    });

    //主复选框控制子复选框
    $document.on("click", ".JS_checkbox_main", function () {
        var $this = $(this);
        var $box = $this.parents(".JS_checkbox_switch_box");
        var $sub = $box.find(".JS_checkbox_sub");
        if (!$this.is(":checked")) {
            $sub.attr("checked", false);
        }
    });

    //儿童价点击无儿童价不显示儿童价费用包含
    $document.on("click", ".JS_child_include_switch", function () {
        var $this = $(this);
        var $form = $this.parents(".gi-form");
        var $ctrl = $form.find(".JS_child_include_switch_ctrl");
        var $childInclude = $form.find(".JS_child_include_content");
        if (!$ctrl.is(":checked")) {
            $childInclude.show();
        } else {
            $childInclude.hide();
        }
    });

    //签证
    $document.on("change", ".JS_visa_select", function () {

        var $this = $(this);
        var $box = $this.parents(".JS_visa_select_box");
        var $checkbox = $box.find(".JS_visa_checkbox");
        var $p = $box.find(".JS_visa_p");

        var selectValue = $this.val();

        $checkbox.find("input[type=checkbox]").removeAttr("checked");

        switch (selectValue) {
            case "0"://不含签证（境外）
                $checkbox.hide();
                $p.hide();
                break;
            case "1"://不含签证且需游客办理落地签（境外）

                $checkbox.hide();
                $p.show();
                break;
            case "2"://含团队旅游签证（境外）

                $checkbox.show();
                $p.hide();
                break;
            case "3"://含个人旅游签证（境外）

                $checkbox.show();
                $p.hide();
                break;
            case "4"://含个人或团队旅游签证（境外）

                $checkbox.show();
                $p.hide();
                break;
            case "5"://不含港澳通行证（港澳）

                $checkbox.hide();
                $p.hide();
                break;
            case "6"://不含入台证（台湾）

                $checkbox.hide();
                $p.hide();
                break;
            case "7"://不含入台证（台湾）

                $checkbox.hide();
                $p.hide();
                break;
            default :
                break;
        }

    });

    // “无”
    $document.on("click", ".JS_none", function () {
        var $this = $(this);
        var $dl = $this.parents("dl");
        var $radios = $dl.find("input[type='radio']");
        var $checkboxs = $dl.find("input[type='checkbox']");

        var $radioDisabled = $dl.find(".JS_radio_disabled");
        var $checkboxDisabled = $dl.find(".JS_checkbox_disabled");

        $radios.attr("checked", false);
        $checkboxs.attr("checked", false);

        $radioDisabled.attr("disabled", true);
        $checkboxDisabled.attr("disabled", true);
    });

    /*// 费用包含 预览
     $document.on("click", ".JS_fee_include_preview", function () {
     $(".gi-modal-p-title").html("费用包含");

     //填写内容
     // $(".gi-modal-p-content").html("");

     $(".gi-modal, .gi-modal-overlay").show();
     });

     // 费用不包含 预览
     $document.on("click", ".JS_fee_not_include_preview", function () {
     $(".gi-modal-p-title").html("费用不包含");

     //填写内容
     // $(".gi-modal-p-content").html("");

     $(".gi-modal, .gi-modal-overlay").show();
     });

     // 费用 预览 关闭
     $document.on("click", ".gi-modal-close, .gi-modal-close-btn", function () {
     $(".gi-modal, .gi-modal-overlay").hide();
     });*/

    $document.on("click", ".JS_fee_include_preview", function () {
        var url = "line-travel-preview.html";
        var xDialogPreview = new xDialog(url, {}, {
            title: "选择经纬度",
            iframe: true,
            width: "1100",
            height: "600"
        });
    })

})();