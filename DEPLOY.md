# Deploy Bill Store to bill-store.com

## Build

```bash
npm install
npm run build
```

Upload the contents of `dist/` (including `ads.txt`, `.htaccess` if present, and `CNAME` when using GitHub Pages) to your host document root.

## Checklist

1. Point DNS for `bill-store.com` (and `www` if used) to your host
2. Enable SSL / HTTPS
3. Confirm:
   - `https://bill-store.com` loads **Bill Store**
   - `https://bill-store.com/ads.txt` returns:
     `google.com, pub-9146006984034713, DIRECT, f08c47fec0942fa0`
   - `/privacy` and `/terms` are reachable (SPA fallback / `.htaccess`)
4. In Google AdSense, add the site and replace placeholder ad slot IDs in `AdSlot` when you create real units

## Option — FTP

```bash
./scripts/deploy-ftp.sh
```

Environment variables:

- `HOSTINGER_FTP_HOST`
- `HOSTINGER_FTP_USER`
- `HOSTINGER_FTP_PASSWORD`
- `HOSTINGER_FTP_PATH` (default `public_html`)

## GitHub Pages

`public/CNAME` is set to `bill-store.com`. Enable Pages and configure the custom domain + HTTPS in repository settings.
