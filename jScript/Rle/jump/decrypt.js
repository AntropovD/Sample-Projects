//////////////files
var fso = new ActiveXObject("Scripting.FileSystemObject");
var r = fso.OpenTextFile("out.txt", 1, true, true);
var f = fso.OpenTextFile("res.txt", 2, true, true);

while (!r.AtEndOfStream){
	var st=r.ReadLine();
	var i=0;
	/////////////decrypting
	while (i<st.length){
		

		var x=st.charCodeAt(i);
		// f.Write(x+" ");
		// i++;
		
		//f.Write(x+" ");
		
		if (x<128){
			for (var j=0; j<x; j++)
				f.Write(st.charAt(i+1));
			i+=2;
			continue;
		}
		else {
			x=x-128;
			var t=i;
			for (var j=0; j<=x; j++){
				f.Write(st.charAt(t+j+1));
				i++;
			}					
			continue;
		}
	}
	f.WriteLine();
}
//////////////////closing files
f.Close();
r.Close();