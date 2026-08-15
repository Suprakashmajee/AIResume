# AiResumeDraft

AI-assisted resume builder for **airesumedraft.com**.

## Features

- Landing page with templates, examples, AI highlights, reviews, and FAQ
- Multi-step resume builder with live preview
- 5 ATS-friendly templates and accent color customization
- AI suggestion helpers for summaries, bullets, and skills
- Local draft persistence in the browser (per Google account when signed in)
- Login / logout with **Continue with Google (Gmail)**
- TXT download and Print/PDF export
- Google AdSense + `ads.txt`

## Develop

```bash
npm install
cp .env.example .env
# set VITE_GOOGLE_CLIENT_ID in .env
npm run dev
```

## Google login setup

1. Open [Google Cloud Console](https://console.cloud.google.com/) → APIs & Services → Credentials
2. Create an **OAuth client ID** (application type: Web application)
3. Authorized JavaScript origins:
   - `https://airesumedraft.com`
   - `https://www.airesumedraft.com`
   - `http://localhost:5173`
4. Copy the Client ID into `.env`:

```bash
VITE_GOOGLE_CLIENT_ID=your-client-id.apps.googleusercontent.com
```

5. Rebuild and redeploy (`npm run build`, upload `dist/` to Hostinger)

## Build

```bash
npm run build
npm run preview
```

## Deploy

See **[DEPLOY.md](./DEPLOY.md)** for full publishing steps to **airesumedraft.com** (Hostinger, FTP, or GitHub Pages).

Quick path:

1. Run `npm run build` (with `VITE_GOOGLE_CLIENT_ID` set)
2. Upload everything inside `dist/` to Hostinger `public_html`
3. Confirm `https://airesumedraft.com/ads.txt` is reachable for AdSense

Quick Hostinger zip: https://github.com/Suprakashmajee/AIResume/raw/gh-pages/site.zip
