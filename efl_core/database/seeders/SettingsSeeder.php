<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Setting;

class SettingsSeeder extends Seeder
{
    public function run(): void
    {
        $defaultSettings = [
            // System Settings
            ['key' => 'site_name', 'value' => 'EducationForLiberty', 'category' => 'system', 'type' => 'text'],
            ['key' => 'site_description', 'value' => 'Your gateway to quality education worldwide', 'category' => 'system', 'type' => 'textarea'],
            ['key' => 'timezone', 'value' => 'UTC', 'category' => 'system', 'type' => 'text'],
            ['key' => 'date_format', 'value' => 'Y-m-d', 'category' => 'system', 'type' => 'text'],
            ['key' => 'time_format', 'value' => 'H:i:s', 'category' => 'system', 'type' => 'text'],

            // Email Settings
            ['key' => 'mail_driver', 'value' => 'smtp', 'category' => 'email', 'type' => 'text'],
            ['key' => 'mail_host', 'value' => '', 'category' => 'email', 'type' => 'text'],
            ['key' => 'mail_port', 'value' => '587', 'category' => 'email', 'type' => 'text'],
            ['key' => 'mail_encryption', 'value' => 'tls', 'category' => 'email', 'type' => 'text'],

            // Payment Settings
            ['key' => 'pesapal_environment', 'value' => 'sandbox', 'category' => 'payment', 'type' => 'text'],
            ['key' => 'offline_payment_enabled', 'value' => 'true', 'category' => 'payment', 'type' => 'boolean'],
            ['key' => 'offline_payment_instructions', 'value' => '<p>Please make payment to the following bank account:</p><ul><li>Bank: Example Bank</li><li>Account Name: EducationForLiberty</li><li>Account Number: 1234567890</li></ul>', 'category' => 'payment', 'type' => 'richtext'],

            // Homepage Settings
            ['key' => 'hero_title', 'value' => 'Your Future Starts <br><span class="text-gradient">With Quality Education</span>', 'category' => 'homepage', 'type' => 'richtext'],
            ['key' => 'hero_subtitle', 'value' => 'Discover world-class universities, simplified application processes, and a community dedicated to your academic success.', 'category' => 'homepage', 'type' => 'richtext'],
            ['key' => 'featured_section_enabled', 'value' => 'true', 'category' => 'homepage', 'type' => 'boolean'],
            ['key' => 'testimonials_enabled', 'value' => 'true', 'category' => 'homepage', 'type' => 'boolean'],
        ];

        foreach ($defaultSettings as $setting) {
            Setting::updateOrCreate(
                ['key' => $setting['key']],
                $setting
            );
        }
    }
}
