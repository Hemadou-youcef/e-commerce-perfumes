<?php

namespace Database\Factories;

use App\Models\User;
use http\Client;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\CartItem>
 */
class CartItemFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $client = User::where('role', 1)->inRandomOrder()->first();
        $product = \App\Models\Product::inRandomOrder()->first();
        $productPrice = \App\Models\ProductPrice::where('product_id', $product->id)->inRandomOrder()->first();
        return [
            'user_id' => $client->id,
            'product_id' => $product->id,
            'quantity' => $this->faker->numberBetween(1, 10),
            'product_price_id' => $productPrice->id,

        ];
    }
}
