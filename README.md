# Akanara Digital Solutions — Official Website

A fast, futuristic **static website** (HTML · CSS · vanilla JS) for CV Akanara Digital Solutions, Bali.
No build step, no server runtime required — it runs perfectly on **Hostinger Single** (or any static host).

- **Motion:** GSAP + ScrollTrigger + Lenis (loaded from CDN, runs client-side)
- **Type:** Clash Display · Satoshi · JetBrains Mono (Fontshare)
- **Design:** obsidian base · Balinese gold `#E8A33D` + plasma violet `#6E5BF2`

---

## 📁 Structure

```
/
├── index.html          Home (hero, services, work, stats, approach, story, FAQ, CTA)
├── services.html       Services deep-dive (#web #marketing #seo #apps)
├── work.html           Portfolio grid
├── about.html          Studio story, values, ventures
├── contact.html        Lead-qualifying form (service + budget)
├── 404.html            Custom error page
├── css/style.css       All styles (design system + pages)
├── js/main.js          All behaviour (hero canvas, menu, reveals, form)
├── assets/
│   └── favicon.svg     Brand mark  ·  (add og-image.jpg — see checklist)
├── .htaccess           Compression, caching, security headers, HTTPS, 404
├── robots.txt          Crawlers + AI engines allowed
└── sitemap.xml         All pages
```

---

## 🚀 Deploy to Hostinger (Single plan)

You do **not** need Node.js. Just upload the files.

### Option A — File Manager (easiest)
1. hPanel → **Websites** → your site → **File Manager**.
2. Open the **`public_html`** folder (delete Hostinger's `default.php`/placeholder if present).
3. Upload **everything in this repo** into `public_html` — keep the folder structure
   (`css/`, `js/`, `assets/` must stay as folders). Tip: zip the project, upload the zip,
   then use File Manager's **Extract**. Make sure `.htaccess` uploads too (it's a hidden file —
   in File Manager, enable "show hidden files" / dotfiles).
4. Visit your domain. Done.

### Option B — FTP (FileZilla)
1. hPanel → **Files → FTP Accounts**, copy host / username / password.
2. Connect in FileZilla, open `public_html`, drag the project files in.

### SSL / HTTPS
Hostinger issues a free SSL automatically. In hPanel enable **Force HTTPS** (Security → SSL),
or leave the redirect block in `.htaccess` (it does the same). Don't use both if you see a redirect loop.

---

## ✉️ Make the contact form work (2 minutes, free)

The form uses **Web3Forms** — perfect for static hosting (no PHP/Node needed).

1. Go to **web3forms.com** → enter your inbox (e.g. `hello@akanara.com` or your Gmail) → get a free **Access Key**.
2. Open **`contact.html`**, find this line:
   ```html
   <form class="lead-form" id="leadForm" data-access-key="REPLACE_WITH_YOUR_WEB3FORMS_ACCESS_KEY" ...>
   ```
   Replace `REPLACE_WITH_YOUR_WEB3FORMS_ACCESS_KEY` with your key. Save, re-upload `contact.html`.
3. Submit a test message — it lands in your inbox. Until the key is added, the form shows a
   friendly "email us instead" message rather than failing silently.

> Prefer server-side email on Hostinger instead of Web3Forms? Single includes 1 mailbox + PHP —
> you can swap the form action for a small PHP `mail()` handler later. Web3Forms is more reliable
> for deliverability out of the box, so it's the default.

---

## ✅ Before you launch — customise these

- [ ] **Domain:** Single has no free domain — point your `akanara.com` (or chosen domain) at the hosting in hPanel → Domains. Then find-and-replace `https://akanara.com` across the `.html` files, `sitemap.xml`, and `robots.txt` if your domain differs.
- [ ] **Contact form:** add your Web3Forms access key (above).
- [ ] **Email address:** replace `hello@akanara.com` if you use a different inbox (appears in the pages + footer + schema).
- [ ] **Social links:** the footer Instagram / LinkedIn / WhatsApp links are `#` placeholders — add real URLs.
- [ ] **OG share image:** add `assets/og-image.jpg` (1200×630) so links preview nicely on WhatsApp/LinkedIn/etc. The `<meta og:image>` tags already point to it.
- [ ] **Real numbers:** the stats (40+ projects, 12+ products, 98% retention, 24/7) are placeholders from the brief — set them to your real figures in `index.html` and `work.html`.
- [ ] **Portfolio:** `work.html` cards are scaffolded from your ventures — swap in real screenshots/details as case studies are ready.
- [ ] **Analytics:** paste your **GA4 / GTM** snippet before `</head>` on each page when ready.

---

## ⚡ Optional performance upgrades (nice-to-have)

The site is already fast and passes reduced-motion/accessibility basics. To squeeze more:

- **Self-host fonts:** download the Clash Display / Satoshi / JetBrains Mono `.woff2` from Fontshare
  into `assets/fonts/`, add `@font-face` rules to `css/style.css`, and remove the Fontshare `<link>`s.
  Removes a third-party request and shaves load time.
- **Self-host GSAP/Lenis:** drop the CDN scripts into `js/` and update the `<script src>` paths.
- **Cache-busting:** after a big CSS/JS change, bump the version in the tags —
  `css/style.css?v=2` / `js/main.js?v=2` — so returning visitors get the update immediately.
- Enable **LiteSpeed Cache** and the **CDN** toggle in hPanel if available on your plan.

---

## 🖥️ Preview locally

It's plain static files — just open `index.html` in a browser. For a local server:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

(Motion + fonts load from CDNs, so keep an internet connection while previewing; the layout
degrades gracefully to system fonts + static content offline.)

---

*Built for CV Akanara Digital Solutions · Made in Bali 🌴 for the world.*
