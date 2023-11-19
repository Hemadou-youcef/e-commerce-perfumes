<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Storage;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $imageFiles = Storage::files('public/images/'); // Assuming images are in the 'public' directory
        $url = Storage::url($this->faker->randomElement($imageFiles));
        return [
            'name' => $this->faker->sentence,
            'description' => $this->faker->paragraph,
            'description_ar' => $this->faker->paragraph,
            'main_image' => $url,
            'quantity' => 0,
            'unit' => $this->faker->randomElement(['kg', 'g', 'l', 'ml', 'unité']),
            'type' => $this->faker->randomElement(['parfum', 'huile', 'encens','accessoires', 'autre']),
            'status' => $this->faker->randomElement([ null]),
//            'status' => $this->faker->randomElement(['pinned', 'archived', null]),
            'user_id' => User::factory(),
//            'category' => $this->faker->word,
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}
