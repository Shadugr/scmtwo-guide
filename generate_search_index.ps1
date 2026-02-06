$rootPath = "e:\work\forkprojects\scmtwo-guide"
$outputPath = Join-Path $rootPath "search.json"

$files = Get-ChildItem -Path $rootPath -Recurse -Filter "*.html"

$jsonList = @()

foreach ($file in $files) {
    # Exclude root files specifically
    if ($file.FullName -eq "$rootPath\404.html" -or $file.FullName -eq "$rootPath\index.html" -or $file.FullName -eq "$rootPath\new.html") { continue }
    
    # Exclude directories
    if ($file.FullName -match "\\(css|js|img|\.git|\.github|node_modules)\\") { continue }

    $content = Get-Content $file.FullName -Raw -Encoding UTF8
    
    # Title
    if ($content -match "<title>(.*?)</title>") {
        $title = $matches[1].Replace("ККМП: ", "").Replace(" &mdash;", " -")
    } else {
        $title = "Page"
    }

    # Content
    $body = $content -replace "(?s)<script.*?</script>", ""
    $body = $body -replace "(?s)<style.*?</style>", ""
    $body = $body -replace "<[^>]+>", " "
    $body = $body -replace "\s+", " "
    $body = $body.Trim()

    # URL
    $relPath = $file.FullName.Substring($rootPath.Length + 1).Replace("\", "/")
    if ($relPath.EndsWith("index.html")) {
        $relPath = $relPath.Substring(0, $relPath.Length - 10)
    }

    # Section (English to avoid encoding issues)
    $section = "Information"
    if ($relPath -match "^guides/") { $section = "Guides" }
    elseif ($relPath -match "^roles/") { $section = "Roles" }
    elseif ($relPath -match "^maps/") { $section = "Maps" }
    elseif ($relPath -match "^faq/") { $section = "FAQ" }

    $jsonList += @{
        title = $title
        section = $section
        url = $relPath
        content = $body
    }
}

Write-Host "Found $($jsonList.Count) pages to index."
$json = $jsonList | ConvertTo-Json -Depth 5
if ($null -eq $json) {
    Write-Host "ERROR: JSON is empty/null"
} else {
    Write-Host "JSON length: $($json.Length)"
    $json | Set-Content $outputPath -Encoding UTF8
    if (Test-Path $outputPath) {
        Write-Host "SUCCESS: File created at $outputPath"
    } else {
        Write-Host "ERROR: File not created at $outputPath"
    }
}
Write-Host "Search index generated."
