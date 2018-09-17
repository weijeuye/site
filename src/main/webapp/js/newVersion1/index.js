/**
 * Created by twili on 16/12/08.
 */

$(function () {

    var $document = $(document);
    var $body = $('body');
    var $main = $(".main");
    var $myTab = $("#myTab");
    var $myTabContent = $("#myTabContent");
    var $window = $(window);
    var $contextmenu = $("#contextmenu");
    var $contextmenumask = $("#contextmenu-mask");


    var $sidebarBoxWrap = $(".sidebar-box-wrap");
    var $sidebarBox = $(".sidebar-box");
    var $sidebarScroll = $(".sidebar-box-scroll");
    var $sidebarThumb = $(".sidebar-box-thumb");

    var closeOtherTabsIndex = 0;

    var activeMenu = null;
    function dialogTest() {
        $('#verify').modal();
    }

    Messenger.options = {
        extraClasses: 'messenger-fixed messenger-on-bottom messenger-on-right',
        theme: 'flat'
    };

    $("#showDialog").on("click", function () {
        dialogTest();
    });





    //$("[data-toggle=tooltip]").tooltip();

    $document.on("click", ".sidebar .shrink", function () {
        var $console = $(".console");
        $console.toggleClass("shrunk");
    });

    $document.on("click", ".sidebar dt", function () {
        var $this = $(this);
        var $dl = $this.parent();
        if ($dl.is(".active")) {
            $dl.removeClass("active");
        } else {
            $dl.addClass("active").siblings().removeClass("active");
        }
        setScroll();
    });


    function renderTab(text, href, linkId, permId) {

        if (href=="") {
            return;
        }

        var $oldLi = $myTab.find("li[data-id=" + linkId + "]");

        if ($oldLi.length > 0) {
            switchTab($oldLi.index())
        } else {
            var size = $myTab.children().length;
            if (size >= 20) {
                $('#maxDialog').modal();
            } else {
                createTab();
                var $tabPaneActive = $myTabContent.find(".tab-pane.active");
                var $tabActive = $myTab.find("li.active");

                $tabActive.find("a").text(text);
                $tabActive.attr("data-id", linkId);

                var src;
                if(permId != undefined) {
                    if(href.indexOf('?') > -1){
                        src = href + '"&permId="'+permId;
                    }else{
                        src = href + '"?permId="'+permId;
                    }
                } else {
                    src = href;
                }


                $tabPaneActive.html($('<iframe class="iframe" src="'+src+'" frameborder="0"></iframe>'));
            }

        }
        resize();

    }

    window.renderTab = renderTab;


    /**
     * 设置Opened样式
     * @param linkId
     */
    function setOpened(linkId) {
        var $this = $(".nav-sidebar a[data-id=" + linkId + "]");

        $(".nav-sidebar,.nav-sidebar a").removeClass("opened");
        $(".nav-sidebar dl").removeClass("active");
        var $navSidebar = $this.parents(".nav-sidebar");
        var $navSidebarDl = $this.parents("dl").addClass("active");
        $navSidebar.addClass("opened");
        $this.addClass("opened");

    }

    $document.on("mousedown", "#contextmenu-mask", function (e) {
        contextMenuHide();
        $contextmenu.hide();
    });

    function contextMenuHide() {

        $contextmenumask.hide();
        $contextmenu.hide();
    }

    function resize() {
        var windowHeight = $window.height();
        var tabHeight = $myTab.height();
        var topHeight = $(".header").eq(0).height();
        var height = windowHeight - topHeight - tabHeight;
        $myTabContent.height(height);
        var $iframe = $myTabContent.find(".iframe");
        $iframe.height(9999);
        setScroll();
        setTimeout(function () {
            $iframe.height(height);
        }, 1);

    }

    resize();

    $window.on("resize", function () {
        resize();
    });


    $document.on("click", ".JS_close_other_tab", function () {
        contextMenuHide();
        var $lis = $myTab.children("li");

        var $notClose = $myTab.find("li[data-id=" + closeOtherTabsIndex + "]");

        var index = $notClose.index();
        var $notCloseContent = $myTabContent.find(".tab-pane").eq(index);

        $myTab.children("li").not($notClose).remove();
        $myTabContent.children(".tab-pane").not($notCloseContent).remove();

        switchTab(0);
    });

    $document.on("click", ".JS_refresh_tab", function () {
        contextMenuHide();

        var $li = $myTab.find("li[data-id=" + closeOtherTabsIndex + "]");

        var index = $li.index();
        var $content = $myTabContent.find(".tab-pane").eq(index);

        var $iframe = $content.find(".iframe");
        var src = $iframe.attr("src");
        $iframe.attr("src", src);

    });

    function createTab() {

        var content = '<div role="tabpanel" class="tab-pane active">' +
            '</div>';
        var tab = '<li role="presentation" class="active">' +
            '<a></a>' +
            '<button type="button" class="close" data-dismiss="modal">' +
            '<span aria-hidden="true">×</span>' +
            '<span class="sr-only">Close</span>' +
            '</button>' +
            '</li>';

        $myTab.children().removeClass("active");
        $myTabContent.children().removeClass("active");

        $myTab.append(tab);
        $myTabContent.append(content);

    }

    $document.on("click", "#myTab .close", function (e) {

        e.stopPropagation();

        var $this = $(this);

        var $tab = $this.parent("li").eq(0);
        var index = $tab.index();

        var $myTabChildren = $myTab.children();
        var size = $myTabChildren.length;

        var $myContentChildren = $myTabContent.children();

        if (size > 1) {
            $myTabChildren.eq(index).remove();
            $myContentChildren.eq(index).remove();
            resize();
        } else {
            $('#myModal').modal();
        }

        switchTab(index - 1);

    });

    function switchTab(index) {
        var $myContentChildren = $myTabContent.children();
        var size = $myContentChildren.length;
        var $myTabChildren = $myTab.children();
        if (index > size - 1) {
            index = size - 1;
        }
        $myContentChildren.removeClass("active").eq(index).addClass("active");
        $myTabChildren.removeClass("active").eq(index).addClass("active");
        resize();
    }

    $document.find("#contextmenu,#contextmenu-mask,#myTab").on("contextmenu", function () {
        return false;
    });


    $document.on("mousedown", "#myTab li", function (e) {
        $li = $(this);

        var index = $li.index();

        var x = e.pageX;
        var y = e.pageY;

        var linkId = $li.attr("data-id");
        if (e.which === 3) {

            activeMenu = $(this);
            $contextmenu.css({
                left: x,
                top: y
            });
            $contextmenumask.show();
            $contextmenu.show();
            closeOtherTabsIndex = linkId;
        } else {
            switchTab(index);
            setOpened(linkId);
            setScroll();

        }

    });

    $document.on("mouseenter", ".sidebar", function () {
        var $this = $(this);
        var sidebarHeight = $this.height();
        var $navSidebar = $this.find(".nav-sidebar");
        var sidebarSize = $navSidebar.length;
        var navSidebarHeight = $navSidebar.height();

        var $console = $this.parents(".console");
        if ($console.is(".shrunk")) {

            if (navSidebarHeight * sidebarSize > sidebarHeight) {
                $console.addClass("temp-spread");
            }

        }

        $this.addClass("sidebar-hover");

    });

    $document.on("mouseleave", ".sidebar", function () {
        var $this = $(this);
        var $console = $this.parents(".console");
        $console.removeClass("temp-spread");

        $this.removeClass("sidebar-hover");
    });

    (function bindMouseScrollEvent() {
        var Sys = {}, s, ua = navigator.userAgent.toLowerCase();
        (s = ua.match(/msie ([\d.]+)/)) ? Sys.ie = s[1] :
            (s = ua.match(/firefox\/([\d.]+)/)) ? Sys.firefox = s[1] :
                (s = ua.match(/chrome\/([\d.]+)/)) ? Sys.chrome = s[1] :
                    (s = ua.match(/opera.([\d.]+)/)) ? Sys.opera = s[1] :
                        (s = ua.match(/version\/([\d.]+).*safari/)) ? Sys.safari = s[1] : 0;
        if (Sys.ie) {
            $sidebarBoxWrap[0].attachEvent('onmousewheel', mouseWheelHandler);
        } else {
            $sidebarBoxWrap[0].addEventListener('mousewheel', mouseWheelHandler);
            $sidebarBoxWrap[0].addEventListener("DOMMouseScroll", mouseWheelHandler);
        }
    }());

    function mouseWheelHandler(e) {
        if (!e.preventDefault)
            e.returnValue = false;
        else
            e.preventDefault();
        e = e || window.event;
        var delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));
        switch (delta) {
            case 1:
                move(1);
                break;
            case -1:
                move(-1);
                break;
        }
    }

    $sidebarBoxWrap.on("mouseenter", function () {
        $sidebarScroll.show();
        setScroll();
    });
    $sidebarBoxWrap.on("mouseleave", function () {
        $sidebarScroll.hide();
    });

    function setScroll() {

        var height = $sidebarBox.height();
        var wrapHeight = $sidebarBoxWrap.height();

        if (wrapHeight > height) {
            console.log("not");
            $sidebarScroll.hide();
            return false;
        } else {
            if ($(".sidebar").is(".sidebar-hover")) {

                $sidebarScroll.show();
            }
        }

        var proportion = height / wrapHeight;

        $sidebarThumb.css("height", wrapHeight / proportion);

    }

    var position = {};
    var down = false;
    $document.on("mousedown", ".sidebar-box-scroll", function (e) {
        if (e.which === 1) {
            down = true;
            position.top = e.pageY;

        }

        $body.addClass("cant-select");

        $document.on("mousemove", mouseMoveHandler);
    });

    var mouseMoveHandler = function (e) {
        if (down) {
            var positionNow = {};
            positionNow.top = e.pageY;

            if (positionNow.top > position.top) {
                move(-1, 2);
            } else {
                move(1, 2);
            }

        }

        position.top = e.pageY;
    };

    var mouseUpHandler = function () {

        $document.off("mousemove", mouseMoveHandler);
        down = false;
        $body.removeClass("cant-select");
    };
    $document.on("mouseup", mouseUpHandler);


    function move(up, step) {

        step = step || 50;

        var top = parseInt($sidebarBox.css("top"));

        var height = $sidebarBox.height();
        var wrapHeight = $sidebarBoxWrap.height();
        var proportion = height / wrapHeight;

        if (up !== 1) {

            top -= step;
        } else {
            top += step;
        }

        if (height - wrapHeight < -top) {
            top = -(height - wrapHeight)
        }

        var thumbTop = -top / proportion;

        if (top > 0) {
            top = 0;
        }

        if (thumbTop < 0) {
            thumbTop = 0;
        }

        $sidebarThumb.css("top", thumbTop);
        $sidebarBox.css("top", top);
    }



    //messageTest();
    function messageTest() {
        var msg;

        //"<div style='display:block;'><a  id='x_announ' href='javascript:jumpUrl(\"log/viewAnnounceQuery.zul\");'>x</a></div></br>"+
        //"<div style='display:block;'><a  id='x_announ' href='javascript:jumpUrl(\"log/viewAnnounceQuery.zul\");'>x</a></div></br>"+
        var content=" <a  class='nest-message' tyle='color: white;' id='4428790_msg' href='/super_back/log/viewMessageQuery.zul' data-id='viewMessage' data-name='我的消息' >sdsd</a> " +
            "<a style='color: white;' class='floatRight' href='#' id='4428790_finish' onClick='updateMsgRecreiver(4428790)'>不再提醒</a></br><a  id='4428790_msg' href='/super_back/log/viewMessageQuery.zul' data-id='viewMessage' data-name='我的消息' >sdsd</a> " +
            "<a class='floatRight' href='#' id='4428790_finish' onClick='updateMsgRecreiver(4428790)'>不再提醒</a></br>";

        // content = replaceResponseMessage(content);

        msg = Messenger().post({
            message: content,
            type: 'info',
            showCloseButton: true,
            id: "Only-one-message"//,
            // actions: {
            //     cancel: {
            //         label: '不再提醒',
            //         action: function () {
            //             updateMsgRecreiver(4428790);
            //             return msg.update({
            //                 message: '以后不再显示',
            //                 type: 'success',
            //                 actions: false,
            //                 showCloseButton: true
            //             });
            //         }
            //     }
            // }
        });
    }

    function showNestPanel(e) {
        e.preventDefault();
        if (e.which === 1) {
            var $this = $(this);
            var href = $this.attr("href");
            var text = $this.attr("data-name");
            var linkId = $this.attr("data-id");
            var permId = $this.attr("permId");
            setOpened(linkId)
            renderTab(text, href, linkId, permId);
        }
    }

    $document.on("click", ".nav-sidebar a", showNestPanel);
    $document.on("click", ".nest-show a", showNestPanel);
    $document.on("click", ".nest-message", showNestPanel);
    
    
    //lvcc支持
    autoLvccOpenPanel();


    function GetQueryString(name){
    	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)","i");
    	var r = window.location.search.substr(1).match(reg);
    	if (r!=null) return unescape(r[2]); return null;
    }
    function autoLvccOpenPanel(){
		var url=location.href; 
		
		//alert(url);
		
		var tmpParam=url.split("?")[1];
		
		if (tmpParam == null || tmpParam.length <= 0){
		  return;	
		}
		
		var callid = GetQueryString("callid");
		var nodeattrvalue = GetQueryString("nodeattrvalue");
		var urllikestr = GetQueryString("urllikestr");
		var valuelikestr = GetQueryString("valuelikestr");
		
		if (callid == null || callid.length == 0 || 
			nodeattrvalue == null || nodeattrvalue.length == 0 ||
			urllikestr == null || urllikestr.length == 0 ||
			valuelikestr == null || valuelikestr.length == 0){
		    	return;
		    }
		urllikestr = decodeURI(urllikestr);
		valuelikestr = decodeURI(valuelikestr);
		
		$(nodeattrvalue + " a").each(function(n,e){
			 var vstUrl = $(e).attr("href");
			 var vstValue = $(e).text();
			 if (vstUrl != null && vstValue.indexOf(valuelikestr) >= 0 && vstUrl.indexOf(urllikestr) >= 0) {
				 var targetUrl = "";
				 if (vstUrl.indexOf("?") < 0){
					 targetUrl = vstUrl + "?" + tmpParam;
				 }
				 else{
					 targetUrl = vstUrl + "&" + tmpParam;
				 }			 	
			 	$(e).attr("href",targetUrl);
			 	
	            var href = $(e).attr("href");
	            var text = $(e).attr("data-name");
	            var linkId = $(e).attr("data-id");
	            var permId = $(e).attr("permId");
	            
	    		if (href == null || href.length == 0 || 
	    			text == null || text.length == 0 ||
	    			linkId == null || linkId.length == 0 ||
	    			permId == null || permId.length == 0){
	    			return;
	    		}
	            
	            setOpened(linkId);
	            renderTab(text, href, linkId, permId);			 	
			 	
			 	return;
		      } 
		});	
    } 
    



    $("#showMessage").on("click", function () {
        messageTest();
    });


    var taskMessage = function (message,title) {
        var msg;


        msg = Messenger().post({
            message: message,
            type: 'info',
            showCloseButton: true //,
            //id: "Only-one-message",
            // actions: {
            //     cancel: {
            //         label: '不再提醒',
            //         action: function () {
            //             return msg.update({
            //                 message: '以后不再显示',
            //                 type: 'success',
            //                 actions: false,
            //                 showCloseButton: true
            //             });
            //         }
            //     }
            // }
        });

        //
        // $('#showMessage').click();
        //
        //
        //
        // $.messager.show({
        //     id: 'taskMessageDiv',
        //     name: 'taskMessageDiv',
        //     title: title,
        //     msg: msg,
        //     timeout: 0,
        //     height:'130',
        //     width:'400',
        //     showType: 'slide'
        // });
    };



    function time(){
        $.ajax( {
            url : "/super_back/msg/initMessageNew.do",
            type: "POST",
            success : function(result) {
                if(result.length>0){
                    taskMessage(result,"系统提醒消息");
                }
            }
        });
    };

    window.time = time;

    ($(function(){
        setInterval('time()',60000);
        $("div.logIcon").parent().addClass("logIconTitle");
        $("div.layout-button-left").parent().addClass("layoutButtonLeft");
    }));

    var messageHref = {
            '/super_back/log/viewMessageQuery.zul': 'data-id="viewMessage" data-name="我的消息"', //我的消息
            'log/viewAnnounceQuery.zul':'data-id="viewAnnounce" data-name="我的公告"',  //我的公告
            'log/viewTaskQuery.zul' : 'data-id="viewTask" data-name="我的任务"'  //我的任务
        };

    function updateMsgRecreiver(msgId){
        $.ajax( {
            url : "/super_back/msg/updateMsgRecreiver.do",
            data:"msgId="+msgId,
            type: "POST",
            success : function() {
                var _msg="#"+msgId+"_msg";
                var _finish="#"+msgId+"_finish";
                $(_msg).hide();
                $(_finish).hide();
                $(_finish + " + br").hide();
            }
        });
    };


    window.updateMsgRecreiver = updateMsgRecreiver;



});
