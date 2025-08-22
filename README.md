
# CV Spark — Premium CV Builder + Success Story Landing (HTML/CSS/JS)

**One‑click PDF CV builder** with 16+ themes and a **light, modern landing page** showcasing Ali Shah’s success story. Fully client‑side (no backend). Perfect for GitHub Pages, Netlify, or any static host.

> **Repo Description (copy into GitHub):**  
> Premium CV builder (HTML/CSS/JS) + light-themed landing with blurry bulb background. One‑click PDF, share link, sticky editor, 16+ themes, ATS-friendly.

**Topics:** `resume` `cv-builder` `html` `css` `javascript` `landing-page` `pdf` `portfolio` `ats` `github-pages`

---

## ✨ Features

- **CV Builder**
  - 16+ themes (Modern, Serif, Mono, Compact, Grid, Card, Blue, Sidebar, Banner, Timeline, Pastel, Glass, Geometric, Wave, Photo Header, Shapes)
  - **Left-side editor** (single-row UX, sticky header)
  - **Exact PDF export** (A4, 3× scale, smart page breaks, screen-accurate colors)
  - **Share link** (data encoded in URL hash)
  - **Color controls** + curated palettes (inside builder)
  - **Premium backgrounds**: subtle geometric, glass, and shapes

- **Landing Page**
  - Light/white theme with **colorful bulb/blurry** background
  - Sections: **Hero**, **Success Story**, **How it Works**, **Impact**, **CTA**
  - Responsive (mobile → desktop)
  - CTA wired to `cvbuilder.html`

- **Favicon set** (SVG/PNG/ICO/Apple touch)

---

## 🗂 Project Structure

```
.
├─ cv-landing-v1/
│  ├─ index.html
│  ├─ landing.css
│  └─ landing.js
├─ cv-pack-v2/
│  ├─ index.html          # the builder (rename/copy to cvbuilder.html at repo root)
│  ├─ styles.css
│  └─ app.js
├─ favicon/
│  ├─ favicon.svg
│  ├─ favicon.ico
│  ├─ favicon.png
│  ├─ favicon-16.png
│  ├─ favicon-32.png
│  ├─ favicon-48.png
│  ├─ favicon-180.png     # apple-touch-icon
│  └─ favicon-512.png
└─ cvbuilder.html         # (recommended) copy of cv-pack-v2/index.html at repo root
```

---

## 🚀 Quick Start (Local)

1. Download the repo (or copy these folders/files) to your machine.
2. (Recommended) **Create `cvbuilder.html` at the repo root** by copying `cv-pack-v2/index.html`:
   - `cp cv-pack-v2/index.html ./cvbuilder.html`
3. Open the landing page: `cv-landing-v1/index.html` in your browser.
4. Click **“Open CV Builder”** in the CTA → it will open `cvbuilder.html`.

> If you prefer, you can change the CTA link in `cv-landing-v1/index.html` to point directly to `cv-pack-v2/index.html`.

---

## 🌐 Deploy to GitHub Pages

1. Push code to a GitHub repo.
2. In **Settings → Pages**, choose:
   - **Source:** “Deploy from a branch”
   - **Branch:** `main` (or `master`), **/root**
3. Ensure **`cvbuilder.html`** exists at the repo root (or update CTA link to your builder path).
4. Optional: Add favicons in `<head>` of both pages:

```html
<link rel="icon" href="/favicon/favicon.svg" type="image/svg+xml">
<link rel="icon" href="/favicon/favicon-32.png" sizes="32x32" type="image/png">
<link rel="apple-touch-icon" href="/favicon/favicon-180.png">
<link rel="icon" href="/favicon/favicon.ico">
```

> For GitHub Pages, paths like `/favicon/...` reference the repo root. If using a project site (e.g., `/username.github.io/project/`) use relative paths: `favicon/...`.

---

## 🧭 Usage Guide

### Landing Page (`cv-landing-v1`)
- Text and numbers (e.g., *3×*, *70%*, *45%*) live in `index.html`.
- Bulb/glow background is in CSS (`landing.css`) under `.glows .glow`.
- CTA button lives in the **CTA** section; it links to `./cvbuilder.html` by default.

### CV Builder (`cv-pack-v2`)
- Open `index.html` (or `cvbuilder.html` copy).
- Left panel: Basics, Experience, Projects, Education, Certifications.
- **Themes:** Use the Theme dropdown to cycle designs.
- **PDF:** Use the **PDF** button. The app manages zoom/scroll to avoid blank pages.
- **Share:** “Share” copies a URL containing your CV data in the hash (no server).
- Print settings auto-target **A4** with smart page breaks.

---

## 🧩 Customization

- **Branding:** Change logo text “CV Spark” in both HTML files.
- **Colors (Builder):** Accent/Text/BG tints can be changed from the builder’s color panel.
- **Backgrounds (Builder):** `theme-glass`, `theme-geo`, `theme-wave`, `theme-shapes`, `theme-photo`.
- **Landing bulbs:** Tune sizes/opacity in `landing.css` (`.g1`, `.g2`, `.g3`).

---

## 🧪 Troubleshooting

- **PDF shows extra blank pages**  
  The builder neutralizes zoom/scroll and uses CSS page breaks. If you still see blanks:
  - Use the built-in **PDF** button (not the browser print dialogue).
  - Try Chrome/Edge latest; some PDF engines vary on older Safari.
  - Very long sections: insert `<div class="page-break"></div>` in the resume DOM where needed.

- **Share link not copying**  
  On non-secure contexts, the Clipboard API may be blocked. The app falls back to `execCommand('copy')`. If it still fails, copy the URL manually from the address bar.

- **CTA doesn’t open the builder**  
  Ensure `cvbuilder.html` exists at the repo root **or** update the CTA href to your builder path.

---

## 🧱 License

MIT — do whatever you like; keep the license notice.  
You can switch to a different license if required.

---

## 🤝 Contributing

Issues and PRs welcome! Ideas:
- ATS‑strict theme (no backgrounds, system font)
- RTL layout (Urdu/Arabic)
- Auto multi‑page splitting with section priorities

---

