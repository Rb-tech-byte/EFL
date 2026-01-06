<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BookReview extends Model
{
    use HasFactory;

    protected $fillable = [
        'book_id',
        'user_id',
        'rating',
        'review',
        'is_approved',
    ];

    protected $casts = [
        'rating' => 'integer',
        'is_approved' => 'boolean',
    ];

    // Relationships
    public function book()
    {
        return $this->belongsTo(Book::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // Scopes
    public function scopeApproved($query)
    {
        return $query->where('is_approved', true);
    }

    public function scopeRecent($query)
    {
        return $query->latest();
    }

    public function scopeByRating($query, $rating)
    {
        return $query->where('rating', $rating);
    }
}
