# fortunecookie.wtf

Crack open a fortune cookie and it tells you what you want, using only what your browser already gives away to every site you visit. Each fortune flips over to show the tracker term behind it and how the guess was made.

## What's here

- `index.html`: the whole site (no build step)
- `api/whereami.js`: Vercel function that returns the city Vercel derives from the visitor's IP; nothing is stored
- `sw.js`, `manifest.webmanifest`, `icon.svg` + PNG icons: PWA shell (installable, works offline)
- `og.jpg`: 1200×630 share card

Analytics: Vercel Web Analytics plus Google Analytics (G-YKXXT2EPX8). GA is skipped when the browser sends GPC or Do Not Track. Custom events: cookie_cracked, another_cookie, slip_flipped, fortune_shared, ad_profile_read, sample_profile.

## Sections

1. **Open the cookie**: the cookie cracks, the slip shows the top fortune and "lucky numbers" that are really leaked values
2. **The rest of your fortunes**: slips that flip to "Learn tracker-speak", labeled solid inference, educated guess or pure theater
3. **The ingredients**: every signal the browser exposed
4. **Level 2**: drop in a Meta ads export or paste Google My Ad Center topics; parsed on-device

## Deploy

Static site on Vercel; no framework or build command. Domain: fortunecookie.wtf.
