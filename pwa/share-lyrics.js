(function (root) {
  function toBase64Url(bytes) {
    let bin = "";
    const view = bytes instanceof Uint8Array ? bytes : new Uint8Array(bytes);
    for (let i = 0; i < view.length; i += 1) bin += String.fromCharCode(view[i]);
    const b64 = typeof btoa === "function"
      ? btoa(bin)
      : Buffer.from(view).toString("base64");
    return b64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
  }

  function fromBase64Url(token) {
    const b64 = String(token || "").replace(/-/g, "+").replace(/_/g, "/");
    const pad = b64.length % 4 === 0 ? "" : "=".repeat(4 - (b64.length % 4));
    const raw = b64 + pad;
    if (typeof atob === "function") {
      const bin = atob(raw);
      const out = new Uint8Array(bin.length);
      for (let i = 0; i < bin.length; i += 1) out[i] = bin.charCodeAt(i);
      return out;
    }
    return new Uint8Array(Buffer.from(raw, "base64"));
  }

  function looksLikeBareChordLine(trimmed) {
    const tokens = String(trimmed || "").replace(/\|/g, " ").split(/\s+/).filter(Boolean);
    if (!tokens.length) return false;
    return tokens.every((tok) =>
      /^[A-G](?:#|b)?(?:maj7|7M|M7|m|min|sus\d*|dim|aug|add\d*|°|º)?\d*(?:\/[A-G](?:#|b)?)?$/i.test(tok)
    );
  }

  function lyricsOnlyFromLines(lines) {
    const out = [];
    (Array.isArray(lines) ? lines : []).forEach((raw) => {
      let line = String(raw ?? "");
      const trimmed = line.trim();
      if (!trimmed) {
        out.push("");
        return;
      }
      if (/^\{/.test(trimmed)) return;
      if (/^\d+\/\d+\b/.test(trimmed) || /\bbpm\b/i.test(trimmed)) return;
      const chordPro = /\[[^\]]+\]/.test(line);
      if (!chordPro && typeof root.isChordOnlyLine === "function" && root.isChordOnlyLine(line)) return;
      if (!chordPro && looksLikeBareChordLine(trimmed)) return;
      line = line.replace(/\[[^\]]*\]/g, "");
      line = line.replace(/[ \t]{2,}/g, " ").replace(/[ \t]+$/g, "");
      if (!line.trim()) return;
      out.push(line);
    });
    return out.join("\n").replace(/\n{3,}/g, "\n\n").trim();
  }

  function buildSharePack(title, songs) {
    return {
      v: 1,
      t: String(title || "").trim().slice(0, 80),
      s: (songs || []).map((song) => ({
        t: String(song?.title || "").trim().slice(0, 80),
        l: lyricsOnlyFromLines(song?.lines),
      })),
    };
  }

  async function deflateRaw(bytes) {
    if (typeof CompressionStream === "function") {
      const stream = new Blob([bytes]).stream().pipeThrough(new CompressionStream("deflate-raw"));
      return new Uint8Array(await new Response(stream).arrayBuffer());
    }
    if (typeof require === "function") {
      return new Uint8Array(require("zlib").deflateRawSync(Buffer.from(bytes)));
    }
    throw new Error("deflate");
  }

  async function inflateRaw(bytes) {
    if (typeof DecompressionStream === "function") {
      const stream = new Blob([bytes]).stream().pipeThrough(new DecompressionStream("deflate-raw"));
      return new Uint8Array(await new Response(stream).arrayBuffer());
    }
    if (typeof require === "function") {
      return new Uint8Array(require("zlib").inflateRawSync(Buffer.from(bytes)));
    }
    throw new Error("inflate");
  }

  async function encodeSharePayload(pack) {
    const json = JSON.stringify(pack);
    const plain = new TextEncoder().encode(json);
    try {
      const tight = await deflateRaw(plain);
      if (tight.length < plain.length) return `1${toBase64Url(tight)}`;
    } catch {
      /* uncompressed */
    }
    return `0${toBase64Url(plain)}`;
  }

  async function decodeSharePayload(token) {
    const raw = String(token || "").trim();
    if (!raw) throw new Error("empty");
    const mode = raw.charAt(0);
    const body = raw.slice(1);
    const bytes = fromBase64Url(body);
    const jsonBytes = mode === "1" ? await inflateRaw(bytes) : bytes;
    const pack = JSON.parse(new TextDecoder().decode(jsonBytes));
    if (!pack || !Array.isArray(pack.s)) throw new Error("pack");
    return pack;
  }

  const SHORTENER = "https://spoo.me/";
  const SLUG_RE = /^[A-Za-z0-9_-]{3,32}$/;

  function shareOrigin(origin) {
    return origin || (typeof location !== "undefined" ? location.href : "https://chordbook.jogaraprender.com/");
  }

  function shareLyricsUrl(encoded, origin) {
    const url = new URL("cantar.html", shareOrigin(origin));
    url.hash = `c=${encoded}`;
    return url.toString();
  }

  function formatLyricsInvite(title, url) {
    return `${String(title || "").trim() || "Setlist"}\n${url}`;
  }

  function slugFromShortUrl(shortUrl) {
    try {
      const parsed = new URL(String(shortUrl || "").replace(/^http:\/\//i, "https://"));
      if (!/(^|\.)spoo\.me$/i.test(parsed.hostname)) return "";
      const slug = parsed.pathname.replace(/^\//, "").split("/")[0];
      return SLUG_RE.test(slug) ? slug : "";
    } catch {
      return "";
    }
  }

  function publicShareUrl(slug, origin) {
    const url = new URL("cantar.html", shareOrigin(origin));
    url.searchParams.set("s", slug);
    return url.toString();
  }

  async function shortenShareUrl(longUrl) {
    const ctrl = typeof AbortController === "function" ? new AbortController() : null;
    const timer = ctrl ? setTimeout(() => ctrl.abort(), 8000) : null;
    try {
      const res = await fetch(SHORTENER, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: "url=" + encodeURIComponent(longUrl),
        signal: ctrl ? ctrl.signal : undefined,
      });
      if (!res.ok) throw new Error("short");
      const data = await res.json();
      const slug = slugFromShortUrl(String(data.short_url || ""));
      if (!slug) throw new Error("slug");
      return slug;
    } finally {
      if (timer) clearTimeout(timer);
    }
  }

  const api = {
    lyricsOnlyFromLines,
    buildSharePack,
    encodeSharePayload,
    decodeSharePayload,
    shareLyricsUrl,
    formatLyricsInvite,
    slugFromShortUrl,
    publicShareUrl,
    shortenShareUrl,
  };
  Object.keys(api).forEach((key) => {
    root[key] = api[key];
  });
  root.ChordBookShare = api;
  if (typeof module !== "undefined" && module.exports) module.exports = api;
})(typeof globalThis !== "undefined" ? globalThis : this);
