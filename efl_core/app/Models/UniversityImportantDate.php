<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UniversityImportantDate extends Model
{
    use HasFactory;

    protected $fillable = [
        'university_id',
        'title',
        'date',
        'order',
    ];

    protected $casts = [
        'date' => 'date',
    ];

    public function university()
    {
        return $this->belongsTo(University::class);
    }
}
