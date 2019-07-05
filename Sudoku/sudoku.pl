use Socket;
print "CLIENT";
$\=$/;
$proto = getprotobyname("tcp");
socket(SOCKET, PF_INET, SOCK_STREAM, $proto) or die "Can't create socket: $!";
$host = shift || '194.106.195.60';
$port = shift ||  9503;
print "Connecting to $host\n";
sub search;
$iaddr = inet_aton($host);
$paddr = sockaddr_in($port, $iaddr);

connect(SOCKET, $paddr) or die "Can't connect: $!";

	recv SOCKET, $line, 1024, MSG_DONOTWAIT;	
	recv SOCKET, $line, 1024, MSG_DONOTWAIT;


$line =~ s/-|\||\n|\s//g;

	my @mas = split('', $line);
	

my $global=1; my $returns=0;
sub search{	
		
    #~ print $line;
	for ($i=0; $i<=$#mas; $i++)
	{
		
	if (@mas[$i] eq '_')
		{
			my $iNeedIt = $i;
			my $t = int($i / 9);
			my @m;
			for ($t*9..($t+1)*9-1){
				if (@mas[$_] ne '_'){push(@m, @mas[$_]);}
			}
			$t = int ($i % 9);
			for (0..8){
				$per = $_*9+$t;
				if (@mas[$per] ne '_'){ push @m, @mas[$per];}
			}
			my $a = int($i / 9);
			my $b = int($i % 9);
			if ($a<3 && $b<3){ for (0,1,2,9,10,11,18,19,20){if (@mas[$_] ne '_') {push @m, @mas[$_]}}};
			if ($a<3 && $b>3 && $b<6){ for (3,4,5,12,13,14,21,22,23){if (@mas[$_] ne '_') {push @m, @mas[$_]}}};
			if ($a<3 && $b>=6){ for (6,7,8,15,16,17,24,25,26){if (@mas[$_] ne '_') {push @m, @mas[$_]}}};
			
			
			if ($a>3 && $a<6 && $b<3){ for (27,28,29,36,37,38,45,46,47){if (@mas[$_] ne '_') {push @m, @mas[$_]}}};
			if ($a>3 && $a<6 && $b>3 && $b<6){ for (30,31,32,39,40,41,48,49,50){if (@mas[$_] ne '_') {push @m, @mas[$_]}}};
			if ($a>3 && $a<6 && $b>=6){ for (33,34,35,42,43,44,51,52,53){if (@mas[$_] ne '_') {push @m, @mas[$_]}}};
			
			
			if ($a>=6 && $b<3){ for (54,55,56,63,64,65,72,73,74){if (@mas[$_] ne '_') {push @m, @mas[$_]}}};
			if ($a>=6 && $b>3 && $b<6){ for (57,58,59,66,67,68,75,76,77){if (@mas[$_] ne '_') {push @m, @mas[$_]}}};
			if ($a>=6 && $b>=6){ for (60,61,62,69,70,71,78,79,80){if (@mas[$_] ne '_') {push @m, @mas[$_]}}};			
			
			 #~ print @m;	
			my $numbers = join('', @m);
			#~ print $numbers;
			my $was = 0;
			for (1..9)
			{
				if (not $numbers =~ /$_/){ 
					@was = 1;
					@mas[$iNeedIt]=$_;
					my $bool = 0;
					for (0..$#mas)
					{
						if (@mas[$_] eq '_') {$bool++}
					}					
					if ($bool == 0){
						print $global;
						$global++;
						$\='';
					for (0..$#mas)
					{
						if (int($_%9) ==0){ print "\n";}	
						print "@mas[$_]";	
					}
					print "\n##################\n";
						send SOCKET, "solution ".join('', @mas), 0;
						recv SOCKET, $line, 1024, MSG_DONOTWAIT;
						print $line;
						recv SOCKET, $line, 1024, MSG_DONOTWAIT;
						print $line;	
						#~ recv SOCKET, $line, 1024, MSG_DONOTWAIT;
						#~ print $line;							
						$line =~ s/-|\||\n|[^1-9|_]|\s//g;
						
					
					@mas = split('', $line);
				
					$asd = search;
					print "exit search1 ";
					exit 9;
					#~ sleep(10000000);
					}
					#~ $\='';
					#~ for (0..$#mas)
					#~ {
						#~ if (int($_%9) ==0){ print "\n";}	
						#~ print "@mas[$_]";	
					#~ }
					#~ print "\n##################\n";
					$asd = search;					
					@mas[$iNeedIt]='_';
				}
			}
			if ($was == 0 ){ return 1;}
			$returns++;
			if ($returns>=10){			
				print "Resta";	
				send SOCKET, "restart", 0;
				recv SOCKET, $line, 1024, MSG_DONOTWAIT;
				print $line;
				$returns = 0;
			}
			
		}	
	}		
};

search;
