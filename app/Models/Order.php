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
        'profit',
        'status',
        'address_id',
        'shipping_agency_id',
        'verified_by',
        'confirmed_by',
        'delivered_by',
        'cancelled_by',
    ];
    
     protected $casts = [
        'total' => 'integer',
        'profit' => 'integer',
        'user_id' => 'integer',
        'shipping_agency_id' => 'integer',
        'verified_by' => 'integer',
        'confirmed_by' => 'integer',
        'delivered_by' => 'integer',
        'cancelled_by' => 'integer',
        'address_id' => 'integer',
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

    public function verifiedBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'verified_by');
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
//        if ($this->address()->exists()) {
//            return $this->orderProducts->sum('price') + $this->address->shipping_price;
//        }
        return $this->orderProducts->sum('price');
    }

    public function buyingPrice(): int
    {
        $total = 0;
        $this->orderProducts()->each(function (OrderProduct $orderProduct) use (&$total) {
            $total += $orderProduct->buying_price;
        });
        return $total;
    }

    public function profit(): int
    {
//        if ($this->address){
//            return $this->totalPrice() - $this->buyingPrice() - $this->address->shipping_price;
//        }
        return $this->total - $this->buyingPrice();
    }

    public function shippingPrice(): int
    {
        if ($this->address){
            return $this->address->shipping_price;
        }
        return 0;
    }

    public function shippingAgency(): BelongsTo
    {
        return $this->belongsTo(ShippingAgency::class);
    }





}
