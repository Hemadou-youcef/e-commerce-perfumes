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
    protected $fillable = ['order_id', 'product_id', 'quantity', 'price' , 'total', 'product_price_id'];

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
        return $this->belongsTo(ProductPrice::class , 'product_price_id' , 'id');
    }



    public function totalQuantity(): int
    {



        return $this->quantity * $this->productPrice->quantity;


    }

    public function reservations(): HasMany
    {
        return $this->hasMany(Reservation::class);
    }

}
