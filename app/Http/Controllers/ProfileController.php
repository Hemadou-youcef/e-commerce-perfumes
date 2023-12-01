<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller
{

    /**
     * Display the user's profile form.
     */
    public function edit(Request $request): Response
    {
        return Inertia::render('ClientSide/Profile/Edit');
    }

    /**
     * Update the user's profile information.
     */
    public function update(ProfileUpdateRequest $request): RedirectResponse
    {
        $user = $request->validated();

        auth()->user()->update($user);

        return Redirect::route('profile');


    }

    /**
     * Delete the user's account.
     */
//    public function destroy(Request $request): RedirectResponse
//    {
//        $request->validate([
//            'password' => ['required', 'current_password'],
//        ]);
//
//        $user = $request->user();
//
//        Auth::logout();
//
//        $user->delete();
//
//        $request->session()->invalidate();
//        $request->session()->regenerateToken();
//
//        return Redirect::to('/');
//    }

}
