const STORAGE_KEY = "chordbook.pwa.v1";
const LOOK_KEY = "chordbook.look.v1";
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
    "brand.tagline": "Suas musicas sempre com voce",
    "nav.songs": "Musicas",
    "nav.setlists": "Setlists",
    "nav.chart": "Cifra",
    "nav.stage": "Palco",
    "nav.more": "Mais",
    "nav.settings": "Configuracoes",
    "nav.libraryBack": "‹ Biblioteca",
    "nav.newSong": "Nova musica",
    "nav.exportLibrary": "Exportar biblioteca",
    "nav.importFile": "Importar arquivo",
    "search.label": "Buscar",
    "search.placeholder": "Buscar musicas, autor, tom...",
    "search.sitesPlaceholder": "Nome da musica ou artista...",
    "search.library": "ChordBook",
    "search.sites": "Sites",
    "search.where": "Onde buscar",
    "search.sitesLead": "Abra o site, copie a cifra e volte para colar.",
    "search.sitesEmpty": "Escreva o nome da musica ou do artista.",
    "search.sitesOpen": "Buscar \"{q}\"",
    "search.sitesHome": "Abrir {name}",
    "search.sitesCount": "Busca nos sites",
    "search.thenPaste": "Ja copiei: colar cifra",
    "search.trySites": "Buscar nos sites",
    "more.sampleShort": "Exemplo",
    "home.title": "Sua musica",
    "home.lead": "Biblioteca, palco e programa de culto para tocar sem perder tempo.",
    "home.library": "Biblioteca",
    "home.libraryLead": "Todas as cifras",
    "home.stageLead": "Tela para tocar",
    "home.setlistsLead": "Ordem do culto",
    "home.files": "Arquivos",
    "home.filesLead": "Importar backup",
    "home.newSong": "+ Nova musica",
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
    "library.emptyKey": "Nenhuma musica neste tom.",
    "library.countOne": "{n} cifra",
    "library.countMany": "{n} cifras",
    "library.favOne": "{n} favorita",
    "library.favMany": "{n} favoritas",
    "library.empty": "Nenhuma cifra encontrada.",
    "library.emptyFavorites": "Nenhuma cifra favorita.",
    "library.emptyRecent": "Toque no nome de uma musica para tocar. As recentes aparecem aqui.",
    "library.favorite": "Favorito",
    "library.unfavorite": "Remover favorito",
    "preview.edit": "Editar",
    "preview.more": "Mais",
    "preview.youtube": "YouTube",
    "editor.title": "Editar musica",
    "editor.lead": "Preencha os dados e escreva a letra com os acordes.",
    "editor.name": "Nome da musica",
    "editor.namePh": "Ex.: Esperanca Viva",
    "editor.artist": "Autor / artista",
    "editor.artistPh": "Ex.: Demo ChordBook",
    "editor.category": "Categoria",
    "editor.categoryPh": "Ex.: Louvor, Celebracao",
    "editor.capo": "Capo",
    "editor.cue": "Recado no palco",
    "editor.cuePh": "Ex.: entra no 2. verso",
    "editor.lyrics": "Letra e cifras",
    "editor.viewChart": "Ver cifra",
    "editor.duplicate": "Duplicar",
    "editor.delete": "Excluir",
    "paste.open": "Colar cifra",
    "paste.title": "Trazer uma musica",
    "paste.lead": "Abra um hinario ou site, copie a cifra e cole abaixo. Depois acerte frases e acordes.",
    "paste.sites": "Onde copiar",
    "paste.apply": "Trazer para o editor",
    "paste.clipboard": "Colar da area de transferencia",
    "paste.placeholder": "Cole aqui a cifra copiada...",
    "paste.empty": "Nao encontrei letra nem acordes para colar.",
    "paste.ready": "Cifra colada. Acerte o que precisar e salve.",
    "paste.clipboardFail": "Cole com Ctrl+V ou toque longo no campo.",
    "common.back": "Voltar",
    "common.save": "Salvar",
    "song.untitled": "Cancao",
    "song.noTitle": "Sem titulo",
    "song.transposeDown": "Tom -",
    "song.transposeUp": "Tom +",
    "song.transpose": "Transpor tom",
    "song.autoScroll": "Rolagem automatica",
    "song.focus": "Modo foco",
    "song.showChords": "Mostrar acordes",
    "song.showLyrics": "Mostrar letra",
    "song.stageGo": "Modo palco",
    "song.chords": "Acordes",
    "song.scroll": "Rolagem",
    "song.scrollStop": "Parar",
    "song.list": "Lista",
    "song.play": "Tocar",
    "song.edit": "Editar musica",
    "song.share": "Compartilhar",
    "song.stageMode": "Modo palco",
    "song.addToSetlist": "Adicionar ao setlist",
    "song.tools": "Ajustes",
    "song.key": "Tom {key}",
    "song.capoChip": "Capo {capo}",
    "song.sounds": "soa {key}",
    "stage.mode": "Modo Palco",
    "stage.menu": "Menu",
    "stage.exit": "Voltar",
    "stage.list": "Ordem",
    "stage.close": "Fechar",
    "stage.now": "agora",
    "stage.listHint": "Escreva para saltar de musica.",
    "stage.setlistLabel": "Ordem do culto",
    "stage.prev": "Anterior",
    "stage.next": "Proxima",
    "stage.end": "Fim do setlist.",
    "stage.start": "Inicio do setlist.",
    "stage.after": "depois: {title}",
    "stage.startScroll": "Rolagem",
    "stage.stopScroll": "Parar",
    "stage.focus": "Foco",
    "stage.speed": "Velocidade {n}%",
    "stage.searchPh": "Buscar musicas...",
    "stage.noMatch": "Nenhuma musica encontrada.",
    "stage.noScroll": "A cifra ja cabe no ecran.",
    "setlists.new": "Novo setlist",
    "setlists.mine": "Meus setlists",
    "setlists.recent": "Recentes",
    "setlists.filter": "Filtro de setlists",
    "setlists.countOne": "{n} setlist",
    "setlists.countMany": "{n} setlists",
    "setlists.recentOne": "{n} recente",
    "setlists.recentMany": "{n} recentes",
    "setlists.empty": "Nenhum setlist criado.",
    "setlists.emptyRecent": "Abra um setlist no palco para aparecer aqui.",
    "setlists.emptyList": "Sem musicas ainda",
    "setlists.edit": "Editar setlist",
    "setlists.editLead": "Ordem das musicas para o dia.",
    "setlists.name": "Nome do setlist",
    "setlists.notes": "Notas",
    "setlists.openStage": "Abrir no palco",
    "setlists.save": "Salvar",
    "setlists.delete": "Excluir",
    "setlists.inList": "No setlist",
    "setlists.noSongs": "Nenhuma musica neste setlist.",
    "setlists.addSong": "Adicionar",
    "setlists.allAdded": "Todas as musicas ja foram adicionadas.",
    "setlists.needSongs": "Adicione musicas ao setlist para abrir no palco.",
    "setlists.saved": "Programa salvo.",
    "setlists.added": "Adicionada a {title}.",
    "setlists.already": "Ja esta neste setlist.",
    "setlists.deleteConfirm": "Excluir o setlist \"{title}\"?",
    "service.title": "Programa de culto",
    "service.lead": "Preencha quem serve no domingo e as musicas. Depois envie a cada participante.",
    "service.name": "Nome do culto",
    "service.namePh": "Ex.: Culto Domingo",
    "service.date": "Data",
    "service.opening": "Abertura (preludio, quem toca)",
    "service.openingPh": "Ex.: Piano — Ana",
    "service.leader": "Dirigente",
    "service.announcements": "Anuncios e leitura da palavra",
    "service.worship": "Grupo de adoracao",
    "service.worshipPh": "Ex.: Ministerio de louvor",
    "service.songs": "Grupo de adoracao — musicas",
    "service.preacher": "Predicador",
    "service.preacherRole": "Pastor ou convidado",
    "service.pastor": "Pastor",
    "service.guest": "Convidado",
    "service.communion": "Santa Ceia",
    "service.communionPh": "Ex.: Pastor Joao",
    "service.send": "Enviar programa",
    "service.whatsapp": "WhatsApp",
    "service.copied": "Programa copiado. Cole no WhatsApp ou no grupo.",
    "service.shared": "Programa enviado.",
    "service.copyFail": "Nao consegui copiar. Use o botao WhatsApp para enviar.",
    "service.heading": "PROGRAMA DE CULTO",
    "service.itemOpening": "1. ABERTURA (Preludio)",
    "service.itemLeader": "2. DIRIGENTE",
    "service.itemAnnouncements": "3. ANUNCIOS E LEITURA DA PALAVRA",
    "service.itemWorship": "4. GRUPO DE ADORACAO",
    "service.itemPreacher": "5. PREDICADOR",
    "service.itemCommunion": "6. SANTA CEIA",
    "service.noSongs": "Ainda sem musicas.",
    "service.key": "Tom {key}",
    "service.tba": "a definir",
    "service.defaultTitle": "Culto Domingo",
    "more.lead": "Ajustes e copias de seguranca.",
    "more.appearance": "Aparencia",
    "more.theme": "Tema",
    "more.themeLightShort": "Claro",
    "more.themeDarkShort": "Escuro",
    "more.themeAuto": "Automatico",
    "more.features": "Funcionalidades",
    "more.data": "Dados",
    "more.clear": "Limpar dados",
    "more.clearConfirm": "Apagar todas as musicas e setlists deste aparelho?",
    "more.about": "Sobre",
    "more.aboutText": "Sobre o ChordBook Lite",
    "more.font": "Tamanho da letra",
    "more.fontDefault": "Tamanho da letra padrao",
    "more.shortcuts": "Atalhos",
    "more.other": "Outras opcoes",
    "more.restore": "Restaurar backup",
    "more.language": "Idioma",
    "more.paste": "Trazer uma musica",
    "more.backups": "Copias de seguranca",
    "more.sample": "Carregar exemplo",
    "more.exportSong": "Exportar cifra atual",
    "more.exportAll": "Exportar backup",
    "more.import": "Importar musicas",
    "more.ready": "Pronto.",
    "more.themeLight": "Tema claro",
    "more.themeDark": "Tema escuro",
    "more.themeNamedLight": "Tema: claro",
    "more.themeNamedDark": "Tema: escuro",
    "look.title": "Visual do palco",
    "look.kicker": "Como fica no palco",
    "look.hint": "Mexe em baixo. A cifra em cima muda na hora. So grava se gostares.",
    "look.dirty": "Ainda nao gravado. Podes descartar ou guardar.",
    "look.preset": "Estilo",
    "look.night": "Noite",
    "look.forest": "Bosque",
    "look.gold": "Ambar",
    "look.paper": "Papel",
    "look.contrast": "Contraste",
    "look.screen": "Tela",
    "look.lyrics": "Letra",
    "look.chords": "Cifra",
    "look.gap": "Espaco",
    "look.gapTight": "Junto",
    "look.gapNormal": "Normal",
    "look.gapLoose": "Folgado",
    "look.save": "Guardar visual",
    "look.discard": "Descartar",
    "look.saved": "Visual do palco guardado.",
    "look.reverted": "Voltei ao visual guardado.",
    "capo.suggestion": "Sugestao: Capo {capo} · {shape}",
    "capo.applied": "Capo {capo} · formas em {shape}",
    "capo.open": "Formas em {shape}",
    "capo.use": "Usar",
    "capo.short": "Capo {capo}",
    "chords.title": "Acordes",
    "chords.close": "Fechar",
    "chords.empty": "Nenhum acorde nesta cifra.",
    "msg.saved": "Musica salva.",
    "msg.copied": "Musica copiada para compartilhar.",
    "msg.copyFail": "Nao consegui copiar. Baixei um arquivo da musica.",
    "msg.sample": "Adicionar cifras de exemplo mesmo assim?",
    "msg.sampleExists": "Os exemplos ja estao na biblioteca.",
    "msg.noSong": "Nenhuma cifra selecionada.",
    "msg.imported": "Importado: {result}",
    "msg.importFail": "Nao foi possivel importar: {error}",
    "msg.file": "Arquivo gerado: {name}",
    "msg.deleteSong": "Excluir \"{title}\"?",
    "msg.cleared": "Biblioteca apagada.",
    "aria.nav": "Navegacao principal",
    "aria.sections": "Secoes",
    "aria.menu": "Menu principal",
    "aria.mobileNav": "Navegacao do telemovel",
  },
  es: {
    "brand.tagline": "Tus canciones siempre contigo",
    "nav.songs": "Canciones",
    "nav.setlists": "Setlists",
    "nav.chart": "Cifra",
    "nav.stage": "Escenario",
    "nav.more": "Mas",
    "nav.settings": "Ajustes",
    "nav.libraryBack": "‹ Biblioteca",
    "nav.newSong": "Nueva cancion",
    "nav.exportLibrary": "Exportar biblioteca",
    "nav.importFile": "Importar archivo",
    "search.label": "Buscar",
    "search.placeholder": "Buscar cancion, artista o tono...",
    "search.sitesPlaceholder": "Nombre de la cancion o artista...",
    "search.library": "ChordBook",
    "search.sites": "Sitios",
    "search.where": "Donde buscar",
    "search.sitesLead": "Abra el sitio, copie la cifra y vuelva para pegarla.",
    "search.sitesEmpty": "Escriba el nombre de la cancion o del artista.",
    "search.sitesOpen": "Buscar \"{q}\"",
    "search.sitesHome": "Abrir {name}",
    "search.sitesCount": "Busqueda en sitios",
    "search.thenPaste": "Ya copié: pegar cifra",
    "search.trySites": "Buscar en los sitios",
    "more.sampleShort": "Ejemplo",
    "home.title": "Tu musica",
    "home.lead": "Biblioteca, escenario y programa de culto para tocar sin perder tiempo.",
    "home.library": "Biblioteca",
    "home.libraryLead": "Todas las cifras",
    "home.stageLead": "Pantalla para tocar",
    "home.setlistsLead": "Orden del culto",
    "home.files": "Archivos",
    "home.filesLead": "Importar copia",
    "home.newSong": "+ Nueva cancion",
    "home.seeAll": "Ver todas",
    "home.empty": "Todavia no hay cifras.",
    "home.open": "Abrir",
    "library.favorites": "Favoritas",
    "library.recent": "Recientes",
    "library.editSelected": "Editar seleccionada",
    "library.filter": "Filtro de la biblioteca",
    "library.filterCategory": "Filtrar categoria",
    "library.filterKey": "Filtrar tono",
    "library.allCategories": "Todas",
    "library.allKeys": "Todos",
    "library.allSongs": "Todas",
    "library.categories": "Categorias",
    "library.keys": "Tonos",
    "library.emptyKey": "Ninguna cancion en este tono.",
    "library.countOne": "{n} cifra",
    "library.countMany": "{n} cifras",
    "library.favOne": "{n} favorita",
    "library.favMany": "{n} favoritas",
    "library.empty": "No se encontraron cifras.",
    "library.emptyFavorites": "No hay cifras favoritas.",
    "library.emptyRecent": "Toque el nombre de una cancion para tocar. Las recientes aparecen aqui.",
    "library.favorite": "Favorito",
    "library.unfavorite": "Quitar favorito",
    "preview.edit": "Editar",
    "preview.more": "Mas",
    "preview.youtube": "YouTube",
    "editor.title": "Editar cancion",
    "editor.lead": "Completa los datos y escribe la letra con los acordes.",
    "editor.name": "Nombre de la cancion",
    "editor.namePh": "Ej.: Esperanza Viva",
    "editor.artist": "Autor / artista",
    "editor.artistPh": "Ej.: Demo ChordBook",
    "editor.category": "Categoria",
    "editor.categoryPh": "Ej.: Alabanza, Celebracion",
    "editor.capo": "Cejilla",
    "editor.cue": "Recado en el escenario",
    "editor.cuePh": "Ej.: entra en el 2. verso",
    "editor.lyrics": "Letra y cifras",
    "editor.viewChart": "Ver cifra",
    "editor.duplicate": "Duplicar",
    "editor.delete": "Eliminar",
    "paste.open": "Pegar cifra",
    "paste.title": "Traer una cancion",
    "paste.lead": "Abra un himnario o sitio, copie la cifra y peguela abajo. Luego ajuste frases y acordes.",
    "paste.sites": "Donde copiar",
    "paste.apply": "Traer al editor",
    "paste.clipboard": "Pegar del portapapeles",
    "paste.placeholder": "Pegue aqui la cifra copiada...",
    "paste.empty": "No encontre letra ni acordes para pegar.",
    "paste.ready": "Cifra pegada. Ajuste lo que haga falta y guarde.",
    "paste.clipboardFail": "Pegue con Ctrl+V o toque largo en el campo.",
    "common.back": "Volver",
    "common.save": "Guardar",
    "song.untitled": "Cancion",
    "song.noTitle": "Sin titulo",
    "song.transposeDown": "Tono -",
    "song.transposeUp": "Tono +",
    "song.transpose": "Transportar tono",
    "song.autoScroll": "Desplazamiento automatico",
    "song.focus": "Modo foco",
    "song.showChords": "Mostrar acordes",
    "song.showLyrics": "Mostrar letra",
    "song.stageGo": "Modo escenario",
    "song.chords": "Acordes",
    "song.scroll": "Desplazar",
    "song.scrollStop": "Parar",
    "song.list": "Lista",
    "song.play": "Tocar",
    "song.edit": "Editar cancion",
    "song.share": "Compartir",
    "song.stageMode": "Modo escenario",
    "song.addToSetlist": "Anadir al setlist",
    "song.tools": "Ajustes",
    "song.key": "Tono {key}",
    "song.capoChip": "Cejilla {capo}",
    "song.sounds": "suena {key}",
    "stage.mode": "Modo escenario",
    "stage.menu": "Menu",
    "stage.exit": "Volver",
    "stage.list": "Orden",
    "stage.close": "Cerrar",
    "stage.now": "ahora",
    "stage.listHint": "Escriba para saltar de cancion.",
    "stage.setlistLabel": "Orden del culto",
    "stage.prev": "Anterior",
    "stage.next": "Siguiente",
    "stage.end": "Fin del setlist.",
    "stage.start": "Inicio del setlist.",
    "stage.after": "despues: {title}",
    "stage.startScroll": "Desplazar",
    "stage.stopScroll": "Parar",
    "stage.focus": "Foco",
    "stage.speed": "Velocidad {n}%",
    "stage.searchPh": "Buscar canciones...",
    "stage.noMatch": "No se encontraron canciones.",
    "stage.noScroll": "La cifra ya cabe en pantalla.",
    "setlists.new": "Nuevo setlist",
    "setlists.mine": "Mis setlists",
    "setlists.recent": "Recientes",
    "setlists.filter": "Filtro de setlists",
    "setlists.countOne": "{n} setlist",
    "setlists.countMany": "{n} setlists",
    "setlists.recentOne": "{n} reciente",
    "setlists.recentMany": "{n} recientes",
    "setlists.empty": "Ningun setlist creado.",
    "setlists.emptyRecent": "Abre un setlist en el escenario para verlo aqui.",
    "setlists.emptyList": "Todavia sin canciones",
    "setlists.edit": "Editar setlist",
    "setlists.editLead": "Orden de las canciones del dia.",
    "setlists.name": "Nombre del setlist",
    "setlists.notes": "Notas",
    "setlists.openStage": "Abrir en escenario",
    "setlists.save": "Guardar",
    "setlists.delete": "Eliminar",
    "setlists.inList": "En el setlist",
    "setlists.noSongs": "Ninguna cancion en este setlist.",
    "setlists.addSong": "Anadir",
    "setlists.allAdded": "Todas las canciones ya fueron anadidas.",
    "setlists.needSongs": "Anade canciones al setlist para abrir en escenario.",
    "setlists.saved": "Programa guardado.",
    "setlists.added": "Anadida a {title}.",
    "setlists.already": "Ya esta en este setlist.",
    "setlists.deleteConfirm": "Eliminar el setlist \"{title}\"?",
    "service.title": "Programa de culto",
    "service.lead": "Complete quien sirve el domingo y las canciones. Luego envie a cada participante.",
    "service.name": "Nombre del culto",
    "service.namePh": "Ej.: Culto Domingo",
    "service.date": "Fecha",
    "service.opening": "Apertura (preludio, quien toca)",
    "service.openingPh": "Ej.: Piano — Ana",
    "service.leader": "Dirigente",
    "service.announcements": "Anuncios y lectura de la palabra",
    "service.worship": "Grupo de adoracion",
    "service.worshipPh": "Ej.: Ministerio de alabanza",
    "service.songs": "Grupo de adoracion — canciones",
    "service.preacher": "Predicador",
    "service.preacherRole": "Pastor o invitado",
    "service.pastor": "Pastor",
    "service.guest": "Invitado",
    "service.communion": "Santa Cena",
    "service.communionPh": "Ej.: Pastor Juan",
    "service.send": "Enviar programa",
    "service.whatsapp": "WhatsApp",
    "service.copied": "Programa copiado. Peguelo en WhatsApp o en el grupo.",
    "service.shared": "Programa enviado.",
    "service.copyFail": "No pude copiar. Use el boton WhatsApp para enviar.",
    "service.heading": "PROGRAMA DE CULTO",
    "service.itemOpening": "1. APERTURA (Preludio)",
    "service.itemLeader": "2. DIRIGENTE",
    "service.itemAnnouncements": "3. ANUNCIOS Y LECTURA DE LA PALABRA",
    "service.itemWorship": "4. GRUPO DE ADORACION",
    "service.itemPreacher": "5. PREDICADOR",
    "service.itemCommunion": "6. SANTA CENA",
    "service.noSongs": "Todavia sin canciones.",
    "service.key": "Tono {key}",
    "service.tba": "por definir",
    "service.defaultTitle": "Culto Domingo",
    "more.lead": "Ajustes y copias de seguridad.",
    "more.appearance": "Apariencia",
    "more.theme": "Tema",
    "more.themeLightShort": "Claro",
    "more.themeDarkShort": "Oscuro",
    "more.themeAuto": "Automatico",
    "more.features": "Funciones",
    "more.data": "Datos",
    "more.clear": "Borrar datos",
    "more.clearConfirm": "Borrar todas las canciones y setlists de este aparato?",
    "more.about": "Acerca de",
    "more.aboutText": "Acerca de ChordBook Lite",
    "more.font": "Tamano de letra",
    "more.fontDefault": "Tamano de letra predeterminado",
    "more.shortcuts": "Atajos",
    "more.other": "Otras opciones",
    "more.restore": "Restaurar copia",
    "more.language": "Idioma",
    "more.paste": "Traer una cancion",
    "more.backups": "Copias de seguridad",
    "more.sample": "Cargar ejemplo",
    "more.exportSong": "Exportar cifra actual",
    "more.exportAll": "Exportar copia de seguridad",
    "more.import": "Importar canciones",
    "more.ready": "Listo.",
    "more.themeLight": "Tema claro",
    "more.themeDark": "Tema oscuro",
    "more.themeNamedLight": "Tema: claro",
    "more.themeNamedDark": "Tema: oscuro",
    "look.title": "Visual del escenario",
    "look.kicker": "Asi se ve en el escenario",
    "look.hint": "Cambia abajo. La cifra de arriba se actualiza al momento. Guarda solo si te gusta.",
    "look.dirty": "Todavia no guardado. Puedes descartar o guardar.",
    "look.preset": "Estilo",
    "look.night": "Noche",
    "look.forest": "Bosque",
    "look.gold": "Ambar",
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
    "look.reverted": "Volvi al visual guardado.",
    "capo.suggestion": "Sugerencia: Cejilla {capo} · {shape}",
    "capo.applied": "Cejilla {capo} · formas en {shape}",
    "capo.open": "Formas en {shape}",
    "capo.use": "Usar",
    "capo.short": "Cejilla {capo}",
    "chords.title": "Acordes",
    "chords.close": "Cerrar",
    "chords.empty": "No hay acordes en esta cifra.",
    "msg.saved": "Cancion guardada.",
    "msg.copied": "Cancion copiada para compartir.",
    "msg.copyFail": "No pude copiar. Descargue un archivo de la cancion.",
    "msg.sample": "Anadir cifras de ejemplo de todas formas?",
    "msg.sampleExists": "Los ejemplos ya estan en la biblioteca.",
    "msg.noSong": "Ninguna cifra seleccionada.",
    "msg.imported": "Importado: {result}",
    "msg.importFail": "No se pudo importar: {error}",
    "msg.file": "Archivo generado: {name}",
    "msg.deleteSong": "Eliminar \"{title}\"?",
    "msg.cleared": "Biblioteca borrada.",
    "aria.nav": "Navegacion principal",
    "aria.sections": "Secciones",
    "aria.menu": "Menu principal",
    "aria.mobileNav": "Navegacion del telefono",
  },
  en: {
    "brand.tagline": "Your songs, always with you",
    "nav.songs": "Songs",
    "nav.setlists": "Setlists",
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
    "editor.artistPh": "e.g. Demo ChordBook",
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
    "stage.list": "Order",
    "stage.close": "Close",
    "stage.now": "now",
    "stage.listHint": "Type to jump to a song.",
    "stage.setlistLabel": "Service order",
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
    "setlists.new": "New setlist",
    "setlists.mine": "My setlists",
    "setlists.recent": "Recent",
    "setlists.filter": "Setlist filter",
    "setlists.countOne": "{n} setlist",
    "setlists.countMany": "{n} setlists",
    "setlists.recentOne": "{n} recent",
    "setlists.recentMany": "{n} recent",
    "setlists.empty": "No setlists yet.",
    "setlists.emptyRecent": "Open a setlist on stage to see it here.",
    "setlists.emptyList": "No songs yet",
    "setlists.edit": "Edit setlist",
    "setlists.editLead": "Song order for the day.",
    "setlists.name": "Setlist name",
    "setlists.notes": "Notes",
    "setlists.openStage": "Open on stage",
    "setlists.save": "Save",
    "setlists.delete": "Delete",
    "setlists.inList": "In the setlist",
    "setlists.noSongs": "No songs in this setlist.",
    "setlists.addSong": "Add",
    "setlists.allAdded": "Every song is already added.",
    "setlists.needSongs": "Add songs to the setlist to open on stage.",
    "setlists.saved": "Program saved.",
    "setlists.added": "Added to {title}.",
    "setlists.already": "Already in this setlist.",
    "setlists.deleteConfirm": "Delete setlist \"{title}\"?",
    "service.title": "Sunday program",
    "service.lead": "Fill in who serves on Sunday and the songs. Then send it to each participant.",
    "service.name": "Service name",
    "service.namePh": "Ex.: Sunday service",
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
    "service.heading": "SUNDAY PROGRAM",
    "service.itemOpening": "1. OPENING (Prelude)",
    "service.itemLeader": "2. SERVICE LEADER",
    "service.itemAnnouncements": "3. ANNOUNCEMENTS AND SCRIPTURE",
    "service.itemWorship": "4. WORSHIP TEAM",
    "service.itemPreacher": "5. PREACHER",
    "service.itemCommunion": "6. COMMUNION",
    "service.noSongs": "No songs yet.",
    "service.key": "Key {key}",
    "service.tba": "TBD",
    "service.defaultTitle": "Sunday service",
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
    "more.aboutText": "About ChordBook Lite",
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
let isMobileSongMenuOpen = false;
let isSongReadMenuOpen = false;
let isSetlistPickerOpen = false;
let isChordSheetOpen = false;
let isStageFocus = false;
let isSongToolsOpen = false;
let isAutoScrolling = false;
let autoScrollTimer = null;
let autoScrollGuardUntil = 0;
let stageMenuQuery = "";
let stageTouchStart = null;
let stageTouchUsed = false;
const savedScrollSpeed = Number(localStorage.getItem("chordbook.scrollSpeed") || 30);
let scrollSpeed = Math.min(100, Math.max(10, savedScrollSpeed || 30));
const savedStageFont = localStorage.getItem("chordbook.stageFont");
let stageFont = Number(savedStageFont || defaultStageFont());
if (matchMedia("(max-width: 767px)").matches && stageFont < 22) {
  stageFont = 22;
  localStorage.setItem("chordbook.stageFont", String(stageFont));
}
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
  songFav: document.querySelector("#songFavBtn"),
  songTomChip: document.querySelector("#songTomChip"),
  songCapoChip: document.querySelector("#songCapoChip"),
  songToolsToggle: document.querySelector("#songToolsToggle"),
  songMore: document.querySelector("#songMoreBtn"),
  songReadMenu: document.querySelector("#songReadMenu"),
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
  songEditTools: document.querySelector("#songEditToolsBtn"),
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
  setlistTitle: document.querySelector("#setlistTitleInput"),
  setlistNotes: document.querySelector("#setlistNotesInput"),
  serviceDate: document.querySelector("#serviceDate"),
  serviceOpening: document.querySelector("#serviceOpening"),
  serviceLeader: document.querySelector("#serviceLeader"),
  serviceAnnouncements: document.querySelector("#serviceAnnouncements"),
  serviceWorship: document.querySelector("#serviceWorship"),
  servicePreacher: document.querySelector("#servicePreacher"),
  servicePreacherRole: document.querySelector("#servicePreacherRole"),
  serviceCommunion: document.querySelector("#serviceCommunion"),
  shareService: document.querySelector("#shareServiceBtn"),
  whatsappService: document.querySelector("#whatsappServiceBtn"),
  setlistPicker: document.querySelector("#setlistSongPicker"),
  setlistAddSong: document.querySelector("#setlistAddSong"),
  serviceEditorTitle: document.querySelector("#serviceEditorTitle"),
  saveSetlist: document.querySelector("#saveSetlistBtn"),
  openSetlist: document.querySelector("#openSetlistBtn"),
  deleteSetlist: document.querySelector("#deleteSetlistBtn"),
  exportSelected: document.querySelector("#exportSelectedBtn"),
  exportRepertoire: document.querySelector("#exportRepertoireBtn"),
  importInputs: [document.querySelector("#importFileInputAlt"), document.querySelector("#restoreFileInput")],
  fileLog: document.querySelector("#fileLog"),
  toast: document.querySelector("#toast"),
  pasteChart: document.querySelector("#pasteChart"),
  pasteChartInput: document.querySelector("#pasteChartInput"),
  pasteChartLibraryBtn: document.querySelector("#pasteChartLibraryBtn"),
  sitesSearchBtn: document.querySelector("#sitesSearchBtn"),
  moreGo: document.querySelectorAll("[data-more-go]"),
  pasteChartClose: document.querySelector("#pasteChartClose"),
  pasteChartApply: document.querySelector("#pasteChartApply"),
  pasteChartClipboard: document.querySelector("#pasteChartClipboard"),
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
};

function bindEvents() {
  el.homeShortcuts.forEach((button) => button.addEventListener("click", () => switchView(button.dataset.view)));
  el.toolbarFavs?.addEventListener("click", () => {
    switchView("library");
    setLibraryFilter("favorites");
  });
  el.themePills.forEach((button) => button.addEventListener("click", () => setTheme(button.dataset.theme)));
  el.songCapoDown?.addEventListener("click", () => changeCapo(-1));
  el.songCapoUp?.addEventListener("click", () => changeCapo(1));
  el.songOpenStage2?.addEventListener("click", openStageMode);
  el.songEditTools?.addEventListener("click", editSelectedFromStage);
  el.songAutoScrollSwitch?.addEventListener("change", (event) => setPreferAutoScroll(event.target.checked));
  el.songFocusSwitch?.addEventListener("change", (event) => setFocusChart(event.target.checked));
  el.songShowChordsSwitch?.addEventListener("change", (event) => setShowChords(event.target.checked));
  el.songShowLyricsSwitch?.addEventListener("change", (event) => setShowLyrics(event.target.checked));
  el.moreAutoScrollSwitch?.addEventListener("change", (event) => setPreferAutoScroll(event.target.checked));
  el.moreFocusSwitch?.addEventListener("change", (event) => setFocusChart(event.target.checked));
  el.moreShowChordsSwitch?.addEventListener("change", (event) => setShowChords(event.target.checked));
  el.moreShowLyricsSwitch?.addEventListener("change", (event) => setShowLyrics(event.target.checked));
  el.navTabs.forEach((button) => button.addEventListener("click", () => switchView(button.dataset.view)));
  el.bottomNav.forEach((button) => button.addEventListener("click", () => switchView(button.dataset.view)));
  el.libraryFilters.forEach((button) => button.addEventListener("click", () => setLibraryFilter(button.dataset.libraryFilter)));
  el.setlistFilters.forEach((button) => button.addEventListener("click", () => setSetlistFilter(button.dataset.setlistFilter)));
  window.addEventListener("resize", updateResponsiveStageFont);
  window.addEventListener("keydown", handleStageHotkeys);
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "visible" && el.appShell.classList.contains("stage-active")) {
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
  el.songBack.addEventListener("click", closeSongView);
  el.songFav.addEventListener("click", toggleFavorite);
  el.songMore.addEventListener("click", toggleSongReadMenu);
  el.songTransposeDown.addEventListener("click", () => transposeSelected(-1));
  el.songTransposeUp.addEventListener("click", () => transposeSelected(1));
  el.songFontDown.addEventListener("click", () => changeStageFont(-2));
  el.songFontUp.addEventListener("click", () => changeStageFont(2));
  el.songOpenStage.addEventListener("click", openStageMode);
  el.songSetlist.addEventListener("click", openSetlistPickerFromSong);
  el.songScroll.addEventListener("click", toggleAutoScroll);
  el.songChords.addEventListener("click", toggleChordSheet);
  el.chordSheetClose.addEventListener("click", closeChordSheet);
  el.langButtons.forEach((button) => button.addEventListener("click", () => setLanguage(button.dataset.lang)));
  el.stageExit.addEventListener("click", openSongView);
  el.stageMenu.addEventListener("click", toggleMobileSongMenu);
  el.stagePrev.addEventListener("click", () => moveSetlistStage(-1));
  el.stageScroll.addEventListener("click", toggleAutoScroll);
  el.stageNext.addEventListener("click", () => moveSetlistStage(1));
  el.stageTransposeDown.addEventListener("click", () => transposeSelected(-1));
  el.stageTransposeUp.addEventListener("click", () => transposeSelected(1));
  el.stageShell.addEventListener("touchstart", handleStageTouchStart, { passive: true });
  el.stageShell.addEventListener("touchend", handleStageTouchEnd, { passive: true });
  el.stageContent.addEventListener("click", handleStageContentClick);
  el.stageContent.addEventListener("wheel", handleStageManualScroll, { passive: true });
  el.stageContent.addEventListener("touchmove", handleStageManualScroll, { passive: true });
  el.songReadContent.addEventListener("wheel", handleStageManualScroll, { passive: true });
  el.songReadContent.addEventListener("touchmove", handleStageManualScroll, { passive: true });
  el.newSetlist.addEventListener("click", createSetlist);
  el.setlistFab.addEventListener("click", createSetlist);
  el.closeSetlist.addEventListener("click", closeSetlistEditor);
  el.saveSetlist.addEventListener("click", () => saveSetlist());
  el.shareService?.addEventListener("click", () => shareServiceProgram());
  el.whatsappService?.addEventListener("click", shareServiceWhatsApp);
  el.openSetlist.addEventListener("click", openSelectedSetlistOnStage);
  el.deleteSetlist.addEventListener("click", deleteSetlist);
  el.exportSelected.addEventListener("click", exportSelectedSong);
  el.exportRepertoire.addEventListener("click", exportRepertoire);
  el.importInputs.filter(Boolean).forEach((input) => input.addEventListener("change", importFile));
  el.pasteChartLibraryBtn?.addEventListener("click", () => openPasteChart(true));
  document.querySelectorAll("[data-open-paste]").forEach((button) => {
    if (button === el.pasteChartLibraryBtn) return;
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
    switchView(go);
  }));
  el.songToolsToggle?.addEventListener("click", toggleSongTools);
  el.songTomChip?.addEventListener("click", () => setSongToolsOpen(true));
  el.songCapoChip?.addEventListener("click", () => setSongToolsOpen(true));
  el.pasteChartClose?.addEventListener("click", closePasteChart);
  el.pasteChartApply?.addEventListener("click", applyPastedChart);
  el.pasteChartClipboard?.addEventListener("click", pasteChartFromClipboard);
  el.pasteChart?.addEventListener("click", (event) => {
    if (event.target === el.pasteChart) closePasteChart();
  });
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
}

function isStageRundownWide() {
  return window.matchMedia("(min-width: 768px)").matches;
}

function switchView(view) {
  if (view !== "library") closePasteChart();
  if (view !== "library") isEditingSong = false;
  if (view !== "setlists") isEditingSetlist = false;
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
  if (view !== "song" && view !== "stage") stopAutoScroll();
  if (view !== "song") {
    isSongReadMenuOpen = false;
    isSetlistPickerOpen = false;
    isChordSheetOpen = false;
  }
  activeView = view;
  el.navTabs.forEach((button) => button.classList.toggle("active", button.dataset.view === view));
  el.bottomNav.forEach((button) => button.classList.toggle("active", button.dataset.view === view));
  el.views.forEach((section) => section.classList.toggle("active", section.id === `${view}View`));
  el.appShell.classList.toggle("library-active", view === "library");
  el.appShell.classList.toggle("setlists-active", view === "setlists");
  el.appShell.classList.toggle("import-active", view === "import");
  el.appShell.classList.toggle("song-active", view === "song");
  el.appShell.classList.toggle("stage-active", view === "stage");
  el.appShell.classList.toggle("editing-song", view === "library" && isEditingSong);
  el.appShell.classList.toggle("editing-setlist", view === "setlists" && isEditingSetlist);
  if (view === "stage") requestStageWakeLock();
  else releaseStageWakeLock();
  renderSongReadMenu();
  renderMobileSongMenu();
  renderLibraryRail();
  if (keepScroll) startAutoScroll();
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
  if (activeSetlistId) {
    selectedSetlistId = activeSetlistId;
    isEditingSetlist = true;
    switchView("setlists");
    return;
  }
  switchView("library");
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
  const category = el.categoryFilter.value || "Todas";
  const categories = [...new Set(state.songs.map((song) => song.category || "Geral").sort())];
  const keyMap = {};
  state.songs.forEach((song) => {
    const key = songWrittenKey(song);
    if (!key) return;
    keyMap[key] = (keyMap[key] || 0) + 1;
  });
  const keys = Object.keys(keyMap).sort(compareSongKeys);
  const onLibrary = activeView === "library";
  el.libraryRail.innerHTML = `
    <button type="button" class="rail-item ${onLibrary && libraryFilter === "all" ? "active" : ""}" data-rail="all">${t("library.allSongs")} <span>${counts.all}</span></button>
    <button type="button" class="rail-item ${onLibrary && libraryFilter === "favorites" ? "active" : ""}" data-rail="favorites">${t("library.favorites")} <span>${counts.favorites}</span></button>
    <button type="button" class="rail-item ${onLibrary && libraryFilter === "recent" ? "active" : ""}" data-rail="recent">${t("library.recent")} <span>${counts.recent}</span></button>
    <button type="button" class="rail-item ${activeView === "setlists" ? "active" : ""}" data-rail-view="setlists">${t("nav.setlists")} <span>${counts.setlists}</span></button>
    <p class="rail-label">${t("library.categories")}</p>
    <button type="button" class="rail-item ${onLibrary && category === "Todas" ? "active" : ""}" data-rail-category="Todas">${t("library.allCategories")}</button>
    ${categories.map((name) => `<button type="button" class="rail-item ${onLibrary && category === name ? "active" : ""}" data-rail-category="${escapeHtml(name)}">${escapeHtml(name)} <span>${state.songs.filter((song) => (song.category || "Geral") === name).length}</span></button>`).join("")}
    <p class="rail-label">${t("library.keys")}</p>
    <button type="button" class="rail-item ${onLibrary && !libraryKeyFilter ? "active" : ""}" data-rail-key="">${t("library.allKeys")}</button>
    ${keys.map((key) => `<button type="button" class="rail-item ${onLibrary && libraryKeyFilter === key ? "active" : ""}" data-rail-key="${escapeHtml(key)}">${escapeHtml(key)} <span>${keyMap[key]}</span></button>`).join("")}
    <p class="rail-label">${t("nav.more")}</p>
    <button type="button" class="rail-item ${activeView === "import" ? "active" : ""}" data-rail-view="import">${t("nav.settings")}</button>
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
  el.libraryRail.querySelectorAll("[data-rail-category]").forEach((button) => {
    button.addEventListener("click", () => {
      el.categoryFilter.value = button.dataset.railCategory;
      switchView("library");
      renderSongs();
      renderLibraryRail();
    });
  });
  el.libraryRail.querySelectorAll("[data-rail-key]").forEach((button) => {
    button.addEventListener("click", () => {
      switchView("library");
      setLibraryKeyFilter(button.dataset.railKey || "");
    });
  });
}

function renderSongs() {
  el.appShell.classList.toggle("searching-sites", searchScope === "sites");
  if (searchScope === "sites") {
    renderSiteSearch();
    return;
  }
  const scoped = libraryScopeSongs();
  renderKeyFilters(scoped);
  updateLibraryFilterCounts();
  const songs = scoped
    .filter((song) => !libraryKeyFilter || songWrittenKey(song) === libraryKeyFilter)
    .sort((a, b) => {
      if (libraryFilter === "recent") return String(b.lastOpenedAt || "").localeCompare(String(a.lastOpenedAt || ""));
      return Number(b.isFavorite) - Number(a.isFavorite) || a.title.localeCompare(b.title);
    });

  el.libraryCount.textContent = libraryFilter === "favorites"
    ? countLabel(songs.length, "library.favOne", "library.favMany")
    : countLabel(songs.length, "library.countOne", "library.countMany");
  const emptyKey = libraryKeyFilter
    ? "library.emptyKey"
    : libraryFilter === "favorites" ? "library.emptyFavorites" : libraryFilter === "recent" ? "library.emptyRecent" : "library.empty";
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
    <article class="song-item ${song.id === selectedSongId ? "active" : ""}" data-song-wrap="${song.id}">
      <div class="song-row library-song-row">
        <button type="button" class="song-open-main" data-play-id="${song.id}">
          <span class="song-main">
            <strong>${escapeHtml(song.title || t("song.noTitle"))}</strong>
            ${artistHtml}
          </span>
        </button>
        ${written ? `<span class="song-key">${escapeHtml(written)}</span>` : `<span class="song-key muted">—</span>`}
        <button type="button" class="song-fav ${song.isFavorite ? "on" : ""}" data-fav-id="${song.id}" aria-label="${song.isFavorite ? t("library.unfavorite") : t("library.favorite")}" title="${t("library.favorite")}">★</button>
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
  el.lines.value = song?.lines.join("\n") ?? "";
  el.favorite.textContent = song?.isFavorite ? t("library.unfavorite") : t("library.favorite");
}

function songChartHtml(song) {
  return song.lines.map((line) => renderChordLine(line, song.transposeValue || 0)).join("");
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
    if (el.songKeyBadge) {
      el.songKeyBadge.hidden = true;
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
  el.songReadMeta.textContent = [song.artist, song.capo ? t("capo.short", { capo: song.capo }) : ""].filter(Boolean).join(" · ");
  if (el.songKeyBadge) {
    el.songKeyBadge.hidden = !written;
    el.songKeyBadge.textContent = written ? t("song.key", { key: written }) : "";
  }
  if (el.songCueNote) {
    el.songCueNote.hidden = !song.cue;
    el.songCueNote.textContent = song.cue || "";
  }
  el.songFav.classList.toggle("on", Boolean(song.isFavorite));
  if (el.songTomChip) el.songTomChip.textContent = written ? t("song.key", { key: written }) : t("song.transpose");
  if (el.songCapoChip) el.songCapoChip.textContent = song.capo ? t("song.capoChip", { capo: song.capo }) : t("editor.capo");
  el.appShell.classList.toggle("tools-open", isSongToolsOpen);
  el.songReadContent.innerHTML = songChartHtml(song);
  if (el.songKeyValue) el.songKeyValue.textContent = String(song.transposeValue || 0);
  if (el.songCapoValue) el.songCapoValue.textContent = String(song.capo || 0);
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
    el.stageContent.innerHTML = song.lines.map((line) => renderChordLine(line, song.transposeValue || 0)).join("");
    el.stageContent.scrollTop = 0;
  }
}

function handleStageTouchStart(event) {
  if (isMobileSongMenuOpen || event.touches.length !== 1) return;
  if (event.target.closest("button, input, textarea, select, .mobile-song-menu, .stage-mode-bar, .stage-mode-footer")) return;
  const touch = event.touches[0];
  stageTouchStart = { x: touch.clientX, y: touch.clientY };
  stageTouchUsed = false;
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
}

function toggleSongTools() {
  setSongToolsOpen(!isSongToolsOpen);
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
        return `<button type="button" data-add-setlist-id="${setlist.id}" ${inside ? "disabled" : ""}>${escapeHtml(setlist.title)}${inside ? " · ✓" : ""}</button>`;
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
  const cueTitle = setlist?.title || t("stage.setlistLabel");
  const showSearch = !order.length || query;
  el.mobileSongMenu.innerHTML = `
    <div class="stage-cue">
      <small>${escapeHtml(cueTitle)}</small>
    </div>
    <div class="stage-menu-toolbar">
      <button type="button" class="${isAutoScrolling ? "on" : ""}" data-stage-action="scroll">${isAutoScrolling ? t("stage.stopScroll") : t("stage.startScroll")}</button>
      <button type="button" data-stage-action="focus">${t("stage.focus")}</button>
      <div class="stage-speed-row">
        <button type="button" data-stage-action="speed-down" ${scrollSpeed <= 10 ? "disabled" : ""}>−</button>
        <span>${Math.round(scrollSpeed)}%</span>
        <button type="button" data-stage-action="speed-up" ${scrollSpeed >= 100 ? "disabled" : ""}>+</button>
      </div>
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
  el.mobileSongMenu.querySelectorAll("[data-stage-action]").forEach((button) => {
    button.addEventListener("click", () => {
      const action = button.dataset.stageAction;
      if (action === "scroll") {
        if (isAutoScrolling) stopAutoScroll();
        else startAutoScroll();
      }
      if (action === "focus") setStageFocus(true);
      if (action === "speed-down") changeScrollSpeed(-10);
      if (action === "speed-up") changeScrollSpeed(10);
    });
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
    <button type="button" class="stage-set-row ${song.id === selectedSongId ? "active" : ""}" data-mobile-song-id="${song.id}">
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
  const setlists = visibleSetlists();
  el.setlistCount.textContent = setlistFilter === "recent"
    ? countLabel(setlists.length, "setlists.recentOne", "setlists.recentMany")
    : countLabel(state.setlists.length, "setlists.countOne", "setlists.countMany");
  el.setlistList.innerHTML = setlists.length
    ? setlists.map(setlistRow).join("")
    : `<p class="empty">${setlistFilter === "recent" ? t("setlists.emptyRecent") : t("setlists.empty")}</p>`;
  el.setlistList.querySelectorAll("[data-setlist-id]").forEach((button) => {
    button.addEventListener("click", () => openSetlistEditor(button.dataset.setlistId));
  });
  el.setlistList.querySelectorAll("[data-open-stage-id]").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      selectedSetlistId = button.dataset.openStageId;
      openSelectedSetlistOnStage();
    });
  });
  const setlist = selectedSetlist();
  el.setlistTitle.value = setlist?.title ?? "";
  el.setlistNotes.value = setlist?.notes ?? "";
  if (el.serviceEditorTitle) {
    el.serviceEditorTitle.textContent = setlist?.title || t("nav.setlists");
  }
  writeServiceToForm(setlist?.service);
  const editorFields = [
    el.setlistTitle, el.setlistNotes, el.saveSetlist, el.openSetlist, el.deleteSetlist,
    el.shareService, el.whatsappService, el.serviceDate, el.serviceOpening, el.serviceLeader,
    el.serviceAnnouncements, el.serviceWorship, el.servicePreacher, el.servicePreacherRole, el.serviceCommunion,
    el.setlistAddSong,
  ];
  editorFields.forEach((field) => {
    if (field) field.disabled = !setlist;
  });

  const selectedIds = setlist?.songIds ?? [];
  const selectedSongs = selectedIds.map((id) => state.songs.find((song) => song.id === id)).filter(Boolean);
  const availableSongs = state.songs.filter((song) => !selectedIds.includes(song.id));

  el.setlistPicker.innerHTML = selectedSongs.length
    ? selectedSongs.map((song, index) => orderedSetlistSongRow(song, index, selectedSongs.length)).join("")
    : `<p class="empty compact">${t("setlists.noSongs")}</p>`;
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
  const dateLabel = formatServiceDate(setlist.service?.date);
  const preview = songs.slice(0, 3).map((song) => song.title).join(" · ") || setlist.notes || t("setlists.emptyList");
  const meta = [dateLabel, preview].filter(Boolean).join(" · ");
  const canOpen = Boolean(songs.length);
  return `
    <div class="song-row ${setlist.id === selectedSetlistId ? "active" : ""}">
      <button type="button" class="song-open-main" data-setlist-id="${setlist.id}">
        <span class="song-main">
          <strong>${escapeHtml(setlist.title)}</strong>
          <small>${escapeHtml(meta)}</small>
        </span>
      </button>
      <span class="song-key">${songs.length}</span>
      <button type="button" class="setlist-play" data-open-stage-id="${setlist.id}" ${canOpen ? "" : "disabled"} aria-label="${t("setlists.openStage")}" title="${t("setlists.openStage")}">▶</button>
    </div>
  `;
}

function orderedSetlistSongRow(song, index, total) {
  const meta = [song.artist, songKey(song)].filter(Boolean).join(" · ");
  return `
    <div class="ordered-row">
      <span>${index + 1}</span>
      <button type="button" class="setlist-song-open" data-open-song-id="${song.id}">
        <strong>${escapeHtml(song.title)}</strong>
        ${meta ? `<small>${escapeHtml(meta)}</small>` : ""}
      </button>
      <div class="mini-actions">
        <button data-setlist-action="up" data-song-id="${song.id}" ${index === 0 ? "disabled" : ""}>↑</button>
        <button data-setlist-action="down" data-song-id="${song.id}" ${index === total - 1 ? "disabled" : ""}>↓</button>
        <button data-setlist-action="remove" data-song-id="${song.id}">×</button>
      </div>
    </div>
  `;
}

function createSong() {
  const song = normalizeSong({
    id: makeId(),
    title: "Nova musica",
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
  const title = String(value || "").trim().toLowerCase();
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

    const tom = trimmed.match(/^(?:tom|tono|tonalidade|tonalidad|key)\s*[:.\-]?\s*([A-G](?:#|b)?m?)/i);
    if (tom) {
      key = key || tom[1];
      continue;
    }

    if (/^(?:capo|capotraste|cejilla)\b/i.test(trimmed) && /\d/.test(trimmed)) {
      capo = Number(trimmed.match(/\d+/)[0]) || capo;
      continue;
    }

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

  return { title, artist, key: detected, capo, lines: cleaned };
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
    lines: el.lines.value.replace(/\r/g, "").split("\n"),
    updatedAt: new Date().toISOString(),
    revision: Number(song.revision || 1) + 1,
  });
  persist();
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

function changeStageFont(delta) {
  stageFont = clamp(stageFont + delta, 16, 42);
  savedLook = { ...savedLook, stageFont };
  lookDraft = { ...lookDraft, stageFont };
  persistLook(savedLook);
  applyLook(document.documentElement, savedLook);
  if (el.songFontValue) el.songFontValue.textContent = fontPercentLabel(stageFont);
  renderMore();
}

function changeLookFont(delta) {
  lookDraft = { ...lookDraft, stageFont: clamp(Number(lookDraft.stageFont || 22) + delta, 16, 42) };
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
  return {
    stageBg: LOOK_BG.includes(look?.stageBg) ? look.stageBg : look?.stageBg || defaultLook().stageBg,
    lyricColor: look?.lyricColor || defaultLook().lyricColor,
    chordColor: look?.chordColor || defaultLook().chordColor,
    stageFont: clamp(Number(look?.stageFont) || defaultStageFont(), 16, 42),
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
  localStorage.setItem(LOOK_KEY, JSON.stringify(savedLook));
  localStorage.setItem("chordbook.stageFont", String(savedLook.stageFont));
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
  if (matchMedia("(max-width: 767px)").matches) return 22;
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
    service: { date: nextSundayIso() },
  });
  state.setlists.push(setlist);
  selectedSetlistId = setlist.id;
  setlistFilter = "all";
  el.setlistFilters.forEach((button) => button.classList.toggle("active", button.dataset.setlistFilter === setlistFilter));
  persist();
  openSetlistEditor(setlist.id);
  el.setlistTitle.focus();
  el.setlistTitle.select();
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
  el.appShell.classList.remove("editing-setlist");
}

function saveSetlist(silent) {
  let setlist = selectedSetlist();
  if (!setlist) {
    createSetlist();
    setlist = selectedSetlist();
  }
  setlist.title = el.setlistTitle.value.trim() || t("service.defaultTitle");
  setlist.notes = el.setlistNotes.value.trim();
  setlist.service = readServiceFromForm();
  setlist.updatedAt = new Date().toISOString();
  persist();
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
  const setlist = selectedSetlist();
  if (!setlist || setlist.songIds.includes(songId)) return;
  setlist.songIds.push(songId);
  setlist.updatedAt = new Date().toISOString();
  persist();
  renderSetlists();
}

function updateSetlistSongOrder(songId, action) {
  const setlist = selectedSetlist();
  if (!setlist) return;
  const index = setlist.songIds.indexOf(songId);
  if (index < 0) return;

  if (action === "remove") {
    setlist.songIds.splice(index, 1);
  }
  if (action === "up" && index > 0) {
    [setlist.songIds[index - 1], setlist.songIds[index]] = [setlist.songIds[index], setlist.songIds[index - 1]];
  }
  if (action === "down" && index < setlist.songIds.length - 1) {
    [setlist.songIds[index + 1], setlist.songIds[index]] = [setlist.songIds[index], setlist.songIds[index + 1]];
  }

  setlist.updatedAt = new Date().toISOString();
  persist();
  renderSetlists();
}

function openSelectedSetlistOnStage() {
  const setlist = selectedSetlist();
  const firstSongId = setlist?.songIds.find((id) => state.songs.some((song) => song.id === id));
  if (!firstSongId) {
    notify(t("setlists.needSongs"));
    return;
  }
  setlist.lastOpenedAt = new Date().toISOString();
  activeSetlistId = setlist.id;
  selectedSongId = firstSongId;
  persist();
  render();
  switchView("stage");
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
    notify(delta > 0 ? t("stage.end") : t("stage.start"));
    return;
  }
  selectedSongId = nextSong.id;
  const keepScroll = isAutoScrolling;
  stopAutoScroll();
  el.stageContent.scrollTop = 0;
  if (el.songReadContent) el.songReadContent.scrollTop = 0;
  render();
  if (keepScroll) startAutoScroll();
}

function applyStageStep(delta) {
  if (!el.appShell.classList.contains("stage-active")) return false;
  if (!activeSetlist()) return false;
  moveSetlistStage(delta);
  return true;
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
  });
}

async function importFile(event) {
  const file = event.target.files?.[0];
  event.target.value = "";
  if (!file) return;
  try {
    const data = JSON.parse(await file.text());
    const result = importData(data);
    persist();
    render();
    logFile(t("msg.imported", { result }));
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

  const parsed = alignChordProLine(line, semitones);
  if (!parsed.chords.trim() && !parsed.lyrics.trim()) {
    return `<div class="stage-line blank"></div>`;
  }

  if (!parsed.lyrics.trim()) {
    return `<div class="stage-line chord-only"><span class="chord">${escapeHtml(parsed.chords)}</span></div>`;
  }

  return `<div class="stage-line chordpro-line"><div class="chord-row">${escapeHtml(parsed.chords)}</div><div class="lyric-row">${escapeHtml(parsed.lyrics)}</div></div>`;
}

function isSectionHeading(line) {
  const trimmed = line.trim();
  if (!trimmed || trimmed.length > 42 || !/:$/.test(trimmed)) return false;
  if (/^\{/.test(trimmed)) return false;
  return !isChordOnlyLine(trimmed.replace(/:$/, ""));
}

function isChordOnlyLine(line) {
  const trimmed = line.trim();
  if (!trimmed) return false;
  if (/:$/.test(trimmed)) return false;
  const tokens = trimmed.split(/\s+/).filter((token) => token !== "|");
  if (!tokens.length) return false;
  return tokens.every((token) => /^[A-G](?:#|b)?(?:m|maj|min|sus|dim|aug|add)?\d*(?:\/[A-G](?:#|b)?)?$/.test(token));
}

function transposeChordLine(line, semitones) {
  return line.replace(/[A-G](?:#|b)?(?:m|maj|min|sus|dim|aug|add)?\d*(?:\/[A-G](?:#|b)?)?/g, (chord) => transposeChord(chord, semitones));
}

function renderMobileSongHeading(song) {
  const key = songKey(song);
  const meta = [song.capo ? `Capo ${song.capo}` : "", song.artist].filter(Boolean).join(" ");
  return `<section class="mobile-chart-heading"><h2>${escapeHtml(song.title || "Sem titulo")}</h2>${meta ? `<p>${escapeHtml(meta)}</p>` : ""}${key ? `<p>Tonalidad: ${escapeHtml(transposeChord(key, song.transposeValue || 0))}</p>` : ""}</section>`;
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
    if (!saved.songs?.length && !saved.setlists?.length) {
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
      artist: "Demo ChordBook",
      category: "Louvor",
      isFavorite: true,
      lines: [
        "{key: G}",
        "[G]Quando a noite vem, eu [D/F#]lembro",
        "[Em7]Tua voz me chama para [Cadd9]perto",
        "[G]Meu abrigo, minha [D]cancao",
        "[Am7]Tu sustentas meu [C]coracao",
        "",
        "[C]Aleluia, [G/B]minha alma canta",
        "[D]Aleluia, [Em7]tua graca basta",
        "[C]Aleluia, [G]Deus comigo esta",
        "[D]Hoje e sempre reinara",
      ],
    }),
    normalizeSong({
      id: "demo-caminho",
      title: "Caminho de Paz",
      artist: "Demo ChordBook",
      category: "Adoracao",
      lines: [
        "{key: D}",
        "[D]Leva meus passos ao teu [A]rio",
        "[Bm7]Lava o medo, acende a [G]fe",
        "[D/F#]No teu silencio encontro [A]abrigo",
        "[Em7]No teu amor eu fico de [G]pe",
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
      title: "Esperanca Viva",
      artist: "Demo ChordBook",
      category: "Celebracao",
      isFavorite: true,
      lines: [
        "{key: A}",
        "[A]Ha uma luz nascendo [E]aqui",
        "[F#m]Ha uma chama ardendo em [D]nos",
        "[A/C#]Nada apaga o teu [E]amor",
        "[Bm7]Nada cala nossa [D]voz",
        "",
        "[A]Vem, esperança [E]viva",
        "[F#m]Vem, renova o [D]altar",
        "[A/C#]Cristo e nossa [E]alegria",
        "[Bm7]Para sempre vamos [D]cantar",
      ],
    }),
    normalizeSong({
      id: "demo-acustico",
      title: "Ensaio Acustico",
      artist: "Demo ChordBook",
      category: "Ensaio",
      capo: 2,
      cue: "Conta quatro e entra",
      lines: [
        "{key: E}",
        "[E]Conta quatro, respira e [B/D#]vai",
        "[C#m7]Baixo firme, violao no [A]tempo",
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
        leader: "Irmao Paulo",
        announcements: "Irma Maria",
        worshipTeam: "Ministerio de louvor",
        preacher: "Pastor Joao",
        preacherRole: "pastor",
        communion: "Pastor Joao",
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

  return { songs, setlists, theme: "light", language: "pt", showChords: true, showLyrics: true, focusChart: false, preferAutoScroll: false };
}

function persist() {
  state.songs = uniqueById(state.songs);
  state.setlists = uniqueById(state.setlists);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function normalizeSong(song) {
  return {
    id: String(song.id || makeId()),
    title: String(song.title || "Sem titulo"),
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

function normalizeSetlist(setlist) {
  return {
    id: String(setlist.id || makeId()),
    title: String(setlist.title || "Culto Domingo"),
    songIds: Array.isArray(setlist.songIds) ? setlist.songIds.map(String) : [],
    notes: String(setlist.notes || ""),
    service: normalizeService(setlist.service),
    createdAt: setlist.createdAt || new Date().toISOString(),
    updatedAt: setlist.updatedAt || setlist.createdAt || new Date().toISOString(),
    lastOpenedAt: setlist.lastOpenedAt || "",
  };
}

function normalizeService(service) {
  const src = service && typeof service === "object" ? service : {};
  return {
    date: String(src.date || ""),
    opening: String(src.opening || ""),
    leader: String(src.leader || ""),
    announcements: String(src.announcements || ""),
    worshipTeam: String(src.worshipTeam || ""),
    preacher: String(src.preacher || ""),
    preacherRole: src.preacherRole === "convidado" ? "convidado" : "pastor",
    communion: String(src.communion || ""),
  };
}

function readServiceFromForm() {
  return normalizeService({
    date: el.serviceDate.value,
    opening: el.serviceOpening.value.trim(),
    leader: el.serviceLeader.value.trim(),
    announcements: el.serviceAnnouncements.value.trim(),
    worshipTeam: el.serviceWorship.value.trim(),
    preacher: el.servicePreacher.value.trim(),
    preacherRole: el.servicePreacherRole.value,
    communion: el.serviceCommunion.value.trim(),
  });
}

function writeServiceToForm(service) {
  const data = normalizeService(service);
  el.serviceDate.value = data.date;
  el.serviceOpening.value = data.opening;
  el.serviceLeader.value = data.leader;
  el.serviceAnnouncements.value = data.announcements;
  el.serviceWorship.value = data.worshipTeam;
  el.servicePreacher.value = data.preacher;
  el.servicePreacherRole.value = data.preacherRole;
  el.serviceCommunion.value = data.communion;
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
  const service = normalizeService(setlist.service);
  const tba = t("service.tba");
  const person = (value) => value || tba;
  const dateLine = formatServiceDate(service.date);
  const role = service.preacherRole === "convidado" ? t("service.guest") : t("service.pastor");
  const songs = setlistSongs(setlist);
  const songLines = songs.length
    ? songs.map((song, index) => {
        const rawKey = songKey(song);
        const key = rawKey ? transposeChord(rawKey, song.transposeValue || 0) : "";
        return `${index + 1}. ${song.title}${key ? ` (${t("song.key", { key })})` : ""}`;
      }).join("\n")
    : t("service.noSongs");
  const lines = [
    t("service.heading"),
    dateLine ? `${setlist.title} — ${dateLine}` : setlist.title,
    "",
    t("service.itemOpening"),
    person(service.opening),
    "",
    t("service.itemLeader"),
    person(service.leader),
    "",
    t("service.itemAnnouncements"),
    person(service.announcements),
    "",
    t("service.itemWorship"),
    person(service.worshipTeam),
    songLines,
    "",
    `${t("service.itemPreacher")} (${role})`,
    person(service.preacher),
    "",
    t("service.itemCommunion"),
    person(service.communion),
  ];
  if (setlist.notes) {
    lines.push("", `${t("setlists.notes")}: ${setlist.notes}`);
  }
  return lines.join("\n");
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
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("./sw.js").catch(() => {});
  }
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
