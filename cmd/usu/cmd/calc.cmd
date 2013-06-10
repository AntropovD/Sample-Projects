@echo off
set res=

:label
	set in=%1
	if '%in%'=='/?' goto help
	set res=%res%%in% 2>nul
	rem echo %errorlevel%	
	rem echo %in%	
	shift
	if not "%in%"=="" goto label

set /a ans = %res% 2>nul
if not %errorlevel%==0 goto notNumber	

echo %ans%	
goto:eof

:help
	echo This is help about this program. Enter number expression and calc will count it.
	echo You can use something like that: calc.cmd (2*3+(5-3))/2
	goto:eof

:notNumber
	echo You entered not a number! Fatal Error!
	goto:eof

exit /B