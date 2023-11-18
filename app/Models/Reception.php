<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * @property mixed $rest
 */
class Reception extends Model
{
    use HasFactory;

    protected $fillable= [
        'user_id',
        'name',
        'product_id',
        'quantity',
        'price',
        'rest'
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }


    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class);
    }

    public function reservations(): HasMany
    {
        return $this->hasMany(Reservation::class);

    }


    public function empty(): bool
    {
        return $this->rest === 0;
    }

    public function addStock($quantity): void
    {
        $this->increment('rest', $quantity);
    }

    public function removeStock($quantity): void
    {
        $this->decrement('rest', $quantity);
    }

}
