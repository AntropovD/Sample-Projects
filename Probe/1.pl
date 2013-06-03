open F, "dict.txt";
open F2, ">in.txt";
for (0..100000)
{
	$a=<F>;
	chop($a);
	chop($a);
	$t = int(rand(1000));
	print F2 "$a $t\n";	
}
