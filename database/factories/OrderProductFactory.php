<?php

namespace Database\Factories;

use App\Models\Order;
use App\Models\OrderProduct;
use App\Models\Product;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\OrderProduct>
 */
class OrderProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $product = Product::inRandomOrder()->first();;
        $productPrice = $product->productPrices->first();

        return [
            'order_id' => Order::factory(),
            'product_id' => $product->id,
            'quantity' => $this->faker->numberBetween(1, 5),
            'product_price_id' => $productPrice->id,
            'price' => $productPrice->price,
            'total' => $productPrice->price * $this->faker->numberBetween(1, 5),
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}
