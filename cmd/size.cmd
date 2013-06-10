@echo off

if "%*"=="/?" goto:help
REM dir | findstr /V "<DIR>"
setlocal ENABLEDELAYEDEXPANSION 
set res=0
set curDir=%CD%

:number23
for /f "tokens=4* skip=7" %%i in ('dir /A /-C') do (
	if "%%i"=="<DIR>"  (
		cd %%j
		call:number23
		cd ..
		) else (        		
		set /A res=!res!+%%i
		)	
)
rem echo %res%  %cd% asd %curDir%                               
          
if not "%CD%"=="%curDir%" goto:eof
echo %res%
exit /b
endlocal

:help
	echo Use: size.cmd
	echo Counts size of all files in current and all subdirectories
	exit /b