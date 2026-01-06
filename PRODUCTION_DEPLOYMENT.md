# Production Deployment Configuration

## Domain: https://educationforliberty.com/

### Environment Configuration (.env)

```env
APP_NAME="Education For Liberty"
APP_ENV=production
APP_KEY=base64:YOUR_PRODUCTION_KEY_HERE
APP_DEBUG=false
APP_TIMEZONE=UTC
APP_URL=https://educationforliberty.com

LOG_CHANNEL=stack
LOG_DEPRECATIONS_CHANNEL=null
LOG_LEVEL=error

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=your_production_database
DB_USERNAME=your_production_username
DB_PASSWORD=your_production_password

BROADCAST_CONNECTION=log
FILESYSTEM_DISK=local
QUEUE_CONNECTION=database
SESSION_DRIVER=database
SESSION_LIFETIME=120

CACHE_STORE=database
CACHE_PREFIX=efl_cache

MEMCACHED_HOST=127.0.0.1

REDIS_CLIENT=phpredis
REDIS_HOST=127.0.0.1
REDIS_PASSWORD=null
REDIS_PORT=6379

MAIL_MAILER=smtp
MAIL_HOST=smtp.your-provider.com
MAIL_PORT=587
MAIL_USERNAME=your_email@educationforliberty.com
MAIL_PASSWORD=your_mail_password
MAIL_ENCRYPTION=tls
MAIL_FROM_ADDRESS="noreply@educationforliberty.com"
MAIL_FROM_NAME="${APP_NAME}"

AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_DEFAULT_REGION=us-east-1
AWS_BUCKET=
AWS_USE_PATH_STYLE_ENDPOINT=false

VITE_APP_NAME="${APP_NAME}"

# Asset URL (optional, only if using CDN)
# ASSET_URL=https://cdn.educationforliberty.com

# Session Configuration
SESSION_DOMAIN=.educationforliberty.com
SESSION_SECURE_COOKIE=true
SESSION_SAME_SITE=lax

# Additional Production Settings
SANCTUM_STATEFUL_DOMAINS=educationforliberty.com,www.educationforliberty.com
```

### Server Configuration

#### Apache Virtual Host Configuration

```apache
<VirtualHost *:80>
    ServerName educationforliberty.com
    ServerAlias www.educationforliberty.com
    
    # Redirect all HTTP to HTTPS
    RewriteEngine On
    RewriteCond %{HTTPS} off
    RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
</VirtualHost>

<VirtualHost *:443>
    ServerName educationforliberty.com
    ServerAlias www.educationforliberty.com
    
    DocumentRoot /home/username/public_html
    
    <Directory /home/username/public_html>
        Options -Indexes +FollowSymLinks
        AllowOverride All
        Require all granted
    </Directory>
    
    # SSL Configuration
    SSLEngine on
    SSLCertificateFile /path/to/ssl/certificate.crt
    SSLCertificateKeyFile /path/to/ssl/private.key
    SSLCertificateChainFile /path/to/ssl/ca_bundle.crt
    
    # Security Headers
    Header always set X-Frame-Options "SAMEORIGIN"
    Header always set X-Content-Type-Options "nosniff"
    Header always set X-XSS-Protection "1; mode=block"
    Header always set Referrer-Policy "strict-origin-when-cross-origin"
    Header always set Permissions-Policy "geolocation=(), microphone=(), camera=()"
    
    # Error Logs
    ErrorLog ${APACHE_LOG_DIR}/efl_error.log
    CustomLog ${APACHE_LOG_DIR}/efl_access.log combined
</VirtualHost>
```

#### Nginx Configuration (Alternative)

```nginx
server {
    listen 80;
    listen [::]:80;
    server_name educationforliberty.com www.educationforliberty.com;
    
    # Redirect to HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name educationforliberty.com www.educationforliberty.com;
    
    root /home/username/public_html;
    index index.php index.html;
    
    # SSL Configuration
    ssl_certificate /path/to/ssl/certificate.crt;
    ssl_certificate_key /path/to/ssl/private.key;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers on;
    
    # Security Headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;
    
    # Gzip Compression
    gzip on;
    gzip_vary on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
    
    # Laravel Routes
    location / {
        try_files $uri $uri/ /index.php?$query_string;
    }
    
    # PHP Processing
    location ~ \.php$ {
        fastcgi_pass unix:/var/run/php/php8.4-fpm.sock;
        fastcgi_index index.php;
        fastcgi_param SCRIPT_FILENAME $realpath_root$fastcgi_script_name;
        include fastcgi_params;
    }
    
    # Deny access to hidden files
    location ~ /\. {
        deny all;
    }
    
    # Cache static assets
    location ~* \.(jpg|jpeg|png|gif|ico|css|js|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

### Deployment Checklist

#### Pre-Deployment
- [ ] Backup current production database
- [ ] Test all features in staging environment
- [ ] Update `.env` with production values
- [ ] Generate new `APP_KEY` for production
- [ ] Configure SSL certificate
- [ ] Set up email service (SMTP)
- [ ] Configure database credentials
- [ ] Review and update `config/app.php` if needed

#### File Upload
- [ ] Upload `efl_core/` directory to `/home/username/efl_core/`
- [ ] Upload `public_html/` contents to `/home/username/public_html/`
- [ ] Ensure `public_html/index.php` points to correct path

#### Server Commands
```bash
# Navigate to application directory
cd /home/username/efl_core

# Install dependencies (production only)
composer install --optimize-autoloader --no-dev

# Generate application key (if not set)
php artisan key:generate

# Run database migrations
php artisan migrate --force

# Seed initial data (first deployment only)
php artisan db:seed --force

# Create storage symlink
php artisan storage:link

# Cache configuration
php artisan config:cache
php artisan route:cache
php artisan view:cache

# Clear old caches
php artisan optimize:clear
```

#### File Permissions
```bash
# Set ownership (replace 'username' with actual user)
chown -R username:username /home/username/efl_core
chown -R username:username /home/username/public_html

# Set directory permissions
find /home/username/efl_core -type d -exec chmod 755 {} \;
find /home/username/public_html -type d -exec chmod 755 {} \;

# Set file permissions
find /home/username/efl_core -type f -exec chmod 644 {} \;
find /home/username/public_html -type f -exec chmod 644 {} \;

# Storage and cache directories need write access
chmod -R 775 /home/username/efl_core/storage
chmod -R 775 /home/username/efl_core/bootstrap/cache

# If using Apache, may need www-data group
chgrp -R www-data /home/username/efl_core/storage
chgrp -R www-data /home/username/efl_core/bootstrap/cache
```

#### Post-Deployment Verification
- [ ] Visit https://educationforliberty.com
- [ ] Test user registration
- [ ] Test login/logout
- [ ] Verify email sending
- [ ] Test file uploads
- [ ] Check all public pages load
- [ ] Verify admin panel access
- [ ] Test application submission
- [ ] Check eBook marketplace
- [ ] Monitor error logs

### SSL Certificate Setup

#### Using Let's Encrypt (Recommended - Free)
```bash
# Install Certbot
sudo apt-get update
sudo apt-get install certbot python3-certbot-apache

# For Apache
sudo certbot --apache -d educationforliberty.com -d www.educationforliberty.com

# For Nginx
sudo certbot --nginx -d educationforliberty.com -d www.educationforliberty.com

# Auto-renewal (add to crontab)
0 0 * * * certbot renew --quiet
```

#### Using Commercial SSL
1. Purchase SSL certificate from provider
2. Generate CSR on server
3. Submit CSR to certificate authority
4. Download certificate files
5. Install certificate on server
6. Configure virtual host with certificate paths

### Database Configuration

#### Create Production Database
```sql
CREATE DATABASE efl_production CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'efl_user'@'localhost' IDENTIFIED BY 'strong_password_here';
GRANT ALL PRIVILEGES ON efl_production.* TO 'efl_user'@'localhost';
FLUSH PRIVILEGES;
```

#### Import Database (if migrating)
```bash
# Export from development
mysqldump -u root -p efl_database > efl_backup.sql

# Import to production
mysql -u efl_user -p efl_production < efl_backup.sql
```

### Performance Optimization

#### Enable OPcache (php.ini)
```ini
opcache.enable=1
opcache.memory_consumption=256
opcache.interned_strings_buffer=16
opcache.max_accelerated_files=10000
opcache.revalidate_freq=60
opcache.fast_shutdown=1
```

#### Queue Workers (Supervisor)
```ini
[program:efl-worker]
process_name=%(program_name)s_%(process_num)02d
command=php /home/username/efl_core/artisan queue:work --sleep=3 --tries=3 --max-time=3600
autostart=true
autorestart=true
stopasgroup=true
killasgroup=true
user=username
numprocs=2
redirect_stderr=true
stdout_logfile=/home/username/efl_core/storage/logs/worker.log
stopwaitsecs=3600
```

#### Cron Jobs
```bash
# Add to crontab (crontab -e)
* * * * * cd /home/username/efl_core && php artisan schedule:run >> /dev/null 2>&1
```

### Monitoring & Maintenance

#### Log Rotation
```bash
# Create logrotate config: /etc/logrotate.d/efl
/home/username/efl_core/storage/logs/*.log {
    daily
    missingok
    rotate 14
    compress
    delaycompress
    notifempty
    create 0640 username www-data
    sharedscripts
}
```

#### Backup Strategy
```bash
#!/bin/bash
# Daily backup script

DATE=$(date +%Y%m%d)
BACKUP_DIR="/home/username/backups"

# Database backup
mysqldump -u efl_user -p'password' efl_production > $BACKUP_DIR/db_$DATE.sql
gzip $BACKUP_DIR/db_$DATE.sql

# File backup
tar -czf $BACKUP_DIR/files_$DATE.tar.gz /home/username/efl_core/storage/app

# Keep only last 7 days
find $BACKUP_DIR -name "*.gz" -mtime +7 -delete
```

### Security Hardening

#### Additional .htaccess Rules (public_html/.htaccess)
```apache
# Disable directory browsing
Options -Indexes

# Prevent access to sensitive files
<FilesMatch "^\.">
    Require all denied
</FilesMatch>

# Protect .env file
<Files .env>
    Require all denied
</Files>

# Limit upload file size (adjust as needed)
php_value upload_max_filesize 20M
php_value post_max_size 25M

# Disable PHP execution in uploads directory
<Directory "storage">
    php_flag engine off
</Directory>
```

#### Firewall Rules
```bash
# Allow HTTP/HTTPS
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp

# Allow SSH (if needed)
sudo ufw allow 22/tcp

# Enable firewall
sudo ufw enable
```

### Troubleshooting

#### Common Issues

**500 Internal Server Error**
- Check `.env` file exists and is readable
- Verify `APP_KEY` is set
- Check file permissions on storage/
- Review error logs in `storage/logs/`

**404 on Assets**
- Run `php artisan storage:link`
- Check `public_html/build/` directory exists
- Verify `.htaccess` is present and working

**Database Connection Error**
- Verify database credentials in `.env`
- Check database server is running
- Ensure database user has proper permissions

**Email Not Sending**
- Verify SMTP credentials
- Check firewall allows outbound port 587/465
- Test with `php artisan tinker` and `Mail::raw()`

### Support Contacts

- **Hosting Support**: Contact your hosting provider
- **SSL Issues**: Certificate authority support
- **Application Issues**: Development team
- **Emergency**: Keep backup contact information

---

**Document Version**: 1.0
**Last Updated**: January 6, 2026
**Next Review**: Before production deployment
