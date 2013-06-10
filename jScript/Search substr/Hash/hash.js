function power(n){
	return 1<<n;
}

	var fso = new ActiveXObject("Scripting.FileSystemObject");
	var time = fso.OpenTextFile("time.txt", 2,true);
	
	var zzz=0;

	while (zzz<10)
	{		
		var now = new Date();
		WSH.echo("./test/test"+zzz+".txt");
		var r = fso.OpenTextFile("./test/test"+zzz+".txt", 1, true);
		var ans = fso.OpenTextFile("./ans/ans"+zzz+".txt", 2, true);
		
		var st=r.ReadLine();
		var st2=r.ReadAll();	
	
		// hash_S - хеш всей строки S
		var hash_S=0;
		for (var i=0; i<st.length; i++)
			hash_S += (st.charCodeAt(i) * power(i) );
		
		//WSH.echo(hash_S);
		// hash всех префиксов текста T
		var hash = new Array();

		for (var i=0; i<st2.length; i++){
			hash[i] = st2.charCodeAt(i)*power(i);
			if (i>0) hash[i] += hash[i-1];
		}

		// Перебираем все подстроки s в тексте T							
		for (var i=0; i+st.length-1 < st2.length; i++){
			var curHash = hash[i+st.length-1];
			if (i>0) curHash-=hash[i-1]; 
     			if (curHash == hash_S * power(i)){
				var flag=true;
				for (var j=0; j<st.length; j++)
					if (st.charAt(j)!=st2.charAt(i+j)) {
						flag=false;
						break;
					}				 	
				if (flag) ans.Write(i+" ");
			}
		}			

		var after = new Date();
		ans.WriteLine("\nTime: "+(after-now));
		//ans.WriteLine("Matches: "+sum);
		time.WriteLine(after-now);
				
		r.close();
		ans.close();
		zzz++;
}

time.close();
