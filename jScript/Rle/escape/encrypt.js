//////////////files
var fso = new ActiveXObject("Scripting.FileSystemObject");
var r = fso.OpenTextFile("in.txt", 1, true);
var f = fso.OpenTextFile("out.txt", 2, true, true);

var st="";
while (!r.AtEndOfStream){
/////////////encrypting
	st = r.ReadLine();
	var i=0;
	while (i<st.length){
		var temp=0;
		for (var j=i; j<st.length; j++)
			if (st.charAt(i)==st.charAt(j))	temp++;
			else break;
		///////
		if (st.charAt(i)=="#"){	
			var x=temp;
			while (x>255){
				f.Write("#"+String.fromCharCode(255)+"#");
				x-=255;
			}
			f.Write("#"+String.fromCharCode(x)+"#");
			i+=temp; continue;
		}
		if (temp>3){
			var x=temp;
			while (x>258){
				f.Write("#"+String.fromCharCode(255)+st.charAt(i));
				x-=258;
			}
			if (x>3)
				f.Write("#"+String.fromCharCode(x-3)+st.charAt(i));
			else 
				for (var j=0; j<x; j++) f.Write(st.charAt(i));
			i+=temp; 
			continue;
			}
		f.Write(st.charAt(i));
		i++;
	}
	f.WriteLine();	
}
//////////////////closing files
f.Close();
r.Close();