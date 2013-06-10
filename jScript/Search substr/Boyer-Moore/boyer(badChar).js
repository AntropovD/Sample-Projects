var fso = new ActiveXObject('Scripting.FileSystemObject');
var r = fso.OpenTextFile("in.txt", 1, true);

var st = r.ReadLine();
var st2 = r.ReadAll();

r.Close();

var m=st.length;
var badChar = new Array();

for(j=0;j<m;j++) //////////предподсчет над шаблоном
	badChar[st.charAt(j)]=j+1;	
//for(j in badChar)
//	WScript.Echo("badChar[",j,"]=",badChar[j]);

var index=0;
var answer=new Array();

while (index<=st2.length-st.length){////////////сам поиск
	var pos=st.length-1;
	var flag=false;
	while (st.charAt(pos) == st2.charAt(pos+index) && !flag){
		if (pos==0){
			answer.push(index);
			flag=true;
		}
		pos--;
	}
	
	//Bad char euristic
	if(badChar[st2.charAt(pos+index)]==undefined)
		index+=(m-pos);
	else
		index+=Math.max(m-badChar[st2.charAt(pos+index)]-pos, 1);	
	//WSH.echo("1st "+st.charAt(pos)+" "+st2.charAt(pos+index)+" "+index);

}

if (answer.length==0)
	WSH.echo("Not found");
else 
	WSH.echo("Mathces: "+answer.length+"\n"+answer.join(' '));