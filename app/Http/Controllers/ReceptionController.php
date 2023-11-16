<?php

namespace App\Http\Controllers;

use App\Models\Reception;
use App\Http\Requests\StoreReceptionRequest;
use App\Http\Requests\UpdateReceptionRequest;
use Inertia\Inertia;

class ReceptionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Dashboard/Receptions/receptions', [
            'receptions' => Reception::query()
                ->when(request('start') , fn($query) => $query->where('created_at' , '>=' , request('start')))
                ->when(request('end') , fn($query) => $query->where('created_at' , '<=' , request('end')))
                ->with(['user' , 'product' , 'reservations'] )
                ->paginate(10)
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
    public function store(StoreReceptionRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Reception $reception)
    {
        return inertia::render('Dashboard/Receptions/reception', [
            'reception'=>[
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
        //
    }
}
