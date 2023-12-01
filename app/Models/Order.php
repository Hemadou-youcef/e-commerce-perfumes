<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasManyThrough;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\SoftDeletes;

class Order extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [

        'user_id',
        'total',
        'status',
        'address_id',
        'shipping_provider',
        'verified_by',
        'confirmed_by',
        'delivered_by',
        'cancelled_by',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function orderProducts(): HasMany
    {
        return $this->hasMany(OrderProduct::class);
    }

    public function reservations(): HasManyThrough
    {
        return $this->hasManyThrough(Reservation::class, OrderProduct::class , 'order_id', 'order_product_id');
    }


    public function address(): BelongsTo
    {
        return $this->belongsTo(Address::class);
    }


    public function confirmedBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'confirmed_by');
    }

    public function deliveredBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'delivered_by');
    }

    public function cancelledBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'cancelled_by');
    }

    public function totalPrice(): int
    {
        if ($this->address()->exists()) {
            return $this->orderProducts->sum('price') + $this->address->shipping_fees;
        }
        return $this->orderProducts->sum('price');
    }



}
