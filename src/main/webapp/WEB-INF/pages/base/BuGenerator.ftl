<#macro BuGenerator buList productBu categoryId subCategoryId>
	<select name="bu" id="bu" required categoryId="${categoryId}" subCategoryId="${subCategoryId}" >
	<option value="">请选择</option>
	<!--LOCAL_BU, DESTINATION_BU-->
	<option 
		<#if productBu == 'LOCAL_BU' || productBu == 'DESTINATION_BU'>
			value='${productBu}' 
		<#elseif categoryId==15 || categoryId==16 || (categoryId==18 && (subCategoryId==182 || subCategoryId==183))>
			value='LOCAL_BU' 
		<#else>
			value='DESTINATION_BU' 
		</#if>
		<#if productBu == 'LOCAL_BU' || productBu == 'DESTINATION_BU'>selected</#if> >国内度假事业部</option>
	<#list buList as list>
		<#if list.code != 'LOCAL_BU' && list.code != 'DESTINATION_BU'>
			<option value=${list.code!''}
				<#if subCategoryId==181 && list.code=='TICKET_BU'>disabled="disabled"</#if>
				<#if productBu == list.code>selected</#if> >${list.cnName!''}
			</option>
		</#if>
	</#list>
	</select>
</#macro>
