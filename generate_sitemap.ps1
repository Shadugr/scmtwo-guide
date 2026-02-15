$rootPath = "e:\work\forkprojects\scmtwo-guide"
$outputPath = Join-Path $rootPath "sitemap.xml"
$urlPrefix = "https://shadugr.github.io/scmtwo-guide/"

$files = Get-ChildItem -Path $rootPath -Recurse -Filter "*.html"

# Exclude directories
$excludeDirs = @(".git", ".github", "css", "js", "img", "node_modules")
# Exclude files
$excludeFiles = @("404.html", "new.html", "google.html")

$xml = "<?xml version=""1.0"" encoding=""UTF-8""?>`n"
$xml += "<urlset xmlns=""http://www.sitemaps.org/schemas/sitemap/0.9"">`n"

Write-Host "Scanning $($files.Count) files..."

foreach ($file in $files) {
    # Check exclusions
    $relPath = $file.FullName.Substring($rootPath.Length + 1)
    $segments = $relPath.Split("\")
    
    $skip = $false
    foreach ($segment in $segments) {
        if ($excludeDirs -contains $segment) { $skip = $true; break }
    }
    if ($skip) { continue }
    
    if ($excludeFiles -contains $file.Name) { continue }

    # Construct URL
    $urlPath = $relPath.Replace("\", "/")
    if ($urlPath.EndsWith("index.html")) {
        $urlPath = $urlPath.Substring(0, $urlPath.Length - 10)
    }
    $url = $urlPrefix + $urlPath
    
    # Get Last Modified Date
    $lastmod = $file.LastWriteTime.ToString("yyyy-MM-dd")
    
    # Priority Logic
    $priority = "0.7"
    if ($urlPath -eq "" -or $urlPath -eq "index.html") { $priority = "1.0" }
    elseif ($urlPath.StartsWith("guides/")) { $priority = "0.9" }
    elseif ($urlPath.StartsWith("mechanics/")) { $priority = "0.8" }
    elseif ($urlPath.StartsWith("roles/")) { $priority = "0.8" }

    $xml += "    <url>`n"
    $xml += "        <loc>$url</loc>`n"
    $xml += "        <lastmod>$lastmod</lastmod>`n"
    $xml += "        <priority>$priority</priority>`n"
    $xml += "    </url>`n"
    
    Write-Host "Added: $url"
}

$xml += "</urlset>"

$xml | Set-Content $outputPath -Encoding UTF8
Write-Host "`nSitemap written to $outputPath"
