<# 
.SYNOPSIS
    Starts a local HTTP server for previewing Solar Sensei site
.DESCRIPTION
    Serves the current directory on http://localhost:8000
    Handles ES modules correctly (unlike file:// protocol)
#>

param(
    [int]$Port = 8000
)

$root = Split-Path -Parent $MyInvocation.MyCommand.Definition
$listener = New-Object System.Net.HttpListener
$prefix = "http://localhost:$Port/"
$listener.Prefixes.Add($prefix)

try {
    $listener.Start()
    Write-Host "Solar Sensei preview server running at $prefix" -ForegroundColor Green
    Write-Host "Press Ctrl+C to stop" -ForegroundColor Yellow
    Write-Host ""
    Start-Process $prefix

    while ($listener.IsListening) {
        $context = $listener.GetContext()
        $request = $context.Request
        $response = $context.Response

        $path = $request.Url.AbsolutePath
        if ($path -eq '/') { $path = '/index.html' }

        $filePath = Join-Path $root $path.TrimStart('/')
        $filePath = $filePath.Replace('/', '\')

        if (Test-Path $filePath -PathType Leaf) {
            $ext = [IO.Path]::GetExtension($filePath).ToLower()
            $mime = @{
                '.html' = 'text/html; charset=utf-8'
                '.css'  = 'text/css; charset=utf-8'
                '.js'   = 'application/javascript; charset=utf-8'
                '.json' = 'application/json; charset=utf-8'
                '.svg'  = 'image/svg+xml'
                '.png'  = 'image/png'
                '.jpg'  = 'image/jpeg'
                '.jpeg' = 'image/jpeg'
                '.ico'  = 'image/x-icon'
                '.woff' = 'font/woff'
                '.woff2'= 'font/woff2'
            }[$ext]
            if (-not $mime) { $mime = 'application/octet-stream' }

            $bytes = [IO.File]::ReadAllBytes($filePath)
            $response.ContentType = $mime
            $response.ContentLength64 = $bytes.Length
            $response.StatusCode = 200
            $response.OutputStream.Write($bytes, 0, $bytes.Length)
        } else {
            $response.StatusCode = 404
            $bytes = [Text.Encoding]::UTF8.GetBytes("404 Not Found")
            $response.ContentLength64 = $bytes.Length
            $response.OutputStream.Write($bytes, 0, $bytes.Length)
        }
        $response.Close()
    }
}
finally {
    $listener.Stop()
    $listener.Close()
}