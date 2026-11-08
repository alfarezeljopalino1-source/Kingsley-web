$ProgressPreference = 'SilentlyContinue'
$url = "https://github.com/alfarezeljopalino1-source/Kingsley/releases/latest/download/Kingsley.Setup.1.0.1.exe"
$dest = "$env:TEMP\Kingsley.Setup.exe"

Write-Host "⚡ Mengunduh Kingsley Terminal v1.0.1 (Zero-Latency WebGL Update)..." -ForegroundColor Cyan
Invoke-RestMethod -Uri $url -OutFile $dest

Write-Host "✓ Selesai! Membuka installer..." -ForegroundColor Green
Start-Process $dest
