<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('home', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'hihihi' => 'hihihi'
    ]);
});

Route::get('/products', function () {
    return Inertia::render('products');
})->name('products');

Route::get('/product/{id}', function () {
    return Inertia::render('product');
})->name('product');

Route::get('/admin', function () {
    return Inertia::render('dashboard');
})->name('dashboard');

Route::get('/admin/orders', function () {
    return Inertia::render('orders');
})->name('orders');

Route::get('/admin/orders/{id}', function () {
    return Inertia::render('order');
})->name('order');

Route::get('/login', function () {
    return Inertia::render('auth/login');
})->name('login');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
