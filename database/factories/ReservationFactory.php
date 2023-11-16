<?php

namespace Database\Factories;

use App\Models\Order;
use App\Models\OrderProduct;
use App\Models\Product;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Reservation>
 */
class ReservationFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {

        $orderProduct = OrderProduct::inRandomOrder()->first();
        $reception = $orderProduct->product->receptions()->inRandomOrder()->first();
        return [
            'reception_id' => $reception->id,
            'order_product_id' => $orderProduct->id,
            'quantity' => $this->faker->numberBetween(1, 10),
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}
