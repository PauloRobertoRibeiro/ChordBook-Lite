const assert = require("assert");
const path = require("path");
require(path.join(__dirname, "..", "pwa", "chart-core.js"));
const share = require(path.join(__dirname, "..", "pwa", "share-lyrics.js"));

const lyrics = share.lyricsOnlyFromLines([
  "{key: G}",
  "[G]Quando a noite vem, eu [D/F#]lembro",
  "G          C",
  "Grande é o Senhor",
  "",
  "Coro:",
  "[C]Aleluia, [G]minha alma canta",
]);
assert.ok(!lyrics.includes("["), "a letra partilhada não pode ter [G]");
assert.ok(lyrics.includes("Quando a noite vem, eu lembro"));
assert.ok(lyrics.includes("Grande é o Senhor"));
assert.ok(lyrics.includes("Coro:"));
assert.ok(!/^G\s+C$/m.test(lyrics), "linhas só de cifra não vão no WhatsApp");

(async () => {
  const pack = share.buildSharePack("Culto Domingo", [
    { title: "Meu Abrigo", lines: ["{key: G}", "[G]Quando a noite vem, eu [D/F#]lembro"] },
    { title: "Amazing Grace", lines: ["[C]Amazing [F]grace"] },
  ]);
  assert.strictEqual(pack.s.length, 2);
  assert.strictEqual(pack.s[0].l, "Quando a noite vem, eu lembro");
  const encoded = await share.encodeSharePayload(pack);
  const back = await share.decodeSharePayload(encoded);
  assert.strictEqual(back.t, "Culto Domingo");
  assert.strictEqual(back.s[1].t, "Amazing Grace");
  assert.strictEqual(back.s[1].l, "Amazing grace");
  const url = share.shareLyricsUrl(encoded, "https://chordbook.jogaraprender.com/");
  assert.ok(url.includes("cantar.html#c="));
  const invite = share.formatLyricsInvite("Culto Domingo", "https://chordbook.jogaraprender.com/cantar.html?s=hEhcJK");
  assert.strictEqual(invite, "Culto Domingo\nhttps://chordbook.jogaraprender.com/cantar.html?s=hEhcJK");
  assert.ok(!invite.includes("•"));
  assert.ok(!invite.includes("sin acordes"));
  assert.ok(!invite.includes("#c="));
  assert.strictEqual(share.slugFromShortUrl("http://spoo.me/hEhcJK"), "hEhcJK");
  assert.strictEqual(share.slugFromShortUrl("https://evil.example/hEhcJK"), "");
  const short = share.publicShareUrl("hEhcJK", "https://chordbook.jogaraprender.com/");
  assert.strictEqual(short, "https://chordbook.jogaraprender.com/cantar.html?s=hEhcJK");
  assert.ok(short.length < 80);
  console.log("share-lyrics: ok");
})().catch((error) => {
  console.error(error);
  process.exit(1);
});
