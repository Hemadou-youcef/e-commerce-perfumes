<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ProductPrice extends Model
{
    use HasFactory;

    protected $fillable = [
        'product_id',
        'price',
        'unit',
        'quantity',
        'active',
    ];
    
    protected $casts = [
        'price' => 'integer',
        'quantity' => 'integer',
        'active' => 'boolean',
        'product_id' => 'integer', // Assuming product_id is an integer
    ];


    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class);
    }
}
