/**
 * ChordBook Lite — licenças (número fixo + CVV que muda).
 * Cole este ficheiro e Admin.html num projeto em https://script.google.com
 * Em Project Settings → Script properties: ADMIN_KEY = uma senha só sua.
 * Deploy → New deployment → Web app → Execute as: Me → Who has access: Anyone.
 */
const PROP = PropertiesService.getScriptProperties();

function doGet(e) {
  const p = e && e.parameter ? e.parameter : {};
  const action = String(p.action || "");
  if (action === "activate") return json_(activate_(p.number, p.cvv, p.device));
  if (action === "check") return json_(check_(p.number, p.device, p.token));
  if (action === "issue") return json_(adminIssue_(p.key, p.email));
  if (action === "rotate") return json_(adminRotate_(p.key, p.number));
  if (action === "list") return json_(adminList_(p.key));
  return HtmlService.createHtmlOutputFromFile("Admin")
    .setTitle("Licenças ChordBook Lite")
    .addMetaTag("viewport", "width=device-width, initial-scale=1");
}

function json_(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

function adminIssue(key, email) {
  return adminIssue_(key, email);
}

function adminRotate(key, number) {
  return adminRotate_(key, number);
}

function adminList(key) {
  return adminList_(key);
}

function adminOk_(key) {
  const expected = String(PROP.getProperty("ADMIN_KEY") || "");
  return expected && String(key || "") === expected;
}

function load_() {
  const raw = PROP.getProperty("licenses");
  try {
    return raw ? JSON.parse(raw) : [];
  } catch (err) {
    return [];
  }
}

function save_(rows) {
  PROP.setProperty("licenses", JSON.stringify(rows));
}

function luhn_(digits) {
  let sum = 0;
  let alt = false;
  for (let i = digits.length - 1; i >= 0; i--) {
    let n = Number(digits.charAt(i));
    if (alt) {
      n *= 2;
      if (n > 9) n -= 9;
    }
    sum += n;
    alt = !alt;
  }
  return sum % 10 === 0;
}

function newNumber_() {
  for (let i = 0; i < 20; i++) {
    let body = "61";
    for (let j = 0; j < 13; j++) body += String(Math.floor(Math.random() * 10));
    let check = 0;
    for (let d = 0; d < 10; d++) {
      if (luhn_(body + String(d))) {
        check = d;
        break;
      }
    }
    const number = body + String(check);
    const rows = load_();
    if (!rows.some((row) => row.number === number)) return number;
  }
  throw new Error("number");
}

function newCvv_() {
  return String(100 + Math.floor(Math.random() * 900));
}

function newToken_() {
  const bytes = Utilities.getUuid().replace(/-/g, "");
  return bytes.slice(0, 24);
}

function cleanNumber_(value) {
  return String(value || "").replace(/\D/g, "");
}

function activate_(numberRaw, cvvRaw, deviceRaw) {
  const number = cleanNumber_(numberRaw);
  const cvv = String(cvvRaw || "").replace(/\D/g, "");
  const device = String(deviceRaw || "").slice(0, 64);
  if (number.length !== 16 || !luhn_(number) || cvv.length !== 3 || !device) {
    return { ok: false, error: "invalid" };
  }
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const rows = load_();
    const row = rows.find((item) => item.number === number);
    if (!row) return { ok: false, error: "unknown" };
    if (String(row.cvv) !== cvv) return { ok: false, error: "cvv" };
    row.device = device;
    row.token = newToken_();
    row.cvv = newCvv_();
    row.activatedAt = new Date().toISOString();
    save_(rows);
    return { ok: true, number: number, token: row.token };
  } finally {
    lock.releaseLock();
  }
}

function check_(numberRaw, deviceRaw, tokenRaw) {
  const number = cleanNumber_(numberRaw);
  const device = String(deviceRaw || "");
  const token = String(tokenRaw || "");
  const row = load_().find((item) => item.number === number);
  if (!row || !token || row.token !== token || row.device !== device) {
    return { ok: false, error: "revoked" };
  }
  return { ok: true, number: number };
}

function adminIssue_(key, email) {
  if (!adminOk_(key)) return { ok: false, error: "admin" };
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const rows = load_();
    const row = {
      number: newNumber_(),
      cvv: newCvv_(),
      email: String(email || "").slice(0, 120),
      device: "",
      token: "",
      created: new Date().toISOString(),
    };
    rows.push(row);
    save_(rows);
    return { ok: true, number: row.number, cvv: row.cvv };
  } finally {
    lock.releaseLock();
  }
}

function adminRotate_(key, numberRaw) {
  if (!adminOk_(key)) return { ok: false, error: "admin" };
  const number = cleanNumber_(numberRaw);
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const rows = load_();
    const row = rows.find((item) => item.number === number);
    if (!row) return { ok: false, error: "unknown" };
    row.cvv = newCvv_();
    row.device = "";
    row.token = "";
    save_(rows);
    return { ok: true, number: row.number, cvv: row.cvv };
  } finally {
    lock.releaseLock();
  }
}

function adminList_(key) {
  if (!adminOk_(key)) return { ok: false, error: "admin" };
  return {
    ok: true,
    rows: load_().map((row) => ({
      number: row.number,
      cvv: row.cvv,
      email: row.email || "",
      device: row.device ? "sim" : "não",
      created: row.created || "",
    })),
  };
}
