const { test, expect } = require("@playwright/test");
const { openApp, emptyLibrary, createSongWithChart, songByTitle, chartText, openSongByTitle, FUSION_CHART } = require("./helpers");

test.describe("4. Regressão: duas linhas de acordes fundidas", () => {
  test("salvar o exemplo avaliado não funde a última linha nem a trata como letra", async ({ page }) => {
    await openApp(page, emptyLibrary());
    await createSongWithChart(page, "Regressão Fusão", FUSION_CHART);

    const saved = await songByTitle(page, "Regressão Fusão");
    expect(saved.lines).toEqual(FUSION_CHART.replace(/\r/g, "").split("\n"));
    expect(saved.lines[saved.lines.length - 1]).toBe("C/E | C7M | C° | C9 | Csus4");
    expect(saved.lines[saved.lines.length - 2]).toBe("Dm7 | G7 | C/E | Bb | F#dim | Cadd9");
    expect(saved.lines.join("\n")).not.toMatch(/\[C\/E\].*C7M.*C°/);

    const editor = await page.locator("#linesInput").inputValue();
    expect(editor.replace(/\r/g, "")).toBe(FUSION_CHART);

    await page.locator("#closeEditorBtn").click();
    await openSongByTitle(page, "Regressão Fusão");
    const text = await chartText(page);
    expect(text).toContain("C/E | C7M | C° | C9 | Csus4");
    expect(text).toContain("Luz");
    expect(text).toContain("caminho");
    expect(text).not.toMatch(/C\/E.*Luz.*C°/);
  });
});

test.describe("3. Transposição na interface", () => {
  test("Tom + duas vezes (C→D) transpõe diminutos, 7M, baixo e Bb", async ({ page }) => {
    await openApp(page, emptyLibrary());
    await createSongWithChart(page, "Transporte Fictício", FUSION_CHART);
    await page.locator("#closeEditorBtn").click();
    await openSongByTitle(page, "Transporte Fictício");
    await expect(page.locator("#songReadTitle")).toHaveText("Transporte Fictício");

    await page.locator("#songKeyBadgeUp").click();
    await page.locator("#songKeyBadgeUp").click();

    const text = await chartText(page);
    expect(text).toContain("D | A/C# | Bm7 | Gmaj7");
    expect(text).toContain("D/F# | D7M | D° | D9 | Dsus4");
    expect(text).toMatch(/Em7 \| A7 \| D\/F# \| C \| G#dim \| Dadd9/);
    expect(text).toContain("Luz");
    expect(text).toContain("caminho");
    expect(text).not.toContain("C°");
    expect(text).not.toContain("C7M");
  });
});
