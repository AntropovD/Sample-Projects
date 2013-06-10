//////////////files
var fso = new ActiveXObject("Scripting.FileSystemObject");
var r = fso.OpenTextFile("out.txt", 1, true, true);
var f = fso.OpenTextFile("res.txt", 2, true, true);
var flag=false;
while (!r.AtEndOfStream){
	var st=r.ReadLine();
	var i=0;
	/////////////decrypting
	while (i<st.length){
		if (st.charAt(i)!="#"){ ///////////////1 symbol
			f.Write(st.charAt(i));
			i++;
			continue;	
		}
		
		if (st.charAt(i+2)=="#"){/////////////////#X#
			for (var j=0; j<st.charCodeAt(i+1); j++){
				f.Write(st.charAt(i+2));
				}
			i+=3;
			continue;
		}
		/////////////////////////////#XY
		if (flag){
			if (st.charAt(i+1)!=255){
			for (var j=0; j<st.charCodeAt(i)+3; j++)
				f.Write(st.charAt(i+2));
			flag=false;
			}
			else {
				for (var j=0; j<258; j++)
					f.Write(st.charAt(i+2));
				flag=true;			
			}
		}
		else {
			for (var j=0; j<st.charCodeAt(i+1)+3; j++)
				f.Write(st.charAt(i+2));
			if (st.charAt(i+1)==255) flag=true;
		}
		i+=3;
		continue;
	}
	f.WriteLine();
}
//////////////////closing files
f.Close();
r.Close();