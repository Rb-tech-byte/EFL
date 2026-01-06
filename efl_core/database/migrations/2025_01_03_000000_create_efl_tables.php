<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('universities', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('slug')->unique();
            $table->string('country');
            $table->integer('ranking')->nullable();
            $table->text('description')->nullable();
            $table->string('logo')->nullable();
            $table->string('hero_image')->nullable();
            $table->string('website')->nullable();
            $table->timestamps();
            $table->softDeletes();
        });

        Schema::create('programs', function (Blueprint $table) {
            $table->id();
            $table->foreignId('university_id')->constrained()->onDelete('cascade');
            $table->string('title');
            $table->string('slug')->unique();
            $table->string('level'); // Undergraduate, Graduate
            $table->string('duration')->nullable();
            $table->string('tuition')->nullable();
            $table->text('description')->nullable();
            $table->timestamps();
            $table->softDeletes();
        });

        Schema::create('services', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('slug')->unique();
            $table->text('description')->nullable();
            $table->string('type'); // Research, Admissions, etc.
            $table->decimal('price', 8, 2)->nullable();
            $table->timestamps();
            $table->softDeletes();
        });

        Schema::create('service_orders', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->foreignId('service_id')->constrained()->onDelete('cascade');
            $table->string('status')->default('pending'); // pending, paid, completed
            $table->timestamps();
        });

        Schema::create('events', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('slug')->unique();
            $table->text('description')->nullable();
            $table->dateTime('start_time'); // Renamed from start_date
            $table->dateTime('end_time')->nullable(); // Renamed from end_date
            $table->string('location')->nullable();
            $table->string('type')->default('webinar');
            $table->string('link')->nullable();
            $table->boolean('is_public')->default(true);
            $table->timestamps();
        });

        Schema::create('articles', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('slug')->unique();
            $table->text('content');
            $table->string('category');
            $table->foreignId('author_id')->constrained('users')->onDelete('cascade');
            $table->timestamps();
        });

        Schema::create('courses', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->text('description')->nullable();
            $table->text('content')->nullable(); // JSON or text link to modules
            $table->timestamps();
        });

        Schema::create('course_enrollments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->foreignId('course_id')->constrained()->onDelete('cascade');
            $table->integer('progress')->default(0); // 0-100
            $table->string('status')->default('active'); // active, completed
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('course_enrollments');
        Schema::dropIfExists('courses');
        Schema::dropIfExists('articles');
        Schema::dropIfExists('events');
        Schema::dropIfExists('service_orders');
        Schema::dropIfExists('services');
        Schema::dropIfExists('programs');
        Schema::dropIfExists('universities');
    }
};
