<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('universities', function (Blueprint $table) {
            $table->string('video_url')->nullable()->after('hero_image');
            $table->string('university_type')->default('Public')->after('country'); // Public/Private
            $table->integer('student_count')->nullable()->after('university_type');
            $table->text('about_content')->nullable()->after('description');
            $table->text('academics_content')->nullable()->after('about_content');
            $table->text('admissions_content')->nullable()->after('academics_content');
            $table->text('costs_content')->nullable()->after('admissions_content');
            $table->text('campus_life_content')->nullable()->after('costs_content');
        });
    }

    public function down(): void
    {
        Schema::table('universities', function (Blueprint $table) {
            $table->dropColumn([
                'video_url',
                'university_type',
                'student_count',
                'about_content',
                'academics_content',
                'admissions_content',
                'costs_content',
                'campus_life_content',
            ]);
        });
    }
};
