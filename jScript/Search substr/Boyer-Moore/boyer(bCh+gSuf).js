var fso = new ActiveXObject('Scripting.FileSystemObject');
var r = fso.OpenTextFile("in.txt", 1, true);

var st = r.ReadLine();
var st2 = r.ReadAll();

r.Close();

var m=st.length;
var badChar = new Array();

for(j=0;j<m;j++) //////////предподсчет на шаблоном №1
	badChar[st.charAt(j)]=j+1;	
//for(j in badChar)
//	WScript.Echo("badChar[",j,"]=",badChar[j]);


////////////////////// предподчсет хорошего суффикса

function isEqual(st, a,b,c){
	var _st=st;
	for (var i=0; i<m; i++)
		_st='*'+_st;
	WSH.echo(_st);
	var a = k;
	var b = k+L-1;
	var c = m-L+1;
	var d = m;
	
	for (var i=a; i<=b; i++)
		for (var j=c; j<=d; j++)
			if (_st.charAt(i)!=st.charAt(j))
				return false;
				
	return true;
}

var st="abcdabc";
var m=st.length;

var rpr = new Array();
for (var L=0; L<st.length; L++){
	var k=m-L;
	while (k>-m){
		var flag=isEqual(st, k, L, m);
		if ((st.charAt(k-1)!=st.charAt(m-L) || k-1<0) && k>1 && flag) break;
		if ((st.charAt(k-1)==st.charAt(m-L) || k-1<0) && k<=1 && flag) break;
		k--;
		WSH.echo(L+" "+k+" "+flag);		
	}
	rpr[L]=k;
}
WSH.echo(rpr.join(' '));
WScript.Quit(0);

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
		index+=Math.max(m-badChar[st2.charAt(pos+index)]-pos, 1);	// Possible -values
	//WSH.echo("1st "+st.charAt(pos)+" "+st2.charAt(pos+index)+" "+index);

}

if (answer.length==0)
	WSH.echo("Not found");
else 
	WSH.echo("Mathces: "+answer.length+"\n"+answer.join(' '));

/**
function badChar(st){   
 var N=new Array()
 for(j=0;j<st.length;j++)
	N[st.charAt(j)]=st.length-j+1;
 return N;               
}

function goodSuffix(st){		
	var res=new Array();
	for (var i=0; i<=st.length; i++)
		res[i]=0;	
	var m=st.length;
	var f=new Array();
	var j=m+1;
	f[m]=m+1; 
	
	for (i=m; i>0; i--){
		while (j<=m && st.charAt(i-1)!=st.charAt(j-1)){
			if (res[j]==0) 
				res[j]=j-1;
			j=f[j];
			}
		f[i-1]= --j;
	}		
	var p=f[0];
	for (var j=0; j<=m; j++){
		if (res[j]==0) 
			res[j]=p;
		if (j==p) p=f[p];
	}	
//	for(var j=0; j<=m; j++)
//		WScript.Echo(res[j])
	
	return res;
}                       


function boyerMoore(x, y) {
  var i=0, n=y.length, m=x.length, j;
  var bm_gs=goodSuffix(x);
  var bm_bc=badChar(x); 
  
//  WSH.echo("nm"+n+" "+m);  
  while ( i <= n-m ) {
//  WSH.echo(i);
  for ( j=m-1; j >= 0 && x.charAt(j) == y.charAt(i+j);  --j ); 
//  WSH.echo(j);
  if ( j < 0 ) {
      WSH.echo(i);
      i += bm_gs[j+1]; 	

//      WSH.echo("su "+i);
  }
  else {
	//WSH.echo("bad char "+typeof(bm_bc[y.charAt(i+j)]));
	//WSH.echo("bm_gs "+typeof(bm_gs[j+1]));
	if (typeof(bm_bc[y.charAt(i+j)])=="undefined")	{
		i+=bm_gs[j+1];
		//WSH.echo("hooray");
	}
	else
	i += Math.max(( bm_gs[ j+1 ]), ( bm_bc[y.charAt(i+j)] - m + j + 1 ) ); 	
	 }        
   }    
} 

boyerMoore(st, st2);

**/
//WSH.echo(prefix(st2));
 // t-что ищем s -где
/*function find(s, t){
	if (s.length < t.length)
		return -1;
	if (!t.length)     
		return s.length;
	
	var stopTable = new Array();
	var suffTable = new Array();

	for (var i=0; i<t.length; i++)
		stopTable[t.charAt(i)] = i;

	var rt=reverse(t);
	var p=prefix(s);
	var pr=prefix(rt);
	                  	
	WSH.echo(p[t.length]);
	for (var i=0; i<t.length+1; i++)
		suffTable[i] = t.length - p[t.length];

	for (var i=1; i<t.length; i++){
		var j=pr[i];
		suffTable[j]=Math.min(suffTable[j],  i-pr[i]+1);
	}              

	for (var shift=0; shift<=s.length-t.length; ){
		var pos = t.length - 1;
		while (t.charAt(pos) == s.charAt(pos+shift) ){
			if (pos == 0) return shift;
			pos--;
		}                       

		if (pos == t.length() - 1){
			var stopSymb;
			for (var i=0; i<t.length; i++)
				if (s.charAt(pos+shift)==t.charAt(

		}
	}
}
*/
//find(st2, st);
//WSH.echo("over");

/*
function reverse(s){
 var res="";
 for (var i=s.length-1; i>=0; i--)
	res+=s.charAt(i);
 return res;
}
*/

/*function prefix(st){
 var res = new Array(st);
 var k=0;                
 res[0]=0;
 for (var i=1; i<st.length; i++){
	while (k>0 && st.charAt(k)!=st.charAt(i))
		k=res[k-1];
	if (st.charAt(k)==st.charAt(i))
		k++;
	res[i]=k;
	}
 return res;
}
*/
