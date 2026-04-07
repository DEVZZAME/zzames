#!/usr/bin/env bash

set -euo pipefail

APP_DIR="${APP_DIR:-/var/www/zzames}"

cd "$APP_DIR"

git fetch origin main
git checkout main
git pull --ff-only origin main

npm ci
npm run prisma:generate
npx prisma db push
npm run build

if pm2 describe zzames >/dev/null 2>&1; then
  pm2 restart zzames --update-env
else
  pm2 start ecosystem.config.js --update-env
fi

pm2 save
