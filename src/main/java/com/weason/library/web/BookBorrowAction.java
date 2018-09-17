package com.weason.library.web;

import com.weason.library.po.Book;
import com.weason.library.po.BookBorrow;
import com.weason.library.po.BookType;
import com.weason.library.po.BookUser;
import com.weason.library.service.BookBorrowService;
import com.weason.library.service.BookService;
import com.weason.library.service.BookUserService;
import com.weason.library.vo.BookBorrowVo;
import com.weason.library.vo.ZTreeNode;
import com.weason.util.GsonUtils;
import com.weason.util.HttpUtils;
import com.weason.util.Page;
import com.weason.util.ResultMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.stereotype.Repository;
import org.springframework.ui.Model;
import org.springframework.util.CollectionUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.*;

/**
 * @Author weilei
 * @date 2018/7/19 10:06
 */
@Controller
@RequestMapping("/bookBorrow")
public class BookBorrowAction extends BaseAction{
    @Autowired
    private BookBorrowService bookBorrowService;
    @Autowired
    private BookService bookService;
    @Autowired
    private BookUserService bookUserService;
    @RequestMapping("/findBookBorrows")
    public  String findBookBorrows(Model model, Integer page, HttpServletRequest request, HttpServletResponse response, BookBorrowVo queryParam){

        Map<String,Object> parameters=new HashMap<String,Object>();
        if(queryParam!=null ){
            parameters.put("userAccount",queryParam.getUserAccount());
            parameters.put("userName",queryParam.getUserName());
            parameters.put("bookName",queryParam.getBookName());
            parameters.put("borrowTime",queryParam.getBorrowTime());
            parameters.put("returnTime",queryParam.getReturnTime());
            parameters.put("isbn",queryParam.getIsbn());
            parameters.put("isReturn",queryParam.getIsReturn());
        }
        model.addAttribute("queryParam",queryParam);
        int count =bookBorrowService.findBookBorrowCountByParam(parameters);
        // 分页
        int pagenum = page == null ? 1 : page;
        Page pageParam = Page.page(count, 10, pagenum);
        pageParam.buildUrl(request);
        parameters.put("_start", pageParam.getStartRows());
        parameters.put("_end", pageParam.getEndRows());

        List<BookBorrowVo> bookBorrowVoArrayList= bookBorrowService.findBookBorrowListByParam(parameters);
        pageParam.setParam(bookBorrowVoArrayList);
        model.addAttribute("page",pagenum);
        model.addAttribute("pageParam",pageParam);
        model.addAttribute("bookBorrows",bookBorrowVoArrayList);
        String basePath = HttpUtils.getBasePath(request);
        model.addAttribute("basePath",basePath);
        return "/pages/library/bookBorrow/findBookBorrowList";
    }

    @RequestMapping("/returnBook")
    @ResponseBody
    public Object returnBook(HttpServletRequest request,HttpServletResponse response,Long bookBorrowId){
        if(bookBorrowId ==null){
           return ResultMessage.PARAM_EXCEPTION_RESULT;
        }
        Map<String,Object> param=new HashMap<String,Object>();
        param.put("borrowId",bookBorrowId);
        param.put("isReturn","Y");
        param.put("actReturnTime",new Date());
        try {
            Integer count=bookBorrowService.updateBookBorrow(param);
            if(count > 0){
                param.clear();
                param.put("borrowId",bookBorrowId);
                BookBorrow bookBorrow =  bookBorrowService.findBookBorrowParam(param);
                if(bookBorrow!=null && Long.toString(bookBorrow.getBookId())!=null){
                    param.clear();
                    param.put("bookId",bookBorrow.getBookId());
                    Book book=bookService.findBookByParam(param);
                    param.put("bookId",bookBorrow.getBookId());

                    if(book !=null ){
                        Integer leftNum=book.getBookLeftNum()==null?0:book.getBookLeftNum();
                        param.put("bookLeftNum",leftNum+1);
                        param.put("bookState","Y");
                       Integer c= bookService.updateBookById(param);
                    }
                }
            }
        }catch (Exception e){
            return ResultMessage.UPDATE_FAIL_RESULT;
        }
        return ResultMessage.UPDATE_SUCCESS_RESULT;
    }

    @RequestMapping(value = "/showBorrowBook")
    public String showBorrowBook(Model model,Long userId,HttpServletRequest request) throws Exception {
        if(userId!=null){
            Map<String,Object> param=new HashMap<String, Object>();
            param.put("userId",userId);
            BookUser user=bookUserService.findBookUser(param);
            model.addAttribute("user",user);
            BookBorrow bookBorrow=new BookBorrow();
            bookBorrow.setBorrowTime(new Date());
            model.addAttribute("bookBorrow",bookBorrow);
        }
        String basePath = HttpUtils.getBasePath(request);
        model.addAttribute("basePath",basePath);
        return "/pages/library/bookBorrow/showBorrowBook";
    }

    @RequestMapping("/borrowBook")
    @ResponseBody
    public Object borrowBook(HttpServletRequest request,HttpServletResponse response,BookBorrow bookBorrow){
        if(bookBorrow ==null || Long.toString(bookBorrow.getBookId()) ==null ||Long.toString(bookBorrow.getUserId()) ==null){
            return ResultMessage.PARAM_EXCEPTION_RESULT;
        }
        Map<String,Object> param=new HashMap<String,Object>();
        //先检验 该学员是否借过本书
        param.put("bookId",bookBorrow.getBookId());
        param.put("userId",bookBorrow.getUserId());
        param.put("isReturn","N");

        BookBorrow isBookBorrow=bookBorrowService.findBookBorrowParam(param);
        if(isBookBorrow!=null){
            return ResultMessage.BORROW_EXCEPTION_RESULT;
        }
        param.clear();
        param.put("bookId",bookBorrow.getBookId());
        bookBorrow.setIsReturn("N");
        try {
            Book book=bookService.findBookByParam(param);
            if(book!=null && book.getBookLeftNum() > 0){
                Integer count=bookBorrowService.addBookBorrow(bookBorrow);
                if(count > 0){
                    Integer leftNum=book.getBookLeftNum()==null?0:book.getBookLeftNum();
                    Integer currentLeftNum=leftNum-1;
                    if(currentLeftNum == 0){
                        param.put("bookState","N");
                    }
                    param.put("bookLeftNum",currentLeftNum);
                    Integer c= bookService.updateBookById(param);
                }else {
                    return ResultMessage.UPDATE_FAIL_RESULT;
                }
            }
        }catch (Exception e){
            return ResultMessage.UPDATE_FAIL_RESULT;
        }
        return ResultMessage.UPDATE_SUCCESS_RESULT;
    }
    @RequestMapping(value = "/showBorrowBookAgain")
    public String showBorrowBookAgain(Model model,Long userId,Long bookId,String isbn,Long borrowId,HttpServletRequest request) throws Exception {
        if(bookId!=null || (userId!=null && isbn !=null) || borrowId!=null){
            Map<String,Object> param=new HashMap<String, Object>();
            param.put("userId",userId);
            BookUser user=bookUserService.findBookUser(param);
            param.clear();
            param.put("bookId",bookId);
            param.put("isbn",isbn);
            Book book=bookService.findBookByParam(param);
            param.clear();
            param.put("borrowId",borrowId);
            BookBorrow bookBorrow=bookBorrowService.findBookBorrowParam(param);
            model.addAttribute("bookBorrow",bookBorrow);
            model.addAttribute("book",book);
            model.addAttribute("user",user);
        }
        String basePath = HttpUtils.getBasePath(request);
        model.addAttribute("basePath",basePath);
        return "/pages/library/bookBorrow/showBorrowBookAgain";
    }

    /**
     * 续借
     * @param request
     * @param response
     * @param bookBorrow
     * @return
     */
    @RequestMapping("/borrowBookAgain")
    @ResponseBody
    public Object borrowBookAgain(HttpServletRequest request,HttpServletResponse response,BookBorrow bookBorrow){
        if(bookBorrow ==null || Long.toString(bookBorrow.getBorrowId()) ==null || bookBorrow.getReturnTime()==null){
            return ResultMessage.PARAM_EXCEPTION_RESULT;
        }
        Map<String,Object> param=new HashMap<String,Object>();
        param.put("borrowId",bookBorrow.getBorrowId());
        param.put("returnTime",bookBorrow.getReturnTime());
        try {
            Integer count= bookBorrowService.updateBookBorrow(param);
            if(count > 0){
                return ResultMessage.UPDATE_SUCCESS_RESULT;
            }
        }catch (Exception e){
            return ResultMessage.UPDATE_FAIL_RESULT;
        }
        return ResultMessage.UPDATE_SUCCESS_RESULT;
    }
}
