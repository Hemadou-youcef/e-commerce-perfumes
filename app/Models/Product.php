<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Product extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'description', 'description_ar', 'main_image', 'quantity', 'status', 'created_by', 'category'];

    public function user() : BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function images() : HasMany
    {
        return $this->hasMany(Image::class);
    }

    public function prices() : HasMany
    {
        return $this->hasMany(ProductPrice::class);
    }

    public function receptions() : HasMany
    {
        return $this->hasMany(Reception::class);
    }



}
