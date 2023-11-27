<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreOrderRequest;
use App\Http\Requests\UpdateOrderRequest;
use App\Models\Order;
use App\Models\OrderProduct;
use App\Models\Product;
use App\Models\Reception;
use App\Models\Reservation;
use Exception;
use Inertia\Inertia;

class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {

        return Inertia::render('Dashboard/Orders/orders', [
            'orders' => Order::query()
                ->when(request('q'), function ($query, $q) {
                    $query->whereHas('user', function ($userQuery) use ($q) {
                        $userQuery->where('first_name', 'like', '%' . $q . '%')
                            ->orWhere('last_name', 'like', '%' . $q . '%')
                            ->orWhere('phone', 'like', '%' . $q . '%');
                    });
                })
                ->when(request('start'), fn($query) => $query->where('created_at', '>=', request('start')))
                ->when(request('end'), fn($query) => $query->where('created_at', '<=', request('end')))
                ->orderBy('created_at', 'desc')
                ->with(['user'])
                ->withCount('orderProducts')
                ->paginate(10)
                ->withQueryString()
        ]);
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
        $order->load([
            'user',
            'confirmedBy',
            'deliveredBy',
            'orderProducts.product.receptions' => function ($query) {
                $query->where('rest', '>', 0);
            },
            'orderProducts.reservations'
        ]);

        // Load orderProducts and calculate totalQuantity for each
        $order->orderProducts->each(function ($orderProduct) {
            $orderProduct->total_quantity = $orderProduct->totalQuantity();
        });

        return Inertia::render('Dashboard/Orders/order', ['order' => $order]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Order $order)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Order $order)
    {
        // delete order
        $order->delete();

        return to_route('orders');

    }

    public function verify(Order $order)
    {
        $errors = [];
        $productQuantities = []; // To aggregate quantities for each product

        // Aggregate quantities for each product in the order
        foreach ($order->orderProducts as $orderProduct) {
            $productId = $orderProduct->product_id;
            // $productQuantities[$productId] = ($productQuantities[$productId] ?? 0) + $orderProduct->totalQuantity();
            $productQuantities[$productId] = ($productQuantities[$productId] ?? 0) + $orderProduct->totalQuantity();
        }

        // Check available stock for each product
        foreach ($productQuantities as $productId => $quantity) {
            $product = Product::findOrFail($productId); // Retrieve the product
            if ($product->quantity < $quantity) {
                // $errors[] = $product->name . ' has only ' . $product->quantity . ' in stock but ' . $quantity . ' is required';
                // array_push($errors, ['id' => $productId, 'name' => $product->name, 'quantity' => $product->quantity, 'required' => $quantity]);
                $errors[] = $productId;
            }
        }

        // If errors exist, redirect back with errors
        if (count($errors) > 0) {
            return back()->withErrors($errors);
        }

        // Deduct stock and update order status
        foreach ($order->orderProducts as $orderProduct) {
            $orderProduct->product->removeStock($orderProduct->totalQuantity());
        }

        $order->update([
            'status' => 'verified',
            'verified_by' => auth()->user()->id
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateOrderRequest $request, Order $order)
    {
        //
    }

    public function confirm(Order $order)
    {
        // check if order is verified
        if ($order->status != 'verified') {
            return back()->withErrors(['order' => 'order doit être vérifié']);
        }

        try {
            $data = request('data');
            $reservations = json_decode(urldecode($data));
        } catch (Exception $e) {
            return back()->withErrors(['data' => 'Veuillez envoyer les données de dans le format json']);
        }

        // return $reservations;
        foreach ($reservations as $reservation) {

            $reception_id = $reservation->reception_id;
            $order_product_id = $reservation->order_product_id;
            $quantity = $reservation->quantity;


            // check if reception exists
            $reception = Reception::query()->where('id', $reception_id)->first();
            if ($reception == null) {
                return back()->withErrors(['reception_id' => 'reception_id n\'existe pas']);
            }

            // check if reception rest is enough
            if ($quantity > $reception->rest) {
                return back()->withErrors(['quantity' => 'quantity doit être inférieur ou égal à la quantité restante dans la réception']);
            }

            // check if order_product exists
            $order_product = OrderProduct::query()->where('id', $order_product_id)->first();
            if ($order_product == null) {
                return back()->withErrors(['order_product_id' => 'order_product_id n\'existe pas']);
            }


            if ($quantity > $order_product->totalQuantity()) {
                return back()->withErrors(['quantity' => 'quantity doit être inférieur ou égal à la quantité de la commande']);
            }

            // return [$reception_id, $order_product_id, $quantity];
            $reservation = Reservation::query()->create([
                'reception_id' => $reception_id,
                'order_product_id' => $order_product_id,
                'quantity' => $quantity,
            ]);

            $reservation->apply();


        }


        $order->update([
            'status' => 'confirmed',
            'confirmed_by' => auth()->user()->id
        ]);


        return back();
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    public function deliver(Order $order)
    {
        if ($order->status != 'confirmed') {
            return back()->withErrors(['order' => 'order doit être confirmé']);
        }
        $order->update([
            'status' => 'delivered',
            'delivered_by' => auth()->user()->id
        ]);

        return back();
    }

    public function cancel(Order $order)
    {

        $this->authorize('cancel', $order);
        switch ($order->status) {
            case 'cancelled':
                return back()->withErrors(['order' => 'order est déjà annulé']);
            case 'delivered':
                return back()->withErrors(['order' => 'order ne peut pas être annulé car il est déjà livré']);
            case 'verified':
                // revert stock for each product
                $order->orderProducts->each(function ($orderProduct) {
                    $orderProduct->product->addStock($orderProduct->totalQuantity());
                });
                break;
            case 'confirmed':
                // revert stock for each product
                $order->orderProducts->each(function ($orderProduct) {
                    $orderProduct->product->addStock($orderProduct->totalQuantity());
                });
                // delete reservations
                $order->reservations()->each(function ($reservation) {
                    $reservation->revert();
                    $reservation->delete();
                });
                break;


        }


        $order->update([
            'status' => 'cancelled',
            'cancelled_by' => auth()->user()->id
        ]);

        return back();

    }


    public function PdfReceipt(Order $order)
    {
        return Inertia::render('Dashboard/Orders/PdfReceipt', ['order' => $order->load(
            [
                'user',
                'confirmedBy',
                'deliveredBy',
                'orderProducts.product ',
            ]
        )]);

    }
}
