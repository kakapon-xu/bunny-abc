@echo off
chcp 65001 >nul
cd /d "%~dp0dist"

echo ========================================
echo   Bunny ABC - Starting Server...
echo ========================================
echo.

rem Find an available port
set "port=8000"
:findport
netstat -ano | findstr ":%port% " >nul
if %errorlevel%==0 (
    set /a port+=1
    goto findport
)

echo Starting server on port %port%...
echo.
echo The game will open in your browser shortly.
echo.
echo IMPORTANT: Do NOT close this window while playing!
echo To stop the server, close this window.
echo.

rem Open browser
start "" "http://localhost:%port%"

rem Start HTTP server using PowerShell (built into Windows)
powershell -NoProfile -Command "$listener = New-Object System.Net.HttpListener; $listener.Prefixes.Add('http://localhost:%port%/'); $listener.Start(); Write-Host 'Server running at http://localhost:%port%/'; Write-Host 'Press Ctrl+C to stop.'; while($listener.IsListening) { $context = $listener.GetContext(); $request = $context.Request; $response = $context.Response; $url = $request.Url.LocalPath; if($url -eq '/') { $url = '/index.html' }; $path = Join-Path $PWD $url.TrimStart('/'); if(Test-Path $path) { $content = [System.IO.File]::ReadAllBytes($path); $extension = [System.IO.Path]::GetExtension($path); switch($extension) { '.html' { $response.ContentType = 'text/html; charset=utf-8' } '.js' { $response.ContentType = 'application/javascript; charset=utf-8' } '.css' { $response.ContentType = 'text/css; charset=utf-8' } '.svg' { $response.ContentType = 'image/svg+xml' } default { $response.ContentType = 'application/octet-stream' } }; $response.ContentLength64 = $content.Length; $response.OutputStream.Write($content, 0, $content.Length); $response.Close(); } else { $response.StatusCode = 404; $response.Close(); } }"

pause
