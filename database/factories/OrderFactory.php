<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Order>
 */
class OrderFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => User::factory(),
            'total' => 0,
            'status' => $this->faker->randomElement(['pending']),
            'shipping_agency_id' => 1,
//            'status' => $this->faker->randomElement(['pending', 'confirmed', 'delivered']),
            'address_id' => null,
            'verified_by' => null,
            'confirmed_by' => null,
            'delivered_by' => null,
            'cancelled_by' => null,
            'created_at' => $this->faker->dateTimeBetween('-1 month', 'now')

        ];
    }
}
