<?php

namespace App\Http\Controllers;

use App\Models\ShippingAgency;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ShippingAgencyController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('AdminSide/ShippingAgency/index', [
            'shippingAgencies' => ShippingAgency::all(),
        ]);

    }

    public function create(): Response
    {
        return Inertia::render('AdminSide/ShippingAgency/create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string',
            'name_ar' => 'required|string',
        ]);

        $agency =  ShippingAgency::create($validated);
        $agency->fillDefaultWilayas();



        return redirect()->route('shipping-agencies.index');
    }


    public function show(ShippingAgency $shippingAgency): Response
    {
        return Inertia::render('AdminSide/ShippingAgency/show', [
            'shippingAgency' => $shippingAgency->load('shippingFees'),
        ]);
    }


}
