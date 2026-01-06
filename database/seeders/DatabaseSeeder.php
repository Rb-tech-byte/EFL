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
        User::factory()->create([
            'name' => 'Super Admin',
            'email' => 'admin@efl.com',
            'password' => Hash::make('password'),
            'role' => 'admin',
        ]);

        // Staff User
        User::factory()->create([
            'name' => 'Staff Member',
            'email' => 'staff@efl.com',
            'password' => Hash::make('password'),
            'role' => 'staff',
        ]);

        // Student User
        User::factory()->create([
            'name' => 'John Doe',
            'email' => 'student@efl.com',
            'password' => Hash::make('password'),
            'role' => 'student',
        ]);

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
