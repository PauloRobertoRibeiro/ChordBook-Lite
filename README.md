# ChordBook Lite

Projeto independente do núcleo leve do ChordBook. Não depende do app Flutter antigo.

- App web: `pwa/`
- Casca Android (WebView): `pwa-android/`
- Ficha de loja e política: `docs/loja/`

O ChordBook antigo em `C:\Users\Jairo\Desktop\ChordBook\chordbook` permanece como backup e não deve ser alterado a partir daqui.

Versão de venda: **1.0.0**. O `applicationId` continua `com.jairo.chordbookpwa`.

## Rodar a PWA

```powershell
cd C:\Users\Jairo\Desktop\ChordBook-Lite\pwa
python -m http.server 5177
```

Abra `http://localhost:5177`.

## APK de teste (chave de debug)

Só para o celular de desenvolvimento. A Play Store não aceita este pacote.

```powershell
cd C:\Users\Jairo\Desktop\ChordBook-Lite\pwa-android
.\Atualizar-ChordBook.bat
```

## APK de venda (chave de release)

1. Uma vez: `pwa-android\Criar-Keystore-Release.bat` — a chave fica em `%USERPROFILE%\.chordbook\upload-keystore.jks`, fora do Git. Guarde a senha.
2. Gerar: `pwa-android\Gerar-APK-Release.bat`
3. Quem já tem o APK de teste precisa exportar o backup, desinstalar o teste e instalar o 1.0.0. Chaves diferentes não atualizam o mesmo app.

Textos da Play: `docs/loja/LISTAGEM.md`. Política no app: `pwa/privacy.html` (publique também em HTTPS para o Console).
