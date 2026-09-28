const assert = require("assert");
const backup = require("../pwa/backup-merge.js");
const { sampleRepertoire, emptyLibrary, testSong } = require("./lib/fixtures");

const source = sampleRepertoire();
const empty = emptyLibrary();
const plan = backup.planImport(empty, source);
assert.strictEqual(plan.conflicts.length, 0, "repertório novo numa sessão vazia não tem conflitos");
assert.strictEqual(plan.songs.adds.length, 3);
const restored = backup.applyImportPlan(empty, plan, "auto");
assert.deepStrictEqual(restored.songs.map((song) => song.id), source.songs.map((song) => song.id));
assert.deepStrictEqual(restored.songs.map((song) => song.title), ["Alfa Fictícia", "Beta Fictícia", "Gama Fictícia"]);
assert.deepStrictEqual(restored.setlists[0].songIds, ["fix-alfa", "fix-beta", "fix-gama"]);
assert.deepStrictEqual(restored.songs.find((song) => song.id === "fix-alfa").lines, source.songs[0].lines);
assert.strictEqual(restored.team.members[0].name, "Ana Teste");

const edited = sampleRepertoire();
edited.songs[1] = testSong("fix-beta", {
  title: "Beta Fictícia",
  lines: ["{key: G}", "edição recente da beta"],
  revision: 4,
  updatedAt: "2026-09-28T18:00:00.000Z",
});
const oldBackup = sampleRepertoire();
const conflictPlan = backup.planImport(edited, oldBackup);
assert.ok(conflictPlan.songs.conflicts.some((item) => item.local.id === "fix-beta"), "edição recente deve conflitar com backup antigo");
const kept = backup.applyImportPlan(edited, conflictPlan, "keep");
assert.deepStrictEqual(kept.songs.find((song) => song.id === "fix-beta").lines, ["{key: G}", "edição recente da beta"]);

const untouched = JSON.parse(JSON.stringify(edited));
assert.deepStrictEqual(edited.songs.find((song) => song.id === "fix-beta").lines, untouched.songs.find((song) => song.id === "fix-beta").lines, "planImport não pode mutar o estado local");

console.log("backup-roundtrip: ok");
