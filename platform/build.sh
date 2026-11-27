#!/usr/bin/env bash
set -euo pipefail

# Build the independent Sessions on the Moon preview.
# Executed from the repository root by Netlify.
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"
rm -rf dist
mkdir -p dist/assets
cp platform/index.html platform/styles.css platform/app.js dist/
cp -R platform/journal dist/journal
cp -R assets/. dist/assets/

# Source files live in platform/, but the published files live at dist/ root.
sed -i 's#\.\./assets/#assets/#g' dist/styles.css dist/app.js
sed -i 's#originalSite: "../"#originalSite: "https://brownlotuspress.netlify.app/"#' dist/app.js
sed -i 's#href="../">Original June on the Moon press kit#href="https://brownlotuspress.netlify.app/">Original June on the Moon press kit#' dist/index.html

test -f dist/index.html
test -f dist/journal/index.html
test -f dist/journal/articles/zamrock.html
test -f dist/journal/archive.html
echo "Built site and journal in dist/"
