# Sessions on the Moon — prototype preview

This is a separate, static HTML/CSS/JavaScript prototype of the artist and music-video archive. The original June on the Moon press kit at repository root remains unchanged.

## Preview on Netlify (separate site)

1. In Netlify choose **Add new project → Import an existing project**.
2. Select GitHub repository `briisflash/juneonthemoon-presskit`.
3. In the new site's deploy settings choose **branch** `sessions-on-the-moon-development` (do **not** select `main`).
4. Set **build command** to `bash platform/build.sh`.
5. Set **publish directory** to `dist`.
6. Deploy the new site. The script copies the prototype and existing media assets, fixing paths for the deploy.
7. Review the Netlify-generated URL on desktop and mobile. Do **not** merge the draft pull request until the design has been approved.

The prototype needs no Node.js framework or npm installation. Netlify's build environment supports Bash and Python 3 for the packaging script.

## Local preview

From repository root:

```bash
bash platform/build.sh
cd dist
python3 -m http.server 8080
```

Then open `http://localhost:8080`.

## Editing

- `platform/index.html`: page sections and navigation
- `platform/styles.css`: layout, colours and typography
- `platform/app.js`: artist records and video records, gallery rendering and filters

Add approved artist details to the `artists` array in `app.js`. Give each a unique `slug`, and link official YouTube videos to artists via `artistSlugs`. The prototype currently uses **June on the Moon only** — there are no fabricated profiles.

## Notes

- Existing media assets are bundled into the deployed `dist/assets` folder; some original photographs are large.
- The YouTube embed depends on playback being permitted by the video's owner.
- This is the first editorial prototype, not a multi-user CMS or a separate artist-domain system.
- The original site's HTML/CSS has not been modified.
