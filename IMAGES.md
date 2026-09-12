# Images guide — Akanara website

The site is **image-led**. Every image sits inside a `.media` block that has a
tasteful tropical gradient behind it, so if a photo is slow, missing, or blocked,
the layout still looks intentional (never a broken-image icon).

## How images work right now

Each `<img>` currently points to **LoremFlickr** — a free service that returns a
real, topical Creative-Commons photo for the keywords in the URL, e.g.:

```
https://loremflickr.com/1000/700/spa,wellness,massage?lock=21
                        │        │   │                  │
                     width   height  keywords        lock = keep the SAME photo
```

These load automatically in any normal browser (and once deployed) — no setup.
They're **placeholders**: great for launch/preview, but for the final site you'll
want hand-picked, properly-licensed photos (ideally your own real project shots).

> Tip: change a `?lock=` number to roll a different photo for the same keywords.

---

## Every image slot (what it is + where to change it)

| # | Page · section | Purpose | Current keywords | Swap to your… |
|---|---|---|---|---|
| 11 | `index.html` hero | Studio / brand hero | bali, creative, workspace | best hero shot or a Bali/team photo |
| 21 | index + work + about | **Relaxha** (spa) | spa, wellness, massage | Relaxha screenshot / spa photo |
| 22 | index + work + about | **LaundraOS** (SaaS) | dashboard, software, laptop | LaundraOS UI screenshot |
| 23 | index + work + about | **AKA Express Laundry** | laundry, laundromat | AKA brand / storefront photo |
| 24 | index + work | Luxury Villa campaigns | bali, villa, pool | a villa client shot |
| 25 | `work.html` | Restaurant systems | restaurant, dining, food | a restaurant client shot |
| 26 | `work.html` | Performance & analytics | analytics, marketing, charts | a GA4/report screenshot |
| 31 | index + about | Bali name-story | bali, temple, tropical | a Bali photo you love |
| 41 | `about.html` | Studio image band | bali, creative, studio | a real studio/team photo |
| 51 | `services.html` #web | Web & apps | coding, web, developer | a build/site screenshot |
| 52 | `services.html` #marketing | Performance marketing | marketing, advertising | an ads/dashboard shot |
| 53 | `services.html` #seo | SEO · SEM · GEO | seo, search, data | a Search Console shot |
| 54 | `services.html` #apps | Custom apps | app, developer, code | an app UI screenshot |

(The same lock number = the same picture reused, so swapping one file/URL updates
every place it appears.)

---

## Curated stock — good sources to pick from

Since I can't browse from the build environment, here are the exact searches I'd
use. Open, pick the one you like, and grab the download/direct URL:

- **Bali / studio / hero** — Unsplash: <https://unsplash.com/s/photos/bali-workspace> · Pexels: <https://www.pexels.com/search/bali%20office/>
- **Spa / wellness (Relaxha)** — <https://unsplash.com/s/photos/spa-bali> · <https://www.pexels.com/search/spa/>
- **Dashboard / SaaS (LaundraOS)** — <https://unsplash.com/s/photos/dashboard> · <https://www.pexels.com/search/dashboard/>
- **Laundry (AKA Express)** — <https://unsplash.com/s/photos/laundry> · <https://www.pexels.com/search/laundry/>
- **Villa / hospitality** — <https://unsplash.com/s/photos/bali-villa> · <https://www.pexels.com/search/villa%20pool/>
- **Restaurant / F&B** — <https://unsplash.com/s/photos/restaurant> · <https://www.pexels.com/search/restaurant/>
- **Analytics / marketing** — <https://unsplash.com/s/photos/analytics> · <https://www.pexels.com/search/analytics/>
- **Bali temple / culture (story)** — <https://unsplash.com/s/photos/bali-temple> · <https://www.pexels.com/search/bali%20temple/>
- **Coding / web dev** — <https://unsplash.com/s/photos/coding> · <https://www.pexels.com/search/programming/>

Unsplash and Pexels are both free for commercial use, no attribution required
(attribution appreciated). Always prefer **your own real project screenshots** for
the Work section — authentic work beats stock every time for an agency.

---

## Two ways to use a chosen photo

**A) Quick — hotlink it** (paste the URL into the `src`):
```html
<div class="media m-spa"><img src="https://images.unsplash.com/photo-XXXX?w=1200&q=70" alt="Relaxha" ...></div>
```

**B) Best for production — self-host it** (faster, reliable, you own it):
1. Download the photo, resize to ~1600px wide, and save as WebP if you can.
2. Put it in `assets/images/`, e.g. `assets/images/relaxha.webp`.
3. Point the `src` at it: `src="assets/images/relaxha.webp"`.

Keep the `width`/`height` attributes and `loading="lazy"` (except the hero, which
is `fetchpriority="high"`) so the page stays fast and doesn't jump while loading.

### Sizing cheatsheet
- Hero / story (portrait): ~900×1100
- Wide work cards / studio band: ~1400–1600 wide
- Small work cards (portrait): ~700×900
- Service images: ~900×700
- Venture thumbnails: ~200×150

Optimize before upload (squoosh.app or `cwebp`) — aim for < 200 KB each. Speed is
part of the pitch.
