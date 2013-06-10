var fso = new ActiveXObject('Scripting.FileSystemObject')
var read = fso.OpenTextFile('out.txt', 1, true);
var keys= fso.OpenTextFile('keys.txt', 1, true);
var write= fso.OpenTextFile('res.txt', 2, true);
////////////////////

var keysArray=new Array();
/////////////////// —читываем ключи
while (!keys.atEndOfStream){
	var st=keys.ReadLine();
	keysArray[st.charAt(0)] = st.substr(2, st.length-2);	
}

var st=read.ReadLine();
var tmp="";
///////////////////// декодируем
for (var i=0; i<st.length; i++){
	tmp=tmp+""+st.charAt(i);
	//WSH.echo(tmp);
	for (j in keysArray){		
		if (keysArray[j]==tmp){
			write.Write(j);
			tmp="";
			break;
		}
	}
}


////////////////////////
read.close();
write.close();
keys.close();