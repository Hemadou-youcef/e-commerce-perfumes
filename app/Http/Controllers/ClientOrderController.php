<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreOrderRequest;
use App\Http\Requests\UpdateOrderRequest;
use App\Models\Order;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ClientOrderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('testPages/test', [
            'orders' => Auth::user()->orders()
                ->select('id', 'user_id', 'total', 'status', 'address', 'created_at')
                ->with([
                    'orderProducts' => function ($query) {
                        $query->select('id', 'order_id', 'product_id', 'quantity', 'price');
                    },
                    'orderProducts.product' => function ($query) {
                        $query->select('id', 'name', 'description', 'description_ar', 'main_image');
                    },
                    'orderProducts.product.categories',
                    'orderProducts.productPrice' => function ($query) {
                        $query->select('id', 'price', 'unit', 'quantity');
                    }
                ])
                ->orderBy('created_at', 'desc')
                ->paginate(10)
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
    public function store(StoreOrderRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Order $order)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Order $order)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateOrderRequest $request, Order $order)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Order $order)
    {
        //
    }


}
