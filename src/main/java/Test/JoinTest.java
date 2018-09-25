package Test;

import javax.jms.Session;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

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

   /* public static void main(String[] args) throws Exception {
        Runnable r1 = new JoinTest();
        Thread t1 = new Thread(r1);
        t1.start();
        //t1.join();
        Thread t2=new Thread(r1);
        t2.start();

        System.out.println(a);
    }*/

    public static void main(String[] args){
        String str = "<p>如遇政府征用、旺季房满等情况，将安排其他参考酒店，黄山市酒店住宿不比大中型城市，住宿条件有限 &nbsp;，客人可在出游前提出加钱升级酒店。望请谅解。</p>";
        Matcher matcher = Pattern.compile("<([^<>]*)>").matcher(str);
        if(matcher.find()){
            String g = matcher.group(1);
            str = str.replace(g, "");
        }
        System.out.println(str);
    }
}