/**
 * Oráculo musical independente do ChordBook.
 * Usa classes de altura (0–11) a partir das notas naturais e acidentes.
 * Não importa pwa/chart-core.js nem copia NOTES/shiftNote da aplicação.
 */
const NATURAL_PC = { C: 0, D: 2, E: 4, F: 5, G: 7, A: 9, B: 11 };

function pitchClass(note) {
  const match = String(note || "").trim().match(/^([A-G])([#b]?)$/);
  if (!match) return null;
  let pc = NATURAL_PC[match[1]];
  if (match[2] === "#") pc += 1;
  if (match[2] === "b") pc -= 1;
  return ((pc % 12) + 12) % 12;
}

function parseChordToken(token) {
  const match = String(token || "").trim().match(/^([A-G](?:#|b)?)(.*?)(?:\/([A-G](?:#|b)?))?$/);
  if (!match) return null;
  return { root: match[1], suffix: match[2], bass: match[3] || "" };
}

function expectedPitchClass(note, semitones) {
  const pc = pitchClass(note);
  if (pc == null) return null;
  return (pc + Number(semitones) + 1200) % 12;
}

/**
 * Grafias aceites por classe de altura (equivalência enarmónica).
 * Definidas aqui, não a partir da função de transposição da app.
 */
const SPELLINGS = {
  0: ["C", "B#"],
  1: ["C#", "Db"],
  2: ["D"],
  3: ["D#", "Eb"],
  4: ["E", "Fb"],
  5: ["F", "E#"],
  6: ["F#", "Gb"],
  7: ["G"],
  8: ["G#", "Ab"],
  9: ["A"],
  10: ["A#", "Bb"],
  11: ["B", "Cb"],
};

function allowedSpellings(pc) {
  return SPELLINGS[((pc % 12) + 12) % 12];
}

function chordMatchesShift(actualToken, sourceToken, semitones) {
  const actual = parseChordToken(actualToken);
  const source = parseChordToken(sourceToken);
  if (!actual || !source) {
    return { ok: false, reason: `token inválido: actual=${actualToken} origem=${sourceToken}` };
  }
  if (actual.suffix !== source.suffix) {
    return { ok: false, reason: `sufixo alterado: ${source.suffix || "(vazio)"} → ${actual.suffix || "(vazio)"}` };
  }
  const rootPc = expectedPitchClass(source.root, semitones);
  const actualRootPc = pitchClass(actual.root);
  if (actualRootPc !== rootPc) {
    return {
      ok: false,
      reason: `raiz ${source.root}+${semitones} devia ser pc ${rootPc} (${allowedSpellings(rootPc).join("|")}), veio ${actual.root}`,
    };
  }
  if (!allowedSpellings(rootPc).includes(actual.root)) {
    return { ok: false, reason: `grafia inesperada da raiz: ${actual.root}` };
  }
  if (source.bass) {
    const bassPc = expectedPitchClass(source.bass, semitones);
    const actualBassPc = pitchClass(actual.bass);
    if (actualBassPc !== bassPc) {
      return {
        ok: false,
        reason: `baixo ${source.bass}+${semitones} devia ser pc ${bassPc} (${allowedSpellings(bassPc).join("|")}), veio ${actual.bass}`,
      };
    }
    if (!allowedSpellings(bassPc).includes(actual.bass)) {
      return { ok: false, reason: `grafia inesperada do baixo: ${actual.bass}` };
    }
  } else if (actual.bass) {
    return { ok: false, reason: `apareceu baixo inesperado: /${actual.bass}` };
  }
  return { ok: true };
}

module.exports = {
  pitchClass,
  parseChordToken,
  expectedPitchClass,
  allowedSpellings,
  chordMatchesShift,
};
