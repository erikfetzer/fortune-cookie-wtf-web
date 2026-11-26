// Cookie Jar popup. Reads only from this browser; sends nothing anywhere.
(() => {
  const $ = (id) => document.getElementById(id);
  const ALL = { origins: ['<all_urls>'] };
  const el = (tag, cls, text) => { const n = document.createElement(tag); if (cls) n.className = cls; if (text != null) n.textContent = text; return n; };

  let cleanable = [];
  let armed = false;

  function row(name, category, value) {
    const r = el('div', 'row');
    const left = el('span');
    left.append(el('span', 'co', name), document.createTextNode(' '), el('span', 'cat ' + category, self.CATEGORY[category] || category));
    r.append(left, el('span', 'num', value));
    return r;
  }

  function plural(n, one, many) { return n + ' ' + (n === 1 ? one : (many || one + 's')); }

  async function showPage() {
    // ?tab=<id> lets the popup be opened in a normal tab for testing.
    const forced = Number(new URLSearchParams(location.search).get('tab'));
    const tab = forced ? await chrome.tabs.get(forced) : (await chrome.tabs.query({ active: true, currentWindow: true }))[0];
    const url = tab && tab.url ? tab.url : '';
    const list = $('pageList');
    list.textContent = '';
    if (!/^https?:/.test(url)) {
      $('pageTitle').textContent = 'On this page';
      $('fortune').textContent = 'Nothing to read on this page.';
      $('fortuneSub').textContent = 'Open a news site and try again. That’s where the cookies are.';
      return;
    }
    const host = new URL(url).hostname.replace(/^www\./, '');
    $('pageTitle').textContent = 'On ' + host;
    const got = await chrome.storage.session.get('tab:' + tab.id).catch(() => ({}));
    const t = got['tab:' + tab.id];
    if (!t) {
      $('fortune').textContent = 'I wasn’t watching when this page loaded.';
      $('fortuneSub').textContent = 'Reload the page, then open the jar again.';
      return;
    }
    const cos = Object.entries(t.trackers).sort((a, b) => b[1].count - a[1].count);
    const others = Object.keys(t.others || {}).length;
    for (const [name, c] of cos.slice(0, 12)) list.append(row(name, c.category, plural(c.count, 'request')));
    const more = [];
    if (cos.length > 12) more.push(`+${cos.length - 12} more tracking companies`);
    if (others) more.push(`${plural(others, 'other outside domain')} (CDNs, fonts, widgets, unknowns)`);
    $('pageMore').textContent = more.join('. ');
    if (!cos.length) {
      $('fortune').textContent = 'This page is keeping to itself. Rare. Enjoy it.';
      $('fortuneSub').textContent = others ? `It still called ${plural(others, 'outside domain')}, but none I know as trackers.` : 'No outside requests at all.';
    } else {
      $('fortune').textContent = `This page just introduced you to ${plural(cos.length, 'company', 'companies')}.`;
      const quip = cos.map(([n]) => self.QUIPS[n]).find(Boolean);
      $('fortuneSub').textContent = quip || `${cos[0][0]} is here. They knew you were coming.`;
      if (t.partial) $('fortuneSub').textContent += ' Reload for the full count.';
    }
  }

  async function showJar() {
    const cookies = await chrome.cookies.getAll({});
    const sites = new Set();
    const cos = {};
    let longest = null;
    cleanable = [];
    for (const c of cookies) {
      const site = self.siteOf(c.domain);
      sites.add(site);
      const hit = self.lookupTracker(c.domain);
      if (!hit) continue;
      const k = cos[hit.company] || (cos[hit.company] = { category: hit.category, count: 0 });
      k.count++;
      if (c.expirationDate && (!longest || c.expirationDate > longest.exp)) longest = { exp: c.expirationDate, company: hit.company };
      if (!self.NO_CLEAN.has(hit.domain) && !self.NO_CLEAN.has(site)) cleanable.push(c);
    }
    $('sTotal').textContent = cookies.length.toLocaleString();
    $('sSites').textContent = sites.size.toLocaleString();
    $('sCos').textContent = Object.keys(cos).length.toLocaleString();
    const list = $('jarList');
    list.textContent = '';
    const top = Object.entries(cos).sort((a, b) => b[1].count - a[1].count);
    for (const [name, c] of top.slice(0, 8)) list.append(row(name, c.category, plural(c.count, 'cookie')));
    if (top.length > 8) list.append(el('div', 'more', `+${top.length - 8} more companies`));
    if (longest) {
      const yr = new Date(longest.exp * 1000).getFullYear();
      $('longest').textContent = `The longest-lasting tracker cookie is from ${longest.company}. It's set to stick around until ${yr}.`;
    } else $('longest').textContent = '';
    const btn = $('clean');
    armed = false;
    btn.disabled = !cleanable.length;
    btn.textContent = cleanable.length ? `Throw out ${plural(cleanable.length, 'tracker cookie')}` : 'No tracker cookies to throw out';
  }

  async function clean() {
    const btn = $('clean');
    if (!armed) {
      armed = true;
      btn.textContent = `Sure? Throw out ${plural(cleanable.length, 'cookie')}`;
      $('cleanNote').textContent = 'Tap again to confirm. They’ll start coming back the next time you browse.';
      return;
    }
    btn.disabled = true;
    btn.textContent = 'Throwing them out…';
    let n = 0;
    for (const c of cleanable) {
      const url = (c.secure ? 'https://' : 'http://') + c.domain.replace(/^\./, '') + c.path;
      const details = { url, name: c.name, storeId: c.storeId };
      if (c.partitionKey) details.partitionKey = c.partitionKey;
      try { if (await chrome.cookies.remove(details)) n++; } catch (e) {}
    }
    $('cleanNote').textContent = `Threw out ${plural(n, 'cookie')}. They’ll be back. They always come back.`;
    await showJar();
  }

  async function start() {
    const has = await chrome.permissions.contains(ALL);
    $('intro').hidden = has;
    $('main').hidden = !has;
    if (!has) return;
    await Promise.all([showPage(), showJar()]).catch((e) => { $('fortuneSub').textContent = String(e && e.message || e); });
  }

  $('grant').addEventListener('click', async () => {
    try { if (await chrome.permissions.request(ALL)) start(); } catch (e) {}
  });
  $('clean').addEventListener('click', clean);
  start();
})();
