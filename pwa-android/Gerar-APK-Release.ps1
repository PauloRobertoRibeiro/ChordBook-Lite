param(
  [switch]$NoPause
)

$ErrorActionPreference = "Stop"

function Wait-Window {
  if (-not $NoPause) {
    Read-Host "Pressione Enter para fechar"
  }
}

function Invoke-Native {
  param([string]$File, [string[]]$Arguments)
  if (-not (Test-Path $File)) {
    throw "Nao encontrei: $File"
  }
  & $File @Arguments
  if ($LASTEXITCODE -ne 0) {
    throw "Falhou ($LASTEXITCODE): $File $($Arguments -join ' ')"
  }
}

try {
  $root = Split-Path -Parent $MyInvocation.MyCommand.Path
  if ([string]::IsNullOrWhiteSpace($root)) {
    $root = Get-Location | Select-Object -ExpandProperty Path
  }
  Set-Location $root

  $sdk = "C:\Users\Jairo\AppData\Local\Android\Sdk"
  $bt = Join-Path $sdk "build-tools\36.0.0"
  $androidJar = Join-Path $sdk "platforms\android-36\android.jar"
  $jdk = "C:\Program Files\Eclipse Adoptium\jdk-17.0.19.10-hotspot\bin"
  $store = Join-Path $env:USERPROFILE ".chordbook\upload-keystore.jks"
  $versionCode = 102
  $versionName = "1.1.2"
  $out = Join-Path $root "build\release-$versionName"

  Write-Host ""
  Write-Host "ChordBook Lite $versionName - APK de venda" -ForegroundColor Cyan

  if (-not (Test-Path $store)) {
    throw "Ainda nao existe a keystore de venda. Corra primeiro Criar-Keystore-Release.bat"
  }

  $pass = $env:CHORDBOOK_STORE_PASS
  if ([string]::IsNullOrWhiteSpace($pass)) {
    $pass = Read-Host "Senha da keystore de venda"
  }
  if ([string]::IsNullOrWhiteSpace($pass)) {
    throw "Senha vazia."
  }

  Write-Host "Assinado com $store"

  New-Item -ItemType Directory -Force -Path $out | Out-Null
  New-Item -ItemType Directory -Force -Path (Join-Path $out "generated") | Out-Null
  New-Item -ItemType Directory -Force -Path (Join-Path $out "classes") | Out-Null
  New-Item -ItemType Directory -Force -Path (Join-Path $out "dex") | Out-Null

  Invoke-Native (Join-Path $bt "aapt2.exe") @("compile", "--dir", "app\src\main\res", "-o", (Join-Path $out "compiled.zip"))
  Invoke-Native (Join-Path $bt "aapt2.exe") @(
    "link", "--auto-add-overlay",
    "-o", (Join-Path $out "unsigned.apk"),
    "-I", $androidJar,
    "--manifest", "app\src\main\AndroidManifest.xml",
    "-R", (Join-Path $out "compiled.zip"),
    "-A", "..\pwa",
    "--java", (Join-Path $out "generated"),
    "--min-sdk-version", "23",
    "--target-sdk-version", "36",
    "--version-code", "$versionCode",
    "--version-name", $versionName
  )

  $javaFiles = @("app\src\main\java\com\jairo\chordbookpwa\MainActivity.java") + @(Get-ChildItem (Join-Path $out "generated") -Recurse -Filter *.java | Select-Object -ExpandProperty FullName)
  $javacArgs = @("-classpath", $androidJar, "-d", (Join-Path $out "classes")) + $javaFiles
  Invoke-Native (Join-Path $jdk "javac.exe") $javacArgs

  Push-Location (Join-Path $out "classes")
  try {
    Invoke-Native (Join-Path $jdk "jar.exe") @("cf", (Join-Path $out "classes.jar"), ".")
  } finally {
    Pop-Location
  }

  Invoke-Native (Join-Path $bt "d8.bat") @("--lib", $androidJar, "--output", (Join-Path $out "dex"), (Join-Path $out "classes.jar"))

  Push-Location (Join-Path $out "dex")
  try {
    Invoke-Native (Join-Path $bt "aapt.exe") @("add", (Join-Path $out "unsigned.apk"), "classes.dex")
  } finally {
    Pop-Location
  }

  $releaseApk = Join-Path $out "ChordBook-Lite-$versionName.apk"
  Invoke-Native (Join-Path $bt "zipalign.exe") @("-f", "-p", "4", (Join-Path $out "unsigned.apk"), (Join-Path $out "aligned.apk"))
  Invoke-Native (Join-Path $bt "apksigner.bat") @(
    "sign",
    "--ks", $store,
    "--ks-key-alias", "upload",
    "--ks-pass", "pass:$pass",
    "--key-pass", "pass:$pass",
    "--out", $releaseApk,
    (Join-Path $out "aligned.apk")
  )
  Invoke-Native (Join-Path $bt "apksigner.bat") @("verify", $releaseApk)

  Write-Host ""
  Write-Host "APK de venda:" -ForegroundColor Green
  Write-Host $releaseApk
  Write-Host ""
  Write-Host "Nao instale por cima do APK de teste (chave de debug). Exporte o backup, desinstale o teste e instale este."
  $publicApk = Join-Path $root "..\pwa\ChordBook.apk"
  Copy-Item -Force $releaseApk $publicApk
  Write-Host "Copia publica: $publicApk"
  Write-Host ""
  Wait-Window
  exit 0
} catch {
  Write-Host ""
  Write-Host $_.Exception.Message -ForegroundColor Red
  Write-Host ""
  Wait-Window
  exit 1
}
