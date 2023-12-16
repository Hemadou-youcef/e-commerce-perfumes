<?php

namespace Database\Seeders;

use App\Models\Address;
use App\Models\ShippingFee;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class AddressSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        for ($i = 0; $i < 20; $i++) {
            $shippingFee = ShippingFee::inRandomOrder()->first();
            $shippingMethod = fake()->randomElement([1, 2]);
            $shippingPrice = $shippingMethod === 1 ? $shippingFee->home_delivery_price : $shippingFee->agency_delivery_price;
            Address::query()->create([
                'first_name' => 'test',
                'last_name' => 'test',
                'street_address' => fake()->address,
                'city' => fake()->city,
                'phone' => fake()->phoneNumber,
                'postal_code' => fake()->postcode,
                'shipping_price' => $shippingPrice,
                'shipping_method' => $shippingMethod,
                'shipping_fee_id' => $shippingFee->id,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }

    }
}
