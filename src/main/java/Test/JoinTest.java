package Test;

import javax.jms.Session;

/**
 * @Author weilei
 * @date 2018/8/24 15:50
 */

public class JoinTest implements Runnable{

    public static int a = 0;

    public void run() {
        for (int k = 0; k < 10000; k++) {
            a = a + 1;
            System.out.println(Thread.currentThread().getName());
        }
    }

    public static void main(String[] args) throws Exception {
        Runnable r1 = new JoinTest();
        Thread t1 = new Thread(r1);
        t1.start();
        //t1.join();
        Thread t2=new Thread(r1);
        t2.start();

        System.out.println(a);
    }
}