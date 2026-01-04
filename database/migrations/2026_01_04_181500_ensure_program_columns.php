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
        Schema::table('programs', function (Blueprint $table) {
            if (!Schema::hasColumn('programs', 'university_id')) {
                $table->foreignId('university_id')->constrained()->onDelete('cascade');
            }
            if (!Schema::hasColumn('programs', 'title')) {
                $table->string('title');
            }
            if (!Schema::hasColumn('programs', 'slug')) {
                $table->string('slug')->unique();
            }
            if (!Schema::hasColumn('programs', 'level')) {
                $table->string('level')->nullable();
            }
            if (!Schema::hasColumn('programs', 'duration')) {
                $table->string('duration')->nullable();
            }
            if (!Schema::hasColumn('programs', 'tuition_fee')) {
                $table->decimal('tuition_fee', 10, 2)->nullable();
            }
            if (!Schema::hasColumn('programs', 'description')) {
                $table->text('description')->nullable();
            }
            if (!Schema::hasColumn('programs', 'requirements')) {
                $table->json('requirements')->nullable();
            }
            if (!Schema::hasColumn('programs', 'intake_date')) {
                $table->date('intake_date')->nullable();
            }
            if (!Schema::hasColumn('programs', 'is_active')) {
                $table->boolean('is_active')->default(true);
            }
        });
    }

    public function down(): void
    {
        Schema::table('programs', function (Blueprint $table) {
            $table->dropForeign(['university_id']);
            $table->dropColumn(['university_id', 'title', 'slug', 'level', 'duration', 'tuition_fee', 'description', 'requirements', 'intake_date', 'is_active']);
        });
    }
};
