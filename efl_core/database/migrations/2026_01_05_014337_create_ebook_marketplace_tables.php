<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // Authors table
        Schema::create('authors', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('pen_name')->nullable();
            $table->text('bio')->nullable();
            $table->string('profile_image')->nullable();
            $table->string('status')->default('pending'); // pending, approved, rejected, suspended
            $table->decimal('commission_rate', 5, 2)->default(30.00); // Admin commission %
            $table->decimal('total_earnings', 10, 2)->default(0);
            $table->timestamps();
        });

        // Book categories
        Schema::create('book_categories', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('slug')->unique();
            $table->text('description')->nullable();
            $table->string('icon')->nullable();
            $table->integer('order')->default(0);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });

        // Books table
        Schema::create('books', function (Blueprint $table) {
            $table->id();
            $table->foreignId('author_id')->constrained()->onDelete('cascade');
            $table->foreignId('category_id')->constrained('book_categories')->onDelete('cascade');
            $table->string('title');
            $table->string('slug')->unique();
            $table->text('description');
            $table->string('cover_image');
            $table->string('type')->default('ebook'); // ebook, novel, magazine, audiobook
            $table->string('format')->nullable(); // pdf, epub, mp3, etc.
            $table->string('file_path')->nullable(); // Encrypted storage path
            $table->string('preview_file')->nullable(); // Sample/preview file
            $table->decimal('price', 10, 2)->default(0);
            $table->boolean('is_free')->default(false);
            $table->string('isbn')->nullable();
            $table->integer('pages')->nullable();
            $table->string('language')->default('en');
            $table->string('publisher')->nullable();
            $table->date('published_date')->nullable();
            $table->string('status')->default('draft'); // draft, pending, published, rejected
            $table->integer('downloads')->default(0);
            $table->decimal('average_rating', 3, 2)->default(0);
            $table->integer('reviews_count')->default(0);
            $table->json('tags')->nullable();
            $table->boolean('allow_reviews')->default(true);
            $table->boolean('screenshot_protected')->default(false);
            $table->timestamps();
            $table->softDeletes();
        });

        // Orders table
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->string('order_number')->unique();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->decimal('subtotal', 10, 2);
            $table->decimal('tax', 10, 2)->default(0);
            $table->decimal('discount', 10, 2)->default(0);
            $table->decimal('total', 10, 2);
            $table->string('status')->default('pending'); // pending, completed, failed, refunded
            $table->string('payment_method')->nullable();
            $table->string('payment_gateway')->nullable();
            $table->string('transaction_id')->nullable();
            $table->string('coupon_code')->nullable();
            $table->text('notes')->nullable();
            $table->timestamp('completed_at')->nullable();
            $table->timestamps();
        });

        // Order items
        Schema::create('order_items', function (Blueprint $table) {
            $table->id();
            $table->foreignId('order_id')->constrained()->onDelete('cascade');
            $table->foreignId('book_id')->constrained()->onDelete('cascade');
            $table->foreignId('author_id')->constrained()->onDelete('cascade');
            $table->decimal('price', 10, 2);
            $table->decimal('author_earning', 10, 2); // After commission
            $table->decimal('admin_commission', 10, 2);
            $table->timestamps();
        });

        // Reviews & Ratings
        Schema::create('book_reviews', function (Blueprint $table) {
            $table->id();
            $table->foreignId('book_id')->constrained()->onDelete('cascade');
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->integer('rating'); // 1-5
            $table->text('review')->nullable();
            $table->boolean('is_verified_purchase')->default(false);
            $table->boolean('is_approved')->default(true);
            $table->timestamps();
        });

        // Wishlist
        Schema::create('wishlists', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->foreignId('book_id')->constrained()->onDelete('cascade');
            $table->timestamps();
            $table->unique(['user_id', 'book_id']);
        });

        // User library (purchased books)
        Schema::create('user_library', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->foreignId('book_id')->constrained()->onDelete('cascade');
            $table->foreignId('order_id')->constrained()->onDelete('cascade');
            $table->timestamp('purchased_at');
            $table->integer('download_count')->default(0);
            $table->timestamp('last_accessed_at')->nullable();
            $table->timestamps();
        });

        // Coupons
        Schema::create('coupons', function (Blueprint $table) {
            $table->id();
            $table->string('code')->unique();
            $table->string('type')->default('percentage'); // percentage, fixed
            $table->decimal('value', 10, 2);
            $table->decimal('min_purchase', 10, 2)->nullable();
            $table->integer('usage_limit')->nullable();
            $table->integer('used_count')->default(0);
            $table->timestamp('starts_at')->nullable();
            $table->timestamp('expires_at')->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });

        // Pages (CMS)
        Schema::create('pages', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('slug')->unique();
            $table->longText('content');
            $table->string('meta_title')->nullable();
            $table->text('meta_description')->nullable();
            $table->boolean('is_published')->default(true);
            $table->integer('order')->default(0);
            $table->timestamps();
        });

        // Home page sections (Dynamic homepage)
        Schema::create('home_sections', function (Blueprint $table) {
            $table->id();
            $table->string('type'); // banner, featured_books, category_showcase, author_spotlight
            $table->string('title')->nullable();
            $table->json('content')->nullable(); // Flexible JSON data
            $table->integer('order')->default(0);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });

        // Notifications
        Schema::create('push_notifications', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->text('message');
            $table->string('type')->default('general'); // general, promotion, new_book, author_update
            $table->json('target_users')->nullable(); // null = all users, or array of user IDs
            $table->string('image')->nullable();
            $table->string('action_url')->nullable();
            $table->timestamp('scheduled_at')->nullable();
            $table->timestamp('sent_at')->nullable();
            $table->integer('sent_count')->default(0);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('push_notifications');
        Schema::dropIfExists('home_sections');
        Schema::dropIfExists('pages');
        Schema::dropIfExists('coupons');
        Schema::dropIfExists('user_library');
        Schema::dropIfExists('wishlists');
        Schema::dropIfExists('book_reviews');
        Schema::dropIfExists('order_items');
        Schema::dropIfExists('orders');
        Schema::dropIfExists('books');
        Schema::dropIfExists('book_categories');
        Schema::dropIfExists('authors');
    }
};
