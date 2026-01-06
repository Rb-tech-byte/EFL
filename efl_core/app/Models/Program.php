<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Program extends Model
{
    use HasFactory;

    protected $fillable = [
        'university_id',
        'title',
        'slug',
        'level',
        'duration',
        'tuition_fee',
        'description',
        'requirements',
        'intake_date',
        'is_active',
    ];

    protected $casts = [
        'requirements' => 'array',
        'intake_date' => 'date',
        'is_active' => 'boolean',
    ];

    public function university()
    {
        return $this->belongsTo(University::class);
    }

    public function applications()
    {
        return $this->hasMany(Application::class);
    }
}
