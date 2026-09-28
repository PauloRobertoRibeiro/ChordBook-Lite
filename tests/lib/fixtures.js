const FUSION_CHART = `{key: C}
Intro:
C | G/B | Am7 | Fmaj7
Verso:
[C]Luz [G/B]no [Am7]caminho [Fmaj7]hoje
Dm7 | G7 | C/E | Bb | F#dim | Cadd9
C/E | C7M | C° | C9 | Csus4`;

const LIFECYCLE_CHART = `{key: G}

[G]Primeira [D/F#]linha
[Em7]Segunda linha fica

G | D | Em | C
C/E | C7M | C° | C9 | Csus4`;

const TRANSPOSE_TOKENS = ["C", "Am", "G7", "C9", "Cadd9", "C°", "C7M", "F#dim", "Bb", "G/B"];

function testSong(id, extra = {}) {
  return {
    id,
    title: extra.title || "Hino de Ensaio",
    artist: extra.artist || "Grupo Fictício",
    category: extra.category || "Teste",
    isFavorite: Boolean(extra.isFavorite),
    lines: extra.lines || FUSION_CHART.split("\n"),
    capo: extra.capo == null ? 0 : extra.capo,
    cue: extra.cue || "entra no verso",
    transposeValue: extra.transposeValue || 0,
    lastOpenedAt: extra.lastOpenedAt || "",
    updatedAt: extra.updatedAt || "2026-09-28T10:00:00.000Z",
    revision: extra.revision == null ? 1 : extra.revision,
  };
}

function testSetlist(id, songIds, extra = {}) {
  return {
    id,
    title: extra.title || "Culto de Ensaio",
    songIds,
    finalSongIds: extra.finalSongIds || [],
    notes: extra.notes || "notas fictícias",
    service: extra.service || { date: "2026-10-04", time: "10:00" },
    createdAt: extra.createdAt || "2026-09-28T09:00:00.000Z",
    updatedAt: extra.updatedAt || "2026-09-28T10:00:00.000Z",
    lastOpenedAt: extra.lastOpenedAt || "",
  };
}

function emptyLibrary(overrides = {}) {
  return {
    songs: [],
    setlists: [],
    theme: "light",
    language: "pt",
    showChords: true,
    showLyrics: true,
    focusChart: false,
    preferAutoScroll: false,
    team: { members: [], rolePresets: ["voz"] },
    agenda: { fields: [], sections: [] },
    ...overrides,
  };
}

function sampleRepertoire() {
  const songs = [
    testSong("fix-alfa", { title: "Alfa Fictícia", lines: ["{key: C}", "[C]Alfa [G]um", "C | G | Am | F"] }),
    testSong("fix-beta", { title: "Beta Fictícia", lines: ["{key: G}", "[G]Beta [D]dois"], revision: 1 }),
    testSong("fix-gama", { title: "Gama Fictícia", lines: ["{key: D}", "D | A | Bm | G"] }),
  ];
  return emptyLibrary({
    songs,
    setlists: [testSetlist("fix-culto", ["fix-alfa", "fix-beta", "fix-gama"])],
    team: {
      members: [{ id: "fix-ana", name: "Ana Teste", roles: ["voz"], note: "fictício", createdAt: "2026-09-01T00:00:00.000Z" }],
      rolePresets: ["voz", "guitarra"],
    },
    theme: "dark",
    language: "es",
    showChords: true,
    showLyrics: true,
    focusChart: true,
    preferAutoScroll: false,
  });
}

module.exports = {
  FUSION_CHART,
  LIFECYCLE_CHART,
  TRANSPOSE_TOKENS,
  testSong,
  testSetlist,
  emptyLibrary,
  sampleRepertoire,
};
