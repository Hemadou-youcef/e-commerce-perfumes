<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreProductRequest;
use App\Http\Requests\UpdateProductRequest;
use App\Models\Product;
use Exception;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
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
                ->orderBy('created_at', 'desc')
                ->when(
                    request('search'),
                    fn ($query, $search) => $query
                        ->where('name', 'LIKE', '%' . $search . '%')
                        ->orWhere('id', 'LIKE', '%' . $search . '%')
                        ->orWhere('description', 'LIKE', '%' . $search . '%')
                        ->orWhere('description_ar', 'LIKE', '%' . $search . '%')
                        ->orWhere('reference', 'LIKE', '%' . $search . '%')

                )
                ->when(
                    request('status'),
                    fn ($query, $status) => $query
                        ->where('status', $status)
                )
                ->when(
                    request('category'),
                    fn ($query, $category) => $query
                        ->whereHas('categories', fn ($query) => $query->where('name', $category))
                )
                ->paginate(10)
                ->through(fn ($product) => [
                    'id' => $product->id,
                    'reference' => $product->reference,
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
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        return inertia::render('Dashboard/Products/productForm', [
            'categories' => \App\Models\Category::query()->when(request('categoryType'), fn ($query, $type) => $query->where('type', $type))->get(),
        ]);
    }
    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreProductRequest $request)
    {
        $validatedData = $request->validated();

        DB::beginTransaction();


        try {

            $product = new Product([
                'reference' => $validatedData['reference'],
                'name' => $validatedData['name'],
                'description' => $validatedData['description'],
                'description_ar' => $validatedData['description_ar'],
                'status' => $validatedData['status'],
                'unit' => $validatedData['unit'],
                'type' => $validatedData['type'],
                'user_id' => Auth::user()->id,
            ]);
            $product->save();
            if ($request->has('category_ids') and is_array($request['category_ids']) and count($request['category_ids']) > 0) {
                $categories = $validatedData['category_ids']; // expect array of category ids
                $product->categories()->attach($categories);
            } // Create product prices
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
                        $imagePath = '/storage/' . $image->store('images', 'public');
                        $product->images()->create(['path' => $imagePath]);
                    }
                }
            } catch (Exception $e) {
                // Handle exception
                DB::rollBack();
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
                DB::rollBack();
                return back()->withErrors(['main_image' => 'internal server error. could not upload image']);
            }
            $product->save();
            DB::commit();
            return redirect()->route('product', $product->id);
        } catch (Exception $e) {
            DB::rollBack();
            return back()->withErrors(['product' => $e->getMessage()]);
        }
    }


    /**
     * Display the specified resource.
     */
    public function show(Product $product)
    {
        $orders = $product->orders()->orderBy('created_at', 'desc')->paginate(10);
        $receptions = $product->receptions()->with('user')->orderBy('created_at', 'desc')->paginate(10);
        return inertia::render('Dashboard/Products/product', [
            'product' => [
                'id' => $product->id,
                'reference' => $product->reference,
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
                'receptions' => $receptions,
                'orders' => $orders,

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

        DB::beginTransaction();

        $product->reference = $validatedData['reference'];
        $product->name = $validatedData['name'];
        $product->description = $validatedData['description'];
        $product->description_ar = $validatedData['description_ar'];
        $product->status = $validatedData['status'];
        $product->type = $validatedData['type'];
        $product->unit = $validatedData['unit'];


        try {
            if ($request->has('category_ids')) {
                $categories = $validatedData['category_ids'];
                $product->categories()->sync($categories);
            }
            if ($request->has("prices")) {
                $prices = $validatedData['prices'];
                foreach ($prices as $price) {
                    if (isset($price['id'])) {
                        $product->productPrices()->where('id', $price['id'])->update([
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
            } // Handle other images addition and removal
            try {
                if ($request->hasFile('other_images')) {
                    $newImages = [];
                    foreach ($request->file('other_images') as $image) {
                        $imagePath = '/storage/' . $image->store('images', 'public');
                        $newImages[] = ['path' => $imagePath];
                    }
                    $product->images()->createMany($newImages);
                }
            } catch (Exception $e) {
                // Handle exception
                DB::rollBack();
                return back()->withErrors(['other_images' => 'internal server error. could not upload images']);
            } // Handle main image update
            if ($request->hasFile('main_image')) {
                $imagePath = '/storage/' . $request->file('main_image')->store('images', 'public');
                $main_image = $product->images()->create(['path' => $imagePath]);
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
            DB::commit();
            return redirect()->route('product', $product->id);
        } catch (Exception $e) {
            DB::rollBack();
            return back()->withErrors(['product' => 'internal server error. could not update product']);
        }
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
