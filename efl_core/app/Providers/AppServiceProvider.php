<?php

namespace App\Providers;

use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\Vite;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        // 1. Check for Sibling Structure (Local WAMP: efl_core next to public_html)
        if (is_dir(base_path('../public_html'))) {
            $this->app->usePublicPath(base_path('../public_html'));
        }
        // 2. Check for Nested Structure (Server cPanel: efl_core INSIDE public_html)
        elseif (file_exists(base_path('../index.php'))) {
            $this->app->usePublicPath(realpath(base_path('../')));
        }
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Schema::defaultStringLength(191);
        Vite::prefetch(concurrency: 3);

        Gate::define('admin', function ($user) {
            return $user->role === 'admin';
        });

        Gate::define('staff', function ($user) {
            return $user->role === 'staff';
        });

        Gate::define('student', function ($user) {
            return $user->role === 'student';
        });

        Gate::define('author', function ($user) {
            return $user->role === 'author';
        });
    }
}
