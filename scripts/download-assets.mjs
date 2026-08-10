// Downloads all real assets referenced by lucidtrading.com into public/, preserving directory structure.
//
// NOTE: lucidtrading.com is behind a WAF/bot-protection that returns 403 for any
// request to /wp-content/* that doesn't carry a real browser fingerprint/cookies
// (confirmed: plain Node fetch() gets 403 on every asset, even though the exact
// same URL loads fine when navigated to directly in a real browser tab). This
// script is kept for reference / in case the block is IP- or environment-specific,
// but in this environment it will fail. The actual assets checked into public/
// were captured via cropped browser screenshots of the live, rendered page
// (see docs/research/lucidtrading.com/ for details) — real pixels, just PNG
// crops rather than the original source files.
import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDir = join(__dirname, "..", "public");

const ORIGIN = "https://lucidtrading.com";

const assets = [
  // Partner logos
  { url: `${ORIGIN}/wp-content/uploads/2025/10/Untitled-design-2025-10-08T104231.482.png`, out: "images/partners/ninjatrader.png" },
  { url: `${ORIGIN}/wp-content/uploads/2025/10/Untitled-design-2025-10-08T104127.221.png`, out: "images/partners/tradovate.png" },
  { url: `${ORIGIN}/wp-content/uploads/2026/02/Logo-lockup.png`, out: "images/partners/tradesea.png" },
  { url: `${ORIGIN}/wp-content/uploads/2025/08/Untitled-design-2025-08-09T140552.561.png`, out: "images/partners/rithmic.png" },
  { url: `${ORIGIN}/wp-content/uploads/2025/08/Untitled-design-2025-08-09T135554.521.png`, out: "images/partners/motivewave.png" },
  { url: `${ORIGIN}/wp-content/uploads/2025/08/Copy-of-Untitled-1.png`, out: "images/partners/quantower.png" },
  // Hero decorative glow + logo mark
  { url: `${ORIGIN}/wp-content/uploads/2025/09/luciddarkmode-2-4.png`, out: "images/hero-glow.png" },
  { url: `${ORIGIN}/wp-content/uploads/2025/02/Untitled-design-2025-10-22T181841.622.png`, out: "images/nav-logo-lockup.png" },
  { url: `${ORIGIN}/wp-content/uploads/2025/07/Untitled-design-2025-08-09T163728.386.png`, out: "images/discord-widget-icon.png" },
  // Favicons / SEO
  { url: `${ORIGIN}/wp-content/uploads/2025/02/Untitled-design-2025-07-09T133817.490-100x100.png`, out: "seo/favicon-32.png" },
  { url: `${ORIGIN}/wp-content/uploads/2025/02/Untitled-design-2025-07-09T133817.490.png`, out: "seo/apple-touch-icon.png" },
  { url: `${ORIGIN}/wp-content/uploads/2025/04/Social-Share-Lucid-Trading.png`, out: "seo/social-share.png" },
];

async function downloadOne({ url, out }) {
  const dest = join(publicDir, out);
  await mkdir(dirname(dest), { recursive: true });
  const res = await fetch(url);
  if (!res.ok) {
    console.error(`FAILED ${res.status} ${url}`);
    return;
  }
  const buf = Buffer.from(await res.arrayBuffer());
  await writeFile(dest, buf);
  console.log(`OK  ${out}  (${buf.length} bytes)`);
}

async function run() {
  const batchSize = 4;
  for (let i = 0; i < assets.length; i += batchSize) {
    const batch = assets.slice(i, i + batchSize);
    await Promise.all(batch.map((a) => downloadOne(a).catch((e) => console.error(a.url, e.message))));
  }
}

run();
