#!/usr/bin/env bash
set -euo pipefail

# Publish the independent Sessions on the Moon prototype from a repository
# that also hosts the original June on the Moon press kit.
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"
rm -rf dist
mkdir -p dist/assets
cp platform/index.html platform/styles.css platform/app.js dist/\ncp -R platform/journal dist/journal
cp -R assets/. dist/assets/

# Source files live in platform/, so they access the root assets via ../assets.
# After staging dist/, assets sit beside the prototype pages.
python3 - <<'PY'
from pathlib import Path
folder = Path("dist")
for name in ("styles.css", "app.js"):
    path = folder / name
    text = path.read_text()
    text = text.replace("../assets/", "assets/")
    if name == "app.js":
        text = text.replace('originalSite: "../"', 'originalSite: "https://brownlotuspress.netlify.app/"')
    path.write_text(text)
html = folder / "index.html"
text = html.read_text().replace('href="../">Original June on the Moon press kit', 'href="https://brownlotuspress.netlify.app/">Original June on the Moon press kit')
html.write_text(text)
PY
echo "Built Sessions on the Moon prototype at dist/"
