# Cookie Jar by fortunecookie.wtf

A browser extension that shows which companies are tracking you on the current page and which ones have left cookies in your browser. Companion to [fortunecookie.wtf](https://fortunecookie.wtf).

Nothing leaves the browser. There is no server and no analytics.

## Features

- **Toolbar badge:** number of tracking companies on the current page
- **On this page:** companies by name and category (advertising, analytics, session recording, data broker, social), plus a count of other outside domains
- **Your whole cookie jar:** total cookies, sites and tracking companies, top companies by cookie count, and the longest-lasting tracker cookie
- **Throw out tracker cookies:** removes cookies from known tracking domains with a confirm step. Skips domains that are also apps people sign into (`NO_CLEAN` in `trackers.js`), so nobody gets logged out

## Permissions

- `cookies`, `webRequest`, `storage`: read cookies, observe (never block or change) requests, keep per-tab counts in session storage
- `<all_urls>` is **optional** and requested only when the user clicks "Open the jar"

## Load it in Chrome

1. Go to `chrome://extensions` and turn on **Developer mode**
2. Click **Load unpacked** and choose this `extension` folder
3. Pin Cookie Jar from the puzzle-piece menu, click it, then **Open the jar**

Firefox: `about:debugging#/runtime/this-firefox` → **Load Temporary Add-on** → pick `manifest.json`.

## Tracker list

`trackers.js` maps ~140 tracking domains to companies and categories. Add domains there; `lookupTracker` matches subdomains automatically.
