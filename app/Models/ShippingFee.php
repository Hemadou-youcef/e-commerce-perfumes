<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ShippingFee extends Model
{
    use HasFactory;

    protected $fillable = [
        'shipping_agency_id',
        'wilaya',
        'wilaya_ar',
        'wilaya_code',
        'home_delivery_price',
        'agency_delivery_price',
    ];


    public function shippingAgency(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(ShippingAgency::class);
    }
}
