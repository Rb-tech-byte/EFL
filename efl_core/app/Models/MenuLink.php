<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MenuLink extends Model
{
    use HasFactory;

    protected $fillable = ['menu_column_id', 'name', 'href', 'order'];

    public function column()
    {
        return $this->belongsTo(MenuColumn::class, 'menu_column_id');
    }
}
