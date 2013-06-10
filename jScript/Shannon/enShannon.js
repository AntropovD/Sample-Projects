//////////////files
var fso = new ActiveXObject("Scripting.FileSystemObject");
var r = fso.OpenTextFile("in.txt", 1, true);
var f = fso.OpenTextFile("out.txt", 2, true);

var st = r.ReadLine();
var alph=new Array();
for (var i=0; i<st.length; i++){
	alph[st.charAt(i)]=0;
}

for (var i=0; i<st.length; i++){
	alph[st.charAt(i)]++;
}
f.Write("Alphabet:");
var len=0;
for (var key in alph){
	f.Write(key+" ");
	len++;
}

f.WriteLine();
for (var key in alph){
	f.WriteLine(key+"  "+alph[key]/st.length);
}

if (len==1){
	f.WriteLine(0);
	WScript.Quit();
}

var ans=0;
for (var key in alph)
{
	var tmp=alph[key]/st.length;
	//f.WriteLine(tmp);
	ans+=tmp*Math.log(tmp)/Math.log(len);
}
f.Write(parseFloat(-ans));



f.Close();
r.Close()
