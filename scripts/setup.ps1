$ErrorActionPreference = "Stop"
$sourcePath = "..\frame_*.png"
$destPath = "public\sequence"

# Ensure dest exists (already created but good measure)
if (!(Test-Path $destPath)) {
    New-Item -ItemType Directory -Path $destPath | Out-Null
}

# Move files
Write-Output "Moving files..."
Move-Item $sourcePath $destPath -Force -ErrorAction SilentlyContinue

# Rename files in sequence
$files = Get-ChildItem "$destPath\frame_*.png" | Sort-Object Name
Write-Output "Found $($files.Count) files."

$i = 0
foreach ($file in $files) {
    # Target name: frame_000.png
    $newName = "frame_{0:D3}.png" -f $i
    $newPath = Join-Path $destPath $newName
    
    # Avoid renaming if already correct (e.g. re-running)
    if ($file.Name -ne $newName) {
        Rename-Item $file.FullName $newName -Force
    }
    $i++
}

"Setup Complete" | Out-File "setup_done.txt"
