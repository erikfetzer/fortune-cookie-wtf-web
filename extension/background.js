// Cookie Jar background worker.
// Watches each tab's outgoing requests (read-only), groups the outside domains by company,
// and shows the number of tracking companies on the toolbar icon.
// Nothing is sent anywhere; state lives in memory and chrome.storage.session (cleared when the browser closes).

if (typeof importScripts === 'function' && !self.TRACKERS) importScripts('trackers.js');

const tabs = {};          // tabId -> { host, site, trackers: {company: {category, count, domains:{}}}, others: {site: count} }
const pending = new Set();
let flushTimer = null;
let loaded = false;

const ready = chrome.storage.session.get(null).then((all) => {
  for (const [k, v] of Object.entries(all || {})) if (k.startsWith('tab:')) tabs[k.slice(4)] = v;
  loaded = true;
}).catch(() => { loaded = true; });

function save(tabId) {
  pending.add(String(tabId));
  if (flushTimer) return;
  flushTimer = setTimeout(() => {
    flushTimer = null;
    const out = {};
    for (const id of pending) if (tabs[id]) out['tab:' + id] = tabs[id];
    pending.clear();
    chrome.storage.session.set(out).catch(() => {});
  }, 400);
}

function badge(tabId) {
  const t = tabs[tabId];
  const n = t ? Object.keys(t.trackers).length : 0;
  chrome.action.setBadgeBackgroundColor({ tabId: Number(tabId), color: '#c8102e' }).catch(() => {});
  chrome.action.setBadgeText({ tabId: Number(tabId), text: n ? String(n) : '' }).catch(() => {});
}

function hostOf(url) {
  try { return new URL(url).hostname; } catch (e) { return ''; }
}

chrome.webRequest.onBeforeRequest.addListener(
  (d) => {
    if (d.tabId < 0) return;
    const id = String(d.tabId);
    const host = hostOf(d.url);
    if (!host) return;
    const handle = () => {
      if (d.type === 'main_frame') {
        tabs[id] = { host, site: self.siteOf(host), trackers: {}, others: {} };
        badge(id); save(id);
        return;
      }
      let t = tabs[id];
      if (!t) {
        // Page loaded before we started watching: use the initiator as the page.
        const ih = hostOf(d.initiator || d.documentUrl || '');
        if (!ih) return;
        t = tabs[id] = { host: ih, site: self.siteOf(ih), trackers: {}, others: {}, partial: true };
      }
      const site = self.siteOf(host);
      if (site === t.site) return;
      const hit = self.lookupTracker(host);
      if (hit) {
        const c = t.trackers[hit.company] || (t.trackers[hit.company] = { category: hit.category, count: 0, domains: {} });
        c.count++; c.domains[hit.domain] = 1;
        badge(id);
      } else {
        t.others[site] = (t.others[site] || 0) + 1;
      }
      save(id);
    };
    if (loaded) handle(); else ready.then(handle);
  },
  { urls: ['<all_urls>'] }
);

chrome.tabs.onRemoved.addListener((tabId) => {
  delete tabs[String(tabId)];
  chrome.storage.session.remove('tab:' + tabId).catch(() => {});
});

