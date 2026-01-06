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
        Schema::table('authors', function (Blueprint $table) {
            $table->string('website')->nullable()->after('bio');
            $table->json('social_links')->nullable()->after('website');
        });
    }

    public function down(): void
    {
        Schema::table('authors', function (Blueprint $table) {
            $table->dropColumn(['website', 'social_links']);
        });
    }
};
