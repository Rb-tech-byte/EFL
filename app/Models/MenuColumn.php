<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MenuColumn extends Model
{
    use HasFactory;

    protected $fillable = ['menu_item_id', 'title', 'order'];

    public function menuItem()
    {
        return $this->belongsTo(MenuItem::class);
    }

    public function links()
    {
        return $this->hasMany(MenuLink::class)->orderBy('order');
    }
}
