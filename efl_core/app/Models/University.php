<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class University extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'slug',
        'country',
        'ranking',
        'description',
        'logo',
        'hero_image',
        'video_url',
        'website',
        'university_type',
        'student_count',
        'about_content',
        'academics_content',
        'admissions_content',
        'costs_content',
        'campus_life_content',
    ];

    public function programs()
    {
        return $this->hasMany(Program::class);
    }

    public function importantDates()
    {
        return $this->hasMany(UniversityImportantDate::class)->orderBy('order');
    }

    public function stories()
    {
        return $this->hasMany(UniversityStory::class)->orderBy('order');
    }
}
