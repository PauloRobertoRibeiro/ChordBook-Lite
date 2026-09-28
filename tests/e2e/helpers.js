const STORAGE_KEY = "chordbook.pwa.v1";
const GATE_KEY = "chordbook-lite-in";
const { emptyLibrary, FUSION_CHART, LIFECYCLE_CHART, sampleRepertoire, testSong } = require("../lib/fixtures");

async function openApp(page, library = emptyLibrary()) {
  await page.addInitScript(
    ({ gate, key, data }) => {
      sessionStorage.setItem(gate, "1");
      if (!sessionStorage.getItem("cb-test-seeded")) {
        localStorage.setItem(key, JSON.stringify(data));
        sessionStorage.setItem("cb-test-seeded", "1");
      }
      const style = document.createElement("style");
      style.textContent = [
        ".cb-gate{display:none!important}",
        "body.cb-gated .app-shell{visibility:visible!important}",
      ].join("");
      document.documentElement.appendChild(style);
      const dismissGate = () => {
        document.body?.classList.remove("cb-gated");
        const splash = document.getElementById("cbGate");
        if (splash) splash.hidden = true;
      };
      document.addEventListener("DOMContentLoaded", dismissGate);
      dismissGate();
      if (navigator.serviceWorker) {
        navigator.serviceWorker.register = () => Promise.resolve({
          update: () => Promise.resolve(),
          unregister: () => Promise.resolve(true),
        });
        navigator.serviceWorker.addEventListener = () => {};
      }
    },
    { gate: GATE_KEY, key: STORAGE_KEY, data: library },
  );
  await page.goto("/");
  await page.waitForFunction(() => {
    const splash = document.getElementById("cbGate");
    return !document.body.classList.contains("cb-gated") && (!splash || splash.hidden || getComputedStyle(splash).display === "none");
  });
  await page.locator("#songList").waitFor({ state: "attached" });
}

async function readLibrary(page) {
  return page.evaluate((key) => JSON.parse(localStorage.getItem(key) || "{}"), STORAGE_KEY);
}

async function songByTitle(page, title) {
  const library = await readLibrary(page);
  return (library.songs || []).find((song) => song.title === title) || null;
}

async function saveCurrentSong(page) {
  await page.locator("#songForm button[type=submit]").first().click();
  await page.waitForFunction(() => {
    const log = document.querySelector("#fileLog")?.textContent || "";
    const toast = document.querySelector("#toast")?.textContent || "";
    return /salva|saved|guardada/i.test(`${log} ${toast}`);
  });
}

async function clickNewSong(page) {
  const desktop = page.locator("#newSongBtn");
  const fab = page.locator("#libraryFab");
  await desktop.or(fab).first().waitFor({ state: "attached" });
  if (await desktop.isVisible()) {
    await desktop.click();
    return;
  }
  if (await fab.isVisible()) {
    await fab.click();
    return;
  }
  await desktop.click({ force: true });
}

async function createSongWithChart(page, title, chart) {
  await clickNewSong(page);
  await page.locator("#titleInput").waitFor({ state: "visible" });
  await page.locator("#titleInput").fill(title);
  await page.locator("#artistInput").fill("Grupo Fictício");
  await page.locator("#linesInput").fill(chart);
  await saveCurrentSong(page);
  await page.waitForFunction((expected) => {
    const key = "chordbook.pwa.v1";
    const data = JSON.parse(localStorage.getItem(key) || "{}");
    return (data.songs || []).some((song) => song.title === expected);
  }, title);
}

async function openSongByTitle(page, title) {
  const song = await songByTitle(page, title);
  if (!song) throw new Error(`música ausente: ${title}`);
  await page.locator(`[data-play-id="${song.id}"]`).click();
  await page.locator("#songReadTitle").waitFor({ state: "visible" });
}

async function openMore(page) {
  const desktop = page.locator(".home-shortcuts [data-view=import]");
  if (await desktop.isVisible()) await desktop.click();
  else await page.locator(".bottom-nav-btn[data-view=import]").click();
  await page.locator("#exportRepertoireBtn").waitFor({ state: "visible" });
}

async function openSetlists(page) {
  const desktop = page.locator(".home-shortcuts [data-view=setlists]");
  if (await desktop.isVisible()) await desktop.click();
  else await page.locator(".bottom-nav-btn[data-view=setlists]").click();
  await page.locator("#setlistList").waitFor({ state: "visible" });
}

async function chartText(page) {
  return page.locator("#songReadContent").innerText();
}

async function stageTitle(page) {
  return page.locator("#stageSongTitle").innerText();
}

module.exports = {
  STORAGE_KEY,
  GATE_KEY,
  FUSION_CHART,
  LIFECYCLE_CHART,
  emptyLibrary,
  sampleRepertoire,
  testSong,
  openApp,
  readLibrary,
  songByTitle,
  saveCurrentSong,
  createSongWithChart,
  openSongByTitle,
  openMore,
  openSetlists,
  chartText,
  stageTitle,
};
