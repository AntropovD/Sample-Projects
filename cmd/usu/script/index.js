
function fack(n){
	if (n==1 || n==0) return 1;
	else return fack(n-1)*n;
}
var tmp = WSH.StdIn.readline();

var fso = new ActiveXObject("Scripting.File.SystemObject");
var file = fso.OpenTextFile("C:\\mine\\vm\\prog1.txt", 2, true);

WSH.echo(fack(tmp));

 