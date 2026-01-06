# Quick Reference: Production vs Development URLs

## Current Configuration Status

### Development Environment (Local)
| Environment | URL | Status |
|-------------|-----|--------|
| WAMP | `http://localhost/efl/public_html/` | ✅ Configured |
| Artisan Serve | `http://127.0.0.1:8000/` | ✅ Configured |

**Current .env Settings (Development)**:
```env
APP_ENV=local
APP_DEBUG=true
APP_URL=http://localhost/efl/public_html
ASSET_URL=http://localhost/efl/public_html
```

---

### Production Environment
| Environment | URL | Status |
|-------------|-----|--------|
| Production | `https://educationforliberty.com` | 📋 Ready to Deploy |
| WWW Redirect | `https://www.educationforliberty.com` | 📋 Ready to Deploy |

**Required .env Settings (Production)**:
```env
APP_ENV=production
APP_DEBUG=false
APP_URL=https://educationforliberty.com
# ASSET_URL not needed (uses APP_URL by default)
SESSION_DOMAIN=.educationforliberty.com
SESSION_SECURE_COOKIE=true
SANCTUM_STATEFUL_DOMAINS=educationforliberty.com,www.educationforliberty.com
```

---

## Deployment Steps Summary

### 1. Prepare for Production
```bash
# Run the configuration script
cd c:\wamp64\www\EFL\efl_core
php configure_production.php
```

### 2. Update Credentials Manually
Edit `.env` and update:
- Database credentials
- Mail server settings
- Any API keys

### 3. Build Frontend Assets
```bash
npm run build
```

### 4. Upload Files to Server
- Upload `efl_core/` → `/home/username/efl_core/`
- Upload `public_html/` → `/home/username/public_html/`

### 5. Server Setup Commands
```bash
cd /home/username/efl_core

# Install dependencies
composer install --optimize-autoloader --no-dev

# Generate app key
php artisan key:generate

# Run migrations
php artisan migrate --force

# Create storage link
php artisan storage:link

# Cache everything
php artisan config:cache
php artisan route:cache
php artisan view:cache
```

### 6. Set Permissions
```bash
chmod -R 775 storage bootstrap/cache
chown -R www-data:www-data storage bootstrap/cache
```

### 7. Configure SSL
```bash
# Using Let's Encrypt
sudo certbot --apache -d educationforliberty.com -d www.educationforliberty.com
```

---

## File Structure on Production Server

```
/home/username/
├── efl_core/                          # Laravel application (private)
│   ├── app/
│   ├── bootstrap/
│   ├── config/
│   ├── database/
│   ├── resources/
│   ├── routes/
│   ├── storage/
│   ├── vendor/
│   ├── .env                           # Production environment file
│   └── artisan
│
└── public_html/                       # Web root (public)
    ├── build/                         # Compiled assets
    │   ├── assets/
    │   └── manifest.json
    ├── storage/                       # Symlink → ../efl_core/storage/app/public
    ├── .htaccess                      # Apache rewrite rules
    ├── favicon.ico
    ├── index.php                      # Entry point
    └── robots.txt
```

---

## Important URLs to Test After Deployment

### Public Pages
- [ ] `https://educationforliberty.com/` - Homepage
- [ ] `https://educationforliberty.com/universities` - Universities listing
- [ ] `https://educationforliberty.com/programs` - Programs
- [ ] `https://educationforliberty.com/scholarships` - Scholarships
- [ ] `https://educationforliberty.com/blog` - Blog
- [ ] `https://educationforliberty.com/events` - Events
- [ ] `https://educationforliberty.com/shop` - eBook Marketplace

### Authentication
- [ ] `https://educationforliberty.com/login` - Login page
- [ ] `https://educationforliberty.com/register` - Registration
- [ ] `https://educationforliberty.com/forgot-password` - Password reset

### Admin Panel
- [ ] `https://educationforliberty.com/dashboard` - Dashboard
- [ ] `https://educationforliberty.com/admin/universities` - Admin universities
- [ ] `https://educationforliberty.com/admin/settings/homepage` - Homepage settings

---

## Environment Comparison

| Setting | Development | Production |
|---------|-------------|------------|
| APP_ENV | `local` | `production` |
| APP_DEBUG | `true` | `false` |
| APP_URL | `http://localhost/efl/public_html` | `https://educationforliberty.com` |
| ASSET_URL | `http://localhost/efl/public_html` | *(not set - uses APP_URL)* |
| SESSION_DRIVER | `file` | `database` |
| QUEUE_CONNECTION | `sync` | `database` |
| LOG_LEVEL | `debug` | `error` |
| SESSION_SECURE_COOKIE | `false` | `true` |

---

## Pre-Deployment Checklist

### Code & Assets
- [ ] All code committed to Git
- [ ] Frontend built with `npm run build`
- [ ] No debug code or console.logs
- [ ] All routes tested locally
- [ ] Database migrations tested

### Configuration
- [ ] `.env` configured for production
- [ ] `APP_DEBUG=false`
- [ ] `APP_ENV=production`
- [ ] Database credentials updated
- [ ] Mail settings configured
- [ ] SSL certificate ready

### Security
- [ ] Strong `APP_KEY` generated
- [ ] Database passwords are strong
- [ ] `.env` file permissions set to 600
- [ ] Sensitive files not in public directory
- [ ] CSRF protection enabled

### Performance
- [ ] Config cached
- [ ] Routes cached
- [ ] Views cached
- [ ] Composer autoloader optimized
- [ ] OPcache enabled on server

---

## Post-Deployment Verification

### Functionality Tests
- [ ] User can register
- [ ] User can login/logout
- [ ] Password reset works
- [ ] Email sending works
- [ ] File uploads work
- [ ] Images display correctly
- [ ] Forms submit properly
- [ ] Search functionality works

### Performance Tests
- [ ] Page load time < 3 seconds
- [ ] Images optimized
- [ ] Gzip compression enabled
- [ ] Browser caching working
- [ ] No 404 errors in console

### Security Tests
- [ ] HTTPS enforced (HTTP redirects to HTTPS)
- [ ] Security headers present
- [ ] No sensitive data exposed
- [ ] CSRF tokens working
- [ ] XSS protection active

---

## Rollback Plan

If deployment fails:

1. **Restore Database**
   ```bash
   mysql -u user -p database < backup_YYYYMMDD.sql
   ```

2. **Restore Files**
   ```bash
   cp -r /home/username/efl_core.backup/* /home/username/efl_core/
   ```

3. **Clear Caches**
   ```bash
   php artisan optimize:clear
   ```

4. **Restore .env**
   ```bash
   cp .env.backup .env
   ```

---

## Support & Monitoring

### Log Files to Monitor
- `/home/username/efl_core/storage/logs/laravel.log`
- `/var/log/apache2/efl_error.log` (or nginx equivalent)
- `/var/log/mysql/error.log`

### Monitoring Commands
```bash
# Watch Laravel logs
tail -f /home/username/efl_core/storage/logs/laravel.log

# Watch Apache errors
tail -f /var/log/apache2/efl_error.log

# Check disk space
df -h

# Check memory usage
free -m
```

---

## Quick Commands Reference

### Laravel Artisan
```bash
# Clear all caches
php artisan optimize:clear

# Cache for production
php artisan config:cache
php artisan route:cache
php artisan view:cache

# Database
php artisan migrate --force
php artisan db:seed --force

# Storage
php artisan storage:link

# Queue worker
php artisan queue:work
```

### Composer
```bash
# Install production dependencies
composer install --optimize-autoloader --no-dev

# Update dependencies
composer update --no-dev
```

### NPM
```bash
# Build for production
npm run build

# Install dependencies
npm install
```

---

**Last Updated**: January 6, 2026
**Domain**: https://educationforliberty.com
**Status**: Ready for Production Deployment
