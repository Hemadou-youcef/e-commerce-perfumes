<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Http\Requests\StoreReceptionRequest;
use App\Http\Requests\UpdateReceptionRequest;
use App\Models\Reception;
use Inertia\Inertia;

class ReceptionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $receptions = Reception::query()
            ->when(request('q'), function ($query, $q) {

                $query->whereHas('product', function ($userQuery) use ($q) {
                    $userQuery->where('name', 'like', '%' . $q . '%');
                })->orWhereHas('user', function ($userQuery) use ($q) {
                    $userQuery->where('first_name', 'like', '%' . $q . '%')
                        ->orWhere('last_name', 'like', '%' . $q . '%')
                        ->orWhere('phone', 'like', '%' . $q . '%');
                })->orWhere('name', 'like', '%' . $q . '%');
            })
            ->when(request('start'), fn($query) => $query->where('created_at', '>=', request('start')))
            ->when(request('end'), fn($query) => $query->where('created_at', '<=', request('end')))
            ->when('orderBy', fn($query) => $query->orderBy(request('orderBy'), request('order') ?? 'desc'))
            ->orderBy('created_at', 'desc')
            ->with(['user', 'product', 'reservations'])
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('Dashboard/Receptions/receptions', [
            'receptions' => $receptions,
            "filters" => [
                "q" => request('q', ''),
                "start" => request('start', ''),
                "end" => request('end', ''),
            ]
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreReceptionRequest $request)
    {
        $reception = $request->validated();
        $reception['user_id'] = auth()->user()->id;
        $reception['rest'] = $reception['quantity'];
        $createdReception = Reception::create($reception);
        $createdReception->product->addStock($reception['quantity']);

        return redirect()->route('receptions');

    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
//        return Inertia::render('Dashboard/Receptions/receptionForm', [
//            'products' => \App\Models\Product::query()->orderBy('quantity' , 'asc')->get(),
//        ]);

        return Inertia::render('Dashboard/Receptions/receptionForm', [
            'products' => Product::query()
                ->when(request('q'), function ($query, $q) {
                    $query->where('name', 'like', '%' . $q . '%');
                })
                ->orderBy('quantity', 'asc')->get(),
        ]);

    }

    /**
     * Display the specified resource.
     */
    public function show(Reception $reception)
    {
        return inertia::render('Dashboard/Receptions/reception', [
            'reception' => [
                'id' => $reception->id,
                'name' => $reception->name,
                'price' => $reception->price,
                'product' => $reception->product,
                'quantity' => $reception->quantity,
                'rest' => $reception->rest,
                'user' => $reception->user,
                'reservations' => $reception->reservations,
                'created_at' => $reception->created_at,
            ]
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Reception $reception)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateReceptionRequest $request, Reception $reception)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Reception $reception)
    {
        $reception->product->removeStock($reception->rest);
        $reception->delete();
        return redirect()->route('receptions');
    }
}
