<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class CartItem extends Model
{
    use HasFactory, SoftDeletes;


    /**
     * @var array<string> $fillable
     */

    protected $fillable = [
        'user_id',
        'product_id',
        'quantity',
        'product_price_id',
    ];
    
    protected $casts = [
        'quantity' => 'integer',
    ];
    
    /**
     * @var array<string> $casts
     */

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class);
    }

    public function productPrice(): BelongsTo
    {
        return $this->belongsTo(ProductPrice::class);
    }

    public function price(): int
    {
        return $this->productPrice->price * $this->quantity;
    }
}
