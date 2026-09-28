const assert = require("assert");
const path = require("path");
const chart = require(path.join(__dirname, "..", "pwa", "chart-core.js"));
const music = require("./lib/music");
const { TRANSPOSE_TOKENS } = require("./lib/fixtures");

const NAMED_PLUS_TWO = [
  ["C", "D"],
  ["Am", "Bm"],
  ["G7", "A7"],
  ["C9", "D9"],
  ["C°", "D°"],
  ["C7M", "D7M"],
  ["F#dim", "G#dim"],
  ["Bb", "C"],
  ["G/B", "A/C#"],
];

for (const [source, expected] of NAMED_PLUS_TWO) {
  const actual = chart.transposeChord(source, 2);
  const check = music.chordMatchesShift(actual, source, 2);
  assert.ok(check.ok, `${source}+2: ${check.reason || actual}`);
  const expectedCheck = music.chordMatchesShift(expected, source, 2);
  assert.ok(expectedCheck.ok, `tabela nomeada inválida para ${source}+2 → ${expected}: ${expectedCheck.reason}`);
  const actualParsed = music.parseChordToken(actual);
  const expectedParsed = music.parseChordToken(expected);
  assert.strictEqual(music.pitchClass(actualParsed.root), music.pitchClass(expectedParsed.root), `${source}+2 raiz ${actual} vs ${expected}`);
  if (expectedParsed.bass) {
    assert.strictEqual(music.pitchClass(actualParsed.bass), music.pitchClass(expectedParsed.bass), `${source}+2 baixo ${actual} vs ${expected}`);
  }
}

for (const token of TRANSPOSE_TOKENS) {
  for (let semitones = 0; semitones < 12; semitones += 1) {
    const actual = chart.transposeChord(token, semitones);
    const check = music.chordMatchesShift(actual, token, semitones);
    assert.ok(check.ok, `${token} + ${semitones} → ${actual}: ${check.reason}`);
    const roundTrip = chart.transposeChord(actual, 12 - semitones);
    const back = music.chordMatchesShift(roundTrip, token, 0);
    assert.ok(back.ok, `${token} ida +${semitones} volta: ${roundTrip} (${back.reason})`);
  }
}

const line = "C | G/B | Am7 | Fmaj7 | C° | C7M | F#dim | Bb";
const shifted = chart.transposeChordLine(line, 2);
const parts = shifted.split("|").map((part) => part.trim());
const sources = line.split("|").map((part) => part.trim());
assert.strictEqual(parts.length, sources.length);
parts.forEach((part, index) => {
  const check = music.chordMatchesShift(part, sources[index], 2);
  assert.ok(check.ok, `linha +2 token ${sources[index]} → ${part}: ${check.reason}`);
});

console.log("transpose-12: ok");
