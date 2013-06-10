@echo off
setlocal ENABLEDELAYEDEXPANSION         
set	args=%1
if "%args%"=="" goto:help
if "%args%"=="/?" goto:help                                                                        

set var="^del^erase^color^cd^chdir^md^mkdir^prompt^pushd^popd^set^setlocal^endlocal^if^for^call^shift^goto^start^assoc^ftype^"
set globFlag="0"
rem echo.%var%

echo.%var%|findstr /I "\^%args%\^" > nul
rem echo %errorlevel%

if "%ERRORLEVEL%"=="0" (
 	echo This is internal command
	set globFlag="1"
	exit /b
)                       

                          
set modPath=%PATH%;
:here
for /f "tokens=1*  delims=;" %%i in ("!modPath!") do (
	set curPath=%%i
	set modPath=%%j
	set tempPathExt=%PATHEXT%;

	echo !curPath!\%args%

	if  exist !curPath!\%args% (				
		echo This program is external.  It is in !curPath!
		set globFlag=1				
	)	
	echo !curPath!%args%
	if  exist !curPath!%args% (				
		echo This program is external.  It is in !curPath!
		set globFlag=1				
	)


	:there
	for /f "tokens=1* delims=;" %%x in ("!tempPathExt!") do (
		set curExt=%%x                     
		set tempPathExt=%%y	
		echo !curPath!\%args%!curExt!		
		if  exist !curPath!\%args%!curExt! (				
			echo This program is external.  It is in !curPath!.!curExt!
			set globFlag=1				
		)
		echo !curPath!%args%!curExt!
		if  exist !curPath!%args%!curExt! (				
			echo This program is external.  It is in !curPath!.!curExt!
			set globFlag=1				
		)                   	
		goto:there
	)		
)
goto:here
if %globFlag%=="0" echo This Program is not internal or external

endlocal
exit /b

:help
	echo USE: which [program name]
	exit /b