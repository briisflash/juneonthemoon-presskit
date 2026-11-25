# Sessions on the Moon — MVP prototype

This prototype lives in `platform/` and does **not** replace the original June on the Moon press kit at the repository root.

## Preview

Because it uses plain HTML, CSS and JavaScript, there is no npm installation or framework build required.

From the repository root:

```sh
python3 -m http.server 8000
```

Open `http://localhost:8000/platform/`. Alternatively, use a static preview server in Cursor.

## Pages

- `platform/index.html` — collective homepage
- `platform/artists.html` — searchable artist directory
- `platform/artist.html?slug=june-on-the-moon` — reusable artist profile
- `platform/videos.html` — searchable video catalogue with click-to-play YouTube embed
- `platform/data.js` — central source of artist and video records
- `platform/styles.css` — design system
- `platform/app.js` — rendering, filtering and video-player logic

## Adding an artist

Edit `platform/data.js` and add an object to `artists` with a **unique slug**, approved biography and image paths. Put media in the repository's root `assets/` directory; reference them from platform pages as `../assets/file.jpg`. Set `placeholder: false` only after content and participation are confirmed. The directory and profile automatically use the record.

## Adding a video

Add an entry in `videos` with a unique `id`, approved title, valid `youtubeId`, a `category`, and `artistSlugs` referring to existing artist records. The video appears in the video archive and on the linked artist pages.

## Design

Typography: Cormorant Garamond (display), DM Sans (body), Space Mono (metadata), initially loaded through Google Fonts. Theme: near-black, warm ivory and muted gold.

## Safety and publishing

The existing root `index.html`, `styles.css`, and `assets/` are unchanged. Do **not** merge this branch to `main` until after reviewing a Netlify Deploy Preview (or a separate Netlify test site) and checking the artist information and permissions.

The two additional artist records are explicitly marked demonstration placeholders. Only June's video is currently in the catalogue; add other music videos only with validated YouTube IDs.

## Known next steps

- Verify browser and mobile appearance with a live preview.
- Check and optimise large image files for performance; do not remove originals without preserving backups.
- Decide whether the platform should eventually move to Astro or a CMS for easier growth.
- Add approved artist metadata, session films and production credits.
- Consider self-hosting licensed WOFF2 fonts after initial design approval.
