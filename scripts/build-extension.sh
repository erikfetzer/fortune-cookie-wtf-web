#!/usr/bin/env bash
# Builds store-ready zips for Chrome and Firefox from extension/.
# Chrome gets a service worker only; Firefox gets background scripts only.
set -euo pipefail
cd "$(dirname "$0")/.."
VERSION=$(python3 -c "import json;print(json.load(open('extension/manifest.json'))['version'])")
OUT=dist; rm -rf "$OUT"; mkdir -p "$OUT"
for target in chrome firefox; do
  d="$OUT/$target"; mkdir -p "$d"
  cp -r extension/. "$d/"; rm -rf "$d/README.md" "$d/STORE_LISTING.md" "$d/store"
  python3 - "$d/manifest.json" "$target" <<'PY'
import json,sys
p,t=sys.argv[1],sys.argv[2];m=json.load(open(p))
if t=='chrome':
    m['background']={'service_worker':'background.js'}
    m.pop('browser_specific_settings',None)
else:
    m['background']={'scripts':['trackers.js','background.js']}
json.dump(m,open(p,'w'),indent=2)
PY
  (cd "$d" && zip -qr "../cookie-jar-$VERSION-$target.zip" . -x '.*')
done
ls -la "$OUT"/*.zip
