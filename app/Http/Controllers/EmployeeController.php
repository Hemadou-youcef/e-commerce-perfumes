<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;

class EmployeeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        return Inertia::render('Dashboard/Employees/employees', [
            'employees' => User::query()
                ->where('role', 2)
                ->when(request('q'), function ($query, $q) {
                    $query->where('first_name', 'like', '%' . $q . '%')
                        ->orWhere('last_name', 'like', '%' . $q . '%')
                        ->orWhere('phone', 'like', '%' . $q . '%');
                })
                ->orderBy('created_at', 'desc')
                ->paginate(10)
            ,
            'admins' => User::query()
                ->where('role', 3)
                ->orWhere('role', 4)
                ->orderBy('created_at', 'desc')
                ->get()
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {

        $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email'=> 'required|string|lowercase|email|max:255|unique:' . User::class . ',email',
            'username' => 'required|string|max:255|unique:' . User::class,
            'phone' => 'required|string|max:255|unique:' . User::class,
            'address' => 'required|string|max:255',
            'gender' => 'required|string|max:255|in:male,female',
            'role' => 'required|string|max:255|in:2,3',
            'password' => 'required|string|confirmed|min:8',
        ]);

        User::create([
            'first_name' => $request->first_name,
            'last_name' => $request->last_name,
            'email'=> $request->email,
            'username' => strtolower($request->username),
            'phone' => $request->phone,
            'address' => $request->address,
            'gender' => $request->gender,
            'role' => $request->role,
            'password' => Hash::make($request->password),

        ]);


        return to_route('employees');
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Dashboard/Employees/employeesForm');
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        return Inertia::render('Dashboard/Employees/employee', [
            'employee' => $user->load(['receptions', 'verifiedOrders', 'confirmedOrders', 'cancelledOrders', 'deliveredOrders', 'receptions'])
        ]);

    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $user)
    {
            return Inertia::render('Dashboard/Employees/employeesForm', [
                'employee' => $user
            ]);

    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, User $user)
    {

        $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'username' => [
                'required',
                'string',
                'max:255',
                Rule::unique('users')->ignore($user->id), // Ignore the current user's ID for uniqueness validation
            ],
            'phone' => [
                'nullable',
                'string',
                'max:255',
                Rule::unique('users')->ignore($user->id), // Ignore the current user's ID for uniqueness validation
            ],
            'address' => 'required|string|max:255',
            'gender' => 'required|string|max:255|in:male,female',
            'role' => 'required|string|max:255|in:2,3',
            'password' => 'nullable|string|confirmed|min:8',
        ]);

        // if $user is admin the role of the changer must be 4 not 3
        if ($user->isAdmin() || $request->role == 3) {
            if (!auth()->user()->isSuperAdmin()) {
                abort(403);
            }
        }
        

        $user->update([
            'first_name' => $request->first_name,
            'last_name' => $request->last_name,
            'username' => strtolower($request->username),
            'phone' => $request->phone,
            'address' => $request->address,
            'gender' => $request->gender,
            'role' => $request->role,
            'password' => $request->filled('password') ? Hash::make($request->password) : $user->password,
        ]);

        return to_route('employee', $user);

    }

    /**
     * Remove the specified resource from storage.
     */
//    public function destroy(User $user)
//    {
//
//        $user->delete();
//
//        return to_route('employees');
//    }
}
