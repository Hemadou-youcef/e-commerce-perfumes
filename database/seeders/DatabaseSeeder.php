<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\CartItem;
use App\Models\Category;
use App\Models\Order;
use App\Models\Product;
use App\Models\User;
use Database\Factories\ContactFactory;
use Exception;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // \App\Models\User::factory(10)->create();

        User::factory()->create([
            'first_name' => 'admin',
            'last_name' => 'admin',
            'username' => 'admin',
            'phone' => '0606060606',
            'role' => 3,
        ]);
        try {
            // start transaction
            DB::beginTransaction();

            $this->call(CategorySeeder::class);

            User::factory()->has(Product::factory()->hasImages(3)->hasProductPrices(1)->hasReceptions(1)->count(20))->create(['role' => fake()->randomElement([2, 3])]);
            User::factory()->count(20)->hasBookmarks(3)->has(Order::factory()->hasOrderProducts(3)->count(2))->create(['role' => 1]);
            CartItem::factory()->count(20)->create();
            ContactFactory::new()->count(20)->create();
            DB::commit();
        } catch (Exception $e) {
            DB::rollBack();
            throw $e;
        }


        foreach (Product::all() as $product) {

            $product->main_image_id = $product->images->first()->id;
            $product->save();

            $product->categories()->attach(Category::all()->random(3));
        }
    }
}
