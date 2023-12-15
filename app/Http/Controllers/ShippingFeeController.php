<?php

namespace App\Http\Controllers;

use App\Models\ShippingFee;
use Illuminate\Http\Request;

class ShippingFeeController extends Controller
{
    public function update(ShippingFee $shippingFee)
    {
        $validated = request()->validate([
            'home_delivery_price' => 'required|numeric|min:0',
            'agency_delivery_price' => 'required|numeric|min:0',
        ]);

        $shippingFee->update($validated);

        return back();

    }
}
