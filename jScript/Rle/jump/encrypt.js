//////////////files
var fso = new ActiveXObject("Scripting.FileSystemObject");
var r = fso.OpenTextFile("in.txt", 1, true);
var f = fso.OpenTextFile("out.txt", 2, true, true);


while (!r.AtEndOfStream){
/////////////encrypting
	var st = r.ReadLine();
	//f.Write(st);
	var i=0;
	while (i<st.length){
		var temp=0;
		for (var j=i; j<st.length; j++)
			if (st.charAt(i)==st.charAt(j))	temp++;
			else break;
		if (temp>1){			
			//WSH.echo(temp);
			var x=temp;
			while (x>127){
				f.Write(String.fromCharCode(127)+st.charAt(i));
				x-=127;
			}
			f.Write(String.fromCharCode(x)+st.charAt(i));
			i+=temp; 
			continue;
		}
		
		var temp2=1;
		for (var j=i+1; j<st.length; j++)
			if (st.charAt(j)!=st.charAt(j-1)) temp2++;
			else break;
		
		//WSH.echo(temp2);
		var y=temp2;
		while (y>127){
			f.Write(String.fromCharCode(255));
			for (var j=i; j<i+127; j++)
				f.Write(st.charAt(j));
			y-=127;
		}
		f.Write(String.fromCharCode(y+128));
		for (var j=i; j<i+y; j++)
			f.Write(st.charAt(j));
		i+=temp2;
	}
	f.WriteLine();	
}
//////////////////closing files
f.Close();
r.Close();