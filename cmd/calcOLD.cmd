@echo off

del fuel 2>nul

set tmp=
:label	
	set in=%1
	if "%in%" == "/?" goto help
	if "%in%" == "help" goto help	
	set tmp=%tmp%%in%
	shift	
	if not "%1"=="" goto label

set /a ans =%tmp% 2>nul

if not %ERRORLEVEL% == 0 goto notNumber

rem echo %tmp%
echo %tmp% | findstr /R /N [a-Z] > fuel
for /f %%i in ('echo %* | findstr [/?]') do echo.asd

for /f %%i in (fuel) do (
	if not "%%i" == "" goto notNumber
	)

echo %ans%
rem del 1
goto:eof

:help
		echo This is help about this program. Enter number expression and calc will count it
		echo You can use something like that: "calc.cmd (2*3+(5-3))/2
			rem del 1 2>nul
		goto:eof

:notNumber
	echo ErrorLevel %ERRORLEVEL%
	echo You entered not valid expression! ERROR!
	rem del 1 2>nul
	goto:eof