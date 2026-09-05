# ChordBook Lite

Projeto independente do nucleo leve do ChordBook. Nao depende do app Flutter antigo.

- App web: `pwa/`
- Casca Android (WebView): `pwa-android/`
- Rascunhos: `docs/`

O ChordBook antigo em `C:\Users\Jairo\Desktop\ChordBook\chordbook` permanece como backup e nao deve ser alterado a partir daqui.

## Rodar a PWA

```powershell
cd C:\Users\Jairo\Desktop\ChordBook-Lite\pwa
python -m http.server 5177
```

Abra `http://localhost:5177`.

## Gerar e instalar o APK de teste

```powershell
cd C:\Users\Jairo\Desktop\ChordBook-Lite\pwa-android
.\Atualizar-ChordBook.bat
```

O script empacota `..\pwa` no APK `ChordBook-Lite-debug.apk` e tenta instalar no celular via ADB.

O `applicationId` continua `com.jairo.chordbookpwa`, para atualizar o app ja instalado no celular.
