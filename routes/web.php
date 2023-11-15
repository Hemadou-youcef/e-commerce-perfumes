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
    return Inertia::render('Dashboard/dashboard');
})->name('dashboard');

Route::get('/admin/orders', function () {
    return Inertia::render('Dashboard/Orders/orders');
})->name('orders');

Route::get('/admin/orders/{id}', function () {
    return Inertia::render('Dashboard/Orders/order');
})->name('order');



Route::get('/admin/clients', function () {
    return Inertia::render('Dashboard/Clients/clients');
})->name('clients')->middleware('admin');

Route::get('/admin/clients/{id}', function () {
    return Inertia::render('Dashboard/Clients/client');
})->name('clients');

Route::get('/login', function () {
    return Inertia::render('auth/login');
})->name('login');

Route::get('/register', function () {
    return Inertia::render('auth/register');
})->name('register');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::get('test/products' , [App\Http\Controllers\ProductController::class, 'index']);
Route::get('test/products/{product}' , [App\Http\Controllers\ProductController::class, 'show']);
Route::get('test/products/{product}/edit' , [App\Http\Controllers\ProductController::class, 'edit']);



require __DIR__.'/auth.php';
