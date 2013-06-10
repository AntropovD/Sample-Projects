var fso = new ActiveXObject('Scripting.FileSystemObject')
var read = fso.OpenTextFile('in.txt', 1, true);
var write= fso.OpenTextFile('out.txt', 2, true);
var keys= fso.OpenTextFile('keys.txt', 2, true);

///////////////////////////////////

function node(let,fr,par,used,cod)
{
	this.let=let;
	this.fr=fr;
	this.par=par;
	this.used=used;
	this.cod=cod;
}

var str=read.ReadLine();

var tree = new Array();
var alph=new Array();
////////////////////Считаем кол-во символов
for(i=0;i<str.length;i++)
	alph[str.charAt(i)]=0;

for(i=0;i<str.length;i++)
	alph[str.charAt(i)]++;
	

var  kolDiffSymb=0;
for (i in alph)
{
	// WSH.echo(i+" "+alph[i]);
	n=new node(i,alph[i],-1,false,'');
	tree.push(n);
	kolDiffSymb++;
}

 //////////////Строим дерево
 while (true){
		
	var freeInd=new Array();
	
	for (i in tree)
		if (tree[i].used==false) freeInd.push(i);		
		
	if (freeInd.length<2) break;
	
	var x,y;
	if (tree[freeInd[0]].fr<=tree[freeInd[1]].fr){
			x=freeInd[0];
			y=freeInd[1];
		} 
		else {
			x=freeInd[1];
			y=freeInd[0];
	}
		
	for (var i=2; i<freeInd.length; i++){
		if (tree[freeInd[i]].fr<=tree[x].fr){
			y=x;
			x=freeInd[i];
		} else 
		if (tree[x].fr<=tree[freeInd[i]].fr && tree[freeInd[i]].fr<=tree[y].fr){
			y=freeInd[i];
		}
	}
	
	// WSH.echo(x+" "+y+" "+freeInd.length);
		
	var tmp=new node(tree[x].let+""+tree[y].let, tree[x].fr+tree[y].fr,-1,false,'');
	tree.push(tmp);
	tree[x].par=tree.length-1;
	tree[x].used=true;
	tree[x].cod=0;
	tree[y].par=tree.length-1;
	tree[y].used=true;
	tree[y].cod=1;

			
 // for (i in tree)
 // {
	 // WSH.echo(tree[i].let+" "+tree[i].fr+" "+tree[i].cod+" "+tree[i].par+" "+tree[i].used);
 // }
 // WSH.echo();

}


 // for (i in tree)
 // {
	 // WSH.echo(tree[i].let+" "+tree[i].fr+" "+tree[i].cod+" "+tree[i].par+" "+tree[i].used);
 // }

var code=new Array();
////////////////////Keys counting
for (var i=0; i<kolDiffSymb; i++)
{
	var st="";
	// WSH.echo(i);
	var j=i;
	//WSH.echo(j);
	while (tree[j].used){
		//WSH.echo(tree[j].cod);
		// stcode[i]=code[i]+" "+tree[j].cod;
		st = tree[j].cod+""+st; 
		j=tree[j].par;	
	}
	code[i]=st;
}

var keysArray=new Array;
for (var i=0; i<kolDiffSymb; i++){
	keys.WriteLine(tree[i].let+" "+code[i]);
	keysArray[tree[i].let]=code[i];
}


for (var i=0; i<str.length; i++){
	write.Write(keysArray[str.charAt(i)]);
}
/////////////////////
read.close();
write.close();
keys.close();
 