# Victoria Ivanova — Dubai Luxury Property Advisor (Website)

A luxury personal-brand real estate website — same award-winning design as
[mohamedkamel.ae](https://mohamedkamel.ae) — prepared as a separate, standalone
site so it can live in its **own GitHub account** with its **own domain**.

The site belongs to **Victoria Ivanova** (Arabic `فيكتوريا إيفانوفا`,
Russian `Виктория Иванова`) — monogram **VI**. Some contact details are still
placeholders:

## ✏️ Details to replace before going live

| What | Current placeholder | Where |
|------|--------------------|-------|
| Email | `Victoria@Deluxehomes.ae` | `index.html`, `card/index.html`, `js/main.js` (`LEAD_EMAIL_ENDPOINT`) |
| Title / company | `Luxury Property Consultant · Deluxe Homes Real Estate` | `index.html`, `js/i18n.js`, `card/index.html` |
| Instagram / LinkedIn | empty links (`https://instagram.com/`) | `index.html`, `card/index.html` |
| Career stats | `AED 150M+ Career Sales`, `10+ Developer Partners` | `index.html`, `js/i18n.js` |
| Social preview image | none yet | add `assets/og-image.jpg` (1200×630) |
| Listings | Mohamed's Property Finder listings | `index.html` `#listings` section |
| Domain | `victoriaivanova.ae` (sample) | `index.html`, `card/index.html`, `sitemap.xml`, `robots.txt` |
| Google Analytics | disabled (`G-XXXXXXXXXX`) | `index.html` — paste her GA4 Measurement ID |

## 🚀 How to launch on her own GitHub + domain

1. **Create her GitHub account** at github.com (e.g. username `victoriaivanova`).
2. **Create a new repository** in her account (e.g. `victoriaivanova-website`),
   and upload all files from this folder (or fork/import this branch).
3. **Enable GitHub Pages:** repo → *Settings → Pages* → Source:
   *Deploy from a branch* → `main` → `/ (root)` → Save.
   The site is now live at `https://USERNAME.github.io/REPO/`.
4. **Buy a domain** from any registrar — GoDaddy, Namecheap, or for a `.ae`
   domain use an accredited UAE registrar (e.g. AE Domains / nic.ae resellers).
5. **Connect the domain:**
   - In the registrar's DNS settings add four **A records** for `@` pointing to
     GitHub Pages IPs: `185.199.108.153`, `185.199.109.153`,
     `185.199.110.153`, `185.199.111.153`,
     and one **CNAME record**: `www` → `USERNAME.github.io`.
   - In the repo: *Settings → Pages → Custom domain* → enter the domain →
     Save → tick **Enforce HTTPS** (may take up to 24 h for DNS + certificate).
6. **Update the domain placeholders** — replace `victoriaivanova.ae` with the real
   domain in `index.html`, `card/index.html`, `sitemap.xml`, `robots.txt`.

## Design

- **Aesthetic:** Luxury editorial (≈80% light luxury / 20% dark luxury contrast)
- **Typography:** Playfair Display (headings) · Jost (body)
- **Palette:** Warm White · Soft Beige · Warm Cream · Sand & Bronze — Espresso `#5C452C` · Bronze `#B0783F` (Playfair Display + Jost) · Deep Contrast
- **Languages:** English · العربية (RTL) · Русский — via `js/i18n.js`
- **Motion:** Scroll reveal, parallax, floating glass cards, magnetic CTAs,
  animated counters — all gated behind `prefers-reduced-motion`.

## Structure

```
index.html          Main single-page site (Hero · Trust · About · Services ·
                    Developers · Listings · Calculator · Consultation · Footer)
card/index.html     Digital business card (tap to call / WhatsApp / save vCard)
insights/           Three SEO articles (off-plan, Dubai vs Abu Dhabi, Golden Visa)
css/styles.css      Full luxury design system
js/                 Interactions, i18n (EN/AR/RU), developer data
assets/             Images (add her portrait + og-image here)
robots.txt          Crawler directives
sitemap.xml         Sitemap (update domain)
design-system/      Design documentation
```

## The portrait

Victoria's studio portrait lives at `assets/portrait.png` (hero) and
`assets/portrait-consult.png` (round avatar in the consultation section).
To swap it, replace those two files — if they're ever missing the site
gracefully falls back to a styled frame, so nothing looks broken.
