const STORAGE_KEY = "chordbook.pwa.v1";
const APP_VERSION = "1.1.1";
const LOOK_KEY = "chordbook.look.v1";
const SETLIST_PLAY_KEY = "chordbook.setlistPlay.v1";
const LOOK_PRESETS = {
  night: { stageBg: "#0d100f", lyricColor: "#f5f8f6", chordColor: "#8ec5ff" },
  forest: { stageBg: "#10211c", lyricColor: "#e7f6f0", chordColor: "#5ee0c5" },
  gold: { stageBg: "#16130e", lyricColor: "#f4ead4", chordColor: "#ffd166" },
  paper: { stageBg: "#f7f1e4", lyricColor: "#1a1612", chordColor: "#c2410c" },
  contrast: { stageBg: "#000000", lyricColor: "#ffffff", chordColor: "#ffe14d" },
};
const LOOK_BG = ["#0d100f", "#000000", "#10211c", "#141a28", "#f7f1e4"];
const LOOK_LYRIC = ["#f5f8f6", "#ffffff", "#f4ead4", "#1a1612"];
const LOOK_CHORD = ["#8ec5ff", "#5ee0c5", "#ffd166", "#ff8b7b", "#c2410c", "#2f54f5"];
const LOOK_SAMPLE = [
  "[G]Quando a noite vem, eu [D/F#]lembro",
  "[Em7]Tua voz me chama para [Cadd9]perto",
  "",
  "[G]Eu me [D]escondo em [C]Ti",
];
const NOTES = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
const FLAT_TO_SHARP = { Db: "C#", Eb: "D#", Gb: "F#", Ab: "G#", Bb: "A#" };
const EASY_KEYS = ["G", "C", "D", "A", "E"];
const CHORD_FIND_RE = /[A-G](?:#|b)?(?:maj7|7M|M7|maj|min|sus|dim|aug|add|m)?\d*(?:sus\d*)?(?:\/[A-G](?:#|b)?(?:maj7|7M|M7|maj|min|m)?\d*)?/gi;
const CHORD_TOKEN_RE = /^(?:[A-G](?:#|b)?(?:maj7|7M|M7|maj|min|sus|dim|aug|add|m)?\d*(?:sus\d*)?(?:\/[A-G](?:#|b)?(?:maj7|7M|M7|maj|min|m)?\d*)?)$/i;
const CHORD_SHAPES = {
  C: "x32010", C7: "x32310", Cm: "x31013", Cm7: "x31313", Cmaj7: "x32000", Cadd9: "x32030", Csus4: "x33010",
  D: "xx0232", D7: "xx0212", Dm: "xx0231", Dm7: "xx0211", Dmaj7: "xx0222", Dsus4: "xx0233", Dadd9: "x54030",
  E: "022100", E7: "020100", Em: "022000", Em7: "022030", Emaj7: "021100", Esus4: "022200",
  F: "133211", F7: "131211", Fm: "133111", Fm7: "131111", Fmaj7: "133210", Fadd9: "103213",
  G: "320003", G7: "320001", Gm: "310033", Gm7: "310031", Gmaj7: "320002", Gsus4: "330013", Gadd9: "320203",
  A: "x02220", A7: "x02020", Am: "x02210", Am7: "x02010", Amaj7: "x02120", Asus4: "x02230", Aadd9: "x02420",
  B: "x24442", B7: "x21202", Bm: "x24432", Bm7: "x24232", Bmaj7: "x24342",
  "C#": "x46664", "C#7": "x46464", "C#m": "x46654", "C#m7": "x46454", "C#maj7": "x46564",
  "D#": "x68886", "D#7": "x68686", "D#m": "x68876", "D#m7": "x68676",
  "F#": "244322", "F#7": "242322", "F#m": "244222", "F#m7": "242222", "F#maj7": "243322",
  "G#": "466544", "G#7": "464544", "G#m": "466444", "G#m7": "464444",
  "A#": "x13331", "A#7": "x13131", "A#m": "x13321", "A#m7": "x13121",
  Bb: "x13331", Bb7: "x13131", Bbm: "x13321", Bbm7: "x13121", Bbmaj7: "x13231",
  Eb: "x68886", Ebm: "x68876", Ab: "466544", Abm: "466444", Db: "x46664", Dbm: "x46654",
};
const I18N = {
  pt: {
    "brand.tagline": "Suas músicas sempre com você",
    "nav.songs": "Músicas",
    "nav.setlists": "Agenda",
    "nav.chart": "Cifra",
    "nav.stage": "Palco",
    "nav.more": "Mais",
    "nav.settings": "Configurações",
    "nav.libraryBack": "‹ Biblioteca",
    "nav.newSong": "Nova música",
    "nav.exportLibrary": "Exportar biblioteca",
    "nav.importFile": "Importar arquivo",
    "search.label": "Buscar",
    "search.placeholder": "Buscar músicas, autor, tom...",
    "search.sitesPlaceholder": "Nome da música ou artista...",
    "search.library": "ChordBook",
    "search.sites": "Sites",
    "search.where": "Onde buscar",
    "search.sitesLead": "Abra o site, copie a cifra e volte para colar.",
    "search.sitesEmpty": "Escreva o nome da música ou do artista.",
    "search.sitesOpen": "Buscar \"{q}\"",
    "search.sitesHome": "Abrir {name}",
    "search.sitesCount": "Busca nos sites",
    "search.thenPaste": "Já copiei: colar cifra",
    "search.trySites": "Buscar nos sites",
    "more.sampleShort": "Exemplo",
    "home.title": "Sua música",
    "home.lead": "Biblioteca, palco e programa de culto para tocar sem perder tempo.",
    "home.library": "Biblioteca",
    "home.libraryLead": "Todas as cifras",
    "home.stageLead": "Tela para tocar",
    "home.setlistsLead": "Agenda e ordem das músicas",
    "home.files": "Arquivos",
    "home.filesLead": "Importar backup",
    "home.newSong": "+ Nova música",
    "home.seeAll": "Ver todas",
    "home.empty": "Nenhuma cifra ainda.",
    "home.open": "Abrir",
    "library.favorites": "Favoritas",
    "library.recent": "Recentes",
    "library.editSelected": "Editar selecionada",
    "library.filter": "Filtro da biblioteca",
    "library.filterCategory": "Filtrar categoria",
    "library.filterKey": "Filtrar tom",
    "library.allCategories": "Todas",
    "library.allKeys": "Todos",
    "library.allSongs": "Todas",
    "library.categories": "Categorias",
    "library.keys": "Tons",
    "library.emptyKey": "Nenhuma música neste tom.",
    "library.countOne": "{n} cifra",
    "library.countMany": "{n} cifras",
    "library.favOne": "{n} favorita",
    "library.favMany": "{n} favoritas",
    "library.empty": "Nenhuma cifra encontrada.",
    "library.emptyStart": "Nenhuma cifra ainda. Toque em +.",
    "library.emptyFavorites": "Nenhuma cifra favorita.",
    "library.emptyRecent": "Toque no nome de uma música para tocar. As recentes aparecem aqui.",
    "library.favorite": "Favorito",
    "library.unfavorite": "Remover favorito",
    "preview.edit": "Editar",
    "preview.more": "Mais",
    "preview.youtube": "YouTube",
    "editor.title": "Editar música",
    "editor.lead": "Preencha os dados e escreva a letra com os acordes.",
    "editor.name": "Nome da música",
    "editor.namePh": "Ex.: Esperança Viva",
    "editor.artist": "Autor / artista",
    "editor.artistPh": "Ex.: Ministério de louvor",
    "editor.category": "Categoria",
    "editor.categoryPh": "Ex.: Louvor, Celebração",
    "editor.capo": "Capo",
    "editor.cue": "Recado no palco",
    "editor.cuePh": "Ex.: entra no 2. verso",
    "editor.lyrics": "Letra e cifras",
    "editor.viewChart": "Ver cifra",
    "editor.duplicate": "Duplicar",
    "editor.delete": "Excluir",
    "paste.open": "Colar cifra",
    "paste.title": "Trazer uma música",
    "paste.lead": "Abra um hinário ou site, copie a cifra e cole abaixo. Depois acerte frases e acordes.",
    "paste.sites": "Onde copiar",
    "paste.apply": "Trazer para o editor",
    "paste.clipboard": "Colar da área de transferência",
    "paste.placeholder": "Cole aqui a cifra copiada...",
    "paste.empty": "Não encontrei letra nem acordes para colar.",
    "paste.ready": "Cifra colada. Acerte o que precisar e salve.",
    "paste.clipboardFail": "Cole com Ctrl+V ou toque longo no campo.",
    "common.back": "Voltar",
    "common.save": "Salvar",
    "song.untitled": "Canção",
    "song.noTitle": "Sem título",
    "song.transposeDown": "Tom -",
    "song.transposeUp": "Tom +",
    "song.transpose": "Transpor tom",
    "song.autoScroll": "Rolagem automática",
    "song.focus": "Modo foco",
    "song.showChords": "Mostrar acordes",
    "song.showLyrics": "Mostrar letra",
    "song.stageGo": "Modo palco",
    "song.chords": "Acordes",
    "song.scroll": "Rolagem",
    "song.scrollStop": "Parar",
    "song.list": "Lista",
    "song.play": "Tocar",
    "song.edit": "Editar música",
    "song.editShort": "Editar",
    "song.share": "Compartilhar",
    "song.toolsPull": "Puxar capo e letra",
    "song.stageMode": "Modo palco",
    "song.addToSetlist": "Adicionar ao setlist",
    "song.tools": "Ajustes",
    "song.key": "Tom {key}",
    "song.capoChip": "Capo {capo}",
    "song.sounds": "soa {key}",
    "stage.mode": "Modo Palco",
    "stage.menu": "Menu",
    "stage.exit": "Voltar",
    "stage.list": "Lista",
    "stage.close": "Fechar",
    "stage.now": "agora",
    "stage.listHint": "Toque para mudar de música.",
    "stage.setlistLabel": "Músicas de hoje",
    "stage.recentLabel": "Músicas recentes",
    "stage.prev": "Anterior",
    "stage.next": "Próxima",
    "stage.end": "Fim do setlist.",
    "stage.start": "Início do setlist.",
    "stage.after": "depois: {title}",
    "stage.startScroll": "Rolagem",
    "stage.stopScroll": "Parar",
    "stage.focus": "Foco",
    "stage.speed": "Velocidade {n}%",
    "stage.searchPh": "Buscar músicas...",
    "stage.noMatch": "Nenhuma música encontrada.",
    "stage.noScroll": "A cifra já cabe na tela.",
    "setlists.new": "Novo evento",
    "setlists.mine": "Todos",
    "setlists.recent": "Recentes",
    "setlists.filter": "Filtro de setlists",
    "setlists.countOne": "{n} evento",
    "setlists.countMany": "{n} eventos",
    "setlists.recentOne": "{n} recente",
    "setlists.recentMany": "{n} recentes",
    "setlists.empty": "Nenhum evento criado.",
    "setlists.emptyRecent": "Abra um setlist no palco para aparecer aqui.",
    "setlists.emptyList": "Sem músicas ainda",
    "setlists.songsOne": "{n} música",
    "setlists.songsMany": "{n} músicas",
    "setlists.edit": "Editar setlist",
    "setlists.editLead": "Ordem das músicas para o dia.",
    "setlists.name": "Nome do setlist",
    "setlists.notes": "Notas",
    "setlists.openStage": "Tocar",
    "setlists.playTitle": "Como quer ver as músicas?",
    "setlists.playLead": "A cifra é clara para ensaiar. O palco é escuro para projetar.",
    "setlists.playChart": "Cifra",
    "setlists.playChartHint": "Tela clara, com capo e edição",
    "setlists.playStage": "Palco",
    "setlists.playStageHint": "Tela escura, para o culto",
    "setlists.playExit": "Sair",
    "setlists.playDone": "Fim",
    "setlists.save": "Salvar",
    "setlists.delete": "Excluir",
    "setlists.inList": "No setlist",
    "setlists.noSongs": "Nenhuma música neste setlist.",
    "setlists.addSong": "Adicionar",
    "setlists.remove": "Apagar",
    "setlists.details": "Dados do evento",
    "setlists.addTitle": "Acrescentar música",
    "setlists.allAdded": "Todas as músicas já foram adicionadas.",
    "setlists.needSongs": "Adicione músicas ao setlist para tocar.",
    "setlists.saved": "Programa salvo.",
    "setlists.added": "Adicionada a {title}.",
    "setlists.already": "Já está neste setlist.",
    "setlists.deleteConfirm": "Excluir o evento \"{title}\"?",
    "service.title": "Programa",
    "service.lead": "Monte a equipe, preencha o evento e escolha as músicas.",
    "service.name": "Nome do evento",
    "service.namePh": "Ex.: Ensaio, culto, show",
    "service.date": "Data",
    "service.opening": "Abertura (prelúdio, quem toca)",
    "service.openingPh": "Ex.: Piano — Ana",
    "service.leader": "Dirigente",
    "service.announcements": "Anúncios e leitura da palavra",
    "service.worship": "Grupo de adoração",
    "service.worshipPh": "Ex.: Ministério de louvor",
    "service.songs": "Grupo de adoração — músicas",
    "service.preacher": "Predicador",
    "service.preacherRole": "Pastor ou convidado",
    "service.pastor": "Pastor",
    "service.guest": "Convidado",
    "service.communion": "Santa Ceia",
    "service.communionPh": "Ex.: Pastor João",
    "service.send": "Enviar programa",
    "service.whatsapp": "WhatsApp",
    "service.copied": "Programa copiado. Cole no WhatsApp ou no grupo.",
    "service.shared": "Programa enviado.",
    "service.copyFail": "Não consegui copiar. Use o botão WhatsApp para enviar.",
    "service.heading": "PROGRAMA",
    "service.itemOpening": "1. ABERTURA (Prelúdio)",
    "service.itemLeader": "2. DIRIGENTE",
    "service.itemAnnouncements": "3. ANÚNCIOS E LEITURA DA PALAVRA",
    "service.itemWorship": "4. GRUPO DE ADORAÇÃO",
    "service.itemPreacher": "5. PREDICADOR",
    "service.itemCommunion": "6. SANTA CEIA",
    "service.noSongs": "Ainda sem músicas.",
    "service.key": "Tom {key}",
    "service.tba": "a definir",
    "service.defaultTitle": "Evento",
    "agenda.hubEvents": "Eventos",
    "agenda.hubTeam": "Equipe",
    "agenda.hubMonth": "Mês",
    "agenda.settings": "Personalizar campos",
    "agenda.time": "Hora",
    "agenda.field.type": "Tipo",
    "agenda.field.speaker": "Quem predica",
    "agenda.field.host": "Preside",
    "agenda.field.theme": "Tema da mensagem",
    "agenda.field.scripture": "Referência bíblica",
    "agenda.field.musicLead": "Dirigente Alabanza",
    "agenda.field.voices": "Vozes",
    "agenda.field.instruments": "Instrumentos",
    "agenda.field.opening": "Abertura",
    "agenda.field.communion": "Santa Ceia",
    "agenda.field.notes": "Instruções",
    "agenda.field.prelude": "Prelúdio",
    "agenda.field.reading": "Leitura inicial",
    "agenda.field.readingVerse": "Texto da leitura",
    "agenda.field.sundaySchool": "Apresentação Escola Dominical",
    "agenda.field.prayer": "Tempo de oração",
    "agenda.field.postlude": "Postlúdio",
    "agenda.field.streamTitle": "Título (streaming)",
    "agenda.field.streamDesc": "Descrição (streaming)",
    "agenda.field.custom": "Campo novo",
    "agenda.section.schedule": "Cronograma",
    "agenda.section.order": "Ordem",
    "agenda.section.word": "Tempo de pregação",
    "agenda.section.music": "Grupo de alabanza",
    "agenda.section.songs": "Alabanza",
    "agenda.section.stream": "Streaming",
    "agenda.sectionsTitle": "Títulos das secções",
    "agenda.fieldsTitle": "Campos do evento",
    "agenda.addField": "Adicionar campo",
    "agenda.fieldLabel": "Nome do campo",
    "agenda.kind.text": "Texto",
    "agenda.kind.people": "Pessoas da equipe",
    "agenda.kind.textarea": "Texto longo",
    "agenda.peopleOne": "Uma pessoa",
    "agenda.peopleMany": "Várias pessoas",
    "agenda.pickPeople": "Escolher da equipe",
    "agenda.noTeam": "Monte a equipe primeiro para marcar nomes com um toque.",
    "agenda.goTeam": "Ir para Equipe",
    "agenda.addPerson": "Adicionar",
    "agenda.searchSongs": "Buscar músicas...",
    "agenda.searchPeople": "Buscar na equipe...",
    "agenda.donePick": "Pronto",
    "agenda.pickSongs": "Marque as canções do programa",
    "agenda.orderTitle": "Ordem do culto",
    "agenda.serviceDate": "Data do culto",
    "agenda.order.praise": "Alabanza",
    "agenda.order.finalHymn": "Hino final",
    "agenda.markFinal": "Passar para hino final",
    "agenda.unmarkFinal": "Voltar para alabanza",
    "agenda.includeMoment": "Incluir neste culto",
    "agenda.momentNote": "Nota (opcional)",
    "agenda.orderHint": "Marque só o que este culto vai ter. O resto não aparece na ordem.",
    "agenda.slotFinal": "Final",
    "agenda.monthPrev": "Mês anterior",
    "agenda.monthNext": "Mês seguinte",
    "agenda.dayEmpty": "Nenhum evento neste dia.",
    "agenda.dayCreate": "Criar evento neste dia",
    "agenda.savedSettings": "Campos salvos.",
    "agenda.week0": "D",
    "agenda.week1": "S",
    "agenda.week2": "T",
    "agenda.week3": "Q",
    "agenda.week4": "Q",
    "agenda.week5": "S",
    "agenda.week6": "S",
    "team.emptyTitle": "Ainda não há integrantes",
    "team.emptyLead": "Cada um monta a equipe do seu jeito: duas pessoas ou vinte, com as funções que precisar.",
    "team.add": "Adicionar integrante",
    "team.edit": "Editar integrante",
    "team.name": "Nome",
    "team.namePh": "Ex.: Ana",
    "team.roles": "Funções",
    "team.rolesLead": "Toque para marcar. Pode criar outras.",
    "team.rolePh": "Nova função",
    "team.note": "Nota",
    "team.save": "Salvar",
    "team.delete": "Remover da equipe",
    "team.deleteConfirm": "Remover {name} da equipe?",
    "team.countOne": "{n} integrante",
    "team.countMany": "{n} integrantes",
    "team.role.voice": "Voz",
    "team.role.guitar": "Guitarra",
    "team.role.keys": "Teclado",
    "team.role.drums": "Bateria",
    "team.role.bass": "Baixo",
    "team.role.tech": "Técnico",
    "team.needed": "Escreva o nome.",
    "team.saved": "Integrante salvo.",
    "more.lead": "Ajustes e cópias de segurança.",
    "more.appearance": "Aparência",
    "more.theme": "Tema",
    "more.themeLightShort": "Claro",
    "more.themeDarkShort": "Escuro",
    "more.themeAuto": "Automático",
    "more.features": "Funcionalidades",
    "more.data": "Dados",
    "more.clear": "Limpar dados",
    "more.clearConfirm": "Apagar todas as músicas e setlists deste aparelho?",
    "more.about": "Sobre",
    "more.aboutText": "Cifras, setlists e modo palco neste aparelho. Sem conta. Pode ligar um computador com a sua autorização.",
    "more.aboutLegal": "Os dados ficam neste celular. Um computador só entra com o código e a sua permissão. Exporte um backup antes de desinstalar.",
    "more.version": "Versão {v}",
    "more.privacy": "Política de privacidade",
    "more.buy": "Comprar app Android (5 €)",
    "more.install": "Instalar e partilhar",
    "more.font": "Tamanho da letra",
    "more.fontDefault": "Tamanho da letra padrão",
    "more.shortcuts": "Atalhos",
    "more.other": "Outras opções",
    "more.restore": "Restaurar backup",
    "more.language": "Idioma",
    "more.paste": "Trazer uma música",
    "more.backups": "Cópias de segurança",
    "more.sample": "Carregar exemplo",
    "more.exportSong": "Exportar cifra atual",
    "more.exportAll": "Exportar backup",
    "more.import": "Importar músicas",
    "sync.title": "Computador",
    "sync.lead": "Abra o ChordBook no computador, mostre o código e autorize neste celular. Depois edite lá e use aqui.",
    "sync.showCode": "Mostrar código neste computador",
    "sync.codeLabel": "Código do computador",
    "sync.connect": "Ligar ao computador",
    "sync.stop": "Desligar",
    "sync.hostTitle": "Editar neste computador",
    "sync.hostLead": "No celular, abra ChordBook → Mais → Computador e digite este código. Depois toque em Permitir.",
    "sync.sameWifi": "Os dois aparelhos precisam de internet. Na mesma Wi-Fi funciona melhor.",
    "sync.authTitle": "Permitir este computador?",
    "sync.authLead": "Ele vai ver e alterar as cifras deste celular. Só aceite se foi você que abriu o ChordBook no computador.",
    "sync.allow": "Permitir",
    "sync.deny": "Recusar",
    "sync.waiting": "Aguardando o celular…",
    "sync.waitingAuth": "Aguardando permissão no celular…",
    "sync.joining": "A ligar…",
    "sync.connected": "Ligado. O que você salvar num lado aparece no outro.",
    "sync.disconnected": "Ligação encerrada.",
    "sync.denied": "O celular recusou este computador.",
    "sync.needCode": "Digite o código de 6 números que aparece no computador.",
    "sync.badCode": "Código inválido.",
    "sync.fail": "Não foi possível ligar. Confira a internet e tente de novo na mesma Wi-Fi.",
    "sync.received": "Biblioteca recebida do celular.",
    "sync.merged": "Juntei as cifras dos dois lados.",
    "sync.keptLocal": "O celular estava sem cifras. Mantive as daqui e enviei-as para o celular.",
    "sync.sent": "Alterações enviadas ao celular.",
    "sync.bannerIdle": "Edite as cifras do celular neste computador.",
    "sync.bannerStart": "Começar",
    "sync.bannerWait": "No celular: Mais → Computador → {code}",
    "sync.bannerOn": "Ligado ao celular",
    "sync.bannerPhone": "Ligado ao computador",
    "sync.bannerOpen": "Ver código",
    "sync.peerBusy": "Esse código já está em uso. Gerando outro…",
    "more.ready": "Pronto.",
    "more.themeLight": "Tema claro",
    "more.themeDark": "Tema escuro",
    "more.themeNamedLight": "Tema: claro",
    "more.themeNamedDark": "Tema: escuro",
    "look.title": "Visual do palco",
    "look.kicker": "Como fica no palco",
    "look.hint": "Ajuste embaixo. A cifra em cima muda na hora. Só grava se você quiser.",
    "look.dirty": "Ainda não salvo. Você pode descartar ou salvar.",
    "look.preset": "Estilo",
    "look.night": "Noite",
    "look.forest": "Bosque",
    "look.gold": "Âmbar",
    "look.paper": "Papel",
    "look.contrast": "Contraste",
    "look.screen": "Tela",
    "look.lyrics": "Letra",
    "look.chords": "Cifra",
    "look.gap": "Espaço",
    "look.gapTight": "Junto",
    "look.gapNormal": "Normal",
    "look.gapLoose": "Folgado",
    "look.save": "Salvar visual",
    "look.discard": "Descartar",
    "look.saved": "Visual do palco salvo.",
    "look.reverted": "Voltei ao visual salvo.",
    "capo.suggestion": "Sugestão: Capo {capo} · {shape}",
    "capo.applied": "Capo {capo} · formas em {shape}",
    "capo.open": "Formas em {shape}",
    "capo.use": "Usar",
    "capo.short": "Capo {capo}",
    "chords.title": "Acordes",
    "chords.close": "Fechar",
    "chords.empty": "Nenhum acorde nesta cifra.",
    "msg.saved": "Música salva.",
    "msg.saveFail": "Não deu para gravar. Libere espaço neste aparelho ou exporte um backup.",
    "msg.copied": "Música copiada para compartilhar.",
    "msg.copyFail": "Não consegui copiar. Baixei um arquivo da música.",
    "msg.sample": "Adicionar cifras de exemplo mesmo assim?",
    "msg.sampleExists": "Os exemplos já estão na biblioteca.",
    "msg.noSong": "Nenhuma cifra selecionada.",
    "msg.imported": "Importado: {result}",
    "msg.importFail": "Não foi possível importar: {error}",
    "msg.file": "Arquivo gerado: {name}",
    "msg.deleteSong": "Excluir \"{title}\"?",
    "msg.cleared": "Biblioteca apagada.",
    "aria.nav": "Navegação principal",
    "aria.sections": "Seções",
    "aria.menu": "Menu principal",
    "aria.mobileNav": "Navegação do celular",
  },
  es: {
    "brand.tagline": "Tus canciones siempre contigo",
    "nav.songs": "Canciones",
    "nav.setlists": "Agenda",
    "nav.chart": "Cifra",
    "nav.stage": "Escenario",
    "nav.more": "Más",
    "nav.settings": "Ajustes",
    "nav.libraryBack": "‹ Biblioteca",
    "nav.newSong": "Nueva canción",
    "nav.exportLibrary": "Exportar biblioteca",
    "nav.importFile": "Importar archivo",
    "search.label": "Buscar",
    "search.placeholder": "Buscar canción, artista o tono...",
    "search.sitesPlaceholder": "Nombre de la canción o artista...",
    "search.library": "ChordBook",
    "search.sites": "Sitios",
    "search.where": "Dónde buscar",
    "search.sitesLead": "Abra el sitio, copie la cifra y vuelva para pegarla.",
    "search.sitesEmpty": "Escriba el nombre de la canción o del artista.",
    "search.sitesOpen": "Buscar \"{q}\"",
    "search.sitesHome": "Abrir {name}",
    "search.sitesCount": "Búsqueda en sitios",
    "search.thenPaste": "Ya copié: pegar cifra",
    "search.trySites": "Buscar en los sitios",
    "more.sampleShort": "Ejemplo",
    "home.title": "Tu música",
    "home.lead": "Biblioteca, escenario y programa de culto para tocar sin perder tiempo.",
    "home.library": "Biblioteca",
    "home.libraryLead": "Todas las cifras",
    "home.stageLead": "Pantalla para tocar",
    "home.setlistsLead": "Orden del culto",
    "home.files": "Archivos",
    "home.filesLead": "Importar copia",
    "home.newSong": "+ Nueva canción",
    "home.seeAll": "Ver todas",
    "home.empty": "Todavía no hay cifras.",
    "home.open": "Abrir",
    "library.favorites": "Favoritas",
    "library.recent": "Recientes",
    "library.editSelected": "Editar seleccionada",
    "library.filter": "Filtro de la biblioteca",
    "library.filterCategory": "Filtrar categoría",
    "library.filterKey": "Filtrar tono",
    "library.allCategories": "Todas",
    "library.allKeys": "Todos",
    "library.allSongs": "Todas",
    "library.categories": "Categorías",
    "library.keys": "Tonos",
    "library.emptyKey": "Ninguna canción en este tono.",
    "library.countOne": "{n} cifra",
    "library.countMany": "{n} cifras",
    "library.favOne": "{n} favorita",
    "library.favMany": "{n} favoritas",
    "library.empty": "No se encontraron cifras.",
    "library.emptyStart": "Todavía no hay cifras. Pulse +.",
    "library.emptyFavorites": "No hay cifras favoritas.",
    "library.emptyRecent": "Toque el nombre de una canción para tocar. Las recientes aparecen aquí.",
    "library.favorite": "Favorito",
    "library.unfavorite": "Quitar favorito",
    "preview.edit": "Editar",
    "preview.more": "Más",
    "preview.youtube": "YouTube",
    "editor.title": "Editar canción",
    "editor.lead": "Completa los datos y escribe la letra con los acordes.",
    "editor.name": "Nombre de la canción",
    "editor.namePh": "Ej.: Esperanza Viva",
    "editor.artist": "Autor / artista",
    "editor.artistPh": "Ej.: Ministerio de alabanza",
    "editor.category": "Categoría",
    "editor.categoryPh": "Ej.: Alabanza, Celebración",
    "editor.capo": "Cejilla",
    "editor.cue": "Recado en el escenario",
    "editor.cuePh": "Ej.: entra en el 2. verso",
    "editor.lyrics": "Letra y cifras",
    "editor.viewChart": "Ver cifra",
    "editor.duplicate": "Duplicar",
    "editor.delete": "Eliminar",
    "paste.open": "Pegar cifra",
    "paste.title": "Traer una canción",
    "paste.lead": "Abra un himnario o sitio, copie la cifra y péguela abajo. Luego ajuste frases y acordes.",
    "paste.sites": "Dónde copiar",
    "paste.apply": "Traer al editor",
    "paste.clipboard": "Pegar del portapapeles",
    "paste.placeholder": "Pegue aquí la cifra copiada...",
    "paste.empty": "No encontré letra ni acordes para pegar.",
    "paste.ready": "Cifra pegada. Ajuste lo que haga falta y guarde.",
    "paste.clipboardFail": "Pegue con Ctrl+V o toque largo en el campo.",
    "common.back": "Volver",
    "common.save": "Guardar",
    "song.untitled": "Canción",
    "song.noTitle": "Sin título",
    "song.transposeDown": "Tono -",
    "song.transposeUp": "Tono +",
    "song.transpose": "Transportar tono",
    "song.autoScroll": "Desplazamiento automático",
    "song.focus": "Modo foco",
    "song.showChords": "Mostrar acordes",
    "song.showLyrics": "Mostrar letra",
    "song.stageGo": "Modo escenario",
    "song.chords": "Acordes",
    "song.scroll": "Desplazar",
    "song.scrollStop": "Parar",
    "song.list": "Lista",
    "song.play": "Tocar",
    "song.edit": "Editar canción",
    "song.editShort": "Editar",
    "song.share": "Compartir",
    "song.toolsPull": "Deslizar cejilla y letra",
    "song.stageMode": "Modo escenario",
    "song.addToSetlist": "Añadir al setlist",
    "song.tools": "Ajustes",
    "song.key": "Tono {key}",
    "song.capoChip": "Cejilla {capo}",
    "song.sounds": "suena {key}",
    "stage.mode": "Modo escenario",
    "stage.menu": "Menú",
    "stage.exit": "Volver",
    "stage.list": "Lista",
    "stage.close": "Cerrar",
    "stage.now": "ahora",
    "stage.listHint": "Toque para cambiar de canción.",
    "stage.setlistLabel": "Canciones de hoy",
    "stage.recentLabel": "Canciones recientes",
    "stage.prev": "Anterior",
    "stage.next": "Siguiente",
    "stage.end": "Fin del setlist.",
    "stage.start": "Inicio del setlist.",
    "stage.after": "después: {title}",
    "stage.startScroll": "Desplazar",
    "stage.stopScroll": "Parar",
    "stage.focus": "Foco",
    "stage.speed": "Velocidad {n}%",
    "stage.searchPh": "Buscar canciones...",
    "stage.noMatch": "No se encontraron canciones.",
    "stage.noScroll": "La cifra ya cabe en pantalla.",
    "setlists.new": "Nuevo evento",
    "setlists.mine": "Todos",
    "setlists.recent": "Recientes",
    "setlists.filter": "Filtro de setlists",
    "setlists.countOne": "{n} evento",
    "setlists.countMany": "{n} eventos",
    "setlists.recentOne": "{n} reciente",
    "setlists.recentMany": "{n} recientes",
    "setlists.empty": "Ningún evento creado.",
    "setlists.emptyRecent": "Abre un setlist en el escenario para verlo aquí.",
    "setlists.emptyList": "Todavía sin canciones",
    "setlists.songsOne": "{n} canción",
    "setlists.songsMany": "{n} canciones",
    "setlists.edit": "Editar setlist",
    "setlists.editLead": "Orden de las canciones del día.",
    "setlists.name": "Nombre del setlist",
    "setlists.notes": "Notas",
    "setlists.openStage": "Tocar",
    "setlists.playTitle": "¿Cómo quiere verlas?",
    "setlists.playLead": "La cifra es clara para ensayar. El escenario es oscuro para proyectar.",
    "setlists.playChart": "Cifra",
    "setlists.playChartHint": "Pantalla clara, con cejilla y edición",
    "setlists.playStage": "Escenario",
    "setlists.playStageHint": "Pantalla oscura, para el culto",
    "setlists.playExit": "Salir",
    "setlists.playDone": "Fin",
    "setlists.save": "Guardar",
    "setlists.delete": "Eliminar",
    "setlists.inList": "En el setlist",
    "setlists.noSongs": "Ninguna canción en este setlist.",
    "setlists.addSong": "Añadir",
    "setlists.remove": "Borrar",
    "setlists.details": "Datos del evento",
    "setlists.addTitle": "Añadir canción",
    "setlists.allAdded": "Todas las canciones ya fueron añadidas.",
    "setlists.needSongs": "Añade canciones al setlist para tocar.",
    "setlists.saved": "Programa guardado.",
    "setlists.added": "Añadida a {title}.",
    "setlists.already": "Ya está en este setlist.",
    "setlists.deleteConfirm": "¿Eliminar el evento \"{title}\"?",
    "service.title": "Programa",
    "service.lead": "Arme el equipo, complete el evento y elija las canciones.",
    "service.name": "Nombre del evento",
    "service.namePh": "Ej.: Ensayo, culto, concierto",
    "service.date": "Fecha",
    "service.opening": "Apertura (preludio, quién toca)",
    "service.openingPh": "Ej.: Piano — Ana",
    "service.leader": "Dirigente",
    "service.announcements": "Anuncios y lectura de la palabra",
    "service.worship": "Grupo de adoración",
    "service.worshipPh": "Ej.: Ministerio de alabanza",
    "service.songs": "Grupo de adoración — canciones",
    "service.preacher": "Predicador",
    "service.preacherRole": "Pastor o invitado",
    "service.pastor": "Pastor",
    "service.guest": "Invitado",
    "service.communion": "Santa Cena",
    "service.communionPh": "Ej.: Pastor Juan",
    "service.send": "Enviar programa",
    "service.whatsapp": "WhatsApp",
    "service.copied": "Programa copiado. Péguelo en WhatsApp o en el grupo.",
    "service.shared": "Programa enviado.",
    "service.copyFail": "No pude copiar. Use el botón WhatsApp para enviar.",
    "service.heading": "PROGRAMA",
    "service.itemOpening": "1. APERTURA (Preludio)",
    "service.itemLeader": "2. DIRIGENTE",
    "service.itemAnnouncements": "3. ANUNCIOS Y LECTURA DE LA PALABRA",
    "service.itemWorship": "4. GRUPO DE ADORACIÓN",
    "service.itemPreacher": "5. PREDICADOR",
    "service.itemCommunion": "6. SANTA CENA",
    "service.noSongs": "Todavía sin canciones.",
    "service.key": "Tono {key}",
    "service.tba": "por definir",
    "service.defaultTitle": "Evento",
    "agenda.hubEvents": "Eventos",
    "agenda.hubTeam": "Equipo",
    "agenda.hubMonth": "Mes",
    "agenda.settings": "Personalizar campos",
    "agenda.time": "Hora",
    "agenda.field.type": "Tipo",
    "agenda.field.speaker": "Quién predica",
    "agenda.field.host": "Preside",
    "agenda.field.theme": "Tema del mensaje",
    "agenda.field.scripture": "Referencia bíblica",
    "agenda.field.musicLead": "Dirigente Alabanza",
    "agenda.field.voices": "Voces",
    "agenda.field.instruments": "Instrumentos",
    "agenda.field.opening": "Apertura",
    "agenda.field.communion": "Santa Cena",
    "agenda.field.notes": "Instrucciones",
    "agenda.field.prelude": "Preludio",
    "agenda.field.reading": "Lectura inicial",
    "agenda.field.readingVerse": "Texto de la lectura",
    "agenda.field.sundaySchool": "Presentación Escuela Dominical",
    "agenda.field.prayer": "Tiempo de oración",
    "agenda.field.postlude": "Postludio",
    "agenda.field.streamTitle": "Título (streaming)",
    "agenda.field.streamDesc": "Descripción (streaming)",
    "agenda.field.custom": "Campo nuevo",
    "agenda.section.schedule": "Cronograma",
    "agenda.section.order": "Orden",
    "agenda.section.word": "Tiempo de predicación",
    "agenda.section.music": "Grupo de alabanza",
    "agenda.section.songs": "Alabanza",
    "agenda.section.stream": "Streaming",
    "agenda.sectionsTitle": "Títulos de las secciones",
    "agenda.fieldsTitle": "Campos del evento",
    "agenda.addField": "Añadir campo",
    "agenda.fieldLabel": "Nombre del campo",
    "agenda.kind.text": "Texto",
    "agenda.kind.people": "Personas del equipo",
    "agenda.kind.textarea": "Texto largo",
    "agenda.peopleOne": "Una persona",
    "agenda.peopleMany": "Varias personas",
    "agenda.pickPeople": "Elegir del equipo",
    "agenda.noTeam": "Arme el equipo primero para marcar nombres con un toque.",
    "agenda.goTeam": "Ir a Equipo",
    "agenda.addPerson": "Añadir",
    "agenda.searchSongs": "Buscar canciones...",
    "agenda.searchPeople": "Buscar en el equipo...",
    "agenda.donePick": "Listo",
    "agenda.pickSongs": "Marque las canciones del programa",
    "agenda.orderTitle": "Orden de culto",
    "agenda.serviceDate": "Fecha de servicio",
    "agenda.order.praise": "Alabanza",
    "agenda.order.finalHymn": "Himno final",
    "agenda.markFinal": "Pasar a himno final",
    "agenda.unmarkFinal": "Volver a alabanza",
    "agenda.includeMoment": "Incluir en este culto",
    "agenda.momentNote": "Nota (opcional)",
    "agenda.orderHint": "Marque solo lo que este culto va a tener. El resto no aparece en la orden.",
    "agenda.slotFinal": "Final",
    "agenda.monthPrev": "Mes anterior",
    "agenda.monthNext": "Mes siguiente",
    "agenda.dayEmpty": "Ningún evento en este día.",
    "agenda.dayCreate": "Crear evento en este día",
    "agenda.savedSettings": "Campos guardados.",
    "agenda.week0": "D",
    "agenda.week1": "L",
    "agenda.week2": "M",
    "agenda.week3": "X",
    "agenda.week4": "J",
    "agenda.week5": "V",
    "agenda.week6": "S",
    "team.emptyTitle": "Todavía no hay integrantes",
    "team.emptyLead": "Cada uno arma el equipo a su manera: dos personas o veinte, con las funciones que necesite.",
    "team.add": "Añadir integrante",
    "team.edit": "Editar integrante",
    "team.name": "Nombre",
    "team.namePh": "Ej.: Ana",
    "team.roles": "Funciones",
    "team.rolesLead": "Toque para marcar. Puede crear otras.",
    "team.rolePh": "Nueva función",
    "team.note": "Nota",
    "team.save": "Guardar",
    "team.delete": "Quitar del equipo",
    "team.deleteConfirm": "¿Quitar a {name} del equipo?",
    "team.countOne": "{n} integrante",
    "team.countMany": "{n} integrantes",
    "team.role.voice": "Voz",
    "team.role.guitar": "Guitarra",
    "team.role.keys": "Teclado",
    "team.role.drums": "Batería",
    "team.role.bass": "Bajo",
    "team.role.tech": "Técnico",
    "team.needed": "Escriba el nombre.",
    "team.saved": "Integrante guardado.",
    "more.lead": "Ajustes y copias de seguridad.",
    "more.appearance": "Apariencia",
    "more.theme": "Tema",
    "more.themeLightShort": "Claro",
    "more.themeDarkShort": "Oscuro",
    "more.themeAuto": "Automático",
    "more.features": "Funciones",
    "more.data": "Datos",
    "more.clear": "Borrar datos",
    "more.clearConfirm": "¿Borrar todas las canciones y setlists de este aparato?",
    "more.about": "Acerca de",
    "more.aboutText": "Cifras, setlists y modo escenario en este aparato. Sin cuenta. Puede enlazar un computador con su autorización.",
    "more.aboutLegal": "Los datos quedan en este teléfono. Un computador solo entra con el código y su permiso. Exporte una copia antes de desinstalar.",
    "more.version": "Versión {v}",
    "more.privacy": "Política de privacidad",
    "more.buy": "Comprar app Android (5 €)",
    "more.install": "Instalar y compartir",
    "more.font": "Tamaño de letra",
    "more.fontDefault": "Tamaño de letra predeterminado",
    "more.shortcuts": "Atajos",
    "more.other": "Otras opciones",
    "more.restore": "Restaurar copia",
    "more.language": "Idioma",
    "more.paste": "Traer una canción",
    "more.backups": "Copias de seguridad",
    "more.sample": "Cargar ejemplo",
    "more.exportSong": "Exportar cifra actual",
    "more.exportAll": "Exportar copia de seguridad",
    "more.import": "Importar canciones",
    "sync.title": "Computador",
    "sync.lead": "Abra ChordBook en el computador, muestre el código y autorice en este teléfono. Después edite allí y use aquí.",
    "sync.showCode": "Mostrar código en este computador",
    "sync.codeLabel": "Código del computador",
    "sync.connect": "Conectar al computador",
    "sync.stop": "Desconectar",
    "sync.hostTitle": "Editar en este computador",
    "sync.hostLead": "En el teléfono, abra ChordBook → Más → Computador y escriba este código. Luego pulse Permitir.",
    "sync.sameWifi": "Los dos aparatos necesitan internet. En la misma Wi-Fi funciona mejor.",
    "sync.authTitle": "¿Permitir este computador?",
    "sync.authLead": "Va a ver y cambiar las cifras de este teléfono. Acéptelo solo si usted abrió ChordBook en el computador.",
    "sync.allow": "Permitir",
    "sync.deny": "Rechazar",
    "sync.waiting": "Esperando el teléfono…",
    "sync.waitingAuth": "Esperando permiso en el teléfono…",
    "sync.joining": "Conectando…",
    "sync.connected": "Conectado. Lo que guarde en un lado aparece en el otro.",
    "sync.disconnected": "Conexión cerrada.",
    "sync.denied": "El teléfono rechazó este computador.",
    "sync.needCode": "Escriba el código de 6 números que aparece en el computador.",
    "sync.badCode": "Código no válido.",
    "sync.fail": "No se pudo conectar. Compruebe internet e inténtelo en la misma Wi-Fi.",
    "sync.received": "Biblioteca recibida del teléfono.",
    "sync.merged": "Junté las cifras de los dos lados.",
    "sync.keptLocal": "El teléfono no tenía cifras. Conservé las de aquí y las envié al teléfono.",
    "sync.sent": "Cambios enviados al teléfono.",
    "sync.bannerIdle": "Edite las cifras del teléfono en este computador.",
    "sync.bannerStart": "Empezar",
    "sync.bannerWait": "En el teléfono: Más → Computador → {code}",
    "sync.bannerOn": "Conectado al teléfono",
    "sync.bannerPhone": "Conectado al computador",
    "sync.bannerOpen": "Ver código",
    "sync.peerBusy": "Ese código ya está en uso. Generando otro…",
    "more.ready": "Listo.",
    "more.themeLight": "Tema claro",
    "more.themeDark": "Tema oscuro",
    "more.themeNamedLight": "Tema: claro",
    "more.themeNamedDark": "Tema: oscuro",
    "look.title": "Visual del escenario",
    "look.kicker": "Así se ve en el escenario",
    "look.hint": "Cambia abajo. La cifra de arriba se actualiza al momento. Guarda solo si te gusta.",
    "look.dirty": "Todavía no guardado. Puedes descartar o guardar.",
    "look.preset": "Estilo",
    "look.night": "Noche",
    "look.forest": "Bosque",
    "look.gold": "Ámbar",
    "look.paper": "Papel",
    "look.contrast": "Contraste",
    "look.screen": "Pantalla",
    "look.lyrics": "Letra",
    "look.chords": "Cifra",
    "look.gap": "Espacio",
    "look.gapTight": "Junto",
    "look.gapNormal": "Normal",
    "look.gapLoose": "Holgado",
    "look.save": "Guardar visual",
    "look.discard": "Descartar",
    "look.saved": "Visual del escenario guardado.",
    "look.reverted": "Volví al visual guardado.",
    "capo.suggestion": "Sugerencia: Cejilla {capo} · {shape}",
    "capo.applied": "Cejilla {capo} · formas en {shape}",
    "capo.open": "Formas en {shape}",
    "capo.use": "Usar",
    "capo.short": "Cejilla {capo}",
    "chords.title": "Acordes",
    "chords.close": "Cerrar",
    "chords.empty": "No hay acordes en esta cifra.",
    "msg.saved": "Canción guardada.",
    "msg.saveFail": "No se pudo guardar. Libere espacio en este aparato o exporte un backup.",
    "msg.copied": "Canción copiada para compartir.",
    "msg.copyFail": "No pude copiar. Descargue un archivo de la canción.",
    "msg.sample": "¿Añadir cifras de ejemplo de todas formas?",
    "msg.sampleExists": "Los ejemplos ya están en la biblioteca.",
    "msg.noSong": "Ninguna cifra seleccionada.",
    "msg.imported": "Importado: {result}",
    "msg.importFail": "No se pudo importar: {error}",
    "msg.file": "Archivo generado: {name}",
    "msg.deleteSong": "¿Eliminar \"{title}\"?",
    "msg.cleared": "Biblioteca borrada.",
    "aria.nav": "Navegación principal",
    "aria.sections": "Secciones",
    "aria.menu": "Menú principal",
    "aria.mobileNav": "Navegación del teléfono",
  },
  en: {
    "brand.tagline": "Your songs, always with you",
    "nav.songs": "Songs",
    "nav.setlists": "Agenda",
    "nav.chart": "Chart",
    "nav.stage": "Stage",
    "nav.more": "More",
    "nav.settings": "Settings",
    "nav.libraryBack": "‹ Library",
    "nav.newSong": "New song",
    "nav.exportLibrary": "Export library",
    "nav.importFile": "Import file",
    "search.label": "Search",
    "search.placeholder": "Search song, artist or key...",
    "search.sitesPlaceholder": "Song or artist name...",
    "search.library": "ChordBook",
    "search.sites": "Sites",
    "search.where": "Where to search",
    "search.sitesLead": "Open the site, copy the chart, then come back to paste it.",
    "search.sitesEmpty": "Type the song or artist name.",
    "search.sitesOpen": "Search \"{q}\"",
    "search.sitesHome": "Open {name}",
    "search.sitesCount": "Search on sites",
    "search.thenPaste": "Copied: paste chart",
    "search.trySites": "Search on sites",
    "more.sampleShort": "Sample",
    "home.title": "Your music",
    "home.lead": "Library, stage and Sunday program so you can play without delay.",
    "home.library": "Library",
    "home.libraryLead": "All charts",
    "home.stageLead": "Screen for playing",
    "home.setlistsLead": "Order for the service",
    "home.files": "Files",
    "home.filesLead": "Import backup",
    "home.newSong": "+ New song",
    "home.seeAll": "See all",
    "home.empty": "No charts yet.",
    "home.open": "Open",
    "library.favorites": "Favorites",
    "library.recent": "Recent",
    "library.editSelected": "Edit selected",
    "library.filter": "Library filter",
    "library.filterCategory": "Filter category",
    "library.filterKey": "Filter key",
    "library.allCategories": "All",
    "library.allKeys": "All",
    "library.allSongs": "All",
    "library.categories": "Categories",
    "library.keys": "Keys",
    "library.emptyKey": "No songs in this key.",
    "library.countOne": "{n} chart",
    "library.countMany": "{n} charts",
    "library.favOne": "{n} favorite",
    "library.favMany": "{n} favorites",
    "library.empty": "No charts found.",
    "library.emptyStart": "No charts yet. Tap +.",
    "library.emptyFavorites": "No favorite charts.",
    "library.emptyRecent": "Tap a song name to play. Recent songs show up here.",
    "library.favorite": "Favorite",
    "library.unfavorite": "Remove favorite",
    "preview.edit": "Edit",
    "preview.more": "More",
    "preview.youtube": "YouTube",
    "editor.title": "Edit song",
    "editor.lead": "Fill in the details and write lyrics with chords.",
    "editor.name": "Song name",
    "editor.namePh": "e.g. Living Hope",
    "editor.artist": "Author / artist",
    "editor.artistPh": "e.g. Worship team",
    "editor.category": "Category",
    "editor.categoryPh": "e.g. Worship, Celebration",
    "editor.capo": "Capo",
    "editor.cue": "Stage cue",
    "editor.cuePh": "e.g. come in on verse 2",
    "editor.lyrics": "Lyrics and chords",
    "editor.viewChart": "View chart",
    "editor.duplicate": "Duplicate",
    "editor.delete": "Delete",
    "paste.open": "Paste chart",
    "paste.title": "Bring in a song",
    "paste.lead": "Open a hymnal or site, copy the chart, and paste it below. Then fix any lines or chords.",
    "paste.sites": "Where to copy",
    "paste.apply": "Bring into the editor",
    "paste.clipboard": "Paste from clipboard",
    "paste.placeholder": "Paste the copied chart here...",
    "paste.empty": "No lyrics or chords found to paste.",
    "paste.ready": "Chart pasted. Tweak what you need and save.",
    "paste.clipboardFail": "Paste with Ctrl+V or a long press in the box.",
    "common.back": "Back",
    "common.save": "Save",
    "song.untitled": "Song",
    "song.noTitle": "Untitled",
    "song.transposeDown": "Key -",
    "song.transposeUp": "Key +",
    "song.transpose": "Transpose",
    "song.autoScroll": "Auto-scroll",
    "song.focus": "Focus mode",
    "song.showChords": "Show chords",
    "song.showLyrics": "Show lyrics",
    "song.stageGo": "Stage mode",
    "song.chords": "Chords",
    "song.scroll": "Scroll",
    "song.scrollStop": "Stop",
    "song.list": "List",
    "song.play": "Play",
    "song.edit": "Edit song",
    "song.editShort": "Edit",
    "song.toolsPull": "Pull capo and type",
    "song.share": "Share",
    "song.stageMode": "Stage mode",
    "song.addToSetlist": "Add to setlist",
    "song.tools": "Adjust",
    "song.key": "Key {key}",
    "song.capoChip": "Capo {capo}",
    "song.sounds": "sounds {key}",
    "stage.mode": "Stage mode",
    "stage.menu": "Menu",
    "stage.exit": "Back",
    "stage.list": "List",
    "stage.close": "Close",
    "stage.now": "now",
    "stage.listHint": "Tap a song to switch.",
    "stage.setlistLabel": "Today's songs",
    "stage.recentLabel": "Recent songs",
    "stage.prev": "Previous",
    "stage.next": "Next",
    "stage.end": "End of setlist.",
    "stage.start": "Start of setlist.",
    "stage.after": "next: {title}",
    "stage.startScroll": "Scroll",
    "stage.stopScroll": "Stop",
    "stage.focus": "Focus",
    "stage.speed": "Speed {n}%",
    "stage.searchPh": "Search songs...",
    "stage.noMatch": "No songs found.",
    "stage.noScroll": "This chart already fits on screen.",
    "setlists.new": "New event",
    "setlists.mine": "All",
    "setlists.recent": "Recent",
    "setlists.filter": "Setlist filter",
    "setlists.countOne": "{n} event",
    "setlists.countMany": "{n} events",
    "setlists.recentOne": "{n} recent",
    "setlists.recentMany": "{n} recent",
    "setlists.empty": "No events yet.",
    "setlists.emptyRecent": "Open a setlist on stage to see it here.",
    "setlists.emptyList": "No songs yet",
    "setlists.songsOne": "{n} song",
    "setlists.songsMany": "{n} songs",
    "setlists.edit": "Edit setlist",
    "setlists.editLead": "Song order for the day.",
    "setlists.name": "Setlist name",
    "setlists.notes": "Notes",
    "setlists.openStage": "Play",
    "setlists.playTitle": "How do you want to see them?",
    "setlists.playLead": "The chart is light for rehearsal. Stage is dark for projection.",
    "setlists.playChart": "Chart",
    "setlists.playChartHint": "Light screen, with capo and edit",
    "setlists.playStage": "Stage",
    "setlists.playStageHint": "Dark screen, for the service",
    "setlists.playExit": "Exit",
    "setlists.playDone": "End",
    "setlists.save": "Save",
    "setlists.delete": "Delete",
    "setlists.inList": "In the setlist",
    "setlists.noSongs": "No songs in this setlist.",
    "setlists.addSong": "Add",
    "setlists.remove": "Remove",
    "setlists.details": "Event details",
    "setlists.addTitle": "Add a song",
    "setlists.allAdded": "Every song is already added.",
    "setlists.needSongs": "Add songs to the setlist to play.",
    "setlists.saved": "Program saved.",
    "setlists.added": "Added to {title}.",
    "setlists.already": "Already in this setlist.",
    "setlists.deleteConfirm": "Delete event \"{title}\"?",
    "service.title": "Program",
    "service.lead": "Build the team, fill in the event, and pick the songs.",
    "service.name": "Event name",
    "service.namePh": "e.g. Rehearsal, service, gig",
    "service.date": "Date",
    "service.opening": "Opening (prelude, who plays)",
    "service.openingPh": "Ex.: Piano — Ana",
    "service.leader": "Service leader",
    "service.announcements": "Announcements and Scripture reading",
    "service.worship": "Worship team",
    "service.worshipPh": "Ex.: Worship ministry",
    "service.songs": "Worship team — songs",
    "service.preacher": "Preacher",
    "service.preacherRole": "Pastor or guest",
    "service.pastor": "Pastor",
    "service.guest": "Guest",
    "service.communion": "Communion",
    "service.communionPh": "Ex.: Pastor John",
    "service.send": "Send program",
    "service.whatsapp": "WhatsApp",
    "service.copied": "Program copied. Paste it into WhatsApp or the group.",
    "service.shared": "Program sent.",
    "service.copyFail": "Could not copy. Use the WhatsApp button to send it.",
    "service.heading": "PROGRAM",
    "service.itemOpening": "1. OPENING (Prelude)",
    "service.itemLeader": "2. SERVICE LEADER",
    "service.itemAnnouncements": "3. ANNOUNCEMENTS AND SCRIPTURE",
    "service.itemWorship": "4. WORSHIP TEAM",
    "service.itemPreacher": "5. PREACHER",
    "service.itemCommunion": "6. COMMUNION",
    "service.noSongs": "No songs yet.",
    "service.key": "Key {key}",
    "service.tba": "TBD",
    "service.defaultTitle": "Event",
    "agenda.hubEvents": "Events",
    "agenda.hubTeam": "Team",
    "agenda.hubMonth": "Month",
    "agenda.settings": "Customize fields",
    "agenda.time": "Time",
    "agenda.field.type": "Type",
    "agenda.field.speaker": "Speaker",
    "agenda.field.host": "Host",
    "agenda.field.theme": "Message theme",
    "agenda.field.scripture": "Scripture",
    "agenda.field.musicLead": "Music leader",
    "agenda.field.voices": "Vocals",
    "agenda.field.instruments": "Instruments",
    "agenda.field.opening": "Opening",
    "agenda.field.communion": "Communion",
    "agenda.field.notes": "Instructions",
    "agenda.field.prelude": "Prelude",
    "agenda.field.reading": "Opening reading",
    "agenda.field.readingVerse": "Reading scripture",
    "agenda.field.sundaySchool": "Sunday school presentation",
    "agenda.field.prayer": "Prayer",
    "agenda.field.postlude": "Postlude",
    "agenda.field.streamTitle": "Streaming title",
    "agenda.field.streamDesc": "Streaming description",
    "agenda.field.custom": "New field",
    "agenda.section.schedule": "Schedule",
    "agenda.section.order": "Order",
    "agenda.section.word": "Message",
    "agenda.section.music": "Band",
    "agenda.section.songs": "Praise",
    "agenda.section.stream": "Streaming",
    "agenda.sectionsTitle": "Section titles",
    "agenda.fieldsTitle": "Event fields",
    "agenda.addField": "Add field",
    "agenda.fieldLabel": "Field name",
    "agenda.kind.text": "Text",
    "agenda.kind.people": "People from the team",
    "agenda.kind.textarea": "Long text",
    "agenda.peopleOne": "One person",
    "agenda.peopleMany": "Several people",
    "agenda.pickPeople": "Pick from the team",
    "agenda.noTeam": "Build the team first to tap names.",
    "agenda.goTeam": "Go to Team",
    "agenda.addPerson": "Add",
    "agenda.searchSongs": "Search songs...",
    "agenda.searchPeople": "Search the team...",
    "agenda.donePick": "Done",
    "agenda.pickSongs": "Check the songs for the program",
    "agenda.orderTitle": "Order of service",
    "agenda.serviceDate": "Service date",
    "agenda.order.praise": "Praise",
    "agenda.order.finalHymn": "Closing hymn",
    "agenda.markFinal": "Move to closing hymn",
    "agenda.unmarkFinal": "Move back to praise",
    "agenda.includeMoment": "Include in this service",
    "agenda.momentNote": "Note (optional)",
    "agenda.orderHint": "Check only what this service will use. The rest stays off the order.",
    "agenda.slotFinal": "Final",
    "agenda.monthPrev": "Previous month",
    "agenda.monthNext": "Next month",
    "agenda.dayEmpty": "No events on this day.",
    "agenda.dayCreate": "Create event on this day",
    "agenda.savedSettings": "Fields saved.",
    "agenda.week0": "S",
    "agenda.week1": "M",
    "agenda.week2": "T",
    "agenda.week3": "W",
    "agenda.week4": "T",
    "agenda.week5": "F",
    "agenda.week6": "S",
    "team.emptyTitle": "No team members yet",
    "team.emptyLead": "Build the team your way: two people or twenty, with whatever roles you need.",
    "team.add": "Add member",
    "team.edit": "Edit member",
    "team.name": "Name",
    "team.namePh": "e.g. Ana",
    "team.roles": "Roles",
    "team.rolesLead": "Tap to select. You can add your own.",
    "team.rolePh": "New role",
    "team.note": "Note",
    "team.save": "Save",
    "team.delete": "Remove from team",
    "team.deleteConfirm": "Remove {name} from the team?",
    "team.countOne": "{n} member",
    "team.countMany": "{n} members",
    "team.role.voice": "Vocals",
    "team.role.guitar": "Guitar",
    "team.role.keys": "Keys",
    "team.role.drums": "Drums",
    "team.role.bass": "Bass",
    "team.role.tech": "Tech",
    "team.needed": "Enter a name.",
    "team.saved": "Member saved.",
    "more.lead": "Settings and backups.",
    "more.appearance": "Appearance",
    "more.theme": "Theme",
    "more.themeLightShort": "Light",
    "more.themeDarkShort": "Dark",
    "more.themeAuto": "Automatic",
    "more.features": "Features",
    "more.data": "Data",
    "more.clear": "Clear data",
    "more.clearConfirm": "Delete all songs and setlists on this device?",
    "more.about": "About",
    "more.aboutText": "Charts, setlists and stage mode on this device. No account. You can link a computer with your permission.",
    "more.aboutLegal": "Your data stays on this phone. A computer can join only with the code and your permission. Export a backup before uninstalling.",
    "more.version": "Version {v}",
    "more.privacy": "Privacy policy",
    "more.buy": "Buy Android app (5 €)",
    "more.install": "Install and share",
    "more.font": "Font size",
    "more.fontDefault": "Default font size",
    "more.shortcuts": "Shortcuts",
    "more.other": "Other options",
    "more.restore": "Restore backup",
    "more.language": "Language",
    "more.paste": "Bring in a song",
    "more.backups": "Backups",
    "more.sample": "Load sample",
    "more.exportSong": "Export current chart",
    "more.exportAll": "Export backup",
    "more.import": "Import songs",
    "sync.title": "Computer",
    "sync.lead": "Open ChordBook on the computer, show the code, and approve it on this phone. Then edit there and play here.",
    "sync.showCode": "Show code on this computer",
    "sync.codeLabel": "Computer code",
    "sync.connect": "Connect to computer",
    "sync.stop": "Disconnect",
    "sync.hostTitle": "Edit on this computer",
    "sync.hostLead": "On the phone, open ChordBook → More → Computer and type this code. Then tap Allow.",
    "sync.sameWifi": "Both devices need internet. Same Wi-Fi works best.",
    "sync.authTitle": "Allow this computer?",
    "sync.authLead": "It will see and change the charts on this phone. Allow it only if you opened ChordBook on the computer.",
    "sync.allow": "Allow",
    "sync.deny": "Decline",
    "sync.waiting": "Waiting for the phone…",
    "sync.waitingAuth": "Waiting for permission on the phone…",
    "sync.joining": "Connecting…",
    "sync.connected": "Linked. What you save on one side appears on the other.",
    "sync.disconnected": "Connection closed.",
    "sync.denied": "The phone declined this computer.",
    "sync.needCode": "Type the 6-digit code shown on the computer.",
    "sync.badCode": "Invalid code.",
    "sync.fail": "Could not connect. Check the internet and try again on the same Wi-Fi.",
    "sync.received": "Library received from the phone.",
    "sync.merged": "Merged the charts from both sides.",
    "sync.keptLocal": "The phone had no charts. Kept this library and sent it to the phone.",
    "sync.sent": "Changes sent to the phone.",
    "sync.bannerIdle": "Edit the phone charts on this computer.",
    "sync.bannerStart": "Start",
    "sync.bannerWait": "On the phone: More → Computer → {code}",
    "sync.bannerOn": "Linked to the phone",
    "sync.bannerPhone": "Linked to the computer",
    "sync.bannerOpen": "Show code",
    "sync.peerBusy": "That code is in use. Making another…",
    "more.ready": "Ready.",
    "more.themeLight": "Light theme",
    "more.themeDark": "Dark theme",
    "more.themeNamedLight": "Theme: light",
    "more.themeNamedDark": "Theme: dark",
    "look.title": "Stage look",
    "look.kicker": "How it looks on stage",
    "look.hint": "Change the options below. The chart above updates live. Save only if you like it.",
    "look.dirty": "Not saved yet. Discard or save.",
    "look.preset": "Style",
    "look.night": "Night",
    "look.forest": "Forest",
    "look.gold": "Amber",
    "look.paper": "Paper",
    "look.contrast": "Contrast",
    "look.screen": "Screen",
    "look.lyrics": "Lyrics",
    "look.chords": "Chords",
    "look.gap": "Spacing",
    "look.gapTight": "Tight",
    "look.gapNormal": "Normal",
    "look.gapLoose": "Roomy",
    "look.save": "Save look",
    "look.discard": "Discard",
    "look.saved": "Stage look saved.",
    "look.reverted": "Back to the saved look.",
    "capo.suggestion": "Tip: Capo {capo} · {shape}",
    "capo.applied": "Capo {capo} · {shape} shapes",
    "capo.open": "{shape} shapes",
    "capo.use": "Use",
    "capo.short": "Capo {capo}",
    "chords.title": "Chords",
    "chords.close": "Close",
    "chords.empty": "No chords in this chart.",
    "msg.saved": "Song saved.",
    "msg.saveFail": "Could not save. Free space on this device or export a backup.",
    "msg.copied": "Song copied to share.",
    "msg.copyFail": "Could not copy. A song file was downloaded instead.",
    "msg.sample": "Add sample charts anyway?",
    "msg.sampleExists": "Sample charts are already in the library.",
    "msg.noSong": "No chart selected.",
    "msg.imported": "Imported: {result}",
    "msg.importFail": "Could not import: {error}",
    "msg.file": "File created: {name}",
    "msg.deleteSong": "Delete \"{title}\"?",
    "msg.cleared": "Library cleared.",
    "aria.nav": "Main navigation",
    "aria.sections": "Sections",
    "aria.menu": "Main menu",
    "aria.mobileNav": "Phone navigation",
  },
};

function t(key, vars) {
  const lang = state?.language && I18N[state.language] ? state.language : "pt";
  let text = I18N[lang][key] || I18N.pt[key] || key;
  if (vars) {
    Object.entries(vars).forEach(([name, value]) => {
      text = text.replaceAll(`{${name}}`, String(value));
    });
  }
  return text;
}

function applyI18n() {
  document.documentElement.lang = state.language || "pt";
  document.querySelectorAll("[data-i18n]").forEach((node) => {
    node.textContent = t(node.dataset.i18n);
  });
  document.querySelectorAll("[data-i18n-placeholder]").forEach((node) => {
    node.setAttribute("placeholder", t(node.dataset.i18nPlaceholder));
  });
  document.querySelectorAll("[data-i18n-aria]").forEach((node) => {
    node.setAttribute("aria-label", t(node.dataset.i18nAria));
  });
  document.querySelectorAll("[data-i18n-title]").forEach((node) => {
    node.setAttribute("title", t(node.dataset.i18nTitle));
  });
  document.querySelectorAll("[data-lang]").forEach((button) => {
    button.classList.toggle("active", button.dataset.lang === state.language);
  });
  const versionNode = document.getElementById("appVersion");
  if (versionNode) {
    let version = APP_VERSION;
    try {
      if (window.ChordBookAndroid && typeof window.ChordBookAndroid.getVersionName === "function") {
        version = window.ChordBookAndroid.getVersionName() || APP_VERSION;
      }
    } catch (error) {
      version = APP_VERSION;
    }
    versionNode.textContent = t("more.version", { v: version });
  }
}

function setLanguage(language) {
  if (!I18N[language] || state.language === language) return;
  state.language = language;
  persist();
  render();
}

function countLabel(n, oneKey, manyKey) {
  return t(n === 1 ? oneKey : manyKey, { n });
}

function restoreAndroidOrigin() {
  try {
    if (!window.ChordBookAndroid) return;
    if (location.protocol === "file:") {
      window.ChordBookAndroid.finishFileOrigin?.(
        localStorage.getItem(STORAGE_KEY) || "",
        localStorage.getItem(LOOK_KEY) || "",
      );
      return;
    }
    const packed = window.ChordBookAndroid.consumeMigration?.();
    if (!packed) return;
    const data = JSON.parse(packed);
    if (data.library && !localStorage.getItem(STORAGE_KEY)) localStorage.setItem(STORAGE_KEY, data.library);
    if (data.look && !localStorage.getItem(LOOK_KEY)) localStorage.setItem(LOOK_KEY, data.look);
  } catch {
    /* ignore */
  }
}

restoreAndroidOrigin();
const state = loadState();
let activeView = "library";
let libraryFilter = "all";
let libraryKeyFilter = "";
let setlistFilter = "all";
let searchScope = "library";
let expandedSongId = null;
let selectedSongId = state.songs[0]?.id ?? null;
let selectedSetlistId = state.setlists[0]?.id ?? null;
let activeSetlistId = null;
let isEditingSong = false;
let isEditingSetlist = false;
let isSetlistDetailsOpen = false;
let isSetlistAddOpen = false;
let isSetlistDayMenuOpen = false;
let agendaHub = "events";
let agendaMonthCursor = new Date();
let selectedAgendaDay = "";
let setlistAddQuery = "";
let peoplePickerQuery = "";
let editingMemberId = null;
let memberDraftRoles = [];
let peoplePickerFieldId = "";
let peoplePickerDraft = { ids: [], extra: "" };
let isMemberSheetOpen = false;
let isPeoplePickerOpen = false;
let isAgendaSettingsOpen = false;
let isMobileSongMenuOpen = false;
let isSongReadMenuOpen = false;
let isSetlistPickerOpen = false;
let isChordSheetOpen = false;
let isStageFocus = false;
let isSongToolsOpen = false;
let isSetlistPlaying = false;
let setlistPlayFinished = false;
let isAutoScrolling = false;
const SYNC_PEER_PREFIX = "cblite";
const syncLink = {
  role: "",
  code: "",
  status: "idle",
  peer: null,
  conn: null,
  authorized: false,
  hostRetries: 0,
  pushTimer: 0,
};
let autoScrollTimer = null;
let autoScrollGuardUntil = 0;
let stageMenuQuery = "";
let stageTouchStart = null;
let stageTouchUsed = false;
let chartPinch = null;
const savedScrollSpeed = Number(localStorage.getItem("chordbook.scrollSpeed") || 30);
let scrollSpeed = Math.min(100, Math.max(10, savedScrollSpeed || 30));
const savedStageFont = localStorage.getItem("chordbook.stageFont");
let stageFont = Number(savedStageFont || defaultStageFont());
let savedLook = loadLook();
savedLook.stageFont = stageFont;
let lookDraft = { ...savedLook };
let stageWakeLock = null;

const el = {
  navTabs: document.querySelectorAll(".nav-tab"),
  views: document.querySelectorAll(".view"),
  appShell: document.querySelector(".app-shell"),
  search: document.querySelector("#searchInput"),
  searchScope: document.querySelectorAll("[data-search-scope]"),
  categoryFilter: document.querySelector("#categoryFilter"),
  keyFilters: document.querySelector("#keyFilters"),
  songList: document.querySelector("#songList"),
  libraryCount: document.querySelector("#libraryCount"),
  form: document.querySelector("#songForm"),
  closeEditor: document.querySelector("#closeEditorBtn"),
  openStageFromEditor: document.querySelector("#openStageFromEditorBtn"),
  title: document.querySelector("#titleInput"),
  artist: document.querySelector("#artistInput"),
  category: document.querySelector("#categoryInput"),
  capo: document.querySelector("#capoInput"),
  cue: document.querySelector("#cueInput"),
  lines: document.querySelector("#linesInput"),
  favorite: document.querySelector("#favoriteBtn"),
  duplicate: document.querySelector("#duplicateBtn"),
  delete: document.querySelector("#deleteBtn"),
  newSong: document.querySelector("#newSongBtn"),
  libraryFab: document.querySelector("#libraryFab"),
  libraryFilters: document.querySelectorAll("[data-library-filter]"),
  libraryRail: document.querySelector("#libraryRail"),
  categoryFilters: document.querySelector("#categoryFilters"),
  toolbarFavs: document.querySelector("#toolbarFavsBtn"),
  homeShortcuts: document.querySelectorAll(".home-shortcuts [data-view]"),
  setlistFilters: document.querySelectorAll("[data-setlist-filter]"),
  bottomNav: document.querySelectorAll(".bottom-nav-btn"),
  sampleMore: document.querySelector("#sampleBtnMore"),
  clearLibrary: document.querySelector("#clearLibraryBtn"),
  fontDownMore: document.querySelector("#fontDownMore"),
  fontUpMore: document.querySelector("#fontUpMore"),
  fontSizeMore: document.querySelector("#fontSizeMore"),
  lookStudio: document.querySelector("#lookStudio"),
  lookPreview: document.querySelector("#lookPreview"),
  lookDirty: document.querySelector("#lookDirty"),
  lookSave: document.querySelector("#lookSave"),
  lookCancel: document.querySelector("#lookCancel"),
  lookBgSwatches: document.querySelector("#lookBgSwatches"),
  lookLyricSwatches: document.querySelector("#lookLyricSwatches"),
  lookChordSwatches: document.querySelector("#lookChordSwatches"),
  songBack: document.querySelector("#songBackBtn"),
  songReadTitle: document.querySelector("#songReadTitle"),
  songReadMeta: document.querySelector("#songReadMeta"),
  songKeyBadge: document.querySelector("#songKeyBadge"),
  songKeyStepper: document.querySelector("#songKeyStepper"),
  songKeyBadgeDown: document.querySelector("#songKeyBadgeDown"),
  songKeyBadgeUp: document.querySelector("#songKeyBadgeUp"),
  songCapoStepper: document.querySelector("#songCapoStepper"),
  songFav: document.querySelector("#songFavBtn"),
  songEdit: document.querySelector("#songEditBtn"),
  songMore: document.querySelector("#songMoreBtn"),
  songToolsPanel: document.querySelector("#songToolsPanel"),
  songToolsHandle: document.querySelector("#songToolsHandle"),
  songReadMenu: document.querySelector("#songReadMenu"),
  songRead: document.querySelector(".song-read"),
  songReadContent: document.querySelector("#songReadContent"),
  songTransposeDown: document.querySelector("#songTransposeDown"),
  songTransposeUp: document.querySelector("#songTransposeUp"),
  songFontDown: document.querySelector("#songFontDown"),
  songFontUp: document.querySelector("#songFontUp"),
  songFontValue: document.querySelector("#songFontValue"),
  songKeyValue: document.querySelector("#songKeyValue"),
  songCapoValue: document.querySelector("#songCapoValue"),
  songCapoDown: document.querySelector("#songCapoDown"),
  songCapoUp: document.querySelector("#songCapoUp"),
  songOpenStage: document.querySelector("#songOpenStageBtn"),
  songOpenStage2: document.querySelector("#songOpenStageBtn2"),
  songScroll: document.querySelector("#songScrollBtn"),
  songAutoScrollSwitch: document.querySelector("#songAutoScrollSwitch"),
  songFocusSwitch: document.querySelector("#songFocusSwitch"),
  songShowChordsSwitch: document.querySelector("#songShowChordsSwitch"),
  songShowLyricsSwitch: document.querySelector("#songShowLyricsSwitch"),
  moreAutoScrollSwitch: document.querySelector("#moreAutoScrollSwitch"),
  moreFocusSwitch: document.querySelector("#moreFocusSwitch"),
  moreShowChordsSwitch: document.querySelector("#moreShowChordsSwitch"),
  moreShowLyricsSwitch: document.querySelector("#moreShowLyricsSwitch"),
  themePills: document.querySelectorAll("[data-theme]"),
  songCapoHint: document.querySelector("#songCapoHint"),
  songChords: document.querySelector("#songChordsBtn"),
  songSetlist: document.querySelector("#songSetlistBtn"),
  chordSheet: document.querySelector("#chordSheet"),
  chordSheetClose: document.querySelector("#chordSheetClose"),
  chordSheetBody: document.querySelector("#chordSheetBody"),
  langButtons: document.querySelectorAll("[data-lang]"),
  stageExit: document.querySelector("#stageExitBtn"),
  stageMenu: document.querySelector("#stageMenuBtn"),
  stageSongTitle: document.querySelector("#stageSongTitle"),
  stageNowHint: document.querySelector("#stageNowHint"),
  stageCapoBadge: document.querySelector("#stageCapoBadge"),
  stageCueNote: document.querySelector("#stageCueNote"),
  songCueNote: document.querySelector("#songCueNote"),
  stagePosition: document.querySelector("#stagePosition"),
  stageDots: document.querySelector("#stageDots"),
  stageNextHint: document.querySelector("#stageNextHint"),
  stagePrev: document.querySelector("#stagePrevBtn"),
  stageScroll: document.querySelector("#stageScrollBtn"),
  stageNext: document.querySelector("#stageNextBtn"),
  stageTransposeDown: document.querySelector("#stageTransposeDown"),
  stageTransposeUp: document.querySelector("#stageTransposeUp"),
  mobileSongMenu: document.querySelector("#mobileSongMenu"),
  stageShell: document.querySelector(".stage-shell"),
  stageContent: document.querySelector("#stageContent"),
  setlistList: document.querySelector("#setlistList"),
  setlistCount: document.querySelector("#setlistCount"),
  newSetlist: document.querySelector("#newSetlistBtn"),
  setlistFab: document.querySelector("#setlistFab"),
  closeSetlist: document.querySelector("#closeSetlistBtn"),
  setlistEditDetails: document.querySelector("#setlistEditDetailsBtn"),
  setlistAdd: document.querySelector("#setlistAddBtn"),
  setlistMore: document.querySelector("#setlistMoreBtn"),
  setlistDayMenu: document.querySelector("#setlistDayMenu"),
  setlistDayMeta: document.querySelector("#setlistDayMeta"),
  setlistDayRoster: document.querySelector("#setlistDayRoster"),
  setlistDetails: document.querySelector("#setlistDetails"),
  setlistAddSheet: document.querySelector("#setlistAddSheet"),
  setlistAddList: document.querySelector("#setlistAddList"),
  setlistAddClose: document.querySelector("#setlistAddClose"),
  setlistTitle: document.querySelector("#setlistTitleInput"),
  setlistNotes: document.querySelector("#setlistNotesInput"),
  serviceDate: document.querySelector("#serviceDate"),
  serviceTime: document.querySelector("#serviceTime"),
  eventFields: document.querySelector("#eventFields"),
  agendaSettings: document.querySelector("#agendaSettingsBtn"),
  agendaHub: document.querySelectorAll("[data-agenda-hub]"),
  agendaEventsPane: document.querySelector("#agendaEventsPane"),
  agendaTeamPane: document.querySelector("#agendaTeamPane"),
  agendaMonthPane: document.querySelector("#agendaMonthPane"),
  teamList: document.querySelector("#teamList"),
  agendaMonth: document.querySelector("#agendaMonth"),
  setlistAddSearch: document.querySelector("#setlistAddSearch"),
  memberSheet: document.querySelector("#memberSheet"),
  memberSheetTitle: document.querySelector("#memberSheetTitle"),
  memberSheetClose: document.querySelector("#memberSheetClose"),
  memberNameInput: document.querySelector("#memberNameInput"),
  memberRoleChips: document.querySelector("#memberRoleChips"),
  memberRoleInput: document.querySelector("#memberRoleInput"),
  memberRoleAdd: document.querySelector("#memberRoleAdd"),
  memberNoteInput: document.querySelector("#memberNoteInput"),
  memberSave: document.querySelector("#memberSave"),
  memberDelete: document.querySelector("#memberDelete"),
  peoplePickerSheet: document.querySelector("#peoplePickerSheet"),
  peoplePickerTitle: document.querySelector("#peoplePickerTitle"),
  peoplePickerLead: document.querySelector("#peoplePickerLead"),
  peoplePickerClose: document.querySelector("#peoplePickerClose"),
  peoplePickerSearch: document.querySelector("#peoplePickerSearch"),
  peoplePickerList: document.querySelector("#peoplePickerList"),
  peoplePickerDone: document.querySelector("#peoplePickerDone"),
  agendaSettingsSheet: document.querySelector("#agendaSettingsSheet"),
  agendaSettingsClose: document.querySelector("#agendaSettingsClose"),
  agendaSectionEditor: document.querySelector("#agendaSectionEditor"),
  agendaFieldEditor: document.querySelector("#agendaFieldEditor"),
  agendaAddField: document.querySelector("#agendaAddField"),
  agendaSettingsSave: document.querySelector("#agendaSettingsSave"),
  shareService: document.querySelector("#shareServiceBtn"),
  whatsappService: document.querySelector("#whatsappServiceBtn"),
  setlistPicker: document.querySelector("#setlistSongPicker"),
  setlistAddSong: document.querySelector("#setlistAddSong"),
  serviceEditorTitle: document.querySelector("#serviceEditorTitle"),
  saveSetlist: document.querySelector("#saveSetlistBtn"),
  openSetlist: document.querySelector("#openSetlistBtn"),
  setlistPlaySheet: document.querySelector("#setlistPlaySheet"),
  setlistPlayClose: document.querySelector("#setlistPlayClose"),
  setlistPlayExit: document.querySelector("#setlistPlayExit"),
  deleteSetlist: document.querySelector("#deleteSetlistBtn"),
  exportSelected: document.querySelector("#exportSelectedBtn"),
  exportRepertoire: document.querySelector("#exportRepertoireBtn"),
  importInputs: [document.querySelector("#importFileInputAlt"), document.querySelector("#restoreFileInput")],
  fileLog: document.querySelector("#fileLog"),
  toast: document.querySelector("#toast"),
  pasteChart: document.querySelector("#pasteChart"),
  pasteChartInput: document.querySelector("#pasteChartInput"),
  sitesSearchBtn: document.querySelector("#sitesSearchBtn"),
  moreGo: document.querySelectorAll("[data-more-go]"),
  pasteChartClose: document.querySelector("#pasteChartClose"),
  pasteChartApply: document.querySelector("#pasteChartApply"),
  pasteChartClipboard: document.querySelector("#pasteChartClipboard"),
  toolbarSync: document.querySelector("#toolbarSyncBtn"),
  syncBanner: document.querySelector("#syncBanner"),
  syncBannerText: document.querySelector("#syncBannerText"),
  syncBannerBtn: document.querySelector("#syncBannerBtn"),
  syncHostBtn: document.querySelector("#syncHostBtn"),
  syncJoinBtn: document.querySelector("#syncJoinBtn"),
  syncStopBtn: document.querySelector("#syncStopBtn"),
  syncJoinInput: document.querySelector("#syncJoinInput"),
  syncCodeDisplay: document.querySelector("#syncCodeDisplay"),
  syncStatus: document.querySelector("#syncStatus"),
  syncHostSheet: document.querySelector("#syncHostSheet"),
  syncHostSheetCode: document.querySelector("#syncHostSheetCode"),
  syncHostSheetClose: document.querySelector("#syncHostSheetClose"),
  syncHostSheetStatus: document.querySelector("#syncHostSheetStatus"),
  syncAuthSheet: document.querySelector("#syncAuthSheet"),
  syncAuthAllow: document.querySelector("#syncAuthAllow"),
  syncAuthDeny: document.querySelector("#syncAuthDeny"),
  editorPreviewTitle: document.querySelector("#editorPreviewTitle"),
  editorPreviewMeta: document.querySelector("#editorPreviewMeta"),
  editorPreviewBody: document.querySelector("#editorPreviewBody"),
};

document.documentElement.classList.toggle("dark", effectiveTheme() === "dark");
applyLook(document.documentElement, savedLook);
window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", () => {
  if (state.theme === "auto") applyTheme();
});

bindEvents();
persist();
render();
registerServiceWorker();
window.ChordBookNative = {
  stageStep(direction) {
    return applyStageStep(direction === "prev" ? -1 : 1);
  },
  goBack() {
    return handleAppBack();
  },
};

function bindEvents() {
  el.homeShortcuts.forEach((button) => button.addEventListener("click", () => switchView(button.dataset.view)));
  el.toolbarFavs?.addEventListener("click", () => {
    switchView("library");
    setLibraryFilter("favorites");
  });
  el.toolbarSync?.addEventListener("click", () => startComputerHost({ openSheet: true }));
  el.syncBannerBtn?.addEventListener("click", handleSyncBannerClick);
  el.syncHostBtn?.addEventListener("click", () => startComputerHost({ openSheet: true }));
  el.syncJoinBtn?.addEventListener("click", joinComputerHost);
  el.syncStopBtn?.addEventListener("click", () => stopSyncLink(true));
  el.syncJoinInput?.addEventListener("input", formatSyncCodeInput);
  el.syncJoinInput?.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      joinComputerHost();
    }
  });
  el.syncHostSheetClose?.addEventListener("click", () => setSyncHostSheetOpen(false));
  el.syncHostSheet?.addEventListener("click", (event) => {
    if (event.target === el.syncHostSheet) setSyncHostSheetOpen(false);
  });
  el.syncAuthAllow?.addEventListener("click", allowSyncComputer);
  el.syncAuthDeny?.addEventListener("click", denySyncComputer);
  [el.title, el.artist, el.category, el.capo, el.cue, el.lines].forEach((field) => {
    field?.addEventListener("input", updateEditorPreview);
  });
  el.themePills.forEach((button) => button.addEventListener("click", () => setTheme(button.dataset.theme)));
  el.songCapoDown?.addEventListener("click", () => changeCapo(-1));
  el.songCapoUp?.addEventListener("click", () => changeCapo(1));
  el.songOpenStage2?.addEventListener("click", openStageMode);
  el.songEdit?.addEventListener("click", editSelectedFromStage);
  el.songAutoScrollSwitch?.addEventListener("change", (event) => setPreferAutoScroll(event.target.checked));
  el.songFocusSwitch?.addEventListener("change", (event) => setFocusChart(event.target.checked));
  el.songShowChordsSwitch?.addEventListener("change", (event) => setShowChords(event.target.checked));
  el.songShowLyricsSwitch?.addEventListener("change", (event) => setShowLyrics(event.target.checked));
  el.moreAutoScrollSwitch?.addEventListener("change", (event) => setPreferAutoScroll(event.target.checked));
  el.moreFocusSwitch?.addEventListener("change", (event) => setFocusChart(event.target.checked));
  el.moreShowChordsSwitch?.addEventListener("change", (event) => setShowChords(event.target.checked));
  el.moreShowLyricsSwitch?.addEventListener("change", (event) => setShowLyrics(event.target.checked));
  el.navTabs.forEach((button) => button.addEventListener("click", () => switchView(button.dataset.view)));
  el.bottomNav.forEach((button) => button.addEventListener("click", () => {
    if (button.dataset.view === "library") {
      setLibraryFilter("all");
      setLibraryKeyFilter("");
      if (el.categoryFilter) el.categoryFilter.value = "Todas";
      searchScope = "library";
      el.searchScope.forEach((btn) => btn.classList.toggle("active", btn.dataset.searchScope === "library"));
    }
    switchView(button.dataset.view);
  }));
  el.libraryFilters.forEach((button) => button.addEventListener("click", () => setLibraryFilter(button.dataset.libraryFilter)));
  el.setlistFilters.forEach((button) => button.addEventListener("click", () => setSetlistFilter(button.dataset.setlistFilter)));
  window.addEventListener("resize", () => {
    updateResponsiveStageFont();
    updateSyncUi();
  });
  window.addEventListener("keydown", handleStageHotkeys);
  window.addEventListener("keydown", handleEditorSaveHotkey);
  window.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") return;
    if (handleAppBack()) event.preventDefault();
  });
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "visible" && (el.appShell.classList.contains("stage-active") || isSetlistPlaying)) {
      requestStageWakeLock();
    }
  });
  el.search.addEventListener("input", renderSongs);
  el.search.addEventListener("keydown", (event) => {
    if (event.key === "Enter" && searchScope === "sites") {
      event.preventDefault();
      const first = el.songList.querySelector(".site-search-row");
      if (first) first.click();
    }
  });
  el.searchScope.forEach((button) => button.addEventListener("click", () => setSearchScope(button.dataset.searchScope)));
  el.categoryFilter.addEventListener("change", renderSongs);
  el.newSong.addEventListener("click", createSong);
  el.libraryFab.addEventListener("click", createSong);
  el.sampleMore.addEventListener("click", addSample);
  el.clearLibrary?.addEventListener("click", clearLibraryData);
  el.fontDownMore.addEventListener("click", () => changeLookFont(-2));
  el.fontUpMore.addEventListener("click", () => changeLookFont(2));
  el.lookStudio?.addEventListener("click", handleLookStudioClick);
  el.lookSave?.addEventListener("click", saveLookDraft);
  el.lookCancel?.addEventListener("click", () => discardLookDraft(true));
  el.form.addEventListener("submit", saveSong);
  el.closeEditor.addEventListener("click", closeSongEditor);
  el.openStageFromEditor.addEventListener("click", openEditorSong);
  el.favorite.addEventListener("click", toggleFavorite);
  el.duplicate.addEventListener("click", duplicateSong);
  el.delete.addEventListener("click", deleteSong);
  el.songBack.addEventListener("click", () => handleAppBack());
  el.setlistPlayExit?.addEventListener("click", () => handleAppBack());
  el.songFav.addEventListener("click", toggleFavorite);
  el.songMore.addEventListener("click", toggleSongReadMenu);
  el.songTransposeDown.addEventListener("click", () => transposeSelected(-1));
  el.songTransposeUp.addEventListener("click", () => transposeSelected(1));
  el.songKeyBadgeDown?.addEventListener("click", () => transposeSelected(-1));
  el.songKeyBadgeUp?.addEventListener("click", () => transposeSelected(1));
  el.songFontDown.addEventListener("click", () => changeStageFont(-2));
  el.songFontUp.addEventListener("click", () => changeStageFont(2));
  bindChartPinch(el.songReadContent?.closest(".song-sheet"));
  bindChartPinch(el.stageContent);
  el.songOpenStage.addEventListener("click", openStageMode);
  el.songSetlist.addEventListener("click", openSetlistPickerFromSong);
  el.songScroll.addEventListener("click", toggleAutoScroll);
  el.songChords.addEventListener("click", toggleChordSheet);
  el.chordSheetClose.addEventListener("click", closeChordSheet);
  el.langButtons.forEach((button) => button.addEventListener("click", () => setLanguage(button.dataset.lang)));
  el.stageExit.addEventListener("click", () => handleAppBack());
  el.stageMenu.addEventListener("click", toggleMobileSongMenu);
  el.stagePrev.addEventListener("click", () => moveSetlistStage(-1));
  el.stageScroll.addEventListener("click", toggleAutoScroll);
  el.stageNext.addEventListener("click", () => moveSetlistStage(1));
  el.stageTransposeDown.addEventListener("click", () => transposeSelected(-1));
  el.stageTransposeUp.addEventListener("click", () => transposeSelected(1));
  el.stageShell.addEventListener("touchstart", handleStageTouchStart, { passive: true });
  el.stageShell.addEventListener("touchend", handleStageTouchEnd, { passive: true });
  el.songRead?.addEventListener("touchstart", handleSongSetlistTouchStart, { passive: true });
  el.songRead?.addEventListener("touchend", handleSongSetlistTouchEnd, { passive: true });
  el.stageContent.addEventListener("click", handleStageContentClick);
  el.stageContent.addEventListener("wheel", handleStageManualScroll, { passive: true });
  el.stageContent.addEventListener("touchmove", handleStageManualScroll, { passive: true });
  el.songReadContent.addEventListener("wheel", handleStageManualScroll, { passive: true });
  el.songReadContent.addEventListener("touchmove", handleStageManualScroll, { passive: true });
  el.newSetlist.addEventListener("click", () => {
    if (agendaHub === "team") openMemberEditor();
    else createSetlist();
  });
  el.setlistFab.addEventListener("click", () => {
    if (agendaHub === "team") openMemberEditor();
    else createSetlist();
  });
  el.agendaHub.forEach((button) => button.addEventListener("click", () => setAgendaHub(button.dataset.agendaHub)));
  el.agendaSettings?.addEventListener("click", () => setAgendaSettingsOpen(true));
  el.agendaSettingsClose?.addEventListener("click", () => setAgendaSettingsOpen(false));
  el.agendaSettingsSheet?.addEventListener("click", (event) => {
    if (event.target === el.agendaSettingsSheet) setAgendaSettingsOpen(false);
  });
  el.agendaAddField?.addEventListener("click", addCustomAgendaField);
  el.agendaSettingsSave?.addEventListener("click", () => setAgendaSettingsOpen(false));
  el.memberSheetClose?.addEventListener("click", () => setMemberSheetOpen(false));
  el.memberSheet?.addEventListener("click", (event) => {
    if (event.target === el.memberSheet) setMemberSheetOpen(false);
  });
  el.memberRoleAdd?.addEventListener("click", addDraftMemberRole);
  el.memberRoleInput?.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      addDraftMemberRole();
    }
  });
  el.memberSave?.addEventListener("click", saveTeamMember);
  el.memberDelete?.addEventListener("click", deleteTeamMember);
  el.peoplePickerClose?.addEventListener("click", () => setPeoplePickerOpen(false));
  el.peoplePickerDone?.addEventListener("click", applyPeoplePicker);
  el.peoplePickerSheet?.addEventListener("click", (event) => {
    if (event.target === el.peoplePickerSheet) setPeoplePickerOpen(false);
  });
  el.setlistAddSearch?.addEventListener("input", () => {
    setlistAddQuery = el.setlistAddSearch.value;
    renderSongCheckLists();
  });
  el.peoplePickerSearch?.addEventListener("input", () => {
    peoplePickerQuery = el.peoplePickerSearch.value;
    renderPeoplePicker();
  });
  el.serviceDate?.addEventListener("change", () => {
    const setlist = selectedSetlist();
    if (!setlist) return;
    setlist.service = readServiceFromForm();
  });
  el.serviceTime?.addEventListener("change", () => {
    const setlist = selectedSetlist();
    if (!setlist) return;
    setlist.service = readServiceFromForm();
  });
  el.closeSetlist.addEventListener("click", () => handleAppBack());
  el.setlistEditDetails?.addEventListener("click", () => {
    isSetlistDetailsOpen = !isSetlistDetailsOpen;
    isSetlistAddOpen = false;
    isSetlistDayMenuOpen = false;
    renderSetlists();
    if (isSetlistDetailsOpen) requestAnimationFrame(() => el.setlistTitle?.focus());
  });
  el.setlistAdd?.addEventListener("click", () => {
    isSetlistAddOpen = !isSetlistAddOpen;
    isSetlistDayMenuOpen = false;
    renderSetlists();
  });
  el.setlistAddClose?.addEventListener("click", () => {
    isSetlistAddOpen = false;
    renderSetlists();
  });
  el.setlistAddSheet?.addEventListener("click", (event) => {
    if (event.target === el.setlistAddSheet) {
      isSetlistAddOpen = false;
      renderSetlists();
    }
  });
  el.setlistMore?.addEventListener("click", () => {
    isSetlistDayMenuOpen = !isSetlistDayMenuOpen;
    isSetlistAddOpen = false;
    renderSetlistDayMenu();
  });
  el.saveSetlist.addEventListener("click", () => saveSetlist());
  el.shareService?.addEventListener("click", () => shareServiceProgram());
  el.whatsappService?.addEventListener("click", shareServiceWhatsApp);
  el.openSetlist.addEventListener("click", askSetlistPlayMode);
  el.setlistPlayClose?.addEventListener("click", closeSetlistPlaySheet);
  el.setlistPlaySheet?.addEventListener("click", (event) => {
    if (event.target === el.setlistPlaySheet) closeSetlistPlaySheet();
  });
  el.setlistPlaySheet?.querySelectorAll("[data-play-mode]").forEach((button) => {
    button.addEventListener("click", () => openSelectedSetlist(button.dataset.playMode));
  });
  el.deleteSetlist.addEventListener("click", deleteSetlist);
  el.exportSelected.addEventListener("click", exportSelectedSong);
  el.exportRepertoire.addEventListener("click", exportRepertoire);
  el.importInputs.filter(Boolean).forEach((input) => input.addEventListener("change", importFile));
  document.querySelectorAll("[data-open-paste]").forEach((button) => {
    button.addEventListener("click", () => openPasteChart(true));
  });
  el.sitesSearchBtn?.addEventListener("click", () => {
    switchView("library");
    setSearchScope("sites");
  });
  el.moreGo.forEach((button) => button.addEventListener("click", () => {
    const go = button.dataset.moreGo;
    if (go === "favorites") {
      switchView("library");
      setLibraryFilter("favorites");
      return;
    }
    if (go === "recent") {
      switchView("library");
      setLibraryFilter("recent");
      return;
    }
    if (go === "import-file") {
      document.querySelector("#importFileInputAlt")?.click();
      return;
    }
    if (go === "export") {
      exportRepertoire();
      return;
    }
    if (go === "about") {
      document.querySelector("#moreAbout")?.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }
    if (go === "sync") {
      switchView("import");
      requestAnimationFrame(() => document.querySelector("#syncPanel")?.scrollIntoView({ behavior: "smooth", block: "start" }));
      return;
    }
    switchView(go);
  }));
  el.pasteChartClose?.addEventListener("click", closePasteChart);
  el.pasteChartApply?.addEventListener("click", applyPastedChart);
  el.pasteChartClipboard?.addEventListener("click", pasteChartFromClipboard);
  el.pasteChart?.addEventListener("click", (event) => {
    if (event.target === el.pasteChart) closePasteChart();
  });
  bindSongToolsSheet();
}

function render() {
  applyI18n();
  applyTheme();
  renderCategories();
  renderLibraryRail();
  renderSongs();
  renderEditor();
  renderSongView();
  renderStage();
  renderSetlists();
  renderMore();
  syncChartPrefs();
  updateScrollButtons();
  syncSetlistPlayChrome();
}

function isStageRundownWide() {
  return window.matchMedia("(min-width: 768px)").matches;
}

function switchView(view) {
  if (view !== "library") closePasteChart();
  if (view !== "library") isEditingSong = false;
  if (view !== "setlists") {
    isEditingSetlist = false;
    isSetlistDetailsOpen = false;
    isSetlistAddOpen = false;
    isSetlistDayMenuOpen = false;
  }
  const keepScroll = isAutoScrolling && (view === "song" || view === "stage");
  const enteringStage = view === "stage" && !el.appShell.classList.contains("stage-active");
  const importOpen = document.querySelector("#importView")?.classList.contains("active");
  if (view === "import") {
    if (!importOpen) startLookSession();
  } else if (importOpen && lookDirty()) {
    discardLookDraft();
  }
  if (view !== "stage") {
    isMobileSongMenuOpen = false;
    stageMenuQuery = "";
    setStageFocus(false);
  } else if (enteringStage) {
    isMobileSongMenuOpen = false;
    setStageFocus(true);
  }
  if (view !== "song") {
    isSongToolsOpen = false;
    el.appShell.classList.remove("tools-open");
  }
  if (view !== "song" && view !== "stage") {
    isSetlistPlaying = false;
    setlistPlayFinished = false;
    stopAutoScroll();
  }
  if (view !== "song") {
    isSongReadMenuOpen = false;
    isSetlistPickerOpen = false;
    isChordSheetOpen = false;
  }
  activeView = view;
  const navView = view === "song" ? "library" : view;
  el.navTabs.forEach((button) => button.classList.toggle("active", button.dataset.view === navView));
  el.bottomNav.forEach((button) => button.classList.toggle("active", button.dataset.view === navView));
  el.views.forEach((section) => section.classList.toggle("active", section.id === `${view}View`));
  el.appShell.classList.toggle("library-active", view === "library");
  el.appShell.classList.toggle("setlists-active", view === "setlists");
  el.appShell.classList.toggle("import-active", view === "import");
  el.appShell.classList.toggle("song-active", view === "song");
  el.appShell.classList.toggle("stage-active", view === "stage");
  el.appShell.classList.toggle("editing-song", view === "library" && isEditingSong);
  el.appShell.classList.toggle("editing-setlist", view === "setlists" && isEditingSetlist);
  if (view === "stage" || (view === "song" && isSetlistPlaying)) requestStageWakeLock();
  else releaseStageWakeLock();
  renderSongReadMenu();
  renderMobileSongMenu();
  renderLibraryRail();
  if (keepScroll) startAutoScroll();
  syncSetlistPlayChrome();
}

function setLibraryFilter(filter) {
  libraryFilter = filter === "favorites" || filter === "recent" ? filter : "all";
  el.libraryFilters.forEach((button) => button.classList.toggle("active", button.dataset.libraryFilter === libraryFilter));
  renderSongs();
  renderLibraryRail();
}

function setLibraryKeyFilter(key) {
  libraryKeyFilter = key || "";
  renderSongs();
  renderLibraryRail();
}

function setSearchScope(scope) {
  searchScope = scope === "sites" ? "sites" : "library";
  el.searchScope.forEach((button) => button.classList.toggle("active", button.dataset.searchScope === searchScope));
  el.search.dataset.i18nPlaceholder = searchScope === "sites" ? "search.sitesPlaceholder" : "search.placeholder";
  el.search.placeholder = t(el.search.dataset.i18nPlaceholder);
  if (searchScope === "sites") switchView("library");
  renderSongs();
  el.search.focus();
}

function editSelectedFromStage() {
  if (!selectedSong()) return;
  isEditingSong = true;
  switchView("library");
  renderEditor();
  el.lines.focus();
}

function editSelectedSong() {
  if (!selectedSong()) return;
  isEditingSong = true;
  switchView("library");
  renderEditor();
  el.title.focus();
}

function closeSongEditor() {
  isEditingSong = false;
  el.appShell.classList.remove("editing-song");
}

function openEditorSong() {
  if (!selectedSong()) return;
  activeSetlistId = null;
  markSongOpened(selectedSongId);
  switchView("song");
}

function openSongView() {
  if (!selectedSong()) return;
  markSongOpened(selectedSongId);
  switchView("song");
}

function openStageMode() {
  if (!selectedSong()) return;
  markSongOpened(selectedSongId);
  switchView("stage");
}

function markSongOpened(songId) {
  const song = state.songs.find((item) => item.id === songId);
  if (!song) return;
  song.lastOpenedAt = new Date().toISOString();
  persist();
}

function openSetlistPickerFromSong() {
  isSongReadMenuOpen = true;
  isSetlistPickerOpen = true;
  renderSongReadMenu();
}

function closeSongView() {
  isSetlistPlaying = false;
  setlistPlayFinished = false;
  if (activeSetlistId) {
    selectedSetlistId = activeSetlistId;
    isEditingSetlist = true;
    switchView("setlists");
    return;
  }
  switchView("library");
}

function closeStageList() {
  if (!isMobileSongMenuOpen) return false;
  isMobileSongMenuOpen = false;
  stageMenuQuery = "";
  syncStageChrome();
  renderMobileSongMenu();
  return true;
}

function handleAppBack() {
  if (el.setlistPlaySheet && !el.setlistPlaySheet.hidden) {
    closeSetlistPlaySheet();
    return true;
  }
  if (isMemberSheetOpen) {
    setMemberSheetOpen(false);
    return true;
  }
  if (isPeoplePickerOpen) {
    setPeoplePickerOpen(false);
    return true;
  }
  if (isAgendaSettingsOpen) {
    setAgendaSettingsOpen(false);
    return true;
  }
  if (el.pasteChart && !el.pasteChart.hidden) {
    closePasteChart();
    return true;
  }
  if (el.syncHostSheet && !el.syncHostSheet.hidden) {
    setSyncHostSheetOpen(false);
    return true;
  }
  if (el.syncAuthSheet && !el.syncAuthSheet.hidden) {
    denySyncComputer();
    return true;
  }
  if (isChordSheetOpen) {
    closeChordSheet();
    return true;
  }
  if (isSetlistAddOpen || isSetlistDetailsOpen || isSetlistDayMenuOpen) {
    isSetlistAddOpen = false;
    isSetlistDetailsOpen = false;
    isSetlistDayMenuOpen = false;
    renderSetlists();
    return true;
  }
  if (isSongToolsOpen) {
    setSongToolsOpen(false);
    return true;
  }
  if (isSongReadMenuOpen) {
    isSongReadMenuOpen = false;
    isSetlistPickerOpen = false;
    renderSongReadMenu();
    return true;
  }
  if (closeStageList()) return true;
  if (el.appShell.classList.contains("stage-active")) {
    if (isSetlistPlaying || activeSetlistId) closeSongView();
    else openSongView();
    return true;
  }
  if (el.appShell.classList.contains("song-active")) {
    closeSongView();
    return true;
  }
  if (isEditingSetlist) {
    closeSetlistEditor();
    return true;
  }
  if (isEditingSong) {
    closeSongEditor();
    switchView("library");
    return true;
  }
  if (activeView === "setlists" || activeView === "import") {
    switchView("library");
    return true;
  }
  return false;
}

function setSetlistFilter(filter) {
  setlistFilter = filter === "recent" ? "recent" : "all";
  el.setlistFilters.forEach((button) => button.classList.toggle("active", button.dataset.setlistFilter === setlistFilter));
  renderSetlists();
}

function songWrittenKey(song) {
  const key = songKey(song);
  if (!key) return "";
  return transposeChord(key, song.transposeValue || 0) || key;
}

function compareSongKeys(a, b) {
  const prefer = ["G", "C", "D", "A", "E", "F", "B", "Em", "Am", "Dm", "Bm"];
  const ia = prefer.indexOf(a);
  const ib = prefer.indexOf(b);
  if (ia !== -1 || ib !== -1) {
    if (ia === -1) return 1;
    if (ib === -1) return -1;
    return ia - ib;
  }
  return a.localeCompare(b);
}

function updateLibraryFilterCounts() {
  const counts = {
    all: state.songs.length,
    recent: state.songs.filter((song) => song.lastOpenedAt).length,
    favorites: state.songs.filter((song) => song.isFavorite).length,
  };
  el.libraryFilters.forEach((button) => {
    const countEl = button.querySelector(".filter-count");
    if (!countEl) return;
    countEl.textContent = String(counts[button.dataset.libraryFilter] ?? 0);
  });
}

function renderKeyFilters(songs) {
  if (!el.keyFilters) return;
  const keys = [...new Set(songs.map(songWrittenKey).filter(Boolean))].sort(compareSongKeys);
  if (libraryKeyFilter && !keys.includes(libraryKeyFilter)) libraryKeyFilter = "";
  const chips = [
    `<button type="button" class="key-chip ${libraryKeyFilter ? "" : "active"}" data-key-filter="" aria-pressed="${libraryKeyFilter ? "false" : "true"}">${t("library.allKeys")}</button>`,
    ...keys.map((key) => `<button type="button" class="key-chip ${libraryKeyFilter === key ? "active" : ""}" data-key-filter="${escapeHtml(key)}" aria-pressed="${libraryKeyFilter === key ? "true" : "false"}">${escapeHtml(key)}</button>`),
  ];
  el.keyFilters.innerHTML = keys.length ? chips.join("") : "";
  el.keyFilters.querySelectorAll("[data-key-filter]").forEach((button) => {
    button.addEventListener("click", () => setLibraryKeyFilter(button.dataset.keyFilter || ""));
  });
}

function libraryScopeSongs() {
  const query = normalize(el.search.value);
  const category = el.categoryFilter.value || "Todas";
  return state.songs
    .filter((song) => libraryFilter !== "favorites" || song.isFavorite)
    .filter((song) => libraryFilter !== "recent" || song.lastOpenedAt)
    .filter((song) => category === "Todas" || (song.category || "Geral") === category)
    .filter((song) => normalize([song.title, song.artist, song.category, songWrittenKey(song), song.lines.join(" ")].join(" ")).includes(query));
}

function renderCategories() {
  const categories = ["Todas", ...new Set(state.songs.map((song) => song.category || "Geral").sort())];
  const current = el.categoryFilter.value || "Todas";
  el.categoryFilter.innerHTML = categories.map((category) => `<option value="${escapeHtml(category)}">${escapeHtml(category === "Todas" ? t("library.allCategories") : category)}</option>`).join("");
  el.categoryFilter.value = categories.includes(current) ? current : "Todas";
  renderCategoryFilters(categories);
}

function renderCategoryFilters(categories) {
  if (!el.categoryFilters) return;
  const current = el.categoryFilter.value || "Todas";
  el.categoryFilters.innerHTML = categories.map((category) => {
    const label = category === "Todas" ? t("library.allCategories") : category;
    const active = current === category ? "active" : "";
    return `<button type="button" class="key-chip ${active}" data-category-filter="${escapeHtml(category)}">${escapeHtml(label)}</button>`;
  }).join("");
  el.categoryFilters.querySelectorAll("[data-category-filter]").forEach((button) => {
    button.addEventListener("click", () => {
      el.categoryFilter.value = button.dataset.categoryFilter;
      renderSongs();
      renderLibraryRail();
      renderCategoryFilters(["Todas", ...new Set(state.songs.map((song) => song.category || "Geral").sort())]);
    });
  });
}

function renderLibraryRail() {
  if (!el.libraryRail) return;
  const counts = {
    all: state.songs.length,
    recent: state.songs.filter((song) => song.lastOpenedAt).length,
    favorites: state.songs.filter((song) => song.isFavorite).length,
    setlists: state.setlists.length,
  };
  const onLibrary = activeView === "library";
  el.libraryRail.innerHTML = `
    <button type="button" class="rail-item ${onLibrary && libraryFilter === "all" ? "active" : ""}" data-rail="all">${t("library.allSongs")} <span>${counts.all}</span></button>
    <button type="button" class="rail-item ${onLibrary && libraryFilter === "favorites" ? "active" : ""}" data-rail="favorites">${t("library.favorites")} <span>${counts.favorites}</span></button>
    <button type="button" class="rail-item ${onLibrary && libraryFilter === "recent" ? "active" : ""}" data-rail="recent">${t("library.recent")} <span>${counts.recent}</span></button>
    <button type="button" class="rail-item ${activeView === "setlists" ? "active" : ""}" data-rail-view="setlists">${t("nav.setlists")} <span>${counts.setlists}</span></button>
  `;
  el.libraryRail.querySelectorAll("[data-rail]").forEach((button) => {
    button.addEventListener("click", () => {
      switchView("library");
      setLibraryFilter(button.dataset.rail);
    });
  });
  el.libraryRail.querySelectorAll("[data-rail-view]").forEach((button) => {
    button.addEventListener("click", () => switchView(button.dataset.railView));
  });
}

function renderSongs() {
  el.appShell.classList.toggle("searching-sites", searchScope === "sites");
  if (searchScope === "sites") {
    renderSiteSearch();
    return;
  }
  const scoped = libraryScopeSongs();
  const songs = scoped
    .filter((song) => !libraryKeyFilter || songWrittenKey(song) === libraryKeyFilter)
    .sort((a, b) => {
      if (libraryFilter === "recent") return String(b.lastOpenedAt || "").localeCompare(String(a.lastOpenedAt || ""));
      return Number(b.isFavorite) - Number(a.isFavorite) || a.title.localeCompare(b.title);
    });

  el.libraryCount.textContent = libraryFilter === "favorites"
    ? countLabel(songs.length, "library.favOne", "library.favMany")
    : countLabel(songs.length, "library.countOne", "library.countMany");
  const query = el.search.value.trim();
  const emptyKey = libraryKeyFilter
    ? "library.emptyKey"
    : libraryFilter === "favorites" ? "library.emptyFavorites"
    : libraryFilter === "recent" ? "library.emptyRecent"
    : state.songs.length ? "library.empty" : "library.emptyStart";
  const trySites = !songs.length && query ? `<button type="button" class="site-search-cta" data-try-sites>${t("search.trySites")}</button>` : "";
  el.songList.innerHTML = songs.length ? songs.map(songRow).join("") : `<p class="empty">${t(emptyKey)}</p>${trySites}`;
  el.songList.querySelectorAll(".song-more[data-song-id]").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      toggleSongAccordion(button.dataset.songId);
    });
  });
  el.songList.querySelectorAll("[data-play-id]").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      selectedSongId = button.dataset.playId;
      activeSetlistId = null;
      expandedSongId = null;
      markSongOpened(selectedSongId);
      render();
      switchView("song");
    });
  });
  el.songList.querySelectorAll("[data-fav-id]").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      toggleFavoriteById(button.dataset.favId);
    });
  });
  el.songList.querySelectorAll("[data-preview-action]").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      selectedSongId = button.dataset.songId;
      const action = button.dataset.previewAction;
      if (action === "edit") editSelectedSong();
      if (action === "stage") {
        activeSetlistId = null;
        markSongOpened(selectedSongId);
        render();
        switchView("stage");
      }
      if (action === "chart") {
        markSongOpened(selectedSongId);
        render();
        switchView("song");
      }
      if (action === "youtube") openMusicSearch("youtube");
    });
  });
  el.songList.querySelector("[data-try-sites]")?.addEventListener("click", () => setSearchScope("sites"));
}

function siteSearchTargets(query) {
  const q = String(query || "").trim();
  const encoded = encodeURIComponent(q);
  return [
    {
      name: "Cifra Club",
      href: q ? `https://www.cifraclub.com.br/search/?q=${encoded}` : "https://www.cifraclub.com.br/",
    },
    {
      name: "La Cuerda",
      href: q ? `https://acordes.lacuerda.net/cont/resul.php?canc=${encoded}` : "https://acordes.lacuerda.net/",
    },
    {
      name: "Ultimate Guitar",
      href: q ? `https://www.ultimate-guitar.com/search.php?search_type=title&value=${encoded}` : "https://www.ultimate-guitar.com/",
    },
  ].map((site) => ({
    ...site,
    detail: q ? t("search.sitesOpen", { q }) : t("search.sitesHome", { name: site.name }),
  }));
}

function renderSiteSearch() {
  const query = el.search.value.trim();
  el.libraryCount.textContent = t("search.sitesCount");
  const rows = siteSearchTargets(query).map((site) => `
    <a class="site-search-row" href="${escapeHtml(site.href)}" target="_blank" rel="noopener">
      <span class="song-main">
        <strong>${escapeHtml(site.name)}</strong>
        <small>${escapeHtml(site.detail)}</small>
      </span>
      <span class="site-search-open">↗</span>
    </a>
  `).join("");
  el.songList.innerHTML = `
    <p class="empty compact">${query ? t("search.sitesLead") : t("search.sitesEmpty")}</p>
    ${rows}
    ${query ? `<button type="button" class="site-search-cta" data-paste-from-search>${t("search.thenPaste")}</button>` : ""}
  `;
  el.songList.querySelector("[data-paste-from-search]")?.addEventListener("click", () => {
    const reuse = isEditingSong && selectedSong() && isPlaceholderTitle(selectedSong().title);
    openPasteChart(!reuse);
  });
}

function songRow(song) {
  const written = songWrittenKey(song);
  const artistHtml = song.artist ? `<small>${escapeHtml(song.artist)}</small>` : "";
  return `
    <article class="song-item ${song.id === selectedSongId ? "active" : ""}" data-song-wrap="${escapeHtml(song.id)}">
      <div class="song-row library-song-row">
        <button type="button" class="song-fav ${song.isFavorite ? "on" : ""}" data-fav-id="${escapeHtml(song.id)}" aria-label="${song.isFavorite ? t("library.unfavorite") : t("library.favorite")}" title="${t("library.favorite")}">★</button>
        <button type="button" class="song-open-main" data-play-id="${escapeHtml(song.id)}">
          <span class="song-main">
            <strong>${escapeHtml(song.title || t("song.noTitle"))}</strong>
            ${artistHtml}
          </span>
        </button>
        ${written ? `<span class="song-key">${escapeHtml(written)}</span>` : `<span class="song-key muted">—</span>`}
      </div>
    </article>
  `;
}

function toggleSongAccordion(songId) {
  expandedSongId = expandedSongId === songId ? null : songId;
  if (expandedSongId) {
    selectedSongId = expandedSongId;
    activeSetlistId = null;
  }
  renderSongs();
  renderEditor();
  if (!expandedSongId) return;
  requestAnimationFrame(() => {
    el.songList.querySelector(`[data-song-wrap="${songId}"]`)?.scrollIntoView({ block: "nearest", behavior: "smooth" });
  });
}

function renderEditor() {
  const song = selectedSong();
  const disabled = !song;
  [el.title, el.artist, el.category, el.capo, el.cue, el.lines, el.favorite, el.duplicate, el.delete, el.openStageFromEditor].forEach((field) => {
    if (field) field.disabled = disabled;
  });
  el.title.value = song?.title ?? "";
  el.artist.value = song?.artist ?? "";
  el.category.value = song?.category ?? "";
  el.capo.value = song?.capo ?? 0;
  if (el.cue) el.cue.value = song?.cue ?? "";
  el.lines.value = song ? foldStackedChords(song.lines).join("\n") : "";
  el.favorite.textContent = song?.isFavorite ? t("library.unfavorite") : t("library.favorite");
  updateEditorPreview();
}

function songChartHtml(song) {
  return renderChartLines(song.lines, song.transposeValue || 0);
}

function renderSongView() {
  const song = selectedSong();
  renderSongReadMenu();
  renderChordSheet();
  renderCapoHint(song);
  if (!song) {
    el.songReadTitle.textContent = t("song.untitled");
    el.songReadMeta.textContent = "";
    el.songReadContent.innerHTML = "";
    el.songFav.classList.remove("on");
    if (el.songKeyStepper) el.songKeyStepper.hidden = true;
    if (el.songCapoStepper) el.songCapoStepper.hidden = true;
    if (el.songKeyBadge) {
      el.songKeyBadge.textContent = "";
    }
    if (el.songCueNote) {
      el.songCueNote.hidden = true;
      el.songCueNote.textContent = "";
    }
    return;
  }
  el.songReadTitle.textContent = song.title || t("song.noTitle");
  const written = songWrittenKey(song);
  const position = activeSetlistPosition();
  el.songReadMeta.textContent = [
    song.artist,
    song.capo ? t("capo.short", { capo: song.capo }) : "",
    position ? `${position.index + 1}/${position.total}` : "",
  ].filter(Boolean).join(" · ");
  if (el.songKeyStepper) el.songKeyStepper.hidden = false;
  if (el.songCapoStepper) el.songCapoStepper.hidden = false;
  if (el.songKeyBadge) {
    el.songKeyBadge.textContent = written ? t("song.key", { key: written }) : t("song.transpose");
  }
  if (el.songCueNote) {
    el.songCueNote.hidden = !song.cue;
    el.songCueNote.textContent = song.cue || "";
  }
  el.songFav.classList.toggle("on", Boolean(song.isFavorite));
  el.appShell.classList.toggle("tools-open", isSongToolsOpen);
  el.songReadContent.innerHTML = songChartHtml(song);
  if (el.songKeyValue) el.songKeyValue.textContent = String(song.transposeValue || 0);
  if (el.songCapoValue) el.songCapoValue.textContent = t("capo.short", { capo: song.capo || 0 });
  if (el.songFontValue) el.songFontValue.textContent = fontPercentLabel(stageFont);
}

function renderStage() {
  const song = selectedSong();
  syncStageChrome();
  renderMobileSongMenu();
  const position = activeSetlistPosition();
  const nextSong = position ? setlistSongs(activeSetlist())[position.index + 1] : null;
  el.stagePosition.textContent = position ? `${position.index + 1}/${position.total}` : "1/1";
  if (el.stageDots) {
    const total = position?.total || 1;
    const index = position?.index || 0;
    el.stageDots.innerHTML = Array.from({ length: total }, (_, i) => `<span class="stage-dot ${i === index ? "on" : ""}"></span>`).join("");
  }
  el.stagePrev.disabled = !position || position.index <= 0;
  el.stageNext.disabled = !position || position.index >= position.total - 1;
  if (el.stageNextHint) {
    el.stageNextHint.hidden = !nextSong;
    el.stageNextHint.textContent = nextSong ? t("stage.after", { title: nextSong.title || t("song.noTitle") }) : "";
  }
  if (!song) {
    el.stageSongTitle.textContent = t("song.untitled");
    if (el.stageNowHint) {
      el.stageNowHint.textContent = "";
      el.stageNowHint.classList.remove("has-capo");
    }
    if (el.stageCapoBadge) {
      el.stageCapoBadge.hidden = true;
      el.stageCapoBadge.textContent = "";
    }
    if (el.stageCueNote) {
      el.stageCueNote.hidden = true;
      el.stageCueNote.textContent = "";
    }
    el.stageContent.innerHTML = "";
    el.stageContent.dataset.sig = "";
    return;
  }
  el.stageSongTitle.textContent = song.title || t("song.untitled");
  const written = transposeChord(songKey(song), song.transposeValue || 0);
  const capoLabel = song.capo ? t("capo.short", { capo: song.capo }) : "";
  if (el.stageNowHint) {
    el.stageNowHint.textContent = [written ? t("song.key", { key: written }) : "", capoLabel].filter(Boolean).join(" · ");
    el.stageNowHint.classList.toggle("has-capo", Boolean(song.capo));
  }
  if (el.stageCapoBadge) {
    el.stageCapoBadge.hidden = !song.capo;
    el.stageCapoBadge.textContent = capoLabel;
  }
  if (el.stageCueNote) {
    el.stageCueNote.hidden = !song.cue;
    el.stageCueNote.textContent = song.cue || "";
  }
  const signature = `${song.id}:${song.transposeValue || 0}:${song.capo || 0}`;
  if (el.stageContent.dataset.sig !== signature) {
    el.stageContent.dataset.sig = signature;
    el.stageContent.innerHTML = renderChartLines(song.lines, song.transposeValue || 0);
    el.stageContent.scrollTop = 0;
  }
}

function handleStageTouchStart(event) {
  if (isMobileSongMenuOpen || event.touches.length !== 1) return;
  if (event.target.closest("button, input, textarea, select, .mobile-song-menu, .stage-mode-bar, .stage-mode-footer, .setlist-play-exit")) return;
  const touch = event.touches[0];
  stageTouchStart = { x: touch.clientX, y: touch.clientY };
  stageTouchUsed = false;
}

function handleSongSetlistTouchStart(event) {
  if (event.touches.length !== 1) return;
  if (event.target.closest("button, input, textarea, select, .song-tools-panel, .song-read-bar, .song-read-menu, .song-key-stepper, .setlist-play-exit")) return;
  const touch = event.touches[0];
  stageTouchStart = { x: touch.clientX, y: touch.clientY };
}

function handleSongSetlistTouchEnd(event) {
  if (!stageTouchStart) return;
  const touch = event.changedTouches[0];
  const dx = touch.clientX - stageTouchStart.x;
  const dy = touch.clientY - stageTouchStart.y;
  stageTouchStart = null;
  if (!el.appShell.classList.contains("song-active")) return;
  if (Math.abs(dx) >= 70 && Math.abs(dx) >= Math.abs(dy) * 1.35 && activeSetlist()) {
    moveSetlistStage(dx < 0 ? 1 : -1);
  }
}

function handleStageTouchEnd(event) {
  if (!stageTouchStart) return;
  const touch = event.changedTouches[0];
  const dx = touch.clientX - stageTouchStart.x;
  const dy = touch.clientY - stageTouchStart.y;
  stageTouchStart = null;

  if (Math.abs(dx) >= 70 && Math.abs(dx) >= Math.abs(dy) * 1.35 && activeSetlist()) {
    stageTouchUsed = true;
    moveSetlistStage(dx < 0 ? 1 : -1);
    return;
  }
  if (Math.abs(dx) < 12 && Math.abs(dy) < 12) {
    stageTouchUsed = true;
    toggleStageFocus();
  }
}

function handleStageContentClick(event) {
  if (stageTouchUsed) {
    stageTouchUsed = false;
    return;
  }
  if (event.target.closest("button, input, textarea, select")) return;
  if (isMobileSongMenuOpen) {
    if (isStageRundownWide()) return;
    isMobileSongMenuOpen = false;
    stageMenuQuery = "";
    syncStageChrome();
    renderMobileSongMenu();
    return;
  }
  toggleStageFocus();
}

function handleStageManualScroll(event) {
  if (!isAutoScrolling || Date.now() < autoScrollGuardUntil) return;
  if (event.type === "touchmove" && stageTouchStart && event.touches[0]) {
    const dy = Math.abs(event.touches[0].clientY - stageTouchStart.y);
    const dx = Math.abs(event.touches[0].clientX - stageTouchStart.x);
    if (dy < 16 && dx < 16) return;
  }
  stopAutoScroll();
}

function syncStageChrome() {
  el.appShell.classList.toggle("stage-focus", isStageFocus);
  el.stageShell.classList.toggle("stage-focus", isStageFocus);
  el.stageShell.classList.toggle("menu-open", isMobileSongMenuOpen);
  el.stageMenu?.classList.toggle("on", isMobileSongMenuOpen);
  if (el.stageMenu) el.stageMenu.textContent = isMobileSongMenuOpen ? t("stage.close") : t("stage.list");
}

function setStageFocus(on) {
  isStageFocus = Boolean(on);
  if (isStageFocus) isMobileSongMenuOpen = false;
  syncStageChrome();
  if (el.mobileSongMenu && !isMobileSongMenuOpen) el.mobileSongMenu.hidden = true;
}

function setSongToolsOpen(on) {
  isSongToolsOpen = Boolean(on);
  el.appShell.classList.toggle("tools-open", isSongToolsOpen);
  if (el.songToolsHandle) el.songToolsHandle.setAttribute("aria-expanded", isSongToolsOpen ? "true" : "false");
  if (el.songToolsPanel) el.songToolsPanel.style.transform = "";
}

function toggleSongTools() {
  setSongToolsOpen(!isSongToolsOpen);
}

function bindSongToolsSheet() {
  const panel = el.songToolsPanel;
  const handle = el.songToolsHandle;
  if (!panel || !handle) return;
  let startY = 0;
  let origin = 0;
  let lastY = 0;
  let lastAt = 0;
  let velocity = 0;
  let dragging = false;
  let moved = 0;

  const phone = () => window.matchMedia("(max-width: 767px)").matches;
  const closedShift = () => Math.max(0, panel.offsetHeight - handle.offsetHeight);

  const onDown = (event) => {
    if (!phone() || event.button) return;
    dragging = true;
    moved = 0;
    startY = event.clientY;
    lastY = event.clientY;
    lastAt = Date.now();
    velocity = 0;
    origin = isSongToolsOpen ? 0 : closedShift();
    panel.classList.add("is-dragging");
    panel.style.transform = `translate3d(0, ${origin}px, 0)`;
    handle.setPointerCapture(event.pointerId);
  };

  const onMove = (event) => {
    if (!dragging) return;
    const now = Date.now();
    velocity = (event.clientY - lastY) / Math.max(1, now - lastAt);
    lastY = event.clientY;
    lastAt = now;
    moved = Math.max(moved, Math.abs(event.clientY - startY));
    const shift = Math.max(0, Math.min(closedShift(), origin + (event.clientY - startY)));
    panel.style.transform = `translate3d(0, ${shift}px, 0)`;
  };

  const onUp = () => {
    if (!dragging) return;
    dragging = false;
    panel.classList.remove("is-dragging");
    const shift = Math.max(0, Math.min(closedShift(), origin + (lastY - startY)));
    const open = velocity < -0.4 || shift < closedShift() * 0.55;
    panel.style.transform = "";
    setSongToolsOpen(open);
  };

  handle.addEventListener("pointerdown", onDown);
  handle.addEventListener("pointermove", onMove);
  handle.addEventListener("pointerup", onUp);
  handle.addEventListener("pointercancel", onUp);
  handle.addEventListener("click", (event) => {
    if (!phone()) return;
    if (moved > 12) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }
    toggleSongTools();
  });
}

function toggleStageFocus() {
  if (isMobileSongMenuOpen) {
    isMobileSongMenuOpen = false;
    renderMobileSongMenu();
    return;
  }
  setStageFocus(!isStageFocus);
  if (!isStageFocus) renderMobileSongMenu();
}

function activeScrollPane() {
  if (el.appShell.classList.contains("stage-active")) return el.stageContent;
  if (el.appShell.classList.contains("song-active")) return el.songReadContent;
  return null;
}

function toggleAutoScroll() {
  if (isAutoScrolling) stopAutoScroll();
  else startAutoScroll();
}

function updateScrollButtons() {
  if (el.songScroll) {
    el.songScroll.textContent = isAutoScrolling ? t("song.scrollStop") : t("song.scroll");
    el.songScroll.classList.toggle("on", isAutoScrolling);
  }
  if (el.stageScroll) {
    el.stageScroll.textContent = isAutoScrolling ? "■" : "▶";
    el.stageScroll.setAttribute("aria-label", isAutoScrolling ? t("stage.stopScroll") : t("stage.startScroll"));
    el.stageScroll.classList.toggle("on", isAutoScrolling);
  }
}

function startAutoScroll() {
  isMobileSongMenuOpen = false;
  renderMobileSongMenu();
  stopAutoScroll();
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      const box = activeScrollPane();
      if (!box) return;
      const max = box.scrollHeight - box.clientHeight;
      if (max <= 8) {
        notify(t("stage.noScroll"));
        updateScrollButtons();
        return;
      }
      isAutoScrolling = true;
      autoScrollGuardUntil = Date.now() + 500;
      updateScrollButtons();
      autoScrollTimer = setInterval(() => {
        const pane = activeScrollPane();
        if (!pane) return;
        const end = pane.scrollHeight - pane.clientHeight;
        if (end <= 1) {
          stopAutoScroll();
          return;
        }
        const next = pane.scrollTop + Math.max(1, scrollSpeed / 10);
        if (next >= end - 0.5) {
          pane.scrollTop = end;
          stopAutoScroll();
          return;
        }
        pane.scrollTop = next;
      }, 100);
    });
  });
}

function stopAutoScroll() {
  if (autoScrollTimer) clearInterval(autoScrollTimer);
  autoScrollTimer = null;
  const wasScrolling = isAutoScrolling;
  isAutoScrolling = false;
  if (wasScrolling) {
    updateScrollButtons();
    renderMobileSongMenu();
  }
}

function changeScrollSpeed(delta) {
  scrollSpeed = Math.min(100, Math.max(10, scrollSpeed + delta));
  localStorage.setItem("chordbook.scrollSpeed", String(scrollSpeed));
  renderMobileSongMenu();
}

function songsMatchingStageQuery() {
  const query = normalize(stageMenuQuery);
  if (!query) return state.songs;
  return state.songs.filter((song) => {
    const hay = normalize([song.title, song.artist, song.category, songKey(song)].filter(Boolean).join(" "));
    return hay.includes(query);
  });
}

function toggleSongReadMenu() {
  isSongReadMenuOpen = !isSongReadMenuOpen;
  if (!isSongReadMenuOpen) isSetlistPickerOpen = false;
  renderSongReadMenu();
}

function renderSongReadMenu() {
  if (!el.songReadMenu) return;
  el.songReadMenu.hidden = !isSongReadMenuOpen;
  if (!isSongReadMenuOpen) return;
  if (isSetlistPickerOpen) {
    const song = selectedSong();
    const lists = state.setlists.slice().sort((a, b) => a.title.localeCompare(b.title));
    el.songReadMenu.innerHTML = `
      <button type="button" data-song-action="back">${t("common.back")}</button>
      ${lists.map((setlist) => {
        const inside = song && setlist.songIds.includes(song.id);
        return `<button type="button" data-add-setlist-id="${escapeHtml(setlist.id)}" ${inside ? "disabled" : ""}>${escapeHtml(setlist.title)}${inside ? " · ✓" : ""}</button>`;
      }).join("")}
      <button type="button" class="primary-action" data-song-action="new-setlist">${t("setlists.new")}</button>
    `;
    el.songReadMenu.querySelectorAll("[data-add-setlist-id]").forEach((button) => {
      button.addEventListener("click", () => addCurrentSongToSetlist(button.dataset.addSetlistId));
    });
    el.songReadMenu.querySelectorAll("[data-song-action]").forEach((button) => {
      button.addEventListener("click", () => {
        if (button.dataset.songAction === "back") {
          isSetlistPickerOpen = false;
          renderSongReadMenu();
        }
        if (button.dataset.songAction === "new-setlist") createSetlistWithCurrentSong();
      });
    });
    return;
  }
  el.songReadMenu.innerHTML = `
    <button type="button" data-song-action="edit">${t("song.edit")}</button>
    <button type="button" data-song-action="share">${t("song.share")}</button>
    <button type="button" data-song-action="youtube">YouTube</button>
    <button type="button" data-song-action="spotify">Spotify</button>
    <button type="button" data-song-action="add-setlist">${t("song.addToSetlist")}</button>
    <button type="button" data-song-action="stage">${t("song.stageMode")}</button>
  `;
  el.songReadMenu.querySelectorAll("[data-song-action]").forEach((button) => {
    button.addEventListener("click", () => {
      const action = button.dataset.songAction;
      if (action === "add-setlist") {
        isSetlistPickerOpen = true;
        renderSongReadMenu();
        return;
      }
      isSongReadMenuOpen = false;
      isSetlistPickerOpen = false;
      renderSongReadMenu();
      if (action === "edit") editSelectedFromStage();
      if (action === "share") shareSelectedSong();
      if (action === "youtube") openMusicSearch("youtube");
      if (action === "spotify") openMusicSearch("spotify");
      if (action === "stage") openStageMode();
    });
  });
}

function toggleMobileSongMenu() {
  isMobileSongMenuOpen = !isMobileSongMenuOpen;
  if (isMobileSongMenuOpen) isStageFocus = false;
  if (!isMobileSongMenuOpen) stageMenuQuery = "";
  syncStageChrome();
  renderMobileSongMenu();
}

function renderMobileSongMenu() {
  if (!el.mobileSongMenu) return;
  el.mobileSongMenu.hidden = !isMobileSongMenuOpen;
  syncStageChrome();
  if (!isMobileSongMenuOpen) return;
  const query = stageMenuQuery.trim();
  const setlist = activeSetlist();
  const order = setlist ? setlistSongs(setlist) : [];
  const listSongs = query
    ? songsMatchingStageQuery()
    : order.length
      ? order
      : recentStageSongs();
  const listHtml = listSongs.length
    ? listSongs.map((song) => stageMenuSongRow(song, order)).join("")
    : `<p class="stage-menu-hint">${query ? t("stage.noMatch") : t("stage.listHint")}</p>`;
  const cueTitle = setlist?.title || (order.length ? t("stage.setlistLabel") : t("stage.recentLabel"));
  const showSearch = !order.length;
  el.mobileSongMenu.innerHTML = `
    <div class="stage-cue">
      <small>${escapeHtml(cueTitle)}</small>
      <span>${escapeHtml(t("stage.listHint"))}</span>
    </div>
    ${showSearch ? `<input id="stageSongSearch" type="search" placeholder="${escapeHtml(t("stage.searchPh"))}" value="${escapeHtml(stageMenuQuery)}" />` : ""}
    <div class="mobile-song-menu-list">${listHtml}</div>
  `;
  const search = el.mobileSongMenu.querySelector("#stageSongSearch");
  search?.addEventListener("input", (event) => {
    stageMenuQuery = event.target.value;
    renderMobileSongMenu();
    const next = el.mobileSongMenu.querySelector("#stageSongSearch");
    if (next) {
      next.focus();
      const caret = stageMenuQuery.length;
      next.setSelectionRange(caret, caret);
    }
  });
  el.mobileSongMenu.querySelectorAll("[data-mobile-song-id]").forEach((button) => {
    button.addEventListener("click", () => jumpToStageSong(button.dataset.mobileSongId));
  });
}

function recentStageSongs() {
  return [...state.songs]
    .sort((a, b) => String(b.lastOpenedAt || "").localeCompare(String(a.lastOpenedAt || "")))
    .slice(0, 8);
}

function stageMenuSongRow(song, order) {
  const index = order.findIndex((item) => item.id === song.id);
  const key = transposeChord(songKey(song), song.transposeValue || 0) || songKey(song);
  const mark = song.id === selectedSongId ? t("stage.now") : "";
  const meta = [key ? t("song.key", { key }) : "", mark].filter(Boolean).join(" · ");
  const num = index >= 0 ? `<span class="stage-cue-num">${index + 1}</span>` : "";
  return `
    <button type="button" class="stage-set-row ${song.id === selectedSongId ? "active" : ""}" data-mobile-song-id="${escapeHtml(song.id)}">
      ${num}
      <span class="song-main">
        <strong>${escapeHtml(song.title || t("song.noTitle"))}</strong>
        ${meta ? `<small>${escapeHtml(meta)}</small>` : ""}
      </span>
    </button>
  `;
}

function jumpToStageSong(songId) {
  const setlist = activeSetlist();
  selectedSongId = songId;
  if (!setlist || !setlist.songIds.includes(songId)) activeSetlistId = null;
  isMobileSongMenuOpen = false;
  stageMenuQuery = "";
  markSongOpened(songId);
  persist();
  render();
  switchView("stage");
}

function activeSetlistPosition() {
  const setlist = activeSetlist();
  const song = selectedSong();
  if (!setlist || !song) return null;
  const songs = setlistSongs(setlist);
  const index = songs.findIndex((item) => item.id === song.id);
  if (index < 0) return null;
  return { index, total: songs.length };
}

function renderStageSetlistBar() {}

function renderSetlists() {
  renderAgendaHub();
  const setlists = visibleSetlists();
  el.setlistCount.textContent = agendaHub === "team"
    ? countLabel(state.team.members.length, "team.countOne", "team.countMany")
    : setlistFilter === "recent"
      ? countLabel(setlists.length, "setlists.recentOne", "setlists.recentMany")
      : countLabel(state.setlists.length, "setlists.countOne", "setlists.countMany");
  el.setlistList.innerHTML = setlists.length
    ? setlists.map(setlistRow).join("")
    : `<p class="empty">${setlistFilter === "recent" ? t("setlists.emptyRecent") : t("setlists.empty")}</p>`;
  el.setlistList.querySelectorAll("[data-setlist-id]").forEach((button) => {
    button.addEventListener("click", () => {
      isSetlistDetailsOpen = false;
      isSetlistAddOpen = false;
      isSetlistDayMenuOpen = false;
      openSetlistEditor(button.dataset.setlistId);
    });
  });
  el.setlistList.querySelectorAll("[data-open-stage-id]").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      selectedSetlistId = button.dataset.openStageId;
      askSetlistPlayMode();
    });
  });
  const setlist = selectedSetlist();
  el.setlistTitle.value = setlist?.title ?? "";
  el.setlistNotes.value = setlist?.notes ?? "";
  writeServiceToForm(setlist?.service);
  if (el.serviceEditorTitle) el.serviceEditorTitle.textContent = t("agenda.orderTitle");
  if (el.setlistDayMeta) {
    const dateLabel = formatSetlistDayDate(setlist?.service?.date);
    const timeLabel = setlist?.service?.time || "";
    const title = setlist?.title?.trim();
    const defaultTitle = t("service.defaultTitle");
    const extra = title && title !== defaultTitle ? title : "";
    el.setlistDayMeta.textContent = [extra, dateLabel, timeLabel].filter(Boolean).join(" · ");
  }
  renderEventRoster(setlist);
  if (el.setlistDetails) el.setlistDetails.hidden = !isSetlistDetailsOpen;
  el.setlistEditDetails?.classList.toggle("on", isSetlistDetailsOpen);
  el.setlistAdd?.classList.toggle("on", isSetlistAddOpen);
  el.setlistMore?.classList.toggle("on", isSetlistDayMenuOpen);
  const editorFields = [
    el.setlistTitle, el.setlistNotes, el.saveSetlist, el.openSetlist, el.deleteSetlist,
    el.shareService, el.whatsappService, el.serviceDate, el.serviceTime, el.setlistAddSong,
  ];
  editorFields.forEach((field) => {
    if (field) field.disabled = !setlist;
  });

  const selectedIds = setlist?.songIds ?? [];
  const availableSongs = state.songs.filter((song) => !selectedIds.includes(song.id));

  el.setlistPicker.innerHTML = setlist
    ? renderEventOrderHtml(setlist)
    : `<p class="empty compact">${t("setlists.noSongs")}</p>`;
  bindSetlistSwipe(el.setlistPicker);
  renderSongCheckLists();
  if (el.setlistAddSearch) el.setlistAddSearch.value = setlistAddQuery;
  if (el.setlistAddSheet) el.setlistAddSheet.hidden = !isSetlistAddOpen;
  if (el.setlistAddSong) {
    el.setlistAddSong.innerHTML = availableSongs.length
      ? `<option value="">${t("setlists.addSong")}</option>${availableSongs.map((song) => `<option value="${song.id}">${escapeHtml(song.title)}</option>`).join("")}`
      : `<option value="">${t("setlists.allAdded")}</option>`;
    el.setlistAddSong.disabled = !setlist || !availableSongs.length;
    el.setlistAddSong.onchange = () => {
      const songId = el.setlistAddSong.value;
      if (!songId) return;
      addSongToSetlist(songId);
    };
  }

  el.setlistPicker.querySelectorAll("[data-setlist-action]").forEach((button) => {
    button.addEventListener("click", () => updateSetlistSongOrder(button.dataset.songId, button.dataset.setlistAction));
  });
  el.setlistPicker.querySelectorAll("[data-open-song-id]").forEach((button) => {
    button.addEventListener("click", () => openSetlistSong(button.dataset.openSongId));
  });
  renderSetlistDayMenu();
}

function visibleSetlists() {
  const list = state.setlists.slice();
  if (setlistFilter !== "recent") {
    return list.sort((a, b) => a.title.localeCompare(b.title));
  }
  return list
    .filter((setlist) => setlist.lastOpenedAt)
    .sort((a, b) => String(b.lastOpenedAt).localeCompare(String(a.lastOpenedAt)));
}

function setlistRow(setlist) {
  const songs = setlistSongs(setlist);
  const dateLabel = formatSetlistListDate(setlist.service?.date);
  const count = songs.length
    ? countLabel(songs.length, "setlists.songsOne", "setlists.songsMany")
    : t("setlists.emptyList");
  const meta = [dateLabel, count].filter(Boolean).join(" · ");
  const canOpen = Boolean(songs.length);
  return `
    <div class="setlist-row ${setlist.id === selectedSetlistId ? "active" : ""}">
      <button type="button" class="setlist-row-main" data-setlist-id="${escapeHtml(setlist.id)}">
        <strong>${escapeHtml(setlist.title || t("nav.setlists"))}</strong>
        <small>${escapeHtml(meta)}</small>
      </button>
      <button type="button" class="setlist-play" data-open-stage-id="${escapeHtml(setlist.id)}" ${canOpen ? "" : "disabled"} aria-label="${t("setlists.openStage")}" title="${t("setlists.openStage")}">▶</button>
    </div>
  `;
}

function orderedSetlistSongRow(song, index, slot) {
  const key = songWrittenKey(song);
  const isFinal = slot === "final";
  return `
    <div class="setlist-swipe">
      <button type="button" class="setlist-swipe-delete" data-setlist-action="remove" data-song-id="${escapeHtml(song.id)}">${t("setlists.remove")}</button>
      <div class="setlist-swipe-main">
        <span class="setlist-num">${index + 1}</span>
        <button type="button" class="setlist-song-open" data-open-song-id="${escapeHtml(song.id)}">
          <strong>${escapeHtml(song.title || t("song.noTitle"))}</strong>
          ${song.artist ? `<small>${escapeHtml(song.artist)}</small>` : ""}
        </button>
        <button type="button" class="setlist-slot ${isFinal ? "on" : ""}" data-setlist-action="slot" data-song-id="${escapeHtml(song.id)}" title="${escapeHtml(isFinal ? t("agenda.unmarkFinal") : t("agenda.markFinal"))}">${escapeHtml(t("agenda.slotFinal"))}</button>
        <span class="setlist-song-key ${key ? "" : "muted"}">${escapeHtml(key || "—")}</span>
        <button type="button" class="setlist-row-remove" data-setlist-action="remove" data-song-id="${escapeHtml(song.id)}" aria-label="${t("setlists.remove")}">×</button>
      </div>
    </div>
  `;
}

function bindSetlistSwipe(root) {
  if (!root) return;
  root.querySelectorAll(".setlist-swipe").forEach((row) => {
    const main = row.querySelector(".setlist-swipe-main");
    if (!main) return;
    let startX = 0;
    let startY = 0;
    let dx = 0;
    let tracking = false;
    let axis = "";
    const max = 96;
    const closeOthers = () => {
      root.querySelectorAll(".setlist-swipe-main").forEach((item) => {
        if (item !== main) item.style.transform = "";
      });
    };
    row.addEventListener("touchstart", (event) => {
      if (event.touches.length !== 1) return;
      const touch = event.touches[0];
      startX = touch.clientX;
      startY = touch.clientY;
      dx = 0;
      tracking = true;
      axis = "";
    }, { passive: true });
    row.addEventListener("touchmove", (event) => {
      if (!tracking) return;
      const touch = event.touches[0];
      const x = touch.clientX - startX;
      const y = touch.clientY - startY;
      if (!axis) {
        if (Math.abs(x) < 10 && Math.abs(y) < 10) return;
        axis = Math.abs(x) > Math.abs(y) * 1.15 ? "x" : "y";
      }
      if (axis !== "x") return;
      event.preventDefault();
      dx = Math.min(0, Math.max(-max, x));
      main.style.transform = `translateX(${dx}px)`;
    }, { passive: false });
    row.addEventListener("touchend", () => {
      if (!tracking) return;
      tracking = false;
      if (axis !== "x") return;
      closeOthers();
      main.style.transform = dx < -max / 2 ? `translateX(${-max}px)` : "";
    });
  });
}

function renderSetlistDayMenu() {
  if (!el.setlistDayMenu) return;
  el.setlistDayMenu.hidden = !isSetlistDayMenuOpen;
  if (!isSetlistDayMenuOpen) return;
  el.setlistDayMenu.innerHTML = `
    <button type="button" data-day-action="play">${t("setlists.openStage")}</button>
    <button type="button" data-day-action="details">${t("setlists.details")}</button>
    <button type="button" data-day-action="share">${t("service.send")}</button>
    <button type="button" data-day-action="whatsapp">${t("service.whatsapp")}</button>
    <button type="button" class="danger-action" data-day-action="delete">${t("setlists.delete")}</button>
  `;
  el.setlistDayMenu.querySelectorAll("[data-day-action]").forEach((button) => {
    button.addEventListener("click", () => {
      const action = button.dataset.dayAction;
      isSetlistDayMenuOpen = false;
      if (action === "play") askSetlistPlayMode();
      if (action === "details") {
        isSetlistDetailsOpen = true;
        renderSetlists();
        requestAnimationFrame(() => el.setlistTitle?.focus());
        return;
      }
      if (action === "share") shareServiceProgram();
      if (action === "whatsapp") shareServiceWhatsApp();
      if (action === "delete") deleteSetlist();
      renderSetlistDayMenu();
    });
  });
}

function createSong() {
  const song = normalizeSong({
    id: makeId(),
    title: t("nav.newSong"),
    artist: "",
    category: "Geral",
    capo: 0,
    lines: [
      "{key: A}",
      "Intro:",
      "A | E | F#m | D",
      "",
      "Verso 1:",
      "A      E       F#m     D",
      "Aqui escrevo a primeira frase",
      "A      E       D",
      "Aqui continuo a letra",
    ],
  });
  state.songs.push(song);
  selectedSongId = song.id;
  isEditingSong = true;
  persist();
  render();
  switchView("library");
  el.title.focus();
  el.title.select();
}

function isPlaceholderTitle(value) {
  const title = normalize(value).trim();
  return !title || ["nova musica", "nueva cancion", "new song", "cancao", "cancion", "song", "sem titulo", "sin titulo", "untitled"].includes(title);
}

function openPasteChart(asNew) {
  if (asNew || !selectedSong()) createSong();
  else {
    isEditingSong = true;
    switchView("library");
  }
  if (!el.pasteChart) return;
  el.pasteChart.hidden = false;
  el.pasteChartInput.value = "";
  el.pasteChartInput.focus();
}

function closePasteChart() {
  if (el.pasteChart) el.pasteChart.hidden = true;
}

async function pasteChartFromClipboard() {
  try {
    const text = await navigator.clipboard.readText();
    if (!text.trim()) throw new Error("empty");
    el.pasteChartInput.value = text;
    el.pasteChartInput.focus();
  } catch {
    el.pasteChartInput.focus();
    notify(t("paste.clipboardFail"));
  }
}

function applyPastedChart() {
  const parsed = parsePastedChart(el.pasteChartInput.value);
  if (!parsed.lines.some((line) => line.trim())) {
    notify(t("paste.empty"));
    return;
  }
  if (!selectedSong()) createSong();
  const song = selectedSong();
  const placeholder = isPlaceholderTitle(song.title) || isPlaceholderTitle(el.title.value);
  Object.assign(song, {
    title: parsed.title && placeholder ? parsed.title : (el.title.value.trim() || song.title),
    artist: parsed.artist && !String(song.artist || "").trim() ? parsed.artist : song.artist,
    capo: parsed.capo || Number(el.capo.value || 0) || song.capo || 0,
    lines: parsed.lines,
    updatedAt: new Date().toISOString(),
  });
  persist();
  closePasteChart();
  isEditingSong = true;
  switchView("library");
  render();
  notify(t("paste.ready"));
}

function parsePastedChart(raw) {
  const source = String(raw || "").replace(/\r/g, "").trim();
  let title = "";
  let artist = "";
  let key = "";
  let capo = 0;
  const body = [];
  const lines = source.split("\n");

  for (const original of lines) {
    let line = original
      .replace(/\t/g, "  ")
      .replace(/\[\/?ch\]/gi, "")
      .replace(/\[\/?tab\]/gi, "")
      .replace(/\u00a0/g, " ");
    const trimmed = line.trim();
    if (!trimmed) {
      if (body.length && body.at(-1) !== "") body.push("");
      continue;
    }

    const directive = trimmed.match(/^\{(\w+)\s*:\s*([^}]+)\}$/i);
    if (directive) {
      const name = directive[1].toLowerCase();
      const value = directive[2].trim();
      if (name === "title") title = title || value;
      else if (name === "artist" || name === "subtitle") artist = artist || value;
      else if (name === "key") key = key || value;
      else if (name === "capo") capo = Number(value.replace(/\D/g, "")) || capo;
      else body.push(trimmed);
      continue;
    }

    const tom = trimmed.match(/^(?:tom|tono|tonalidade|tonalidad|key)\s*(?:de\s+|of\s+|[:.\-]\s*)([A-G](?:#|b)?m?)\s*$/i);
    if (tom) {
      key = key || tom[1];
      continue;
    }

    if (/^(?:capo|capotraste|cejilla)\b/i.test(trimmed) && /\d/.test(trimmed)) {
      capo = Number(trimmed.match(/\d+/)[0]) || capo;
      continue;
    }

    if (/^\|+$/.test(trimmed) || /\bbpm\b/i.test(trimmed) || /^\d+\/\d+\b/.test(trimmed)) continue;

    const artistLine = trimmed.match(/^(?:artista|artist|autor|interprete|int[eé]rprete)\s*[:\-]\s*(.+)$/i);
    if (artistLine) {
      artist = artist || artistLine[1].trim();
      continue;
    }

    if (isPasteJunk(trimmed)) continue;

    const section = trimmed.match(/^\[([^\]]+)\]\s*(.*)$/);
    if (section && !/^[A-G](?:#|b)?/i.test(section[1])) {
      const heading = section[1].trim();
      const rest = section[2].trim();
      body.push(`${heading}:`);
      if (rest) body.push(rest);
      continue;
    }

    if (!title && !body.length && looksLikePastedTitle(trimmed)) {
      title = trimmed;
      continue;
    }

    if (!artist && body.length <= 1 && looksLikePastedArtist(trimmed)) {
      artist = trimmed.replace(/^[-–—]\s*/, "");
      continue;
    }

    body.push(line.trimEnd());
  }

  while (body.length && !body[0]) body.shift();
  while (body.length && !body.at(-1)) body.pop();
  const cleaned = [];
  for (const line of body) {
    if (line === "" && cleaned.at(-1) === "") continue;
    cleaned.push(line);
  }

  const detected = key || detectKeyFromLines(cleaned);
  if (detected && !cleaned.some((line) => /^\{key:/i.test(line))) {
    cleaned.unshift(`{key: ${detected}}`);
  }

  return { title, artist, key: detected, capo, lines: foldStackedChords(cleaned) };
}

function looksLikePastedTitle(line) {
  if (line.length > 70 || /[:|\[\]]/.test(line) || isChordOnlyLine(line)) return false;
  if (/\d{2,}/.test(line)) return false;
  return /[A-Za-zÀ-ÿ]{3,}/.test(line);
}

function looksLikePastedArtist(line) {
  if (line.length > 50 || /[:|\[\]]/.test(line) || isChordOnlyLine(line)) return false;
  return /^(?:[-–—]\s*)?[A-Za-zÀ-ÿ].{1,40}$/.test(line) && !/\b(verso|coro|bridge|intro|estrofa|pre-coro)\b/i.test(line);
}

function isPasteJunk(line) {
  return /^(enviar corre|corrigir cifra|afinar|imprimir|baixar|favoritar|cifra club|la cuerda|ultimate guitar|an[uú]ncio|composi[cç][aã]o|letra de|youtube|video|exibi[cç]|visitas|seu instrumento|tom original|siguenos|suscr[ií]bete|acordes de|ver tablatura)/i.test(line)
    || /^https?:\/\//i.test(line)
    || /^[-_=*.]{4,}$/.test(line);
}

function detectKeyFromLines(lines) {
  for (const line of lines) {
    const chordPro = line.match(/\[([A-G](?:#|b)?m?)/);
    if (chordPro) return chordPro[1];
    if (isChordOnlyLine(line)) {
      const token = line.trim().split(/\s+|\|/).find((part) => /^[A-G](?:#|b)?m?/.test(part));
      if (token) return token.match(/^[A-G](?:#|b)?m?/)[0];
    }
  }
  return "";
}

function saveSong(event) {
  event.preventDefault();
  const song = selectedSong();
  if (!song) return;
  Object.assign(song, {
    title: el.title.value.trim() || t("song.noTitle"),
    artist: el.artist.value.trim(),
    category: el.category.value.trim() || "Geral",
    capo: Number(el.capo.value || 0),
    cue: String(el.cue?.value || "").trim().slice(0, 80),
    lines: foldStackedChords(el.lines.value.replace(/\r/g, "").split("\n")),
    updatedAt: new Date().toISOString(),
    revision: Number(song.revision || 1) + 1,
  });
  if (!persist()) return;
  render();
  logFile(t("msg.saved"));
  notify(t("msg.saved"));
}

function toggleFavorite() {
  const song = selectedSong();
  if (!song) return;
  toggleFavoriteById(song.id);
}

function toggleFavoriteById(songId) {
  const song = state.songs.find((item) => item.id === songId);
  if (!song) return;
  song.isFavorite = !song.isFavorite;
  persist();
  render();
}

function duplicateSong() {
  const song = selectedSong();
  if (!song) return;
  const copy = normalizeSong({ ...song, id: makeId(), title: `${song.title} copia` });
  state.songs.push(copy);
  selectedSongId = copy.id;
  persist();
  render();
}

function deleteSong() {
  const song = selectedSong();
  if (!song || !confirm(t("msg.deleteSong", { title: song.title }))) return;
  state.songs = state.songs.filter((item) => item.id !== song.id);
  state.setlists.forEach((setlist) => {
    setlist.songIds = setlist.songIds.filter((id) => id !== song.id);
  });
  selectedSongId = state.songs[0]?.id ?? null;
  persist();
  render();
}

function changeCapo(delta) {
  const song = selectedSong();
  if (!song) return;
  song.capo = clamp(Number(song.capo || 0) + delta, 0, 12);
  persist();
  render();
}

function effectiveTheme() {
  if (state.theme === "auto") {
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }
  return state.theme === "dark" ? "dark" : "light";
}

function applyTheme() {
  document.documentElement.classList.toggle("dark", effectiveTheme() === "dark");
  el.themePills.forEach((button) => button.classList.toggle("active", button.dataset.theme === (state.theme || "light")));
}

function setTheme(theme) {
  state.theme = theme === "dark" || theme === "auto" ? theme : "light";
  persist();
  applyTheme();
}

function syncChartPrefs() {
  if (!el.appShell) return;
  el.appShell.classList.toggle("hide-chords", state.showChords === false);
  el.appShell.classList.toggle("hide-lyrics", state.showLyrics === false);
  el.appShell.classList.toggle("chart-focus", Boolean(state.focusChart));
  [el.songAutoScrollSwitch, el.moreAutoScrollSwitch].forEach((input) => {
    if (input) input.checked = Boolean(state.preferAutoScroll) || isAutoScrolling;
  });
  [el.songFocusSwitch, el.moreFocusSwitch].forEach((input) => {
    if (input) input.checked = Boolean(state.focusChart);
  });
  [el.songShowChordsSwitch, el.moreShowChordsSwitch].forEach((input) => {
    if (input) input.checked = state.showChords !== false;
  });
  [el.songShowLyricsSwitch, el.moreShowLyricsSwitch].forEach((input) => {
    if (input) input.checked = state.showLyrics !== false;
  });
}

function setPreferAutoScroll(on) {
  state.preferAutoScroll = Boolean(on);
  persist();
  if (on && (el.appShell.classList.contains("song-active") || el.appShell.classList.contains("stage-active"))) {
    if (!isAutoScrolling) startAutoScroll();
  } else if (!on && isAutoScrolling) {
    stopAutoScroll();
  }
  syncChartPrefs();
}

function setFocusChart(on) {
  state.focusChart = Boolean(on);
  persist();
  syncChartPrefs();
}

function setShowChords(on) {
  state.showChords = Boolean(on);
  if (!state.showChords && state.showLyrics === false) state.showLyrics = true;
  persist();
  syncChartPrefs();
}

function setShowLyrics(on) {
  state.showLyrics = Boolean(on);
  if (!state.showLyrics && state.showChords === false) state.showChords = true;
  persist();
  syncChartPrefs();
}

function clearLibraryData() {
  if (!confirm(t("more.clearConfirm"))) return;
  state.songs = [];
  state.setlists = [];
  state.team = normalizeTeam();
  state.agenda = normalizeAgenda();
  selectedSongId = null;
  selectedSetlistId = null;
  persist();
  render();
  notify(t("msg.cleared"));
}

function transposeSelected(delta) {
  const song = selectedSong();
  if (!song) return;
  song.transposeValue = clamp(Number(song.transposeValue || 0) + delta, -12, 12);
  persist();
  render();
}

function setStageFont(px, persist = true) {
  stageFont = clamp(Math.round(Number(px) || stageFont), 14, 42);
  savedLook = { ...savedLook, stageFont };
  lookDraft = { ...lookDraft, stageFont };
  applyLook(document.documentElement, savedLook);
  if (el.songFontValue) el.songFontValue.textContent = fontPercentLabel(stageFont);
  if (persist) {
    persistLook(savedLook);
    renderMore();
  }
}

function changeStageFont(delta) {
  setStageFont(stageFont + delta, true);
}

function pinchDistance(touches) {
  return Math.hypot(touches[0].clientX - touches[1].clientX, touches[0].clientY - touches[1].clientY);
}

function bindChartPinch(node) {
  if (!node) return;
  node.addEventListener("touchstart", handleChartPinchStart, { passive: true });
  node.addEventListener("touchmove", handleChartPinchMove, { passive: false });
  node.addEventListener("touchend", handleChartPinchEnd, { passive: true });
  node.addEventListener("touchcancel", handleChartPinchEnd, { passive: true });
}

function handleChartPinchStart(event) {
  if (event.touches.length !== 2) return;
  if (event.target.closest("button, input, textarea, select, .song-read-bar, .stage-mode-bar, .stage-mode-footer, .mobile-song-menu")) return;
  stageTouchStart = null;
  stageTouchUsed = true;
  stopAutoScroll();
  chartPinch = {
    startDist: Math.max(24, pinchDistance(event.touches)),
    startFont: stageFont,
  };
}

function handleChartPinchMove(event) {
  if (event.touches.length !== 2) return;
  if (!chartPinch) handleChartPinchStart(event);
  if (!chartPinch) return;
  event.preventDefault();
  const scale = pinchDistance(event.touches) / chartPinch.startDist;
  setStageFont(chartPinch.startFont * scale, false);
}

function handleChartPinchEnd(event) {
  if (!chartPinch) return;
  if (event.touches.length >= 2) return;
  setStageFont(stageFont, true);
  chartPinch = null;
}

function changeLookFont(delta) {
  lookDraft = { ...lookDraft, stageFont: clamp(Number(lookDraft.stageFont || 22) + delta, 14, 42) };
  renderLookStudio();
}

function fontPercentLabel(px = stageFont) {
  return `${Math.round((Number(px) || 22) / 22 * 100)}%`;
}

function defaultLook() {
  return {
    stageBg: "#000000",
    lyricColor: "#ffffff",
    chordColor: "#7dd3fc",
    stageFont: defaultStageFont(),
    stageGap: 1.35,
  };
}

function normalizeLook(look) {
  const gap = Number(look?.stageGap);
  const fallback = defaultLook();
  return {
    stageBg: LOOK_BG.includes(String(look?.stageBg || "").toLowerCase())
      ? String(look.stageBg).toLowerCase()
      : fallback.stageBg,
    lyricColor: safeHexColor(look?.lyricColor, fallback.lyricColor),
    chordColor: safeHexColor(look?.chordColor, fallback.chordColor),
    stageFont: clamp(Number(look?.stageFont) || defaultStageFont(), 14, 42),
    stageGap: gap === 1.18 || gap === 1.55 ? gap : 1.35,
  };
}

function loadLook() {
  try {
    const saved = JSON.parse(localStorage.getItem(LOOK_KEY) || "null");
    const font = Number(localStorage.getItem("chordbook.stageFont") || saved?.stageFont || defaultStageFont());
    return normalizeLook({ ...(saved && typeof saved === "object" ? saved : defaultLook()), stageFont: font });
  } catch {
    return normalizeLook({ ...defaultLook(), stageFont: Number(localStorage.getItem("chordbook.stageFont") || defaultStageFont()) });
  }
}

function persistLook(look) {
  savedLook = normalizeLook(look);
  try {
    localStorage.setItem(LOOK_KEY, JSON.stringify(savedLook));
    localStorage.setItem("chordbook.stageFont", String(savedLook.stageFont));
    return true;
  } catch {
    try {
      notify(t("msg.saveFail"));
    } catch {
      /* toast may not exist yet */
    }
    return false;
  }
}

function safeHexColor(value, fallback) {
  const raw = String(value || "").trim().toLowerCase();
  return /^#[0-9a-f]{6}$/.test(raw) ? raw : fallback;
}

function applyLook(root, look) {
  if (!root) return;
  const next = normalizeLook(look);
  root.style.setProperty("--stage-bg", next.stageBg);
  root.style.setProperty("--stage-lyric", next.lyricColor);
  root.style.setProperty("--stage-chord", next.chordColor);
  root.style.setProperty("--stage-font", `${next.stageFont}px`);
  root.style.setProperty("--stage-gap", String(next.stageGap));
}

function lookSignature(look) {
  const next = normalizeLook(look);
  return `${next.stageBg}|${next.lyricColor}|${next.chordColor}|${next.stageFont}|${next.stageGap}`;
}

function lookDirty() {
  return lookSignature(lookDraft) !== lookSignature(savedLook);
}

function startLookSession() {
  lookDraft = { ...savedLook };
  renderLookStudio();
}

function discardLookDraft(notifyUser) {
  lookDraft = { ...savedLook };
  renderLookStudio();
  if (notifyUser) notify(t("look.reverted"));
}

function saveLookDraft() {
  persistLook(lookDraft);
  stageFont = savedLook.stageFont;
  applyLook(document.documentElement, savedLook);
  lookDraft = { ...savedLook };
  renderLookStudio();
  notify(t("look.saved"));
}

function handleLookStudioClick(event) {
  const preset = event.target.closest("[data-look-preset]");
  if (preset && LOOK_PRESETS[preset.dataset.lookPreset]) {
    lookDraft = normalizeLook({ ...lookDraft, ...LOOK_PRESETS[preset.dataset.lookPreset] });
    renderLookStudio();
    return;
  }
  const bg = event.target.closest("[data-look-bg]");
  if (bg) {
    lookDraft = { ...lookDraft, stageBg: bg.dataset.lookBg };
    renderLookStudio();
    return;
  }
  const lyric = event.target.closest("[data-look-lyric]");
  if (lyric) {
    lookDraft = { ...lookDraft, lyricColor: lyric.dataset.lookLyric };
    renderLookStudio();
    return;
  }
  const chord = event.target.closest("[data-look-chord]");
  if (chord) {
    lookDraft = { ...lookDraft, chordColor: chord.dataset.lookChord };
    renderLookStudio();
    return;
  }
  const gap = event.target.closest("[data-look-gap]");
  if (gap) {
    lookDraft = { ...lookDraft, stageGap: Number(gap.dataset.lookGap) };
    renderLookStudio();
  }
}

function lookSwatches(colors, attr, selected) {
  return colors.map((color) => `<button type="button" class="look-swatch${color === selected ? " active" : ""}" data-${attr}="${color}" style="background:${color}" aria-label="${color}"></button>`).join("");
}

function activeLookPreset() {
  return Object.keys(LOOK_PRESETS).find((id) => {
    const preset = LOOK_PRESETS[id];
    return preset.stageBg === lookDraft.stageBg && preset.lyricColor === lookDraft.lyricColor && preset.chordColor === lookDraft.chordColor;
  }) || "";
}

function renderLookStudio() {
  if (!el.lookPreview) return;
  lookDraft = normalizeLook(lookDraft);
  applyLook(el.lookPreview, lookDraft);
  el.lookPreview.style.background = lookDraft.stageBg;
  el.lookPreview.style.color = lookDraft.lyricColor;
  el.lookPreview.innerHTML = LOOK_SAMPLE.map((line) => renderChordLine(line, 0)).join("");
  if (el.lookBgSwatches) el.lookBgSwatches.innerHTML = lookSwatches(LOOK_BG, "look-bg", lookDraft.stageBg);
  if (el.lookLyricSwatches) el.lookLyricSwatches.innerHTML = lookSwatches(LOOK_LYRIC, "look-lyric", lookDraft.lyricColor);
  if (el.lookChordSwatches) el.lookChordSwatches.innerHTML = lookSwatches(LOOK_CHORD, "look-chord", lookDraft.chordColor);
  if (el.fontSizeMore) el.fontSizeMore.value = fontPercentLabel(lookDraft.stageFont);
  const preset = activeLookPreset();
  document.querySelectorAll("[data-look-preset]").forEach((button) => {
    button.classList.toggle("active", button.dataset.lookPreset === preset);
  });
  document.querySelectorAll("[data-look-gap]").forEach((button) => {
    button.classList.toggle("active", Number(button.dataset.lookGap) === lookDraft.stageGap);
  });
  const dirty = lookDirty();
  if (el.lookDirty) el.lookDirty.hidden = !dirty;
  if (el.lookSave) el.lookSave.disabled = !dirty;
  if (el.lookCancel) el.lookCancel.disabled = !dirty;
}

function defaultStageFont() {
  if (matchMedia("(max-width: 767px)").matches) return 17;
  return 22;
}

function updateResponsiveStageFont() {
  if (localStorage.getItem(LOOK_KEY) || localStorage.getItem("chordbook.stageFont")) return;
  stageFont = defaultStageFont();
  savedLook = { ...savedLook, stageFont };
  lookDraft = { ...lookDraft, stageFont };
  applyLook(document.documentElement, savedLook);
}

async function shareSelectedSong() {
  const song = selectedSong();
  if (!song) return;
  const text = `${song.title}${song.artist ? ` - ${song.artist}` : ""}\n\n${song.lines.join("\n")}`;

  if (navigator.share && isTouchDevice()) {
    try {
      await navigator.share({ title: song.title, text });
      return;
    } catch (error) {
      if (error.name === "AbortError") return;
    }
  }

  try {
    await navigator.clipboard.writeText(text);
    notify(t("msg.copied"));
    return;
  } catch {
    if (copyTextFallback(text)) {
      notify(t("msg.copied"));
      return;
    }
  }

  downloadJson(`${safeFileName(song.title)}.chordbook`, {
    format: "chordbook-project",
    version: 2,
    name: song.title,
    exportedAt: new Date().toISOString(),
    song,
    setlists: [],
    visualPreferences: {},
    stems: null,
  });
  notify(t("msg.copyFail"));
}

function isTouchDevice() {
  return matchMedia("(pointer: coarse)").matches || navigator.maxTouchPoints > 0;
}

function copyTextFallback(text) {
  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.left = "-9999px";
  document.body.appendChild(textarea);
  textarea.select();
  let copied = false;
  try {
    copied = document.execCommand("copy");
  } finally {
    textarea.remove();
  }
  return copied;
}

function openMusicSearch(platform) {
  const song = selectedSong();
  if (!song) return;
  const query = encodeURIComponent([song.title, song.artist].filter(Boolean).join(" "));
  const urls = {
    youtube: `https://www.youtube.com/results?search_query=${query}`,
    spotify: `https://open.spotify.com/search/${query}`,
  };
  window.open(urls[platform], "_blank", "noopener,noreferrer");
}

function createSetlist() {
  const setlist = normalizeSetlist({
    id: makeId(),
    title: t("service.defaultTitle"),
    service: { date: selectedAgendaDay || nextSundayIso() },
  });
  state.setlists.push(setlist);
  selectedSetlistId = setlist.id;
  setlistFilter = "all";
  el.setlistFilters.forEach((button) => button.classList.toggle("active", button.dataset.setlistFilter === setlistFilter));
  persist();
  isSetlistDetailsOpen = true;
  isSetlistAddOpen = false;
  isSetlistDayMenuOpen = false;
  openSetlistEditor(setlist.id);
  requestAnimationFrame(() => {
    el.setlistTitle?.focus();
    el.setlistTitle?.select();
  });
}

function openSetlistEditor(setlistId) {
  selectedSetlistId = setlistId;
  isEditingSetlist = true;
  renderSetlists();
  switchView("setlists");
}

function closeSetlistEditor() {
  saveSetlist(true);
  isEditingSetlist = false;
  isSetlistDetailsOpen = false;
  isSetlistAddOpen = false;
  isSetlistDayMenuOpen = false;
  switchView("setlists");
}

function saveSetlist(silent) {
  let setlist = selectedSetlist();
  if (!setlist) {
    createSetlist();
    setlist = selectedSetlist();
  }
  setlist.title = el.setlistTitle.value.trim() || t("service.defaultTitle");
  setlist.service = readServiceFromForm();
  setlist.notes = el.setlistNotes.value.trim();
  setlist.updatedAt = new Date().toISOString();
  persist();
  if (silent !== true) isSetlistDetailsOpen = false;
  renderSetlists();
  if (silent !== true) {
    logFile(t("setlists.saved"));
    notify(t("setlists.saved"));
  }
}

function openSetlistSong(songId) {
  const setlist = selectedSetlist();
  if (!setlist || !state.songs.some((song) => song.id === songId)) return;
  activeSetlistId = setlist.id;
  selectedSongId = songId;
  render();
  switchView("song");
}

function addCurrentSongToSetlist(setlistId) {
  const song = selectedSong();
  const setlist = state.setlists.find((item) => item.id === setlistId);
  if (!song || !setlist) return;
  if (setlist.songIds.includes(song.id)) {
    notify(t("setlists.already"));
    return;
  }
  setlist.songIds.push(song.id);
  setlist.updatedAt = new Date().toISOString();
  selectedSetlistId = setlist.id;
  activeSetlistId = setlist.id;
  persist();
  isSetlistPickerOpen = false;
  isSongReadMenuOpen = false;
  render();
  notify(t("setlists.added", { title: setlist.title }));
}

function createSetlistWithCurrentSong() {
  const setlist = normalizeSetlist({
    id: makeId(),
    title: t("service.defaultTitle"),
    service: { date: nextSundayIso() },
  });
  state.setlists.push(setlist);
  addCurrentSongToSetlist(setlist.id);
}

function addSongToSetlist(songId) {
  toggleSongInSetlist(songId, true);
}

function toggleSongInSetlist(songId, checked) {
  const setlist = selectedSetlist();
  if (!setlist || !songId) return;
  if (isSetlistDetailsOpen) {
    setlist.service = readServiceFromForm();
    setlist.notes = el.setlistNotes?.value.trim() || setlist.notes;
  }
  const has = setlist.songIds.includes(songId);
  const parts = partitionSetlistSongs(setlist);
  if (checked && !has) {
    parts.praise.push(songId);
    writePartitionedSongs(setlist, parts.praise, parts.finale);
  }
  if (!checked && has) {
    writePartitionedSongs(
      setlist,
      parts.praise.filter((id) => id !== songId),
      parts.finale.filter((id) => id !== songId),
    );
  }
  setlist.updatedAt = new Date().toISOString();
  persist();
  refreshSetlistSongUi();
}

function songCheckListHtml(setlist) {
  const selected = new Set(setlist?.songIds || []);
  const query = normalize(setlistAddQuery);
  const songs = state.songs
    .filter((song) => !query || normalize(`${song.title} ${song.artist || ""}`).includes(query))
    .slice()
    .sort((a, b) => String(a.title || "").localeCompare(String(b.title || "")));
  if (!songs.length) {
    return `<p class="empty compact">${state.songs.length ? t("stage.noMatch") : t("setlists.noSongs")}</p>`;
  }
  return songs.map((song) => {
    const key = songWrittenKey(song);
    return `
      <label class="check-row">
        <input type="checkbox" data-toggle-song="${escapeHtml(song.id)}" ${selected.has(song.id) ? "checked" : ""}>
        <span class="check-mark" aria-hidden="true"></span>
        <span class="check-copy">
          <strong>${escapeHtml(song.title || t("song.noTitle"))}</strong>
          <small>${escapeHtml([song.artist, key].filter(Boolean).join(" · "))}</small>
        </span>
      </label>
    `;
  }).join("");
}

function bindSongCheckLists(root) {
  if (!root) return;
  root.querySelectorAll("[data-toggle-song]").forEach((input) => {
    input.addEventListener("change", () => toggleSongInSetlist(input.dataset.toggleSong, input.checked));
  });
}

function renderSongCheckLists() {
  const html = songCheckListHtml(selectedSetlist());
  if (el.setlistAddList) {
    el.setlistAddList.innerHTML = html;
    bindSongCheckLists(el.setlistAddList);
  }
  const eventList = document.querySelector("#eventSongList");
  if (eventList) {
    eventList.innerHTML = html;
    bindSongCheckLists(eventList);
  }
}

function refreshSetlistSongUi() {
  const setlist = selectedSetlist();
  if (el.setlistPicker) {
    el.setlistPicker.innerHTML = setlist
      ? renderEventOrderHtml(setlist)
      : `<p class="empty compact">${t("setlists.noSongs")}</p>`;
    bindSetlistSwipe(el.setlistPicker);
    el.setlistPicker.querySelectorAll("[data-setlist-action]").forEach((button) => {
      button.addEventListener("click", () => updateSetlistSongOrder(button.dataset.songId, button.dataset.setlistAction));
    });
    el.setlistPicker.querySelectorAll("[data-open-song-id]").forEach((button) => {
      button.addEventListener("click", () => openSetlistSong(button.dataset.openSongId));
    });
  }
  renderSongCheckLists();
}

function updateSetlistSongOrder(songId, action) {
  const setlist = selectedSetlist();
  if (!setlist) return;
  const parts = partitionSetlistSongs(setlist);

  if (action === "remove") {
    writePartitionedSongs(
      setlist,
      parts.praise.filter((id) => id !== songId),
      parts.finale.filter((id) => id !== songId),
    );
  } else if (action === "slot") {
    if (parts.finale.includes(songId)) {
      writePartitionedSongs(setlist, [...parts.praise, songId], parts.finale.filter((id) => id !== songId));
    } else {
      writePartitionedSongs(setlist, parts.praise.filter((id) => id !== songId), [...parts.finale, songId]);
    }
  } else {
    const index = setlist.songIds.indexOf(songId);
    if (index < 0) return;
    if (action === "up" && index > 0) {
      [setlist.songIds[index - 1], setlist.songIds[index]] = [setlist.songIds[index], setlist.songIds[index - 1]];
    }
    if (action === "down" && index < setlist.songIds.length - 1) {
      [setlist.songIds[index + 1], setlist.songIds[index]] = [setlist.songIds[index], setlist.songIds[index + 1]];
    }
  }

  setlist.updatedAt = new Date().toISOString();
  persist();
  renderSetlists();
}

function lastSetlistPlayMode() {
  try {
    return localStorage.getItem(SETLIST_PLAY_KEY) === "stage" ? "stage" : "song";
  } catch {
    return "song";
  }
}

function rememberSetlistPlayMode(mode) {
  try {
    localStorage.setItem(SETLIST_PLAY_KEY, mode === "stage" ? "stage" : "song");
  } catch {
    /* ignore quota / private mode */
  }
}

function askSetlistPlayMode() {
  const setlist = selectedSetlist();
  const firstSongId = setlist?.songIds.find((id) => state.songs.some((song) => song.id === id));
  if (!firstSongId) {
    notify(t("setlists.needSongs"));
    return;
  }
  const last = lastSetlistPlayMode();
  el.setlistPlaySheet?.querySelectorAll("[data-play-mode]").forEach((button) => {
    button.classList.toggle("on", button.dataset.playMode === last);
  });
  if (el.setlistPlaySheet) el.setlistPlaySheet.hidden = false;
}

function closeSetlistPlaySheet() {
  if (el.setlistPlaySheet) el.setlistPlaySheet.hidden = true;
}

function syncSetlistPlayChrome() {
  const playing = isSetlistPlaying && (el.appShell.classList.contains("song-active") || el.appShell.classList.contains("stage-active"));
  el.appShell.classList.toggle("setlist-playing", playing);
  if (!el.setlistPlayExit) return;
  el.setlistPlayExit.hidden = !playing;
  el.setlistPlayExit.classList.toggle("is-end", playing && setlistPlayFinished);
  el.setlistPlayExit.textContent = playing && setlistPlayFinished ? t("setlists.playDone") : "‹";
  el.setlistPlayExit.setAttribute("aria-label", playing && setlistPlayFinished ? t("setlists.playDone") : t("setlists.playExit"));
}

function openSelectedSetlist(mode) {
  const playMode = mode === "stage" ? "stage" : "song";
  const setlist = selectedSetlist();
  const firstSongId = setlist?.songIds.find((id) => state.songs.some((song) => song.id === id));
  if (!firstSongId) {
    notify(t("setlists.needSongs"));
    return;
  }
  setlist.lastOpenedAt = new Date().toISOString();
  activeSetlistId = setlist.id;
  selectedSongId = firstSongId;
  isSetlistPlaying = true;
  setlistPlayFinished = false;
  rememberSetlistPlayMode(playMode);
  closeSetlistPlaySheet();
  persist();
  render();
  switchView(playMode);
}

function openSelectedSetlistOnStage() {
  askSetlistPlayMode();
}

function deleteSetlist() {
  const setlist = selectedSetlist();
  if (!setlist || !confirm(t("setlists.deleteConfirm", { title: setlist.title }))) return;
  state.setlists = state.setlists.filter((item) => item.id !== setlist.id);
  selectedSetlistId = state.setlists[0]?.id ?? null;
  if (activeSetlistId === setlist.id) {
    activeSetlistId = null;
  }
  isEditingSetlist = false;
  persist();
  render();
  switchView("setlists");
}

function activeSetlist() {
  return state.setlists.find((setlist) => setlist.id === activeSetlistId) || null;
}

function setlistSongs(setlist) {
  return setlist.songIds.map((id) => state.songs.find((song) => song.id === id)).filter(Boolean);
}

function moveSetlistStage(delta) {
  const setlist = activeSetlist();
  const song = selectedSong();
  if (!setlist || !song) return;
  const songs = setlistSongs(setlist);
  const currentIndex = songs.findIndex((item) => item.id === song.id);
  const nextSong = songs[currentIndex + delta];
  if (!nextSong) {
    if (delta > 0 && isSetlistPlaying) {
      setlistPlayFinished = true;
      syncSetlistPlayChrome();
    }
    notify(delta > 0 ? t("stage.end") : t("stage.start"));
    return;
  }
  setlistPlayFinished = false;
  selectedSongId = nextSong.id;
  const keepScroll = isAutoScrolling;
  stopAutoScroll();
  el.stageContent.scrollTop = 0;
  if (el.songReadContent) el.songReadContent.scrollTop = 0;
  render();
  if (keepScroll) startAutoScroll();
}

function applyStageStep(delta) {
  const playingSetlist = el.appShell.classList.contains("stage-active")
    || el.appShell.classList.contains("song-active");
  if (!playingSetlist || !activeSetlist()) return false;
  moveSetlistStage(delta);
  return true;
}

function handleEditorSaveHotkey(event) {
  if (!(event.ctrlKey || event.metaKey) || event.key.toLowerCase() !== "s") return;
  if (!isEditingSong) return;
  event.preventDefault();
  el.form?.requestSubmit();
}

function handleStageHotkeys(event) {
  if (event.defaultPrevented || event.altKey || event.ctrlKey || event.metaKey) return;
  if (event.target.closest("input, textarea, select")) return;
  const goNext = event.key === "ArrowRight" || event.key === "PageDown" || event.key === "MediaTrackNext";
  const goPrev = event.key === "ArrowLeft" || event.key === "PageUp" || event.key === "MediaTrackPrevious";
  if (!goNext && !goPrev) return;
  if (!applyStageStep(goNext ? 1 : -1)) return;
  event.preventDefault();
}

function addSample() {
  const demo = demoLibrary();
  const songIds = new Set(state.songs.map((song) => song.id));
  const setlistIds = new Set(state.setlists.map((setlist) => setlist.id));
  const songs = demo.songs.filter((song) => !songIds.has(song.id));
  const setlists = demo.setlists.filter((setlist) => !setlistIds.has(setlist.id));
  if (!songs.length && !setlists.length) {
    notify(t("msg.sampleExists"));
    return;
  }
  if (state.songs.length && !confirm(t("msg.sample"))) return;
  state.songs.push(...songs);
  state.setlists.push(...setlists);
  selectedSongId = songs[0]?.id ?? selectedSongId;
  selectedSetlistId = setlists.at(-1)?.id ?? selectedSetlistId;
  persist();
  render();
}

function toggleTheme() {
  setTheme(state.theme === "dark" ? "light" : "dark");
}

function renderMore() {
  applyTheme();
  if (el.fileLog && el.fileLog.textContent === "Pronto.") el.fileLog.textContent = t("more.ready");
  renderLookStudio();
  syncChartPrefs();
  updateSyncUi();
}

function exportLibrary() {
  downloadJson("biblioteca_chordbook.chordbook-library", {
    format: "chordbook-library",
    version: 1,
    exportedAt: new Date().toISOString(),
    songs: state.songs,
  });
}

function exportSelectedSong() {
  const song = selectedSong();
  if (!song) return logFile(t("msg.noSong"));
  downloadJson(`${safeFileName(song.title)}.chordbook`, {
    format: "chordbook-project",
    version: 2,
    name: song.title,
    exportedAt: new Date().toISOString(),
    song,
    setlists: state.setlists.filter((setlist) => setlist.songIds.includes(song.id)),
    visualPreferences: {},
    stems: null,
  });
}

function exportRepertoire() {
  downloadJson("repertorio_chordbook.chordbook", {
    format: "chordbook-repertoire",
    version: 1,
    name: "Repertorio ChordBook",
    exportedAt: new Date().toISOString(),
    songs: state.songs,
    setlists: state.setlists,
    team: state.team,
    agenda: state.agenda,
  });
}

async function importFile(event) {
  const file = event.target.files?.[0];
  event.target.value = "";
  if (!file) return;
  try {
    const data = JSON.parse(await file.text());
    const result = importData(data);
    const saved = persist();
    render();
    if (saved) logFile(t("msg.imported", { result }));
  } catch (error) {
    logFile(t("msg.importFail", { error: error.message }));
  }
}

function importData(data) {
  if (data.format === "chordbook-library") {
    mergeSongs(data.songs || []);
    return `${(data.songs || []).length} cifras`;
  }
  if (data.format === "chordbook-repertoire") {
    mergeSongs(data.songs || []);
    mergeSetlists(data.setlists || []);
    if (data.team) mergeTeam(data.team);
    if (data.agenda) state.agenda = normalizeAgenda(data.agenda);
    return `${(data.songs || []).length} cifras e ${(data.setlists || []).length} setlists`;
  }
  if (data.format === "chordbook-project" && data.song) {
    mergeSongs([data.song]);
    mergeSetlists(data.setlists || []);
    selectedSongId = data.song.id;
    return `cifra ${data.song.title || ""}`;
  }
  if (Array.isArray(data.songs)) {
    mergeSongs(data.songs);
    return `${data.songs.length} cifras`;
  }
  throw new Error("formato desconhecido");
}

function mergeSongs(songs) {
  songs.filter(Boolean).forEach((song) => {
    const normalizedSong = normalizeSong(song);
    const index = state.songs.findIndex((item) => item.id === normalizedSong.id);
    if (index >= 0) state.songs[index] = normalizedSong;
    else state.songs.push(normalizedSong);
  });
  selectedSongId ||= state.songs[0]?.id ?? null;
}

function mergeSetlists(setlists) {
  setlists.filter(Boolean).forEach((setlist) => {
    const normalizedSetlist = normalizeSetlist(setlist);
    const index = state.setlists.findIndex((item) => item.id === normalizedSetlist.id);
    if (index >= 0) state.setlists[index] = normalizedSetlist;
    else state.setlists.push(normalizedSetlist);
  });
  selectedSetlistId ||= state.setlists[0]?.id ?? null;
}

function renderChartLines(lines, semitones) {
  const html = [];
  const source = Array.isArray(lines) ? lines : [];
  for (let index = 0; index < source.length; index += 1) {
    let line = source[index];
    if (isChartMetaLine(line)) continue;
    const labeled = splitLabeledChordLine(line);
    if (labeled) {
      html.push(renderChordLine(labeled[0], semitones));
      line = labeled[1];
    }
    if (isChordProLine(line)) {
      html.push(renderChordLine(line, semitones));
      continue;
    }
    line = expandGluedChords(line);
    const partnerAt = nextLyricPartnerIndex(source, index);
    if (isChordOnlyLine(line) && partnerAt >= 0) {
      const pair = mergeChordLyricPair(line, source[partnerAt]);
      if (pair.heading) html.push(renderChordLine(pair.heading, semitones));
      html.push(renderChordLine(pair.merged, semitones));
      index = partnerAt;
      continue;
    }
    html.push(renderChordLine(line, semitones));
  }
  return html.join("");
}

function renderChordLine(line, semitones) {
  if (/^\{[^}]+\}$/.test(line.trim())) {
    return "";
  }

  if (isSectionHeading(line)) {
    return `<div class="stage-section">${escapeHtml(line.trim())}</div>`;
  }

  if (isChordOnlyLine(line)) {
    return `<div class="stage-line chord-only"><span class="chord">${escapeHtml(transposeChordLine(line, semitones))}</span></div>`;
  }

  if (/\[[^\]]+\]/.test(line)) {
    return renderChordProChunks(line, semitones);
  }

  if (!String(line || "").trim()) {
    return `<div class="stage-line blank"></div>`;
  }

  return `<div class="stage-line"><span class="lyric-row">${escapeHtml(line)}</span></div>`;
}

function renderChordProChunks(line, semitones) {
  const chunks = splitChordProWordChunks(line, semitones);
  if (!chunks.some((chunk) => chunk.chord)) {
    return `<div class="stage-line"><span class="lyric-row">${escapeHtml(line.replace(/\[[^\]]+\]/g, ""))}</span></div>`;
  }
  return `<div class="stage-line chordpro-line">${chunks.map((chunk) => {
    return `<span class="chord-lyric"><span class="chord">${escapeHtml(chunk.chord)}</span><span class="lyric">${escapeHtml(chunk.lyric || " ")}</span></span>`;
  }).join("")}</div>`;
}

function isChordProLine(line) {
  return /\[[^\]]+\]/.test(String(line || ""));
}

function splitChordProWordChunks(line, semitones) {
  const source = normalizeChordProToWords(line);
  const chunks = [];
  const tokenRe = /\[([^\]]+)\]|(\s+)|(\S+)/g;
  let pending = [];
  let match;
  while ((match = tokenRe.exec(source)) !== null) {
    if (match[1] != null) {
      pending.push(transposeChord(match[1].trim(), semitones));
      continue;
    }
    const lyric = match[2] || match[3] || " ";
    if (pending.length > 1) {
      chunks.push({ chord: pending[0], lyric });
      pending.slice(1).forEach((chord) => chunks.push({ chord, lyric: " " }));
    } else {
      chunks.push({ chord: pending.join(" "), lyric });
    }
    pending = [];
  }
  if (pending.length) chunks.push({ chord: pending.join(" "), lyric: " " });
  return chunks.length ? chunks : [{ chord: "", lyric: source.replace(/\[[^\]]+\]/g, "") }];
}

function normalizeChordProToWords(line) {
  const source = String(line || "");
  if (!isChordProLine(source)) return source;
  let lyric = "";
  const marks = [];
  const chordRe = /\[([^\]]+)\]/g;
  let lastIndex = 0;
  let match;
  while ((match = chordRe.exec(source)) !== null) {
    lyric += source.slice(lastIndex, match.index);
    marks.push({ chord: match[1].trim(), index: lyric.length });
    lastIndex = chordRe.lastIndex;
  }
  lyric += source.slice(lastIndex);
  if (!marks.length) return source;

  const words = [];
  const wordRe = /\S+/g;
  let word;
  while ((word = wordRe.exec(lyric)) !== null) {
    words.push({ start: word.index, end: word.index + word[0].length, text: word[0], chords: [] });
  }
  if (!words.length) return `${marks.map((mark) => `[${mark.chord}]`).join("")}${lyric}`;

  marks.forEach((mark) => {
    const inside = words.find((item) => mark.index >= item.start && mark.index < item.end);
    const after = words.find((item) => item.start >= mark.index);
    const before = [...words].reverse().find((item) => item.end <= mark.index);
    let target = inside;
    if (!target && before && after) {
      target = (mark.index - before.end) <= (after.start - mark.index) ? before : after;
    }
    target = target || before || after || words[words.length - 1];
    if (target && mark.chord) target.chords.push(mark.chord);
  });

  let out = "";
  let cursor = 0;
  words.forEach((item) => {
    out += lyric.slice(cursor, item.start);
    out += item.chords.map((chord) => `[${chord}]`).join("");
    out += item.text;
    cursor = item.end;
  });
  return out + lyric.slice(cursor);
}

function foldStackedChords(lines) {
  const out = [];
  const source = Array.isArray(lines) ? lines : [];
  for (let index = 0; index < source.length; index += 1) {
    let line = source[index];
    if (isChartMetaLine(line)) continue;
    const labeled = splitLabeledChordLine(line);
    if (labeled) {
      out.push(labeled[0]);
      line = labeled[1];
    }
    if (isChordProLine(line)) {
      out.push(normalizeChordProToWords(line));
      continue;
    }
    line = expandGluedChords(line);
    const partnerAt = nextLyricPartnerIndex(source, index);
    if (isChordOnlyLine(line) && partnerAt >= 0) {
      const pair = mergeChordLyricPair(line, source[partnerAt]);
      if (pair.heading) out.push(pair.heading);
      out.push(pair.merged);
      index = partnerAt;
      continue;
    }
    out.push(line);
  }
  return out;
}

function nextLyricPartnerIndex(source, index) {
  for (let cursor = index + 1; cursor < source.length; cursor += 1) {
    if (!String(source[cursor] || "").trim()) continue;
    return isLyricPartner(source[cursor]) ? cursor : -1;
  }
  return -1;
}

function splitLabeledChordLine(line) {
  const match = String(line || "").match(/^(intro|introducci[oó]n|outro|coda|solo|puente|bridge|instr(?:umental)?|interludio|inst)\s*[:.]?\s+(.+)$/i);
  if (!match || !isChordOnlyLine(match[2])) return null;
  const raw = match[1].trim();
  const label = `${raw.charAt(0).toUpperCase()}${raw.slice(1).toLowerCase()}:`;
  return [label, match[2].trim()];
}

function isLyricPartner(line) {
  if (line == null) return false;
  const trimmed = String(line).trim();
  if (!trimmed || /^\{/.test(trimmed) || isChordOnlyLine(trimmed) || isSectionHeading(trimmed)) return false;
  if (isChartMetaLine(trimmed) || /^\([^)]*\)$/.test(trimmed)) return false;
  return /[A-Za-zÀ-ÿ]/.test(trimmed);
}

function isChartMetaLine(line) {
  const trimmed = String(line || "").trim();
  if (!trimmed) return false;
  if (/^\d+\/\d+\b/.test(trimmed) || /\bbpm\b/i.test(trimmed)) return true;
  if (/^transpor tom$/i.test(trimmed) || /^[+\-−]+$/.test(trimmed)) return true;
  return false;
}

function mergeChordLyricPair(chordLine, lyricLine) {
  let lyrics = String(lyricLine || "");
  let heading = "";
  let prefixLength = 0;
  const prefix = lyrics.match(/^(intro|introducci[oó]n|verso|verse|estrofa|coro|chorus|estribillo|puente|bridge|outro|coda|pre-?coro|pre-?chorus|final|tag|interludio|solo)\s*\d*\s*[:.\-]?\s+/i);
  if (prefix) {
    heading = prefix[0].trim().replace(/[:.\-]+$/, "");
    if (!/:$/.test(heading)) heading += ":";
    prefixLength = prefix[0].length;
    lyrics = lyrics.slice(prefixLength);
  }
  const turnaround = splitChordTurnaround(expandGluedChords(chordLine));
  const mainLine = turnaround.main;
  const extraChords = turnaround.extra;
  let merged = chordLineHasAlignment(mainLine)
    ? mergeChordsByColumns(mainLine, lyrics, prefixLength)
    : mergeChordsByWords(mainLine, lyrics);
  if (extraChords.length) merged += extraChords.map((chord) => `[${chord}]`).join("");
  return { heading, merged: normalizeChordProToWords(merged) };
}

function splitChordTurnaround(chordLine) {
  const source = String(chordLine || "");
  const pipeIndex = source.search(/\S.*\|/);
  if (pipeIndex < 0) return { main: source, extra: [] };
  const mark = source.indexOf("|", pipeIndex);
  if (mark <= 0 || !chordMarkers(source.slice(0, mark)).length) {
    return { main: source.replace(/\|/g, " "), extra: [] };
  }
  return {
    main: source.slice(0, mark),
    extra: chordMarkers(source.slice(mark + 1)).map((token) => token.chord),
  };
}

function chordLineHasAlignment(line) {
  return /^\s{2,}/.test(line) || /\S\s{2,}\S/.test(line);
}

function chordMarkers(line) {
  const tokens = [];
  const source = String(line || "").replace(/\t/g, "  ");
  const regex = new RegExp(CHORD_FIND_RE.source, "gi");
  let match;
  while ((match = regex.exec(source)) !== null) {
    tokens.push({ chord: match[0], index: match.index });
  }
  return tokens;
}

function mergeChordsByColumns(chordLine, lyrics, shift = 0) {
  const tokens = chordMarkers(chordLine);
  if (!tokens.length) return lyrics;
  const spans = wordSpans(lyrics);
  const used = new Set();
  const placed = tokens.map((token) => {
    const raw = Math.min(Math.max(token.index - shift, 0), lyrics.length);
    const at = snapToUnusedWordStart(spans, raw, used);
    used.add(at);
    return { chord: token.chord, at };
  });
  placed.sort((a, b) => b.at - a.at);
  let result = lyrics;
  placed.forEach((item) => {
    result = `${result.slice(0, item.at)}[${item.chord}]${result.slice(item.at)}`;
  });
  return result;
}

function wordSpans(lyrics) {
  const spans = [];
  const word = /\S+/g;
  let match;
  while ((match = word.exec(lyrics)) !== null) {
    spans.push({ start: match.index, end: match.index + match[0].length });
  }
  return spans;
}

function allWordStarts(lyrics) {
  return wordSpans(lyrics).map((span) => span.start);
}

function snapToUnusedWordStart(spans, index, used) {
  if (!spans.length) return index;
  const starts = spans.map((span) => span.start);
  const inside = spans.find((span) => index >= span.start && index < span.end);
  let best = inside ? inside.start : starts[0];
  if (!inside) {
    const previous = [...spans].reverse().find((span) => span.end <= index);
    const next = spans.find((span) => span.start >= index);
    if (previous && next) {
      const toPrev = index - previous.end;
      const toNext = next.start - index;
      best = toPrev <= toNext ? previous.start : next.start;
    } else {
      best = (previous || next || spans[0]).start;
    }
  }
  if (!used.has(best)) return best;
  const after = starts.find((start) => start > best && !used.has(start));
  if (after != null) return after;
  const before = [...starts].reverse().find((start) => start < best && !used.has(start));
  return before != null ? before : best;
}

function mergeChordsByWords(chordLine, lyrics) {
  const chords = chordMarkers(expandGluedChords(chordLine)).map((token) => token.chord);
  if (!chords.length) return lyrics;
  let starts = allWordStarts(lyrics);
  if (!starts.length) return `${chords.map((chord) => `[${chord}]`).join(" ")} ${lyrics}`.trim();
  const targets = uniqueSpreadStarts(starts, chords.length);
  let result = lyrics;
  for (let index = chords.length - 1; index >= 0; index -= 1) {
    const at = targets[index];
    const stacked = index < chords.length - 1 && targets[index] === targets[index + 1];
    result = `${result.slice(0, at)}[${chords[index]}]${stacked ? " " : ""}${result.slice(at)}`;
  }
  return result;
}

function lyricWordStarts(lyrics) {
  const filler = /^(es|y|o|a|e|u|de|da|do|el|la|las|los|un|una|um|uma|the|of|and|oh|que|hay|en|al|si|te|se|su|sus|con|por|para|hoy|ven|ante|tus|mi|mis|nos|le|les|lo|ha|han)$/i;
  const all = [];
  const significant = [];
  const word = /\S+/g;
  let match;
  while ((match = word.exec(lyrics)) !== null) {
    all.push(match.index);
    const token = match[0].replace(/^[^\wÀ-ÿ]+|[^\wÀ-ÿ]+$/g, "");
    if (token && !filler.test(token)) significant.push(match.index);
  }
  return significant.length ? significant : all;
}

function uniqueSpreadStarts(starts, count) {
  if (count <= 1) return [starts[0]];
  if (starts.length === 1) return Array.from({ length: count }, () => starts[0]);
  const used = new Set();
  return Array.from({ length: count }, (_, index) => {
    let pick = starts.length >= count
      ? starts[Math.round((index * (starts.length - 1)) / (count - 1))]
      : starts[Math.min(index, starts.length - 1)];
    if (used.has(pick)) {
      pick = starts.find((start) => start > pick && !used.has(start))
        ?? starts.find((start) => !used.has(start))
        ?? pick;
    }
    used.add(pick);
    return pick;
  });
}

function isSectionHeading(line) {
  const trimmed = line.trim();
  if (!trimmed || trimmed.length > 42 || !/:$/.test(trimmed)) return false;
  if (/^\{/.test(trimmed)) return false;
  return !isChordOnlyLine(trimmed.replace(/:$/, ""));
}

function isChordOnlyLine(line) {
  const trimmed = expandGluedChords(String(line || "")).replace(/\|/g, " ").trim();
  if (!trimmed) return false;
  if (/:$/.test(trimmed)) return false;
  const tokens = trimmed.split(/\s+/).filter(Boolean);
  if (!tokens.length) return false;
  return tokens.every((token) => token.split(/[-–—]+/).filter(Boolean).every((part) => CHORD_TOKEN_RE.test(part)));
}

function expandGluedChords(line) {
  return String(line || "").replace(/[A-G][^\s|]*/g, (token) => {
    const parts = splitGluedChordToken(token);
    return parts && parts.length > 1 ? parts.join(" ") : token;
  });
}

function splitGluedChordToken(token) {
  const source = String(token || "");
  if (!source) return null;
  if (CHORD_TOKEN_RE.test(source)) return [source];
  const parts = [];
  let rest = source;
  while (rest) {
    let found = "";
    for (let len = rest.length; len >= 1; len -= 1) {
      if (CHORD_TOKEN_RE.test(rest.slice(0, len))) {
        found = rest.slice(0, len);
        break;
      }
    }
    if (!found) return null;
    parts.push(found);
    rest = rest.slice(found.length);
  }
  return parts.length ? parts : null;
}

function transposeChordLine(line, semitones) {
  return line.replace(new RegExp(CHORD_FIND_RE.source, "g"), (chord) => transposeChord(chord, semitones));
}

function renderMobileSongHeading(song) {
  const key = songKey(song);
  const meta = [song.capo ? `Capo ${song.capo}` : "", song.artist].filter(Boolean).join(" ");
  return `<section class="mobile-chart-heading"><h2>${escapeHtml(song.title || t("song.noTitle"))}</h2>${meta ? `<p>${escapeHtml(meta)}</p>` : ""}${key ? `<p>${escapeHtml(t("song.key", { key: transposeChord(key, song.transposeValue || 0) }))}</p>` : ""}</section>`;
}

function songKey(song) {
  const keyLine = song.lines.find((line) => /^\{key:\s*[^}]+\}$/i.test(line.trim()));
  return keyLine?.replace(/^\{key:\s*|\}$/gi, "").trim() || "";
}

function alignChordProLine(line, semitones) {
  const chordRegex = /\[([^\]]+)\]/g;
  let lyric = "";
  const chordChars = [];
  let lastIndex = 0;
  let match;

  while ((match = chordRegex.exec(line)) !== null) {
    const before = line.slice(lastIndex, match.index);
    lyric += before;
    const chord = transposeChord(match[1].trim(), semitones);
    const position = lyric.length;
    for (let index = 0; index < chord.length; index += 1) {
      chordChars[position + index] = chord[index];
    }
    lastIndex = chordRegex.lastIndex;
  }

  lyric += line.slice(lastIndex);

  const width = Math.max(lyric.length, chordChars.length);
  const chords = Array.from({ length: width }, (_, index) => chordChars[index] || " ").join("").trimEnd();
  return { chords, lyrics: lyric };
}

function transposeChord(chord, semitones) {
  return chord.replace(/^([A-G](?:#|b)?)(.*?)(?:\/([A-G](?:#|b)?))?$/, (_, root, suffix, bass) => {
    const nextRoot = shiftNote(root, semitones);
    const nextBass = bass ? `/${shiftNote(bass, semitones)}` : "";
    return `${nextRoot}${suffix}${nextBass}`;
  });
}

function shiftNote(note, semitones) {
  const sharp = FLAT_TO_SHARP[note] || note;
  const index = NOTES.indexOf(sharp);
  if (index < 0) return note;
  return NOTES[(index + semitones + 1200) % NOTES.length];
}

function capoSuggestion(song) {
  const original = songKey(song);
  const root = original.match(/^[A-G](?:#|b)?/)?.[0];
  if (!root) return null;
  const rootIndex = NOTES.indexOf(FLAT_TO_SHARP[root] || root);
  if (rootIndex < 0) return null;
  const transpose = Number(song.transposeValue || 0);
  const displayedIndex = (rootIndex + transpose + 1200) % 12;
  const displayedKey = NOTES[displayedIndex];
  if (EASY_KEYS.includes(displayedKey)) {
    return { capo: Number(song.capo || 0), shapeKey: displayedKey, transpose, score: 0 };
  }
  const sounding = (displayedIndex + Number(song.capo || 0) + 1200) % 12;
  let best = null;
  for (let capo = 0; capo <= 7; capo += 1) {
    const shapeIndex = (sounding - capo + 12) % 12;
    const shapeKey = NOTES[shapeIndex];
    const easyRank = EASY_KEYS.indexOf(shapeKey);
    if (easyRank < 0) continue;
    const score = capo * 20 + easyRank;
    if (!best || score < best.score) {
      best = { capo, shapeKey, transpose: shapeIndex - rootIndex, score };
    }
  }
  return best;
}

function renderCapoHint(song) {
  if (!el.songCapoHint) return;
  el.songCapoHint.hidden = true;
  el.songCapoHint.innerHTML = "";
}

function applyCapoSuggestion() {
  const song = selectedSong();
  const suggestion = song ? capoSuggestion(song) : null;
  if (!song || !suggestion) return;
  song.capo = suggestion.capo;
  song.transposeValue = suggestion.transpose;
  persist();
  render();
}

function toggleChordSheet() {
  isChordSheetOpen = !isChordSheetOpen;
  renderChordSheet();
}

function closeChordSheet() {
  isChordSheetOpen = false;
  renderChordSheet();
}

function renderChordSheet() {
  if (!el.chordSheet) return;
  el.chordSheet.hidden = !isChordSheetOpen;
  if (!isChordSheetOpen) return;
  const song = selectedSong();
  const chords = song ? uniqueSongChords(song) : [];
  el.chordSheetBody.innerHTML = chords.length
    ? `<div class="chord-grid">${chords.map((name) => chordCard(name)).join("")}</div>`
    : `<p class="empty">${escapeHtml(t("chords.empty"))}</p>`;
}

function uniqueSongChords(song) {
  const found = [];
  const seen = new Set();
  const add = (raw) => {
    const name = transposeChord(String(raw || "").trim(), song.transposeValue || 0);
    if (!name || seen.has(name)) return;
    seen.add(name);
    found.push(name);
  };
  song.lines.forEach((line) => {
    const chordRegex = /\[([^\]]+)\]/g;
    let match;
    while ((match = chordRegex.exec(line)) !== null) add(match[1]);
    if (isChordOnlyLine(line)) {
      line.trim().split(/\s+/).filter((token) => token !== "|").forEach(add);
    }
  });
  return found;
}

function chordCard(name) {
  const shape = shapeForChord(name);
  return `
    <div class="chord-card">
      <strong>${escapeHtml(name)}</strong>
      ${diagramSvg(shape)}
    </div>
  `;
}

function shapeForChord(name) {
  const base = name.split("/")[0].replace(/min/g, "m");
  if (CHORD_SHAPES[base]) return CHORD_SHAPES[base];
  const aliases = {
    "Db": "C#", "Eb": "D#", "Gb": "F#", "Ab": "G#", "Bb": "A#",
  };
  const swapped = base.replace(/^(Db|Eb|Gb|Ab|Bb)/, (root) => aliases[root] || root);
  if (CHORD_SHAPES[swapped]) return CHORD_SHAPES[swapped];
  const simplified = base.replace(/(add\d+|sus\d+|maj7|m7|7)$/, (suffix) => {
    if (suffix === "m7") return "m";
    if (suffix === "maj7" || suffix.startsWith("add") || suffix.startsWith("sus")) return "";
    return "7";
  });
  return CHORD_SHAPES[simplified] || CHORD_SHAPES[swapped.replace(/(add\d+|sus\d+|maj7|m7|7)$/, "")] || "";
}

function diagramSvg(code) {
  if (!code) {
    return `<svg class="chord-svg" viewBox="0 0 84 112" aria-hidden="true"><text x="42" y="64" text-anchor="middle" font-size="22">?</text></svg>`;
  }
  const marks = code.split("").map((char) => (char === "x" || char === "X" ? -1 : Number(char)));
  const pressed = marks.filter((fret) => fret > 0);
  const base = pressed.length && Math.min(...pressed) > 2 ? Math.min(...pressed) : 1;
  const nut = base === 1;
  const dots = marks.map((fret, string) => {
    if (fret <= 0) return "";
    const x = 12 + string * 12;
    const y = 22 + (fret - base + 0.5) * 18;
    return `<circle cx="${x}" cy="${y}" r="5.2" fill="currentColor" />`;
  }).join("");
  const mutes = marks.map((fret, string) => {
    const x = 12 + string * 12;
    if (fret < 0) return `<text x="${x}" y="14" text-anchor="middle" font-size="10">x</text>`;
    if (fret === 0) return `<circle cx="${x}" cy="11" r="3.2" fill="none" stroke="currentColor" stroke-width="1.4" />`;
    return "";
  }).join("");
  const lines = Array.from({ length: 5 }, (_, index) => {
    const y = 22 + index * 18;
    return `<line x1="12" y1="${y}" x2="72" y2="${y}" />`;
  }).join("");
  const strings = Array.from({ length: 6 }, (_, index) => {
    const x = 12 + index * 12;
    return `<line x1="${x}" y1="22" x2="${x}" y2="94" />`;
  }).join("");
  const fretLabel = base > 1 ? `<text x="78" y="36" font-size="10">${base}</text>` : "";
  return `
    <svg class="chord-svg" viewBox="0 0 84 112" aria-hidden="true">
      ${nut ? `<line x1="12" y1="22" x2="72" y2="22" stroke-width="4" />` : ""}
      ${strings}${lines}${mutes}${dots}${fretLabel}
    </svg>
  `;
}

function selectedSong() {
  return state.songs.find((song) => song.id === selectedSongId) || null;
}

function selectedSetlist() {
  return state.setlists.find((setlist) => setlist.id === selectedSetlistId) || null;
}

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
    if (!Array.isArray(saved.songs)) {
      return demoLibrary();
    }
    return {
      songs: uniqueById((saved.songs || []).map(normalizeSong)),
      setlists: uniqueById((saved.setlists || []).map(normalizeSetlist)),
      theme: saved.theme === "dark" || saved.theme === "auto" ? saved.theme : "light",
      language: I18N[saved.language] ? saved.language : "pt",
      showChords: saved.showChords !== false,
      showLyrics: saved.showLyrics !== false,
      focusChart: Boolean(saved.focusChart),
      preferAutoScroll: Boolean(saved.preferAutoScroll),
      team: normalizeTeam(saved.team),
      agenda: normalizeAgenda(saved.agenda),
    };
  } catch {
    return demoLibrary();
  }
}

function demoLibrary() {
  const now = new Date().toISOString();
  const songs = [
    normalizeSong({
      id: "demo-abrigo",
      title: "Meu Abrigo",
      artist: "Exemplo",
      category: "Louvor",
      isFavorite: true,
      lines: [
        "{key: G}",
        "[G]Quando a noite vem, eu [D/F#]lembro",
        "[Em7]Tua voz me chama para [Cadd9]perto",
        "[G]Meu abrigo, minha [D]canção",
        "[Am7]Tu sustentas meu [C]coração",
        "",
        "[C]Aleluia, [G/B]minha alma canta",
        "[D]Aleluia, [Em7]tua graça basta",
        "[C]Aleluia, [G]Deus comigo está",
        "[D]Hoje e sempre reinará",
      ],
    }),
    normalizeSong({
      id: "demo-caminho",
      title: "Caminho de Paz",
      artist: "Exemplo",
      category: "Adoração",
      lines: [
        "{key: D}",
        "[D]Leva meus passos ao teu [A]rio",
        "[Bm7]Lava o medo, acende a [G]fé",
        "[D/F#]No teu silêncio encontro [A]abrigo",
        "[Em7]No teu amor eu fico de [G]pé",
        "",
        "[G]Santo, [A]santo",
        "[Bm7]Meu descanso esta em [D/F#]ti",
        "[G]Santo, [A]santo",
        "[Em7]Tua paz vive em [D]mim",
      ],
    }),
    normalizeSong({
      id: "demo-graca",
      title: "Amazing Grace",
      artist: "Tradicional",
      category: "Hinos",
      capo: 0,
      lines: [
        "{key: C}",
        "[C]Amazing [F]grace, how [C]sweet the sound",
        "That saved a [Am]soul like [G]me",
        "[C]I once was [F]lost, but [C]now am found",
        "Was blind, but [G]now I [C]see",
      ],
    }),
    normalizeSong({
      id: "demo-esperanca",
      title: "Esperança Viva",
      artist: "Exemplo",
      category: "Celebração",
      isFavorite: true,
      lines: [
        "{key: A}",
        "[A]Há uma luz nascendo [E]aqui",
        "[F#m]Há uma chama ardendo em [D]nós",
        "[A/C#]Nada apaga o teu [E]amor",
        "[Bm7]Nada cala nossa [D]voz",
        "",
        "[A]Vem, esperança [E]viva",
        "[F#m]Vem, renova o [D]altar",
        "[A/C#]Cristo é nossa [E]alegria",
        "[Bm7]Para sempre vamos [D]cantar",
      ],
    }),
    normalizeSong({
      id: "demo-acustico",
      title: "Ensaio Acústico",
      artist: "Exemplo",
      category: "Ensaio",
      capo: 2,
      cue: "Conta quatro e entra",
      lines: [
        "{key: E}",
        "[E]Conta quatro, respira e [B/D#]vai",
        "[C#m7]Baixo firme, violão no [A]tempo",
        "[E/G#]Voz entrando sem correr [B]mais",
        "[F#m7]Todo mundo no mesmo [A]vento",
        "",
        "[A]E  [B]F#m7  [C#m7]",
        "[A]E/G#  [B]A",
      ],
    }),
  ];

  const setlists = [
    normalizeSetlist({
      id: "demo-setlist-domingo",
      title: "Culto Domingo",
      songIds: ["demo-abrigo", "demo-esperanca", "demo-graca"],
      notes: "Chegar 20 min antes",
      createdAt: now,
      service: {
        date: nextSundayIso(),
        opening: "Piano — Ana",
        leader: "Irmão Paulo",
        announcements: "Irmã Maria",
        worshipTeam: "Ministério de louvor",
        preacher: "Pastor João",
        preacherRole: "pastor",
        communion: "Pastor João",
      },
    }),
    normalizeSetlist({
      id: "demo-setlist-ensaio",
      title: "Ensaio da Semana",
      songIds: ["demo-acustico", "demo-caminho", "demo-abrigo"],
      notes: "Checar tons, capo e entradas",
      createdAt: now,
    }),
  ];

  return { songs, setlists, theme: "light", language: "pt", showChords: true, showLyrics: true, focusChart: false, preferAutoScroll: false, team: normalizeTeam(), agenda: normalizeAgenda() };
}

function persist(options = {}) {
  try {
    state.songs = uniqueById(state.songs);
    state.setlists = uniqueById(state.setlists);
    state.team = normalizeTeam(state.team);
    state.agenda = normalizeAgenda(state.agenda);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    if (!options.fromSync) scheduleSyncPush();
    return true;
  } catch {
    if (!options.silent) {
      try {
        notify(t("msg.saveFail"));
      } catch {
        /* toast may not exist yet */
      }
    }
    return false;
  }
}

function isDesktopComputer() {
  return window.matchMedia("(min-width: 768px)").matches && !window.ChordBookAndroid;
}

function formatSyncCode(code) {
  const digits = String(code || "").replace(/\D/g, "").slice(0, 6);
  return digits.length > 3 ? `${digits.slice(0, 3)} ${digits.slice(3)}` : digits;
}

function syncPeerId(code) {
  return `${SYNC_PEER_PREFIX}${String(code || "").replace(/\D/g, "")}`;
}

function loadPeerJs() {
  if (window.Peer) return Promise.resolve(window.Peer);
  if (loadPeerJs.pending) return loadPeerJs.pending;
  loadPeerJs.pending = new Promise((resolve, reject) => {
    const local = document.createElement("script");
    local.src = "./vendor/peerjs.min.js";
    local.onload = () => (window.Peer ? resolve(window.Peer) : reject(new Error("peerjs")));
    local.onerror = () => {
      local.remove();
      const remote = document.createElement("script");
      remote.src = "https://unpkg.com/peerjs@1.5.4/dist/peerjs.min.js";
      remote.onload = () => (window.Peer ? resolve(window.Peer) : reject(new Error("peerjs")));
      remote.onerror = () => reject(new Error("peerjs"));
      document.head.appendChild(remote);
    };
    document.head.appendChild(local);
  }).catch((error) => {
    loadPeerJs.pending = null;
    throw error;
  });
  return loadPeerJs.pending;
}

function setPairingStayAwake(on) {
  try {
    window.ChordBookAndroid?.setKeepScreenOn?.(Boolean(on));
  } catch {
    /* Android bridge is optional. */
  }
  if (on) {
    if (navigator.wakeLock && document.visibilityState === "visible") {
      navigator.wakeLock.request("screen").catch(() => {});
    }
    return;
  }
  if (!el.appShell.classList.contains("stage-active") && !isSetlistPlaying) releaseStageWakeLock();
}

function librarySnapshot() {
  return {
    songs: state.songs,
    setlists: state.setlists,
    team: state.team,
    agenda: state.agenda,
    selectedSongId,
    selectedSetlistId,
  };
}

function sendSyncMessage(message) {
  if (!syncLink.conn || syncLink.conn.open === false) return false;
  try {
    syncLink.conn.send(message);
    return true;
  } catch {
    return false;
  }
}

function scheduleSyncPush() {
  if (!syncLink.authorized || !syncLink.conn) return;
  clearTimeout(syncLink.pushTimer);
  syncLink.pushTimer = setTimeout(() => {
    if (!syncLink.authorized) return;
    sendSyncMessage({ type: "state", payload: librarySnapshot() });
  }, 280);
}

function applySyncState(payload, notifyKey, options = {}) {
  if (!payload || !Array.isArray(payload.songs)) return;
  const hadLocal = state.songs.length > 0 || state.setlists.length > 0;
  const incomingEmpty = !(payload.songs || []).length && !(payload.setlists || []).length;
  if (options.merge) {
    mergeSongs(payload.songs || []);
    mergeSetlists(payload.setlists || []);
    if (payload.team) mergeTeam(payload.team);
    if (payload.agenda) {
      const local = state.agenda || {};
      state.agenda = normalizeAgenda({
        fields: [...(local.fields || []), ...(payload.agenda.fields || [])],
        sections: [...(local.sections || []), ...(payload.agenda.sections || [])],
      });
    }
  } else {
    state.songs = uniqueById((payload.songs || []).map(normalizeSong));
    state.setlists = uniqueById((payload.setlists || []).map(normalizeSetlist));
    if (payload.team) state.team = normalizeTeam(payload.team);
    if (payload.agenda) state.agenda = normalizeAgenda(payload.agenda);
  }
  if (payload.selectedSongId && state.songs.some((song) => song.id === payload.selectedSongId)) {
    selectedSongId = payload.selectedSongId;
  } else if (!state.songs.some((song) => song.id === selectedSongId)) {
    selectedSongId = state.songs[0]?.id ?? null;
  }
  if (payload.selectedSetlistId && state.setlists.some((setlist) => setlist.id === payload.selectedSetlistId)) {
    selectedSetlistId = payload.selectedSetlistId;
  } else if (!state.setlists.some((setlist) => setlist.id === selectedSetlistId)) {
    selectedSetlistId = state.setlists[0]?.id ?? null;
  }
  persist({ fromSync: true });
  if (options.reply) scheduleSyncPush();
  render();
  const key = notifyKey || (options.merge
    ? (incomingEmpty && hadLocal ? "sync.keptLocal" : hadLocal && !incomingEmpty ? "sync.merged" : "sync.received")
    : "");
  if (key) notify(t(key));
}

function handleSyncMessage(message) {
  if (!message || typeof message !== "object") return;
  if (message.type === "hello" && syncLink.role === "host") {
    syncLink.status = "auth";
    updateSyncUi();
    return;
  }
  if (message.type === "auth-ok" && syncLink.role === "host") {
    syncLink.authorized = true;
    syncLink.status = "linked";
    setSyncHostSheetOpen(false);
    applySyncState(message.payload, "", { merge: true, reply: true });
    updateSyncUi();
    setPairingStayAwake(false);
    return;
  }
  if (message.type === "auth-deny" && syncLink.role === "host") {
    notify(t("sync.denied"));
    stopSyncLink(true);
    return;
  }
  if (message.type === "state" && syncLink.authorized) {
    applySyncState(message.payload);
  }
}

function bindSyncConnection(conn) {
  syncLink.conn = conn;
  conn.on("data", handleSyncMessage);
  conn.on("close", () => {
    if (syncLink.conn !== conn) return;
    const wasLinked = syncLink.authorized;
    stopSyncLink(false);
    if (wasLinked) notify(t("sync.disconnected"));
  });
  conn.on("error", () => {
    if (syncLink.conn !== conn) return;
    notify(t("sync.fail"));
    stopSyncLink(true);
  });
}

function destroySyncPeer() {
  try {
    syncLink.conn?.close?.();
  } catch {
    /* already closed */
  }
  try {
    syncLink.peer?.destroy?.();
  } catch {
    /* already destroyed */
  }
  syncLink.peer = null;
  syncLink.conn = null;
}

function stopSyncLink(notifyStop) {
  clearTimeout(syncLink.pushTimer);
  const wasActive = syncLink.status !== "idle";
  destroySyncPeer();
  syncLink.role = "";
  syncLink.code = "";
  syncLink.status = "idle";
  syncLink.authorized = false;
  syncLink.hostRetries = 0;
  if (el.syncAuthSheet) el.syncAuthSheet.hidden = true;
  setSyncHostSheetOpen(false);
  setPairingStayAwake(false);
  updateSyncUi();
  if (notifyStop && wasActive) notify(t("sync.disconnected"));
}

function setSyncHostSheetOpen(open) {
  if (!el.syncHostSheet) return;
  el.syncHostSheet.hidden = !open;
}

function handleSyncBannerClick() {
  if (syncLink.status === "linked") {
    stopSyncLink(true);
    return;
  }
  if (syncLink.role === "host") {
    setSyncHostSheetOpen(true);
    return;
  }
  startComputerHost({ openSheet: true });
}

function formatSyncCodeInput() {
  if (!el.syncJoinInput) return;
  const formatted = formatSyncCode(el.syncJoinInput.value);
  if (el.syncJoinInput.value !== formatted) el.syncJoinInput.value = formatted;
}

async function startComputerHost({ openSheet = false, retry = false } = {}) {
  if (syncLink.role === "guest" && syncLink.status !== "idle") stopSyncLink(false);
  if (syncLink.role === "host" && syncLink.peer && !retry) {
    if (openSheet) setSyncHostSheetOpen(true);
    updateSyncUi();
    return;
  }
  try {
    await loadPeerJs();
  } catch {
    notify(t("sync.fail"));
    return;
  }
  destroySyncPeer();
  const code = String(Math.floor(100000 + Math.random() * 900000));
  syncLink.role = "host";
  syncLink.code = code;
  syncLink.status = "hosting";
  syncLink.authorized = false;
  if (openSheet) setSyncHostSheetOpen(true);
  updateSyncUi();
  const peer = new window.Peer(syncPeerId(code), { debug: 0 });
  syncLink.peer = peer;
  peer.on("open", () => {
    syncLink.hostRetries = 0;
    updateSyncUi();
  });
  peer.on("connection", (conn) => {
    if (syncLink.authorized && syncLink.conn && syncLink.conn.open) {
      try { conn.close(); } catch { /* ignore extra guest */ }
      return;
    }
    bindSyncConnection(conn);
    conn.on("open", () => {
      syncLink.status = "auth";
      updateSyncUi();
    });
  });
  peer.on("error", (error) => {
    if (error?.type === "unavailable-id" && syncLink.hostRetries < 6) {
      syncLink.hostRetries += 1;
      notify(t("sync.peerBusy"));
      startComputerHost({ openSheet, retry: true });
      return;
    }
    notify(t("sync.fail"));
    stopSyncLink(false);
  });
  peer.on("disconnected", () => {
    if (syncLink.status === "idle") return;
    try { peer.reconnect(); } catch { /* ignore */ }
  });
}

async function joinComputerHost() {
  const code = String(el.syncJoinInput?.value || "").replace(/\D/g, "");
  if (code.length !== 6) {
    notify(t("sync.needCode"));
    return;
  }
  if (syncLink.role === "host") stopSyncLink(false);
  try {
    await loadPeerJs();
  } catch {
    notify(t("sync.fail"));
    return;
  }
  destroySyncPeer();
  syncLink.role = "guest";
  syncLink.code = code;
  syncLink.status = "joining";
  syncLink.authorized = false;
  setPairingStayAwake(true);
  updateSyncUi();
  const peer = new window.Peer({ debug: 0 });
  syncLink.peer = peer;
  peer.on("open", () => {
    const conn = peer.connect(syncPeerId(code), { reliable: true });
    bindSyncConnection(conn);
    conn.on("open", () => {
      sendSyncMessage({ type: "hello" });
      syncLink.status = "auth";
      if (el.syncAuthSheet) el.syncAuthSheet.hidden = false;
      updateSyncUi();
    });
  });
  peer.on("error", () => {
    notify(t("sync.fail"));
    stopSyncLink(false);
  });
}

function allowSyncComputer() {
  if (syncLink.role !== "guest" || !syncLink.conn) return;
  syncLink.authorized = true;
  syncLink.status = "linked";
  if (el.syncAuthSheet) el.syncAuthSheet.hidden = true;
  sendSyncMessage({ type: "auth-ok", payload: librarySnapshot() });
  setPairingStayAwake(true);
  updateSyncUi();
  notify(t("sync.connected"));
}

function denySyncComputer() {
  sendSyncMessage({ type: "auth-deny" });
  if (el.syncAuthSheet) el.syncAuthSheet.hidden = true;
  stopSyncLink(true);
}

function updateEditorPreview() {
  if (!el.editorPreviewBody) return;
  const song = selectedSong();
  const title = el.title?.value.trim() || song?.title || t("song.noTitle");
  const artist = el.artist?.value.trim() || song?.artist || "";
  const capo = Number(el.capo?.value || song?.capo || 0);
  const draft = {
    title,
    artist,
    capo,
    transposeValue: song?.transposeValue || 0,
    lines: foldStackedChords(String(el.lines?.value || song?.lines?.join("\n") || "").replace(/\r/g, "").split("\n")),
  };
  if (el.editorPreviewTitle) el.editorPreviewTitle.textContent = title;
  if (el.editorPreviewMeta) {
    el.editorPreviewMeta.textContent = [artist, capo ? t("capo.short", { capo }) : ""].filter(Boolean).join(" · ");
  }
  el.editorPreviewBody.innerHTML = songChartHtml(draft);
}

function updateSyncUi() {
  const code = formatSyncCode(syncLink.code);
  const hosting = syncLink.role === "host" && syncLink.status !== "idle";
  const joining = syncLink.role === "guest" && syncLink.status !== "idle";
  const linked = syncLink.status === "linked";
  if (el.syncCodeDisplay) {
    el.syncCodeDisplay.hidden = !hosting || !syncLink.code;
    el.syncCodeDisplay.textContent = code || "—";
  }
  if (el.syncHostSheetCode) el.syncHostSheetCode.textContent = code || "—";
  let statusText = "";
  if (syncLink.status === "hosting") statusText = t("sync.waiting");
  else if (syncLink.status === "joining") statusText = t("sync.joining");
  else if (syncLink.status === "auth" && syncLink.role === "host") statusText = t("sync.waitingAuth");
  else if (syncLink.status === "auth" && syncLink.role === "guest") statusText = t("sync.authTitle");
  else if (linked) statusText = t("sync.connected");
  if (el.syncStatus) el.syncStatus.textContent = statusText;
  if (el.syncHostSheetStatus) el.syncHostSheetStatus.textContent = statusText;
  if (el.syncStopBtn) el.syncStopBtn.hidden = syncLink.status === "idle";
  if (el.syncHostBtn) el.syncHostBtn.disabled = joining;
  if (el.syncJoinBtn) el.syncJoinBtn.disabled = hosting && !linked;
  if (el.syncJoinInput) el.syncJoinInput.disabled = hosting && !linked;
  const showBanner = linked || hosting || isDesktopComputer();
  if (el.syncBanner) {
    el.syncBanner.hidden = !showBanner;
    el.syncBanner.classList.toggle("linked", linked);
  }
  if (el.syncBannerText && el.syncBannerBtn) {
    if (linked) {
      el.syncBannerText.textContent = syncLink.role === "guest" ? t("sync.bannerPhone") : t("sync.bannerOn");
      el.syncBannerBtn.textContent = t("sync.stop");
    } else if (hosting) {
      el.syncBannerText.textContent = t("sync.bannerWait", { code });
      el.syncBannerBtn.textContent = t("sync.bannerOpen");
    } else {
      el.syncBannerText.textContent = t("sync.bannerIdle");
      el.syncBannerBtn.textContent = t("sync.bannerStart");
    }
  }
}

function normalizeSong(song) {
  return {
    id: safeId(song.id),
    title: String(song.title || "Sem título"),
    artist: String(song.artist || ""),
    category: String(song.category || "Geral"),
    isFavorite: Boolean(song.isFavorite),
    lines: Array.isArray(song.lines) ? song.lines.map(String) : String(song.lines || "").split("\n"),
    capo: Number(song.capo || 0),
    cue: String(song.cue || "").trim().slice(0, 80),
    transposeValue: Number(song.transposeValue || 0),
    lastOpenedAt: song.lastOpenedAt || "",
    updatedAt: song.updatedAt || new Date().toISOString(),
    revision: Number(song.revision || 1),
  };
}

function defaultAgendaFields() {
  return [
    { id: "type", labelKey: "agenda.field.type", enabled: false, kind: "text", section: "schedule" },
    { id: "host", labelKey: "agenda.field.host", enabled: true, kind: "people", peopleMode: "one", section: "schedule" },
    { id: "prelude", labelKey: "agenda.field.prelude", enabled: true, kind: "text", section: "order" },
    { id: "reading", labelKey: "agenda.field.reading", enabled: true, kind: "text", section: "order" },
    { id: "readingVerse", labelKey: "agenda.field.readingVerse", enabled: true, kind: "text", section: "order" },
    { id: "sundaySchool", labelKey: "agenda.field.sundaySchool", enabled: true, kind: "text", section: "order" },
    { id: "speaker", labelKey: "agenda.field.speaker", enabled: true, kind: "people", peopleMode: "one", section: "word" },
    { id: "theme", labelKey: "agenda.field.theme", enabled: true, kind: "text", section: "word" },
    { id: "scripture", labelKey: "agenda.field.scripture", enabled: true, kind: "text", section: "word" },
    { id: "prayer", labelKey: "agenda.field.prayer", enabled: true, kind: "text", section: "order" },
    { id: "postlude", labelKey: "agenda.field.postlude", enabled: true, kind: "text", section: "order" },
    { id: "musicLead", labelKey: "agenda.field.musicLead", enabled: true, kind: "people", peopleMode: "one", section: "music" },
    { id: "voices", labelKey: "agenda.field.voices", enabled: true, kind: "people", peopleMode: "many", section: "music" },
    { id: "instruments", labelKey: "agenda.field.instruments", enabled: true, kind: "people", peopleMode: "many", section: "music" },
    { id: "streamTitle", labelKey: "agenda.field.streamTitle", enabled: true, kind: "text", section: "stream" },
    { id: "streamDesc", labelKey: "agenda.field.streamDesc", enabled: true, kind: "text", section: "stream" },
    { id: "opening", labelKey: "agenda.field.opening", enabled: false, kind: "text", section: "schedule" },
    { id: "communion", labelKey: "agenda.field.communion", enabled: false, kind: "text", section: "word" },
    { id: "notes", labelKey: "agenda.field.notes", enabled: true, kind: "textarea", section: "schedule" },
  ];
}

function defaultAgendaSections() {
  return [
    { id: "schedule", titleKey: "agenda.section.schedule" },
    { id: "order", titleKey: "agenda.section.order" },
    { id: "word", titleKey: "agenda.section.word" },
    { id: "music", titleKey: "agenda.section.music" },
    { id: "songs", titleKey: "agenda.section.songs" },
    { id: "stream", titleKey: "agenda.section.stream" },
  ];
}

function normalizeTeam(raw) {
  const src = raw && typeof raw === "object" ? raw : {};
  const members = Array.isArray(src.members) ? src.members : [];
  return {
    members: uniqueById(members.map((member) => ({
      id: safeId(member.id),
      name: String(member.name || "").trim(),
      roles: Array.isArray(member.roles) ? member.roles.map((role) => String(role).trim()).filter(Boolean) : [],
      note: String(member.note || "").trim(),
      createdAt: member.createdAt || new Date().toISOString(),
    })).filter((member) => member.name)),
    rolePresets: Array.isArray(src.rolePresets) ? src.rolePresets.map((role) => String(role).trim()).filter(Boolean) : [],
  };
}

function normalizeAgendaField(field, fallback) {
  const src = field && typeof field === "object" ? field : {};
  const base = fallback || {};
  const kind = src.kind === "people" || src.kind === "textarea" ? src.kind : (base.kind || "text");
  return {
    id: safeId(src.id || base.id || `custom-${makeId()}`),
    labelKey: src.labelKey || base.labelKey || "",
    label: String(src.label || ""),
    enabled: src.enabled !== undefined ? Boolean(src.enabled) : (base.enabled !== false),
    kind,
    peopleMode: src.peopleMode === "one" || base.peopleMode === "one" ? "one" : "many",
    section: src.section || base.section || "schedule",
  };
}

function normalizeAgenda(raw) {
  const src = raw && typeof raw === "object" ? raw : {};
  const defaults = defaultAgendaFields();
  const savedFields = Array.isArray(src.fields) ? src.fields : [];
  const savedById = Object.fromEntries(savedFields.map((field) => [field.id, field]));
  const fields = defaults.map((def) => normalizeAgendaField(savedById[def.id] || def, def));
  savedFields.filter((field) => field.id && !defaults.some((def) => def.id === field.id)).forEach((field) => {
    fields.push(normalizeAgendaField(field));
  });
  const defaultSections = defaultAgendaSections();
  const savedSections = Array.isArray(src.sections) ? src.sections : [];
  const savedSecById = Object.fromEntries(savedSections.map((section) => [section.id, section]));
  const sections = defaultSections.map((def) => {
    const saved = savedSecById[def.id] || {};
    return { id: def.id, titleKey: def.titleKey, title: String(saved.title || "") };
  });
  return { fields, sections };
}

function mergeTeam(raw) {
  const incoming = normalizeTeam(raw);
  incoming.members.forEach((member) => {
    const index = state.team.members.findIndex((item) => item.id === member.id);
    if (index >= 0) state.team.members[index] = member;
    else state.team.members.push(member);
  });
  incoming.rolePresets.forEach((role) => {
    if (!state.team.rolePresets.includes(role)) state.team.rolePresets.push(role);
  });
}

function agendaFieldLabel(field) {
  if (field.label && field.label.trim()) return field.label.trim();
  return field.labelKey ? t(field.labelKey) : t("agenda.field.custom");
}

function agendaSectionTitle(section) {
  if (section.title && section.title.trim()) return section.title.trim();
  return section.titleKey ? t(section.titleKey) : "";
}

function normalizePeopleValue(value) {
  if (Array.isArray(value)) return { ids: value.map(cleanId).filter(Boolean), extra: "" };
  if (value && typeof value === "object") {
    return {
      ids: Array.isArray(value.ids) ? value.ids.map(cleanId).filter(Boolean) : [],
      extra: String(value.extra || "").trim(),
    };
  }
  if (typeof value === "string" && value.trim()) return { ids: [], extra: value.trim() };
  return { ids: [], extra: "" };
}

function teamMemberById(id) {
  return (state.team.members || []).find((member) => member.id === id) || null;
}

function peopleDisplay(value) {
  const data = normalizePeopleValue(value);
  const names = data.ids.map((id) => teamMemberById(id)?.name).filter(Boolean);
  if (data.extra) names.push(data.extra);
  return names.join(", ");
}

function serviceValue(service, fieldId) {
  return service?.values && service.values[fieldId] !== undefined ? service.values[fieldId] : "";
}

function isOrderMoment(fieldId) {
  return fieldId === "prelude" || fieldId === "reading" || fieldId === "sundaySchool" || fieldId === "prayer" || fieldId === "postlude";
}

function agendaFieldById(id) {
  return (state.agenda.fields || []).find((field) => field.id === id) || null;
}

function isMomentValue(raw) {
  return Boolean(raw && typeof raw === "object" && !Array.isArray(raw) && !("ids" in raw) && ("included" in raw || "text" in raw));
}

function momentState(setlist, fieldId) {
  const raw = serviceValue(setlist?.service, fieldId);
  if (isMomentValue(raw)) {
    return { included: Boolean(raw.included), text: String(raw.text || "").trim() };
  }
  const text = String(raw || "").trim();
  return { included: Boolean(text), text };
}

function filledPlainText(setlist, fieldId) {
  const field = agendaFieldById(fieldId);
  if (!field?.enabled) return "";
  if (isOrderMoment(fieldId)) return momentState(setlist, fieldId).text;
  const raw = serviceValue(setlist?.service, fieldId);
  if (field.kind === "people") return peopleDisplay(raw);
  if (isMomentValue(raw)) return raw.included ? String(raw.text || "").trim() : "";
  return String(raw || "").trim();
}

function partitionSetlistSongs(setlist) {
  const finaleSet = new Set((setlist?.finalSongIds || []).map(String));
  const praise = [];
  const finale = [];
  (setlist?.songIds || []).forEach((id) => {
    (finaleSet.has(String(id)) ? finale : praise).push(String(id));
  });
  return { praise, finale };
}

function writePartitionedSongs(setlist, praise, finale) {
  setlist.songIds = [...praise, ...finale];
  setlist.finalSongIds = finale.slice();
}

function songsByIds(ids) {
  return (ids || []).map((id) => state.songs.find((song) => song.id === id)).filter(Boolean);
}

function eventHeading(setlist) {
  return t("agenda.orderTitle");
}

function eventOrderModel(setlist) {
  const header = [];
  const blocks = [];
  if (!setlist) return { header, blocks };
  const service = normalizeService(setlist.service);
  const dateLabel = formatSetlistDayDate(service.date);
  const timeLabel = service.time || "";
  if (dateLabel || timeLabel) {
    header.push({ label: t("agenda.serviceDate"), text: [dateLabel, timeLabel].filter(Boolean).join(" · ") });
  }
  enabledAgendaFields()
    .filter((field) => field.kind === "people" && field.id !== "speaker")
    .forEach((field) => {
      const text = peopleDisplay(serviceValue(service, field.id));
      if (text) header.push({ label: agendaFieldLabel(field), text });
    });

  const { praise, finale } = partitionSetlistSongs(setlist);
  const praiseSongs = songsByIds(praise);
  const finaleSongs = songsByIds(finale);
  const pushMoment = (id) => {
    if (!agendaFieldById(id)?.enabled) return;
    const moment = momentState(setlist, id);
    if (!moment.included) return;
    blocks.push({ type: "moment", title: agendaFieldLabel(agendaFieldById(id)), body: moment.text });
  };

  pushMoment("prelude");
  const reading = agendaFieldById("reading")?.enabled ? momentState(setlist, "reading") : { included: false, text: "" };
  const verse = filledPlainText(setlist, "readingVerse");
  if (reading.included || verse) {
    const titleBase = agendaFieldLabel(agendaFieldById("reading") || { labelKey: "agenda.field.reading" });
    blocks.push({
      type: "reading",
      title: reading.text ? `${titleBase} – ${reading.text}` : titleBase,
      verse,
    });
  }

  const praiseBlock = praiseSongs.length
    ? { type: "songs", title: "", songs: praiseSongs, slot: "praise" }
    : null;
  if (praiseBlock) blocks.push(praiseBlock);

  pushMoment("sundaySchool");

  const speaker = filledPlainText(setlist, "speaker");
  const theme = filledPlainText(setlist, "theme");
  const scripture = filledPlainText(setlist, "scripture");
  if (speaker || theme || scripture) {
    const wordSection = (state.agenda.sections || []).find((section) => section.id === "word");
    blocks.push({
      type: "preach",
      title: wordSection ? agendaSectionTitle(wordSection) : t("agenda.section.word"),
      speaker,
      speakerLabel: agendaFieldLabel(agendaFieldById("speaker") || { labelKey: "agenda.field.speaker" }),
      theme,
      themeLabel: agendaFieldLabel(agendaFieldById("theme") || { labelKey: "agenda.field.theme" }),
      scripture,
    });
  }

  const communion = filledPlainText(setlist, "communion");
  if (communion) {
    blocks.push({ type: "moment", title: agendaFieldLabel(agendaFieldById("communion") || { labelKey: "agenda.field.communion" }), body: communion });
  }

  if (finaleSongs.length) {
    blocks.push({ type: "songs", title: t("agenda.order.finalHymn"), songs: finaleSongs, slot: "final" });
  }

  pushMoment("prayer");
  pushMoment("postlude");

  const streamTitle = filledPlainText(setlist, "streamTitle");
  const streamDesc = filledPlainText(setlist, "streamDesc");
  if (streamTitle || streamDesc) {
    const streamSection = (state.agenda.sections || []).find((section) => section.id === "stream");
    blocks.push({
      type: "stream",
      title: streamSection ? agendaSectionTitle(streamSection) : t("agenda.section.stream"),
      streamTitle,
      streamTitleLabel: agendaFieldLabel(agendaFieldById("streamTitle") || { labelKey: "agenda.field.streamTitle" }),
      streamDesc,
      streamDescLabel: agendaFieldLabel(agendaFieldById("streamDesc") || { labelKey: "agenda.field.streamDesc" }),
    });
  }

  const used = new Set([
    "prelude", "reading", "readingVerse", "sundaySchool", "speaker", "theme", "scripture",
    "prayer", "postlude", "streamTitle", "streamDesc", "host", "notes", "opening",
    "communion", "type", "musicLead", "voices", "instruments",
  ]);
  enabledAgendaFields()
    .filter((field) => !used.has(field.id) && field.kind !== "people")
    .forEach((field) => {
      if (isOrderMoment(field.id)) {
        pushMoment(field.id);
        return;
      }
      const text = filledPlainText(setlist, field.id);
      if (text) blocks.push({ type: "moment", title: agendaFieldLabel(field), body: text });
    });

  const hasProgramExtras = blocks.some((block) => block.type !== "songs" || block.slot === "final");
  if (hasProgramExtras && praiseBlock) praiseBlock.title = t("agenda.order.praise");
  return { header, blocks };
}

function eventRosterItems(setlist) {
  return eventOrderModel(setlist).header.filter((item) => item.label !== t("agenda.serviceDate"));
}

function eventLeadLine(setlist) {
  return eventRosterItems(setlist).map((item) => `${item.label}: ${item.text}`).slice(0, 3).join(" · ");
}

function renderEventRoster(setlist) {
  if (!el.setlistDayRoster) return;
  const items = eventOrderModel(setlist).header;
  el.setlistDayRoster.hidden = !items.length;
  el.setlistDayRoster.innerHTML = items.map((item) => `
    <li>
      <span>${escapeHtml(item.label)}</span>
      <strong>${escapeHtml(item.text)}</strong>
    </li>
  `).join("");
}

function renderEventOrderHtml(setlist) {
  const { blocks } = eventOrderModel(setlist);
  if (!blocks.length) return `<p class="empty compact">${t("setlists.noSongs")}</p>`;
  return blocks.map((block) => {
    if (block.type === "songs") {
      return `
        <section class="order-block">
          ${block.title ? `<h3>${escapeHtml(block.title)}</h3>` : ""}
          ${block.songs.map((song, index) => orderedSetlistSongRow(song, index, block.slot)).join("")}
        </section>
      `;
    }
    if (block.type === "reading") {
      return `
        <section class="order-block">
          <h3>${escapeHtml(block.title)}</h3>
          ${block.verse ? `<p class="order-verse">${escapeHtml(block.verse)}</p>` : ""}
        </section>
      `;
    }
    if (block.type === "preach") {
      return `
        <section class="order-block">
          <h3>${escapeHtml(block.title)}</h3>
          ${block.speaker ? `<p class="order-line"><span>${escapeHtml(block.speakerLabel)}:</span> <strong>${escapeHtml(block.speaker)}</strong></p>` : ""}
          ${block.theme || block.scripture ? `<p class="order-line"><span>${escapeHtml(block.themeLabel)}:</span> ${[block.theme ? `“${escapeHtml(block.theme)}”` : "", escapeHtml(block.scripture || "")].filter(Boolean).join(" ")}</p>` : ""}
        </section>
      `;
    }
    if (block.type === "stream") {
      return `
        <section class="order-block">
          <h3>${escapeHtml(block.title)}</h3>
          ${block.streamTitle ? `<p class="order-line"><span>${escapeHtml(block.streamTitleLabel)}:</span> ${escapeHtml(block.streamTitle)}</p>` : ""}
          ${block.streamDesc ? `<p class="order-line"><span>${escapeHtml(block.streamDescLabel)}:</span> ${escapeHtml(block.streamDesc)}</p>` : ""}
        </section>
      `;
    }
    return `
      <section class="order-block">
        <h3>${escapeHtml(block.title)}</h3>
        ${block.body ? `<p class="order-line">${escapeHtml(block.body)}</p>` : ""}
      </section>
    `;
  }).join("");
}

function enabledAgendaFields() {
  return (state.agenda.fields || []).filter((field) => field.enabled);
}

function suggestedTeamRoles() {
  const fromI18n = [
    t("team.role.voice"), t("team.role.guitar"), t("team.role.keys"),
    t("team.role.drums"), t("team.role.bass"), t("team.role.tech"),
  ];
  const used = state.team.members.flatMap((member) => member.roles);
  return [...new Set([...fromI18n, ...state.team.rolePresets, ...used, ...memberDraftRoles])].filter(Boolean);
}

function setAgendaHub(hub) {
  agendaHub = hub === "team" || hub === "month" ? hub : "events";
  if (el.setlistFab) {
    el.setlistFab.title = agendaHub === "team" ? t("team.add") : t("setlists.new");
  }
  renderSetlists();
}

function renderAgendaHub() {
  if (!state.team) state.team = normalizeTeam();
  if (!state.agenda) state.agenda = normalizeAgenda();
  el.agendaHub.forEach((button) => button.classList.toggle("active", button.dataset.agendaHub === agendaHub));
  if (el.agendaEventsPane) el.agendaEventsPane.hidden = agendaHub !== "events";
  if (el.agendaTeamPane) el.agendaTeamPane.hidden = agendaHub !== "team";
  if (el.agendaMonthPane) el.agendaMonthPane.hidden = agendaHub !== "month";
  const addLabel = agendaHub === "team" ? t("team.add") : t("setlists.new");
  if (el.newSetlist) el.newSetlist.textContent = addLabel;
  if (el.setlistFab) el.setlistFab.title = addLabel;
  if (agendaHub === "team") renderTeamList();
  if (agendaHub === "month") renderAgendaMonth();
}

function renderTeamList() {
  if (!el.teamList) return;
  const members = state.team.members.slice().sort((a, b) => a.name.localeCompare(b.name));
  if (!members.length) {
    el.teamList.innerHTML = `
      <div class="team-empty">
        <div class="team-empty-art" aria-hidden="true"><span></span><span></span><span></span></div>
        <h2>${t("team.emptyTitle")}</h2>
        <p>${t("team.emptyLead")}</p>
        <button type="button" class="primary-action" data-team-add>${t("team.add")}</button>
      </div>
    `;
    el.teamList.querySelector("[data-team-add]")?.addEventListener("click", () => openMemberEditor());
    return;
  }
  el.teamList.innerHTML = members.map((member) => `
    <button type="button" class="team-card" data-member-id="${escapeHtml(member.id)}">
      <span class="team-avatar">${escapeHtml((member.name[0] || "?").toUpperCase())}</span>
      <span>
        <strong>${escapeHtml(member.name)}</strong>
        <small>${escapeHtml(member.roles.join(" · ") || t("team.roles"))}</small>
      </span>
    </button>
  `).join("");
  el.teamList.querySelectorAll("[data-member-id]").forEach((button) => {
    button.addEventListener("click", () => openMemberEditor(button.dataset.memberId));
  });
}

function openMemberEditor(memberId) {
  editingMemberId = memberId || null;
  const member = memberId ? teamMemberById(memberId) : null;
  memberDraftRoles = member ? member.roles.slice() : [];
  if (el.memberNameInput) el.memberNameInput.value = member?.name || "";
  if (el.memberNoteInput) el.memberNoteInput.value = member?.note || "";
  if (el.memberSheetTitle) el.memberSheetTitle.textContent = member ? t("team.edit") : t("team.add");
  if (el.memberDelete) el.memberDelete.hidden = !member;
  setMemberSheetOpen(true);
}

function setMemberSheetOpen(open) {
  isMemberSheetOpen = Boolean(open);
  if (el.memberSheet) el.memberSheet.hidden = !isMemberSheetOpen;
  if (isMemberSheetOpen) {
    renderMemberRoleChips();
    requestAnimationFrame(() => el.memberNameInput?.focus());
  }
}

function renderMemberRoleChips() {
  if (!el.memberRoleChips) return;
  el.memberRoleChips.innerHTML = suggestedTeamRoles().map((role) => `
    <button type="button" class="role-chip ${memberDraftRoles.includes(role) ? "on" : ""}" data-role="${escapeHtml(role)}">${escapeHtml(role)}</button>
  `).join("");
  el.memberRoleChips.querySelectorAll("[data-role]").forEach((button) => {
    button.addEventListener("click", () => {
      const role = button.dataset.role;
      if (memberDraftRoles.includes(role)) memberDraftRoles = memberDraftRoles.filter((item) => item !== role);
      else memberDraftRoles.push(role);
      renderMemberRoleChips();
    });
  });
}

function addDraftMemberRole() {
  const role = el.memberRoleInput?.value.trim();
  if (!role) return;
  if (!memberDraftRoles.includes(role)) memberDraftRoles.push(role);
  if (!state.team.rolePresets.includes(role)) state.team.rolePresets.push(role);
  el.memberRoleInput.value = "";
  renderMemberRoleChips();
}

function saveTeamMember() {
  const name = el.memberNameInput?.value.trim();
  if (!name) {
    notify(t("team.needed"));
    el.memberNameInput?.focus();
    return;
  }
  const payload = {
    id: editingMemberId || makeId(),
    name,
    roles: memberDraftRoles.slice(),
    note: el.memberNoteInput?.value.trim() || "",
    createdAt: teamMemberById(editingMemberId)?.createdAt || new Date().toISOString(),
  };
  const index = state.team.members.findIndex((member) => member.id === payload.id);
  if (index >= 0) state.team.members[index] = payload;
  else state.team.members.push(payload);
  persist();
  setMemberSheetOpen(false);
  notify(t("team.saved"));
  renderSetlists();
}

function deleteTeamMember() {
  const member = teamMemberById(editingMemberId);
  if (!member || !confirm(t("team.deleteConfirm", { name: member.name }))) return;
  state.team.members = state.team.members.filter((item) => item.id !== member.id);
  persist();
  setMemberSheetOpen(false);
  renderSetlists();
}

function renderAgendaMonth() {
  if (!el.agendaMonth) return;
  const year = agendaMonthCursor.getFullYear();
  const month = agendaMonthCursor.getMonth();
  const locale = { pt: "pt-BR", es: "es-ES", en: "en-US" }[state.language] || "pt-BR";
  const label = new Date(year, month, 1).toLocaleDateString(locale, { month: "long", year: "numeric" });
  const firstWeekday = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const prevDays = new Date(year, month, 0).getDate();
  const todayIso = toLocalIsoDate(new Date());
  if (!selectedAgendaDay) selectedAgendaDay = todayIso;
  const cells = [];
  for (let i = 0; i < firstWeekday; i += 1) {
    const day = prevDays - firstWeekday + i + 1;
    cells.push({ iso: toLocalIsoDate(new Date(year, month - 1, day)), muted: true, num: day });
  }
  for (let day = 1; day <= daysInMonth; day += 1) {
    cells.push({ iso: toLocalIsoDate(new Date(year, month, day)), muted: false, num: day });
  }
  while (cells.length % 7) {
    const extra = cells.length - (firstWeekday + daysInMonth) + 1;
    cells.push({ iso: toLocalIsoDate(new Date(year, month + 1, extra)), muted: true, num: extra });
  }
  const weekdays = [0, 1, 2, 3, 4, 5, 6].map((day) => `<span>${t(`agenda.week${day}`)}</span>`).join("");
  el.agendaMonth.innerHTML = `
    <div class="month-nav">
      <button type="button" data-month-step="-1" aria-label="${t("agenda.monthPrev")}">‹</button>
      <strong>${escapeHtml(label)}</strong>
      <button type="button" data-month-step="1" aria-label="${t("agenda.monthNext")}">›</button>
    </div>
    <div class="month-weekdays">${weekdays}</div>
    <div class="month-grid">
      ${cells.map((cell) => {
        const count = state.setlists.filter((setlist) => setlist.service?.date === cell.iso).length;
        const dots = Array.from({ length: Math.min(count, 3) }, () => "<i></i>").join("");
        return `
          <button type="button" class="month-day ${cell.muted ? "muted" : ""} ${cell.iso === todayIso ? "today" : ""} ${cell.iso === selectedAgendaDay ? "selected" : ""}" data-day="${cell.iso}">
            <span class="day-num">${cell.num}</span>
            <span class="month-dots">${dots}</span>
          </button>
        `;
      }).join("")}
    </div>
    <div class="month-day-events" id="monthDayEvents"></div>
  `;
  el.agendaMonth.querySelectorAll("[data-month-step]").forEach((button) => {
    button.addEventListener("click", () => {
      agendaMonthCursor = new Date(year, month + Number(button.dataset.monthStep), 1);
      renderAgendaMonth();
    });
  });
  el.agendaMonth.querySelectorAll("[data-day]").forEach((button) => {
    button.addEventListener("click", () => {
      selectedAgendaDay = button.dataset.day;
      renderAgendaMonth();
    });
  });
  const dayEvents = state.setlists.filter((setlist) => setlist.service?.date === selectedAgendaDay);
  const box = el.agendaMonth.querySelector("#monthDayEvents");
  if (!box) return;
  if (!dayEvents.length) {
    box.innerHTML = `
      <p class="empty compact">${t("agenda.dayEmpty")}</p>
      <button type="button" class="primary-action" data-create-day>${t("agenda.dayCreate")}</button>
    `;
    box.querySelector("[data-create-day]")?.addEventListener("click", createSetlist);
    return;
  }
  box.innerHTML = dayEvents.map((setlist) => `
    <div class="setlist-row">
      <button type="button" class="setlist-row-main" data-open-day-event="${escapeHtml(setlist.id)}">
        <strong>${escapeHtml(setlist.title || t("service.defaultTitle"))}</strong>
        <small>${escapeHtml([setlist.service?.time, eventLeadLine(setlist)].filter(Boolean).join(" · "))}</small>
      </button>
    </div>
  `).join("") + `<button type="button" class="primary-action" data-create-day>${t("agenda.dayCreate")}</button>`;
  box.querySelectorAll("[data-open-day-event]").forEach((button) => {
    button.addEventListener("click", () => openSetlistEditor(button.dataset.openDayEvent));
  });
  box.querySelector("[data-create-day]")?.addEventListener("click", createSetlist);
}

function setAgendaSettingsOpen(open) {
  isAgendaSettingsOpen = Boolean(open);
  if (el.agendaSettingsSheet) el.agendaSettingsSheet.hidden = !isAgendaSettingsOpen;
  if (isAgendaSettingsOpen) renderAgendaSettings();
}

function renderAgendaSettings() {
  if (el.agendaSectionEditor) {
    el.agendaSectionEditor.innerHTML = state.agenda.sections.map((section) => `
      <label>
        <span>${escapeHtml(t(section.titleKey))}</span>
        <input data-section-id="${escapeHtml(section.id)}" value="${escapeHtml(section.title)}" placeholder="${escapeHtml(t(section.titleKey))}" />
      </label>
    `).join("");
    el.agendaSectionEditor.querySelectorAll("[data-section-id]").forEach((input) => {
      input.addEventListener("input", () => {
        const section = state.agenda.sections.find((item) => item.id === input.dataset.sectionId);
        if (section) section.title = input.value;
        persist();
      });
    });
  }
  if (el.agendaFieldEditor) {
    el.agendaFieldEditor.innerHTML = state.agenda.fields.map((field) => {
      const custom = !field.labelKey;
      return `
        <div class="agenda-field-row">
          <button type="button" class="agenda-toggle ${field.enabled ? "on" : ""}" data-toggle-field="${escapeHtml(field.id)}" aria-pressed="${field.enabled}"></button>
          <div>
            <input data-label-field="${escapeHtml(field.id)}" value="${escapeHtml(field.label)}" placeholder="${escapeHtml(agendaFieldLabel(field))}" />
            ${custom ? `
              <select data-kind-field="${escapeHtml(field.id)}">
                <option value="text" ${field.kind === "text" ? "selected" : ""}>${t("agenda.kind.text")}</option>
                <option value="people" ${field.kind === "people" ? "selected" : ""}>${t("agenda.kind.people")}</option>
                <option value="textarea" ${field.kind === "textarea" ? "selected" : ""}>${t("agenda.kind.textarea")}</option>
              </select>
            ` : ""}
          </div>
          ${custom ? `<button type="button" class="agenda-field-delete" data-delete-field="${escapeHtml(field.id)}" aria-label="${t("setlists.delete")}">×</button>` : "<span></span>"}
        </div>
      `;
    }).join("");
    el.agendaFieldEditor.querySelectorAll("[data-toggle-field]").forEach((button) => {
      button.addEventListener("click", () => {
        const field = state.agenda.fields.find((item) => item.id === button.dataset.toggleField);
        if (!field) return;
        field.enabled = !field.enabled;
        persist();
        renderAgendaSettings();
        writeServiceToForm(selectedSetlist()?.service);
      });
    });
    el.agendaFieldEditor.querySelectorAll("[data-label-field]").forEach((input) => {
      input.addEventListener("input", () => {
        const field = state.agenda.fields.find((item) => item.id === input.dataset.labelField);
        if (field) field.label = input.value;
        persist();
      });
    });
    el.agendaFieldEditor.querySelectorAll("[data-kind-field]").forEach((select) => {
      select.addEventListener("change", () => {
        const field = state.agenda.fields.find((item) => item.id === select.dataset.kindField);
        if (!field) return;
        field.kind = select.value === "people" || select.value === "textarea" ? select.value : "text";
        if (field.kind === "people") field.peopleMode = "many";
        persist();
        writeServiceToForm(selectedSetlist()?.service);
      });
    });
    el.agendaFieldEditor.querySelectorAll("[data-delete-field]").forEach((button) => {
      button.addEventListener("click", () => {
        state.agenda.fields = state.agenda.fields.filter((item) => item.id !== button.dataset.deleteField);
        persist();
        renderAgendaSettings();
        writeServiceToForm(selectedSetlist()?.service);
      });
    });
  }
}

function addCustomAgendaField() {
  state.agenda.fields.push(normalizeAgendaField({
    id: `custom-${makeId()}`,
    label: t("agenda.field.custom"),
    enabled: true,
    kind: "text",
    section: "schedule",
  }));
  persist();
  renderAgendaSettings();
}

function openPeoplePicker(fieldId) {
  const setlist = selectedSetlist();
  const field = state.agenda.fields.find((item) => item.id === fieldId);
  if (!setlist || !field) return;
  if (!state.team.members.length) {
    setAgendaHub("team");
    notify(t("agenda.noTeam"));
    return;
  }
  peoplePickerFieldId = fieldId;
  peoplePickerDraft = normalizePeopleValue(serviceValue(setlist.service, fieldId));
  peoplePickerQuery = "";
  if (el.peoplePickerSearch) el.peoplePickerSearch.value = "";
  if (el.peoplePickerTitle) el.peoplePickerTitle.textContent = agendaFieldLabel(field);
  if (el.peoplePickerLead) el.peoplePickerLead.textContent = field.peopleMode === "one" ? t("agenda.peopleOne") : t("agenda.peopleMany");
  setPeoplePickerOpen(true);
}

function setPeoplePickerOpen(open) {
  isPeoplePickerOpen = Boolean(open);
  if (el.peoplePickerSheet) el.peoplePickerSheet.hidden = !isPeoplePickerOpen;
  if (isPeoplePickerOpen) renderPeoplePicker();
}

function renderPeoplePicker() {
  if (!el.peoplePickerList) return;
  const field = state.agenda.fields.find((item) => item.id === peoplePickerFieldId);
  const query = normalize(peoplePickerQuery);
  const members = state.team.members
    .slice()
    .sort((a, b) => a.name.localeCompare(b.name))
    .filter((member) => !query || normalize(`${member.name} ${member.roles.join(" ")}`).includes(query));
  if (el.peoplePickerSearch) el.peoplePickerSearch.value = peoplePickerQuery;
  el.peoplePickerList.innerHTML = members.length
    ? members.map((member) => {
        const on = peoplePickerDraft.ids.includes(member.id);
        return `
          <label class="check-row people-check ${on ? "on" : ""}">
            <input type="checkbox" data-pick-id="${escapeHtml(member.id)}" ${on ? "checked" : ""}>
            <span class="check-mark" aria-hidden="true"></span>
            <span class="check-copy">
              <strong>${escapeHtml(member.name)}</strong>
              <small>${escapeHtml(member.roles.join(" · "))}</small>
            </span>
          </label>
        `;
      }).join("")
    : `<p class="empty compact">${state.team.members.length ? t("stage.noMatch") : t("agenda.noTeam")}</p>`;
  el.peoplePickerList.querySelectorAll("[data-pick-id]").forEach((input) => {
    input.addEventListener("change", () => {
      const id = input.dataset.pickId;
      if (field?.peopleMode === "one") {
        peoplePickerDraft.ids = input.checked ? [id] : [];
      } else if (input.checked) {
        if (!peoplePickerDraft.ids.includes(id)) peoplePickerDraft.ids.push(id);
      } else {
        peoplePickerDraft.ids = peoplePickerDraft.ids.filter((item) => item !== id);
      }
      renderPeoplePicker();
    });
  });
}

function applyPeoplePicker() {
  const setlist = selectedSetlist();
  if (setlist && peoplePickerFieldId) {
    setlist.service = normalizeService(setlist.service);
    setlist.service.values[peoplePickerFieldId] = { ...peoplePickerDraft };
    persist();
  }
  setPeoplePickerOpen(false);
  writeServiceToForm(selectedSetlist()?.service);
}

function bindEventFieldInputs() {
  if (!el.eventFields) return;
  el.eventFields.querySelectorAll("[data-field-id]").forEach((input) => {
    input.addEventListener("input", () => {
      const setlist = selectedSetlist();
      if (!setlist) return;
      setlist.service = normalizeService({ ...readServiceFromForm(), date: el.serviceDate.value, time: el.serviceTime?.value || "" });
      if (input.dataset.fieldId === "notes") setlist.notes = String(input.value || "").trim();
    });
  });
  el.eventFields.querySelectorAll("[data-moment-id]").forEach((box) => {
    box.addEventListener("change", () => {
      const setlist = selectedSetlist();
      if (!setlist) return;
      setlist.service = normalizeService({ ...readServiceFromForm(), date: el.serviceDate.value, time: el.serviceTime?.value || "" });
      persist();
      box.closest(".check-row")?.classList.toggle("on", box.checked);
    });
  });
  el.eventFields.querySelectorAll("[data-pick-field]").forEach((button) => {
    button.addEventListener("click", () => openPeoplePicker(button.dataset.pickField));
  });
  el.eventFields.querySelectorAll("[data-remove-person]").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      const setlist = selectedSetlist();
      const fieldId = button.dataset.removePerson;
      if (!setlist || !fieldId) return;
      const current = normalizePeopleValue(serviceValue(setlist.service, fieldId));
      current.ids = current.ids.filter((id) => id !== button.dataset.memberId);
      setlist.service.values[fieldId] = current;
      persist();
      writeServiceToForm(setlist.service);
    });
  });
  el.eventFields.querySelectorAll("[data-go-team]").forEach((button) => {
    button.addEventListener("click", () => {
      saveSetlist(true);
      closeSetlistEditor();
      setAgendaHub("team");
    });
  });
  el.eventFields.querySelectorAll("[data-open-add-songs]").forEach((button) => {
    button.addEventListener("click", () => {
      isSetlistAddOpen = true;
      isSetlistDayMenuOpen = false;
      renderSetlists();
    });
  });
}

function renderEventFieldControl(field, value) {
  if (field.kind === "people") {
    const people = normalizePeopleValue(value);
    const chips = people.ids.map((id) => {
      const member = teamMemberById(id);
      if (!member) return "";
      return `<span class="person-chip">${escapeHtml(member.name)} <button type="button" data-remove-person="${escapeHtml(field.id)}" data-member-id="${escapeHtml(id)}">×</button></span>`;
    }).join("");
    const extra = people.extra ? `<span class="person-chip">${escapeHtml(people.extra)}</span>` : "";
    const emptyHint = !state.team.members.length
      ? `<button type="button" class="people-add-btn" data-go-team="1">${t("agenda.goTeam")}</button>`
      : `<button type="button" class="people-add-btn" data-pick-field="${escapeHtml(field.id)}">+ ${t("agenda.addPerson")}</button>`;
    return `<div class="people-field">${chips}${extra}${emptyHint}</div>`;
  }
  if (isOrderMoment(field.id)) {
    const moment = isMomentValue(value)
      ? { included: Boolean(value.included), text: String(value.text || "") }
      : { included: Boolean(String(value || "").trim()), text: String(value || "") };
    return `
      <div class="moment-field">
        <label class="check-row ${moment.included ? "on" : ""}">
          <input type="checkbox" data-moment-id="${escapeHtml(field.id)}" ${moment.included ? "checked" : ""}>
          <span class="check-mark" aria-hidden="true"></span>
          <span class="check-copy"><strong>${escapeHtml(t("agenda.includeMoment"))}</strong></span>
        </label>
        <input data-field-id="${escapeHtml(field.id)}" data-kind="text" value="${escapeHtml(moment.text)}" placeholder="${escapeHtml(t("agenda.momentNote"))}">
      </div>
    `;
  }
  if (field.kind === "textarea") {
    return `<textarea data-field-id="${escapeHtml(field.id)}" data-kind="textarea">${escapeHtml(String(value || ""))}</textarea>`;
  }
  return `<input data-field-id="${escapeHtml(field.id)}" data-kind="text" value="${escapeHtml(String(value || ""))}" />`;
}

function normalizeSetlist(setlist) {
  const songIds = Array.isArray(setlist.songIds) ? setlist.songIds.map(cleanId).filter(Boolean) : [];
  const finale = Array.isArray(setlist.finalSongIds)
    ? setlist.finalSongIds.map(cleanId).filter((id) => id && songIds.includes(id))
    : [];
  return {
    id: safeId(setlist.id),
    title: String(setlist.title || "Evento"),
    songIds,
    finalSongIds: finale,
    notes: String(setlist.notes || ""),
    service: normalizeService(setlist.service),
    createdAt: setlist.createdAt || new Date().toISOString(),
    updatedAt: setlist.updatedAt || setlist.createdAt || new Date().toISOString(),
    lastOpenedAt: setlist.lastOpenedAt || "",
  };
}

function normalizeService(service) {
  const src = service && typeof service === "object" ? service : {};
  const values = src.values && typeof src.values === "object" ? { ...src.values } : {};
  Object.keys(values).forEach((key) => {
    const value = values[key];
    if (value && typeof value === "object" && Array.isArray(value.ids)) {
      values[key] = {
        ids: value.ids.map(cleanId).filter(Boolean),
        extra: String(value.extra || "").trim(),
      };
    }
  });
  if (!values.opening && src.opening) values.opening = src.opening;
  if (!values.notes && src.notes) values.notes = src.notes;
  if (!values.scripture && src.announcements) values.scripture = src.announcements;
  if (!values.communion && src.communion) values.communion = src.communion;
  if (!values.speaker && src.preacher) values.speaker = src.preacher;
  if (!values.musicLead && src.leader) values.musicLead = src.leader;
  if (!values.voices && src.worshipTeam) values.voices = src.worshipTeam;
  return {
    date: String(src.date || ""),
    time: String(src.time || ""),
    opening: String(src.opening || values.opening || ""),
    leader: String(src.leader || peopleDisplay(values.musicLead) || ""),
    announcements: String(src.announcements || values.scripture || ""),
    worshipTeam: String(src.worshipTeam || peopleDisplay(values.voices) || ""),
    preacher: String(src.preacher || peopleDisplay(values.speaker) || ""),
    preacherRole: src.preacherRole === "convidado" ? "convidado" : "pastor",
    communion: String(src.communion || values.communion || ""),
    values,
  };
}

function readServiceFromForm() {
  const values = {};
  el.eventFields?.querySelectorAll("[data-field-id]").forEach((input) => {
    values[input.dataset.fieldId] = input.value;
  });
  el.eventFields?.querySelectorAll("[data-moment-id]").forEach((box) => {
    const id = box.dataset.momentId;
    values[id] = { included: box.checked, text: String(values[id] || "").trim() };
  });
  const setlist = selectedSetlist();
  const current = normalizeService(setlist?.service);
  enabledAgendaFields().filter((field) => field.kind === "people").forEach((field) => {
    values[field.id] = current.values[field.id] || { ids: [], extra: "" };
  });
  const notes = String(values.notes || el.setlistNotes?.value || "").trim();
  if (el.setlistNotes) el.setlistNotes.value = notes;
  const opening = isMomentValue(values.opening) ? values.opening.text : values.opening;
  const communion = isMomentValue(values.communion) ? values.communion.text : values.communion;
  return normalizeService({
    date: el.serviceDate?.value || "",
    time: el.serviceTime?.value || "",
    values,
    opening: opening || "",
    leader: peopleDisplay(values.musicLead),
    announcements: values.scripture || "",
    worshipTeam: peopleDisplay(values.voices),
    preacher: peopleDisplay(values.speaker),
    communion: communion || "",
    notes,
  });
}

function writeServiceToForm(service) {
  const data = normalizeService(service);
  if (el.serviceDate) el.serviceDate.value = data.date;
  if (el.serviceTime) el.serviceTime.value = data.time;
  if (el.setlistNotes) el.setlistNotes.value = String(serviceValue(data, "notes") || selectedSetlist()?.notes || "");
  if (!el.eventFields) return;
  const sections = state.agenda.sections || defaultAgendaSections();
  el.eventFields.innerHTML = sections.map((section) => {
    const fields = enabledAgendaFields().filter((field) => field.section === section.id);
    if (section.id === "songs") {
      return `
        <section class="event-section">
          <h3>${escapeHtml(agendaSectionTitle(section))}</h3>
          <input id="eventSongSearch" type="search" placeholder="${escapeHtml(t("agenda.searchSongs"))}" value="${escapeHtml(setlistAddQuery)}" />
          <div id="eventSongList" class="check-list event-song-list">${songCheckListHtml(selectedSetlist())}</div>
        </section>
      `;
    }
    if (!fields.length) return "";
    const hint = section.id === "order" || section.id === "stream"
      ? `<p class="event-section-hint">${escapeHtml(t("agenda.orderHint"))}</p>`
      : "";
    return `
      <section class="event-section">
        <h3>${escapeHtml(agendaSectionTitle(section))}</h3>
        ${hint}
        ${fields.map((field) => `
          <label class="event-field">
            <span>${escapeHtml(agendaFieldLabel(field))}</span>
            ${renderEventFieldControl(field, serviceValue(data, field.id) || (field.id === "notes" ? el.setlistNotes.value : ""))}
          </label>
        `).join("")}
      </section>
    `;
  }).join("");
  const unsectioned = enabledAgendaFields().filter((field) => !sections.some((section) => section.id === field.section));
  if (unsectioned.length) {
    el.eventFields.insertAdjacentHTML("beforeend", unsectioned.map((field) => `
      <label class="event-field">
        <span>${escapeHtml(agendaFieldLabel(field))}</span>
        ${renderEventFieldControl(field, serviceValue(data, field.id))}
      </label>
    `).join(""));
  }
  bindEventFieldInputs();
  bindSongCheckLists(document.querySelector("#eventSongList"));
  document.querySelector("#eventSongSearch")?.addEventListener("input", (event) => {
    setlistAddQuery = event.target.value;
    if (el.setlistAddSearch) el.setlistAddSearch.value = setlistAddQuery;
    renderSongCheckLists();
  });
}

function nextSundayIso() {
  const date = new Date();
  const add = date.getDay() === 0 ? 0 : 7 - date.getDay();
  date.setDate(date.getDate() + add);
  return toLocalIsoDate(date);
}

function toLocalIsoDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function formatSetlistListDate(iso) {
  if (!iso) return "";
  const parts = String(iso).split("-").map(Number);
  if (parts.length < 3 || parts.some((value) => Number.isNaN(value))) return "";
  const date = new Date(parts[0], parts[1] - 1, parts[2]);
  if (Number.isNaN(date.getTime())) return "";
  const locale = { pt: "pt-BR", es: "es-ES", en: "en-US" }[state.language] || "pt-BR";
  return date.toLocaleDateString(locale, { day: "numeric", month: "short" });
}

function formatSetlistDayDate(iso) {
  if (!iso) return "";
  const parts = String(iso).split("-").map(Number);
  if (parts.length < 3 || parts.some((value) => Number.isNaN(value))) return "";
  return `${parts[2]}/${parts[1]}/${parts[0]}`;
}

function formatServiceDate(iso) {
  if (!iso) return "";
  const parts = String(iso).split("-").map(Number);
  if (parts.length < 3 || parts.some((value) => Number.isNaN(value))) return String(iso);
  const date = new Date(parts[0], parts[1] - 1, parts[2]);
  if (Number.isNaN(date.getTime())) return String(iso);
  const locale = { pt: "pt-BR", es: "es-ES", en: "en-US" }[state.language] || "pt-BR";
  return date.toLocaleDateString(locale, { weekday: "long", day: "numeric", month: "long", year: "numeric" });
}

function formatServiceProgram(setlist) {
  const { header, blocks } = eventOrderModel(setlist);
  const lines = [];
  header.forEach((item) => lines.push(`${item.label}: ${item.text}`));
  if (header.length) lines.push("");
  if (blocks.length) lines.push(`${t("agenda.orderTitle")}:`, "");
  blocks.forEach((block) => {
    if (block.type === "songs") {
      if (block.title) lines.push(block.title);
      block.songs.forEach((song, index) => {
        const rawKey = songKey(song);
        const key = rawKey ? transposeChord(rawKey, song.transposeValue || 0) : "";
        lines.push(`  ${index + 1}. ${song.title}${key ? ` (${t("song.key", { key })})` : ""}`);
      });
      lines.push("");
      return;
    }
    if (block.type === "reading") {
      lines.push(block.title);
      if (block.verse) lines.push(`  ${block.verse}`);
      lines.push("");
      return;
    }
    if (block.type === "preach") {
      lines.push(block.title);
      if (block.speaker) lines.push(`  ${block.speakerLabel}: ${block.speaker}`);
      if (block.theme || block.scripture) {
        lines.push(`  ${block.themeLabel}: ${[block.theme ? `“${block.theme}”` : "", block.scripture].filter(Boolean).join(" ")}`);
      }
      lines.push("");
      return;
    }
    if (block.type === "stream") {
      lines.push(block.title);
      if (block.streamTitle) lines.push(`  ${block.streamTitleLabel}: ${block.streamTitle}`);
      if (block.streamDesc) lines.push(`  ${block.streamDescLabel}: ${block.streamDesc}`);
      lines.push("");
      return;
    }
    lines.push(block.title);
    if (block.body) lines.push(`  ${block.body}`);
    lines.push("");
  });
  if (!blocks.length) lines.push(t("service.noSongs"));
  return lines.join("\n").trim();
}

async function shareServiceProgram() {
  const setlist = selectedSetlist();
  if (!setlist) return;
  saveSetlist(true);
  const current = selectedSetlist();
  const text = formatServiceProgram(current);
  if (navigator.share && isTouchDevice()) {
    try {
      await navigator.share({ title: current.title, text });
      notify(t("service.shared"));
      return;
    } catch (error) {
      if (error.name === "AbortError") return;
    }
  }
  try {
    await navigator.clipboard.writeText(text);
    notify(t("service.copied"));
    return;
  } catch {
    if (copyTextFallback(text)) {
      notify(t("service.copied"));
      return;
    }
  }
  notify(t("service.copyFail"));
}

function shareServiceWhatsApp() {
  const setlist = selectedSetlist();
  if (!setlist) return;
  saveSetlist(true);
  const text = formatServiceProgram(selectedSetlist());
  window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank", "noopener,noreferrer");
}

function downloadJson(fileName, data) {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = fileName;
  link.click();
  URL.revokeObjectURL(url);
  logFile(t("msg.file", { name: fileName }));
}

function logFile(message) {
  el.fileLog.textContent = `[${new Date().toLocaleTimeString()}] ${message}`;
}

function notify(message) {
  logFile(message);
  el.toast.textContent = message;
  el.toast.hidden = false;
  clearTimeout(notify.timer);
  notify.timer = setTimeout(() => {
    el.toast.hidden = true;
  }, 2200);
}

function uniqueById(items) {
  const seen = new Set();
  return (items || []).filter((item) => {
    const id = String(item?.id || "");
    if (!id || seen.has(id)) return false;
    seen.add(id);
    return true;
  });
}

function makeId() {
  return `${Date.now()}${Math.floor(Math.random() * 100000)}`;
}

function cleanId(value) {
  return String(value || "").replace(/[^a-zA-Z0-9._-]/g, "").slice(0, 96);
}

function safeId(value) {
  return cleanId(value) || makeId();
}

function normalize(value) {
  return String(value || "").normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase();
}

function safeFileName(value) {
  return normalize(value).replace(/[^a-z0-9]+/g, "_").replace(/^_+|_+$/g, "") || "chordbook";
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" })[char]);
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function registerServiceWorker() {
  if (!("serviceWorker" in navigator)) return;
  navigator.serviceWorker.addEventListener("controllerchange", () => {
    if (sessionStorage.getItem("cb-sw-reloaded")) return;
    sessionStorage.setItem("cb-sw-reloaded", "1");
    location.reload();
  });
  navigator.serviceWorker.register("./sw.js?v=87").then((reg) => {
    reg.update().catch(() => {});
  }).catch(() => {});
}

function nativeKeepScreenOn(on) {
  try {
    window.ChordBookAndroid?.setKeepScreenOn?.(Boolean(on));
    window.ChordBookAndroid?.setStageKeys?.(Boolean(on));
  } catch {
    /* Android bridge is optional in the browser. */
  }
}

async function requestStageWakeLock() {
  nativeKeepScreenOn(true);
  if (!navigator.wakeLock || document.visibilityState !== "visible") return;
  try {
    stageWakeLock = await navigator.wakeLock.request("screen");
  } catch {
    stageWakeLock = null;
  }
}

async function releaseStageWakeLock() {
  nativeKeepScreenOn(false);
  try {
    await stageWakeLock?.release();
  } catch {
    /* already released */
  }
  stageWakeLock = null;
}
