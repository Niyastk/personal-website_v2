$files = Get-ChildItem "public\sequence\*.png"
foreach ($file in $files) {
    if ($file.Name -match "_delay") {
        $newName = $file.Name -replace "_delay.*\.png", ".png"
        Rename-Item -Path $file.FullName -NewName $newName -Force
        Write-Host "Renamed $($file.Name) to $newName"
    }
}
Write-Host "Done"
