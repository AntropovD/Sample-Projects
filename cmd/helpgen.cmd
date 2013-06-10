@echo off
chcp 437 1>nul
if exist "help" (rmdir /Q /S help)
mkdir help 
for /f %%i in ('help ^| findstr /R "^[A-Z]"') do (
	help %%i >> help/%%i 2>nul 
	)
exit /b


