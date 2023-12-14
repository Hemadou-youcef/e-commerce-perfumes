<?php

namespace Database\Factories;

use App\Models\Image;
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
//       $main_image_id = Image::inRandomOrder()->first()->id;
        return [
            'name' => $this->faker->sentence.substr( 0, 5),
            'description' => $this->faker->paragraph,
            'description_ar' => 'وصف باللغة العربية',
            'main_image_id' => null,
            'quantity' => 10000,
            'unit' => $this->faker->randomElement(['l', 'ml', 'unité']),
            'type' => $this->faker->randomElement([1,2]),
//            'status' => $this->faker->randomElement([ null]),
            'status' => $this->faker->randomElement(['pinned', 'archived', 'published']),
            'user_id' => User::factory(),
//            'category' => $this->faker->word,
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}
