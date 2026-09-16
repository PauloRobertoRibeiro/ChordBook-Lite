# Ficha da Play Store — ChordBook Lite

Título (máx. 30 caracteres): `ChordBook Lite: cifras`

Título curto alternativo se couber: `ChordBook Lite`

Descrição curta (máx. 80 caracteres):
`Cifras, setlists e palco no celular e no tablet. Sem conta. Offline.`

## Descrição completa

ChordBook Lite é o caderno de cifras para quem toca no culto, no ensaio e no palco.

Guarde as músicas neste aparelho. Transponha o tom, ajuste o capo, monte o setlist do domingo e abra o modo palco com letra grande e acordes em destaque. Sem criar conta. No computador, você pode editar com um código e a autorização deste celular.

O que você faz no app

• Biblioteca com busca, favoritas, categorias e tons
• Colar cifra de sites como Cifra Club e acertar no editor
• Transpor, capo, tamanho da letra e rolagem
• Modo palco: fundo preto, cifra grande, passe para a próxima do setlist
• Setlists e programa de culto para enviar no WhatsApp
• Backup em arquivo JSON — a biblioteca é sua
• Ligar um computador com código e permissão no celular

Para quem é

Músicos de igreja, ensaiadores e quem precisa da cifra visível no palco, no celular ou no tablet, mesmo sem internet.

Privacidade

A biblioteca (cifras, setlists, equipe) fica neste aparelho. Não criamos conta nem enviamos o repertório para um servidor nosso. A internet entra quando você abre um site de cifras, YouTube ou WhatsApp, e quando liga um computador: nesse caso usamos PeerJS, STUN da Google e, se preciso, um servidor TURN só para os dois aparelhos se encontrarem. As cifras não ficam guardadas nesses serviços.

## Classificação / Data safety (preencher no Console)

- Categoria: Música e áudio
- Conteúdo: sem violência, sem anúncios, sem IAP no v1
- Recolhemos dados para a nossa empresa? **Não.** Não temos backend de utilizador.
- A biblioteca **não** é enviada para a nuvem.
- Quando o utilizador toca em ligar o computador, o app contacta serviços de terceiros só para a ligação:
  - PeerJS (`0.peerjs.com`) — sinalização do par
  - Google STUN (`stun.l.google.com`) — descoberta de rede
  - TURN da PeerJS — retransmissão se a rede bloquear o canal direto
  - unpkg.com — só se o script PeerJS local falhar
- IDs de sessão PeerJS são efémeros. Não são o repertório.
- No formulário Data safety: indique que **não recolhe dados** para si; se o Console obrigar a declarar rede, marque identificadores de dispositivo/sessão **só com a funcionalidade Computador**, partilhados com esses serviços, encriptados em trânsito (HTTPS / DTLS).
- Utilizadores podem apagar: Limpar dados ou desinstalar. O Android backup do sistema está desligado (`allowBackup=false`).

## Preço sugerido

Aplicativo pago, R$ 19,90 (ou o equivalente na Play). Sem subscrição no lançamento.

## Prints (obrigatório no Console)

Ainda tem de os tirar no telemóvel e no tablet e carregar na Play:

1. Biblioteca com busca e lista
2. Cifra com transposição
3. Modo palco
4. Agenda / ordem do culto
5. Configurações / Sobre

Gráfico de funcionalidade: `docs/loja/feature-graphic.png` (1024 × 500)

Ícone da loja: `pwa/icons/Icon-512.png` (512 × 512)

## Política pública (URL na Play)

https://paulorobertoribeiro.github.io/ChordBook-Lite/privacy.html

Publique de novo `pwa/privacy.html` no GitHub Pages se o texto local estiver mais novo que o site.

## Pacote a enviar

- **Não** envie `ChordBook-Lite-teste.apk` (chave de debug).
- Corra `pwa-android\Gerar-APK-Release.ps1` (keystore em `%USERPROFILE%\.chordbook\upload-keystore.jks`).
- Versão de venda: **1.1.1** (`versionCode` 102).
- Quem tem o APK de teste: exportar backup, desinstalar o teste, instalar o de venda.
