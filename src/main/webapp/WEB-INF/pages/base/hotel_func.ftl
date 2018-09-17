<#macro starlevel str>
<#local clazz=""/>
<#local width=0/>
<#switch str>
	<#case "五星级酒店">
		<#local clazz="tuan-star"/>
		<#local width=100/>
	<#break>
	<#case "四星级酒店">
		<#local clazz="tuan-star"/>
		<#local width=80/>
	<#break>
	<#case "三星级酒店">
		<#local clazz="tuan-star"/>
		<#local width=60/>
	<#break>
	<#case "二星级酒店">
		<#local clazz="tuan-star"/>
		<#local width=40/>
	<#break>
	<#--tuan-diamond这个样式目前不存在-->
	<#case "豪华型酒店">
		<#local clazz="diamond"/>
		<#local width=100/>
	<#break>
	<#case "品质型酒店">
		<#local clazz="diamond"/>
		<#local width=80/>
	<#break>
	<#case "舒适型酒店">
		<#local clazz="diamond"/>
		<#local width=60/>
	<#break>
	<#case "简约型酒店">
		<#local clazz="diamond"/>
		<#local width=40/>
	<#break>
	<#case "未知星级">
		<#local clazz="diamond"/>
		<#local width=20/>
	<#break>
	<#default>
		<#local clazz="diamond"/>
		<#local width=80/>
</#switch>
<span>酒店星级：</span><span class="${clazz}" title="${str}"><i style="width:${width}%"></i></span>
</#macro>