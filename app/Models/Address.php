<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Address extends Model
{
    use HasFactory;

    protected $fillable = [
        'first_name',
        'last_name',
        'phone',
        'street_address',
        'city',
        'postal_code',
        'shipping_fee_id',
        'shipping_price',
        'shipping_method',
    ];

    public function shippingFee(): BelongsTo
    {
        return $this->belongsTo(ShippingFee::class);
    }

    public function shippingPrice()
    {
        if($this->shipping_method == 1){
            return $this->shippingFee->home_delivery_price;
        }else{
            return $this->shippingFee->agency_delivery_price;
        }
    }

}
