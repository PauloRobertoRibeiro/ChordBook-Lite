const assert = require("assert");
const path = require("path");
const backup = require(path.join(__dirname, "..", "pwa", "backup-merge.js"));

function song(id, extra = {}) {
  return {
    id,
    title: extra.title || "Luz",
    artist: extra.artist || "",
    category: "Geral",
    isFavorite: false,
    lines: extra.lines || ["{key: C}", "C | G"],
    capo: 0,
    cue: "",
    transposeValue: extra.transposeValue || 0,
    updatedAt: extra.updatedAt || "2026-09-28T10:00:00.000Z",
    revision: extra.revision == null ? 1 : extra.revision,
  };
}

const exported = song("song-1", { revision: 1, updatedAt: "2026-09-28T10:00:00.000Z", lines: ["{key: C}", "C"] });
const edited = song("song-1", { revision: 2, updatedAt: "2026-09-28T11:00:00.000Z", lines: ["{key: C}", "C", "letra nova"], transposeValue: 2 });

const local = {
  songs: [edited],
  setlists: [{ id: "set-1", title: "Culto", songIds: ["song-1"], finalSongIds: [], notes: "", service: {}, updatedAt: "2026-09-28T11:00:00.000Z" }],
  team: { members: [{ id: "m1", name: "Ana", roles: ["voz"], note: "" }], rolePresets: ["voz"] },
  agenda: { fields: [{ id: "type", enabled: true }], sections: [{ id: "schedule" }] },
};

const incomingOld = {
  songs: [exported],
  setlists: [{ id: "set-1", title: "Culto antigo", songIds: ["song-1"], finalSongIds: [], notes: "", service: {}, updatedAt: "2026-09-28T10:00:00.000Z" }],
  team: { members: [{ id: "m1", name: "Ana", roles: ["voz"], note: "" }], rolePresets: ["voz"] },
  agenda: { fields: [{ id: "type", enabled: false }], sections: [{ id: "schedule" }] },
};

const plan = backup.planImport(local, incomingOld);
assert.ok(plan.conflicts.length >= 1, "backup antigo deve gerar conflito");
assert.strictEqual(plan.songs.conflicts[0].local.revision, 2);

const kept = backup.applyImportPlan(local, plan, "keep", { makeId: () => "copy-1", suffix: " (importada)" });
assert.deepStrictEqual(kept.songs.find((item) => item.id === "song-1").lines, edited.lines, "manter a versão atual preserva a edição recente");
assert.strictEqual(kept.songs.length, 1);

const replaced = backup.applyImportPlan(local, plan, "replace", { makeId: () => "copy-1", suffix: " (importada)" });
assert.deepStrictEqual(replaced.songs.find((item) => item.id === "song-1").lines, exported.lines, "substituir usa a versão importada");
assert.strictEqual(replaced.setlists[0].title, "Culto antigo");

const both = backup.applyImportPlan(local, plan, "both", { makeId: () => "copy-1", suffix: " (importada)" });
assert.strictEqual(both.songs.length, 2);
assert.deepStrictEqual(both.songs.find((item) => item.id === "song-1").lines, edited.lines);
assert.ok(both.songs.some((item) => item.id === "copy-1" && item.title.includes("importada")));

const newerIncoming = {
  songs: [song("song-1", { revision: 3, updatedAt: "2026-09-28T12:00:00.000Z", lines: ["versão mais nova"] })],
};
const newerPlan = backup.planImport({ songs: [edited], setlists: [], team: { members: [], rolePresets: [] }, agenda: local.agenda }, newerIncoming);
assert.strictEqual(newerPlan.conflicts.length, 0, "versão importada mais recente não é conflito");
assert.strictEqual(newerPlan.songs.replaces.length, 1);
const auto = backup.applyImportPlan({ songs: [edited], setlists: [], team: { members: [], rolePresets: [] }, agenda: local.agenda }, newerPlan, "auto");
assert.deepStrictEqual(auto.songs[0].lines, ["versão mais nova"]);

const payload = {
  format: "chordbook-repertoire",
  version: 2,
  songs: [exported],
  setlists: [],
  team: { members: [], rolePresets: [] },
  agenda: { fields: [], sections: [] },
  settings: { theme: "dark", language: "es", showChords: true, showLyrics: true, focusChart: false, preferAutoScroll: false, look: { stageBg: "#000000" } },
};
assert.ok(payload.settings.theme);
assert.ok(!("sync" in payload));
assert.ok(!("peer" in payload));
assert.ok(!("code" in payload));

const appSrc = require("fs").readFileSync(path.join(__dirname, "..", "pwa", "app.js"), "utf8");
assert.ok(appSrc.includes("settings: exportableSettings()"), "o backup completo deve incluir configurações");
const settingsBlock = appSrc.slice(appSrc.indexOf("function exportableSettings"), appSrc.indexOf("function repertoireBackupPayload"));
assert.ok(settingsBlock.includes("look: savedLook"), "o backup deve incluir o visual do palco");
assert.ok(!/sync|peer|license/i.test(settingsBlock), "o backup não deve incluir credenciais de ligação");
const downloadBlock = appSrc.slice(appSrc.indexOf("function downloadJson"), appSrc.indexOf("function logFile"));
assert.ok(downloadBlock.includes("setTimeout"), "o download não deve revogar a URL imediatamente");

console.log("import-merge: ok");
