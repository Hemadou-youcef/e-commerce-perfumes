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
                    ->whereHas('categories', fn ($query) => $query->where('name', $category))
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
                    'categories' => $product->categories,
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
        $categories = $validatedData['category_ids']; // expect array of category ids

        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('images', 'public');
        }
        $product = Product::create([
            'name' => $validatedData['name'],
            'description' => $validatedData['description'],
            'description_ar' => $validatedData['description_ar'],
            'status' => $validatedData['status'],
            'user_id' => Auth::user()->id,
            'main_image' => $imagePath,
        ]);
        $product->categories()->attach($categories);

        return redirect()->route('product', $product->id);





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
                'categories' => $product->categories,
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
        $validatedData = $request->validated();
        $categories = $validatedData['category_ids']; // expect array of category ids

        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('images', 'public');
        }
        $product->update([
            'name' => $validatedData['name'],
            'description' => $validatedData['description'],
            'description_ar' => $validatedData['description_ar'],
            'status' => $validatedData['status'],
            'user_id' => Auth::user()->id,
            'main_image' => $imagePath,
        ]);
        $product->categories()->sync($categories);

        return redirect()->route('product', $product->id);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product)
    {
        //
    }
}
