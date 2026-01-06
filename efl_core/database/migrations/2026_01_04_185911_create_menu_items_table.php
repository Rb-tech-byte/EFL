<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('menu_items', function (Blueprint $table) {
            $table->id();
            $table->string('name'); // e.g., "Universities", "Process"
            $table->integer('order')->default(0);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });

        Schema::create('menu_columns', function (Blueprint $table) {
            $table->id();
            $table->foreignId('menu_item_id')->constrained()->onDelete('cascade');
            $table->string('title'); // e.g., "By Region", "Application"
            $table->integer('order')->default(0);
            $table->timestamps();
        });

        Schema::create('menu_links', function (Blueprint $table) {
            $table->id();
            $table->foreignId('menu_column_id')->constrained()->onDelete('cascade');
            $table->string('name'); // e.g., "North America"
            $table->string('href'); // e.g., "/universities?region=na"
            $table->integer('order')->default(0);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('menu_links');
        Schema::dropIfExists('menu_columns');
        Schema::dropIfExists('menu_items');
    }
};
