<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\CartItem;
use App\Models\Image;
use App\Models\Order;
use App\Models\Product;
use App\Models\Reservation;
use App\Models\User;
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

            User::factory()->has(Product::factory()->hasImages(3)->hasProductPrices(1)->hasReceptions(1)->hasCategories(2)->count(20))->has(Order::factory()->hasOrderProducts(3)->count(2))->create();
            User::factory()->count(20)->hasBookmarks(3)->create();
//        Reservation::factory()->count(20)->create();
            CartItem::factory()->count(20)->create();
//            Image::factory()->count(20)->create();
            DB::commit();
        } catch (Exception $e) {
            DB::rollBack();
            throw $e;
        }


        foreach (Product::all() as $product) {

            $product->main_image_id = $product->images->first()->id;
            $product->save();
        }
    }
}
