<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\CartItem;
use App\Models\Order;
use App\Models\Product;
use App\Models\Reservation;
use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // \App\Models\User::factory(10)->create();

        // \App\Models\User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);
        User::factory()->has(Product::factory()->hasImages(3)->hasProductPrices(2)->hasReceptions(3)->hasCategories(2)->count(20))->has(Order::factory()->hasOrderProducts(3)->count(2))->create();
        User::factory()->count(20)->hasBookmarks(3)->create();
        Reservation::factory()->count(20)->create();
        CartItem::factory()->count(20)->create();
    }
}
