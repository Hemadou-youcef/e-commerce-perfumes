<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreProductRequest;
use App\Http\Requests\UpdateProductRequest;
use App\Models\Category;
use App\Models\Product;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class ClientProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        return Inertia::render('ClientSide/Products/products', [
            'products' => Product::activeProducts()
                ->when(request('q'), fn($query, $search) => $query
                    ->where('name', 'LIKE', '%' . $search . '%')
                    ->orWhere('description', 'LIKE', '%' . $search . '%')
                    ->orWhere('description_ar', 'LIKE', '%' . $search . '%')
                )
                ->when(request('startPrice'), fn($query, $price) => $query
                    ->whereHas('activeProductPrices', fn($query) => $query->where('price', '>=', $price))
                )
                ->when(request('endPrice'), fn($query, $price) => $query
                    ->whereHas('activeProductPrices', fn($query) => $query->where('price', '<=', $price))
                )
                ->when(request('category'), function ($query, $category) {
                    // category is a string of comma separated names
                    $categories = explode(',', $category);
                    return $query->whereHas('categories', fn($query) => $query->whereIn('name', $categories));

                    }
                )
                ->orderBy('created_at', 'desc')
                ->paginate(12)
                ->through(fn($product) => [
                    'id' => $product->id,
                    'name' => $product->name,
                    'description' => $product->description,
                    'description_ar' => $product->description_ar,
                    'main_image_id' => $product->main_image_id,
                    'categories' => $product->categories,
                    'active_product_prices' => $product->activeProductPrices,
                    'images' => $product->images,
                    'isProductBookmarked' => $product->isProductBookmarked()
                ])
                ->withQueryString(),
            'categories' => Category::all()->map(fn($category) => [
                'id' => $category->id,
                'name' => $category->name,
                'name_ar' => $category->name_ar,
                'type' => $category->type,
            ]),
            'filters' => [
                'q' => request('q', ''),
                'startPrice' => request('startPrice', ''),
                'endPrice' => request('endPrice', ''),
                'category' => request('category', ''),
            ],
        ]);
    }

    public function perfumes(): Response
    {
        return Inertia::render('ClientSide/Products/perfumes', [
            'products' => Product::perfumes()
                ->when(request('q'), fn($query, $search) => $query
                    ->where('name', 'LIKE', '%' . $search . '%')
                    ->orWhere('description', 'LIKE', '%' . $search . '%')
                    ->orWhere('description_ar', 'LIKE', '%' . $search . '%')
                )
                ->when(request('startPrice'), fn($query, $price) => $query
                    ->whereHas('activeProductPrices', fn($query) => $query->where('price', '>=', $price))
                )
                ->when(request('endPrice'), fn($query, $price) => $query
                    ->whereHas('activeProductPrices', fn($query) => $query->where('price', '<=', $price))
                )
                ->when(request('category'), function ($query, $category) {
                    // category is a string of comma separated names
                    $categories = explode(',', $category);
                    return $query->whereHas('categories', fn($query) => $query->whereIn('name', $categories));

                }
                )
                ->orderBy('created_at', 'desc')
                ->paginate(12)
                ->through(fn($product) => [
                    'id' => $product->id,
                    'name' => $product->name,
                    'description' => $product->description,
                    'description_ar' => $product->description_ar,
                    'main_image_id' => $product->main_image_id,
                    'categories' => $product->categories,
                    'active_product_prices' => $product->activeProductPrices,
                    'images' => $product->images,
                    'isProductBookmarked' => $product->isProductBookmarked()
                ])
                ->withQueryString(),
            'categories' => Category::perfumesCategories()->get()->map(fn($category) => [
                'id' => $category->id,
                'name' => $category->name,
                'name_ar' => $category->name_ar,
            ]),
            'filters' => [
                'q' => request('q', ''),
                'startPrice' => request('startPrice', ''),
                'endPrice' => request('endPrice', ''),
                'category' => request('category', ''),
            ],
        ]);

    }

    public function accessories(): Response
    {
        return Inertia::render('ClientSide/Products/accessories', [
            'products' => Product::accessories()
                ->when(request('q'), fn($query, $search) => $query
                    ->where('name', 'LIKE', '%' . $search . '%')
                    ->orWhere('description', 'LIKE', '%' . $search . '%')
                    ->orWhere('description_ar', 'LIKE', '%' . $search . '%')
                )
                ->when(request('startPrice'), fn($query, $price) => $query
                    ->whereHas('activeProductPrices', fn($query) => $query->where('price', '>=', $price))
                )
                ->when(request('endPrice'), fn($query, $price) => $query
                    ->whereHas('activeProductPrices', fn($query) => $query->where('price', '<=', $price))
                )
                ->when(request('category'), function ($query, $category) {
                    // category is a string of comma separated names
                    $categories = explode(',', $category);
                    return $query->whereHas('categories', fn($query) => $query->whereIn('name', $categories));

                }
                )
                ->orderBy('created_at', 'desc')
                ->paginate(12)
                ->through(fn($product) => [
                    'id' => $product->id,
                    'name' => $product->name,
                    'description' => $product->description,
                    'description_ar' => $product->description_ar,
                    'main_image_id' => $product->main_image_id,
                    'categories' => $product->categories,
                    'active_product_prices' => $product->activeProductPrices,
                    'images' => $product->images,
                    'type' => $product->type,
                    'isProductBookmarked' => $product->isProductBookmarked()
                ])
                ->withQueryString(),
            'categories' => Category::accessoriesCategories()->get()->map(fn($category) => [
                'id' => $category->id,
                'name' => $category->name,
                'name_ar' => $category->name_ar,
            ]),
            'filters' => [
                'q' => request('q', ''),
                'startPrice' => request('startPrice', ''),
                'endPrice' => request('endPrice', ''),
                'category' => request('category', ''),
            ],
        ]);

    }

    /**
     * Display the specified resource.
     */
    public function show(Product $product): Response
    {
        return Inertia::render('ClientSide/Products/Product/product', [
            'product' => [
                'id' => $product->id,
                'name' => $product->name,
                'description' => $product->description,
                'description_ar' => $product->description_ar,
                'main_image_id' => $product->main_image_id,
                'categories' => $product->categories,
                'images' => $product->images,
                'active_product_prices' => $product->activeProductPrices,
                'isProductInCart' => $product->isProductInCart(),
                'isProductBookmarked' => $product->isProductBookmarked(),
                'suggestedProducts' => $product->suggestedProducts(),

            ]
        ]);
    }


}
