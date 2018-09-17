/**
 * jQuery浮动警示框插件
 * 江圣
 * 2015-10-14
 */
(function ($) {

    var defaults = {
        "$area": $("body"),
        "type": "danger",
        "width": 150,
        "height": 30,
        "lineHeight": 30,
        "text": "警告内容",
        "hideTime": 500,
        "position": "fixed",
        "callback": function () {
        }
    };

    function FloatAlert(options) {
        this.$alert = null;
        this.settings = $.extend({}, defaults, options);
        this._defaults = defaults;
        this.init();
    }

    FloatAlert.prototype = {

        constructor: FloatAlert,

        init: function () {
            var self = this;
            this.$alert = $('<div class="et-alert"></div>').clone();
            this.setStyle();
            this.setHtml();
            this.settings.$area.append(this.$alert);

            this.settings.callback();

            //自动隐藏并销毁
            setTimeout(function () {
                self.$alert.fadeOut(500, function () {
                    self.$alert.remove();
                });
            }, this.settings.hideTime);

            //返回对象方便手动销毁
            return {
                "$alert": self.$alert,
                "destroy": function () {
                    self.$alert.remove();
                }
            };
        },

        setStyle: function () {
            this.$alert.css({
                "position": this.settings.position,
                "width": this.settings.width + "px",
                "height": this.settings.height + "px",
                "lineHeight": this.settings.lineHeight + "px",
                "marginLeft": -(this.settings.width) / 2 + "px",
                "marginTop": -(this.settings.height) / 2 + "px"
            });
            switch (this.settings.type) {
                case "success":
                    this.$alert.addClass("et-alert-success");
                    break;
                case "danger":
                    this.$alert.addClass("et-alert-danger");
                    break;
            }
        },

        setHtml: function () {
            this.$alert.html(this.settings.text);
        }

    };

    $.floatAlert = function (options) {

        return new FloatAlert(options);

    };

})(jQuery);

/**
 * jQuery简单验证插件
 * 江圣
 * 2015-10-14
 */
(function ($) {

    var defaults = {};

    function SimpleValidate(options) {
        this.settings = $.extend({}, defaults, options);
        this._defaults = defaults;
        this.$form = null;
        this.$text = null;
        this.errorText = "错误";
        this.isValidate = false;
        this.init();
    }

    SimpleValidate.prototype = {

        constructor: SimpleValidate,

        init: function () {
            this.$form = this.settings.$form;
            this.$text = this.$form.find(":text");
        },

        test: function () {
            this.isValidate = true;
            for (i = 0; i < this.$text.length; i++) {

                var $ele = this.$text.eq(i);
                //数字验证
                if ($ele.attr("number") == "true") {
                    if (!this.isNumber($ele.val())) {
                        this.errorText = "请输入合法的数字！";
                        this.isValidate = false;
                    }
                }
            }
        },

        isNumber: function (text) {
            var rule = /^\d*$/;
            return rule.test(text);
        }

    };

    function SimpleValidatePublic(options) {
        var validateInstance = new SimpleValidate(options);

        this.getIsValidate = function () {
            return validateInstance.isValidate;
        };
        this.getErrorText = function () {
            return validateInstance.errorText;
        };
        this.test = function () {
            validateInstance.test();
        };
        return this;
    }

    function simpleValidate(options) {
        return new SimpleValidatePublic(options)
    }

    $.simpleValidate = simpleValidate;

})(jQuery);

/**
 * 日期大小验证
 */
(function ($) {

    var defaults = {};

    function DateValidate(options) {
        this.settings = $.extend({}, defaults, options);
        this._defaults = defaults;
        this.$startDate = null;
        this.$endDate = null;
        this.errorText = "错误";
        this.isValidate = false;
        this.init();
    }

    DateValidate.prototype = {

        constructor: DateValidate,

        init: function () {
            this.$startDate = this.settings.$startDate;
            this.$endDate = this.settings.$endDate;
        },

        test: function () {

            this.isValidate = true;

            var startDateVal = this.$startDate.val();
            var endDateVal = this.$endDate.val();

            if (startDateVal == "" || endDateVal == "") {
                return false;
            }

            var startDate = this.dateFromString(startDateVal);
            var endDate = this.dateFromString(endDateVal);

            /*if (startDate > endDate) {
                this.errorText = "请输入正确的日期格式";
                this.isValidate = false;
            }*/

            if (this.dateDiff(startDate, endDate) > 63072000000) {
                this.errorText = "时间差不能超过2年";
                this.isValidate = false;
            }

            return false;
        },

        dateFromString: function (str) {
            var dateArr = str.split("-");
            var year = parseInt(dateArr[0]);
            var month = parseInt(dateArr[1]) - 1;
            var day = parseInt(dateArr[2]);
            return new Date(year, month, day);
        },

        dateDiff: function (dateStart, dateEnd) {
            return diff = dateEnd.getTime() - dateStart.getTime();
        }
    };

    function DateValidatePublic(options) {
        var validateInstance = new DateValidate(options);

        this.getIsValidate = function () {
            return validateInstance.isValidate;
        };
        this.getErrorText = function () {
            return validateInstance.errorText;
        };
        this.test = function () {
            validateInstance.test();
        };
        return this;
    }

    function dateValidate(options) {
        return new DateValidatePublic(options)
    }

    $.dateValidate = dateValidate;

})(jQuery);


/**
 * 日期间隔不超过两个月
 * 
 * 
 */
function getNowFormatDate() {
    var date = new Date();
    var seperator1 = "-";
    var seperator2 = ":";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
    
    return currentdate;
}

function getPreMonth(date) {
            var arr = date.split('-');
            var year = arr[0]; //获取当前日期的年份
            var month = arr[1]; //获取当前日期的月份
            var day = arr[2]; //获取当前日期的日
            var days = new Date(year, month, 0);
            days = days.getDate(); //获取当前日期中月的天数
            var year2 = year;
            var month2 = parseInt(month) - 1;
            if (month2 == 0) {
                year2 = parseInt(year2) - 1;
                month2 = 12;
            }
            var day2 = day;
            var days2 = new Date(year2, month2, 0);
            days2 = days2.getDate();
            if (day2 > days2) {
                day2 = days2;
            }
            if (month2 < 10) {
                month2 = '0' + month2;
            }
            var t2 = year2 + '-' + month2 + '-' + day2;
            return t2;
        }
        
function getPreTwoMonths(date) {
    var arr = date.split('-');
    var year = arr[0]; //获取当前日期的年份
    var month = arr[1]; //获取当前日期的月份
    var day = arr[2]; //获取当前日期的日
    var days = new Date(year, month, 0);
    days = days.getDate(); //获取当前日期中月的天数
    var year2 = year;
    var month2 = parseInt(month) - 1;
    if (month2 == 0) {
        year2 = parseInt(year2) - 1;
        month2 = 12;
    }
    if (month2 == -1) {
        year2 = parseInt(year2) - 1;
        month2 = 11;
    }
    var day2 = day;
    var days2 = new Date(year2, month2, 0);
    days2 = days2.getDate();
    if (day2 > days2) {
        day2 = days2;
    }
    if (month2 < 10) {
        month2 = '0' + month2;
    }
    var t2 = year2 + '-' + month2 + '-' + day2;
    if(t2 > $("#d4321").val()){
    	$("#d4321").val(t2);
    }
    
}        
        
        
function getAfterTwoMonths(date) {
	var arr = date.split('-');
	var year = arr[0]; //获取当前日期的年份
	var month = arr[1]; //获取当前日期的月份
	var day = arr[2]; //获取当前日期的日
	var days = new Date(year, month, 0);
	days = days.getDate(); //获取当前日期中月的天数
	var year2 = year;
	var month2 = parseInt(month) + 1;
	if (month2 == 13) {
	    year2 = parseInt(year2) + 1;
	    month2 = 1;
	}
	if (month2 == 14) {
	    year2 = parseInt(year2) + 1;
	    month2 = 2;
	}
	var day2 = day;
	var days2 = new Date(year2, month2, 0);
	days2 = days2.getDate();
	if (day2 > days2) {
	    day2 = days2;
	}
	if (month2 < 10) {
	    month2 = '0' + month2;
	}
	var t2 = year2 + '-' + month2 + '-' + day2;
	if(t2 < $("#d4322").val()){
		$("#d4322").val(t2);
	}
}













