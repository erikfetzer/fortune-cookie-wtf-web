# Cookie Jar: store listing kit

Everything to paste into the Chrome Web Store and Firefox Add-ons (AMO) forms. Build the upload zips with `scripts/build-extension.sh` (outputs to `dist/`).

| | |
|---|---|
| Name | Cookie Jar by fortunecookie.wtf |
| Version | 1.0.0 |
| Homepage | https://fortunecookie.wtf |
| Privacy policy | https://fortunecookie.wtf/privacy#cookie-jar |
| Support | https://github.com/erikfetzer/fortune-cookie-wtf-web/issues |
| License | MIT (fonts: SIL OFL 1.1) |
| Price | Free, no in-app purchases |

## Images (`extension/store/`)

| File | Use |
|---|---|
| `../icons/128.png` | Store icon (128×128) |
| `screenshot-1-this-page.png` | Screenshot 1 (1280×800) |
| `screenshot-2-cookie-jar.png` | Screenshot 2 (1280×800) |
| `screenshot-3-trust.png` | Screenshot 3 (1280×800) |
| `promo-small-440x280.png` | Chrome small promo tile |
| `promo-marquee-1400x560.png` | Chrome marquee promo tile (optional) |

Screenshots use a local test page (`news.example.com`) and seeded cookies, not anyone's real data.

---

## Chrome Web Store

**Category:** Privacy & Security
**Language:** English

### Summary (132 characters max; this is the manifest description)

See every company that left a cookie in your browser, and who's watching on the page you're on. Nothing leaves your computer.

### Description

Your browser is full of cookies from companies you've never heard of. Cookie Jar shows you who they are.

WHO'S WATCHING THIS PAGE
A number on the toolbar shows how many tracking companies loaded with the page you're reading. Open it to see them by name and by what they do: advertising, analytics, data brokers, and the ones that record your session like a video.

YOUR WHOLE COOKIE JAR
See every cookie in your browser, how many companies are behind them, and which one plans to stick around the longest.

THROW OUT THE TRACKER COOKIES
One tap (and a second to confirm) clears cookies from known tracking companies. It skips sites you sign into, so you stay logged in. Fair warning: they come back the next time you browse. They always come back.

NOTHING LEAVES YOUR COMPUTER
No account, no server, no analytics, no remote code. Cookie Jar asks for access to your sites only when you tap "Open the jar," and tells you plainly why Chrome's warning sounds scary. Per-page counts are kept in session storage and erased when you close the browser.

Yes, we see the irony of asking you to trust an extension with all your cookies. That's the point. Read the privacy policy, read the code, and uninstall it the second it gets weird.

Made by fortunecookie.wtf, the site that tells your fortune using only what your browser gives away.

### Single purpose

Shows the user which tracking companies have set cookies in their browser and which load on the current page, and lets the user delete tracker cookies on request.

### Permission justifications

**cookies**
Lists the browser's cookies to group them by the company that set them, and deletes cookies from known tracking domains when the user taps "Throw out tracker cookies" and confirms. Cookie values are not read or used.

**webRequest**
Observes (read-only, never blocks or modifies) the domains each tab contacts while a page loads, so the extension can count the tracking companies on that page and show the number on the toolbar badge.

**storage**
Keeps each tab's tracker counts in chrome.storage.session so the popup can show them. Session storage is cleared when the browser closes. Nothing is synced or sent anywhere.

**Host permission (optional `<all_urls>`)**
Required by Chrome for the cookies and webRequest APIs to see cookies and requests across all sites, which is the extension's whole function. It's declared as an optional permission and requested only when the user taps "Open the jar" in the popup, after an in-popup explanation. The extension injects no content scripts and reads no page content.

### Remote code

No, I am not using remote code. All JavaScript is packaged in the extension; fonts and images are bundled locally.

### Data usage

Chrome asks for disclosure even when data is only processed locally. Check:

- **Web history**: the extension observes which domains each open tab contacts, to count trackers. Processed locally, kept in session storage, never transmitted.
- **Authentication information**: cookies can contain sign-in sessions. The extension lists cookie names, domains and expiry dates and can delete tracker cookies on request; it doesn't read, store or transmit cookie values.

Leave every other type unchecked.

Certify all three:
- I do not sell or transfer user data to third parties, outside of the approved use cases
- I do not use or transfer user data for purposes that are unrelated to my item's single purpose
- I do not use or transfer user data to determine creditworthiness or for lending purposes

### Test instructions for reviewers

1. Install, click the toolbar icon, tap **Open the jar** and allow access.
2. Open any news site (for example cnn.com or theverge.com) and reload it.
3. The toolbar badge shows the number of tracking companies; the popup lists them.
4. "Your whole cookie jar" summarizes all cookies. **Throw out tracker cookies** asks for a second tap, then removes only tracker cookies.

No account or login is needed.

---

## Firefox Add-ons (AMO)

Upload `dist/cookie-jar-1.0.0-firefox.zip`. The code isn't minified or bundled, so no separate source upload is needed.

**Categories:** Privacy & Security
**License:** MIT License
**Data collection:** declared in the manifest as `"data_collection_permissions": { "required": ["none"] }`. Requires Firefox 140 or later.

### Summary (250 characters max)

See every company that left a cookie in your browser and who's tracking you on the page you're on. Clear tracker cookies in one tap without getting logged out. No account, no server: nothing leaves your computer.

### Description

Use the Chrome description above. Replace "Chrome's warning" with "Firefox's permission prompt".

### Notes to reviewer

No build step; the files in the zip are the source. Network: the extension makes no network requests of its own. webRequest is used only to observe request hostnames per tab (no blocking). Host access is optional and requested from the popup on first use. Test steps are the same as for Chrome above.
