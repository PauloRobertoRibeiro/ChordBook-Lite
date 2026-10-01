(function () {
  const lang = (navigator.language || "pt").slice(0, 2);
  const copy = {
    pt: { hint: "Toque numa música para ver a letra.", empty: "Sem letra nesta música.", bad: "Este link não tem letras. Peça outra vez no grupo.", open: "A abrir a letra…" },
    es: { hint: "Toque una canción para ver la letra.", empty: "Sin letra en esta canción.", bad: "Este enlace no tiene letras. Pida otro en el grupo.", open: "Abriendo la letra…" },
    en: { hint: "Tap a song to see the lyrics.", empty: "No lyrics in this song.", bad: "This link has no lyrics. Ask for a new one in the group.", open: "Opening lyrics…" },
  }[lang] || {
    hint: "Toque numa música para ver a letra.",
    empty: "Sem letra nesta música.",
    bad: "Este link não tem letras. Peça outra vez no grupo.",
    open: "A abrir a letra…",
  };

  function readShareSlug() {
    const slug = String(new URLSearchParams(location.search).get("s") || "").trim();
    return /^[A-Za-z0-9_-]{3,32}$/.test(slug) ? slug : "";
  }

  function readEncoded() {
    const query = new URLSearchParams(location.search).get("c");
    if (query) return query;
    const hash = String(location.hash || "").replace(/^#/, "");
    if (hash.startsWith("c=")) return hash.slice(2);
    return "";
  }

  function lyricBlocks(text) {
    return String(text || "").split("\n").map((line) => {
      const trimmed = line.trim();
      if (/^#/.test(trimmed) || /:$/.test(trimmed)) return { head: true, text: trimmed.replace(/^#\s*/, "") };
      return { head: false, text: line };
    });
  }

  function renderLyrics(song) {
    const main = document.getElementById("lyricMain");
    const text = String(song?.l || "").trim();
    if (!text) {
      main.innerHTML = `<p class="empty">${copy.empty}</p>`;
      return;
    }
    main.innerHTML = lyricBlocks(text).map((block) => {
      if (block.head) return `<p class="head">${escapeHtml(block.text)}</p>`;
      return `<p>${escapeHtml(block.text)}</p>`;
    }).join("");
  }

  function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, (char) => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;",
    })[char]);
  }

  function paint(pack, index) {
    const songs = pack.s || [];
    const current = Math.max(0, Math.min(index, songs.length - 1));
    document.title = songs[current]?.t || pack.t || "Letra";
    const title = document.getElementById("packTitle");
    const hint = document.getElementById("packHint");
    if (title) title.textContent = pack.t || songs[current]?.t || "Letra";
    if (hint) hint.textContent = copy.hint;
    const nav = document.getElementById("songNav");
    if (nav) {
      nav.hidden = songs.length < 1;
      nav.innerHTML = songs.map((song, i) => (
        `<button type="button" class="${i === current ? "on" : ""}" data-i="${i}">${escapeHtml(song.t || "—")}</button>`
      )).join("");
      nav.querySelectorAll("[data-i]").forEach((button) => {
        button.addEventListener("click", () => paint(pack, Number(button.dataset.i)));
      });
    }
    renderLyrics(songs[current]);
    window.scrollTo(0, 0);
  }

  async function boot() {
    const slug = readShareSlug();
    const hint = document.getElementById("packHint");
    if (slug) {
      if (hint) hint.textContent = copy.open;
      location.replace("https://spoo.me/" + slug);
      return;
    }
    const encoded = readEncoded();
    const main = document.getElementById("lyricMain");
    if (!encoded || typeof decodeSharePayload !== "function") {
      if (main) main.innerHTML = `<p class="err">${copy.bad}</p>`;
      return;
    }
    try {
      const pack = await decodeSharePayload(encoded);
      paint(pack, 0);
    } catch {
      if (main) main.innerHTML = `<p class="err">${copy.bad}</p>`;
    }
  }

  boot();
})();
