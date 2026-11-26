// Known tracking domains -> [company, category].
// Categories: ad (advertising), analytics, replay (session recording), data (data broker / identity), social.
// Only domains whose main purpose is tracking are listed, so throwing out their cookies
// never logs anyone out of a site they actually use.
self.TRACKERS = {
  // Google
  'doubleclick.net': ['Google', 'ad'], 'googlesyndication.com': ['Google', 'ad'], 'googleadservices.com': ['Google', 'ad'],
  'google-analytics.com': ['Google', 'analytics'], 'googletagmanager.com': ['Google', 'analytics'], 'googletagservices.com': ['Google', 'ad'],
  'adservice.google.com': ['Google', 'ad'], '2mdn.net': ['Google', 'ad'], 'app-measurement.com': ['Google', 'analytics'],
  // Meta
  'connect.facebook.net': ['Meta', 'social'], 'facebook.net': ['Meta', 'social'], 'graph.instagram.com': ['Meta', 'social'],
  // Microsoft
  'bat.bing.com': ['Microsoft', 'ad'], 'clarity.ms': ['Microsoft', 'replay'], 'adnxs.com': ['Microsoft (Xandr)', 'ad'], 'adnxs-simple.com': ['Microsoft (Xandr)', 'ad'],
  // Amazon
  'amazon-adsystem.com': ['Amazon', 'ad'], 'assoc-amazon.com': ['Amazon', 'ad'],
  // Social platforms' ad pixels
  'ads-twitter.com': ['X (Twitter)', 'ad'], 'static.ads-twitter.com': ['X (Twitter)', 'ad'], 'analytics.twitter.com': ['X (Twitter)', 'ad'],
  'ads.linkedin.com': ['LinkedIn', 'ad'], 'px.ads.linkedin.com': ['LinkedIn', 'ad'], 'snap.licdn.com': ['LinkedIn', 'ad'],
  'analytics.tiktok.com': ['TikTok', 'ad'], 'ads.tiktok.com': ['TikTok', 'ad'],
  'sc-static.net': ['Snap', 'ad'], 'tr.snapchat.com': ['Snap', 'ad'],
  'ct.pinterest.com': ['Pinterest', 'ad'], 'ads.pinterest.com': ['Pinterest', 'ad'],
  'redditstatic.com': ['Reddit', 'ad'], 'alb.reddit.com': ['Reddit', 'ad'],
  'ads.yahoo.com': ['Yahoo', 'ad'], 'analytics.yahoo.com': ['Yahoo', 'ad'],
  // Ad tech
  'criteo.com': ['Criteo', 'ad'], 'criteo.net': ['Criteo', 'ad'],
  'taboola.com': ['Taboola', 'ad'], 'outbrain.com': ['Outbrain', 'ad'],
  'adsrvr.org': ['The Trade Desk', 'ad'], 'rubiconproject.com': ['Magnite', 'ad'], 'pubmatic.com': ['PubMatic', 'ad'],
  'openx.net': ['OpenX', 'ad'], 'casalemedia.com': ['Index Exchange', 'ad'], 'indexww.com': ['Index Exchange', 'ad'],
  'sharethrough.com': ['Sharethrough', 'ad'], '3lift.com': ['TripleLift', 'ad'], 'teads.tv': ['Teads', 'ad'],
  'lijit.com': ['Sovrn', 'ad'], 'sovrn.com': ['Sovrn', 'ad'], '33across.com': ['33Across', 'ad'], 'yieldmo.com': ['Yieldmo', 'ad'],
  'media.net': ['Media.net', 'ad'], 'smartadserver.com': ['Equativ', 'ad'], 'adform.net': ['Adform', 'ad'],
  'bidswitch.net': ['BidSwitch', 'ad'], 'spotxchange.com': ['Magnite', 'ad'], 'contextweb.com': ['PulsePoint', 'ad'],
  'gumgum.com': ['GumGum', 'ad'], 'ntv.io': ['Nativo', 'ad'], 'zemanta.com': ['Outbrain', 'ad'],
  'mathtag.com': ['MediaMath', 'ad'], 'quantserve.com': ['Quantcast', 'ad'], 'quantcount.com': ['Quantcast', 'ad'],
  'adroll.com': ['AdRoll', 'ad'], 'smaato.net': ['Smaato', 'ad'], 'inmobi.com': ['InMobi', 'ad'],
  'moatads.com': ['Oracle Moat', 'ad'], 'doubleverify.com': ['DoubleVerify', 'ad'], 'adsafeprotected.com': ['Integral Ad Science', 'ad'],
  'serving-sys.com': ['Amazon (Sizmek)', 'ad'], 'flashtalking.com': ['Flashtalking', 'ad'], 'innovid.com': ['Innovid', 'ad'],
  'ad.gt': ['Audigent', 'ad'], 'onetag-sys.com': ['OneTag', 'ad'], 'richaudience.com': ['Rich Audience', 'ad'],
  'connatix.com': ['Connatix', 'ad'], 'primis.tech': ['Primis', 'ad'], 'kargo.com': ['Kargo', 'ad'],
  'sonobi.com': ['Sonobi', 'ad'], 'districtm.io': ['District M', 'ad'], 'emxdgt.com': ['EMX', 'ad'],
  'zeta.com': ['Zeta Global', 'ad'], 'rfihub.com': ['Zeta Global', 'ad'],
  // Data brokers and identity graphs
  'rlcdn.com': ['LiveRamp', 'data'], 'liveramp.com': ['LiveRamp', 'data'], 'pippio.com': ['LiveRamp', 'data'],
  'demdex.net': ['Adobe', 'data'], 'everesttech.net': ['Adobe', 'ad'], 'omtrdc.net': ['Adobe', 'analytics'],
  'bluekai.com': ['Oracle', 'data'], 'addthis.com': ['Oracle', 'data'],
  'krxd.net': ['Salesforce', 'data'], 'exelator.com': ['Nielsen', 'data'], 'imrworldwide.com': ['Nielsen', 'analytics'],
  'tapad.com': ['Tapad', 'data'], 'crwdcntrl.net': ['Lotame', 'data'], 'agkn.com': ['TransUnion (Neustar)', 'data'],
  'id5-sync.com': ['ID5', 'data'], 'adentifi.com': ['Adentifi', 'data'], 'intentiq.com': ['Intent IQ', 'data'],
  'scorecardresearch.com': ['Comscore', 'analytics'], 'zeotap.com': ['Zeotap', 'data'],
  // Analytics and product tracking
  'segment.io': ['Segment', 'analytics'], 'segment.com': ['Segment', 'analytics'], 'mixpanel.com': ['Mixpanel', 'analytics'],
  'amplitude.com': ['Amplitude', 'analytics'], 'heap.io': ['Heap', 'analytics'], 'heapanalytics.com': ['Heap', 'analytics'],
  'newrelic.com': ['New Relic', 'analytics'], 'nr-data.net': ['New Relic', 'analytics'],
  'optimizely.com': ['Optimizely', 'analytics'], 'chartbeat.com': ['Chartbeat', 'analytics'], 'chartbeat.net': ['Chartbeat', 'analytics'],
  'parsely.com': ['Parse.ly', 'analytics'], 'kissmetrics.io': ['Kissmetrics', 'analytics'],
  'branch.io': ['Branch', 'analytics'], 'app.link': ['Branch', 'analytics'], 'appsflyer.com': ['AppsFlyer', 'analytics'], 'adjust.com': ['Adjust', 'analytics'],
  'hubspot.com': ['HubSpot', 'analytics'], 'hs-analytics.net': ['HubSpot', 'analytics'], 'hsadspixel.net': ['HubSpot', 'ad'],
  'marketo.net': ['Adobe Marketo', 'analytics'], 'mktoresp.com': ['Adobe Marketo', 'analytics'], 'pardot.com': ['Salesforce', 'analytics'],
  'klaviyo.com': ['Klaviyo', 'analytics'], 'braze.com': ['Braze', 'analytics'],
  // Session replay
  'hotjar.com': ['Hotjar', 'replay'], 'hotjar.io': ['Hotjar', 'replay'], 'fullstory.com': ['FullStory', 'replay'],
  'mouseflow.com': ['Mouseflow', 'replay'], 'crazyegg.com': ['Crazy Egg', 'replay'], 'logrocket.io': ['LogRocket', 'replay'],
  'lr-ingest.io': ['LogRocket', 'replay'], 'smartlook.com': ['Smartlook', 'replay'], 'quantummetric.com': ['Quantum Metric', 'replay'],
  'contentsquare.net': ['Contentsquare', 'replay'], 'decibelinsight.net': ['Contentsquare', 'replay'], 'luckyorange.com': ['Lucky Orange', 'replay']
};

// Domains that are also dashboards or apps people sign into. They still count as trackers,
// but "throw out tracker cookies" leaves them alone so nobody gets logged out.
self.NO_CLEAN = new Set(['hubspot.com', 'segment.com', 'mixpanel.com', 'amplitude.com', 'heap.io', 'newrelic.com',
  'optimizely.com', 'chartbeat.com', 'parsely.com', 'klaviyo.com', 'braze.com', 'hotjar.com', 'fullstory.com',
  'mouseflow.com', 'crazyegg.com', 'smartlook.com', 'luckyorange.com', 'adroll.com', 'taboola.com', 'outbrain.com',
  'criteo.com', 'liveramp.com', 'branch.io', 'appsflyer.com', 'adjust.com', 'sovrn.com', 'pardot.com', 'zeta.com']);

self.CATEGORY = {
  ad: 'Advertising', analytics: 'Analytics', replay: 'Records your session', data: 'Data broker', social: 'Social tracking'
};

// One-liners for the fortune slip, keyed by company.
self.QUIPS = {
  'Google': 'Google is here. Google is always here.',
  'Meta': 'Meta is watching from a page that isn’t Facebook.',
  'Criteo': 'Criteo is here. You looked at a couch once.',
  'Taboola': 'Taboola is here. You won’t believe what happens next.',
  'Outbrain': 'Outbrain is here with stories you didn’t ask for.',
  'The Trade Desk': 'The Trade Desk is bidding on you right now.',
  'LiveRamp': 'LiveRamp is matching this browser to the rest of you.',
  'Oracle': 'Oracle has a file on you. It is not a short file.',
  'Hotjar': 'Hotjar is recording where your mouse goes.',
  'FullStory': 'FullStory could replay this visit like a video.',
  'Microsoft': 'Microsoft is here, and not just for your spreadsheets.',
  'Amazon': 'Amazon is here. It remembers the cart you abandoned.',
  'TikTok': 'TikTok followed you off the app.',
  'Comscore': 'Comscore is counting you for someone’s ratings.',
  'Adobe': 'Adobe is stitching your visits into a profile.'
};

// Find the tracker entry for a hostname by walking up its labels.
self.lookupTracker = function (host) {
  if (!host) return null;
  host = host.replace(/^\./, '').toLowerCase();
  const parts = host.split('.');
  for (let i = 0; i < parts.length - 1; i++) {
    const d = parts.slice(i).join('.');
    if (self.TRACKERS[d]) return { domain: d, company: self.TRACKERS[d][0], category: self.TRACKERS[d][1] };
  }
  return null;
};

// Rough registrable domain (eTLD+1) without shipping the whole public suffix list.
self.siteOf = function (host) {
  if (!host) return '';
  host = host.replace(/^\./, '').toLowerCase();
  const parts = host.split('.');
  if (parts.length <= 2) return host;
  const two = parts.slice(-2).join('.');
  if (/^(co|com|net|org|gov|ac|edu|ne|or)\.[a-z]{2}$/.test(two)) return parts.slice(-3).join('.');
  return two;
};
