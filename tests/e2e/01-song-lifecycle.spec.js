const { test, expect } = require("@playwright/test");
const { openApp, emptyLibrary, createSongWithChart, saveCurrentSong, songByTitle, openSongByTitle, LIFECYCLE_CHART, FUSION_CHART } = require("./helpers");

test.describe("1. Criar, editar, salvar e reabrir", () => {
  test("conserva letras, acordes e quebras de linha", async ({ page }) => {
    await openApp(page, emptyLibrary());
    await createSongWithChart(page, "Hino de Ensaio", LIFECYCLE_CHART);

    const saved = await songByTitle(page, "Hino de Ensaio");
    expect(saved, "a música tinha de existir no armazenamento isolado").toBeTruthy();
    expect(saved.artist).toBe("Grupo Fictício");
    expect(saved.lines.join("\n")).toContain("[G]Primeira");
    expect(saved.lines.join("\n")).toContain("Segunda linha fica");
    expect(saved.lines.join("\n")).toContain("C/E | C7M | C° | C9 | Csus4");
    expect(saved.lines.filter((line) => line === "").length).toBeGreaterThanOrEqual(1);

    const editor = await page.locator("#linesInput").inputValue();
    expect(editor.replace(/\r/g, "")).toBe(saved.lines.join("\n"));

    await page.locator("#closeEditorBtn").click();
    await openSongByTitle(page, "Hino de Ensaio");
    await expect(page.locator("#songReadContent")).toContainText("Primeira");
    await expect(page.locator("#songReadContent")).toContainText("Segunda linha fica");
    await expect(page.locator("#songReadTitle")).toHaveText("Hino de Ensaio");

    await page.reload();
    await page.waitForFunction(() => !document.body.classList.contains("cb-gated"));
    await page.locator("[data-play-id]").first().waitFor();
    await page.locator("[data-play-id]").first().click();
    await expect(page.locator("#songReadTitle")).toHaveText("Hino de Ensaio");
    await expect(page.locator("#songReadContent")).toContainText("Primeira");
    await page.locator("#songEditBtn").click();
    const reopened = await page.locator("#linesInput").inputValue();
    expect(reopened.replace(/\r/g, "")).toBe(saved.lines.join("\n"));
  });
});

test.describe("2. Guardar várias vezes", () => {
  test("o conteúdo não muda progressivamente", async ({ page }) => {
    await openApp(page, emptyLibrary());
    await createSongWithChart(page, "Cifra Estável", FUSION_CHART);
    const first = (await songByTitle(page, "Cifra Estável")).lines.slice();
    for (let index = 0; index < 5; index += 1) {
      await saveCurrentSong(page);
      const again = (await songByTitle(page, "Cifra Estável")).lines;
      expect(again).toEqual(first);
    }
    const editor = await page.locator("#linesInput").inputValue();
    expect(editor.replace(/\r/g, "")).toBe(first.join("\n"));
  });
});
