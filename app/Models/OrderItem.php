<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OrderItem extends Model
{
    use HasFactory;

    protected $fillable = [
        'order_id',
        'book_id',
        'author_id',
        'title',
        'price',
        'quantity',
        'author_earnings',
        'platform_commission',
    ];

    protected $casts = [
        'price' => 'decimal:2',
        'author_earnings' => 'decimal:2',
        'platform_commission' => 'decimal:2',
    ];

    // Relationships
    public function order()
    {
        return $this->belongsTo(Order::class);
    }

    public function book()
    {
        return $this->belongsTo(Book::class);
    }

    public function author()
    {
        return $this->belongsTo(Author::class);
    }

    // Accessors
    public function getTotalAttribute()
    {
        return $this->price * $this->quantity;
    }
}
