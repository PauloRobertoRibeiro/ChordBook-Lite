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

test.describe("11. Telão para o público", () => {
  test("letras grandes e centradas no ecrã", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await openApp(page, sampleRepertoire());
    await openSetlists(page);
    await expect(page.locator(".setlist-row").first()).toBeVisible();
    await page.locator('[data-open-stage-id="fix-culto"]').click();
    await expect(page.locator("#setlistPlaySheet")).toBeVisible();
    await page.locator('[data-play-mode="stage"]').click();
    await expect(page.locator(".app-shell")).toHaveClass(/stage-active/);
    await expect(page.locator("#stageContent .lyric-slide.on")).toBeVisible();

    await page.evaluate(() => {
      const shell = document.querySelector(".app-shell");
      const orig = DOMTokenList.prototype.toggle;
      DOMTokenList.prototype.toggle = function toggleLocked(token, force) {
        if (this === shell.classList && (token === "telao-active" || token === "hide-chords")) {
          return orig.call(this, token, true);
        }
        return orig.call(this, token, force);
      };
      shell.classList.add("telao-active", "hide-chords");
      window.dispatchEvent(new Event("resize"));
    });
    await page.waitForFunction(() => {
      const shell = document.querySelector(".app-shell.telao-active");
      const host = document.querySelector("#stageChartScroll");
      const slide = document.querySelector("#stageContent .lyric-slide.on");
      if (!shell || !host || !slide) return false;
      const font = parseFloat(getComputedStyle(document.querySelector("#stageContent")).fontSize);
      return host.getBoundingClientRect().height > 600 && font >= 48;
    });

    const geom = await page.evaluate(() => {
      const slide = document.querySelector("#stageContent .lyric-slide.on");
      const host = document.querySelector("#stageChartScroll");
      const bar = document.querySelector(".stage-mode-bar");
      const shell = document.querySelector(".app-shell");
      const s = slide.getBoundingClientRect();
      const h = host.getBoundingClientRect();
      return {
        slideMid: s.top + s.height / 2,
        viewMid: window.innerHeight / 2,
        hostHeight: h.height,
        hostWidth: h.width,
        viewHeight: window.innerHeight,
        viewWidth: window.innerWidth,
        font: parseFloat(getComputedStyle(document.querySelector("#stageContent")).fontSize),
        titleHidden: getComputedStyle(bar).display === "none",
        shellWidth: shell.getBoundingClientRect().width,
      };
    });

    expect(geom.hostHeight).toBeGreaterThan(geom.viewHeight * 0.85);
    expect(geom.hostWidth).toBeGreaterThan(geom.viewWidth * 0.9);
    expect(Math.abs(geom.slideMid - geom.viewMid)).toBeLessThan(140);
    expect(geom.font).toBeGreaterThanOrEqual(48);
    expect(geom.titleHidden).toBe(true);
    expect(geom.shellWidth).toBeGreaterThan(1200);
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

  test("computador mantém Tom, capo e o botão Mais visíveis", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await openApp(page, sampleRepertoire());
    await page.locator("[data-play-id=fix-alfa]").click();
    await expect(page.locator("#songReadTitle")).toHaveText("Alfa Fictícia");
    await expect(page.locator("#songMoreBtn")).toBeVisible();
    await expect(page.locator("#songKeyStepper")).toBeVisible();
    await expect(page.locator("#songCapoStepper")).toBeVisible();
    await expect(page.locator("#songOverflowSheet")).toBeHidden();
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

  test("telemóvel: estrela, Editar, Escenario, Tom e capo ficam no menu ⋯", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await openApp(page, sampleRepertoire());
    await page.locator("[data-play-id=fix-alfa]").click();
    await expect(page.locator("#songReadTitle")).toHaveText("Alfa Fictícia");
    await expect(page.locator("#songFavBtn")).toBeHidden();
    await expect(page.locator("#songEditBtn")).toBeHidden();
    await expect(page.locator("#songOpenStageBtn")).toBeHidden();
    await expect(page.locator("#songKeyStepper")).toBeHidden();
    await expect(page.locator("#songCapoStepper")).toBeHidden();
    await expect(page.locator("#songMoreBtn")).toBeVisible();
    await page.locator("#songMoreBtn").click();
    await expect(page.locator("#songOverflowSheet")).toBeVisible();
    await expect(page.locator("#songEditBtn")).toBeVisible();
    await expect(page.locator("#songOpenStageBtn")).toBeVisible();
    await expect(page.locator("#songFavBtn")).toBeVisible();
    await expect(page.locator("#songKeyStepper")).toBeVisible();
    await expect(page.locator("#songCapoStepper")).toBeVisible();
    await expect(page.locator("#songToolsHandle")).toBeHidden();
    await expect(page.locator("#songFontDown")).toBeVisible();
    await expect(page.locator("#songSetlistBtn")).toBeVisible();
    await expect(page.locator("#songAutoScrollSwitch")).toBeVisible();
    const viewport = { width: 390, height: 844 };
    for (const selector of ["#songKeyStepper", "#songCapoStepper", "#songEditBtn", "#songOpenStageBtn", "#songFontDown"]) {
      const box = await page.locator(selector).boundingBox();
      expect(box, selector).toBeTruthy();
      expect(box.x, `${selector} sai à esquerda`).toBeGreaterThanOrEqual(0);
      expect(box.y, `${selector} sai acima`).toBeGreaterThanOrEqual(0);
      expect(box.x + box.width, `${selector} sai à direita`).toBeLessThanOrEqual(viewport.width + 1);
    }
  });
});
