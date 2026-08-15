# Bill Store

Free online bill & invoice generator for **bill-store.com**.

## Features

- Landing page with how-it-works, features, templates, audiences, guides, and FAQ
- Interactive invoice generator (edit + live preview)
- 5 professional templates with accent colors
- Line items, discount, tax, shipping, multi-currency
- Logo upload and payment/notes fields
- Auto-save draft in the browser (localStorage)
- Print / Save as PDF
- Google AdSense-ready (`ads.txt`, labeled ad slots, Privacy & Terms)

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

## Deploy

See **[DEPLOY.md](./DEPLOY.md)** for publishing to **bill-store.com**.

1. Run `npm run build`
2. Upload everything inside `dist/` to your host `public_html`
3. Confirm `https://bill-store.com/ads.txt` is reachable for AdSense
