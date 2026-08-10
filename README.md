# AiResumeDraft

AI-assisted resume builder for **airesumedraft.com**.

## Features

- Landing page with templates, examples, AI highlights, reviews, and FAQ
- Multi-step resume builder with live preview
- 5 ATS-friendly templates and accent color customization
- AI suggestion helpers for summaries, bullets, and skills
- Local draft persistence in the browser
- TXT download and Print/PDF export
- Google AdSense + `ads.txt`

## Develop

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## Deploy to airesumedraft.com (Hostinger)

1. Run `npm run build`
2. Upload everything inside `dist/` to Hostinger `public_html` (includes `.htaccess` for React Router)
3. Confirm `https://airesumedraft.com/ads.txt` is reachable for AdSense

### GitHub Pages backup

1. Repo Settings → Pages → Source: **GitHub Actions**
2. Push to `main` (or run the Deploy workflow)
3. Set custom domain to `airesumedraft.com`
4. Point Hostinger DNS A records to GitHub Pages IPs and `www` CNAME to `Suprakashmajee.github.io`
