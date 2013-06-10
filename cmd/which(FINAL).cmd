@echo off
setlocal ENABLEDELAYEDEXPANSION         
set	args=%1
if "%args%"=="" goto:help
if "%args%"=="/?" goto:help                                                                        
set globFlag="0"

rem set var="^del^erase^color^cd^chdir^md^mkdir^prompt^pushd^popd^set^setlocal^endlocal^if^for^call^shift^goto^start^assoc^ftype^"
rem echo.%var%
rem echo.%var%|findstr /I "\^%args%\^" > nul
rem echo %errorlevel%

REM if "%ERRORLEVEL%"=="0" (
 	REM echo This is internal command
	REM set globFlag="1"
	REM exit /b
REM )                       

                          
set modPath=%PATH%

:here
for /f "tokens=1*  delims=;" %%i in ("%modPath%") do (
	set curPath=%%i
	set modPath=%%j
	
	rem echo !curPath!\%args%
	if  /I exist !curPath!\%args% (				
		set curD=%CD%
		cd %args% >NUL 2>NUL
		if "%CD%"=="%curD%" (
			echo This program is external.  It is in !curPath!
			set globFlag="1"
			)
		)	

	set tempPathExt=%PATHEXT%
	:there
	for /f "tokens=1* delims=;" %%x in ("!tempPathExt!") do (
		set curExt=%%x
		set tempPathExt=%%y
		rem echo !curPath!\%args%!curExt!
		if  /I exist !curPath!\%args%!curExt! (				
			echo This program is external.  It is in !curPath!
			set globFlag="1"
			)            	
		if not !tempPathExt!=="" goto:there		
	)			
	if not "!modPath!"=="" goto:here	
)

rem FFFFFFFFFFFFFFFUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUU
set PATH=
rem echo %path%
%args% /? >NUL 2>NUL
rem echo %errorlevel%

if not ERRORLEVEL 9009 (	
		echo This Program is internal
	) else (
	rem echo %globFlag%
	if %globFlag%=="0" (
		echo This Program is not internal or external
	)
)

endlocal
exit /b

:help
	echo USE: which [program name]
	exit /b