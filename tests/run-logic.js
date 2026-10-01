const { spawnSync } = require("child_process");
const path = require("path");

const LOGIC = [
  "chart-regression.js",
  "fold-save.js",
  "share-lyrics.js",
  "transpose-12.js",
  "import-merge.js",
  "backup-roundtrip.js",
];

const results = [];
let failed = 0;
for (const file of LOGIC) {
  const started = Date.now();
  const run = spawnSync(process.execPath, [path.join(__dirname, file)], {
    cwd: path.join(__dirname, ".."),
    encoding: "utf8",
  });
  const ok = run.status === 0;
  if (!ok) failed += 1;
  const output = `${run.stdout || ""}${run.stderr || ""}`.trim();
  results.push({
    file,
    ok,
    ms: Date.now() - started,
    output: output || (ok ? "ok" : `exit ${run.status}`),
  });
  console.log(`${ok ? "PASS" : "FAIL"}  lógica  ${file}${ok ? "" : `\n${output}`}`);
}

console.log("---");
console.log(`Lógica: ${results.filter((item) => item.ok).length}/${results.length} passaram`);
process.exit(failed ? 1 : 0);
