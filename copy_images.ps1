$sourceDir = "c:\Users\niyas\.gemini\antigravity\brain\4feefd73-f7a5-411b-ac4d-7fe18852b932"
$destDir = "c:\Users\niyas\OneDrive\Desktop\Personal website\portfolio\public\images"

# Ensure destination exists
if (-not (Test-Path $destDir)) {
    New-Item -ItemType Directory -Path $destDir -Force
}

$mapping = @{
    "project_compbldr_1769906897917.png" = "compbldr.png"
    "project_mibook_1769906912163.png"   = "mibook.png"
    "project_rag_1769906927571.png"      = "rag.png"
    "project_iptrack_1769906942725.png"  = "iptrack.png"
}

foreach ($key in $mapping.Keys) {
    $src = Join-Path $sourceDir $key
    $dest = Join-Path $destDir $mapping[$key]
    
    if (Test-Path $src) {
        Copy-Item -Path $src -Destination $dest -Force
        Write-Host "Copied $key to $($mapping[$key])"
    } else {
        Write-Host "Error: Source file not found: $src"
    }
}
