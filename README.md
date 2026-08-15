# CyberFolio — Abdul Rehman Tahir

A dark, cybersecurity-themed portfolio site. Static HTML/CSS/JS — no build step,
no framework, no dependencies to install. Open `index.html` and it runs; push
the folder to any static host and it's live.

**Live sections:** Hero · About · Education · Skills · Experience · Projects
(PhishGuard, CyberShield, Encrypto) · Certifications · Roadmap · Live GitHub
stats · Interactive terminal · Achievements · Contact

---

## 1. Project structure

```
CyberFolio/
├── index.html                  All markup, in one file for easy editing
├── css/
│   └── style.css               Full design system (colors, type, layout, animation)
├── js/
│   ├── main.js                 Nav, scroll progress, reveal animations, hero canvas, contact form
│   ├── terminal.js             The interactive terminal's command engine
│   └── github.js               Live GitHub API integration (stats + repos + contribution chart)
├── assets/
│   ├── favicon.svg
│   ├── og-image.png            Social share preview image (LinkedIn/Twitter/etc.)
│   ├── resume/
│   │   └── Abdul_Rehman_Tahir_Resume.pdf     ← the résumé download button serves this file
│   └── certificates/
│       ├── DecodeLabs_Internship_Certificate.pdf
│       └── Letter_of_Recommendation.pdf
├── robots.txt
└── .nojekyll                   Tells GitHub Pages to skip Jekyll processing
```

To update your résumé later, just replace the PDF in `assets/resume/` and keep
the same filename — every download link on the site points to that one file.

---

## 2. Preview it locally

Opening `index.html` directly in a browser works for layout/content, but the
**live GitHub stats** section uses `fetch()`, which most browsers block from a
plain `file://` page. To see everything working, serve the folder instead:

```bash
cd CyberFolio
python3 -m http.server 8000
# then open http://localhost:8000
```

(Any static server works — `npx serve`, VS Code's "Live Server" extension, etc.)

---

## 3. Deploy it

No build step for any of these — you're deploying the folder as-is.

### GitHub Pages
1. Push this folder's contents to a repo (e.g. `abdulrehman-at3.github.io` for
   a user site, or any repo name for a project site).
2. Repo → **Settings → Pages** → set **Source** to the branch you pushed
   (usually `main`) and folder `/root`.
3. Your site publishes at `https://<username>.github.io/` (user site) or
   `https://<username>.github.io/<repo>/` (project site).

### Netlify
1. [app.netlify.com](https://app.netlify.com) → **Add new site → Deploy manually**
   → drag the `CyberFolio` folder in. Done — no build command needed.
   (Or connect the GitHub repo for auto-deploys on every push.)

### Vercel
1. [vercel.com/new](https://vercel.com/new) → import the repo.
2. Framework preset: **Other**. Build command: *(leave empty)*. Output
   directory: *(leave empty / root)*.

---

## 4. Before you go live — a short checklist

A few things only you can fill in, since they depend on where you deploy:

- [ ] **`index.html` line ~13** — `<link rel="canonical" href="...">` is set to
      a guess (`https://abdulrehman-at3.github.io/`). Update it to your real
      final URL.
- [ ] **`og:image` / `twitter:image` meta tags** (`index.html`, `<head>`) use a
      relative path. Social platforms generally want an **absolute** URL for
      link previews — once deployed, change these to
      `https://your-domain/assets/og-image.png`.
- [ ] **Project "View on GitHub" buttons** currently link to your GitHub
      *profile* (`github.com/abdulrehman-at3`) rather than each individual
      repo, since the repo URLs weren't confirmed. Once PhishGuard, CyberShield,
      and Encrypto are pushed under final repo names, point each project
      card's link at its own repo for a nicer experience.
- [ ] **Custom domain (optional):** GitHub Pages → add a `CNAME` file with your
      domain; Netlify/Vercel → add the domain in their dashboard.

Everything else — content, contact details, certificates, résumé — is already
wired up and live.

---

## 5. How a few of the custom features work

- **Interactive terminal** (`js/terminal.js`): a themed command simulation —
  `whoami`, `about`, `skills`, `projects`, `resume`, `neofetch`, and a few
  others (`help` lists them all). It doesn't execute real shell commands; it's
  a guided, safe walkthrough of the page's own content, and `resume` /
  `sudo hire-me` actually trigger the résumé download.
- **Live GitHub panel** (`js/github.js`): calls the public GitHub REST API for
  `abdulrehman-at3` client-side (no token needed, no backend). It fails soft —
  if the API is rate-limited or offline, the panel just shows a quiet status
  note and the "Full profile" button still works. The contribution graph is
  pulled from the community `ghchart.rshah.org` image service.
- **Contact form**: fully static (no backend to wire up). Submitting it opens
  the visitor's email app with the message pre-filled via a `mailto:` link —
  clearly labelled as such so nothing is misleading.
- **Boot sequence / animations**: respect `prefers-reduced-motion` and skip or
  simplify automatically for visitors who have that OS setting on.

---

## 6. Editing content

Everything is in plain HTML/CSS — no templating, no build step:

- Text content: edit directly in `index.html` (organised section-by-section,
  each with an HTML comment header like `<!-- ============ PROJECTS ============ -->`).
- Colors, fonts, spacing: all defined as CSS custom properties at the top of
  `css/style.css` under `:root{ }` — change a value there and it updates
  everywhere it's used.
- Icons: a single inline SVG `<symbol>` sprite near the top of `index.html` —
  add a new `<g id="ic-yourname">...</g>` and reference it anywhere with
  `<svg><use href="#ic-yourname"/></svg>` (always keep `viewBox="0 0 24 24"`
  on the `<svg>` so it scales correctly at any size).
