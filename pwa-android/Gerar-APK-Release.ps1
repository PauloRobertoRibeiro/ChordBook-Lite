$ErrorActionPreference = "Stop"

$root = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $root

$sdk = "C:\Users\Jairo\AppData\Local\Android\Sdk"
$bt = Join-Path $sdk "build-tools\36.0.0"
$androidJar = Join-Path $sdk "platforms\android-36\android.jar"
$jdk = "C:\Program Files\Eclipse Adoptium\jdk-17.0.19.10-hotspot\bin"
$store = Join-Path $env:USERPROFILE ".chordbook\upload-keystore.jks"
$out = Join-Path $root "build\release-1.0.0"
$versionCode = 100
$versionName = "1.0.0"

if (-not (Test-Path $store)) {
    Write-Host "Ainda nao existe a keystore de venda."
    Write-Host "Corra primeiro Criar-Keystore-Release.bat"
    Read-Host "Pressione Enter para fechar"
    exit 1
}

$pass = $env:CHORDBOOK_STORE_PASS
if ([string]::IsNullOrWhiteSpace($pass)) {
    $pass = Read-Host "Senha da keystore de venda"
}

Write-Host ""
Write-Host "ChordBook Lite $versionName — APK de venda"
Write-Host "Assinado com $store"

New-Item -ItemType Directory -Force -Path $out | Out-Null
New-Item -ItemType Directory -Force -Path (Join-Path $out "generated") | Out-Null
New-Item -ItemType Directory -Force -Path (Join-Path $out "classes") | Out-Null
New-Item -ItemType Directory -Force -Path (Join-Path $out "dex") | Out-Null

& (Join-Path $bt "aapt2.exe") compile --dir app\src\main\res -o (Join-Path $out "compiled.zip")
& (Join-Path $bt "aapt2.exe") link --auto-add-overlay -o (Join-Path $out "unsigned.apk") -I $androidJar --manifest app\src\main\AndroidManifest.xml -R (Join-Path $out "compiled.zip") -A ..\pwa --java (Join-Path $out "generated") --min-sdk-version 23 --target-sdk-version 36 --version-code $versionCode --version-name $versionName

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
& (Join-Path $bt "apksigner.bat") sign --ks $store --ks-key-alias upload --ks-pass "pass:$pass" --key-pass "pass:$pass" --out (Join-Path $out "ChordBook-Lite-1.0.0.apk") (Join-Path $out "aligned.apk")
& (Join-Path $bt "apksigner.bat") verify (Join-Path $out "ChordBook-Lite-1.0.0.apk")

Write-Host ""
Write-Host "APK de venda:" -ForegroundColor Green
Write-Host (Join-Path $out "ChordBook-Lite-1.0.0.apk")
Write-Host ""
Write-Host "Nao instale por cima do APK de teste (chave de debug). Exporte o backup, desinstale o teste e instale este."
Write-Host ""
Read-Host "Pressione Enter para fechar"
