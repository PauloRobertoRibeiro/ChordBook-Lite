(function (root) {
  const CHORD_BODY = "[A-G](?:#|b)?(?:maj7|7M|M7|maj|min|sus|dim|aug|add|m|°|º|ø)?\\d*(?:sus\\d*)?(?:\\/[A-G](?:#|b)?(?:maj7|7M|M7|maj|min|m|°|º|ø)?\\d*)?";
  const CHORD_FIND_RE = new RegExp(CHORD_BODY, "gi");
  const CHORD_TOKEN_RE = new RegExp(`^(?:${CHORD_BODY})$`, "i");
  const CHORD_LIKE_QUALITY = /^(?:maj7|7M|M7|maj|min|sus\d*|dim|aug|add\d*|m|°|º|ø|\+)?\d*(?:sus\d*)?$/i;
  const NOTES = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
  const FLAT_TO_SHARP = { Db: "C#", Eb: "D#", Gb: "F#", Ab: "G#", Bb: "A#" };

  function isChordProLine(line) {
    return /\[[^\]]+\]/.test(String(line || ""));
  }

  function normalizeChordProToWords(line) {
    const source = String(line || "");
    if (!isChordProLine(source)) return source;
    let lyric = "";
    const marks = [];
    const chordRe = /\[([^\]]+)\]/g;
    let lastIndex = 0;
    let match;
    while ((match = chordRe.exec(source)) !== null) {
      lyric += source.slice(lastIndex, match.index);
      marks.push({ chord: match[1].trim(), index: lyric.length });
      lastIndex = chordRe.lastIndex;
    }
    lyric += source.slice(lastIndex);
    if (!marks.length) return source;

    const words = [];
    const wordRe = /\S+/g;
    let word;
    while ((word = wordRe.exec(lyric)) !== null) {
      words.push({ start: word.index, end: word.index + word[0].length, text: word[0], chords: [] });
    }
    if (!words.length) return `${marks.map((mark) => `[${mark.chord}]`).join("")}${lyric}`;

    marks.forEach((mark) => {
      const inside = words.find((item) => mark.index >= item.start && mark.index < item.end);
      const after = words.find((item) => item.start >= mark.index);
      const before = [...words].reverse().find((item) => item.end <= mark.index);
      let target = inside;
      if (!target && before && after) {
        target = (mark.index - before.end) <= (after.start - mark.index) ? before : after;
      }
      target = target || before || after || words[words.length - 1];
      if (target && mark.chord) target.chords.push(mark.chord);
    });

    let out = "";
    let cursor = 0;
    words.forEach((item) => {
      out += lyric.slice(cursor, item.start);
      out += item.chords.map((chord) => `[${chord}]`).join("");
      out += item.text;
      cursor = item.end;
    });
    return out + lyric.slice(cursor);
  }

  function foldStackedChords(lines) {
    const out = [];
    const source = Array.isArray(lines) ? lines : [];
    for (let index = 0; index < source.length; index += 1) {
      let line = source[index];
      if (isChartMetaLine(line)) continue;
      const labeled = splitLabeledChordLine(line);
      if (labeled) {
        out.push(labeled[0]);
        line = labeled[1];
      }
      if (isChordProLine(line)) {
        out.push(normalizeChordProToWords(line));
        continue;
      }
      const expanded = expandGluedChords(line);
      const partnerAt = nextLyricPartnerIndex(source, index);
      if (isChordOnlyLine(expanded) && partnerAt >= 0) {
        const pair = mergeChordLyricPair(expanded, source[partnerAt]);
        if (pair.heading) out.push(pair.heading);
        out.push(pair.merged);
        index = partnerAt;
        continue;
      }
      out.push(line);
    }
    return out;
  }

  function nextLyricPartnerIndex(source, index) {
    for (let cursor = index + 1; cursor < source.length; cursor += 1) {
      if (!String(source[cursor] || "").trim()) continue;
      return isLyricPartner(source[cursor]) ? cursor : -1;
    }
    return -1;
  }

  function splitLabeledChordLine(line) {
    const match = String(line || "").match(/^(intro|introducci[oó]n|outro|coda|solo|puente|bridge|instr(?:umental)?|interludio|inst)\s*[:.]?\s+(.+)$/i);
    if (!match || !isChordOnlyLine(match[2])) return null;
    const raw = match[1].trim();
    const label = `${raw.charAt(0).toUpperCase()}${raw.slice(1).toLowerCase()}:`;
    return [label, match[2].trim()];
  }

  function isLyricPartner(line) {
    if (line == null) return false;
    const trimmed = String(line).trim();
    if (!trimmed || /^\{/.test(trimmed) || isChordOnlyLine(trimmed) || looksLikeChordProgression(trimmed) || isSectionHeading(trimmed)) return false;
    if (isChartMetaLine(trimmed) || /^\([^)]*\)$/.test(trimmed)) return false;
    return /[A-Za-zÀ-ÿ]/.test(trimmed);
  }

  function isChartMetaLine(line) {
    const trimmed = String(line || "").trim();
    if (!trimmed) return false;
    if (/^\d+\/\d+\b/.test(trimmed) || /\bbpm\b/i.test(trimmed)) return true;
    if (/^transpor tom$/i.test(trimmed) || /^[+\-−]+$/.test(trimmed)) return true;
    return false;
  }

  function mergeChordLyricPair(chordLine, lyricLine) {
    let lyrics = String(lyricLine || "");
    let heading = "";
    let prefixLength = 0;
    const prefix = lyrics.match(/^(intro|introducci[oó]n|verso|verse|estrofa|coro|chorus|estribillo|puente|bridge|outro|coda|pre-?coro|pre-?chorus|final|tag|interludio|solo)\s*\d*\s*[:.\-]?\s+/i);
    if (prefix) {
      heading = prefix[0].trim().replace(/[:.\-]+$/, "");
      if (!/:$/.test(heading)) heading += ":";
      prefixLength = prefix[0].length;
      lyrics = lyrics.slice(prefixLength);
    }
    const turnaround = splitChordTurnaround(expandGluedChords(chordLine));
    const mainLine = turnaround.main;
    const extraChords = turnaround.extra;
    let merged = chordLineHasAlignment(mainLine)
      ? mergeChordsByColumns(mainLine, lyrics, prefixLength)
      : mergeChordsByWords(mainLine, lyrics);
    if (extraChords.length) merged += extraChords.map((chord) => `[${chord}]`).join("");
    return { heading, merged: normalizeChordProToWords(merged) };
  }

  function splitChordTurnaround(chordLine) {
    const source = String(chordLine || "");
    const pipeIndex = source.search(/\S.*\|/);
    if (pipeIndex < 0) return { main: source, extra: [] };
    const mark = source.indexOf("|", pipeIndex);
    if (mark <= 0 || !chordMarkers(source.slice(0, mark)).length) {
      return { main: source.replace(/\|/g, " "), extra: [] };
    }
    return {
      main: source.slice(0, mark),
      extra: chordMarkers(source.slice(mark + 1)).map((token) => token.chord),
    };
  }

  function chordLineHasAlignment(line) {
    return /^\s{2,}/.test(line) || /\S\s{2,}\S/.test(line);
  }

  function chordMarkers(line) {
    const tokens = [];
    const source = String(line || "").replace(/\t/g, "  ");
    const regex = new RegExp(CHORD_FIND_RE.source, "gi");
    let match;
    while ((match = regex.exec(source)) !== null) {
      tokens.push({ chord: match[0], index: match.index });
    }
    return tokens;
  }

  function mergeChordsByColumns(chordLine, lyrics, shift = 0) {
    const tokens = chordMarkers(chordLine);
    if (!tokens.length) return lyrics;
    const spans = wordSpans(lyrics);
    const used = new Set();
    const placed = tokens.map((token) => {
      const raw = Math.min(Math.max(token.index - shift, 0), lyrics.length);
      const at = snapToUnusedWordStart(spans, raw, used);
      used.add(at);
      return { chord: token.chord, at };
    });
    placed.sort((a, b) => b.at - a.at);
    let result = lyrics;
    placed.forEach((item) => {
      result = `${result.slice(0, item.at)}[${item.chord}]${result.slice(item.at)}`;
    });
    return result;
  }

  function wordSpans(lyrics) {
    const spans = [];
    const word = /\S+/g;
    let match;
    while ((match = word.exec(lyrics)) !== null) {
      spans.push({ start: match.index, end: match.index + match[0].length });
    }
    return spans;
  }

  function allWordStarts(lyrics) {
    return wordSpans(lyrics).map((span) => span.start);
  }

  function snapToUnusedWordStart(spans, index, used) {
    if (!spans.length) return index;
    const starts = spans.map((span) => span.start);
    const inside = spans.find((span) => index >= span.start && index < span.end);
    let best = inside ? inside.start : starts[0];
    if (!inside) {
      const previous = [...spans].reverse().find((span) => span.end <= index);
      const next = spans.find((span) => span.start >= index);
      if (previous && next) {
        const toPrev = index - previous.end;
        const toNext = next.start - index;
        best = toPrev <= toNext ? previous.start : next.start;
      } else {
        best = (previous || next || spans[0]).start;
      }
    }
    if (!used.has(best)) return best;
    const after = starts.find((start) => start > best && !used.has(start));
    if (after != null) return after;
    const before = [...starts].reverse().find((start) => start < best && !used.has(start));
    return before != null ? before : best;
  }

  function mergeChordsByWords(chordLine, lyrics) {
    const chords = chordMarkers(expandGluedChords(chordLine)).map((token) => token.chord);
    if (!chords.length) return lyrics;
    let starts = allWordStarts(lyrics);
    if (!starts.length) return `${chords.map((chord) => `[${chord}]`).join(" ")} ${lyrics}`.trim();
    const targets = uniqueSpreadStarts(starts, chords.length);
    let result = lyrics;
    for (let index = chords.length - 1; index >= 0; index -= 1) {
      const at = targets[index];
      const stacked = index < chords.length - 1 && targets[index] === targets[index + 1];
      result = `${result.slice(0, at)}[${chords[index]}]${stacked ? " " : ""}${result.slice(at)}`;
    }
    return result;
  }

  function uniqueSpreadStarts(starts, count) {
    if (count <= 1) return [starts[0]];
    if (starts.length === 1) return Array.from({ length: count }, () => starts[0]);
    const used = new Set();
    return Array.from({ length: count }, (_, index) => {
      let pick = starts.length >= count
        ? starts[Math.round((index * (starts.length - 1)) / (count - 1))]
        : starts[Math.min(index, starts.length - 1)];
      if (used.has(pick)) {
        pick = starts.find((start) => start > pick && !used.has(start))
          ?? starts.find((start) => !used.has(start))
          ?? pick;
      }
      used.add(pick);
      return pick;
    });
  }

  function isSectionHeading(line) {
    const trimmed = String(line || "").trim();
    if (!trimmed || trimmed.length > 42 || !/:$/.test(trimmed)) return false;
    if (/^\{/.test(trimmed)) return false;
    return !isChordOnlyLine(trimmed.replace(/:$/, ""));
  }

  function chordLineTokens(line) {
    const trimmed = expandGluedChords(String(line || "")).replace(/\|/g, " ").trim();
    if (!trimmed || /:$/.test(trimmed)) return [];
    return trimmed.split(/\s+/).filter(Boolean).flatMap((token) => token.split(/[-–—]+/).filter(Boolean));
  }

  function isChordLikeToken(token) {
    const part = String(token || "").trim();
    if (!part) return false;
    if (CHORD_TOKEN_RE.test(part)) return true;
    const match = part.match(/^([A-G](?:#|b)?)(.*)$/i);
    if (!match) return false;
    const rest = match[2] || "";
    const slash = rest.indexOf("/");
    const quality = slash >= 0 ? rest.slice(0, slash) : rest;
    const bass = slash >= 0 ? rest.slice(slash + 1) : "";
    if (quality && !CHORD_LIKE_QUALITY.test(quality)) {
      if (/[a-zà-ÿ]{3,}/i.test(quality) && !/^(maj|min|dim|aug|sus|add)/i.test(quality)) return false;
      if (quality.length > 8) return false;
    }
    if (bass && !/^[A-G](?:#|b)?(?:maj7|7M|M7|maj|min|m|°|º)?\d*$/i.test(bass)) return false;
    return Boolean(quality || bass || CHORD_TOKEN_RE.test(match[1]));
  }

  function looksLikeChordProgression(line) {
    const raw = String(line || "");
    const tokens = chordLineTokens(raw);
    if (!tokens.length) return false;
    const chordish = tokens.filter(isChordLikeToken);
    const lyricWords = tokens.filter((token) => /[a-zà-ÿ]{4,}/i.test(token) && !isChordLikeToken(token));
    if (lyricWords.length) return false;
    if (/\|/.test(raw) && chordish.length >= 1 && chordish.length >= tokens.length - 1) return true;
    return tokens.length >= 2 && chordish.length >= tokens.length - 1;
  }

  function isChordOnlyLine(line) {
    const tokens = chordLineTokens(line);
    if (!tokens.length) return false;
    if (tokens.every((token) => CHORD_TOKEN_RE.test(token))) return true;
    return looksLikeChordProgression(line);
  }

  function expandGluedChords(line) {
    return String(line || "").replace(/[A-G][^\s|]*/g, (token) => {
      const parts = splitGluedChordToken(token);
      return parts && parts.length > 1 ? parts.join(" ") : token;
    });
  }

  function splitGluedChordToken(token) {
    const source = String(token || "");
    if (!source) return null;
    if (CHORD_TOKEN_RE.test(source)) return [source];
    const parts = [];
    let rest = source;
    while (rest) {
      let found = "";
      for (let len = rest.length; len >= 1; len -= 1) {
        if (CHORD_TOKEN_RE.test(rest.slice(0, len))) {
          found = rest.slice(0, len);
          break;
        }
      }
      if (!found) return null;
      parts.push(found);
      rest = rest.slice(found.length);
    }
    return parts.length ? parts : null;
  }

  function transposeChordLine(line, semitones) {
    return String(line || "").replace(new RegExp(CHORD_FIND_RE.source, "g"), (chord) => transposeChord(chord, semitones));
  }

  function transposeChord(chord, semitones) {
    return String(chord || "").replace(/^([A-G](?:#|b)?)(.*?)(?:\/([A-G](?:#|b)?))?$/, (_, root, suffix, bass) => {
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

  const api = {
    CHORD_FIND_RE,
    CHORD_TOKEN_RE,
    isChordProLine,
    normalizeChordProToWords,
    foldStackedChords,
    nextLyricPartnerIndex,
    splitLabeledChordLine,
    isLyricPartner,
    isChartMetaLine,
    mergeChordLyricPair,
    isSectionHeading,
    isChordOnlyLine,
    looksLikeChordProgression,
    expandGluedChords,
    splitGluedChordToken,
    transposeChordLine,
    transposeChord,
    shiftNote,
  };

  Object.keys(api).forEach((key) => {
    root[key] = api[key];
  });
  root.ChordBookChart = api;
  if (typeof module !== "undefined" && module.exports) module.exports = api;
})(typeof globalThis !== "undefined" ? globalThis : this);
