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
            'total' => $this->faker->numberBetween(50, 500),
            'status' => $this->faker->randomElement(['pending']),
//            'status' => $this->faker->randomElement(['pending', 'confirmed', 'delivered']),
            'address' => $this->faker->address,
            'verified_by' => null,
            'confirmed_by' => null,
            'delivered_by' => null,
            'cancelled_by' => null,
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}
