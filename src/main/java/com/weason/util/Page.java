package com.weason.util;


import javax.servlet.http.HttpServletRequest;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * 分页类
 * 
 * @author yanggan
 * 
 * @param <T>
 */
public class Page<T> implements java.io.Serializable {
	public static enum Page_Key{
		_pageSize,
		_start,
		_end,
		_orderby,
		_order;
	}
	private static final long serialVersionUID = 8450665768936866696L;
	private static final long DEFAULT_PAGE_SIZE = 10;
	/** 当前页 */
	private long currentPage = 1;
	/** 每页数查询数量，默认10条 */
	private long pageSize = DEFAULT_PAGE_SIZE;
	/** 记录总数 */
	private long totalResultSize = 0;
	/** 记录集 */
	private List<T> items = Collections.emptyList();
	/** 总页数 */
	private long totalPageNum;

	private String actionType = "do";

	private String currentPageParamName = "page";

	private String url;
	
	private String requestURI;
	
	private boolean ajaxFlag = false;

	private List<T> allItems = Collections.emptyList();
	
	private List<RequestKV> params = Collections.emptyList();

	public String getUrl() {
		return url;
	}

	public void setUrl(String url) {
		this.url = url;
	}

    /** 查询条件 **/
    private T param;

    public T getParam() {
        return param;
    }

    public void setParam(T param) {
        this.param = param;
    }

    /**
	 * 初始化链接
	 * 
	 * @param req
	 */
	public void buildUrl(HttpServletRequest req) {
		this.url = WebUtils.getPageUrl(req, initSkipParam());
		initUrl(req);
	}
	
	public void buildJSONUrl(HttpServletRequest req){
		this.url = WebUtils.getPageUrl(req, initSkipParam());
		ajaxFlag = true;
		initUrl(req);
	}
	
	private void initUrl(HttpServletRequest req){
		params = WebUtils.getParameterMap(req, initSkipParam());
		requestURI = req.getRequestURI();
	}
	
	/**
	 * 期望在页面上使用ajax读取分页
	 * @param req
	 * @param use
	 */
	public void buildJSONUrl(HttpServletRequest req, boolean use){
		ajaxFlag = true;
		this.url = WebUtils.getPageUrl(req, initSkipParam());
		
		if(use){
			if(url.endsWith("&page=")){
				url=url.replace("&page=", "");
			}
			if(!url.contains("useAjax")){
				String requestUri;
				if(url.contains("?")){
					requestUri="&useAjax=true";
				}else{
					requestUri="?useAjax=true";
				}
				this.url=url+requestUri;
			}
		}
		initUrl(req);
	}

	private Map<String, String> initSkipParam() {
		Map<String, String> skipParam = new HashMap<String, String>();
		skipParam.put(this.getCurrentPageParamName(), this.getCurrentPageParamName());
		skipParam.put("perPageRecord", "perPageRecord");
		skipParam.put("gogo", "gogo");
		if(ajaxFlag){
			skipParam.put("useAjax", "useAjax");
		}
		return skipParam;
	}

	public Page() {

	}

	public Page(long totalResultSize) {
		this.totalResultSize = totalResultSize;
		this.pageSize = DEFAULT_PAGE_SIZE;
		this.currentPage = 1;
	}

	public Page(long pageSize, long currentPage) {
		if (pageSize < 1) {
			this.pageSize = DEFAULT_PAGE_SIZE;
		} else {
			this.pageSize = pageSize;
		}
		this.currentPage = currentPage;
	}

	/**
	 * @param totalResultSize
	 *            记录总数
	 * @param pageSize
	 *            每页显示数
	 * @param currentPage
	 *            当前页
	 */
	public Page(long totalResultSize, long pageSize, long currentPage) {
		this.totalResultSize = totalResultSize;
		this.pageSize = pageSize;
		if ((currentPage < 1) || (totalResultSize <= pageSize)) {
			this.currentPage = 1;
		} else {
			this.currentPage = currentPage;
		}
		totalPageNum = getTotalPages();
		if (currentPage > totalPageNum) {
			this.currentPage = 1;
		}
	}

	public long getCurrentPage() {
		return currentPage;
	}

	public void setCurrentPage(final Long currentPage) {
		if ((currentPage == null) || (currentPage < 1)) {
			this.currentPage = 1;
		}
		this.currentPage = currentPage;
	}

	/**
	 * 每页数显示数量，默认10
	 * 
	 * @return
	 */
	public long getPageSize() {
		return pageSize;
	}

	public void setPageSize(long pageSize) {
		this.pageSize = pageSize;
	}

	public long getTotalResultSize() {
		return totalResultSize;
	}

	public void setTotalResultSize(long totalResultSize) {
		this.totalResultSize = totalResultSize;
		this.totalPageNum = getTotalPages();
	}

	public List<T> getItems() {
		if ((items == null) || (items.size() == 0)) {
			if (allItems.size() > 0) {
				Long i = this.getStartRows() - 1;
				int end = this.getCurrentRowNum();
				if (i < end) {
					return allItems.subList(i.intValue(), end);
				}

			}
		}
		return items;
	}

	public void setItems(List<T> items) {
		this.items = items;
	}

	public long getStartRows() {
		return ((currentPage - 1) * pageSize) + 1;
	}
	
	public long getStartRowsMySql() {
		return ((currentPage - 1) * pageSize);
	}

	public long getTotalPages() {
		if ((this.totalResultSize % this.pageSize) > 0) {
			return (this.totalResultSize / this.pageSize) + 1;
		} else {
			return this.totalResultSize / this.pageSize;
		}
	}

	/**
	 * 设置PageConfig
	 * 
	 * @param totalResultSize
	 *            记录总数
	 * @param pageSize
	 *            每页数
	 * @param currentPage
	 *            当前页
	 * @return
	 */
	public static  <T>  Page<T> page(long totalResultSize, long pageSize, long currentPage) {
		return new Page<T>(totalResultSize, pageSize, currentPage);
	}

	public static <T>  Page<T> page(long pageSize, long currentPage) {
		return new Page<T>(pageSize, currentPage);
	}

	public long getTotalPageNum() {
		return this.getTotalPages();
	}

	public void setTotalPageNum(long totalPageNum) {
		this.totalPageNum = totalPageNum;
	}

	/**
	 * 重置记录数量总数
	 * 
	 * @param page
	 *            每页数
	 * @param totalResultSize
	 *            当前页
	 * @return
	 */
	public void resetTotalResultSize(Page<T> pageConfig, long totalResultSize) {
		if (totalResultSize <= 0) {
			return;
		}
		pageConfig.setTotalResultSize(totalResultSize);
		long totoalNumCount = getTotalPages();
		pageConfig.setTotalPageNum(totoalNumCount);
	}

	/**
	 * 当前页的结束行
	 * 
	 * @return
	 */
	public long getEndRows() {
		long num = 0;
		if (this.currentPage == this.totalPageNum) {
			num = this.getTotalResultSize();
		} else {
			num = (this.getStartRows() + this.getPageSize()) - 1;
		}
		return num;
	}

	/**
	 * 默认第10类分页方式组装分页Html
	 * 
	 * @author: ranlongfei 2012-8-16 下午6:39:41
	 * @return
	 */
	public String getPagination() {
		return pagination(10);
	}

	/**
	 * 异步亲亲分页默认以第1类分页方式组装分页Html
	 * 用于ajax异步分页(不会刷新整个页面)
	 * @author: yangdechao 2015-11-20 早上11:39:41
	 * @return
	 */
	public String getAsyncPagination() {
		return paginationAsync(1);
	}
	/**
	 * 按分页类型组装分页Html
	 * 
	 * @author: ranlongfei 2012-8-16 下午6:40:39
	 * @param type
	 * @return
	 */
	public String pagination(int type) {
		Pagination p = new Pagination(getPageSize(), getTotalPageNum(), getUrl(), getCurrentPage());
		p.setMode(type);
		p.setTotalResultSize(totalResultSize);
		if(ajaxFlag){
			p.setType("ajax");
		}
		return p.doStartTag();
	}

	/**
	 * 按分页类型组装分页Html(主要用于异步不刷新页面分页)
	 * 
	 * @author: yangdechao 2015-11-20 早上11:39:41
	 * @param type
	 * @return
	 */
	public String paginationAsync(int type) {
		Pagination p = new Pagination(getPageSize(), getTotalPageNum(), getUrl(), getCurrentPage());
		p.setMode(type);
		p.setTotalResultSize(totalResultSize);
		if(ajaxFlag){
			p.setType("ajax");
		}
		return p.doAsyncStartTag();
	}
	public String getCurrentPageParamName() {
		return currentPageParamName;
	}

	public void setCurrentPageParamName(String currentPageParamName) {
		this.currentPageParamName = currentPageParamName;
	}

	public String getActionType() {
		return actionType;
	}

	public void setActionType(String actionType) {
		this.actionType = actionType;
	}

	public void setPage(Long page) {
		this.currentPage = page;
	}

	public Long getPage() {
		return this.currentPage;
	}

	/**
	 * 是否存在下一页
	 * 
	 * @return
	 */
	public boolean hasNext() {
		long totalPage = getTotalPages();
		return (totalPage > currentPage);
	}
	
	public boolean hasPrev() {
		return (currentPage>1);
	}

	public List<T> getAllItems() {
		return allItems;
	}

	public void setAllItems(List<T> allItems) {
		this.allItems = allItems;
	}

	/**
	 * 当前页的结束行 工list subList用
	 * 
	 * @return
	 */
	public int getCurrentRowNum() {
		Long num = 0L;
		if (this.currentPage == this.totalPageNum) {
			num = this.getTotalResultSize(); // 原来减1 ； subList(start,end)
												// 是不包含end ，比如0,2 截取的是0,1 ；
		} else {
			num = (this.getStartRows() - 1) + this.getPageSize();

			if (num >= allItems.size()) {
				num = allItems.size() - 1L;
			}
		}
		return num.intValue();
	}

	public List<RequestKV> getParams() {
		return params;
	}

	public String getRequestURI() {
		return requestURI;
	}
}
