<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * @property mixed $reception
 * @property mixed $quantity
 * @property mixed $orderProduct
 */
class Reservation extends Model
{
    use HasFactory;

    protected $fillable = [
        'order_id',
        'product_id',
        'reception_id',
        'order_product_id',
        'quantity',
    ];
    
    protected $casts = [
        'quantity' => 'integer',
    ];

    public function orderProduct(): BelongsTo
    {
        return $this->belongsTo(OrderProduct::class);
    }

    public function reception(): BelongsTo
    {
        return $this->belongsTo(Reception::class);
    }

    public function buyingPrice(): int
    {
        return $this->reception->price * $this->quantity;
    }

    public function apply(): void
    {
        $this->reception->removeStock($this->quantity);
    }

    public function revert(): void
    {
        $this->reception->addStock($this->quantity);
    }


}
