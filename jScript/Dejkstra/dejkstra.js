var fso = new ActiveXObject("Scripting.FileSystemObject");
var r = fso.OpenTextFile("in.txt", 1, true);
st=r.ReadLine();
r.Close();

function ERROR(){
	WSH.echo("Wrong expression");
	WScript.Quit(0);
}

 function getPrior(s){
	switch (s){
		case "(":
			return 0;
		case ")":
			return 1;
		case "+":
			return 2;
		case "-":
			return 3;
		case "*":
		case "/":
			return 4;
		case "~": // ÓÍÀĞÍÛÉ ÌÈÍÓÑ!!!!!!!!!!!!!!!
			return 5;
		default:
			return -1;
	}
}
function isOper(s){
	if (getPrior(s)>1) return true;
	else return false;
}

function reversePolishNotation(st){
	var res="";
	var tmp="";
	var stack=new Array();
	
	var flag=true;        ////// ÍÀ×ÀËÎ ÑÒĞÎÊÈ ÈËÈ (
	
	for (var i=0; i<st.length; i++){
		//WSH.echo(st.charAt(i)+" ### "+res+" $$$ "+stack.join(""));
		if (st.charAt(i)==" "){
			res+=" ";
			continue;
		}
			
		if ("0"<= st.charAt(i) && st.charAt(i)<="9"){
			res+=st.charAt(i);	
			flag=false;
			continue;
		}
			
		if (st.charAt(i)=="("){ 
			stack.push("(");
			flag=true;
			continue;
		}
			
		if (st.charAt(i)==")"){
			flag=false;
			while(stack[stack.length-1]!="("){				
			//	WSH.echo("a "+stack.length);
			//	WSH.echo(res);
				if (stack.length<=0) ERROR();				
				res+=" "+stack[stack.length-1]+" ";
				stack.pop();
			}
			stack.pop();
			continue;
		}
		
		if (isOper(st.charAt(i))){
			res+=" ";
			while (stack.length!=0 && isOper(stack[stack.length-1]) && getPrior(stack[stack.length-1])>=getPrior(st.charAt(i))){				
				res+=" "+stack[stack.length-1]+" ";
				stack.pop();
			//	WSH.echo("b "+stack.length);
			}
			if (st.charAt(i)=="-" && flag)
				stack.push("~");
			else stack.push(st.charAt(i));
			continue;
		}		
		ERROR();
	}
	
	while (stack.length>0){
		if (stack[stack.length-1]=="(" || stack[stack.length-1]==")")
			ERROR();
		res+=" "+stack[stack.length-1]+" ";
		stack.pop();
		//WSH.echo("c "+stack.length);
	}		
	return res;
}


function calc(st){
	var mas=reversePolishNotation(st).split(' ');
	
	var tmp=new Array();
	for (var i=0; i<mas.length; i++){
		if (mas[i]=="") continue; else
		if (!isOper(mas[i])) tmp.push(mas[i]);
		else {			
			if (mas[i]=="~"){
				if (tmp.length<1) ERROR();
				var x=tmp.pop();
				tmp.push(-x);
			}
			else {
				if (tmp.length<2) ERROR();
				var x=tmp.pop();
				var y=tmp.pop();								
				if (mas[i]=="+") tmp.push(Number(x)+Number(y));
				if (mas[i]=="-") tmp.push(y-x);				
				if (mas[i]=="*") tmp.push(y*x);
				if (mas[i]=="/") {
					tmp.push(y/x);
					if (x==0) ERROR();
					}
			}			
		}		
		//WSH.echo(tmp.join("#"));
	}	
	
	if (tmp.length!=1) ERROR();
	 
	WSH.echo("Expression :"+st);
	WSH.echo("Back Polish:"+mas.join(' '));
	WSH.echo("Result :"+tmp[tmp.length-1]);
	
}
//WSH.echo(reversePolishNotation(st));
calc(st);

