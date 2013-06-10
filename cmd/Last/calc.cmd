@echo off
REM for /f %%i in ('echo %* ^| findstr "/?"') do goto help 
REM for /f %%i in ('echo %* ^| findstr "help"') do goto help
REM for /f %%i in ('echo %* | findstr [/?]') do echo.asd

rem set /a var=%*

set tmp=
:label	
	set in=%1
	set tmp=%tmp%%in%
	shift	
	if not "%1"=="" goto label
set tmp=%*

echo.%tmp%|find "/?" > nul
if %errorlevel%==0 goto help     
echo.%tmp%|findstr "[a-Z]" > nul
if %errorlevel%==0 goto notNumber
echo.%tmp%|find "++" > nul
if %errorlevel%==0 goto notNumber
echo.%tmp%|find "--" > nul
if %errorlevel%==0 goto notNumber
echo.%tmp%|find "**" > nul
if %errorlevel%==0 goto notNumber
echo.%tmp%|find "//" > nul
if %errorlevel%==0 goto notNumber
echo.%tmp%|find "=" > nul
if %errorlevel%==0 goto notNumber
echo.%tmp%|find "==" > nul
if %errorlevel%==0 goto notNumber
echo.%tmp%|find "^^" > nul
if %errorlevel%==0 goto notNumber
echo.%tmp%|find "^" > nul
if %errorlevel%==0 goto notNumber

echo.%tmp%|find "[" > nul
if %errorlevel%==0 goto notNumber
echo.%tmp%|find "]" > nul
if %errorlevel%==0 goto notNumber

set /a ans =%tmp% > nul 2>nul
if %errorlevel%==0 (
	echo %ans%
	exit /b
	) else (
	goto notNumber
	)

REM echo %tmp%
exit /b


:help
	echo This is help about this program. Enter number expression and calc will count it
	echo You can use something like that: "calc.cmd (2*3+(5-3))/2		
	goto:eof

:notNumber
	rem echo ErrorLevel %ERRORLEVEL%
	echo You entered not valid expression! ERROR!
	goto:eof