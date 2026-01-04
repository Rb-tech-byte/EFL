<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UniversityStory extends Model
{
    use HasFactory;

    protected $fillable = [
        'university_id',
        'title',
        'description',
        'image',
        'link',
        'order',
    ];

    public function university()
    {
        return $this->belongsTo(University::class);
    }
}
