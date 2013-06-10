var d="12.03.2012";
var r="/(\d\d)\.(\d\d)\.(\d{4})/";
var x=r.exec(d);

if (x && x.length>1)
{
 var days=x[1];
 var month=x[2];
 var year=x[3];

}

WSH.echo(x[1]+x[2]+x[3]);