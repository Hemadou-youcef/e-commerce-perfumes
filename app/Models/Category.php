<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Category extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'name_ar' , 'type'];

    public function products(): BelongsToMany
    {
        return $this->belongsToMany(Product::class, 'category_product', 'category_id', 'product_id');
    }

    public static function perfumesCategories(): Builder
    {
        return Category::query()->where('type', 1);
    }

    public static function accessoriesCategories(): Builder
    {
        return Category::query()->where('type', 2);
    }
}
