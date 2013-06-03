
public class Searcher {

	public final int maxLen = 32;
	public final int base = 31;
	public long[] pow;
	public long[][] hash;
	
	public int len;
	public String[] names;
	public long[] dates;
	
	//Решение с помощью хешей
	// В конструкторе храним степени основания base до maxlen
	public Searcher() {
		pow = new long[maxLen];
		pow[0]=1;
		for (int i=1; i<maxLen; ++i){
			pow[i]=pow[i-1]*base;
		}
	}
	/*
	 *  В классе хранится массив хешей всех имен классов.
	 *  Также хранятся все имена классов и время последнего использования.
	 *  Занимает довольно много места =(
	 */
	public void refresh(String[] classNames, long[] modificationDates){
		len = classNames.length;
		hash = new long[len][];
		
		names = new String[len];
		dates = new long[len];
		
		for (int i=0; i<len; ++i){
			names[i]=classNames[i];
			dates[i]=modificationDates[i];
			int tmp = names[i].length();
			hash[i] = new long[tmp];
			for (int j=0; j<tmp; ++j){
				hash[i][j] = (int)names[i].charAt(j) * pow[j];
				if (j > 0)
					hash[i][j]+=hash[i][j-1];
			}
		}		
	}	
	
	public String[] guess(String start)	{
		String[] ret = new String[12];
		long[] time = new long[12];
		
		int n = start.length();	
		//Вычисляем хеш от start
		long startHash = 0;	
		for (int i=0; i<n; ++i)
			startHash += (int)start.charAt(i) * pow[i];
		
		
		for (int i=0; i<len; ++i){
			
			if (n==0 || (hash[i].length >=n && hash[i][n-1]==startHash)){
				if (start.compareTo(names[i].substring(0, n))!=0)  //дополнительная проверка на случай коллизий
					continue;
				for (int j=0; j<12; ++j){
					if (ret[j]==null){ 
						ret[j]=names[i];
						time[j]=dates[i];
						break;
					}
					
					if (time[j]<=dates[i]){		
						int j2=j;
						//в случае совпадение времени ищем позицию с которой не упорядочены лексикографически
						while (j2<11 && ret[j2]!=null && ret[j2].compareTo(names[i])<0 && time[j2]==dates[i]){
							j2++;
						}
						
						for (int z=11; z>j2; --z){
							ret[z]=ret[z-1];
							time[z]=time[z-1];
						}				
						ret[j2]=names[i];
						time[j2]=dates[i];
						
						break;
					}
				}
			}				
		}		
		/*
		for (int i=0; i<ret.length; ++i){
  		  System.out.println(ret[i]+"-"+time[i]+"   ");
		}
		System.out.println();
		System.out.flush();
		*/  
		return ret;		
	}
}