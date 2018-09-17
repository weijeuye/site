/**
 * Author：     yinhanchun
 * Date:        2015-08-17
 * Version:     1.0.0.0
 * Description: EBK出境警示
 */

$(function () {
    var $document = $(document);
    //行前须知条款部分
    $document.on("click", ".gi-notice-show-modal-btn", function () {
        if ($(this).data("isBinded") != "true") {
            $(this).data("isBinded", "true");
            var NOTICE_STATUS = []; // 用于存储"查看编辑范围"内的checkbox已保存的状态
            var $giNoticeModal = $(".gi-modal-notice");
            var $giNoticeStatus = $(".gi-notice-status");
            var $giNoticeShowModalBtn = $(".gi-notice-show-modal-btn");
            bindModalFuns(NOTICE_STATUS, $giNoticeModal, $giNoticeStatus, $giNoticeShowModalBtn, $(".gi-notice-checkbox"));
            showModal($giNoticeModal);
        }
    });


    //出行说明条款部分
    $document.on("click", ".gi-explanation-show-modal-btn", function () {
        if ($(this).data("isBinded") != "true") {
            $(this).data("isBinded", "true");
            var EXPLANATION_STATUS = [];
            var $giExplanationModal = $(".gi-modal-explanation");
            var $giExplanationStatus = $(".gi-explanation-status");
            var $giExplanationShowModalBtn = $(".gi-explanation-show-modal-btn");
            bindModalFuns(EXPLANATION_STATUS, $giExplanationModal, $giExplanationStatus, $giExplanationShowModalBtn, $(".gi-explanation-checkbox"));
            showModal($giExplanationModal);
        }
    });

    //海岛游条款部分
    $document.on("click", ".gi-hd-show-modal-btn", function () {
        if ($(this).data("isBinded") != "true") {
            $(this).data("isBinded", "true");
            var HD_STATUS = [];
            var $giHdModal = $(".gi-modal-hd");
            var $giHdStatus = $(".gi-hd-status");
            var $giHdShowModalBtn = $(".gi-hd-show-modal-btn");
            bindModalFuns(HD_STATUS, $giHdModal, $giHdStatus, $giHdShowModalBtn, $(".gi-hd-checkbox"));
            showModal($giHdModal);
        }
    });

    //欧洲游条款部分
    $document.on("click", ".gi-oz-show-modal-btn", function () {
        if ($(this).data("isBinded") != "true") {
            $(this).data("isBinded", "true");
            var OZ_STATUS = [];
            var $giOzModal = $(".gi-modal-oz");
            var $giOzStatus = $(".gi-oz-status");
            var $giOzShowModalBtn = $(".gi-oz-show-modal-btn");
            bindModalFuns(OZ_STATUS, $giOzModal, $giOzStatus, $giOzShowModalBtn, $(".gi-oz-checkbox"));
            showModal($giOzModal);
        }
    });

    //日本游条款部分
    $document.on("click", ".gi-rb-show-modal-btn", function () {
        if ($(this).data("isBinded") != "true") {
            $(this).data("isBinded", "true");
            var RB_STATUS = [];
            var $giRbModal = $(".gi-modal-rb");
            var $giRbStatus = $(".gi-rb-status");
            var $giRbShowModalBtn = $(".gi-rb-show-modal-btn");
            bindModalFuns(RB_STATUS, $giRbModal, $giRbStatus, $giRbShowModalBtn, $(".gi-rb-checkbox"));
            showModal($giRbModal);
        }
    });

    //泰国游条款部分
    $document.on("click", ".gi-tg-show-modal-btn", function () {
        if ($(this).data("isBinded") != "true") {
            $(this).data("isBinded", "true");
            var TG_STATUS = [];
            var $giTgModal = $(".gi-modal-tg");
            var $giTgStatus = $(".gi-tg-status");
            var $giTgShowModalBtn = $(".gi-tg-show-modal-btn");
            bindModalFuns(TG_STATUS, $giTgModal, $giTgStatus, $giTgShowModalBtn, $(".gi-tg-checkbox"));
            showModal($giTgModal);
        }
    });

    //美国游条款部分
    $document.on("click", ".gi-mg-show-modal-btn", function () {
        if ($(this).data("isBinded") != "true") {
            $(this).data("isBinded", "true");
            var MG_STATUS = [];
            var $giMgModal = $(".gi-modal-mg");
            var $giMgStatus = $(".gi-mg-status");
            var $giMgShowModalBtn = $(".gi-mg-show-modal-btn");
            bindModalFuns(MG_STATUS, $giMgModal, $giMgStatus, $giMgShowModalBtn, $(".gi-mg-checkbox"));
            showModal($MG_STATUS);
        }
    });

    //中东非游条款部分
    $document.on("click", ".gi-zdf-show-modal-btn", function () {
        if ($(this).data("isBinded") != "true") {
            $(this).data("isBinded", "true");
            var ZDF_STATUS = [];
            var $giZdfModal = $(".gi-modal-zdf");
            var $giZdfStatus = $(".gi-zdf-status");
            var $giZdfShowModalBtn = $(".gi-zdf-show-modal-btn");
            bindModalFuns(ZDF_STATUS, $giZdfModal, $giZdfStatus, $giZdfShowModalBtn, $(".gi-zdf-checkbox"));
            showModal($giZdfModal);
        }
    });

    //迪拜游条款部分
    $document.on("click", ".gi-db-show-modal-btn", function () {
        if ($(this).data("isBinded") != "true") {
            $(this).data("isBinded", "true");
            var DB_STATUS = [];
            var $giDbModal = $(".gi-modal-db");
            var $giDbStatus = $(".gi-db-status");
            var $giDbShowModalBtn = $(".gi-db-show-modal-btn");
            bindModalFuns(DB_STATUS, $giDbModal, $giDbStatus, $giDbShowModalBtn, $(".gi-db-checkbox"));
            showModal($giDbModal);
        }
    });

    //南亚游条款部分
    $document.on("click", ".gi-ny-show-modal-btn", function () {
        if ($(this).data("isBinded") != "true") {
            $(this).data("isBinded", "true");
            var NY_STATUS = [];
            var $giNyModal = $(".gi-modal-ny");
            var $giNyStatus = $(".gi-ny-status");
            var $giNyShowModalBtn = $(".gi-ny-show-modal-btn");
            bindModalFuns(NY_STATUS, $giNyModal, $giNyStatus, $giNyShowModalBtn, $(".gi-ny-checkbox"));
            showModal($giNyModal);
        }
    });

    //关岛游条款部分
    $document.on("click", ".gi-gd-show-modal-btn", function () {
        if ($(this).data("isBinded") != "true") {
            $(this).data("isBinded", "true");
            var GD_STATUS = [];
            var $giGdModal = $(".gi-modal-gd");
            var $giGdStatus = $(".gi-gd-status");
            var $giGdShowModalBtn = $(".gi-gd-show-modal-btn");
            bindModalFuns(GD_STATUS, $giGdModal, $giGdStatus, $giGdShowModalBtn, $(".gi-gd-checkbox"));
            showModal($giGdModal);
        }
    });

    //马尔代夫游条款部分
    $document.on("click", ".gi-medf-show-modal-btn", function () {
        if ($(this).data("isBinded") != "true") {
            $(this).data("isBinded", "true");
            var MEDF_STATUS = [];
            var $giMedfModal = $(".gi-modal-medf");
            var $giMedfStatus = $(".gi-medf-status");
            var $giMedfShowModalBtn = $(".gi-medf-show-modal-btn");
            bindModalFuns(MEDF_STATUS, $giMedfModal, $giMedfStatus, $giMedfShowModalBtn, $(".gi-medf-checkbox"));
            showModal($giMedfModal);
        }
    });

    //澳新条款
    $document.on("click", ".gi-ax-show-modal-btn", function () {
        if ($(this).data("isBinded") != "true") {
            $(this).data("isBinded", "true");
            var AX_STATUS = [];
            var $giAxModal = $(".gi-modal-ax");
            var $giAxStatus = $(".gi-ax-status");
            var $giAxShowModalBtn = $(".gi-ax-show-modal-btn");
            bindModalFuns(AX_STATUS, $giAxModal, $giAxStatus, $giAxShowModalBtn, $(".gi-ax-checkbox"));
            showModal($giAxModal);
        }
    });
    //美洲条款
    $document.on("click", ".gi-mz-show-modal-btn", function () {
        if ($(this).data("isBinded") != "true") {
            $(this).data("isBinded", "true");
            var AX_STATUS = [];
            var $giMzModal = $(".gi-modal-mz");
            var $giMzStatus = $(".gi-mz-status");
            var $giMzShowModalBtn = $(".gi-mz-show-modal-btn");
            bindModalFuns(AX_STATUS, $giMzModal, $giMzStatus, $giMzShowModalBtn, $(".gi-mz-checkbox"));
            showModal($giAxModal);
        }
    });
    
    
  //韩国酒店描述
    $document.on("click", ".gi-hgms-show-modal-btn", function () {
    	 if ($(this).data("isBinded") != "true") {
	             $(this).data("isBinded", "true");
		        var HGMS_STATUS = [];
		        var $gihgmsModal = $(".gi-modal-hgms");
		        var $gihgmsStatus = $(".gi-hgms-status");
		        var $gihgmsShowModalBtn = $(".gi-hgms-show-modal-btn");
		        bindModalFuns(HGMS_STATUS, $gihgmsModal, $gihgmsStatus, $gihgmsShowModalBtn, $(".gi-hgms-checkbox"));
		        showModal($gihgmsModal);
    	 }
    });
  //日本酒店描述
    $document.on("click", ".gi-rbms-show-modal-btn", function () {
    	if ($(this).data("isBinded") != "true") {
            $(this).data("isBinded", "true");
	        var RBMS_STATUS = [];
	        var $girbmsModal = $(".gi-modal-rbms");
	        var $girbmsStatus = $(".gi-rbms-status");
	        var $girbmsShowModalBtn = $(".gi-rbms-show-modal-btn");
	        bindModalFuns(RBMS_STATUS, $girbmsModal, $girbmsStatus, $girbmsShowModalBtn, $(".gi-rbms-checkbox"));
	        showModal($girbmsModal);
	   }
	});
  // 泰国团队酒店描述
    $document.on("click", ".gi-tgms-show-modal-btn", function () {
    	if ($(this).data("isBinded") != "true") {
            $(this).data("isBinded", "true");
	        var TGMS_STATUS = [];
	        var $gitgmsModal = $(".gi-modal-tgms");
	        var $gitgmsStatus = $(".gi-tgms-status");
	        var $gitgmsShowModalBtn = $(".gi-tgms-show-modal-btn");
	        bindModalFuns(TGMS_STATUS, $gitgmsModal, $gitgmsStatus, $gitgmsShowModalBtn, $(".gi-tgms-checkbox"));
	        showModal($gitgmsModal);
 	   }
    });
 // 巴厘岛团队酒店描述
    $document.on("click", ".gi-bldms-show-modal-btn", function () {
    	if ($(this).data("isBinded") != "true") {
            $(this).data("isBinded", "true");
	        var BLDMS_STATUS = [];
	        var $gibldmsModal = $(".gi-modal-bldms");
	        var $gibldmsStatus = $(".gi-bldms-status");
	        var $gibldmsShowModalBtn = $(".gi-bldms-show-modal-btn");
	        bindModalFuns(BLDMS_STATUS, $gibldmsModal, $gibldmsStatus, $gibldmsShowModalBtn, $(".gi-bldms-checkbox"));
	        showModal($gibldmsModal);
  	   }
     });
 // 普吉岛团队酒店描述
    $document.on("click", ".gi-pjdms-show-modal-btn", function () {
    	if ($(this).data("isBinded") != "true") {
            $(this).data("isBinded", "true");
	        var PJDMS_STATUS = [];
	        var $gipjdmsModal = $(".gi-modal-pjdms");
	        var $gipjdmsStatus = $(".gi-pjdms-status");
	        var $gipjdmsShowModalBtn = $(".gi-pjdms-show-modal-btn");
	        bindModalFuns(PJDMS_STATUS, $gipjdmsModal, $gipjdmsStatus, $gipjdmsShowModalBtn, $(".gi-pjdms-checkbox"));
	        showModal($gipjdmsModal);
   	   }
      });
 // 长滩团队酒店描述
    $document.on("click", ".gi-ctms-show-modal-btn", function () {
    	if ($(this).data("isBinded") != "true") {
            $(this).data("isBinded", "true");
	        var CTMS_STATUS = [];
	        var $gictmsModal = $(".gi-modal-ctms");
	        var $gictmsStatus = $(".gi-ctms-status");
	        var $gictmsShowModalBtn = $(".gi-ctms-show-modal-btn");
	        bindModalFuns(CTMS_STATUS, $gictmsModal, $gictmsStatus, $gictmsShowModalBtn, $(".gi-ctms-checkbox"));
	        showModal($gictmsModal);
    	   }
       });
 //关岛团队酒店描述
    $document.on("click", ".gi-gdms-show-modal-btn", function () {
    	if ($(this).data("isBinded") != "true") {
            $(this).data("isBinded", "true");
	        var GDMS_STATUS = [];
	        var $gigdmsModal = $(".gi-modal-gdms");
	        var $gigdmsStatus = $(".gi-gdms-status");
	        var $gigdmsShowModalBtn = $(".gi-gdms-show-modal-btn");
	        bindModalFuns(GDMS_STATUS, $gigdmsModal, $gigdmsStatus, $gigdmsShowModalBtn, $(".gi-gdms-checkbox"));
	        showModal($gigdmsModal);
 	   }
    });
    
  //塞班团队酒店描述
    $document.on("click", ".gi-sbms-show-modal-btn", function () {
    	if ($(this).data("isBinded") != "true") {
            $(this).data("isBinded", "true");
	        var SBMS_STATUS = [];
	        var $gisbmsModal = $(".gi-modal-sbms");
	        var $gisbmsStatus = $(".gi-sbms-status");
	        var $gisbmsShowModalBtn = $(".gi-sbms-show-modal-btn");
	        bindModalFuns(SBMS_STATUS, $gisbmsModal, $gisbmsStatus, $gisbmsShowModalBtn, $(".gi-sbms-checkbox"));
	        showModal($gisbmsModal);
  	   }
   });
    
    //美娜多团队酒店描述
    $document.on("click", ".gi-mndms-show-modal-btn", function () {
    	if ($(this).data("isBinded") != "true") {
            $(this).data("isBinded", "true");
	        var MNDMS_STATUS = [];
	        var $gimndmsModal = $(".gi-modal-mndms");
	        var $gimndmsStatus = $(".gi-mndms-status");
	        var $gimndmsShowModalBtn = $(".gi-mndms-show-modal-btn");
	        bindModalFuns(MNDMS_STATUS, $gimndmsModal, $gimndmsStatus, $gimndmsShowModalBtn, $(".gi-mndms-checkbox"));
	        showModal($gimndmsModal);
   	   }
    });
    
    //南亚团队酒店描述
    $document.on("click", ".gi-nyms-show-modal-btn", function () {
    	if ($(this).data("isBinded") != "true") {
            $(this).data("isBinded", "true");
	        var NYMS_STATUS = [];
	        var $ginymsModal = $(".gi-modal-nyms");
	        var $ginymsStatus = $(".gi-nyms-status");
	        var $ginymsShowModalBtn = $(".gi-nyms-show-modal-btn");
	        bindModalFuns(NYMS_STATUS, $ginymsModal, $ginymsStatus, $ginymsShowModalBtn, $(".gi-nyms-checkbox"));
	        showModal($ginymsModal);
    	}
    });
    
    //欧洲团队酒店描述
    $document.on("click", ".gi-ozms-show-modal-btn", function () {
    	if ($(this).data("isBinded") != "true") {
            $(this).data("isBinded", "true");
	        var OZMS_STATUS = [];
	        var $giozmsModal = $(".gi-modal-ozms");
	        var $giozmsStatus = $(".gi-ozms-status");
	        var $giozmsShowModalBtn = $(".gi-ozms-show-modal-btn");
	        bindModalFuns(OZMS_STATUS, $giozmsModal, $giozmsStatus, $giozmsShowModalBtn, $(".gi-ozms-checkbox"));
	        showModal($giozmsModal);
	    }
    });
    
  //澳新团队酒店描述
    $document.on("click", ".gi-oxms-show-modal-btn", function () {
    	if ($(this).data("isBinded") != "true") {
            $(this).data("isBinded", "true");
	        var OXMS_STATUS = [];
	        var $gioxmsModal = $(".gi-modal-oxms");
	        var $gioxmsStatus = $(".gi-oxms-status");
	        var $gioxmsShowModalBtn = $(".gi-oxms-show-modal-btn");
	        bindModalFuns(OXMS_STATUS, $gioxmsModal, $gioxmsStatus, $gioxmsShowModalBtn, $(".gi-oxms-checkbox"));
	        showModal($gioxmsModal);
	    }
    });
    
    //美国团队酒店描述
    $document.on("click", ".gi-mgms-show-modal-btn", function () {
    	if ($(this).data("isBinded") != "true") {
            $(this).data("isBinded", "true");
	        var MGMS_STATUS = [];
	        var $gimgmsModal = $(".gi-modal-mgms");
	        var $gimgmsStatus = $(".gi-mgms-status");
	        var $gimgmsShowModalBtn = $(".gi-mgms-show-modal-btn");
	        bindModalFuns(MGMS_STATUS, $gimgmsModal, $gimgmsStatus, $gimgmsShowModalBtn, $(".gi-mgms-checkbox"));
	        showModal($gimgmsModal);
	    }
    });
    
  //中东非团队酒店描述
    $document.on("click", ".gi-zdfms-show-modal-btn", function () {
    	if ($(this).data("isBinded") != "true") {
            $(this).data("isBinded", "true");
	        var ZDFMS_STATUS = [];
	        var $gizdfmsModal = $(".gi-modal-zdfms");
	        var $gizdfmsStatus = $(".gi-zdfms-status");
	        var $gizdfmsShowModalBtn = $(".gi-zdfms-show-modal-btn");
	        bindModalFuns(ZDFMS_STATUS, $gizdfmsModal, $gizdfmsStatus, $gizdfmsShowModalBtn, $(".gi-zdfms-checkbox"));
	        showModal($gizdfmsModal);
	    }
    });
    //宿雾团队酒店描述
    $document.on("click", ".gi-cebums-show-modal-btn", function () {
    	if ($(this).data("isBinded") != "true") {
    		$(this).data("isBinded", "true");
    		var ZDFMS_STATUS = [];
    		var $gizdfmsModal = $(".gi-modal-cebums");
    		var $gizdfmsStatus = $(".gi-cebums-status");
    		var $gizdfmsShowModalBtn = $(".gi-cebums-show-modal-btn");
    		bindModalFuns(ZDFMS_STATUS, $gizdfmsModal, $gizdfmsStatus, $gizdfmsShowModalBtn, $(".gi-cebums-checkbox"));
    		showModal($gizdfmsModal);
    	}
    });
    //港澳团队酒店描述
    $document.on("click", ".gi-hkmams-show-modal-btn", function () {
    	if ($(this).data("isBinded") != "true") {
    		$(this).data("isBinded", "true");
    		var ZDFMS_STATUS = [];
    		var $gizdfmsModal = $(".gi-modal-hkmams");
    		var $gizdfmsStatus = $(".gi-hkmams-status");
    		var $gizdfmsShowModalBtn = $(".gi-hkmams-show-modal-btn");
    		bindModalFuns(ZDFMS_STATUS, $gizdfmsModal, $gizdfmsStatus, $gizdfmsShowModalBtn, $(".gi-hkmams-checkbox"));
    		showModal($gizdfmsModal);
    	}
    });
    //新加坡马来西亚团队酒店描述
    $document.on("click", ".gi-singmams-show-modal-btn", function () {
    	if ($(this).data("isBinded") != "true") {
    		$(this).data("isBinded", "true");
    		var ZDFMS_STATUS = [];
    		var $gizdfmsModal = $(".gi-modal-singmams");
    		var $gizdfmsStatus = $(".gi-singmams-status");
    		var $gizdfmsShowModalBtn = $(".gi-singmams-show-modal-btn");
    		bindModalFuns(ZDFMS_STATUS, $gizdfmsModal, $gizdfmsStatus, $gizdfmsShowModalBtn, $(".gi-singmams-checkbox"));
    		showModal($gizdfmsModal);
    	}
    });
    //台湾团队酒店描述
    $document.on("click", ".gi-taiwanms-show-modal-btn", function () {
    	if ($(this).data("isBinded") != "true") {
    		$(this).data("isBinded", "true");
    		var ZDFMS_STATUS = [];
    		var $gizdfmsModal = $(".gi-modal-taiwanms");
    		var $gizdfmsStatus = $(".gi-taiwanms-status");
    		var $gizdfmsShowModalBtn = $(".gi-taiwanms-show-modal-btn");
    		bindModalFuns(ZDFMS_STATUS, $gizdfmsModal, $gizdfmsStatus, $gizdfmsShowModalBtn, $(".gi-taiwanms-checkbox"));
    		showModal($gizdfmsModal);
    	}
    });

    //沙巴、文莱团队酒店描述
    $document.on("click", ".gi-sabahbrunei-show-modal-btn", function () {
        if ($(this).data("isBinded") != "true") {
            $(this).data("isBinded", "true");
            var ZDFMS_STATUS = [];
            var $gizdfmsModal = $(".gi-modal-sabahbrunei");
            var $gizdfmsStatus = $(".gi-sabahbrunei-status");
            var $gizdfmsShowModalBtn = $(".gi-sabahbrunei-show-modal-btn");
            bindModalFuns(ZDFMS_STATUS, $gizdfmsModal, $gizdfmsStatus, $gizdfmsShowModalBtn, $(".gi-sabahbrunei-checkbox"));
            showModal($gizdfmsModal);
        }
    });

    //兰卡威团队酒店描述
    $document.on("click", ".gi-langkawi-show-modal-btn", function () {
        if ($(this).data("isBinded") != "true") {
            $(this).data("isBinded", "true");
            var ZDFMS_STATUS = [];
            var $gizdfmsModal = $(".gi-modal-langkawi");
            var $gizdfmsStatus = $(".gi-langkawi-status");
            var $gizdfmsShowModalBtn = $(".gi-langkawi-show-modal-btn");
            bindModalFuns(ZDFMS_STATUS, $gizdfmsModal, $gizdfmsStatus, $gizdfmsShowModalBtn, $(".gi-langkawi-checkbox"));
            showModal($gizdfmsModal);
        }
    });
    
    
    
    // 绑定 “特殊接待限制”中含子复选框的元素事件
    $document.on("change", ".gi-cc-outer-group :checkbox", function () {
        var isChecked = $(this).prop("checked");
        var $innerLabel = $(this).parents(".gi-checkbox-combination").find(".gi-cc-inner-group");
        if (isChecked) {
            $innerLabel.show();
        } else {
            $innerLabel.hide();
        }
    });

    // 蜜月优惠
    $document.on("click", ".JS_honey_moon_checkbox", function () {
        var $honeyMoon = $(".JS_honey_moon");
        if ($(this).is(":checked")) {
            $honeyMoon.show();
        } else {
            $honeyMoon.hide();
        }
    });

    // 绑定模态窗内各种方法
    function bindModalFuns(arr, $modal, $giStatus, $giShowModalBtn, $giCheck) {
        var $giSaveBtn = $modal.find(".gi-save-btn");
        var $giCheckAll = $modal.find(".gi-check-all");
        var $giCancelBtn = $modal.find(".gi-cancel-btn");
        var $giModalClose = $modal.find(".gi-modal-close");
        var $giCheckBoxes = $modal.find(".gi-checkbox-group input");

        // 存储"查看编辑范围"内的checkbox的初始转态
        saveCheckBoxStatus(arr, $giCheckBoxes);

        // 显示模态窗口
        $giShowModalBtn.on("click", function () {
            showModal($modal);
        });

        // 全选
        $giCheckAll.on("click", function () {
            var isCheckAll = false;
            if ($(this).attr("checked")) {
                isCheckAll = true;
            }
            checkAll($giCheckBoxes, isCheckAll);
        });

        // 修改
        $giCheckBoxes.on("change", function () {
            $giCheckAll.attr("checked", isAllChecked($giCheckBoxes));
        });

        // 保存
        $giSaveBtn.on("click", function () {
            showCheckBoxesStatus($giStatus, isAllChecked($giCheckBoxes));
            saveCheckBoxStatus(arr, $giCheckBoxes);
            hideModal($modal);
            if (isAllNotChecked($giCheckBoxes)) {
                $giCheck.removeAttr("checked");
                $giShowModalBtn.hide();
            }
        });

        // 取消（还原checkBox状态）
        $giCancelBtn.on("click", function () {
            updateCheckBoxStatus(arr, $giCheckBoxes, $giCheckAll);
            hideModal($modal);
        });

        // 关闭模态窗口（还原checkBox状态）
        $giModalClose.on("click", function () {
            updateCheckBoxStatus(arr, $giCheckBoxes, $giCheckAll);
            hideModal($modal);
        });

    }

    // 全选/全不选
    function checkAll($element, isCheckAll) {
        $element.attr("checked", isCheckAll);
    }

    // 检查是否已全选
    function isAllChecked($element) {
        for (var i = 0; i < $element.length; i++) {
            if (!$element.eq(i).attr("checked")) {
                return false;
            }
        }
        return true;
    }

    // 检查是否全未选
    function isAllNotChecked($element) {
        for (var i = 0; i < $element.length; i++) {
            if ($element.eq(i).attr("checked")) {
                return false;
            }
        }
        return true;
    }

    // 显式是否已全选
    function showCheckBoxesStatus($element, isAllChecked) {
        if (isAllChecked) {
            $element.find(".gi-color-green").show();
            $element.find(".gi-color-red").hide();
        } else {
            $element.find(".gi-color-green").hide();
            $element.find(".gi-color-red").show();
        }
    }

    // 显示模态窗口
    function showModal($modal) {
        $(".gi-modal-overlay").show();
        $modal.show();
        if (parseInt($modal.css("height")) > $(window).height()) {
            $modal.css({
                "position": "absolute",
                "top": $(document).scrollTop()
            });
        }
    }

    // 关闭模态窗口
    function hideModal($modal) {
        $(".gi-modal-overlay").hide();
        $modal.hide();
    }

    // 存储"查看编辑范围"内的checkbox的转态
    function saveCheckBoxStatus(arr, $element) {
        for (var i = 0; i < $element.length; i++) {
            if ($element.eq(i).attr("checked")) {
                arr[i] = true;
            } else {
                arr[i] = false;
            }
        }
    }

    // 更新页面上"查看编辑范围"内的checkbox的转态
    function updateCheckBoxStatus(arr, $checkBoxes, $checkAll) {
        for (var i = 0; i < $checkBoxes.length; i++) {
            $checkBoxes.eq(i).attr("checked", arr[i]);
        }
        $checkAll.attr("checked", isAllChecked($checkBoxes));
    }

});

$(function () {

    var $document = $(document);

    //通用列表
    function generalList(parameter) {

        //添加
        $document.on("click", parameter.addBtn, function () {

            var $this = $(this);


            var $templateInner = $(".JS_template_inner");


            var $area = $this.parents(parameter.area);


            if (parameter.isJudged && $area.find(parameter.judgeCtrl).attr("checked") != "checked") {
                return;
            }

            var $parent = $area.find(parameter.parent);

            if (parameter.isLengthLimited && $parent.find(parameter.item).length >= 10) {
                return;
            }

            var $add = $area.find(parameter.add);
            var $destination = $templateInner.find(parameter.itemTemplate).clone();
            if (parameter.parentAdd) {

                $parent.append($destination);
            } else {

                $add.before($destination);
            }

            if (parameter.hiddenDelBtn) {
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
            }

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
            var $item = $this.parents(parameter.item);
            $item.slideUp(200, function () {

                $item.remove();
            });

        });

    }

    //费用包含 其他 添加
    generalList({
        "area": ".JS_ta_limit_other_area",
        "parent": ".JS_ta_limit_other_group",
        "item": ".JS_ta_limit_other",
        "add": ".JS_ta_limit_other_add_box",
        "addBtn": ".JS_ta_limit_other_add",
        "delBtn": ".JS_ta_limit_other_del",
        "itemTemplate": ".JS_ta_limit_other",
        "isJudged": true,
        "judgeCtrl": ".JS_ta_limit_judge_ctrl"
    });

    //费用包含 其他 添加
    generalList({
        "area": ".JS_ta_reception_other_area",
        "parent": ".JS_ta_reception_other_group",
        "item": ".JS_ta_reception_other",
        "add": ".JS_ta_reception_other_add_box",
        "addBtn": ".JS_ta_reception_other_add",
        "delBtn": ".JS_ta_reception_other_del",
        "itemTemplate": ".JS_ta_reception_other",
        "isJudged": true,
        "judgeCtrl": ".JS_ta_reception_judge_ctrl"
    });

});
