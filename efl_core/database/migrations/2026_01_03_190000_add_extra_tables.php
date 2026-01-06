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
        Schema::create('students', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->unique()->onDelete('cascade');
            $table->string('country')->nullable();
            $table->string('education_level')->nullable();
            $table->timestamps();
        });

        Schema::create('staff', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->unique()->onDelete('cascade');
            $table->string('specialization')->nullable();
            $table->timestamps();
        });

        Schema::create('appointments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade'); // Renamed from student_id to be generic
            $table->foreignId('consultant_id')->nullable()->constrained('users')->onDelete('set null'); // Renamed from staff_id
            $table->date('date')->nullable(); // Split from date_time or keep date_time? Let's use date+time as per my new code
            $table->time('time')->nullable();
            $table->dateTime('date_time')->nullable(); // Keep for backward compat if needed, or just replace. I'll replace.
            $table->string('status')->default('pending'); // pending, confirmed, completed, cancelled
            $table->string('type')->default('virtual');
            $table->text('notes')->nullable();
            $table->string('meeting_link')->nullable();
            $table->timestamps();
        });

        Schema::create('payments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade'); // Generic user, not just tied to order
            $table->foreignId('order_id')->nullable()->constrained('service_orders')->onDelete('cascade'); // Optional order link
            $table->decimal('amount', 10, 2)->default(0);
            $table->string('currency')->default('USD');
            $table->string('status')->default('pending'); // pending, paid, failed, refunded
            $table->string('method')->nullable();
            $table->string('transaction_id')->nullable();
            $table->string('description')->nullable();
            $table->timestamps();
        });

        Schema::create('blog_posts', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('slug')->unique();
            $table->longText('content');
            $table->enum('status', ['draft', 'published'])->default('draft');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('blog_posts');
        Schema::dropIfExists('payments');
        Schema::dropIfExists('appointments');
        Schema::dropIfExists('staff');
        Schema::dropIfExists('students');
    }
};
