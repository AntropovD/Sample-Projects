function to_binary(bits) { //complete
var result='';
if (bits!=0) {
	var tmp = Math.pow(2, Math.floor(Math.log(bits)/Math.LN2));
	while (tmp>0) {
		if (bits>=tmp) {
			bits-=tmp;
			result+='1';
		} else {
			result+='0';
		}
		tmp=Math.floor(tmp/2);
	}
} else result='0';
if (result=='') result=0;
return result;
}

function normalize(bits) {
bits[1]+='';
bits[2]+='';
var jter = 23-bits[2].length, iter = 8-bits[1].length;
for (var i=0; i<iter; ++i) bits[1]='0'+bits[1];
for (var i=0; i<jter; ++i) bits[2]+='0';
bits[2]=bits[2].slice(0, 23);
return bits;
}
function to_int(bits) { //complete
var tmp=bits.length;
var result=0;
for (var i=0; i<tmp; ++i)
	if (bits.charAt(i)=='1')
		result+=Math.pow(2, tmp-i-1);
return result;
}

function new_float(some_float) { //idk
var bits= new Array;
if (some_float.charAt(0)=='-') {
	bits[0]=0;
	some_float=some_float.slice(1, some_float.length);
} else bits[0]=1; // here +/-
if (some_float=="infinity") {
	bits[1]=to_binary(255);
	bits[2]='0';
	return bits;
}
if (some_float=="NaN") {
	bits[1]=to_binary(255);
	bits[2]=to_binary(Math.random()*Math.pow(10,25));
	bits[2]=bits[2].slice(1, 23);
	return bits;
}
try {
	var leet = some_float.split('.');
} catch (errorlevel) {
	var tmp=leet;
	leet = new Array;
	leet[0]=tmp;
} // here whole from fractional
bits[1]=to_binary(leet[0]); // temporary lies whole
bits[2]='';
if (!isNaN(leet[1])) { 
	leet[1]='0.'+leet[1];
	for (var i=0;i<170;++i) {
		leet[1]*=2;
		bits[2]+=Math.floor(leet[1]);
	leet[1]-=Math.floor(leet[1]);
	}  // here fractional to binary
}
if (bits[1]!=0) {
	bits[2]=bits[1].slice(1, bits[1].length)+bits[2];
	bits[3]=127+bits[1].length-1;
} else if (bits[2]!=0) {
	bits[3]=127-bits[2].indexOf('1')-1;
		bits[2]=bits[2].slice(bits[2].indexOf('1')+1, bits[2].length);
}  // here makes float
bits[1]=to_binary(bits[3]);
if (bits[2]=='') bits[2]+=0;
bits[3]='';
return bits;
}
function compare(first_bits, second_bits) { //complete
var tmpi=to_int(first_bits[1]), tmpj=to_int(second_bits[1]);
if (first_bits[0]>second_bits[0]) return '>';
if (first_bits[0]<second_bits[0]) return '<';
if (tmpi > tmpj) return '>';
if (tmpi < tmpj) return '<';
if (first_bits[2]>second_bits[2]) return '>';
if (first_bits[2]<second_bits[2]) return '<';
return '=';
}
function compare_abs(first_bits, second_bits) { //complete
var tmpi=to_int(first_bits[1]), tmpj=to_int(second_bits[1]);
if (tmpi >= tmpj) return '>';
if (tmpi < tmpj) return '<';
if (first_bits[2]>=second_bits[2]) return '>';
if (first_bits[2]<second_bits[2]) return '<';
}

function summ(first_bits, second_bits, to_do) { //idk
var tmp = (first_bits[1]!=0)? '1'+first_bits[2] : '0'+first_bits[2];
var tmq = (second_bits[1]!=0)? '1'+second_bits[2] : '0'+second_bits[2];	
var result='', overflow=to_do, iter=to_int(first_bits[1])-127, jter=to_int(second_bits[1])-127;
if (to_do==0) {
	if (iter<jter) {
			for (var i=0; i<iter-jter; ++i) tmp+='0';
			for (var i=0; i>iter-jter; --i) tmp='0'+tmp;
		} else {
			for (var i=0; i<jter-iter; ++i) tmq+='0';
			for (var i=0; i>jter-iter; --i) tmq='0'+tmq;
		}
	for (var i=tmp.length; i>0; --i) {
			if (tmp.charAt(i-1)==tmq.charAt(i-1)) {
				result=overflow+result;
				overflow=tmp.charAt(i-1);
			}
			if (tmp.charAt(i-1)!=tmq.charAt(i-1)) {
				result= (overflow=='1')? '0'+result : '1'+result;
			}
		}
	first_bits[1]= (iter > jter) ? to_binary(127+iter+overflow*1) : to_binary(127+jter+overflow*1); 
	first_bits[2]=result.slice(1, result.length);
	
} else { 
	if (iter<jter) {
		for (var i=0; i<iter-jter; ++i) tmp+='0';
		for (var i=0; i>iter-jter; --i) tmp='0'+tmp;
	} else {
		for (var i=0; i<jter-iter; ++i) tmq+='0';
		for (var i=0; i>jter-iter; --i) tmq='0'+tmq;
	}
	for (var i=tmp.length; i>0; --i) {
			if (tmp.charAt(i-1)!=tmq.charAt(i-1)) {
				result=overflow+result;
				overflow=tmp.charAt(i-1);
			}
			if (tmp.charAt(i-1)==tmq.charAt(i-1)) {
				result= (overflow=='1')? '0'+result : '1'+result;
			}
		}
	first_bits[1]= (result.indexOf('1')!=-1) ? to_binary(127-result.indexOf('1')+result.length-1) : 0;
	first_bits[2]=result.slice(result.indexOf('1')+1, result.length);
	}
if (first_bits[2]=='') first_bits[2]=0;
if (first_bits[1].length>8) {
	first_bits[1]='11111111';
	first_bits[2]='0';
}
first_bits=normalize(first_bits);
return first_bits;
}
//main
var argv = WSH.StdIn.ReadLine();
try {
	argv = argv.split(' ');
} catch (errorlevel) {
	var tmp=argv;
	argv=new Array(tmp,'','');
}
if (argv[0]!='') var bits_first = new_float(argv[0]); else WSH.Quit();
if (argv[1]!='') var bits_second = new_float(argv[1]);
var test=compare_abs(bits_first, bits_second);
if ((argv[2]=='*')||(argv[1]=='*')) {
	WSH.Echo("1: "+normalize(bits_first));
	if (argv[1]!='*') WSH.Echo("2: "+normalize(bits_second));
}
if (argv[2]=='?') WSH.Echo("comp: "+compare(bits_first, bits_second));
if ((bits_first[0]^bits_second[0])==0) {
	if (argv[2]=='+') {
		WSH.Echo(summ(bits_first, bits_second, 0));
		WSH.Quit();
	}
	if ((bits_first[0]^bits_second[0])!=0) {
		if (test=='<') {
			WSH.Echo(summ(bits_second, bits_first, 1));
			WSH.Quit();
		} else {
			WSH.Echo(summ(bits_first, bits_second, 1));
			WSH.Quit();
		}
	}
}
if (argv[2]=='-') {
	if ((bits_first[0]^bits_second[0])!=0) {
		bits_second[0]^=1;
		WSH.Echo(summ(bits_second, bits_first, 0));
		WSH.Quit();
	}
	if ((bits_first[0]^bits_second[0])==0) {
		if (test=='>') {
			WSH.Echo(summ(bits_first, bits_second, 1));
			WSH.Quit();
		} else {
			bits_second[0]^=1;
			WSH.Echo(summ(bits_second, bits_first, 1));
			WSH.Quit();
		}
	}
}