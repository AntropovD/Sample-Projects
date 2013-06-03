import java.io.*;
import java.util.*;

public class Main {

   public static void main(String[] args) throws IOException
   {
      Scanner reader = new Scanner(new FileReader("in.txt")); // файл с классами и временем
      Scanner in = new Scanner(System.in);
      PrintWriter out = new PrintWriter(System.out);
      
      int kol=100000;
      
      long[] dates = new long[kol];
      String[] names = new String[kol];      
      for (int i=0; i<kol; ++i){
    	  names[i]=reader.next();
    	  dates[i]=reader.nextLong();
      }
  
      Searcher T = new Searcher();      
      T.refresh(names, dates);
      
      while (true){
    	  String tmp = in.nextLine();
    	  String[] ans = T.guess(tmp);    	  
    	  for (int i=0; i<ans.length; ++i){
    		  if (ans[i]!=null )
    			  out.print(ans[i]+" ");
    	  }
    	  out.println();
    	  out.flush();    	  
      }
   }
}