# Deploy AiResumeDraft to airesumedraft.com

The app build is ready on GitHub. Publishing to **https://airesumedraft.com** requires Hostinger access (this agent cannot change your hosting without login/FTP).

## Current blockers (verified)

- `https://airesumedraft.com` — TLS handshake error (SSL not ready / misconfigured)
- `http://airesumedraft.com` and `https://www.airesumedraft.com` — **403 Forbidden** from Hostinger
- GitHub Pages is **not enabled**, so Actions cannot publish either

## Option A — Hostinger File Manager (recommended)

1. hPanel → **Websites** → make sure **airesumedraft.com** has an active website (not only a parked domain).
2. hPanel → **SSL** → issue/enable free SSL for `airesumedraft.com` and `www` until HTTPS works.
3. Download: https://github.com/Suprakashmajee/AIResume/raw/gh-pages/site.zip
4. File Manager → open **public_html** for this domain.
5. Delete Hostinger placeholder files.
6. Upload `site.zip` → **Extract** in `public_html`.
7. Confirm these exist **directly** in `public_html`:
   - `index.html`
   - `assets/`
   - `ads.txt`
   - `.htaccess`
8. Verify:
   - https://airesumedraft.com → title **AiResumeDraft**
   - https://airesumedraft.com/ads.txt → `google.com, pub-9146006984034713, DIRECT, f08c47fec0942fa0`

## Option B — FTP upload

```bash
npm run build
# upload contents of dist/ to public_html (include .htaccess)
```

Or with lftp (fill in your values):

```bash
./scripts/deploy-ftp.sh
```

Environment variables:

- `HOSTINGER_FTP_HOST`
- `HOSTINGER_FTP_USER`
- `HOSTINGER_FTP_PASSWORD`
- `HOSTINGER_FTP_PATH` (default `public_html`)

## Option C — GitHub Pages + DNS

1. Repo **Settings → Pages → Source: GitHub Actions**
2. Re-run workflow **Deploy to GitHub Pages** on `main`
3. In Hostinger DNS, point apex A/AAAA records to GitHub Pages IPs and `www` CNAME to `Suprakashmajee.github.io`
4. Set custom domain `airesumedraft.com` in Pages settings and enable HTTPS

Built artifact branch: [`gh-pages`](https://github.com/Suprakashmajee/AIResume/tree/gh-pages)
