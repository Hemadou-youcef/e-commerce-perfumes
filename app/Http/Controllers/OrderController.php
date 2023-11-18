<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Http\Requests\StoreOrderRequest;
use App\Http\Requests\UpdateOrderRequest;
use App\Models\Reception;
use App\Models\Reservation;
use Inertia\Inertia;

class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('testPages/test', [
            'orders' => Order::query()
                ->when(request('q'), function ($query, $q) {
                    $query->whereHas('user', function ($userQuery) use ($q) {
                        $userQuery->where('first_name', 'like', '%' . $q . '%')
                            ->orWhere('last_name', 'like', '%' . $q . '%')
                            ->orWhere('phone', 'like', '%' . $q . '%');
                    });
                })
                ->when(request('start') , fn($query) => $query->where('created_at' , '>=' , request('start')))
                ->when(request('end') , fn($query) => $query->where('created_at' , '<=' , request('end')))
                ->orderBy('created_at' , 'desc')
                ->with(['user'] )
                ->withCount('orderProducts')
                ->paginate(10)
                ->withQueryString()
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
        return Inertia::render('testPages/test', [
            'order' => $order->load(['user','confirmedBy' , 'deliveredBy' , 'orderProducts.product.receptions'=> function ($query) {
                $query->where('rest', '>', 0);
            } , 'orderProducts.reservations'])
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
        // delete order
        $order->delete();

        return to_route('orders');

    }

    public function verify(Order $order)
    {
        $errors = [];
        foreach ($order->orderProducts as $orderProduct) {
            if ($orderProduct->product->quantity < $orderProduct->quantity) {
                $errors[] = $orderProduct->product->name . ' a seulement ' . $orderProduct->product->quantity . ' dans le stock';
            }
        }
        if (count($errors) > 0) {
            return back()->withErrors($errors);
        }
        foreach ($order->orderProducts as $orderProduct) {
            $orderProduct->product->removeStock($orderProduct->quantity);
        }


        $order->update([
            'status' => 'verified',
            'verified_by' => auth()->user()->id
        ]);

    }

    public function confirm(Order $order)
    {
        try {
            $data = request('data');
            $reservations = json_decode ( urldecode( $data ) );
        }catch (\Exception $e){
            return back()->withErrors(['data' => 'Veuillez envoyer les données de dans le format json']);
        }



        foreach ($reservations as $reservation) {

            $reception_id = $reservation->reception_id;
            $order_product_id = $reservation->order_product_id;
            $quantity = $reservation->quantity;


            if (Reception::where('id', $reception_id)->doesntExist()) {
                return back()->withErrors(['reception_id' => 'reception_id n\'existe pas']);
            }
            if ($quantity > Reception::where('id' , $reception_id)->first()->rest  ) {
                return back()->withErrors(['quantity' => 'quantity doit être inférieur ou égal à la quantité restante dans la réception']);
            }
            if ($order->orderProducts()->where('id', $order_product_id)->doesntExist()) {
                return back()->withErrors(['order_product_id' => 'order_product_id n\'existe pas']);
            }
            if ($quantity > $order->orderProducts()->where('id', $order_product_id)->first()->quantity) {
                return back()->withErrors(['quantity' => 'quantity doit être inférieur ou égal à la quantité de la commande']);
            }


            $reservation = Reservation::create([
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

    public function deliver(Order $order)
    {
        $order->update([
            'status' => 'delivered',
            'delivered_by' => auth()->user()->id
        ]);

        return back();
    }

    public function cancel(Order $order)
    {
        // return stock to products
        $order->orderProducts->each(function ($orderProduct) {
            $orderProduct->product->addStock($orderProduct->quantity);
        });

        // delete reservations
        $order->reservations()->each(function ($reservation) {
            $reservation->revert();
            $reservation->delete();
        });


        $order->update([
            'status' => 'cancelled',
            'confirmed_by' => auth()->user()->id
        ]);

        return back();
    }
}
