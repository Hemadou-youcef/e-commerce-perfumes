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
        $quantity = $this->faker->randomElement([1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 3]);

        return [
            'order_id' => Order::factory(),
            'product_id' => $product->id,
            'quantity' => $quantity,
            'product_price_id' => $productPrice->id,
            'price' => $productPrice->price * $quantity,
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}
