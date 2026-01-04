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
        //
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
    }
}
