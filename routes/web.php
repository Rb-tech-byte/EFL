<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

Route::get('/', function () {
    $universities = \App\Models\University::inRandomOrder()->take(6)->get();
    $scholarships = \App\Models\Scholarship::with('university')->latest()->take(3)->get();

    // Fetch Homepage Settings
    $settings = \App\Models\Setting::where('category', 'homepage')->pluck('value', 'key');

    // Dynamic Stats
    $univCount = \App\Models\University::count();
    $countryCount = \App\Models\University::distinct('country')->count();

    $stats = [
        ['label' => 'Universities', 'value' => $univCount > 0 ? $univCount . '+' : '50+'],
        ['label' => 'Students Placed', 'value' => '1200+'], // Placeholder until Student model is robust
        ['label' => 'Countries', 'value' => $countryCount > 0 ? $countryCount . '+' : '15+'],
        ['label' => 'Scholarships', 'value' => '$2M+'], // Placeholder
    ];

    // Default Features (Can be moved to DB later)
    $features = [
        [
            'title' => 'Direct Admissions',
            'desc' => 'Apply directly to top universities without multiple intermediaries.',
            'icon' => '🎯', // specific emoji or icon name
            'color' => 'bg-blue-50 text-blue-600'
        ],
        [
            'title' => 'Visa Assistance',
            'desc' => 'Expert guidance through complex student visa procedures.',
            'icon' => '✈️',
            'color' => 'bg-teal-50 text-teal-600'
        ],
        [
            'title' => 'Ongoing Support',
            'desc' => 'We are with you from application to graduation.',
            'icon' => '🤝',
            'color' => 'bg-indigo-50 text-indigo-600'
        ]
    ];

    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'universities' => $universities,
        'scholarships' => $scholarships,
        'hero' => [
            'title' => $settings['hero_title'] ?? 'Your Future Starts With Quality Education',
            'subtitle' => $settings['hero_subtitle'] ?? 'Discover world-class universities, simplified application processes, and a community dedicated to your academic success.',
            'background' => $settings['hero_background'] ?? null,
        ],
        'stats' => $stats,
        'features' => $features,
        'options' => [
            'featured_enabled' => $settings['featured_section_enabled'] ?? true,
            'testimonials_enabled' => $settings['testimonials_enabled'] ?? false,
        ]
    ]);
});

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\PublicController;

Route::get('/scholarships', [PublicController::class, 'scholarships'])->name('scholarships');
Route::get('/programs', [\App\Http\Controllers\PublicProgramsController::class, 'index'])->name('programs.index');
Route::get('/programs/{slug}', [\App\Http\Controllers\PublicProgramsController::class, 'show'])->name('programs.show');
Route::get('/universities/{slug}', [\App\Http\Controllers\UniversityController::class, 'show'])->name('universities.show');

Route::get('/dashboard', [DashboardController::class, 'index'])
    ->middleware(['auth', 'verified'])
    ->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // Application Routes
    Route::get('/apply', [\App\Http\Controllers\ApplicationController::class, 'create'])->name('application.create');
    Route::patch('/application/{application}', [\App\Http\Controllers\ApplicationController::class, 'update'])->name('application.update');

    // Admin Routes
    Route::middleware('can:admin')->prefix('admin')->group(function () {
        Route::resource('users', \App\Http\Controllers\Admin\UserController::class)->except(['create', 'edit', 'show'])->names('admin.users');
        Route::resource('universities', \App\Http\Controllers\Admin\UniversityController::class)->except(['create', 'edit', 'show'])->names('admin.universities');
        Route::resource('programs', \App\Http\Controllers\Admin\ProgramController::class)->except(['create', 'edit', 'show'])->names('admin.programs');
        Route::resource('applications', \App\Http\Controllers\Admin\ApplicationController::class)->only(['index', 'show', 'update', 'destroy'])->names('admin.applications');
        Route::resource('scholarships', \App\Http\Controllers\Admin\ScholarshipController::class)->only(['index', 'store', 'update', 'destroy'])->names('admin.scholarships');

        // Settings Routes
        Route::get('settings/system', [\App\Http\Controllers\Admin\SettingsController::class, 'system'])->name('admin.settings.system');
        Route::post('settings/system', [\App\Http\Controllers\Admin\SettingsController::class, 'updateSystem'])->name('admin.settings.system.update');

        Route::get('settings/live-meet', [\App\Http\Controllers\Admin\SettingsController::class, 'liveMeet'])->name('admin.settings.live-meet');
        Route::post('settings/live-meet', [\App\Http\Controllers\Admin\SettingsController::class, 'updateLiveMeet'])->name('admin.settings.live-meet.update');

        Route::get('settings/languages', [\App\Http\Controllers\Admin\SettingsController::class, 'languages'])->name('admin.settings.languages');
        Route::post('settings/languages', [\App\Http\Controllers\Admin\SettingsController::class, 'updateLanguages'])->name('admin.settings.languages.update');

        Route::get('settings/panel', [\App\Http\Controllers\Admin\SettingsController::class, 'panel'])->name('admin.settings.panel');
        Route::post('settings/panel', [\App\Http\Controllers\Admin\SettingsController::class, 'updatePanel'])->name('admin.settings.panel.update');

        Route::get('settings/storage', [\App\Http\Controllers\Admin\SettingsController::class, 'storage'])->name('admin.settings.storage');
        Route::post('settings/storage', [\App\Http\Controllers\Admin\SettingsController::class, 'updateStorage'])->name('admin.settings.storage.update');

        Route::get('settings/email', [\App\Http\Controllers\Admin\SettingsController::class, 'email'])->name('admin.settings.email');
        Route::post('settings/email', [\App\Http\Controllers\Admin\SettingsController::class, 'updateEmail'])->name('admin.settings.email.update');

        Route::get('settings/sms', [\App\Http\Controllers\Admin\SettingsController::class, 'sms'])->name('admin.settings.sms');
        Route::post('settings/sms', [\App\Http\Controllers\Admin\SettingsController::class, 'updateSms'])->name('admin.settings.sms.update');

        Route::get('settings/chat', [\App\Http\Controllers\Admin\SettingsController::class, 'chat'])->name('admin.settings.chat');
        Route::post('settings/chat', [\App\Http\Controllers\Admin\SettingsController::class, 'updateChat'])->name('admin.settings.chat.update');

        Route::get('settings/payment', [\App\Http\Controllers\Admin\SettingsController::class, 'payment'])->name('admin.settings.payment');
        Route::post('settings/payment', [\App\Http\Controllers\Admin\SettingsController::class, 'updatePayment'])->name('admin.settings.payment.update');

        Route::get('settings/firebase', [\App\Http\Controllers\Admin\SettingsController::class, 'firebase'])->name('admin.settings.firebase');
        Route::post('settings/firebase', [\App\Http\Controllers\Admin\SettingsController::class, 'updateFirebase'])->name('admin.settings.firebase.update');

        Route::get('settings/homepage', [\App\Http\Controllers\Admin\SettingsController::class, 'homepage'])->name('admin.settings.homepage');
        Route::post('settings/homepage', [\App\Http\Controllers\Admin\SettingsController::class, 'updateHomepage'])->name('admin.settings.homepage.update');

        // Menu Management Routes
        Route::get('menu', [\App\Http\Controllers\Admin\MenuController::class, 'index'])->name('admin.menu.index');
        Route::post('menu', [\App\Http\Controllers\Admin\MenuController::class, 'store'])->name('admin.menu.store');
        Route::put('menu/{id}', [\App\Http\Controllers\Admin\MenuController::class, 'update'])->name('admin.menu.update');
        Route::delete('menu/{id}', [\App\Http\Controllers\Admin\MenuController::class, 'destroy'])->name('admin.menu.destroy');

        Route::post('menu/column', [\App\Http\Controllers\Admin\MenuController::class, 'storeColumn'])->name('admin.menu.column.store');
        Route::put('menu/column/{id}', [\App\Http\Controllers\Admin\MenuController::class, 'updateColumn'])->name('admin.menu.column.update');
        Route::delete('menu/column/{id}', [\App\Http\Controllers\Admin\MenuController::class, 'destroyColumn'])->name('admin.menu.column.destroy');

        Route::post('menu/link', [\App\Http\Controllers\Admin\MenuController::class, 'storeLink'])->name('admin.menu.link.store');
        Route::put('menu/link/{id}', [\App\Http\Controllers\Admin\MenuController::class, 'updateLink'])->name('admin.menu.link.update');
        Route::delete('menu/link/{id}', [\App\Http\Controllers\Admin\MenuController::class, 'destroyLink'])->name('admin.menu.link.destroy');
    });

    // Staff Routes
    Route::middleware('can:staff')->prefix('staff')->group(function () {
        Route::get('/applications', function () {
            return Inertia::render('Staff/Applications');
        })->name('staff.applications');
        Route::get('/tasks', function () {
            return Inertia::render('Staff/Tasks');
        })->name('staff.tasks');
    });

    // Student Routes
    Route::middleware('can:student')->group(function () {
        Route::get('/applications', function () {
            return Inertia::render('Student/Applications');
        })->name('student.applications');
        Route::get('/universities', function () {
            return Inertia::render('Student/Universities');
        })->name('student.universities');
        Route::get('/messages', function () {
            return Inertia::render('Student/Messages');
        })->name('student.messages');
    });
});

require __DIR__ . '/auth.php';
