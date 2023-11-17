<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use Inertia\Inertia;

class ClientController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $role = request('role');
        $q = request('q');

        return Inertia::render('testPages/products', [
            'clients' => User::query()
                ->when(!$role, fn($query ,$role) => $query->where('role', 'client')->orWhere('role', 'guest'))
                ->when($role, function($query, $role) {

                    // check if role either client or guest
                    if ($role === 'client' || $role === 'guest') {
                        return $query->where('role', $role);
                    }else{
                        return $query->where('role', 'client')->orWhere('role', 'guest');
                    }
                })
                ->when(request('start'), fn($query) => $query->where('created_at', '>=', request('start')))
                ->when(request('end'), fn($query) => $query->where('created_at', '<=', request('end')))
                ->when(
                    $q,
                    fn($query , $q) => $query->where('first_name', 'like', '%' . $q . '%')
                                        ->orWhere('last_name', 'like', '%' . $q . '%')
                                        ->orWhere('phone', 'like', '%' . $q . '%')
                                        ->orWhere('username', 'like', '%' . $q . '%')
                )
                ->orderBy('created_at', 'desc')
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
    public function store(StoreUserRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        if ($user->isClient() || $user->isGuest()) {
            return Inertia::render('testPages/products', [
                'client' => array_merge(
                    $user->toArray(), // Convert User model properties to an array
                    [
                        'orders' => $user->orders,
                        'bookmarks' => $user->bookmarks,
                    ]
                ),
            ]);
        }else{
            return back();
        }
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $user)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateUserRequest $request, User $user)
    {
        //
    }

    public function confirm(User $user)
    {
        if ($user->isGuest()) {
            $user->update([
                'role' => 'client',
            ]);
        }
        return back();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        if ($user->isGuest() || $user->isClient()) {
            $user->delete();
        }
        return back();
    }
}
