var fso = new ActiveXObject("Scripting.FileSystemObject");
var r = fso.OpenTextFile("in.txt", 1, true);
var f = fso.OpenTextFile("out.txt", 2, true);
/////////////////////////////////////////////

var hexValues=new Array("0000","0001","0010","0011","0100","0101","0110","0111",
			"1000","1001","1010","1011","1100","1101","1110","1111");

// 48  57   97  100
// 0   9    a    f

function hexToFloat(st){
	 st.toLowerCase();
	 var arr = new Array();
	 for (var i=0; i<32; i++)
		arr.push(0);

	 if (st.charAt(0)=="-") {
		arr[0]=1;
		st=st.substr(1, st.length-1);
	}
	if (st.charAt(0)=="+") {
		arr[0]=0;
		st=st.substr(1, st.length-1);
	}
	
	if (st.substr(0,2)!="0x") {
	 WSH.echo("Just  hex numbers");   
	 WScript.Quit(0);
	}
	if (st.substr(0,2)=="0x"){
 		st=st.substr(2,st.length-2);
	}

	
	var tmp="";
	for (var i=0; i<st.length; i++){
		if (st.charAt(i)=='.') tmp=tmp+'.';
		else if (49<=st.charCodeAt(i) && st.charCodeAt(i)<=57) tmp=tmp+""+hexValues[st.charCodeAt(i)-48];
		else if (97<=st.charCodeAt(i) && st.charCodeAt(i)<=102) tmp=tmp+""+hexValues[10+st.charCodeAt(i)-97];

	}
            
	while (tmp.charAt(0)=='0') tmp=tmp.substr(1,tmp.length-1);
	
	if (tmp.indexOf('.')==-1) tmp+=".";
	while (tmp.length<=24) tmp+='0';

	var exp=0;
               
	if (tmp.indexOf('.')==-1) exp=tmp.length-1;
		else {
			 if  (tmp.charAt(0)=='.') {
			 	for (var  j=1; j<tmp.length; j++)	
					if (tmp.charAt(j)=='0') exp--;
					else break;
				exp-=2;
			}
			else exp=tmp.indexOf('.')-1;			
		}
	
	
		
	WSH.echo(tmp);
	WSH.echo(exp);

	return arr;
}
                                       
var st=r.ReadLine();
hexToFloat(st);

var st=r.ReadLine();
hexToFloat(st);

var st=r.ReadLine();
hexToFloat(st);

var st=r.ReadLine();
hexToFloat(st);
