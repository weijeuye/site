package com.weason.library.service;



import com.weason.library.po.ReaderInfo;

import java.util.ArrayList;

public interface ReaderService {
    public ArrayList<ReaderInfo> queryReaders();
    public Integer addReader(ReaderInfo readerInfo);
    public Integer updateReader(ReaderInfo readerInfo);
    public Integer deleteReader(ReaderInfo readerInfo);
}
