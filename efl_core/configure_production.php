<?php

/**
 * Production Environment Configuration Script
 * 
 * This script updates the .env file for production deployment
 * Domain: https://educationforliberty.com
 * 
 * Usage: php configure_production.php
 */

$envPath = __DIR__ . '/.env';

if (!file_exists($envPath)) {
    die("Error: .env file not found. Please copy .env.example to .env first.\n");
}

echo "=================================================\n";
echo "Production Environment Configuration\n";
echo "Domain: https://educationforliberty.com\n";
echo "=================================================\n\n";

// Read current .env content
$content = file_get_contents($envPath);

// Backup current .env
$backupPath = $envPath . '.backup.' . date('Y-m-d_H-i-s');
file_put_contents($backupPath, $content);
echo "✓ Backup created: " . basename($backupPath) . "\n";

// Update APP_ENV
$content = preg_replace('/^APP_ENV=.*$/m', 'APP_ENV=production', $content);
echo "✓ Set APP_ENV=production\n";

// Update APP_DEBUG
$content = preg_replace('/^APP_DEBUG=.*$/m', 'APP_DEBUG=false', $content);
echo "✓ Set APP_DEBUG=false\n";

// Update APP_URL
$content = preg_replace('/^APP_URL=.*$/m', 'APP_URL=https://educationforliberty.com', $content);
echo "✓ Set APP_URL=https://educationforliberty.com\n";

// Remove or comment out ASSET_URL (use default)
if (preg_match('/^ASSET_URL=/m', $content)) {
    $content = preg_replace('/^ASSET_URL=.*$/m', '# ASSET_URL=https://educationforliberty.com', $content);
    echo "✓ Commented out ASSET_URL (using default)\n";
}

// Update LOG_LEVEL
if (preg_match('/^LOG_LEVEL=/m', $content)) {
    $content = preg_replace('/^LOG_LEVEL=.*$/m', 'LOG_LEVEL=error', $content);
} else {
    $content .= "\nLOG_LEVEL=error";
}
echo "✓ Set LOG_LEVEL=error\n";

// Update SESSION_DRIVER to database for production
$content = preg_replace('/^SESSION_DRIVER=.*$/m', 'SESSION_DRIVER=database', $content);
echo "✓ Set SESSION_DRIVER=database\n";

// Update QUEUE_CONNECTION to database
$content = preg_replace('/^QUEUE_CONNECTION=.*$/m', 'QUEUE_CONNECTION=database', $content);
echo "✓ Set QUEUE_CONNECTION=database\n";

// Add SESSION_DOMAIN if not exists
if (!preg_match('/^SESSION_DOMAIN=/m', $content)) {
    $content .= "\nSESSION_DOMAIN=.educationforliberty.com";
    echo "✓ Added SESSION_DOMAIN=.educationforliberty.com\n";
}

// Add SESSION_SECURE_COOKIE if not exists
if (!preg_match('/^SESSION_SECURE_COOKIE=/m', $content)) {
    $content .= "\nSESSION_SECURE_COOKIE=true";
    echo "✓ Added SESSION_SECURE_COOKIE=true\n";
}

// Add SANCTUM_STATEFUL_DOMAINS if not exists
if (!preg_match('/^SANCTUM_STATEFUL_DOMAINS=/m', $content)) {
    $content .= "\nSANCTUM_STATEFUL_DOMAINS=educationforliberty.com,www.educationforliberty.com";
    echo "✓ Added SANCTUM_STATEFUL_DOMAINS\n";
}

// Write updated content
file_put_contents($envPath, $content);

echo "\n=================================================\n";
echo "Configuration Updated Successfully!\n";
echo "=================================================\n\n";

echo "IMPORTANT: Please manually update the following in .env:\n\n";
echo "1. Database Configuration:\n";
echo "   DB_DATABASE=your_production_database\n";
echo "   DB_USERNAME=your_production_username\n";
echo "   DB_PASSWORD=your_production_password\n\n";

echo "2. Mail Configuration:\n";
echo "   MAIL_HOST=smtp.your-provider.com\n";
echo "   MAIL_USERNAME=your_email@educationforliberty.com\n";
echo "   MAIL_PASSWORD=your_mail_password\n";
echo "   MAIL_FROM_ADDRESS=noreply@educationforliberty.com\n\n";

echo "3. Generate Application Key:\n";
echo "   php artisan key:generate\n\n";

echo "4. After deployment, run:\n";
echo "   php artisan migrate --force\n";
echo "   php artisan storage:link\n";
echo "   php artisan config:cache\n";
echo "   php artisan route:cache\n";
echo "   php artisan view:cache\n\n";

echo "Backup file saved as: " . basename($backupPath) . "\n";
echo "You can restore it if needed using:\n";
echo "cp " . basename($backupPath) . " .env\n\n";
