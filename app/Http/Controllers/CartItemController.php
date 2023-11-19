<?php

namespace App\Http\Controllers;

use App\Models\CartItem;
use App\Http\Requests\StoreCartItemRequest;
use App\Http\Requests\UpdateCartItemRequest;
use http\Client\Curl\User;
use Illuminate\Support\Facades\Auth;

class CartItemController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $client = Auth::user();
        return Inertia::render('testPages/test', [
            'cartItems' => $client->cartItems()->load(['product' => function ($query) {
                return $query->through(fn ($product) => [
                    'id' => $product->id,
                    'name' => $product->name,
                    'description' => $product->description,
                    'description_ar' => $product->description_ar,
                    'main_image' => $product->main_image,


                ]);
            }
            , 'product.categories' => function ($query) {
                return $query->through(fn ($category) => [
                    'id' => $category->id,
                    'name' => $category->name,
                    'name_ar' => $category->name_ar,
                ]);
            }
            , 'productPrice' => function ($query) {
                return $query->through(fn ($productPrice) => [
                    'id' => $productPrice->id,
                    'price' => $productPrice->price,
                    'quantity' => $productPrice->quantity,
                    'unit' => $productPrice->unit,
                ]);
            }
            ])
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
    public function store(StoreCartItemRequest $request)
    {
        $validated = $request->validated();

        Auth::user()->cartItems()->create($validated);
    }

    /**
     * Display the specified resource.
     */
    public function show(CartItem $cartItem)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(CartItem $cartItem)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCartItemRequest $request, CartItem $cartItem)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(CartItem $cartItem)
    {
        $cartItem->delete();
        return redirect()->back();
    }
}
