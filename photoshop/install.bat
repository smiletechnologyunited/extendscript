@echo off
REM The MIT License (MIT)
REM 
REM Copyright (c) 2014 SMILE TECHNOLOGY UNITED, INC.
REM 
REM Permission is hereby granted, free of charge, to any person obtaining a copy
REM of this software and associated documentation files (the "Software"), to deal
REM in the Software without restriction, including without limitation the rights
REM to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
REM copies of the Software, and to permit persons to whom the Software is
REM furnished to do so, subject to the following conditions:
REM 
REM The above copyright notice and this permission notice shall be included in all
REM copies or substantial portions of the Software.
REM 
REM THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
REM IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
REM FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
REM AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
REM LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
REM OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
REM SOFTWARE.


set THISDIR=%~dp0

set PHOTOSHOP=C:\Program Files\Adobe\Adobe Photoshop CS6 (64 Bit)
set SUBDIR=Presets\Scripts

set SOURCE=%THISDIR%\stu_save_layer.jsx
set TARGET=%PHOTOSHOP%\%SUBDIR%\stu_save_sayer.jsx

if exist %TARGET%(
	del /F /Q "%TARGET%"
)
mklink /H "%TARGET%" "%SOURCE%"

REM EOF
