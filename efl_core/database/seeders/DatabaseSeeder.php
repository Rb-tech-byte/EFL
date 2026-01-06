<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        // Admin User
        User::updateOrCreate(
            ['email' => 'admin@efl.com'],
            [
                'name' => 'Super Admin',
                'password' => Hash::make('password'),
                'role' => 'admin',
                'email_verified_at' => now(),
            ]
        );

        // Staff User
        User::updateOrCreate(
            ['email' => 'staff@efl.com'],
            [
                'name' => 'Staff Member',
                'password' => Hash::make('password'),
                'role' => 'staff',
                'email_verified_at' => now(),
            ]
        );

        // Student User
        User::updateOrCreate(
            ['email' => 'student@efl.com'],
            [
                'name' => 'John Doe',
                'password' => Hash::make('password'),
                'role' => 'student',
                'email_verified_at' => now(),
            ]
        );

        // Call all seeders in order
        $this->call([
            SettingsSeeder::class,
            MenuSeeder::class,
            DashboardSeeder::class,
            UniversityProfileSeeder::class,
            // PaymentSeeder::class, // Run this separately if needed
        ]);
    }
}
