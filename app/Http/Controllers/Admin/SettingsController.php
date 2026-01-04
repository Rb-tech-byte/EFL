<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Setting;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SettingsController extends Controller
{
    /**
     * Display system settings
     */
    public function system()
    {
        $settings = Setting::where('category', 'system')->get()->keyBy('key');

        return Inertia::render('Admin/Settings/System', [
            'settings' => $settings,
        ]);
    }

    /**
     * Update system settings
     */
    public function updateSystem(Request $request)
    {
        $validated = $request->validate([
            'site_name' => 'nullable|string|max:255',
            'site_description' => 'nullable|string',
            'site_logo' => 'nullable|string',
            'site_logo_file' => 'nullable|image|max:2048',
            'site_favicon' => 'nullable|string',
            'site_favicon_file' => 'nullable|image|max:1024',
            'timezone' => 'nullable|string',
            'date_format' => 'nullable|string',
            'time_format' => 'nullable|string',
        ]);

        if ($request->hasFile('site_logo_file')) {
            $path = $request->file('site_logo_file')->store('settings', 'public');
            $validated['site_logo'] = '/storage/' . $path;
        }
        unset($validated['site_logo_file']);

        if ($request->hasFile('site_favicon_file')) {
            $path = $request->file('site_favicon_file')->store('settings', 'public');
            $validated['site_favicon'] = '/storage/' . $path;
        }
        unset($validated['site_favicon_file']);

        foreach ($validated as $key => $value) {
            Setting::set($key, $value, 'system');
        }

        return back()->with('success', 'System settings updated successfully');
    }

    /**
     * Display live meet settings
     */
    public function liveMeet()
    {
        $settings = Setting::where('category', 'live_meet')->get()->keyBy('key');

        return Inertia::render('Admin/Settings/LiveMeet', [
            'settings' => $settings,
        ]);
    }

    /**
     * Update live meet settings
     */
    public function updateLiveMeet(Request $request)
    {
        $validated = $request->validate([
            'zoom_api_key' => 'nullable|string',
            'zoom_api_secret' => 'nullable|string',
            'google_meet_enabled' => 'nullable|boolean',
            'microsoft_teams_enabled' => 'nullable|boolean',
        ]);

        foreach ($validated as $key => $value) {
            Setting::set($key, $value, 'live_meet');
        }

        return back()->with('success', 'Live meet settings updated successfully');
    }

    /**
     * Display panel settings
     */
    public function panel()
    {
        $settings = Setting::where('category', 'panel')->get()->keyBy('key');

        return Inertia::render('Admin/Settings/Panel', [
            'settings' => $settings,
        ]);
    }

    /**
     * Update panel settings
     */
    public function updatePanel(Request $request)
    {
        $validated = $request->validate([
            'admin_theme' => 'nullable|string',
            'items_per_page' => 'nullable|integer',
            'enable_maintenance' => 'nullable|boolean',
            'maintenance_message' => 'nullable|string',
        ]);

        foreach ($validated as $key => $value) {
            Setting::set($key, $value, 'panel');
        }

        return back()->with('success', 'Panel settings updated successfully');
    }

    /**
     * Display storage settings
     */
    public function storage()
    {
        $settings = Setting::where('category', 'storage')->get()->keyBy('key');

        return Inertia::render('Admin/Settings/Storage', [
            'settings' => $settings,
        ]);
    }

    /**
     * Update storage settings
     */
    public function updateStorage(Request $request)
    {
        $validated = $request->validate([
            'storage_driver' => 'nullable|string',
            's3_key' => 'nullable|string',
            's3_secret' => 'nullable|string',
            's3_region' => 'nullable|string',
            's3_bucket' => 'nullable|string',
            'max_upload_size' => 'nullable|integer',
        ]);

        foreach ($validated as $key => $value) {
            Setting::set($key, $value, 'storage');
        }

        return back()->with('success', 'Storage settings updated successfully');
    }

    /**
     * Display email settings
     */
    public function email()
    {
        $settings = Setting::where('category', 'email')->get()->keyBy('key');

        return Inertia::render('Admin/Settings/Email', [
            'settings' => $settings,
        ]);
    }

    /**
     * Update email settings
     */
    public function updateEmail(Request $request)
    {
        $validated = $request->validate([
            'mail_driver' => 'nullable|string',
            'mail_host' => 'nullable|string',
            'mail_port' => 'nullable|integer',
            'mail_username' => 'nullable|string',
            'mail_password' => 'nullable|string',
            'mail_encryption' => 'nullable|string',
            'mail_from_address' => 'nullable|email',
            'mail_from_name' => 'nullable|string',
        ]);

        foreach ($validated as $key => $value) {
            Setting::set($key, $value, 'email');
        }

        return back()->with('success', 'Email settings updated successfully');
    }

    /**
     * Display SMS settings
     */
    public function sms()
    {
        $settings = Setting::where('category', 'sms')->get()->keyBy('key');

        return Inertia::render('Admin/Settings/SMS', [
            'settings' => $settings,
        ]);
    }

    /**
     * Update SMS settings
     */
    public function updateSms(Request $request)
    {
        $validated = $request->validate([
            'sms_provider' => 'nullable|string',
            'twilio_sid' => 'nullable|string',
            'twilio_token' => 'nullable|string',
            'twilio_from' => 'nullable|string',
        ]);

        foreach ($validated as $key => $value) {
            Setting::set($key, $value, 'sms');
        }

        return back()->with('success', 'SMS settings updated successfully');
    }

    /**
     * Display chat messenger settings
     */
    public function chat()
    {
        $settings = Setting::where('category', 'chat')->get()->keyBy('key');

        return Inertia::render('Admin/Settings/Chat', [
            'settings' => $settings,
        ]);
    }

    /**
     * Update chat settings
     */
    public function updateChat(Request $request)
    {
        $validated = $request->validate([
            'chat_enabled' => 'nullable|boolean',
            'pusher_app_id' => 'nullable|string',
            'pusher_key' => 'nullable|string',
            'pusher_secret' => 'nullable|string',
            'pusher_cluster' => 'nullable|string',
        ]);

        foreach ($validated as $key => $value) {
            Setting::set($key, $value, 'chat');
        }

        return back()->with('success', 'Chat settings updated successfully');
    }

    /**
     * Display payment gateway settings
     */
    public function payment()
    {
        $settings = Setting::where('category', 'payment')->get()->keyBy('key');

        return Inertia::render('Admin/Settings/Payment', [
            'settings' => $settings,
        ]);
    }

    /**
     * Update payment settings
     */
    public function updatePayment(Request $request)
    {
        $validated = $request->validate([
            'pesapal_consumer_key' => 'nullable|string',
            'pesapal_consumer_secret' => 'nullable|string',
            'pesapal_environment' => 'nullable|string',
            'offline_payment_enabled' => 'nullable|boolean',
            'offline_payment_instructions' => 'nullable|string',
        ]);

        foreach ($validated as $key => $value) {
            Setting::set($key, $value, 'payment');
        }

        return back()->with('success', 'Payment settings updated successfully');
    }

    /**
     * Display Firebase settings
     */
    public function firebase()
    {
        $settings = Setting::where('category', 'firebase')->get()->keyBy('key');

        return Inertia::render('Admin/Settings/Firebase', [
            'settings' => $settings,
        ]);
    }

    /**
     * Update Firebase settings
     */
    public function updateFirebase(Request $request)
    {
        $validated = $request->validate([
            'firebase_api_key' => 'nullable|string',
            'firebase_auth_domain' => 'nullable|string',
            'firebase_project_id' => 'nullable|string',
            'firebase_storage_bucket' => 'nullable|string',
            'firebase_messaging_sender_id' => 'nullable|string',
            'firebase_app_id' => 'nullable|string',
        ]);

        foreach ($validated as $key => $value) {
            Setting::set($key, $value, 'firebase');
        }

        return back()->with('success', 'Firebase settings updated successfully');
    }

    /**
     * Display homepage settings
     */
    public function homepage()
    {
        $settings = Setting::where('category', 'homepage')->get()->keyBy('key');

        return Inertia::render('Admin/Settings/Homepage', [
            'settings' => $settings,
        ]);
    }

    /**
     * Update homepage settings
     */
    public function updateHomepage(Request $request)
    {
        $validated = $request->validate([
            'hero_title' => 'nullable|string',
            'hero_subtitle' => 'nullable|string',
            'hero_background' => 'nullable|string',
            'hero_background_file' => 'nullable|image|max:5120',
            'featured_section_enabled' => 'nullable|boolean',
            'testimonials_enabled' => 'nullable|boolean',
        ]);

        if ($request->hasFile('hero_background_file')) {
            $path = $request->file('hero_background_file')->store('settings', 'public');
            $validated['hero_background'] = '/storage/' . $path;
        }
        unset($validated['hero_background_file']);

        foreach ($validated as $key => $value) {
            Setting::set($key, $value, 'homepage');
        }

        return back()->with('success', 'Homepage settings updated successfully');
    }

    /**
     * Display languages
     */
    public function languages()
    {
        $settings = Setting::where('category', 'language')->get()->keyBy('key');

        return Inertia::render('Admin/Settings/Languages', [
            'settings' => $settings,
        ]);
    }

    /**
     * Update language settings
     */
    public function updateLanguages(Request $request)
    {
        $validated = $request->validate([
            'default_language' => 'nullable|string',
            'available_languages' => 'nullable|array',
            'rtl_enabled' => 'nullable|boolean',
        ]);

        foreach ($validated as $key => $value) {
            $valueToStore = is_array($value) ? json_encode($value) : $value;
            Setting::set($key, $valueToStore, 'language', is_array($value) ? 'json' : 'text');
        }

        return back()->with('success', 'Language settings updated successfully');
    }
}
