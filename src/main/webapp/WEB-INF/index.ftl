<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>驴妈妈旅游网后台管理系统</title>
<meta name="keywords" content="" />
<meta name="description" content="" />
<link rel="stylesheet" href="${basePath}/css/ui-common.css">
<link rel="stylesheet" href="${basePath}/css/ui-components.css">
<link rel="stylesheet" href="${basePath}/css/ui-panel.css">
<link rel="stylesheet" href="${basePath}/css/dialog.css" type="text/css"/>
</head>
<body>
<!-- 顶部导航\\ -->
<div class="topbar">
	<a class="logo" href="/panel/"><h1>驴妈妈业务系统<small>业务系统</small></h1></a>
    <p class="top_list">
    	<a href="#">新增任务</a> |
    	<a href="#">我的公告</a> |
        <a href="#">我的任务</a> |
        <a href="#">我的消息</a>
    </p>
	<p>操作员：<span>${(user.userName)!""}</span> / <span>${(user.realName)!""}</span>　[<a id="reLogin" class="B" href="#">重登陆</a>]　[<a class="B" href="/library/loginout.do" type="post">退出系统</a>]</p>
</div><!-- //顶部导航 -->

<!-- 边栏\\ -->
<div id="panel_aside" class="panel_aside">
	<span id="oper_aside" class="icon-arrow-left"></span>
    <span id="oper_set" class="icon-set"></span>
	<div class="aside_box">
		<#if menuList??>
			<ul id="aside_list" class="aside_list ul_oper_list">
			<#list menuList as obj>
				<li class="oper_item"><a target="iframeMain" ><span class="icon-tag"></span>${obj.name}</a>
            	<ul class="ul_oper_list"> 
				<#list obj.subList as subObj>
					<li class="oper_item"><a target="iframeMain" href="${subObj.url?if_exists}"><span class="icon-tag"></span>${subObj.name}</a></li>
				</#list>
				</ul>
				</li>
			</#list>
			</ul>
		<#else>
		<ul id="aside_list" class="aside_list ul_oper_list">
            <li class="oper_item"><a target="iframeMain" ><span class="icon-tag"></span>图书管理</a>
            <ul class="ul_oper_list"> 
            	<li class="oper_item"><a target="iframeMain" href="/library/user/findUsers.do"><span class="icon-tag"></span> 图书类别管理</a></li>
				<li class="oper_item"><a target="iframeMain" href="/vst_back/biz/district/findDistrictList.do"><span class="icon-tag"></span> 图书信息管理</a></li>
	    <#--        <li class="oper_item"><a target="iframeMain" href="/vst_back/biz/districtSign/findDistrictSignList.do"><span class="icon-tag"></span> 地理位置管理</a></li>
	            <li class="oper_item"><a target="iframeMain" href="/vst_back/biz/attribution/findAttributionList.do"><span class="icon-tag"></span> 归属地区</a></li> 
	            <li class="oper_item"><a target="iframeMain" href="/vst_back/biz/dict/findDictList.do"><span class="icon-tag"></span> 字典管理</a></li> 
	            <li class="oper_item"><a target="iframeMain" href="/vst_back/biz/dest/findDestList.do"><span class="icon-tag"></span> 目的地管理</a></li> -->
			</ul>
			</li>
            <li class="oper_item"><a target="iframeMain" ><span class="icon-tag"></span>用户管理</a>
            <ul class="ul_oper_list">
	            <li class="oper_item"><a target="iframeMain" href="/vst_back/prod/product/findProductList.do"><span class="icon-tag"></span> 标准产品管理</a></li>
	            <li class="oper_item"><a target="iframeMain" href="/vst_back/prod/product/findProductAuditList.do"><span class="icon-tag"></span> 标准产品审核</a></li>
	            <li class="oper_item"><a target="iframeMain" href="/vst_back/visa/visaDoc/findBizVisaDocList.do"><span class="icon-tag"></span> 签证材料管理</a></li>
	            <li class="oper_item"><a target="iframeMain" href="/vst_back/ship/prod/resourceSelect/showResourceSelect.do"><span class="icon-tag"></span> 邮轮标准产品管理</a></li>
	            <li class="oper_item"><a target="iframeMain" href="/vst_back/prod/compship/findCruiseCombProductList.do"><span class="icon-tag"></span> 邮轮组合产品管理</a></li>
	            <li class="oper_item"><a target="iframeMain" href="/vst_back/goods/house/findHouseControlProductList.do"><span class="icon-tag"></span> 房态控制</a></li>
			</ul>
			</li>
            <li class="oper_item"><a target="iframeMain" ><span class="icon-tag"></span>借阅管理</a>
            <ul class="ul_oper_list">
	            <li class="oper_item"><a target="iframeMain" href="/vst_back/supp/supplier/findSupplierList.do"><span class="icon-tag"></span> 供应商管理</a></li>
	            <li class="oper_item"><a target="iframeMain" href="/vst_back/supp/suppContract/findSupplierContractList.do"><span class="icon-tag"></span> 供应商合同管理</a></li>
	            <li class="oper_item"><a target="iframeMain" href="/vst_back/supp/suppContractCheck/findSupplierContractCheckList.do"><span class="icon-tag"></span> 供应商合同审核</a></li>
			</ul>
			</li>
            <li class="oper_item"><a target="iframeMain" ><span class="icon-tag"></span>系统管理</a>
            <ul class="ul_oper_list">
	            <li class="oper_item"><a target="iframeMain" href="/vst_back/dist/distributor/findDistributorList.do"><span class="icon-tag"></span> 分销商管理</a></li>
			</ul>
			</li>
		</ul>
		</#if>
		<!-- //ul aside_list -->
	</div>
</div><!-- //边栏 -->
<div id="panel_control" class="panel_control"></div>
<!-- 工作区\\ -->
<div id="panel_main" class="panel_main">
	<iframe id="iframeMain" name="iframeMain" src="" frameborder="0" style=" height:100%; background:#fff"></iframe>
	<div class="scoll-mask"></div>
</div><!-- //工作区 -->


<!-- 底部\\ -->
<div class="footer"></div><!-- //底部 -->
<#--<script src="http://pic.lvmama.com/js/new_v/jquery-1.7.min.js"></script>-->
<script type="text/javascript" src="${basePath}/bootstrap/js/jquery-1.7.min.js"></script>
<script src="${basePath}/js/panel-custom.js"></script>
<script>
</script>

</body>
</html>
