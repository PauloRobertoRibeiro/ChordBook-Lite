param(
  [switch]$NoPause
)

$ErrorActionPreference = "Stop"

$root = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $root

$sdk = "C:\Users\Jairo\AppData\Local\Android\Sdk"
$bt = Join-Path $sdk "build-tools\36.0.0"
$androidJar = Join-Path $sdk "platforms\android-36\android.jar"
$adb = Join-Path $sdk "platform-tools\adb.exe"
$jdk = "C:\Program Files\Eclipse Adoptium\jdk-17.0.19.10-hotspot\bin"
$out = Join-Path $root ("build\manual-" + (Get-Date -Format "yyyyMMddHHmmss"))
$versionCode = [int]((New-TimeSpan -Start ([datetime]"2026-01-01") -End (Get-Date)).Days * 100 + (Get-Date).Hour)
$versionName = Get-Date -Format "yyyy.MM.dd.HHmm"

Write-Host ""
Write-Host "ChordBook Lite - atualizador" -ForegroundColor Cyan
Write-Host "Gerando APK..."

New-Item -ItemType Directory -Force -Path $out | Out-Null
New-Item -ItemType Directory -Force -Path (Join-Path $out "generated") | Out-Null
New-Item -ItemType Directory -Force -Path (Join-Path $out "classes") | Out-Null
New-Item -ItemType Directory -Force -Path (Join-Path $out "dex") | Out-Null
$assets = Join-Path $out "assets"
New-Item -ItemType Directory -Force -Path $assets | Out-Null
Copy-Item (Join-Path $root "..\pwa\*") $assets -Recurse -Force
Get-ChildItem $assets -Recurse -File | Where-Object { $_.Extension -match '\.(txt|md)$' } | Remove-Item -Force

& (Join-Path $bt "aapt2.exe") compile --dir app\src\main\res -o (Join-Path $out "compiled.zip")
& (Join-Path $bt "aapt2.exe") link --auto-add-overlay -o (Join-Path $out "unsigned.apk") -I $androidJar --manifest app\src\main\AndroidManifest.xml -R (Join-Path $out "compiled.zip") -A $assets --java (Join-Path $out "generated") --min-sdk-version 23 --target-sdk-version 36 --version-code $versionCode --version-name $versionName

$javaFiles = @("app\src\main\java\com\jairo\chordbookpwa\MainActivity.java") + (Get-ChildItem (Join-Path $out "generated") -Recurse -Filter *.java | Select-Object -ExpandProperty FullName)
& (Join-Path $jdk "javac.exe") -classpath $androidJar -d (Join-Path $out "classes") $javaFiles

Push-Location (Join-Path $out "classes")
& (Join-Path $jdk "jar.exe") cf (Join-Path $out "classes.jar") .
Pop-Location

& (Join-Path $bt "d8.bat") --lib $androidJar --output (Join-Path $out "dex") (Join-Path $out "classes.jar")

Push-Location (Join-Path $out "dex")
& (Join-Path $bt "aapt.exe") add (Join-Path $out "unsigned.apk") classes.dex
Pop-Location

& (Join-Path $bt "zipalign.exe") -f -p 4 (Join-Path $out "unsigned.apk") (Join-Path $out "aligned.apk")
& (Join-Path $bt "apksigner.bat") sign --ks "$env:USERPROFILE\.android\debug.keystore" --ks-key-alias androiddebugkey --ks-pass pass:android --key-pass pass:android --out (Join-Path $out "ChordBook-Lite-debug.apk") (Join-Path $out "aligned.apk")
& (Join-Path $bt "apksigner.bat") verify (Join-Path $out "ChordBook-Lite-debug.apk")

$apk = Join-Path $out "ChordBook-Lite-debug.apk"
$share = Join-Path ([Environment]::GetFolderPath("Desktop")) "ChordBook-Lite-teste.apk"
Copy-Item $apk $share -Force
Write-Host ""
Write-Host "APK pronto:" -ForegroundColor Green
Write-Host $apk
Write-Host ""
Write-Host "Copia para enviar no WhatsApp:" -ForegroundColor Green
Write-Host $share

if (Test-Path $adb) {
    $devices = & $adb devices
    $ready = $devices | Select-String "`tdevice"
    if ($ready) {
        Write-Host ""
        Write-Host "Celular encontrado. Instalando atualizacao..." -ForegroundColor Cyan
        & $adb install -r $apk
        Write-Host "Concluido. Abra o ChordBook Lite no celular." -ForegroundColor Green
    } else {
        Write-Host ""
        Write-Host "Nao encontrei celular liberado no ADB." -ForegroundColor Yellow
        Write-Host "Ative Depuracao USB no celular, conecte o cabo e rode de novo."
    }
}

Write-Host ""
if (-not $NoPause) {
  Read-Host "Pressione Enter para fechar"
}
