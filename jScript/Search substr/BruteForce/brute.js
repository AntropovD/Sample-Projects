	var fso = new ActiveXObject("Scripting.FileSystemObject");
	
	var time = fso.OpenTextFile("time.txt", 2,true);
	var zzz=0;  ///// index testov
	while (zzz<10)
	{
		var now = new Date();
		WSH.echo("./test/test"+zzz+".txt");
		var r = fso.OpenTextFile("./test/test"+zzz+".txt", 1, true);
		var ans = fso.OpenTextFile("./ans/ans"+zzz+".txt", 2, true);
		
		var st=r.ReadLine();
		var st2=r.ReadAll();															 
		
		for (var i=0; i<st2.length-st.length; i++){	
			var k=0;
			for  (var j=0; j<st.length; j++){
				if (st.charAt(j)==st2.charAt(i+j))
					k++;
				else
					break;
			}						
			if (k==st.length) ans.Write(i+" ");
			//WSH.echo(k);
		}
		
		r.close();
		ans.close();

		var after = new Date();
		time.WriteLine(after-now);
		zzz++;
}

time.close();