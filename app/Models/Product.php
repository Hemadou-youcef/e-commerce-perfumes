<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Collection;
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
        'type'
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function images(): HasMany
    {
        return $this->hasMany(Image::class);
    }

    public function mainImage(): BelongsTo
    {
        return $this->belongsTo(Image::class, 'main_image_id');

    }

    public function productPrices(): HasMany
    {
        return $this->hasMany(ProductPrice::class);
    }

    public function activeProductPrices(): HasMany
    {
        return $this->hasMany(ProductPrice::class)->where('active', true);
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

    public function addStock($quantity): void
    {
        $this->increment('quantity', $quantity);
    }


    public function removeStock($quantity): void
    {
        $this->decrement('quantity', $quantity);
    }


    public static function pinnedProducts(): Collection|array
    {
        return Product::query()->where('status', 'pinned')->get();
    }

    public static function activeProducts(): Builder
    {
        return Product::query()->where('status', '!=' , 'archived');
    }




    public function isArchived(): bool
    {
        return $this->status === 'archived';
    }




    public function suggestedProducts()
    {
        // Get suggested products by selecting products from the same category
        return Product::query()->select('id' ,'name' , 'main_image_id'  )->whereHas('categories', function ($query) {
            $query->whereIn('category_id', $this->categories()->pluck('categories.id')); // Use table alias 'categories.id' for 'category_id'
        })
            ->where('products.id', '!=', $this->id) // Specify 'products.id' to avoid ambiguity
                ->with(['mainImage' , 'activeProductPrices' ])
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


    public static function perfumes(): Builder
    {
        return Product::activeProducts()->where('type', 1);
    }

    public static function accessories(): Builder
    {
        return Product::activeProducts()->where('type', 2);
    }

    public static function oils(): Builder
    {
        return Product::activeProducts()->where('type', 3);
    }
}
