// Builds the password-protected GitHub Pages copy of the Alpha DS site.
//
//   SITE_PASSWORD=… node tools/encrypt-site.mjs <unpacked-site-source> <output-dir>
//
// The page (index.html) and every JSON data file are encrypted with AES-256-GCM. The key comes from
// SITE_PASSWORD through PBKDF2-SHA256 (600 000 rounds) with a fresh random salt on every build, so a new
// build (or a new password) signs everyone out. The sign-in page is the site's own login.html with its
// server check replaced by an in-browser decrypt. Images, fonts, cover.webp and logo.webp stay as plain files.
// The password is read from the environment only and is never printed or written to disk.
import { createCipheriv, pbkdf2Sync, randomBytes } from 'node:crypto';
import { cpSync, existsSync, mkdirSync, readdirSync, readFileSync, rmSync, statSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const [src, out] = process.argv.slice(2);
const pw = process.env.SITE_PASSWORD || '';
if (!src || !out) { console.error('usage: node tools/encrypt-site.mjs <source> <output>'); process.exit(2); }
if (pw.length < 8) { console.error('SITE_PASSWORD is missing or shorter than 8 characters.'); process.exit(1); }

const ITER = 600000;
const salt = randomBytes(16);
const key = pbkdf2Sync(pw, salt, ITER, 32, 'sha256');
const enc = buf => { const iv = randomBytes(12); const c = createCipheriv('aes-256-gcm', key, iv); const ct = Buffer.concat([c.update(buf), c.final()]); return Buffer.concat([iv, ct, c.getAuthTag()]); };

// 1. Copy only what the site serves (no server auth, Dockerfile, CI files or the server sign-in page).
rmSync(out, { recursive: true, force: true }); mkdirSync(out, { recursive: true });
for (const f of ['index.html', 'vars.json', 'cover.webp', 'logo.webp', 'plugins', 'graphs', 'icons']) {
  if (existsSync(join(src, f))) cpSync(join(src, f), join(out, f), { recursive: true });
}

// 2. Encrypt every JSON data file to <name>.json.enc (12-byte IV + ciphertext + 16-byte tag) and drop the plain copy.
let nJson = 0;
const walk = d => { for (const n of readdirSync(d)) { const p = join(d, n); if (statSync(p).isDirectory()) walk(p); else if (n.endsWith('.json')) { writeFileSync(p + '.enc', enc(readFileSync(p))); rmSync(p); nJson++; } } };
walk(out);

// 3. Encrypt the page and wrap it in the sign-in page.
const page = enc(readFileSync(join(src, 'index.html')));
const payload = { s: salt.toString('base64'), i: ITER, d: page.toString('base64') };
let gate = readFileSync(join(src, 'login.html'), 'utf8');
if (!gate.includes('id="f"') || !gate.includes('id="pw"') || !gate.includes('</body>')) { console.error('login.html does not have the expected sign-in form.'); process.exit(1); }
// The gate script runs after login.html's own script and takes over the form submit (capture phase),
// so the theme, density and show-password controls keep working unchanged.
const g = readFileSync(new URL('./gate.js.html', import.meta.url), 'utf8').replace('/*PAYLOAD*/', () => JSON.stringify(payload));
const end = gate.lastIndexOf('</body>');
gate = gate.slice(0, end) + g + '\n' + gate.slice(end);
gate = gate.replace(/<head>/i, '<head>\n<meta name="robots" content="noindex, nofollow">');
// Footer "Published" stamp = the moment this GitHub build runs (UAE time, UTC+4).
const uae = new Date(Date.now() + 4 * 3600e3), M = ['January','February','March','April','May','June','July','August','September','October','November','December'], z = n => String(n).padStart(2, '0');
gate = gate.replace(/<time data-ds="published" datetime="[^"]*">[^<]*<\/time>/, `<time data-ds="published" datetime="${uae.toISOString().slice(0, 19)}+04:00">${z(uae.getUTCDate())} ${M[uae.getUTCMonth()]} ${uae.getUTCFullYear()}, ${z(uae.getUTCHours())}:${z(uae.getUTCMinutes())} UAE</time>`);
writeFileSync(join(out, 'index.html'), gate);

// 4. Pages extras: no Jekyll processing, no search indexing.
writeFileSync(join(out, '.nojekyll'), '');
writeFileSync(join(out, 'robots.txt'), 'User-agent: *\nDisallow: /\n');
console.log(`Encrypted the page and ${nJson} data files into ${out}`);
