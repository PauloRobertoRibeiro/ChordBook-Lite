const { test, expect } = require("@playwright/test");
const { openApp, sampleRepertoire, stageTitle, openSetlists } = require("./helpers");

test.describe("9. Repertório no modo palco", () => {
  test("primeira, próxima, anterior e limites da lista", async ({ page }) => {
    await openApp(page, sampleRepertoire());
    await openSetlists(page);
    await expect(page.locator(".setlist-row").first()).toBeVisible();
    await page.locator('[data-open-stage-id="fix-culto"]').click();
    await expect(page.locator("#setlistPlaySheet")).toBeVisible();
    await page.locator('[data-play-mode="stage"]').click();

    await expect(page.locator(".app-shell")).toHaveClass(/stage-active/);
    await expect(page.locator("#stageSongTitle")).toHaveText("Alfa Fictícia");
    await expect(page.locator("#stagePosition")).toHaveText("1/3");
    await expect(page.locator("#stagePrevBtn")).toBeDisabled();
    await expect(page.locator("#stageNextBtn")).toBeEnabled();

    const titleBeforePrev = await stageTitle(page);
    await page.locator("#stagePrevBtn").dispatchEvent("click");
    expect(await stageTitle(page)).toBe(titleBeforePrev);
    await expect(page.locator("#stagePosition")).toHaveText("1/3");

    await page.locator("#stageNextBtn").click();
    await expect(page.locator("#stageSongTitle")).toHaveText("Beta Fictícia");
    await expect(page.locator("#stagePosition")).toHaveText("2/3");
    await expect(page.locator("#stagePrevBtn")).toBeEnabled();
    await expect(page.locator("#stageNextBtn")).toBeEnabled();

    await page.locator("#stageNextBtn").click();
    await expect(page.locator("#stageSongTitle")).toHaveText("Gama Fictícia");
    await expect(page.locator("#stagePosition")).toHaveText("3/3");
    await expect(page.locator("#stageNextBtn")).toBeDisabled();
    await expect(page.locator("#stagePrevBtn")).toBeEnabled();

    const lastTitle = await stageTitle(page);
    await page.locator("#stageNextBtn").dispatchEvent("click");
    expect(await stageTitle(page)).toBe(lastTitle);
    await expect(page.locator("#stagePosition")).toHaveText("3/3");

    await page.locator("#stagePrevBtn").click();
    await expect(page.locator("#stageSongTitle")).toHaveText("Beta Fictícia");
    await page.locator("#stagePrevBtn").click();
    await expect(page.locator("#stageSongTitle")).toHaveText("Alfa Fictícia");
    await expect(page.locator("#stagePrevBtn")).toBeDisabled();
  });
});

test.describe("10. Layout computador e telemóvel (emulação de ecrã)", () => {
  test("computador 1280×800 mostra navegação lateral e esconde a barra inferior", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await openApp(page, sampleRepertoire());
    await expect(page.locator("#newSongBtn")).toBeVisible();
    await expect(page.locator(".home-shortcuts [data-view=import]")).toBeVisible();
    await expect(page.locator(".home-shortcuts [data-view=setlists]")).toBeVisible();
    const bottom = page.locator(".bottom-nav");
    await expect(bottom).toBeHidden();
    await expect(page.locator("#libraryFab")).toBeHidden();
    const navDisplay = await page.locator(".bottom-nav").evaluate((node) => getComputedStyle(node).display);
    expect(navDisplay).toBe("none");
  });

  test("telemóvel 390×844 (emulação CSS, não Android real) mostra barra inferior e FAB", async ({ page }) => {
    test.info().annotations.push({
      type: "note",
      description: "Emulação de viewport 390×844 no Chromium. Não é um telemóvel Android real nem WebView.",
    });
    await page.setViewportSize({ width: 390, height: 844 });
    await openApp(page, sampleRepertoire());
    const navDisplay = await page.locator(".bottom-nav").evaluate((node) => getComputedStyle(node).display);
    expect(navDisplay).not.toBe("none");
    await expect(page.locator(".bottom-nav")).toBeVisible();
    await expect(page.locator("#libraryFab")).toBeVisible();
    await expect(page.locator(".bottom-nav-btn").first()).toBeVisible();
    await expect(page.locator("#newSongBtn")).toBeHidden();
    await page.locator(".bottom-nav-btn[data-view=setlists]").click();
    await expect(page.locator("#setlistList")).toBeVisible();
    await page.locator(".bottom-nav-btn[data-view=import]").click();
    await expect(page.locator("#exportRepertoireBtn")).toBeVisible();
  });

  test("telemóvel: Tom e capo cabem no ecrã ao lado da cifra", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await openApp(page, sampleRepertoire());
    await page.locator("[data-play-id=fix-alfa]").click();
    await expect(page.locator("#songReadTitle")).toHaveText("Alfa Fictícia");
    await expect(page.locator("#songKeyStepper")).toBeVisible();
    await expect(page.locator("#songCapoStepper")).toBeVisible();
    const viewport = { width: 390, height: 844 };
    for (const selector of ["#songKeyStepper", "#songCapoStepper"]) {
      const box = await page.locator(selector).boundingBox();
      expect(box, selector).toBeTruthy();
      expect(box.x, `${selector} sai à esquerda`).toBeGreaterThanOrEqual(0);
      expect(box.y, `${selector} sai acima`).toBeGreaterThanOrEqual(0);
      expect(box.x + box.width, `${selector} sai à direita`).toBeLessThanOrEqual(viewport.width + 1);
    }
  });
});
