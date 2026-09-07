$ErrorActionPreference = "Stop"
Add-Type -AssemblyName System.Drawing

function New-RoundedRectPath([float]$x, [float]$y, [float]$w, [float]$h, [float]$r) {
    $path = New-Object System.Drawing.Drawing2D.GraphicsPath
    $d = $r * 2
    $path.AddArc($x, $y, $d, $d, 180, 90)
    $path.AddArc($x + $w - $d, $y, $d, $d, 270, 90)
    $path.AddArc($x + $w - $d, $y + $h - $d, $d, $d, 0, 90)
    $path.AddArc($x, $y + $h - $d, $d, $d, 90, 90)
    $path.CloseFigure()
    return $path
}

function Save-AppIcon([int]$size, [string]$path) {
    $bmp = New-Object System.Drawing.Bitmap $size, $size
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
    $g.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::AntiAliasGridFit
    $g.Clear([System.Drawing.Color]::FromArgb(255, 245, 247, 251))

    $pad = [int]($size * 0.08)
    $box = $size - (2 * $pad)
    $radius = [Math]::Max(8, $size * 0.18)
    $bgPath = New-RoundedRectPath $pad $pad $box $box $radius
    $blue = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(255, 37, 99, 235))
    $g.FillPath($blue, $bgPath)

    $fontSize = [int]($size * 0.32)
    $font = New-Object System.Drawing.Font("Segoe UI", [float]$fontSize, [System.Drawing.FontStyle]::Bold, [System.Drawing.GraphicsUnit]::Pixel)
    $white = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::White)
    $sf = New-Object System.Drawing.StringFormat
    $sf.Alignment = [System.Drawing.StringAlignment]::Center
    $sf.LineAlignment = [System.Drawing.StringAlignment]::Center
    $textRect = New-Object System.Drawing.RectangleF $pad, $pad, $box, ($box * 0.78)
    $g.DrawString("CB", $font, $white, $textRect, $sf)

    $keyY = $pad + [int]($box * 0.72)
    $keyH = [int]($box * 0.16)
    $navy = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(255, 30, 58, 138))
    $slot = $box / 7
    foreach ($i in 1, 3, 5) {
        $kx = $pad + ($slot * $i)
        $g.FillRectangle($navy, $kx, $keyY, ($slot * 0.7), $keyH)
    }

    $bmp.Save($path, [System.Drawing.Imaging.ImageFormat]::Png)
    $g.Dispose()
    $bmp.Dispose()
    $font.Dispose()
    $blue.Dispose()
    $white.Dispose()
    $navy.Dispose()
    $bgPath.Dispose()
}

function Save-FeatureGraphic([string]$path) {
    $w = 1024
    $h = 500
    $bmp = New-Object System.Drawing.Bitmap $w, $h
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
    $g.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::AntiAliasGridFit
    $g.Clear([System.Drawing.Color]::FromArgb(255, 37, 99, 235))

    $white = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::White)
    $muted = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(220, 239, 246, 255))
    $titleFont = New-Object System.Drawing.Font("Segoe UI", 56, [System.Drawing.FontStyle]::Bold, [System.Drawing.GraphicsUnit]::Pixel)
    $subFont = New-Object System.Drawing.Font("Segoe UI", 28, [System.Drawing.FontStyle]::Regular, [System.Drawing.GraphicsUnit]::Pixel)

    $icon = New-Object System.Drawing.Bitmap 220, 220
    $ig = [System.Drawing.Graphics]::FromImage($icon)
    $ig.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
    $ig.Clear([System.Drawing.Color]::Transparent)
    $ig.Dispose()
    Save-AppIcon 220 (Join-Path $env:TEMP "cb-icon-temp.png")
    $mark = [System.Drawing.Image]::FromFile((Join-Path $env:TEMP "cb-icon-temp.png"))
    $g.DrawImage($mark, 80, 140, 220, 220)
    $mark.Dispose()

    $g.DrawString("ChordBook Lite", $titleFont, $white, 340, 168)
    $g.DrawString("Cifras, setlists e palco. Sem conta.", $subFont, $muted, 340, 250)

    $bmp.Save($path, [System.Drawing.Imaging.ImageFormat]::Png)
    $g.Dispose()
    $bmp.Dispose()
    $white.Dispose()
    $muted.Dispose()
    $titleFont.Dispose()
    $subFont.Dispose()
}

$pwaIcons = Join-Path $PSScriptRoot "..\pwa\icons"
$loja = Join-Path $PSScriptRoot "..\docs\loja"
New-Item -ItemType Directory -Force -Path $pwaIcons | Out-Null
New-Item -ItemType Directory -Force -Path $loja | Out-Null

Save-AppIcon 512 (Join-Path $pwaIcons "Icon-512.png")
Save-AppIcon 192 (Join-Path $pwaIcons "Icon-192.png")
Save-AppIcon 64 (Join-Path $pwaIcons "favicon.png")
Save-FeatureGraphic (Join-Path $loja "feature-graphic.png")

Write-Host "Icones gerados em pwa/icons e docs/loja/feature-graphic.png"
