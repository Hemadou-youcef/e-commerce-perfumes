<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Http\Requests\StoreProductRequest;
use App\Http\Requests\UpdateProductRequest;
use Inertia\Inertia;
use function Termwind\renderUsing;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return inertia::render('testPages/products', [
            'products' => Product::query()
                ->when(request('search'), fn ($query, $search) => $query
                    ->where('name', 'LIKE', '%' . $search . '%')
                    ->orWhere('description', 'LIKE', '%' . $search . '%')
                    ->orWhere('description_ar', 'LIKE', '%' . $search . '%')
                    ->orWhere('category', 'LIKE', '%' . $search . '%')
                )
                ->when(request('category'), fn ($query, $category) => $query
                    ->where('category', $category)
                )
                ->paginate(10)

                ->through(fn ($product) => [
                    'id' => $product->id,
                    'name' => $product->name,
                    'description' => $product->description,
                    'description_ar' => $product->description_ar,
                    'main_image' => $product->main_image,
                    'quantity' => $product->quantity,
                    'status' => $product->status,
                    'category' => $product->category,
                ])
                ->withQueryString(),
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
        return inertia::render('testPages/products', [
            'product' => [
                'id' => $product->id,
                'name' => $product->name,
                'description' => $product->description,
                'description_ar' => $product->description_ar,
                'main_image' => $product->main_image,
                'quantity' => $product->quantity,
                'status' => $product->status,
                'category' => $product->category,
                'images' => $product->images,
                'productPrices' => $product->productPrices,
                'receptions' => $product->receptions,
                'orders' => $product->orders,

            ],


        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Product $product)
    {

        return Inertia::render('products' , [
            'product' => $product->load(['images' , 'productPrices' , 'receptions' ]),
        ]);
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
