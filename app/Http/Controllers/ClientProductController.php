<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreProductRequest;
use App\Http\Requests\UpdateProductRequest;
use App\Models\Category;
use App\Models\Product;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ClientProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('ClientSide/Products/products', [
            'products' => Product::query()
                ->when(request('q'), fn($query, $search) => $query
                    ->where('name', 'LIKE', '%' . $search . '%')
                    ->orWhere('description', 'LIKE', '%' . $search . '%')
                    ->orWhere('description_ar', 'LIKE', '%' . $search . '%')
                    ->orWhere('category', 'LIKE', '%' . $search . '%')
                )
                ->when(request('startPrice'), fn($query, $price) => $query
                    ->whereHas('productPrices', fn($query) => $query->where('price', '>=', $price))
                )
                ->when(request('endPrice'), fn($query, $price) => $query
                    ->whereHas('productPrices', fn($query) => $query->where('price', '<=', $price))
                )
                ->when(request('category'), fn($query, $category) => $query
                    ->whereHas('categories', fn($query) => $query->where('name', $category))
                )
                ->orderBy('created_at', 'desc')
                ->paginate(12)
                ->through(fn($product) => [
                    'id' => $product->id,
                    'name' => $product->name,
                    'description' => $product->description,
                    'description_ar' => $product->description_ar,
                    'main_image' => $product->main_image,
                    'categories' => $product->categories,
                    'product_prices' => $product->productPrices,
                    'isProductBookmarked' => $product->isProductBookmarked()
                ])
                ->withQueryString(),
            'categories' => Category::all()->map(fn($category) => [
                'id' => $category->id,
                'name' => $category->name,
                'name_ar' => $category->name_ar,
            ]),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreProductRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Product $product)
    {
        return Inertia::render('ClientSide/Products/Product/product', [
            'product' => [
                'id' => $product->id,
                'name' => $product->name,
                'description' => $product->description,
                'description_ar' => $product->description_ar,
                'main_image' => $product->main_image,
                'categories' => $product->categories,
                'images' => $product->images,
                'product_prices' => $product->productPrices,
                'isProductInCart' => $product->isProductInCart(),
                'isProductBookmarked' => $product->isProductBookmarked(),
                'suggestedProducts' => $product->suggestedProducts(),

            ]
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Product $product)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProductRequest $request, Product $product)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product)
    {
        //
    }
}
