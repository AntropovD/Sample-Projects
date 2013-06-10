////////////////////////files
var fso = new ActiveXObject("Scripting.FileSystemObject"); 
var fR = fso.OpenTextFile("c:\\mine\\vm\\prog_fact.txt", 1, true);	

///////////////////////variables
var S =  new Array();
var deb="";
var allText = fR.ReadAll();
var mas_com=allText.split('\n');
var labels = new Array();

////////////////////////////functions
function errUndef(t){
	if (typeof(S[parseInt(t)])=="undefined") {
			deb+="error "+parseInt(t)+" undefined\nEXIT!";
			WSH.echo(deb);
			WScript.Quit();
			}
	return ;
}

function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

function divZero(t){
	if (S[parseInt(t)]==0){
			deb+="error dividing by Zero!"+i+"string \n";
			WSH.echo(deb);
			WScript.Quit();
		}
		return ;
}
////////////////////////////flags
var eqFlag=false;
var moreFlag=false;
var lessFlag=false;
var nonEqFlag=false;

///////////////////////////Searching Labels
for (var i=0; i<mas_com.length; i++){
	var tmp=mas_com[i].split(' ');
	if (tmp[0]=="label"){
		labels[parseInt(tmp[1])]=i;
		deb+="Label "+ parseInt(tmp[1]) + " on "+parseInt(i)+"\n";
	}
}

/////////////////////////// parsing
var i=0;
while (i<mas_com.length)
{	
	var tmp=mas_com[i].split(' ');	
	
	if (tmp[0]=="abs"){
		S[parseInt(tmp[1])]=Math.abs(S[parseInt(tmp[1])]);
	}
	if (tmp[0]=="exit"){
		//WSH.echo("EXIT "+i);
		WScript.Quit();	
	} 
	
	if (tmp[0]=="print"){
		var st=" ";
		for (var j=1; j<tmp.length; j++)
			st+=(tmp[j]+" ");
		WSH.echo(st);
	}
	
	if (tmp[0]=="input"){
			WSH.echo("Enter variable number "+tmp[1]);
			var nmb=WSH.StdIn.ReadLine();			
			S[parseInt(tmp[1])]=parseInt(nmb);
			if (!isNumeric(nmb)) {
				WSH.echo("Error not a number");
				WScript.Quit();
			}
	}
	
	if (tmp[0]=="add"){
		deb+="Adding  variable " + parseInt(tmp[1])+" variable "+parseInt(tmp[2])+"\n";		
		errUndef(tmp[1]);		errUndef(tmp[2]);
		S[parseInt(tmp[1])]+=S[parseInt(tmp[2])];
	}
	
	if (tmp[0]=="sub"){
		deb+="Subbing  variable " + parseInt(tmp[1])+" variable "+parseInt(tmp[2])+"\n";
		errUndef(tmp[1]);		errUndef(tmp[2]);
		S[parseInt(tmp[1])]-=S[parseInt(tmp[2])];
	}
		
	if (tmp[0]=="mul"){
		deb+="Multiple variable " + parseInt(tmp[1])+" on variable "+parseInt(tmp[2])+"\n";		
		errUndef(tmp[1]);		errUndef(tmp[2]);
		S[parseInt(tmp[1])]*=S[parseInt(tmp[2])];	
	}
	/*
	if (tmp[0]=="div"){
		deb+="Dividing variable " + parseInt(tmp[1])+" on variable "+parseInt(tmp[2])+"\n";		
		errUndef(tmp[1]);		errUndef(tmp[2]);
		divZero(tmp[2]);
		S[parseInt(tmp[1])]/=S[parseInt(tmp[2])];	
	}
	
	if (tmp[0]=="mod"){
		deb+="Modding variable " + parseInt(tmp[1])+" on variable "+parseInt(tmp[2])+"\n";		
		errUndef(tmp[1]);		errUndef(tmp[2]);
		divZero(tmp[2]);
		S[parseInt(tmp[1])]%=S[parseInt(tmp[2])];	
	}
*/
	if (tmp[0]=="mov"){
		S[parseInt(tmp[1])]=parseInt(tmp[2]);	
	}	
	
	if (tmp[0]=="cmp"){
		if (S[parseInt(tmp[1])]>S[parseInt(tmp[2])]){	
			eqFlag=false;			moreFlag=true;			lessFlag=false;			nonEqFlag=true;} else
		if (S[parseInt(tmp[1])]<S[parseInt(tmp[2])]){	
			eqFlag=false;			moreFlag=false;			lessFlag=true;			nonEqFlag=true;} else
		if (S[parseInt(tmp[1])]==S[parseInt(tmp[2])]){
			eqFlag=true;			moreFlag=false;			lessFlag=false;			nonEqFlag=false;}	
	}
	
	if (tmp[0]=="je"){
		if (eqFlag)
			i=labels[parseInt(tmp[1])];	
	}
	
	if (tmp[0]=="jne"){
		if (nonEqFlag)
			i=labels[parseInt(tmp[1])];			
	}	
	
	if (tmp[0]=="jm"){
		if (moreFlag)
			i=labels[parseInt(tmp[1])];	
	}
	
	if (tmp[0]=="jl"){
		if (lessFlag)
			i=labels[parseInt(tmp[1])];	
	}
	
	if (tmp[0]=="jmp"){
			deb+="go to "+labels[parseInt(tmp[1])]+"\n";
			i=labels[parseInt(tmp[1])];
	}	
	
	if (tmp[0]=="output"){	
		//WSH.echo("Variable "+parseInt(tmp[1])+" equal "+S[parseInt(tmp[1])]);
		WSH.echo(S[parseInt(tmp[1])]);
		}
	i++;	
}

fR.Close();		

////////////////////////////debug
/*WSH.echo("\n\n\n############################");
WSH.echo(deb+"\n");
WSH.echo("More Flag "+moreFlag);
WSH.echo("Less Flag "+lessFlag);
WSH.echo("Eq Flag "+eqFlag);
WSH.echo("!Eq Flag "+nonEqFlag);

for (var i=0; i<20; i++)
{
	WSH.echo(i+" "+S[i]);
}
*/
