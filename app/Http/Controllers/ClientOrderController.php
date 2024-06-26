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
        return Inertia::render('ClientSide/Orders/orders', [
            'orders' => Auth::user()->orders()
                ->select('id', 'user_id', 'total', 'status', 'created_at')
                ->with([
                    'orderProducts' => function ($query) {
                        $query->select('id', 'order_id', 'product_id', 'quantity', 'price');
                    },
                    'orderProducts.product' => function ($query) {
                        $query->select('id', 'name', 'description', 'description_ar', 'main_image_id');
                    },
                    'orderProducts.product.images',
                    'orderProducts.product.categories',
                    'orderProducts.product.activeProductPrices' => function ($query) {
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
        if ($order->user_id != Auth::id()) {
            abort(404);
        }

        return Inertia::render('ClientSide/Orders/Order/order' , [
            'order' => $order
                ->load([
                'orderProducts' => function ($query) {
                    $query->select('id', 'order_id', 'product_id', 'quantity', 'price','product_price_id');
                },
                'orderProducts.product' => function ($query) {
                    $query->select('id', 'name', 'description', 'description_ar', 'main_image_id' );
                },
                'orderProducts.product.mainImage',
                'orderProducts.productPrice' => function ($query) {
                    $query->select('id', 'price', 'unit', 'quantity');
                },
                'address' => function ($query) {
                    $query->select('id', 'street_address','city','phone','shipping_price','shipping_fee_id', 'shipping_method' , );
                },
                'address.shippingFee',
                'shippingAgency' => function ($query) {
                    $query->select('id', 'name', 'name_ar');
                },

            ])->makeHidden(['profit', 'verified_by', 'confirmed_by', 'delivered_by', 'cancelled_by'])
        ]);
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
