@echo off
echo Starting Solar Sensei preview server...
echo.
echo Open http://localhost:8000 in your browser
echo Press Ctrl+C to stop
echo.

cd /d "%~dp0"
python -m http.server 8000 2>nul || (
    echo Python not found. Trying PowerShell...
    powershell -Command "
        $listener = New-Object System.Net.HttpListener
        $listener.Prefixes.Add('http://localhost:8000/')
        $listener.Start()
        Write-Host 'Server running at http://localhost:8000/'
        while ($listener.IsListening) {
            $context = $listener.GetContext()
            $request = $context.Request
            $response = $context.Response
            $path = $request.Url.AbsolutePath
            if ($path -eq '/') { $path = '/index.html' }
            $file = Join-Path (Get-Location) $path.TrimStart('/')
            if (Test-Path $file) {
                $bytes = [System.IO.File]::ReadAllBytes($file)
                $response.ContentLength64 = $bytes.Length
                $response.OutputStream.Write($bytes, 0, $bytes.Length)
            } else {
                $response.StatusCode = 404
            }
            $response.Close()
        }
    "
)
pause