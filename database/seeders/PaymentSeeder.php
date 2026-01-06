<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Payment;
use App\Models\User;
use Illuminate\Support\Str;

class PaymentSeeder extends Seeder
{
    public function run(): void
    {
        $students = User::where('role', 'student')->get();
        if ($students->isEmpty()) {
            return;
        }

        $methods = ['stripe', 'pesapal', 'paypal', 'credit_card'];
        $statuses = ['paid', 'pending', 'failed'];

        foreach ($students as $student) {
            // Create 3-5 payments for each student
            $count = rand(3, 5);
            for ($i = 0; $i < $count; $i++) {
                Payment::create([
                    'user_id' => $student->id,
                    'amount' => rand(50, 500),
                    'currency' => 'USD',
                    'status' => $statuses[array_rand($statuses)],
                    'method' => $methods[array_rand($methods)],
                    'transaction_id' => 'TRX-' . strtoupper(Str::random(10)),
                    'description' => 'Purchase of study materials / consultation',
                    'created_at' => now()->subDays(rand(1, 60)),
                ]);
            }
        }
    }
}
