<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\University;
use App\Models\UniversityImportantDate;
use App\Models\UniversityStory;
use Illuminate\Support\Str;

class UniversityProfileSeeder extends Seeder
{
    public function run(): void
    {
        // Update existing universities with profile data
        $universities = University::all();

        foreach ($universities as $university) {
            $university->update([
                'university_type' => 'Public',
                'student_count' => rand(10000, 30000),
                'video_url' => 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
                'about_content' => "<h3>About {$university->name}</h3><p>{$university->name} is a leading institution committed to academic excellence and innovation. We provide world-class education and research opportunities for international students.</p><p>Our campus features state-of-the-art facilities, diverse student body, and a vibrant academic community dedicated to fostering intellectual growth and personal development.</p>",
                'academics_content' => "<h3>Academic Programs</h3><p>We offer a wide range of undergraduate and graduate programs across various disciplines including:</p><ul><li>Engineering and Technology</li><li>Business and Management</li><li>Arts and Humanities</li><li>Sciences</li><li>Health and Medicine</li></ul><p>Our faculty comprises renowned scholars and industry experts committed to providing exceptional education.</p>",
                'admissions_content' => "<h3>Admission Requirements</h3><p>International students must meet the following requirements:</p><ul><li>Completed application form</li><li>Official transcripts</li><li>English proficiency test scores (TOEFL/IELTS)</li><li>Letters of recommendation</li><li>Personal statement</li><li>Financial documentation</li></ul><p>Application deadlines vary by program and intake term.</p>",
                'costs_content' => "<h3>Tuition and Fees</h3><p>Undergraduate tuition: $25,000 - $35,000 per year</p><p>Graduate tuition: $30,000 - $45,000 per year</p><h4>Additional Costs:</h4><ul><li>Housing: $8,000 - $12,000 per year</li><li>Meals: $4,000 - $6,000 per year</li><li>Books and supplies: $1,000 - $1,500 per year</li><li>Health insurance: $2,000 - $3,000 per year</li></ul><p>Scholarships and financial aid are available for qualified students.</p>",
                'campus_life_content' => "<h3>Campus Life</h3><p>Experience a vibrant campus community with:</p><ul><li>200+ student organizations and clubs</li><li>Division I athletics</li><li>Modern recreation facilities</li><li>Cultural events and performances</li><li>Career development services</li><li>International student support</li></ul><p>Our campus provides a welcoming environment where students from around the world can thrive academically and socially.</p>",
            ]);

            // Create Important Dates
            UniversityImportantDate::create([
                'university_id' => $university->id,
                'title' => 'Application Deadline',
                'date' => '2026-01-15',
                'order' => 1,
            ]);

            UniversityImportantDate::create([
                'university_id' => $university->id,
                'title' => 'Transfer Deadline',
                'date' => '2026-03-01',
                'order' => 2,
            ]);

            UniversityImportantDate::create([
                'university_id' => $university->id,
                'title' => 'Payment Deadline',
                'date' => '2026-05-15',
                'order' => 3,
            ]);

            UniversityImportantDate::create([
                'university_id' => $university->id,
                'title' => 'Arrival & Check-in Date',
                'date' => '2026-08-20',
                'order' => 4,
            ]);

            // Create Stories
            UniversityStory::create([
                'university_id' => $university->id,
                'title' => 'Bring Your Best Startup Ideas to Life',
                'description' => 'Discover how students at ' . $university->name . ' are turning innovative ideas into successful ventures with support from our entrepreneurship center.',
                'image' => 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400',
                'link' => '#',
                'order' => 1,
            ]);

            UniversityStory::create([
                'university_id' => $university->id,
                'title' => 'A Student\'s Guide to Living in ' . explode(',', $university->country)[0],
                'description' => 'Essential tips for international students adapting to life in ' . $university->country . ' and making the most of your university experience.',
                'image' => 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=400',
                'link' => '#',
                'order' => 2,
            ]);

            UniversityStory::create([
                'university_id' => $university->id,
                'title' => 'Explore Unique Research Opportunities',
                'description' => 'Learn about cutting-edge research programs available to students at ' . $university->name . ' and how you can get involved.',
                'image' => 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=400',
                'link' => '#',
                'order' => 3,
            ]);
        }

        $this->command->info('University profiles seeded successfully!');
    }
}
