<?php

namespace Database\Seeders;

use App\Models\Product;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ReceptionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        foreach (Product::all() as $product) {

            $product_min_price = $product->productPrices()->first()->price / $product->productPrices()->first()->quantity;
            $reception_price = fake()->numberBetween($product_min_price - 100, $product_min_price - 800);

            $product->receptions()->create([
                'user_id' => User::where('role',3)->inRandomOrder()->first()->id,
                'name' => fake()->name,
                'quantity' => 10000,
                'price' => $reception_price,
                'rest' => 10000,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
