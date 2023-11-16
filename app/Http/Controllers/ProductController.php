<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Models\Product;
use App\Http\Requests\StoreProductRequest;
use App\Http\Requests\UpdateProductRequest;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use function Termwind\renderUsing;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return inertia::render('Dashboard/Products/products', [
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
                    'quantity' => $product->quantity . ' ' . $product->unit,
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
        $validatedData = $request->validated();

        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('images', 'public');
        }
        $product = Product::create([
            'name' => $validatedData['name'],
            'description' => $validatedData['description'],
            'description_ar' => $validatedData['description_ar'],
            'status' => $validatedData['status'],
            'user_id' => Auth::user()->id,
            'category' => $validatedData['category'],
            'main_image' => $imagePath,
        ]);

        return redirect()->route('products.show', $product->id);





    }

    /**
     * Display the specified resource.
     */
    public function show(Product $product)
    {
        return inertia::render('Dashboard/Products/product', [
            'product' => [
                'id' => $product->id,
                'name' => $product->name,
                'description' => $product->description,
                'description_ar' => $product->description_ar,
                'main_image' => $product->main_image,
                'quantity' => $product->quantity,
                'unit' => $product->unit,
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
