# ChordBook Lite

Projeto independente do núcleo leve do ChordBook. Não depende do app Flutter antigo.

- App web: `pwa/`
- Casca Android (WebView): `pwa-android/`
- Ficha de loja e política: `docs/loja/`
- Como instalar no grupo: `pwa/instalar.html`
- Comprar o APK (5 €): https://paulorobertoribeiro.github.io/ChordBook-Lite/comprar.html

O ChordBook antigo em `C:\Users\Jairo\Desktop\ChordBook\chordbook` permanece como backup e não deve ser alterado a partir daqui.

Versão de venda: **1.1.1** (`versionCode` 102). O `applicationId` continua `com.jairo.chordbookpwa`.

## Teste com o grupo

1. Gerar o APK: `pwa-android\Atualizar-ChordBook.bat`
   - Cópia para enviar: `Desktop\ChordBook-Lite-teste.apk`
2. No telemóvel Android, abra esse ficheiro e instale.
3. No computador, abra https://paulorobertoribeiro.github.io/ChordBook-Lite/ no Chrome ou Edge e instale a PWA.
4. As músicas não vão no APK. Quem monta o culto: **Mais → Exportar backup**. Cada músico: **Mais → Restaurar backup**.

Instruções para o grupo: página **Instalar e partilhar** no app, ou `pwa/instalar.html`.

## Rodar a PWA

```powershell
cd C:\Users\Jairo\Desktop\ChordBook-Lite\pwa
python -m http.server 5177
```

Abra `http://localhost:5177`.

## APK de teste (chave de debug)

Só para o celular de desenvolvimento e o teste do grupo. A Play Store não aceita este pacote.

```powershell
cd C:\Users\Jairo\Desktop\ChordBook-Lite\pwa-android
.\Atualizar-ChordBook.bat
```

## APK de venda (chave de release)

1. Uma vez: `pwa-android\Criar-Keystore-Release.bat` — a chave fica em `%USERPROFILE%\.chordbook\upload-keystore.jks`, fora do Git. Guarde a senha.
2. Gerar: `pwa-android\Gerar-APK-Release.bat`
3. Quem já tem o APK de teste precisa exportar o backup, desinstalar o teste e instalar o 1.1.1. Chaves diferentes não atualizam o mesmo app.

Textos da Play: `docs/loja/LISTAGEM.md`. Política no app: `pwa/privacy.html` (publique também em HTTPS para o Console).

Venda directa (sem esperar a Play): https://paulorobertoribeiro.github.io/ChordBook-Lite/comprar.html  
APK a enviar depois do pagamento: `Desktop\ChordBook-Lite-venda.apk`. PayPal/Bizum: edite `pwa/sale.js`.
