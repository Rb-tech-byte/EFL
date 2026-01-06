<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\University;
use App\Models\Program;
use App\Models\Application;
use App\Models\Task;
use Illuminate\Support\Str;

class DashboardSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Create Universities
        $universitiesData = [
            ['name' => 'University of Oxford', 'country' => 'UK', 'ranking' => 1],
            ['name' => 'Stanford University', 'country' => 'USA', 'ranking' => 2],
            ['name' => 'Massachusetts Institute of Technology (MIT)', 'country' => 'USA', 'ranking' => 3],
            ['name' => 'Harvard University', 'country' => 'USA', 'ranking' => 4],
            ['name' => 'University of Cambridge', 'country' => 'UK', 'ranking' => 5],
        ];

        foreach ($universitiesData as $uniData) {
            $university = University::firstOrCreate(
                ['name' => $uniData['name']],
                [
                    'slug' => Str::slug($uniData['name']),
                    'country' => $uniData['country'],
                    'ranking' => $uniData['ranking'],
                    'description' => 'A world-class institution known for excellence in education and research.',
                    'website' => 'https://' . Str::slug($uniData['name']) . '.edu',
                    'hero_image' => 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
                    'logo' => 'https://ui-avatars.com/api/?name=' . urlencode($uniData['name']) . '&background=random',
                ]
            );

            // 2. Create Programs for each University
            $programs = [
                ['title' => 'MSc Computer Science', 'level' => 'Graduate'],
                ['title' => 'BSc Engineering', 'level' => 'Undergraduate'],
                ['title' => 'MBA', 'level' => 'Graduate'],
            ];

            foreach ($programs as $progData) {
                Program::firstOrCreate(
                    [
                        'university_id' => $university->id,
                        'title' => $progData['title']
                    ],
                    [
                        'slug' => Str::slug($university->name . ' ' . $progData['title']),
                        'level' => $progData['level'],
                        'duration' => '2 Years',
                        'tuition' => '$50,000',
                        'description' => 'An intensive program designed for future leaders.',
                    ]
                );
            }
        }

        // 3. Assign Applications to 'student@efl.com'
        $student = User::where('email', 'student@efl.com')->first();
        if ($student) {
            $programs = Program::inRandomOrder()->take(3)->get();
            $statuses = ['submitted', 'under_review', 'accepted', 'rejected'];

            foreach ($programs as $program) {
                Application::firstOrCreate(
                    ['user_id' => $student->id, 'program_id' => $program->id],
                    [
                        'status' => $statuses[array_rand($statuses)],
                        'submitted_at' => now()->subDays(rand(1, 30)),
                        'notes' => 'Application submitted successfully.',
                    ]
                );
            }

            // Create Tasks for Student
            $tasks = [
                ['title' => 'Submit Transcripts', 'priority' => 'high'],
                ['title' => 'Complete Profile', 'priority' => 'medium'],
                ['title' => 'Review Scholarship Options', 'priority' => 'low'],
            ];

            foreach ($tasks as $task) {
                Task::firstOrCreate(
                    ['user_id' => $student->id, 'title' => $task['title']],
                    [
                        'description' => 'Please complete this task by the due date.',
                        'status' => 'pending',
                        'due_date' => now()->addDays(rand(1, 14)),
                        'priority' => $task['priority'],
                    ]
                );
            }
        }

        // 4. Create Tasks for Admin and Staff
        $admin = User::where('email', 'admin@efl.com')->first();
        if ($admin) {
            Task::firstOrCreate(
                ['user_id' => $admin->id, 'title' => 'Review New User Registrations'],
                ['status' => 'pending', 'priority' => 'high', 'due_date' => now()->addDays(2)]
            );
        }

        $staff = User::where('email', 'staff@efl.com')->first();
        if ($staff) {
            Task::firstOrCreate(
                ['user_id' => $staff->id, 'title' => 'Process Student Applications'],
                ['status' => 'pending', 'priority' => 'high', 'due_date' => now()->today()]
            );
        }
    }
}
