@echo off
chcp 1251 > nul

rem if EXIST 1 del 1
rem if EXIST 2 del 2
	
 FOR /F "usebackq skip=1" %%i IN (`help`) DO echo %%i 
 type 1 | findstr /R [A..Z]
rem for /F %%i in (2) do (			
	rem 	help %%i >> %%i 2>nul	)
rem del 1 & del 2
rem cd ..