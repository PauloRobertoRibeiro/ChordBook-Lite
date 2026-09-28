const { test, expect } = require("@playwright/test");
const path = require("path");
const fs = require("fs");
const os = require("os");
const { openApp, emptyLibrary, sampleRepertoire, readLibrary, testSong, openMore } = require("./helpers");

async function gotoData(page) {
  await openMore(page);
}

async function uploadRestore(page, fileName, contents) {
  const filePath = path.join(os.tmpdir(), fileName);
  fs.writeFileSync(filePath, contents);
  await page.locator("#restoreFileInput").setInputFiles(filePath);
  return filePath;
}

test.describe("6. Exportar e restaurar numa sessão limpa", () => {
  test("músicas, ordem da lista e dados do backup reaparecem", async ({ page, context }) => {
    const source = sampleRepertoire();
    await openApp(page, source);
    await gotoData(page);

    const [download] = await Promise.all([
      page.waitForEvent("download"),
      page.locator("#exportRepertoireBtn").click(),
    ]);
    const downloadPath = await download.path();
    expect(downloadPath, "o navegador tinha de produzir um ficheiro").toBeTruthy();
    const payload = JSON.parse(fs.readFileSync(downloadPath, "utf8"));
    expect(payload.format).toBe("chordbook-repertoire");
    expect(payload.songs.map((song) => song.id)).toEqual(["fix-alfa", "fix-beta", "fix-gama"]);
    expect(payload.setlists[0].songIds).toEqual(["fix-alfa", "fix-beta", "fix-gama"]);
    expect(payload.team.members[0].name).toBe("Ana Teste");
    expect(payload.settings.theme).toBe("dark");
    expect(payload.settings.language).toBe("es");
    expect(payload).not.toHaveProperty("sync");
    expect(payload.settings).not.toHaveProperty("code");

    const clean = await context.newPage();
    await openApp(clean, emptyLibrary());
    await openMore(clean);
    await uploadRestore(clean, "restore-ficticio.chordbook", JSON.stringify(payload));
    await expect(clean.locator("#fileLog")).toContainText(/Importado/i);
    const restored = await readLibrary(clean);
    expect(restored.songs.map((song) => song.title)).toEqual(["Alfa Fictícia", "Beta Fictícia", "Gama Fictícia"]);
    expect(restored.songs.find((song) => song.id === "fix-alfa").lines).toEqual(source.songs[0].lines);
    expect(restored.setlists[0].songIds).toEqual(["fix-alfa", "fix-beta", "fix-gama"]);
    expect(restored.team.members.some((member) => member.name === "Ana Teste")).toBeTruthy();
    expect(restored.theme).toBe("dark");
    expect(restored.language).toBe("es");
    await clean.close();
  });
});

test.describe("7. Backup antigo sobre edição recente", () => {
  test("a edição recente não desaparece sem decisão; Manter as daqui preserva-a", async ({ page }) => {
    const local = sampleRepertoire();
    local.songs[1] = testSong("fix-beta", {
      title: "Beta Fictícia",
      lines: ["{key: G}", "letra recentemente editada"],
      revision: 5,
      updatedAt: "2026-09-28T19:00:00.000Z",
    });
    await openApp(page, local);
    await gotoData(page);

    const old = sampleRepertoire();
    await uploadRestore(page, "backup-antigo.chordbook", JSON.stringify({
      format: "chordbook-repertoire",
      version: 1,
      songs: old.songs,
      setlists: old.setlists,
      team: old.team,
      agenda: old.agenda,
    }));

    await expect(page.locator("#importConflictSheet")).toBeVisible();
    await expect(page.locator("#importConflictList")).toContainText("Beta Fictícia");
    await page.locator("#importConflictKeep").click();
    await expect(page.locator("#importConflictSheet")).toBeHidden();

    const after = await readLibrary(page);
    expect(after.songs.find((song) => song.id === "fix-beta").lines).toEqual(["{key: G}", "letra recentemente editada"]);
  });
});

test.describe("8. Ficheiros inválidos ou incompletos", () => {
  test("JSON inválido e repertório incompleto não alteram os dados", async ({ page }) => {
    const local = sampleRepertoire();
    await openApp(page, local);
    const before = await readLibrary(page);
    await gotoData(page);

    await uploadRestore(page, "invalido.txt", "{isto não é json");
    await expect(page.locator("#fileLog")).toContainText(/importar|Unexpected|JSON/i);
    let after = await readLibrary(page);
    expect(after.songs).toEqual(before.songs);
    expect(after.setlists[0].songIds).toEqual(before.setlists[0].songIds);

    await uploadRestore(page, "incompleto.chordbook", JSON.stringify({ format: "chordbook-repertoire", version: 1 }));
    await expect(page.locator("#fileLog")).toContainText(/incompleto|importar/i);
    after = await readLibrary(page);
    expect(after.songs.map((song) => song.lines)).toEqual(before.songs.map((song) => song.lines));
    expect(after.setlists[0].songIds).toEqual(before.setlists[0].songIds);

    await uploadRestore(page, "desconhecido.chordbook", JSON.stringify({ format: "outro-formato", hello: true }));
    await expect(page.locator("#fileLog")).toContainText(/desconhecido|importar/i);
    after = await readLibrary(page);
    expect(after.songs).toEqual(before.songs);
    await expect(page.locator("#importConflictSheet")).toBeHidden();
  });
});
