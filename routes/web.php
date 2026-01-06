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
    $programCount = \App\Models\Program::count();
    $scholarshipsCount = \App\Models\Scholarship::count();

    // Dynamic Features from Settings
    $features = isset($settings['homepage_features'])
        ? json_decode($settings['homepage_features'], true)
        : [
            [
                'title' => 'Direct Admissions',
                'desc' => 'Apply directly to top universities without multiple intermediaries.',
                'icon' => '🎯',
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

    // Dynamic Stats from Settings
    $customStats = isset($settings['homepage_stats']) ? json_decode($settings['homepage_stats'], true) : null;
    $stats = $customStats ?: [
        ['label' => 'Universities', 'value' => $univCount > 0 ? $univCount . '+' : '50+'],
        ['label' => 'Students Placed', 'value' => '1200+'],
        ['label' => 'Countries', 'value' => $countryCount > 0 ? $countryCount . '+' : '15+'],
        ['label' => 'Scholarships', 'value' => '$2M+'],
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
            'announcement' => $settings['hero_announcement'] ?? 'Spring 2026 Intake Now Open',
            'backgrounds' => isset($settings['hero_backgrounds']) ? explode(',', $settings['hero_backgrounds']) : [$settings['hero_background'] ?? null],
            'cta_title' => $settings['cta_title'] ?? 'Ready to Shape Your <br /><span class="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-indigo-600">Global Future?</span>',
            'cta_subtitle' => $settings['cta_subtitle'] ?? 'Join thousands of students achieving their dreams with EducationForLiberty. Expert guidance is just a click away.',
            'cta_badge' => $settings['cta_badge'] ?? 'Start Your Journey',
            'features_title' => $settings['features_title'] ?? 'Simplified Admissions, <span class="text-primary-600">Global Success.</span>',
            'features_subtitle' => $settings['features_subtitle'] ?? 'We\'ve partnered with top-tier institutions to provide you with a direct, transparent, and successful application journey.',
            'features_images' => isset($settings['features_images']) ? explode(',', $settings['features_images']) : [
                'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&q=80',
                'https://images.unsplash.com/photo-1544531585-9847b68c8c86?auto=format&fit=crop&q=80',
                'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80',
                'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80'
            ],
        ],
        'stats' => $stats,
        'features' => $features,
        'counts' => [
            'universities' => $univCount,
            'countries' => $countryCount,
            'programs' => $programCount,
            'scholarships' => $scholarshipsCount,
        ],
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
Route::get('/blog', [\App\Http\Controllers\PublicController::class, 'blog'])->name('blog.index');
Route::get('/events', [\App\Http\Controllers\PublicController::class, 'events'])->name('events.index');
Route::get('/blog/{slug}', [\App\Http\Controllers\PublicController::class, 'blogShow'])->name('blog.show');
Route::get('/events/{slug}', [\App\Http\Controllers\PublicController::class, 'eventShow'])->name('events.show');
Route::get('/appointments', function () {
    return redirect()->route('student.appointments');
});

Route::get('/shop', [\App\Http\Controllers\Shop\BookController::class, 'index'])->name('shop.index');
Route::get('/shop/{slug}', [\App\Http\Controllers\Shop\BookController::class, 'show'])->name('shop.show');

// Cart Routes
Route::get('/cart', [\App\Http\Controllers\Shop\CartController::class, 'index'])->name('cart.index');
Route::post('/cart/add', [\App\Http\Controllers\Shop\CartController::class, 'add'])->name('cart.add');
Route::delete('/cart/{id}', [\App\Http\Controllers\Shop\CartController::class, 'remove'])->name('cart.remove');
Route::post('/cart/coupon', [\App\Http\Controllers\Shop\CartController::class, 'applyCoupon'])->name('cart.coupon');
Route::delete('/cart/coupon', [\App\Http\Controllers\Shop\CartController::class, 'removeCoupon'])->name('cart.coupon.remove');

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

    // Generic Message Routes (accessible by all authenticated users)
    Route::post('/messages', [\App\Http\Controllers\MessageController::class, 'store'])->name('messages.store');
    Route::patch('/messages/{id}/read', [\App\Http\Controllers\MessageController::class, 'markAsRead'])->name('messages.mark-read');

    // Admin Routes
    Route::middleware('can:admin')->prefix('admin')->group(function () {
        Route::resource('users', \App\Http\Controllers\Admin\UserController::class)->except(['create', 'edit', 'show'])->names('admin.users');
        Route::resource('universities', \App\Http\Controllers\Admin\UniversityController::class)->except(['create', 'edit', 'show'])->names('admin.universities');
        Route::resource('programs', \App\Http\Controllers\Admin\ProgramController::class)->except(['create', 'edit', 'show'])->names('admin.programs');
        Route::resource('applications', \App\Http\Controllers\Admin\ApplicationController::class)->names('admin.applications');
        Route::resource('scholarships', \App\Http\Controllers\Admin\ScholarshipController::class)->only(['index', 'store', 'update', 'destroy'])->names('admin.scholarships');

        // New Resources
        Route::resource('appointments', \App\Http\Controllers\Admin\AppointmentController::class)->names('admin.appointments');
        Route::resource('payments', \App\Http\Controllers\Admin\PaymentController::class)->names('admin.payments');
        Route::resource('events', \App\Http\Controllers\Admin\EventController::class)->names('admin.events');
        Route::resource('posts', \App\Http\Controllers\Admin\PostController::class)->names('admin.posts'); // Assuming PostController

        // Messages
        Route::get('messages', [\App\Http\Controllers\MessageController::class, 'index'])->name('admin.messages');

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

        // eBook Marketplace - Admin Routes
        Route::resource('authors', \App\Http\Controllers\Admin\AuthorController::class)->names('admin.authors');
        Route::patch('authors/{id}/approve', [\App\Http\Controllers\Admin\AuthorController::class, 'approve'])->name('admin.authors.approve');
        Route::patch('authors/{id}/reject', [\App\Http\Controllers\Admin\AuthorController::class, 'reject'])->name('admin.authors.reject');

        Route::resource('books', \App\Http\Controllers\Admin\BookController::class)->names('admin.books');
        Route::patch('books/{id}/publish', [\App\Http\Controllers\Admin\BookController::class, 'publish'])->name('admin.books.publish');
        Route::patch('books/{id}/unpublish', [\App\Http\Controllers\Admin\BookController::class, 'unpublish'])->name('admin.books.unpublish');

        Route::resource('orders', \App\Http\Controllers\Admin\OrderController::class)->only(['index', 'show'])->names('admin.orders');

        Route::get('reviews', [\App\Http\Controllers\Admin\ReviewController::class, 'index'])->name('admin.reviews.index');
        Route::patch('reviews/{id}/approve', [\App\Http\Controllers\Admin\ReviewController::class, 'approve'])->name('admin.reviews.approve');
        Route::delete('reviews/{id}', [\App\Http\Controllers\Admin\ReviewController::class, 'destroy'])->name('admin.reviews.destroy');
    });

    // Staff Routes
    Route::middleware('can:staff')->prefix('staff')->group(function () {
        Route::get('/applications', function () {
            return Inertia::render('Staff/Applications');
        })->name('staff.applications');
        Route::get('/tasks', function () {
            return Inertia::render('Staff/Tasks');
        })->name('staff.tasks');
        Route::get('/messages', [\App\Http\Controllers\MessageController::class, 'index'])->name('staff.messages');

        // New Staff Features
        Route::get('/appointments', [\App\Http\Controllers\StaffController::class, 'appointments'])->name('staff.appointments');
        Route::get('/payments', [\App\Http\Controllers\StaffController::class, 'payments'])->name('staff.payments');
        Route::get('/events', [\App\Http\Controllers\StaffController::class, 'events'])->name('staff.events');
    });

    // Student Routes


    // Student Routes
    Route::middleware('can:student')->group(function () {
        Route::get('/applications', [\App\Http\Controllers\StudentController::class, 'applications'])->name('student.applications');
        Route::get('/universities', [\App\Http\Controllers\StudentController::class, 'universities'])->name('student.universities');

        // New Student Features
        Route::get('/student/appointments', [\App\Http\Controllers\StudentController::class, 'appointments'])->name('student.appointments');
        Route::get('/student/events', [\App\Http\Controllers\StudentController::class, 'events'])->name('student.events');

        // Messages
        Route::get('/messages', [\App\Http\Controllers\MessageController::class, 'index'])->name('student.messages');

        // eBook Marketplace - Student Features
        Route::post('/shop/purchase', [\App\Http\Controllers\Shop\BookController::class, 'purchase'])->name('shop.purchase');

        Route::get('/checkout', [\App\Http\Controllers\Shop\CartController::class, 'checkout'])->name('checkout');

        Route::get('/library', [\App\Http\Controllers\Student\LibraryController::class, 'index'])->name('student.library');
        Route::get('/library/download/{id}', [\App\Http\Controllers\Student\LibraryController::class, 'download'])->name('student.library.download');

        Route::get('/wishlist', [\App\Http\Controllers\Student\WishlistController::class, 'index'])->name('student.wishlist');
        Route::post('/wishlist', [\App\Http\Controllers\Student\WishlistController::class, 'store'])->name('student.wishlist.store');
        Route::delete('/wishlist/{id}', [\App\Http\Controllers\Student\WishlistController::class, 'destroy'])->name('student.wishlist.destroy');

        Route::post('/reviews', [\App\Http\Controllers\Student\ReviewController::class, 'store'])->name('reviews.store');
    });

    // Author Routes
    Route::middleware('can:author')->prefix('author')->group(function () {
        Route::get('/dashboard', [\App\Http\Controllers\Author\DashboardController::class, 'index'])->name('author.dashboard');
        Route::resource('books', \App\Http\Controllers\Author\BookController::class)->names('author.books');
        Route::get('/earnings', [\App\Http\Controllers\Author\EarningsController::class, 'index'])->name('author.earnings');
        Route::get('/profile', [\App\Http\Controllers\Author\ProfileController::class, 'edit'])->name('author.profile.edit');
        Route::put('/profile', [\App\Http\Controllers\Author\ProfileController::class, 'update'])->name('author.profile.update');
    });
});

require __DIR__ . '/auth.php';
