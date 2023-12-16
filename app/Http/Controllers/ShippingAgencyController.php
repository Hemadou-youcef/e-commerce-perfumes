<?php

namespace App\Http\Controllers;

use App\Models\ShippingAgency;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ShippingAgencyController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Dashboard/ShippingAgency/agences', [
            'shippingAgencies' => ShippingAgency::query()
                ->when(request('search'), fn($query, $search) => $query
                    ->where('name', 'LIKE', '%' . $search . '%')
                    ->orWhere('name_ar', 'LIKE', '%' . $search . '%')
                )
                ->paginate(10)
                ->through(fn($shippingAgency) => [
                    'id' => $shippingAgency->id,
                    'name' => $shippingAgency->name,
                    'name_ar' => $shippingAgency->name_ar,
                ])
                ->withQueryString(),
            'filters' => [
                'search' => request('search', ''),
            ],
        ]);

    }

    public function create(): Response
    {
        return Inertia::render('Dashboard/ShippingAgency/agenceForm');
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
        return Inertia::render('Dashboard/ShippingAgency/agency', [
            'shippingAgency' => $shippingAgency->load('shippingFees'),
        ]);
    }

    public function update(ShippingAgency $shippingAgency, Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => 'required|string',
            'name_ar' => 'required|string',
            'active' => 'required|boolean',
        ]);

        $shippingAgency->update($validated);

        return back();
    }



}
