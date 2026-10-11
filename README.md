# Aesthetic Webs website

Static site: `index.html`, `css/styles.css`, `js/config.js` (all editable content), `js/main.js`, `assets/`.
No build step and no dependencies.

## Run locally
Open `index.html` in a browser, or run `python3 -m http.server 8000` in this folder and visit http://localhost:8000.
(The contact form needs the site to be online to send; see below.)

## Publish on GitHub Pages
1. Push this folder's contents to a GitHub repository (files at the repo root).
2. Repo Settings > Pages > Deploy from branch > `main` / root.
3. All paths are relative, so the site works under `https://USERNAME.github.io/REPO/`.
4. Update later by committing and pushing.

## Contact form (sends to cantosherbie@gmail.com)
Uses FormSubmit.co. **One-time activation:** after publishing, send a test inquiry from the live site.
FormSubmit emails cantosherbie@gmail.com an activation link (check spam). Click it once; after that every inquiry arrives in that inbox.
Without JavaScript the form posts to FormSubmit directly. If sending fails, visitors see a "send by email instead" link.
To use a mailto fallback only, set `formMode: "mailto"` in `js/config.js`.

## Edit content
- Prices, projects, phone, social links, email: `js/config.js`.
- About text and FAQ: `index.html`.
- Add a project: copy the object in `projects`, put the screenshot in `assets/`, set `image` (and `mobileImage`, `url`).

## Custom domain
Replace `https://YOUR-USERNAME.github.io/aesthetic-webs/` in the `<head>` of `index.html` (canonical and Open Graph tags, 4 places).
Then in GitHub Pages settings add your domain and set the DNS records GitHub lists.

## Still to do
- Replace the placeholder project with your real one.
- Add `assets/og-image.png` (1200x630) for link previews.
- Fill in phone and social links if you want them shown.
- Replace the About copy with your own words.
