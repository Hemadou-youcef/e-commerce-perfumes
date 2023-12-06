<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreProductRequest;
use App\Http\Requests\UpdateProductRequest;
use App\Models\Product;
use Exception;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return inertia::render('Dashboard/Products/products', [
            'products' => Product::query()
                ->when(request('search'), fn($query, $search) => $query
                    ->where('name', 'LIKE', '%' . $search . '%')
                    ->orWhere('description', 'LIKE', '%' . $search . '%')
                    ->orWhere('description_ar', 'LIKE', '%' . $search . '%')
                )
                ->when(request('status'), fn($query, $status) => $query
                    ->where('status', $status)
                )
                ->when(request('category'), fn($query, $category) => $query
                    ->whereHas('categories', fn($query) => $query->where('name', $category))
                )
                ->paginate(10)
                ->through(fn($product) => [
                    'id' => $product->id,
                    'name' => $product->name,
                    'description' => $product->description,
                    'description_ar' => $product->description_ar,
                    'main_image_id' => $product->main_image_id,
                    'quantity' => $product->quantity . ' ' . $product->unit,
                    'status' => $product->status,
                    'categories' => $product->categories,
                ])
                ->withQueryString(),
            'filters' => [
                'search' => request('search', ''),
                'category' => request('category', ''),
            ],
        ]);
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
                'main_image_id' => $product->main_image_id,
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
        return Inertia::render('Dashboard/Products/productForm', [
            'product' => $product->load(['images', 'productPrices', 'categories', 'receptions']),
            'categories' => \App\Models\Category::all(),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProductRequest $request, Product $product)
    {
        $validatedData = $request->validated();
        // expect array of category ids

        $product->name = $validatedData['name'];
        $product->description = $validatedData['description'];
        $product->description_ar = $validatedData['description_ar'];
        $product->status = $validatedData['status'];

        if ($request->has('category_ids')) {
            $categories = $validatedData['category_ids'];
            $product->categories()->sync($categories);
        }


        if ($request->has("prices")) {
            $prices = $validatedData['prices'];
            foreach ($prices as $price) {
                if (isset($price['id'])) {
                    $product->productPrices()->where('id', $price['id'])->update([
                        'price' => $price['price'],
                        'unit' => $price['unit'],
                        'quantity' => $price['quantity'],
                        'active' => $price['active'],
                    ]);
                } else {
                    $product->productPrices()->create([
                        'price' => $price['price'],
                        'unit' => $price['unit'],
                        'quantity' => $price['quantity'],
                        'active' => $price['active'],
                    ]);
                }

            }
        }

        // Handle other images addition and removal
        try {
            if ($request->hasFile('other_images')) {
                $newImages = [];
                foreach ($request->file('other_images') as $image) {
                    $imagePath ='/storage/' . $image->store('images', 'public');
                    $newImages[] = ['path' =>  $imagePath];
                }
                $product->images()->createMany($newImages);
            }
        } catch (Exception $e) {
            // Handle exception
            return back()->withErrors(['other_images' => 'internal server error. could not upload images']);
        }


        // Handle main image update
        if ($request->hasFile('main_image')) {
            $imagePath = '/storage/' .$request->file('main_image')->store('images', 'public');
            $main_image = $product->images()->create(['path' =>  $imagePath]);
            $product->main_image_id = $main_image->id; // Set main image
        } else {
            if ($request['main_image_id'] != null) {
                if ($product->images()->where('id', $request->input('main_image_id'))->exists()) {
                    $product->main_image_id = $request->input('main_image_id');
                } else {
                    return back()->withErrors(['main_image_id' => 'invalid image id']);
                }
            }
        }
        $product->save();

        if ($request->has('removed_images')) {
            $removedImages = $request->input('removed_images');
            $product->images()->whereIn('id', $removedImages)->delete();
        }

        $product->save();

        return redirect()->route('product', $product->id);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreProductRequest $request)
    {
        $validatedData = $request->validated();


        $product = new Product([
            'name' => $validatedData['name'],
            'description' => $validatedData['description'],
            'description_ar' => $validatedData['description_ar'],
            'status' => $validatedData['status'],
            'unit' => $validatedData['unit'],
            'user_id' => Auth::user()->id,
        ]);

        $product->save();
        if ($request->has('category_ids')) {
            $categories = $validatedData['category_ids'];// expect array of category ids
            $product->categories()->attach($categories);
        }

        // Create product prices
        $prices = $validatedData['prices'];

        foreach ($prices as $price) {
            $product->productPrices()->create([
                'price' => $price['price'],
                'unit' => $price['unit'],
                'quantity' => $price['quantity'],
                'active' => $price['active'],
            ]);
        }


        try {
            if ($request->hasFile('images')) {
                foreach ($request->file('images') as $image) {
                    $imagePath = '/storage/' .$image->store('images', 'public');
                    $product->images()->create(['path' =>  $imagePath]);
                }
            }
        } catch (Exception $e) {
            // Handle exception
            return back()->withErrors(['images' => 'internal server error. could not upload images']);
        }

        try {
            if ($request->hasFile('main_image')) {
                $mainImagePath = $request->file('main_image')->store('images', 'public');
                $main_image = $product->images()->create(['path' => '/storage/' . $mainImagePath]);
                //
                $product->main_image_id = $main_image->id; // Set main image

            }
        } catch (Exception $e) {
            // Handle exception
            return back()->withErrors(['main_image' => 'internal server error. could not upload image']);
        }

        $product->save();

        return redirect()->route('product', $product->id);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        return inertia::render('Dashboard/Products/productForm',[
            'categories' => \App\Models\Category::all(),
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product): RedirectResponse
    {
        $product->delete();
        return redirect()->route('products');
    }


    public function updateStatus(Product $product): RedirectResponse
    {
        $status_code = request('status');
        switch ($status_code) {
            case 0:
                $product->status = 'archived';
                break;
            case 1:
                $product->status = 'published';
                break;
            case 2:
                $product->status = 'pinned';
                break;
            default:
                $product->status = 'published';
        }
        $product->save();

        return redirect()->route('product', $product->id);
    }
}
