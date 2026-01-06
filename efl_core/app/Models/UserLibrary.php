<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserLibrary extends Model
{
    use HasFactory;

    protected $table = 'user_library';

    protected $fillable = [
        'user_id',
        'book_id',
        'purchased_at',
        'download_count',
        'last_accessed_at',
    ];

    protected $casts = [
        'purchased_at' => 'datetime',
        'last_accessed_at' => 'datetime',
    ];

    /**
     * Get the user that owns this library item.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the book associated with this library item.
     */
    public function book()
    {
        return $this->belongsTo(Book::class);
    }
}
