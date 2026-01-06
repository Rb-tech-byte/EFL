<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use App\Models\Application;
use App\Models\Task;
use App\Models\Message;
use App\Models\Author;
use App\Models\Order;
use App\Models\Wishlist;
use App\Models\UserLibrary;
use App\Models\BookReview;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'role',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }
    /**
     * Get all applications for the user.
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function applications()
    {
        return $this->hasMany(Application::class);
    }

    public function tasks()
    {
        return $this->hasMany(Task::class);
    }

    public function sentMessages()
    {
        return $this->hasMany(Message::class, 'sender_id');
    }

    public function receivedMessages()
    {
        return $this->hasMany(Message::class, 'recipient_id');
    }

    // eBook Marketplace Relationships
    public function authorProfile()
    {
        return $this->hasOne(Author::class);
    }

    public function orders()
    {
        return $this->hasMany(Order::class);
    }

    public function wishlist()
    {
        return $this->hasMany(Wishlist::class);
    }

    public function library()
    {
        return $this->hasMany(UserLibrary::class);
    }

    public function reviews()
    {
        return $this->hasMany(BookReview::class);
    }

    // Helper methods
    public function isAuthor()
    {
        return $this->role === 'author' && $this->authorProfile()->exists();
    }

    public function isApprovedAuthor()
    {
        return $this->isAuthor() && $this->authorProfile->status === 'approved';
    }
}
