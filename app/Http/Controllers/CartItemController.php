<?php

namespace App\Http\Controllers;

use App\Models\CartItem;
use App\Http\Requests\StoreCartItemRequest;
use App\Http\Requests\UpdateCartItemRequest;
use App\Models\Order;
use http\Client\Curl\User;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class CartItemController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $client = Auth::user();
        return Inertia::render('ClientSide/Cart/cart', [
            'cartItems' => $client->cartItems()->with([
                'product' => function ($query) {
                    $query->select('id', 'name', 'description','description_ar', 'main_image');
                },
                'product.categories',
                'productPrice' => function ($query) {
                    $query->select('id', 'price', 'unit', 'quantity');
                }
            ])->get()
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


    public function checkout()
    {
        // Get the authenticated user
        $user = Auth::user();

        // Retrieve cart items for the authenticated user
        $cartItems = $user->cartItems()->get();

        // Create a new order for the user
        $order = new Order([
            // Add other order details if needed (e.g., total, address, etc.)
            'user_id' => $user->id,
            // ...other order details
        ]);
        $order->save();

        // Convert each cart item to an order product and attach it to the order
        foreach ($cartItems as $cartItem) {
            $orderProduct = new OrderProduct([
                'product_id' => $cartItem->product_id,
                'quantity' => $cartItem->quantity,
                'product_price_id' => $cartItem->product_price_id,
                'price' => $cartItem->productPrice->price * $cartItem->quantity,
                // ...other order product details
            ]);
            $order->orderProducts()->save($orderProduct);
        }

        // Clear the user's cart (assuming you have a method to clear cart items)
        // $user->cartItems()->delete(); // Example method to delete cart items

        // Alternatively, if your cart items can be marked as purchased but not deleted
        // $cartItems->update(['purchased' => true]);

        // Return a response indicating successful checkout or redirect to a success page
        // return response()->json(['message' => 'Checkout successful']);

        // Redirect to a success page or return a response indicating successful checkout
        // return redirect()->route('checkout.success');
    }
}
