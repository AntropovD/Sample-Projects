@ echo off
:begin
Cls
Title Calculator
Echo Enter Expression:
Set /P exp=
Set /A result=%exp%
Echo Result: %result%
Pause>nul
goto begin