
/**
 * 提供Js接口给各个业务系统调用
 */
$(function () {

    var log_query = {

        _pams: {
            target: null,
            prePage: 0,
            curPage: 1,
            nextPage: 2,
            pageSize: 10,
            totalNums: null,
            totalPages: null,
            skipPage: 15,
            url: '',
            queryPams: []
        },

        init: function (p) {

            //参数处理
            var _p = p;
            log_query._pams = $.extend(true, {},log_query._pams,_p);
            var check = log_query.check();
            if(!check){
                return;
            }

            //数据初始化
            log_query._pams.prePage = log_query._pams.curPage -1;
            log_query._pams.nextPage = log_query._pams.curPage + 1;
            //根据数据的条数，计算总的页数，向上取整
            log_query._pams.totalPages = Math.ceil(log_query._pams.totalNums / log_query._pams.pageSize);

            //加载Html
            log_query.loadPageHtml();

            //初始化点击事件
            log_query.loadPage();
        },

        check: function () {
            if(log_query._pams.target == null && typeof log_query._pams.target != 'object'){
                console.error("_pams.target must be a object");
                return false;
            }
            if(log_query._pams.curPage < 1){
                console.error("_pams.curPage can not less than 1");
                return false;
            }
            if(log_query._pams.pageSize < 0){
                console.error("_pams.pageSize can not less than 0");
                return false;
            }
            if(log_query._pams.totalNums < 0){
                console.error("_pams.totalNums can not less than 0");
                return false;
            }
            return true;
        },

        loadPageHtml: function () {

            var pagesItemArr = [];
            //上一页
            pagesItemArr.push('<a href="#" page="'+log_query._pams.prePage+'" title="上一页" class="PrevPage" >上一页</a>');
            //到第一页
            if(log_query._pams.curPage != 1){
                pagesItemArr.push('<a href="#" page="1" title="到第一页" class="PageLink" >1</a>')
            }
            //点点点
            if (log_query._pams.curPage >= 4) {
                pagesItemArr.push('<span class="PageMore">...</span>');
            }
            var endPage2;
            if (log_query._pams.totalPages > log_query._pams.curPage + 4) {
                endPage2 = log_query._pams.curPage + 5;
            } else {
                endPage2 = log_query._pams.totalPages;
            }
            for (var i = log_query._pams.curPage - 5; i <= endPage2; i++) {
                if (i > 0) {
                    if (i == log_query._pams.curPage) {
                        pagesItemArr.push('<span class="PageSel">'+i+'</span>');
                    } else {
                        if ((i != 1) && (i != log_query._pams.totalPages)) {
                            pagesItemArr.push('<a href="#" page="'+i+'" class="PageLink" title="第'+i+'页">'+i+'</a>');
                        }
                    }
                }
            }
            if ((log_query._pams.curPage + 3) < log_query._pams.totalPages) {
                pagesItemArr.push('<span class="PageMore">...</span>');
            }
            if (log_query._pams.curPage != log_query._pams.totalPages) {
                pagesItemArr.push('<a href="#" page="'+log_query._pams.totalPages+'" class="PageLink" title= "第'+log_query._pams.totalPages+'页">'+log_query._pams.totalPages+'</a>');
            }
            pagesItemArr.push('<a href="#" page="'+log_query._pams.nextPage+'" title="下一页" class="NextPage" >下一页</a>');
            if(log_query._pams.skipPage < log_query._pams.totalPages){
                pagesItemArr.push('<input name="GO" type="text" maxlength="10" style="width:30px;" placeholder="页码">');
                pagesItemArr.push('<a href="#" page="GO" class="PageLink" >GO</a>');
            }
            pagesItemArr.push('<br/>');
            log_query._pams.target.empty();
            log_query._pams.target.append(pagesItemArr.join(' '));
        },

        loadPage: function () {
            log_query._pams.target.find('a').each(function () {
                $(this).bind('click', function () {
                    var page = $(this).attr('page');
                    var skipPage = log_query._pams.target.find('input[name="GO"]').val();
                    if(page == 'GO'){
                        page = skipPage;
                    }
                    log_query._goPage(page);
                });
            });
        },

        _goPage: function (page) {
            if(page > 0 && page <= log_query._pams.totalPages){
                var formArr = [];
                formArr.push('<form action="'+log_query._pams.url+'" method="get" name="pageForm" style="display:none;">');
                formArr.push('<input name="curPage" type="hidden" value="'+page+'" >');
                var len = log_query._pams.queryPams.length;
                for(var i=0;i<len;i++){
                    var name = log_query._pams.queryPams[i].name;
                    var value = log_query._pams.queryPams[i].value;
                    if(typeof name == 'string' && name.length > 0 && value && value != ""){
                        formArr.push('<input name="'+name+'" type="hidden" value="'+value+'" >');
                    }
                }
                formArr.push('<input name="pageSize" type="hidden" value="'+log_query._pams.pageSize+'" >');
                formArr.push('</form>');
                log_query._pams.target.append(formArr.join(''));
                $('form[name="pageForm"]').submit();
            }
        }
    }

    $.lvmm_log = log_query;

});