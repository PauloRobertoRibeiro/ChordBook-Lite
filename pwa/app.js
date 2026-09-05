const STORAGE_KEY = "chordbook.pwa.v1";
const NOTES = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
const FLAT_TO_SHARP = { Db: "C#", Eb: "D#", Gb: "F#", Ab: "G#", Bb: "A#" };

const state = loadState();
let selectedSongId = state.songs[0]?.id ?? null;
let selectedSetlistId = state.setlists[0]?.id ?? null;
let activeSetlistId = null;
let isEditingSong = false;
let isMobileSongMenuOpen = false;
let isMobileActionMenuOpen = false;
let stageTouchStart = null;
const savedStageFont = localStorage.getItem("chordbook.stageFont");
let stageFont = Number(savedStageFont || defaultStageFont());
if (matchMedia("(max-width: 560px)").matches && stageFont < 22) {
  stageFont = 22;
  localStorage.setItem("chordbook.stageFont", String(stageFont));
}

const el = {
  navTabs: document.querySelectorAll(".nav-tab"),
  viewLinks: document.querySelectorAll("[data-go-view]"),
  views: document.querySelectorAll(".view"),
  appShell: document.querySelector(".app-shell"),
  homeRecentList: document.querySelector("#homeRecentList"),
  homeNewSong: document.querySelector("[data-new-song-shortcut]"),
  search: document.querySelector("#searchInput"),
  categoryFilter: document.querySelector("#categoryFilter"),
  songList: document.querySelector("#songList"),
  libraryCount: document.querySelector("#libraryCount"),
  form: document.querySelector("#songForm"),
  editSelected: document.querySelector("#editSelectedBtn"),
  closeEditor: document.querySelector("#closeEditorBtn"),
  openStageFromEditor: document.querySelector("#openStageFromEditorBtn"),
  title: document.querySelector("#titleInput"),
  artist: document.querySelector("#artistInput"),
  category: document.querySelector("#categoryInput"),
  capo: document.querySelector("#capoInput"),
  lines: document.querySelector("#linesInput"),
  favorite: document.querySelector("#favoriteBtn"),
  duplicate: document.querySelector("#duplicateBtn"),
  delete: document.querySelector("#deleteBtn"),
  newSong: document.querySelector("#newSongBtn"),
  sample: document.querySelector("#sampleBtn"),
  theme: document.querySelector("#themeToggle"),
  stageTitle: document.querySelector("#stageTitle"),
  stageMeta: document.querySelector("#stageMeta"),
  mobileStageTitle: document.querySelector("#mobileStageTitle"),
  mobileStageTime: document.querySelector("#mobileStageTime"),
  mobileSongMenu: document.querySelector("#mobileSongMenu"),
  mobileActionMenu: document.querySelector("#mobileActionMenu"),
  stageSetlistBar: document.querySelector("#stageSetlistBar"),
  stageShell: document.querySelector(".stage-shell"),
  stageContent: document.querySelector("#stageContent"),
  transposeValue: document.querySelector("#transposeValue"),
  transposeDown: document.querySelector("#transposeDown"),
  transposeUp: document.querySelector("#transposeUp"),
  fontDown: document.querySelector("#fontDown"),
  fontUp: document.querySelector("#fontUp"),
  shareStage: document.querySelector("#shareStageBtn"),
  youtubeStage: document.querySelector("#youtubeStageBtn"),
  spotifyStage: document.querySelector("#spotifyStageBtn"),
  editFromStage: document.querySelector("#editFromStageBtn"),
  mobileBack: document.querySelector("#mobileBackBtn"),
  mobileMore: document.querySelector("#mobileMoreBtn"),
  mobileShare: document.querySelector("#mobileShareBtn"),
  mobileEdit: document.querySelector("#mobileEditBtn"),
  mobileClock: document.querySelector("#mobileClockBtn"),
  mobileTransposeDown: document.querySelector("#mobileTransposeDown"),
  mobileTransposeUp: document.querySelector("#mobileTransposeUp"),
  mobileFontDown: document.querySelector("#mobileFontDown"),
  mobileFontUp: document.querySelector("#mobileFontUp"),
  mobileScrollDown: document.querySelector("#mobileScrollDown"),
  mobileFile: document.querySelector("#mobileFileBtn"),
  setlistList: document.querySelector("#setlistList"),
  setlistCount: document.querySelector("#setlistCount"),
  newSetlist: document.querySelector("#newSetlistBtn"),
  setlistTitle: document.querySelector("#setlistTitleInput"),
  setlistNotes: document.querySelector("#setlistNotesInput"),
  setlistPicker: document.querySelector("#setlistSongPicker"),
  setlistAvailableSongs: document.querySelector("#setlistAvailableSongs"),
  saveSetlist: document.querySelector("#saveSetlistBtn"),
  openSetlist: document.querySelector("#openSetlistBtn"),
  deleteSetlist: document.querySelector("#deleteSetlistBtn"),
  exportLibrary: document.querySelector("#exportLibraryBtn"),
  exportSelected: document.querySelector("#exportSelectedBtn"),
  exportRepertoire: document.querySelector("#exportRepertoireBtn"),
  importInputs: [document.querySelector("#importFileInput"), document.querySelector("#importFileInputAlt")],
  fileLog: document.querySelector("#fileLog"),
  toast: document.querySelector("#toast"),
};

document.documentElement.classList.toggle("dark", state.theme === "dark");
document.documentElement.style.setProperty("--stage-font", `${stageFont}px`);

bindEvents();
render();
registerServiceWorker();

function bindEvents() {
  el.navTabs.forEach((button) => button.addEventListener("click", () => switchView(button.dataset.view)));
  el.viewLinks.forEach((button) => button.addEventListener("click", () => switchView(button.dataset.goView)));
  window.addEventListener("resize", updateResponsiveStageFont);
  el.search.addEventListener("input", renderSongs);
  el.categoryFilter.addEventListener("change", renderSongs);
  el.newSong.addEventListener("click", createSong);
  el.homeNewSong.addEventListener("click", createSong);
  el.sample.addEventListener("click", addSample);
  el.theme.addEventListener("click", toggleTheme);
  el.form.addEventListener("submit", saveSong);
  el.editSelected.addEventListener("click", editSelectedSong);
  el.closeEditor.addEventListener("click", closeSongEditor);
  el.openStageFromEditor.addEventListener("click", openEditorSongOnStage);
  el.favorite.addEventListener("click", toggleFavorite);
  el.duplicate.addEventListener("click", duplicateSong);
  el.delete.addEventListener("click", deleteSong);
  el.transposeDown.addEventListener("click", () => transposeSelected(-1));
  el.transposeUp.addEventListener("click", () => transposeSelected(1));
  el.fontDown.addEventListener("click", () => changeStageFont(-2));
  el.fontUp.addEventListener("click", () => changeStageFont(2));
  el.shareStage.addEventListener("click", shareSelectedSong);
  el.youtubeStage.addEventListener("click", () => openMusicSearch("youtube"));
  el.spotifyStage.addEventListener("click", () => openMusicSearch("spotify"));
  el.editFromStage.addEventListener("click", editSelectedFromStage);
  el.mobileBack.addEventListener("click", toggleMobileSongMenu);
  el.mobileMore.addEventListener("click", () => transposeSelected(-1));
  el.mobileShare.addEventListener("click", () => transposeSelected(1));
  el.mobileEdit.addEventListener("click", toggleMobileActionMenu);
  el.mobileClock.addEventListener("click", () => changeStageFont(2));
  el.mobileTransposeDown.addEventListener("click", () => transposeSelected(-1));
  el.mobileTransposeUp.addEventListener("click", () => transposeSelected(1));
  el.mobileFontDown.addEventListener("click", () => changeStageFont(-2));
  el.mobileFontUp.addEventListener("click", () => changeStageFont(2));
  el.mobileScrollDown.addEventListener("click", () => el.stageContent.scrollBy({ top: window.innerHeight * 0.72, behavior: "smooth" }));
  el.mobileFile.addEventListener("click", () => switchView("import"));
  el.stageShell.addEventListener("touchstart", handleStageTouchStart, { passive: true });
  el.stageShell.addEventListener("touchend", handleStageTouchEnd, { passive: true });
  el.newSetlist.addEventListener("click", createSetlist);
  el.saveSetlist.addEventListener("click", saveSetlist);
  el.openSetlist.addEventListener("click", openSelectedSetlistOnStage);
  el.deleteSetlist.addEventListener("click", deleteSetlist);
  el.exportLibrary.addEventListener("click", exportLibrary);
  el.exportSelected.addEventListener("click", exportSelectedSong);
  el.exportRepertoire.addEventListener("click", exportRepertoire);
  el.importInputs.forEach((input) => input.addEventListener("change", importFile));
}

function render() {
  renderHome();
  renderCategories();
  renderSongs();
  renderEditor();
  renderStage();
  renderSetlists();
}

function switchView(view) {
  if (view !== "library") isEditingSong = false;
  if (view !== "stage") {
    isMobileSongMenuOpen = false;
    isMobileActionMenuOpen = false;
  }
  el.navTabs.forEach((button) => button.classList.toggle("active", button.dataset.view === view));
  el.views.forEach((section) => section.classList.toggle("active", section.id === `${view}View`));
  el.appShell.classList.toggle("home-active", view === "home");
  el.appShell.classList.toggle("stage-active", view === "stage");
  el.appShell.classList.toggle("editing-song", view === "library" && isEditingSong);
  renderMobileSongMenu();
  renderMobileActionMenu();
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

function openEditorSongOnStage() {
  if (!selectedSong()) return;
  activeSetlistId = null;
  switchView("stage");
}

function renderCategories() {
  const categories = ["Todas", ...new Set(state.songs.map((song) => song.category || "Geral").sort())];
  const current = el.categoryFilter.value || "Todas";
  el.categoryFilter.innerHTML = categories.map((category) => `<option>${escapeHtml(category)}</option>`).join("");
  el.categoryFilter.value = categories.includes(current) ? current : "Todas";
}

function renderSongs() {
  const query = normalize(el.search.value);
  const category = el.categoryFilter.value || "Todas";
  const songs = state.songs
    .filter((song) => category === "Todas" || (song.category || "Geral") === category)
    .filter((song) => normalize([song.title, song.artist, song.category, song.lines.join(" ")].join(" ")).includes(query))
    .sort((a, b) => Number(b.isFavorite) - Number(a.isFavorite) || a.title.localeCompare(b.title));

  el.libraryCount.textContent = `${state.songs.length} ${state.songs.length === 1 ? "cifra" : "cifras"}`;
  el.songList.innerHTML = songs.length ? songs.map(songRow).join("") : `<p class="empty">Nenhuma cifra encontrada.</p>`;
  el.songList.querySelectorAll("[data-song-id]").forEach((button) => {
    button.addEventListener("click", () => {
      selectedSongId = button.dataset.songId;
      render();
      if (isTouchDevice() || matchMedia("(max-width: 560px)").matches) {
        activeSetlistId = null;
        switchView("stage");
      }
    });
    button.addEventListener("dblclick", () => {
      selectedSongId = button.dataset.songId;
      activeSetlistId = null;
      render();
      switchView("stage");
    });
  });
}

function renderHome() {
  const recentSongs = [...state.songs]
    .sort((a, b) => String(b.updatedAt || "").localeCompare(String(a.updatedAt || "")) || a.title.localeCompare(b.title))
    .slice(0, 3);

  el.homeRecentList.innerHTML = recentSongs.length
    ? recentSongs.map((song) => `
      <button class="home-recent-row" data-home-song-id="${song.id}">
        <span>
          <strong>${song.isFavorite ? "* " : ""}${escapeHtml(song.title || "Sem titulo")}</strong>
          <small>${escapeHtml([song.artist, song.category, songKey(song)].filter(Boolean).join(" - "))}</small>
        </span>
        <span>Abrir</span>
      </button>
    `).join("")
    : `<p class="empty">Nenhuma cifra ainda.</p>`;

  el.homeRecentList.querySelectorAll("[data-home-song-id]").forEach((button) => {
    button.addEventListener("click", () => {
      selectedSongId = button.dataset.homeSongId;
      activeSetlistId = null;
      render();
      switchView("stage");
    });
  });
}

function songRow(song) {
  const meta = [song.artist, song.category, songKey(song)].filter(Boolean).join(" - ");
  return `
    <button class="song-row ${song.id === selectedSongId ? "active" : ""}" data-song-id="${song.id}">
      <span class="song-main">
        <strong>${song.isFavorite ? "* " : ""}${escapeHtml(song.title || "Sem titulo")}</strong>
        ${meta ? `<small>${escapeHtml(meta)}</small>` : ""}
      </span>
      <span class="song-open">Abrir</span>
    </button>
  `;
}

function renderEditor() {
  const song = selectedSong();
  const disabled = !song;
  [el.title, el.artist, el.category, el.capo, el.lines, el.favorite, el.duplicate, el.delete, el.editSelected, el.openStageFromEditor].forEach((field) => {
    field.disabled = disabled;
  });
  el.title.value = song?.title ?? "";
  el.artist.value = song?.artist ?? "";
  el.category.value = song?.category ?? "";
  el.capo.value = song?.capo ?? 0;
  el.lines.value = song?.lines.join("\n") ?? "";
  el.favorite.textContent = song?.isFavorite ? "Remover favorito" : "Favorito";
}

function renderStage() {
  const song = selectedSong();
  renderMobileSongMenu();
  renderMobileActionMenu();
  renderStageSetlistBar(song);
  if (!song) {
    el.stageTitle.textContent = "Escolha uma cifra";
    el.mobileStageTitle.textContent = "Cancao";
    updateMobileStageClock();
    el.stageMeta.textContent = "";
    el.transposeValue.value = "0";
    el.stageContent.innerHTML = "";
    el.editFromStage.disabled = true;
    el.shareStage.disabled = true;
    el.youtubeStage.disabled = true;
    el.spotifyStage.disabled = true;
    return;
  }
  el.editFromStage.disabled = false;
  el.shareStage.disabled = false;
  el.youtubeStage.disabled = false;
  el.spotifyStage.disabled = false;
  el.stageTitle.textContent = song.title;
  el.mobileStageTitle.textContent = song.title;
  updateMobileStageClock();
  el.stageMeta.textContent = [song.artist, song.category, `Capo ${song.capo || 0}`].filter(Boolean).join(" - ");
  el.transposeValue.value = `${song.transposeValue || 0}`;
  el.stageContent.innerHTML = `${renderMobileSongHeading(song)}${song.lines.map((line) => renderChordLine(line, song.transposeValue || 0)).join("")}`;
}

function handleStageTouchStart(event) {
  if (!activeSetlist() || isMobileSongMenuOpen || isMobileActionMenuOpen) return;
  if (event.touches.length !== 1) return;
  const touch = event.touches[0];
  stageTouchStart = { x: touch.clientX, y: touch.clientY };
}

function handleStageTouchEnd(event) {
  if (!stageTouchStart || !activeSetlist()) {
    stageTouchStart = null;
    return;
  }

  const touch = event.changedTouches[0];
  const dx = touch.clientX - stageTouchStart.x;
  const dy = touch.clientY - stageTouchStart.y;
  stageTouchStart = null;

  if (Math.abs(dx) < 70 || Math.abs(dx) < Math.abs(dy) * 1.35) return;
  moveSetlistStage(dx < 0 ? 1 : -1);
}

function toggleMobileSongMenu() {
  isMobileSongMenuOpen = !isMobileSongMenuOpen;
  if (isMobileSongMenuOpen) isMobileActionMenuOpen = false;
  renderMobileSongMenu();
  renderMobileActionMenu();
}

function renderMobileSongMenu() {
  if (!el.mobileSongMenu) return;
  el.mobileSongMenu.hidden = !isMobileSongMenuOpen;
  if (!isMobileSongMenuOpen) return;
  el.mobileSongMenu.innerHTML = `
    <div class="mobile-song-menu-actions">
      <button data-mobile-view="home">Inicio</button>
      <button data-mobile-view="library">Biblioteca</button>
    </div>
    <div class="mobile-song-menu-list">
      ${state.songs.map((song) => `
        <button class="${song.id === selectedSongId ? "active" : ""}" data-mobile-song-id="${song.id}">
          <strong>${escapeHtml(song.title || "Sem titulo")}</strong>
          <small>${escapeHtml([song.artist, song.category, songKey(song)].filter(Boolean).join(" - "))}</small>
        </button>
      `).join("")}
    </div>
  `;
  el.mobileSongMenu.querySelectorAll("[data-mobile-view]").forEach((button) => {
    button.addEventListener("click", () => {
      isMobileSongMenuOpen = false;
      switchView(button.dataset.mobileView);
    });
  });
  el.mobileSongMenu.querySelectorAll("[data-mobile-song-id]").forEach((button) => {
    button.addEventListener("click", () => {
      selectedSongId = button.dataset.mobileSongId;
      activeSetlistId = null;
      isMobileSongMenuOpen = false;
      render();
      switchView("stage");
    });
  });
}

function toggleMobileActionMenu() {
  isMobileActionMenuOpen = !isMobileActionMenuOpen;
  if (isMobileActionMenuOpen) isMobileSongMenuOpen = false;
  renderMobileSongMenu();
  renderMobileActionMenu();
}

function renderMobileActionMenu() {
  if (!el.mobileActionMenu) return;
  el.mobileActionMenu.hidden = !isMobileActionMenuOpen;
  if (!isMobileActionMenuOpen) return;
  el.mobileActionMenu.innerHTML = `
    <button data-mobile-action="edit">Editar musica</button>
    <button data-mobile-action="share">Compartilhar</button>
    <button data-mobile-action="youtube">YouTube</button>
    <button data-mobile-action="spotify">Spotify</button>
  `;
  el.mobileActionMenu.querySelectorAll("[data-mobile-action]").forEach((button) => {
    button.addEventListener("click", () => {
      isMobileActionMenuOpen = false;
      renderMobileActionMenu();
      const action = button.dataset.mobileAction;
      if (action === "edit") editSelectedFromStage();
      if (action === "share") shareSelectedSong();
      if (action === "youtube") openMusicSearch("youtube");
      if (action === "spotify") openMusicSearch("spotify");
    });
  });
}

function updateMobileStageClock() {
  const time = new Date().toLocaleTimeString("pt-PT", {
    hour: "2-digit",
    minute: "2-digit",
  });
  const position = activeSetlistPosition();
  el.mobileStageTime.textContent = position ? `${position.index + 1}/${position.total}  ${time}` : time;
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

function renderStageSetlistBar(song) {
  const setlist = activeSetlist();
  if (!setlist || !song) {
    el.stageSetlistBar.innerHTML = "";
    el.stageSetlistBar.hidden = true;
    return;
  }

  const songs = setlistSongs(setlist);
  const currentIndex = songs.findIndex((item) => item.id === song.id);
  el.stageSetlistBar.hidden = false;
  el.stageSetlistBar.innerHTML = `
    <div class="stage-setlist-title">
      <strong>${escapeHtml(setlist.title)}</strong>
      <span>${currentIndex + 1}/${songs.length}</span>
    </div>
    <div class="stage-setlist-nav">
      <button id="previousSetlistSongBtn" ${currentIndex <= 0 ? "disabled" : ""}>Anterior</button>
      <div class="stage-setlist-songs">
        ${songs.map((item, index) => `
          <button class="${item.id === song.id ? "active" : ""}" data-stage-song-id="${item.id}">
            ${index + 1}. ${escapeHtml(item.title)}
          </button>
        `).join("")}
      </div>
      <button id="nextSetlistSongBtn" ${currentIndex >= songs.length - 1 ? "disabled" : ""}>Proxima</button>
    </div>
  `;

  el.stageSetlistBar.querySelector("#previousSetlistSongBtn")?.addEventListener("click", () => moveSetlistStage(-1));
  el.stageSetlistBar.querySelector("#nextSetlistSongBtn")?.addEventListener("click", () => moveSetlistStage(1));
  el.stageSetlistBar.querySelectorAll("[data-stage-song-id]").forEach((button) => {
    button.addEventListener("click", () => {
      selectedSongId = button.dataset.stageSongId;
      renderStage();
    });
  });
}

function renderSetlists() {
  el.setlistCount.textContent = `${state.setlists.length} ${state.setlists.length === 1 ? "lista" : "listas"}`;
  el.setlistList.innerHTML = state.setlists.length
    ? state.setlists.map((setlist) => `
      <button class="song-row ${setlist.id === selectedSetlistId ? "active" : ""}" data-setlist-id="${setlist.id}">
        <strong>${escapeHtml(setlist.title)}</strong>
        <span class="row-count">${setlist.songIds.length}</span>
      </button>`).join("")
    : `<p class="empty">Nenhum setlist criado.</p>`;
  el.setlistList.querySelectorAll("[data-setlist-id]").forEach((button) => {
    button.addEventListener("click", () => {
      selectedSetlistId = button.dataset.setlistId;
      renderSetlists();
    });
    button.addEventListener("dblclick", () => {
      selectedSetlistId = button.dataset.setlistId;
      openSelectedSetlistOnStage();
    });
  });
  const setlist = selectedSetlist();
  el.setlistTitle.value = setlist?.title ?? "";
  el.setlistNotes.value = setlist?.notes ?? "";
  [el.setlistTitle, el.setlistNotes, el.saveSetlist, el.openSetlist, el.deleteSetlist].forEach((field) => {
    field.disabled = !setlist;
  });

  const selectedIds = setlist?.songIds ?? [];
  const selectedSongs = selectedIds.map((id) => state.songs.find((song) => song.id === id)).filter(Boolean);
  const availableSongs = state.songs.filter((song) => !selectedIds.includes(song.id));

  el.setlistPicker.innerHTML = selectedSongs.length
    ? selectedSongs.map((song, index) => orderedSetlistSongRow(song, index, selectedSongs.length)).join("")
    : `<p class="empty compact">Nenhuma musica neste setlist.</p>`;
  el.setlistAvailableSongs.innerHTML = availableSongs.length
    ? availableSongs.map(availableSongRow).join("")
    : `<p class="empty compact">Todas as musicas ja foram adicionadas.</p>`;

  el.setlistPicker.querySelectorAll("[data-setlist-action]").forEach((button) => {
    button.addEventListener("click", () => updateSetlistSongOrder(button.dataset.songId, button.dataset.setlistAction));
  });
  el.setlistAvailableSongs.querySelectorAll("[data-add-song-id]").forEach((button) => {
    button.addEventListener("click", () => addSongToSetlist(button.dataset.addSongId));
  });
}

function orderedSetlistSongRow(song, index, total) {
  return `
    <div class="ordered-row">
      <span>${index + 1}</span>
      <strong>${escapeHtml(song.title)}</strong>
      <div class="mini-actions">
        <button data-setlist-action="up" data-song-id="${song.id}" ${index === 0 ? "disabled" : ""}>↑</button>
        <button data-setlist-action="down" data-song-id="${song.id}" ${index === total - 1 ? "disabled" : ""}>↓</button>
        <button data-setlist-action="remove" data-song-id="${song.id}">×</button>
      </div>
    </div>
  `;
}

function availableSongRow(song) {
  return `
    <button class="available-row" data-add-song-id="${song.id}">
      <span>+</span>
      <strong>${escapeHtml(song.title)}</strong>
    </button>
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

function saveSong(event) {
  event.preventDefault();
  const song = selectedSong();
  if (!song) return;
  Object.assign(song, {
    title: el.title.value.trim() || "Sem titulo",
    artist: el.artist.value.trim(),
    category: el.category.value.trim() || "Geral",
    capo: Number(el.capo.value || 0),
    lines: el.lines.value.replace(/\r/g, "").split("\n"),
    updatedAt: new Date().toISOString(),
    revision: Number(song.revision || 1) + 1,
  });
  persist();
  render();
  logFile("Cifra salva.");
  notify("Musica salva.");
}

function toggleFavorite() {
  const song = selectedSong();
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
  if (!song || !confirm(`Excluir "${song.title}"?`)) return;
  state.songs = state.songs.filter((item) => item.id !== song.id);
  state.setlists.forEach((setlist) => {
    setlist.songIds = setlist.songIds.filter((id) => id !== song.id);
  });
  selectedSongId = state.songs[0]?.id ?? null;
  persist();
  render();
}

function transposeSelected(delta) {
  const song = selectedSong();
  if (!song) return;
  song.transposeValue = clamp(Number(song.transposeValue || 0) + delta, -12, 12);
  persist();
  renderStage();
}

function changeStageFont(delta) {
  stageFont = clamp(stageFont + delta, 16, 42);
  localStorage.setItem("chordbook.stageFont", String(stageFont));
  document.documentElement.style.setProperty("--stage-font", `${stageFont}px`);
}

function defaultStageFont() {
  if (matchMedia("(max-width: 560px)").matches) return 22;
  if (matchMedia("(max-width: 920px)").matches) return 20;
  return 22;
}

function updateResponsiveStageFont() {
  if (localStorage.getItem("chordbook.stageFont")) return;
  stageFont = defaultStageFont();
  document.documentElement.style.setProperty("--stage-font", `${stageFont}px`);
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
    notify("Musica copiada para compartilhar.");
    return;
  } catch {
    if (copyTextFallback(text)) {
      notify("Musica copiada para compartilhar.");
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
  notify("Nao consegui copiar. Baixei um arquivo da musica.");
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
  const setlist = normalizeSetlist({ id: makeId(), title: "Novo setlist" });
  state.setlists.push(setlist);
  selectedSetlistId = setlist.id;
  persist();
  renderSetlists();
}

function saveSetlist() {
  let setlist = selectedSetlist();
  if (!setlist) {
    createSetlist();
    setlist = selectedSetlist();
  }
  setlist.title = el.setlistTitle.value.trim() || "Setlist";
  setlist.notes = el.setlistNotes.value.trim();
  persist();
  renderSetlists();
  logFile("Setlist salvo.");
}

function addSongToSetlist(songId) {
  const setlist = selectedSetlist();
  if (!setlist || setlist.songIds.includes(songId)) return;
  setlist.songIds.push(songId);
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

  persist();
  renderSetlists();
}

function openSelectedSetlistOnStage() {
  const setlist = selectedSetlist();
  const firstSongId = setlist?.songIds.find((id) => state.songs.some((song) => song.id === id));
  if (!firstSongId) return;
  activeSetlistId = setlist.id;
  selectedSongId = firstSongId;
  render();
  switchView("stage");
}

function deleteSetlist() {
  const setlist = selectedSetlist();
  if (!setlist || !confirm(`Excluir setlist "${setlist.title}"?`)) return;
  state.setlists = state.setlists.filter((item) => item.id !== setlist.id);
  selectedSetlistId = state.setlists[0]?.id ?? null;
  if (activeSetlistId === setlist.id) {
    activeSetlistId = null;
  }
  persist();
  render();
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
    notify(delta > 0 ? "Fim do setlist." : "Inicio do setlist.");
    return;
  }
  selectedSongId = nextSong.id;
  el.stageContent.scrollTop = 0;
  renderStage();
}

function addSample() {
  if (state.songs.length && !confirm("Adicionar cifras de exemplo mesmo assim?")) return;
  const demo = demoLibrary();
  state.songs.push(...demo.songs);
  state.setlists.push(...demo.setlists);
  selectedSongId = demo.songs[0]?.id ?? selectedSongId;
  selectedSetlistId = state.setlists.at(-1).id;
  persist();
  render();
}

function toggleTheme() {
  state.theme = state.theme === "dark" ? "light" : "dark";
  document.documentElement.classList.toggle("dark", state.theme === "dark");
  persist();
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
  if (!song) return logFile("Nenhuma cifra selecionada.");
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
    logFile(`Importado: ${result}`);
  } catch (error) {
    logFile(`Nao foi possivel importar: ${error.message}`);
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
      songs: (saved.songs || []).map(normalizeSong),
      setlists: (saved.setlists || []).map(normalizeSetlist),
      theme: saved.theme || "light",
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
      notes: "Abertura, celebracao e encerramento",
      createdAt: now,
    }),
    normalizeSetlist({
      id: "demo-setlist-ensaio",
      title: "Ensaio da Semana",
      songIds: ["demo-acustico", "demo-caminho", "demo-abrigo"],
      notes: "Checar tons, capo e entradas",
      createdAt: now,
    }),
  ];

  return { songs, setlists, theme: "light" };
}

function persist() {
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
    transposeValue: Number(song.transposeValue || 0),
    updatedAt: song.updatedAt || new Date().toISOString(),
    revision: Number(song.revision || 1),
  };
}

function normalizeSetlist(setlist) {
  return {
    id: String(setlist.id || makeId()),
    title: String(setlist.title || "Setlist"),
    songIds: Array.isArray(setlist.songIds) ? setlist.songIds.map(String) : [],
    notes: String(setlist.notes || ""),
    createdAt: setlist.createdAt || new Date().toISOString(),
  };
}

function downloadJson(fileName, data) {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = fileName;
  link.click();
  URL.revokeObjectURL(url);
  logFile(`Arquivo gerado: ${fileName}`);
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
