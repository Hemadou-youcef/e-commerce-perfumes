<?php

namespace Database\Factories;

use App\Models\Product;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Reception>
 */
class ReceptionFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => User::inRandomOrder()->first()->id,
            'product_id' => Product::factory(),
            'name' => $this->faker->name,
            'quantity' => 10000,
//            'quantity' => $this->faker->numberBetween(5000, 100),
            'price' => $this->faker->numberBetween(10, 1000),
            'rest' => 10000,
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}
