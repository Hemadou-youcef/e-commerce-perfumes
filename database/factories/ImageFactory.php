<?php

namespace Database\Factories;

use App\Models\Product;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Storage;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Image>
 */
class ImageFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $imageFiles = Storage::files('public/images/'); // Assuming images are in the 'public' directory
        $path = Storage::url($this->faker->randomElement($imageFiles));
        return [
            'product_id' => Product::factory(),
            'path' => $path,
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}
