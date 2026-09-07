$ErrorActionPreference = "Stop"

$jdk = "C:\Program Files\Eclipse Adoptium\jdk-17.0.19.10-hotspot\bin"
$keytool = Join-Path $jdk "keytool.exe"
$dir = Join-Path $env:USERPROFILE ".chordbook"
$store = Join-Path $dir "upload-keystore.jks"

if (-not (Test-Path $keytool)) {
    Write-Host "Nao encontrei o keytool em $keytool"
    exit 1
}

if (Test-Path $store) {
    Write-Host "Ja existe uma keystore de venda:"
    Write-Host $store
    Write-Host "Nao criei outra. Guarde a senha fora do computador se ainda nao o fez."
    exit 0
}

New-Item -ItemType Directory -Force -Path $dir | Out-Null

Write-Host "Vai criar a chave com que a Play e o APK de venda reconhecem o ChordBook Lite."
Write-Host "Se perder este ficheiro ou a senha, nao consegue atualizar o app na loja."
Write-Host ""

$pass = Read-Host "Senha da keystore (minimo 6 caracteres)"
if ([string]::IsNullOrWhiteSpace($pass) -or $pass.Length -lt 6) {
    Write-Host "Senha demasiado curta."
    exit 1
}

& $keytool -genkeypair -keystore $store -alias upload -keyalg RSA -keysize 2048 -validity 10000 -storepass $pass -keypass $pass -dname "CN=ChordBook Lite, OU=ChordBook, O=Paulo Roberto Ribeiro, C=BR"

if ($LASTEXITCODE -ne 0) {
    Write-Host "keytool falhou."
    exit 1
}

Write-Host ""
Write-Host "Keystore criada (fora do Git):"
Write-Host $store
Write-Host "Alias: upload"
Write-Host "Guarde a senha num gestor de senhas. Sem ela nao ha atualizacao na Play."
Write-Host ""
Read-Host "Pressione Enter para fechar"
