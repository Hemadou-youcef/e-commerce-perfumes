<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\Auth;

/**
 * @method static inRandomOrder()
 */
class Product extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'name',
        'description',
        'description_ar',
        'main_image_id',
        'quantity',
        'status',
        'created_by',
        'category',
        'user_id',
        'unit',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function images(): HasMany
    {
        return $this->hasMany(Image::class);
    }

    public function productPrices(): HasMany
    {
        return $this->hasMany(ProductPrice::class);
    }

    public function receptions(): HasMany
    {
        return $this->hasMany(Reception::class);
    }

    public function main_image(): BelongsTo
    {
        return $this->belongsTo(Image::class, 'main_image_id');
    }

    public function orders(): BelongsToMany
    {
        return $this->belongsToMany(Order::class, 'order_products', 'product_id', 'order_id');
    }

    public function categories(): BelongsToMany
    {
        return $this->belongsToMany(Category::class, 'category_product', 'product_id', 'category_id');
    }

    public function bookmarks(): HasMany
    {

        return $this->hasMany(Bookmark::class);
    }

    public function addStock($quantity)
    {
        $this->increment('quantity', $quantity);
    }

    public function removeStock($quantity)
    {
        $this->decrement('quantity', $quantity);
    }


    public function suggestedProducts()
    {
        // Get suggested products by selecting products from the same category
        return Product::whereHas('categories', function ($query) {
            $query->whereIn('category_id', $this->categories()->pluck('categories.id')); // Use table alias 'categories.id' for 'category_id'
        })
            ->where('products.id', '!=', $this->id) // Specify 'products.id' to avoid ambiguity
            ->inRandomOrder()
            ->limit(5)
            ->get();
    }

    public function isProductBookmarked(): bool
    {
        if (Auth::check()) {
            return $this->bookmarks()->where('user_id', Auth::user()->id)->exists();
        }
        return false;
    }

    public function isProductInCart(): bool
    {
        if (Auth::check()) {
            return Auth::user()->cartItems()->where('user_id', Auth::user()->id)->exists();
        }
        return false;
    }
}
