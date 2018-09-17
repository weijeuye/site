package com.weason.library.service.impl;

import com.weason.library.dao.ReaderDao;
import com.weason.library.po.ReaderInfo;
import com.weason.library.service.ReaderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
@Component("readerServiceRemote")
public class ReaderServiceImpl implements ReaderService {

    @Autowired
    public ReaderDao readerDao;



    @Override
    public ArrayList<ReaderInfo> queryReaders() {
        ArrayList<ReaderInfo> readerInfoArrayList=readerDao.queryReaders();
        return readerInfoArrayList;
    }

    @Override
    public Integer addReader(ReaderInfo readerInfo) {
        return null;
    }

    @Override
    public Integer updateReader(ReaderInfo readerInfo) {
        return null;
    }

    @Override
    public Integer deleteReader(ReaderInfo readerInfo) {
        return null;
    }
}
