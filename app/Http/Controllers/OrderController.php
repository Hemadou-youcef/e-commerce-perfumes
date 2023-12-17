<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreOrderRequest;
use App\Http\Requests\UpdateOrderRequest;
use App\Models\Order;
use App\Models\OrderProduct;
use App\Models\Product;
use App\Models\ProductPrice;
use App\Models\Reception;
use App\Models\Reservation;
use Carbon\Carbon;
use Exception;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;
use function Termwind\render;

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
                            ->orWhere('phone',  $q)
                        ;
                    })->orWhere('id', $q);
                    ;
                })
                ->when(request('status') && request('status') != 'all', fn($query) => $query->where('status', request('status')))
                ->when(request('start'), fn($query) => $query->where('created_at', '>=', request('start')))
                ->when(request('end'), fn($query) => $query->where('created_at', '<=', request('end')))
                ->orderBy('created_at', 'desc')
                ->with(['user' ])
                ->withCount('orderProducts')
                ->paginate(10)
                ->withQueryString(),
            'filters' => [
                'q' => request('q', ''),
                'start' => request('start', ''),
                'end' => request('end', ''),
            ],

        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $q = request('q');
        if (!$q) return Inertia::render('Dashboard/Orders/ordersForm', [
            'products' => []
        ]);
        return Inertia::render('Dashboard/Orders/ordersForm', [
            'products' => Product::query()
                ->where('quantity', '>', 0)
                ->where(function ($query) use ($q) {
                    $query->where('name', 'like', '%' . $q . '%')
                        ->orWhere('description', 'like', '%' . $q . '%')
                        ->orWhere('description_ar', 'like', '%' . $q . '%');
                })
                ->with(['activeProductPrices', 'receptions' => function ($query) {
                    $query->where('rest', '>', 0);
                }])
                ->get()
        ]);

    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreOrderRequest $request)
    {
        $order_products = $request->validated();

        $errors = [];
        $productQuantities = []; // To aggregate quantities for each product

        // check if product exists with its price
        foreach ($order_products['products'] as $product) {
            $product_id = $product['product_id'];
            $product_price_id = $product['product_price_id'];

            // check if product exists
            $productQ = Product::query()->where('id', $product_id)->first();
            if ($productQ == null) {
                return back()->withErrors(['product_id' => 'product_id n\'existe pas']);
            }

            // check if product price exists
            $product_price = $productQ->productPrices()->where('id', $product_price_id)->first();
            if ($product_price == null) {
                return back()->withErrors(['product_price_id' => 'product_price_id n\'existe pas']);
            }


            if (isset($product['reservations'])) {
                $reservations_total_quantity = 0;
                foreach ($product['reservations'] as $reservation) {
                    $reception_id = $reservation['reception_id'];
                    $quantity = $reservation['quantity'];
                    $reservations_total_quantity += $quantity;


                    // check if reception exists
                    $reception = Reception::query()->where('id', $reception_id)->first();
                    if ($reception == null || $reception->product_id != $product_id) {
                        return back()->withErrors(['reception_id' => 'reception_id n\'existe pas']);
                    }

                    // check if reception rest is enough
                    if ($quantity > $reception->rest) {
                        return back()->withErrors(['quantity' => 'quantity doit être inférieur ou égal à la quantité restante dans la réception']);
                    }

                }
                if ($reservations_total_quantity > $product_price->quantity * $product['quantity']) {
                    return back()->withErrors(['quantity' => 'les reservations total quantity doit être inférieur ou égal à la quantité du produit']);
                }
            }
        }


        // Aggregate quantities for each product in the order
        foreach ($order_products['products'] as $order_product) {
            $product_id = $order_product['product_id'];
            $product_price = ProductPrice::findOrFail($order_product['product_price_id']);
            $totalQuantity = $product_price->quantity * $order_product['quantity'];
            $productQuantities[$product_id] = ($productQuantities[$product_id] ?? 0) + $totalQuantity;
        }

        // Check available stock for each product
        foreach ($productQuantities as $productId => $quantity) {
            $product = Product::findOrFail($productId); // Retrieve the product
            if ($product->quantity < $quantity) {
                $errors[] = $productId;
            }
        }

        if ($errors) {
            return back()->withErrors($errors);
        }

        try {
            DB::beginTransaction();

            $order = Order::query()->create([
                'user_id' => auth()->user()->id,
                'status' => 'delivered',
                'verified_by' => auth()->user()->id,
                'delivered_by' => auth()->user()->id,
                'confirmed_by' => auth()->user()->id,
            ]);

            // create order products
            foreach ($order_products['products'] as $order_product) {
                $product = Product::query()->where('id', $order_product['product_id'])->first();
                $product_price = ProductPrice::findOrFail($order_product['product_price_id']);
                $quantity = $order_product['quantity'];

                $created_order_product = $order->orderProducts()->create([
                    'product_id' => $product->id,
                    'quantity' => $quantity,
                    'product_price_id' => $product_price->id,
                    'price' => $product_price->price * $quantity,
                ]);

                // deduct stock
                $product->removeStock($created_order_product->totalQuantity());


                // create reservations
                if (isset($order_product['reservations'])) {
                    foreach ($order_product['reservations'] as $reservation) {
                        $reception_id = $reservation['reception_id'];
                        $quantity = $reservation['quantity'];

                        $reservation = Reservation::query()->create([
                            'reception_id' => $reception_id,
                            'order_product_id' => $created_order_product->id,
                            'quantity' => $quantity,
                        ]);

                        $reservation->apply();
                    }
                }

            }


            // calculate total
            $order->total = $order->totalPrice();

            $order->orderProducts->each(function ($orderProduct) {
                $orderProduct->buying_price = $orderProduct->buyingPrice();
                $orderProduct->save();
            });

            $order->profit = $order->profit();
            $order->save();

            DB::commit();
        } catch (Exception $e) {
            DB::rollBack();
            return back()->withErrors(['error' => 'Une erreur est survenue']);
        }


        return to_route('orders')->with('success', 'Commande créée avec succès');


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
            'orderProducts.reservations',
            'shippingAgency',
            'address.shippingFee'

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

        foreach ($order->orderProducts as  $orderProduct ) {
            $orderProduct->buying_price = $orderProduct->buyingPrice();
            $orderProduct->save();
        }


        $order->update([
            'status' => 'confirmed',
            'confirmed_by' => auth()->user()->id,
            'profit' => $order->profit(),
        ]);


        return back();
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


    public function receipt(Order $order): Response
    {


        $order->load(['user', 'verifiedBy', 'confirmedBy', 'deliveredBy', 'orderProducts.product' => function ($query) {
            return $query->select('id', 'name');
        },  'orderProducts.product.activeProductPrices' , 'address' , 'address.shippingFee' , 'shippingAgency' ]);

        // Return the order details view with the order data
        return Inertia::render('Dashboard/Orders/printOrder', ['order' => $order]);

    }

    public function custom_receipt(): Response|RedirectResponse
    {

        $date = request('date') ? date('Y-m-d', strtotime(request('date'))) : null;
        $startDate = request('startDate') ? date('Y-m-d', strtotime(request('startDate'))) : null;
        $endDate = request('endDate') ? date('Y-m-d', strtotime(request('endDate'))) : null;

        if ($date) {
            // Query all orders created on the provided date
            $order = Order::query()
                ->where('status', 'delivered')
                ->whereDate('created_at', $date)
                ->with(['user', 'deliveredBy', 'orderProducts'])
                ->get();
            return Inertia::render('Dashboard/Orders/receipt', ['order' => $order]);

        } else if ($startDate && $endDate) {
            // Query all orders created between startDate and endDate, group them by day
            $datesRange = [];
            $currentDate = Carbon::parse($startDate);

            // Create an array containing each date between startDate and endDate
            while ($currentDate->lte(Carbon::parse($endDate))) {
                $datesRange[] = $currentDate->toDateString();
                $currentDate->addDay();
            }

            // Query to retrieve aggregated data for each date
            $orders = Order::query()
                ->select(
                    DB::raw('DATE(created_at) as order_date'),
                    DB::raw('COUNT(*) as total_orders'),
                    DB::raw('SUM(total) as total_sum'),
                    DB::raw('SUM(profit) as total_profit'),
                    DB::raw('SUM((SELECT COUNT(*) FROM order_products WHERE order_products.order_id = orders.id)) as total_order_products')
                )
                ->whereIn(DB::raw('DATE(created_at)'), $datesRange)
                ->where('status', 'delivered')
                ->groupBy(DB::raw('DATE(created_at)'))
                ->get();

            return Inertia::render('Dashboard/Orders/receipt', ['days' => $orders]);

        } else {
            // If neither date nor startDate and endDate are provided, return an error
            return to_route('orders')->withErrors(['error' => 'Veuillez fournir une date ou une période']);
        }


    }
}
