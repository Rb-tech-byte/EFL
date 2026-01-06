<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Book extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'author_id',
        'category_id',
        'title',
        'slug',
        'description',
        'cover_image',
        'type',
        'format',
        'file_path',
        'preview_file',
        'price',
        'is_free',
        'isbn',
        'pages',
        'language',
        'publisher',
        'published_date',
        'status',
        'downloads',
        'average_rating',
        'reviews_count',
        'tags',
        'allow_reviews',
        'screenshot_protected',
    ];

    protected $casts = [
        'price' => 'decimal:2',
        'is_free' => 'boolean',
        'average_rating' => 'decimal:2',
        'tags' => 'array',
        'allow_reviews' => 'boolean',
        'screenshot_protected' => 'boolean',
        'published_date' => 'date',
    ];

    // Relationships
    public function author()
    {
        return $this->belongsTo(Author::class);
    }

    public function category()
    {
        return $this->belongsTo(BookCategory::class, 'category_id');
    }

    public function reviews()
    {
        return $this->hasMany(BookReview::class);
    }

    public function wishlists()
    {
        return $this->hasMany(Wishlist::class);
    }

    public function orderItems()
    {
        return $this->hasMany(OrderItem::class);
    }

    // Scopes
    public function scopePublished($query)
    {
        return $query->where('status', 'published');
    }

    public function scopeFree($query)
    {
        return $query->where('is_free', true);
    }

    public function scopePaid($query)
    {
        return $query->where('is_free', false);
    }

    public function scopeByType($query, $type)
    {
        return $query->where('type', $type);
    }

    // Accessors
    public function getCoverUrlAttribute()
    {
        return $this->cover_image ? asset('storage/' . $this->cover_image) : asset('images/default-book-cover.png');
    }

    public function getFormattedPriceAttribute()
    {
        return $this->is_free ? 'Free' : '$' . number_format($this->price, 2);
    }
}
