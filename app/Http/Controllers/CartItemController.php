<?php

namespace App\Http\Controllers;

use App\Helpers\WilayaMapper;
use App\Helpers\YalidineTarifications;
use App\Models\Address;
use App\Models\CartItem;
use App\Http\Requests\StoreCartItemRequest;
use App\Http\Requests\UpdateCartItemRequest;
use App\Models\OrderProduct;
use App\Models\Order;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use function Laravel\Prompts\error;

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
                    $query->select('id', 'name', 'description','description_ar', 'main_image_id');
                },
                'product.categories',
                'productPrice' => function ($query) {
                    $query->select('id', 'price', 'unit', 'quantity');
                }
            ])->get()
            ,

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
        $this->authorize('delete', $cartItem);
        $cartItem->delete();
        return redirect()->back();
    }


    public function checkout()
    {
        // Get the authenticated user
        $user = Auth::user();

        // check if user has cart items
        if ($user->cartItems()->count() == 0) {
            return redirect()->back()->withErrors(['cart' => 'cart is empty']);
        }

        // validate order address
        $address = request()->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'phone' => 'required|string|max:15',
            'street_address' => 'nullable|string|max:255',
            'city' => 'required|string|max:255',
            'state_code' => 'required|integer|between:1,58',
            'postal_code' => 'nullable|string|max:255',
            'shipping_method' => 'required|integer|between:1,2',
        ]);
        // Retrieve cart items for the authenticated user
        $cartItems = $user->cartItems()->get();

        try {
            DB::beginTransaction();


            // Create a new order for the user
            $order = Order::create([
                'user_id' => $user->id,
            ]);

            // get state name based on state code
            $wilayaMapper = new WilayaMapper();
            $address['state'] = $wilayaMapper->getProvinceName($address['state_code']);

            // get shipping fees based on shipping address
            $shippingFees = $this->getShippingFees($address['shipping_method'], $address['state_code']);
            if ($shippingFees == null) {
                return redirect()->back()->withErrors(['cart' => 'something went wrong']);
            }
            $address['shipping_fees'] = $shippingFees;

            $createdAddress = Address::create($address);

            // attach address to order
            $order->address()->associate($createdAddress);



            // Convert each cart item to an order product and attach it to the order
            foreach ($cartItems as $cartItem) {
                $orderProduct = new OrderProduct([
                    'product_id' => $cartItem->product_id,
                    'quantity' => $cartItem->quantity,
                    'product_price_id' => $cartItem->product_price_id,
                    'price' => $cartItem->productPrice->price * $cartItem->quantity,
                ]);

                $created_order_product = $order->orderProducts()->save($orderProduct);
//                $created_order_product->buying_price = $created_order_product->buyingPrice();
//                $created_order_product->save();
            }

            // order total price

            $order->total = $order->totalPrice();
            $order->save();

            // Delete all cart items for the user
            $user->emptyCart();
            DB::commit();
        }catch (\Exception $e) {
            DB::rollBack();
            error_log($e->getMessage());
            return redirect()->back()->withErrors(['cart' => 'something went wrong']);

        }
        return redirect()->to('/orders');
    }

    public function getShippingFees($shippingType, $stateCode): int
    {
        $yalidine = new YalidineTarifications();
        $shippingType = (int)$shippingType;
        $stateCode = (int)$stateCode;
        if ($shippingType == 1) {
            return $yalidine->getStopDeskDeliveryFee($stateCode);
        } else {
            return $yalidine->getHomeDeliveryFee($stateCode);
        }

    }
}
