package com.weason.library.dao;

import com.weason.library.po.ReaderInfo;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
@Repository
public interface ReaderDao {

    public ArrayList<ReaderInfo> queryReaders();
    public Integer addReader(ReaderInfo readerInfo);
    public Integer updateReader(ReaderInfo readerInfo);
    public Integer deleteReader(ReaderInfo readerInfo);
}
