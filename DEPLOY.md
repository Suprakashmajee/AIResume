# Deploy Bill Store to bill-store.com

## Current status (agent cannot finish go-live alone)

| Item | Status |
| --- | --- |
| App build + `gh-pages` artifact | Ready (`site.zip`) |
| DNS `bill-store.com` | Points to Hostinger `82.25.107.211` |
| Live HTTP | `403 Forbidden` (no usable site files / website not serving) |
| Live HTTPS | TLS failure — no certificate on the Hostinger vhost |
| GitHub Pages | Not enabled on the repo |
| Hostinger FTP secrets in Cloud Agent | Not provided (skipped) |

Until Hostinger File Manager upload + SSL **or** GitHub Pages + DNS **or** FTP secrets are available, `https://bill-store.com` cannot show Bill Store.

Domain **bill-store.com** is on Hostinger (DNS A → `82.25.107.211`). The live site currently returns **403** until files are uploaded into the website document root and the Hostinger website + SSL are healthy.

## Build artifact

```bash
npm ci
npm run build
cp dist/index.html dist/404.html
```

Upload **everything inside `dist/`** into Hostinger `public_html` for this domain (include `.htaccess` and `ads.txt`).

Downloadable zip (from GitHub Pages branch after publish):  
https://github.com/Suprakashmajee/AIResume/raw/gh-pages/site.zip

## Option A — Hostinger File Manager (recommended)

1. hPanel → **Websites** → open **bill-store.com** (create/activate the website if it is only parked).
2. hPanel → **SSL** → issue free SSL for `bill-store.com` (+ `www` if used) until HTTPS works.
3. File Manager → open **public_html** for bill-store.com.
4. Delete Hostinger placeholder / default files.
5. Upload `site.zip` → **Extract** in `public_html` (or upload the contents of `dist/`).
6. Confirm these exist directly in `public_html`:
   - `index.html`
   - `assets/`
   - `ads.txt`
   - `.htaccess`
7. Verify:
   - https://bill-store.com → title **Bill Store**
   - https://bill-store.com/ads.txt → `google.com, pub-9146006984034713, DIRECT, f08c47fec0942fa0`
   - https://bill-store.com/generator and `/privacy` load (SPA rewrite)

## Option B — FTP from this repo

```bash
export HOSTINGER_FTP_HOST=ftp.bill-store.com   # or the host shown in hPanel → FTP Accounts
export HOSTINGER_FTP_USER=...
export HOSTINGER_FTP_PASSWORD=...
export HOSTINGER_FTP_PATH=public_html           # or the path for this domain
./scripts/deploy-ftp.sh
```

## Option C — GitHub Pages

1. Repo **Settings → Pages → Source: Deploy from a branch** → `gh-pages` / root (or GitHub Actions).
2. Custom domain: `bill-store.com` (CNAME file is already in the build).
3. If using Pages instead of Hostinger hosting, point DNS A/AAAA (or ALIAS) to GitHub Pages — this **replaces** the current Hostinger A record.

## AdSense after go-live

1. Confirm `https://bill-store.com/ads.txt` is publicly reachable.
2. Add the site in AdSense and create ad units.
3. Replace placeholder `data-ad-slot` values in `src/components/AdSlot.tsx`.
