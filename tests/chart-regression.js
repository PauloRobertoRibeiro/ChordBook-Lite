const assert = require("assert");
const path = require("path");
const chart = require(path.join(__dirname, "..", "pwa", "chart-core.js"));

const SAMPLE = `{key: C}
Intro:
C | G/B | Am7 | Fmaj7
Verso:
[C]Luz [G/B]no [Am7]caminho [Fmaj7]hoje
Dm7 | G7 | C/E | Bb | F#dim | Cadd9
C/E | C7M | C° | C9 | Csus4`;

function linesOf(text) {
  return text.replace(/\r/g, "").split("\n");
}

function normalizeChord(token) {
  return chart.transposeChord(token, 0).replace(/^Bb/, "A#");
}

function tokensOf(line) {
  return line.replace(/\|/g, " ").trim().split(/\s+/).filter(Boolean);
}

function chordsMusicallyEqual(actualLine, expectedLine) {
  const actual = tokensOf(actualLine).map(normalizeChord);
  const expected = tokensOf(expectedLine).map(normalizeChord);
  assert.deepStrictEqual(actual, expected, `${actualLine} !== ${expectedLine}`);
}

const folded = chart.foldStackedChords(linesOf(SAMPLE));
const again = chart.foldStackedChords(folded);

assert.strictEqual(folded.join("\n"), again.join("\n"), "salvar de novo não deve alterar a cifra");
assert.ok(folded.includes("{key: C}"));
assert.ok(folded.includes("Intro:"));
assert.ok(folded.includes("C | G/B | Am7 | Fmaj7"), "a intro deve manter a estrutura");
assert.ok(folded.includes("Verso:"));
assert.ok(folded.some((line) => /\[C\]Luz/.test(line) && /\[G\/B\]no/.test(line) && /caminho/.test(line)), "a letra ChordPro deve permanecer");
assert.ok(folded.includes("Dm7 | G7 | C/E | Bb | F#dim | Cadd9"), "a linha de acordes não deve virar letra");
assert.ok(folded.includes("C/E | C7M | C° | C9 | Csus4"), "a última linha não pode ser fundida");
assert.ok(chart.isChordOnlyLine("C/E | C7M | C° | C9 | Csus4"));
assert.ok(!chart.isLyricPartner("C/E | C7M | C° | C9 | Csus4"));

const transposed = folded.map((line) => chart.transposeChordLine(line, 2));
const last = transposed[transposed.length - 1];
chordsMusicallyEqual(last, "D/F# | D7M | D° | D9 | Dsus4");

assert.strictEqual(chart.transposeChord("C/E", 2), "D/F#");
assert.strictEqual(chart.transposeChord("C7M", 2), "D7M");
assert.strictEqual(chart.transposeChord("C°", 2), "D°");
assert.strictEqual(chart.transposeChord("C9", 2), "D9");
assert.strictEqual(chart.transposeChord("Csus4", 2), "Dsus4");
assert.strictEqual(chart.transposeChord("G/B", 2), "A/C#");
assert.strictEqual(chart.transposeChord("Am7", 2), "Bm7");
assert.strictEqual(chart.transposeChord("Fmaj7", 2), "Gmaj7");

const stacked = chart.foldStackedChords(["C   G   Am", "luz no caminho"]);
assert.ok(stacked.length === 1 && stacked[0].includes("[") && /luz/i.test(stacked[0]), "acordes sobre a letra continuam a ser fundidos");

const unknownQuality = chart.foldStackedChords([
  "Dm7 | G7 | C/E | Bb",
  "C/E | C7M | Cx | C9 | Csus4",
]);
assert.strictEqual(unknownQuality.length, 2, "um acorde desconhecido não pode transformar a linha inteira em letra");
assert.ok(unknownQuality[1].includes("C7M"));

function chordOrder(line) {
  return [...String(line || "").matchAll(/\[([^\]]+)\]/g)].map((match) => match[1]);
}

const gloria = chart.foldStackedChords([
  "D                    F#m           G                       A     D",
  "Alma Bendice al Señor Rey potente de Gloria",
]);
assert.deepStrictEqual(chordOrder(gloria[0]).slice(-2), ["A", "D"], "A D no fim da frase não podem inverter para D A");

const gloriaTail = chart.foldStackedChords([
  "                                        A     D",
  "de Gloria",
]);
assert.deepStrictEqual(chordOrder(gloriaTail[0]), ["A", "D"]);
assert.ok(/\[A\]de/.test(gloriaTail[0]) && /\[D\]Gloria/.test(gloriaTail[0]), "A deve ficar em de e D em Gloria");

console.log("chart-regression: ok");
