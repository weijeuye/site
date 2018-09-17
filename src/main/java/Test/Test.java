package Test;

import java.util.concurrent.locks.Lock;
import java.util.concurrent.locks.ReentrantLock;

/**
 * @Author weilei
 * @date 2018/8/27 10:22
 */

public class Test {
    Lock lock = new ReentrantLock();
public  int inc = 0;
        //synchronized

        public void increase() {
            lock.lock();
            try {

            }catch (Exception e){

            }finally {
                lock.unlock();
            }
        inc++;
        }

        public static void main(String[] args) {
            Long startTime=System.currentTimeMillis();
        final Test test = new Test();
        for(int i=0;i<10;i++){
        new Thread(){
        public void run() {
        for(int j=0;j<1000;j++)

        test.increase();
        };
        }.start();
        }

        while(Thread.activeCount()>1)//保证前面的线程都执行完
           // Thread.yield();
            System.out.println(test.inc);
            Long endTime=System.currentTimeMillis();
            System.out.println(endTime-startTime);
        }
}