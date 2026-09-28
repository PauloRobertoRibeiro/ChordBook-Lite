const { spawnSync } = require("child_process");
const path = require("path");
const fs = require("fs");

const testsDir = __dirname;

function run(command, args) {
  const result = spawnSync(command, args, {
    cwd: testsDir,
    stdio: "inherit",
    windowsHide: true,
  });
  return result.status == null ? 1 : result.status;
}

const playwrightCli = path.join(testsDir, "node_modules", "@playwright", "test", "cli.js");
if (!fs.existsSync(playwrightCli)) {
  console.error("Instale as dependências de teste:");
  console.error("  cd tests");
  console.error("  npm install");
  console.error("  npx playwright install chromium");
  process.exit(1);
}

const logic = run(process.execPath, [path.join(testsDir, "run-logic.js")]);
if (logic !== 0) process.exit(logic);
const e2e = run(process.execPath, [playwrightCli, "test"]);
process.exit(e2e);
