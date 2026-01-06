#!/usr/bin/env bash
set -e

PROJECT_ROOT="$(cd "$(dirname "$0")" && pwd)"
EF_CORE="${PROJECT_ROOT}/efl_core"

# --------------------------------------------------------------
# Pull latest code (Git post-receive hook will call this)
git fetch --all
git reset --hard origin/main

# --------------------------------------------------------------
# Laravel dependencies
cd "$EF_CORE"
composer install --no-dev --optimize-autoloader

# --------------------------------------------------------------
# React build (output directly to project root)
cd "$EF_CORE"
npm install
npm run build   # uses vite.config.js → builds into PROJECT_ROOT

# --------------------------------------------------------------
# Laravel migrations & optimisation
cd "$EF_CORE"
php artisan migrate --force
php artisan config:cache
php artisan route:cache
php artisan view:cache

# --------------------------------------------------------------
# Permissions for shared hosting (cPanel typical)
chmod -R 775 storage bootstrap/cache

echo "✅ Deployment finished."
