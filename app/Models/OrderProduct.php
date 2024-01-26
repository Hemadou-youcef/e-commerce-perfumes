<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class OrderProduct extends Model
{
    use HasFactory;

//    protected $appends = ['total_quantity'];
    protected $fillable = ['order_id', 'product_id', 'quantity', 'price', 'total', 'product_price_id'];
    
    protected $casts = [
        'quantity' => 'integer',
        'buying_price' => 'integer',
        'price' => 'integer',
        'product_id' => 'integer',
        'order_id' => 'integer',
        'product_price_id' => 'integer',
    ];

    public function order(): BelongsTo
    {
        return $this->belongsTo(Order::class);
    }

    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class);
    }

    public function productPrice(): BelongsTo
    {
        return $this->belongsTo(ProductPrice::class, 'product_price_id', 'id');
    }


    public function totalQuantity(): int
    {


        return $this->quantity * $this->productPrice->quantity;


    }

    public function reservations(): HasMany
    {
        return $this->hasMany(Reservation::class);
    }

    public function buyingPrice(): int
    {

        $total = 0;
        $this->reservations->each(function (Reservation $reservation) use (&$total) {
            $total += $reservation->buyingPrice();
        });
//        if ($total != 0) {
//            $this->buying_price = $total;
//            $this->save();
//        }
        return $total;

    }

}
