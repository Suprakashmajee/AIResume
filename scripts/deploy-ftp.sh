#!/usr/bin/env bash
set -euo pipefail

: "${HOSTINGER_FTP_HOST:?Set HOSTINGER_FTP_HOST}"
: "${HOSTINGER_FTP_USER:?Set HOSTINGER_FTP_USER}"
: "${HOSTINGER_FTP_PASSWORD:?Set HOSTINGER_FTP_PASSWORD}"
FTP_PATH="${HOSTINGER_FTP_PATH:-public_html}"

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

npm run build
cp dist/index.html dist/404.html

if ! command -v lftp >/dev/null 2>&1; then
  echo "Installing lftp..."
  sudo apt-get update -qq && sudo apt-get install -y -qq lftp
fi

echo "Uploading dist/ to ${HOSTINGER_FTP_HOST}:${FTP_PATH} ..."
lftp -u "$HOSTINGER_FTP_USER","$HOSTINGER_FTP_PASSWORD" "$HOSTINGER_FTP_HOST" <<EOF
set ftp:ssl-allow no
set mirror:use-pget-n 5
cd $FTP_PATH
mirror -R --delete --verbose dist/ .
bye
EOF

echo "Done. Check https://bill-store.com and https://bill-store.com/ads.txt"
