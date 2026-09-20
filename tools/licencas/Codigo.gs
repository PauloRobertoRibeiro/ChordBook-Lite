/**
 * ChordBook Lite — licenças (número fixo + CVV que muda).
 * Cole este ficheiro e Admin.html num projeto em https://script.google.com
 * Propiedades de script:
 *   ADMIN_KEY = senha só sua
 *   PAYPAL_RECEIVER = e-mail da conta PayPal que recebe os 5 €
 * Deploy → Web app → Execute as: Me → Who has access: Anyone.
 * Depois de colar código novo: Gerenciar implantações → lápis → Nova versão.
 */
const PROP = PropertiesService.getScriptProperties();
const SITE = "https://chordbook.jogaraprender.com";
const PRICE_MIN = 4.99;
const PRICE_MAX = 5.5;

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

function doPost(e) {
  try {
    const raw = e && e.postData && e.postData.contents ? String(e.postData.contents) : "";
    if (raw) paypalIpn_(raw);
  } catch (err) {
    Logger.log("IPN " + err);
  }
  return ContentService.createTextOutput("OK");
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
  const expected = String(PROP.getProperty("ADMIN_KEY") || "").trim();
  return expected.length > 0 && String(key || "").trim() === expected;
}

function checkKeySet() {
  const v = String(PROP.getProperty("ADMIN_KEY") || "").trim();
  Logger.log(v ? "ADMIN_KEY ok, comprimento " + v.length : "ADMIN_KEY em falta");
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

function groupNumber_(n) {
  return String(n || "").replace(/\D/g, "").replace(/(.{4})/g, "$1 ").trim();
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

function sendLicenseEmail_(row) {
  const email = String(row.email || "").trim();
  if (!email || email.indexOf("@") < 0) return false;
  const number = groupNumber_(row.number);
  const body =
    "Obrigado pela compra do ChordBook Lite (5 EUR).\n\n" +
    "Numero (fixo, e seu): " + number + "\n" +
    "CVV (uma vez): " + row.cvv + "\n\n" +
    "1. Descarregue o ficheiro ChordBook.apk:\n" + SITE + "/ChordBook.apk\n" +
    "2. Instale no Android. Se pedir, permita esta fonte.\n" +
    "3. Abra o app e escreva o numero e o CVV.\n\n" +
    "O CVV so funciona uma vez, neste telemovel. Nao o reencaminhe.\n" +
    "O numero nao muda. Se mudar de telemovel, peca um CVV novo.\n\n" +
    "Ajuda: " + SITE + "/comprar.html\n";
  MailApp.sendEmail({
    to: email,
    subject: "ChordBook Lite - numero e CVV",
    body: body,
    name: "ChordBook Lite",
    replyTo: "ribeirorobertopaulo@gmail.com",
  });
  return true;
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
    let emailed = false;
    try {
      emailed = sendLicenseEmail_(row);
    } catch (err) {
      Logger.log("email " + err);
    }
    return { ok: true, number: row.number, cvv: row.cvv, emailed: emailed };
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
    let emailed = false;
    try {
      emailed = sendLicenseEmail_(row);
    } catch (err) {
      Logger.log("email " + err);
    }
    return { ok: true, number: row.number, cvv: row.cvv, emailed: emailed };
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
      device: row.device ? "sim" : "nao",
      created: row.created || "",
    })),
  };
}

function parseForm_(raw) {
  const out = {};
  String(raw).split("&").forEach((part) => {
    const i = part.indexOf("=");
    if (i < 0) return;
    const key = decodeURIComponent(part.slice(0, i).replace(/\+/g, " "));
    const value = decodeURIComponent(part.slice(i + 1).replace(/\+/g, " "));
    out[key] = value;
  });
  return out;
}

function verifyIpn_(raw) {
  const res = UrlFetchApp.fetch("https://ipnpb.paypal.com/cgi-bin/webscr", {
    method: "post",
    contentType: "application/x-www-form-urlencoded",
    payload: "cmd=_notify-validate&" + raw,
    muteHttpExceptions: true,
    followRedirects: true,
  });
  return String(res.getContentText() || "").trim() === "VERIFIED";
}

function paypalIpn_(raw) {
  if (!verifyIpn_(raw)) {
    Logger.log("IPN não verificado");
    return;
  }
  const fields = parseForm_(raw);
  if (String(fields.payment_status || "") !== "Completed") return;
  const txn = String(fields.txn_id || "").slice(0, 64);
  if (!txn) return;
  const gross = Number(String(fields.mc_gross || "0").replace(",", "."));
  const currency = String(fields.mc_currency || "").toUpperCase();
  if (currency !== "EUR" || !(gross >= PRICE_MIN && gross <= PRICE_MAX)) {
    Logger.log("IPN valor " + gross + " " + currency);
    return;
  }
  const expected = String(PROP.getProperty("PAYPAL_RECEIVER") || "").trim().toLowerCase();
  const receiver = String(fields.receiver_email || fields.business || "").trim().toLowerCase();
  if (expected && receiver && receiver !== expected) {
    Logger.log("IPN destinatário " + receiver);
    return;
  }
  const email = String(fields.payer_email || "").trim();
  if (!email || email.indexOf("@") < 0) return;

  const lock = LockService.getScriptLock();
  lock.waitLock(15000);
  try {
    const used = JSON.parse(PROP.getProperty("paypal_txns") || "[]");
    if (used.indexOf(txn) >= 0) return;
    used.push(txn);
    if (used.length > 400) used.splice(0, used.length - 400);
    PROP.setProperty("paypal_txns", JSON.stringify(used));
    const rows = load_();
    const row = {
      number: newNumber_(),
      cvv: newCvv_(),
      email: email.slice(0, 120),
      device: "",
      token: "",
      created: new Date().toISOString(),
      txn: txn,
    };
    rows.push(row);
    save_(rows);
    try {
      sendLicenseEmail_(row);
    } catch (err) {
      Logger.log("email " + err);
    }
  } finally {
    lock.releaseLock();
  }
}
