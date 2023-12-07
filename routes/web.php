<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Http\Request;
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

Route::get('/dashboard', [App\Http\Controllers\DashboardController::class, 'index'])->name('dashboard');

Route::get('/dashboard/receptions' , [App\Http\Controllers\ReceptionController::class, 'index'])->name('receptions');
Route::get('/dashboard/receptions/create', [App\Http\Controllers\ReceptionController::class, 'create'])->name('reception.create');
Route::post('/dashboard/receptions/create', [App\Http\Controllers\ReceptionController::class, 'store'])->name('reception.store');
Route::get('/dashboard/receptions/{reception}' , [App\Http\Controllers\ReceptionController::class, 'show'])->name('reception');
Route::get('/dashboard/receptions/{reception}/edit' , [App\Http\Controllers\ReceptionController::class, 'edit'])->name('reception.edit');
Route::put('/dashboard/receptions/{reception}' , [App\Http\Controllers\ReceptionController::class, 'update'])->name('reception.update');
Route::delete('/dashboard/receptions/{reception}' , [App\Http\Controllers\ReceptionController::class, 'destroy'])->name('reception.destroy');

Route::get('/dashboard/clients' , [App\Http\Controllers\ClientController::class, 'index'])->name('clients');
Route::get('/dashboard/clients/{user}' , [App\Http\Controllers\ClientController::class, 'show'])->name('client');
Route::delete('/dashboard/clients/{user}' , [App\Http\Controllers\ClientController::class, 'destroy'])->name('client.destroy');
Route::post('/dashboard/clients/{user}/confirm_account' , [App\Http\Controllers\ClientController::class, 'confirm'])->name('confirm_account');


// Employees routes
Route::get('/dashboard/employees' , [App\Http\Controllers\EmployeeController::class, 'index'])->name('employees');
Route::get('/dashboard/employees/create', [App\Http\Controllers\EmployeeController::class, 'create'])->name('employee.create');
Route::post('/dashboard/employees/create', [App\Http\Controllers\EmployeeController::class, 'store'])->name('employee.store');
Route::get('/dashboard/employees/{user}' , [App\Http\Controllers\EmployeeController::class, 'show'])->name('employee');
Route::get('/dashboard/employees/{user}/edit' , [App\Http\Controllers\EmployeeController::class, 'edit'])->name('employee.edit');
Route::patch('/dashboard/employees/{user}' , [App\Http\Controllers\EmployeeController::class, 'update'])->name('employee.update');
Route::post('/dashboard/employees', [App\Http\Controllers\EmployeeController::class, 'create'])->name('employee.create');
Route::delete('/dashboard/employees/{user}' , [App\Http\Controllers\EmployeeController::class, 'destroy'])->name('employee.destroy');

// products routes
Route::get('/dashboard/products' , [App\Http\Controllers\ProductController::class, 'index'])->name('products');
Route::get('/dashboard/products/create', [App\Http\Controllers\ProductController::class, 'create'])->name('product.create');
Route::post('/dashboard/products/create', [App\Http\Controllers\ProductController::class, 'store'])->name('product.store');
Route::get('/dashboard/products/{product}' , [App\Http\Controllers\ProductController::class, 'show'])->name('product');
Route::get('/dashboard/products/{product}/edit' , [App\Http\Controllers\ProductController::class, 'edit'])->name('product.edit');
Route::post('/dashboard/products/{product}/edit' , [App\Http\Controllers\ProductController::class, 'update'])->name('product.update');
Route::delete('/dashboard/products/{product}' , [App\Http\Controllers\ProductController::class, 'destroy'])->name('product.destroy');
Route::patch('/dashboard/products/{product}/update_status' , [App\Http\Controllers\ProductController::class, 'updateStatus'])->name('product.update_status');


// orders routes
Route::get('/dashboard/orders' , [App\Http\Controllers\OrderController::class, 'index'])->name('orders');
Route::get('/dashboard/orders/create' , [App\Http\Controllers\OrderController::class, 'create'])->name('order.create');
Route::post('/dashboard/orders/create' , [App\Http\Controllers\OrderController::class, 'store'])->name('order.store');
Route::get('/dashboard/orders/{order}' , [App\Http\Controllers\OrderController::class, 'show'])->name('order');
Route::delete('/dashboard/orders/{order}' , [App\Http\Controllers\OrderController::class, 'destroy']);
Route::post('/dashboard/orders/{order}/verify' , [App\Http\Controllers\OrderController::class, 'verify'])->name('verify_order');
Route::post('/dashboard/orders/{order}/confirm' , [App\Http\Controllers\OrderController::class, 'confirm'])->name('confirm_order');
Route::post('/dashboard/orders/{order}/cancel' , [App\Http\Controllers\OrderController::class, 'cancel'])->name('cancel_order');
Route::post('/dashboard/orders/{order}/deliver' , [App\Http\Controllers\OrderController::class, 'deliver'])->name('deliver_order');


// client products routes
Route::get('/products' , [App\Http\Controllers\ClientProductController::class, 'index'])->name('client_products');
Route::get('/products/{product}' , [App\Http\Controllers\ClientProductController::class, 'show'])->name('client_product');
// client cart items routes
Route::get('/cart' , [App\Http\Controllers\CartItemController::class, 'index'])->name('cart');
Route::post('/cart' , [App\Http\Controllers\CartItemController::class, 'store'])->name('cart_item.store');
Route::delete('/cart/{cartItem}' , [App\Http\Controllers\CartItemController::class, 'destroy'])->name('cart_item.destroy');
Route::post('/cart/checkout' , [App\Http\Controllers\CartItemController::class, 'checkout'])->name('cart.checkout');


// client orders routes
Route::get('/orders' , [App\Http\Controllers\ClientOrderController::class, 'index'])->name('client_orders');
Route::get('/orders/{order}' , [App\Http\Controllers\ClientOrderController::class, 'show'])->name('client_order');
Route::post('/orders/{order}/cancel' , [App\Http\Controllers\OrderController::class, 'cancel'])->name('client_cancel_order');


// bookmarks routes
Route::get('/bookmarks' , [App\Http\Controllers\BookmarkController::class, 'index'])->name('bookmarks');
Route::post('/bookmarks' , [App\Http\Controllers\BookmarkController::class, 'store'])->name('bookmark.store');
Route::delete('/bookmarks/{bookmark}' , [App\Http\Controllers\BookmarkController::class, 'destroy'])->name('bookmark.destroy');


// categories routes
Route::get('/dashboard/categories' , [App\Http\Controllers\CategoryController::class, 'index'])->name('categories');
Route::get('/dashboard/categories/create', [App\Http\Controllers\CategoryController::class, 'create'])->name('category.create');
Route::post('/dashboard/categories', [App\Http\Controllers\CategoryController::class, 'store'])->name('category.store');
Route::get('/dashboard/categories/{category}' , [App\Http\Controllers\CategoryController::class, 'show'])->name('category');
Route::get('/dashboard/categories/{category}/edit' , [App\Http\Controllers\CategoryController::class, 'edit'])->name('category.edit');
Route::patch('/dashboard/categories/{category}/edit' , [App\Http\Controllers\CategoryController::class, 'update'])->name('category.update');
Route::delete('/dashboard/categories/{category}' , [App\Http\Controllers\CategoryController::class, 'destroy'])->name('category.destroy');


// profile routes
Route::get('/profile' , [App\Http\Controllers\ProfileController::class, 'edit'])->name('profile');
Route::patch('/profile' , [App\Http\Controllers\ProfileController::class, 'update'])->name('profile.update');
Route::get('/dashboard/profile' , [App\Http\Controllers\ProfileController::class, 'edit'])->name('dashboard_profile');
Route::patch('/dashboard/profile' , [App\Http\Controllers\ProfileController::class, 'update'])->name('dashboard_profile.update');


require __DIR__.'/auth.php';
