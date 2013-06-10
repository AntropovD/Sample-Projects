var fso = new ActiveXObject('Scripting.FileSystemObject');
var r = fso.OpenTextFile("in.txt", 1, true);

var t = r.ReadLine();
var st2 = r.ReadAll();

r.Close();

		var now = new Date();
var m=t.length;
var alph=new Array();
//Определяем алфавит строки t

for(var i=0;i<m;i++)
	alph[t.charAt(i)]=0;
//В двумерном массиве del будем хранить таблицу переходов
var del=new Array(m+1);

for(var j=0;j<=m;j++)
	del[j]=new Array();
//Инициализируем таблицу переходов
for(var i in alph)
	del[0][i]=0;
//Форомируем таблицу переходов

for(var j=0;j<m;j++){
	var prev=del[j][t.charAt(j)];
	del[j][t.charAt(j)]=j+1;
	for(i in alph)
		del[j+1][i]=del[prev][i];
}

                                   
// Поиск в st2 состояния |t|

var curSost=0;
for (var i=0; i<st2.length; i++)
	if (typeof(del[curSost][st2.charAt(i)])!="undefined"){
		curSost=del[curSost][st2.charAt(i)];
		if (curSost == t.length )
			WSH.echo(i-t.length+" ");
	}	

	
	
		var after = new Date();
		WSH.echo(after-now);