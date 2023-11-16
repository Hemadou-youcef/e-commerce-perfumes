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
        return Inertia::render('testPages/products', [
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
        $reception = $request->validated();
        $reception['rest'] = $reception['quantity'];
        $createdReception = Reception::create($reception);
        $createdReception->addStock($reception['quantity']);

        return redirect()->back();

    }

    /**
     * Display the specified resource.
     */
    public function show(Reception $reception)
    {
        //
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
