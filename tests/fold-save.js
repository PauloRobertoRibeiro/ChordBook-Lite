const assert = require("assert");
const path = require("path");
const chart = require(path.join(__dirname, "..", "pwa", "chart-core.js"));
const { FUSION_CHART, LIFECYCLE_CHART } = require("./lib/fixtures");

function linesOf(text) {
  return text.replace(/\r/g, "").split("\n");
}

function foldMany(lines, times) {
  let current = lines.slice();
  for (let index = 0; index < times; index += 1) {
    current = chart.foldStackedChords(current);
  }
  return current;
}

const fusion = linesOf(FUSION_CHART);
const once = chart.foldStackedChords(fusion);
const twenty = foldMany(fusion, 20);
assert.deepStrictEqual(twenty, once, "20 saves não podem alterar a cifra depois da primeira interpretação");
assert.strictEqual(once.filter((line) => line.includes("C/E | C7M | C°")).length, 1);
assert.ok(!once.some((line) => /\[C\/E\].*C7M/.test(line) && /C°/.test(line) && /Luz/.test(line)), "as duas linhas de acordes não podem fundir-se com letra");
assert.deepStrictEqual(
  once.filter((line) => /\|/.test(line) && !/\[/.test(line)),
  [
    "C | G/B | Am7 | Fmaj7",
    "Dm7 | G7 | C/E | Bb | F#dim | Cadd9",
    "C/E | C7M | C° | C9 | Csus4",
  ],
);

const life = linesOf(LIFECYCLE_CHART);
const lifeOnce = chart.foldStackedChords(life);
const lifeAgain = foldMany(lifeOnce, 8);
assert.deepStrictEqual(lifeAgain, lifeOnce);
assert.ok(lifeOnce.includes(""));
assert.ok(lifeOnce.some((line) => line.includes("Primeira") && line.includes("[G]")));
assert.ok(lifeOnce.some((line) => line.includes("Segunda linha fica")));

console.log("fold-save: ok");
