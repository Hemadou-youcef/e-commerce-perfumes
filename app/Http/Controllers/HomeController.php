<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('home', [
            'pinned_products' => \App\Models\Product::pinnedProducts()->map(fn($product) => [
                'id' => $product->id,
                'name' => $product->name,
                'description' => $product->description,
                'description_ar' => $product->description_ar,
                'main_image_id' => $product->main_image_id,
                'categories' => $product->categories,
                'main_image' => $product->mainImage,


            ]),
            'for_you_perfumes' => Product::perfumes()->inRandomOrder()->take(10)->get()->map(function ($product) {
                return [
                    'id' => $product->id,
                    'name' => $product->name,
                    'description' => $product->description,
                    'description_ar' => $product->description_ar,
                    'main_image_id' => $product->main_image_id,
                    'type' => $product->type,
                    'active_product_prices' => $product->activeProductPrices,
                    'main_image' => $product->mainImage,
                    ];
            }),
            'for_you_accessories' => Product::accessories()->inRandomOrder()->take(10)->get()->map(function ($product) {
                return [
                    'id' => $product->id,
                    'name' => $product->name,
                    'description' => $product->description,
                    'description_ar' => $product->description_ar,
                    'main_image_id' => $product->main_image_id,
                    'type' => $product->type,
                    'active_product_prices' => $product->activeProductPrices,
                    'main_image' => $product->mainImage,
                    ];
            }),

        ]);

    }
}
