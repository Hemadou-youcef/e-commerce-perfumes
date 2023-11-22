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

//Route::get('/products', function () {
//    return Inertia::render('products');
//})->name('products');
//
//Route::get('/product/{id}', function () {
//    return Inertia::render('product');
//})->name('product');

Route::get('/admin', function () {
    return Inertia::render('Dashboard/dashboard');
})->name('dashboard');

//Route::get('/admin/orders', function () {
//    return Inertia::render('Dashboard/Orders/orders');
//})->name('orders');
//
//Route::get('/admin/orders/{id}', function () {
//    return Inertia::render('Dashboard/Orders/order');
//})->name('order');
//


// Route::get('/admin/clients', function () {
//     return Inertia::render('Dashboard/Clients/clients');
// })->name('clients')->middleware('admin');

// Route::get('/admin/clients/{id}', function () {
//     return Inertia::render('Dashboard/Clients/client');
// })->name('clients');

//Route::get('/login', function () {
//    return Inertia::render('auth/login');
//})->name('login');
//
//Route::get('/register', function () {
//    return Inertia::render('auth/register');
//})->name('register');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::get('/admin/products' , [App\Http\Controllers\ProductController::class, 'index']);
Route::get('/admin/products/{product}' , [App\Http\Controllers\ProductController::class, 'show']);
Route::get('/admin/products/{product}/edit' , [App\Http\Controllers\ProductController::class, 'edit']);


Route::get('/admin/receptions' , [App\Http\Controllers\ReceptionController::class, 'index'])->name('receptions');
Route::get('/admin/receptions/create', [App\Http\Controllers\ReceptionController::class, 'create'])->name('reception.create');
Route::post('/admin/receptions/create', [App\Http\Controllers\ReceptionController::class, 'store'])->name('reception.store');
Route::get('/admin/receptions/{reception}' , [App\Http\Controllers\ReceptionController::class, 'show'])->name('reception');


Route::get('/admin/clients' , [App\Http\Controllers\ClientController::class, 'index'])->name('clients');
Route::get('/admin/clients/{user}' , [App\Http\Controllers\ClientController::class, 'show'])->name('client');
Route::delete('/admin/clients/{user}' , [App\Http\Controllers\ClientController::class, 'destroy']);
Route::post('/admin/clients/{user}/confirm_account' , [App\Http\Controllers\ClientController::class, 'confirm'])->name('confirm_account');


// Employees routes
Route::get('/admin/employees' , [App\Http\Controllers\EmployeeController::class, 'index'])->name('employees');
Route::get('/admin/employees/create', [App\Http\Controllers\EmployeeController::class, 'create'])->name('employee.create');
Route::get('/admin/employees/{user}' , [App\Http\Controllers\EmployeeController::class, 'show'])->name('employee');
Route::patch('/admin/employees/{user}' , [App\Http\Controllers\EmployeeController::class, 'update'])->name('employee.update');
Route::post('/admin/employees', [App\Http\Controllers\EmployeeController::class, 'create'])->name('employee.create');
Route::delete('/admin/employees/{user}' , [App\Http\Controllers\EmployeeController::class, 'destroy']);

// products routes
Route::get('/admin/products' , [App\Http\Controllers\ProductController::class, 'index'])->name('products');
Route::get('/admin/products/create', [App\Http\Controllers\ProductController::class, 'create'])->name('product.create');
Route::post('/admin/products/create', [App\Http\Controllers\ProductController::class, 'store'])->name('product.store');
Route::get('/admin/products/{product}' , [App\Http\Controllers\ProductController::class, 'show'])->name('product');
Route::get('/admin/products/{product}/edit' , [App\Http\Controllers\ProductController::class, 'edit'])->name('product.edit');
Route::patch('/admin/products/{product}/edit' , [App\Http\Controllers\ProductController::class, 'update'])->name('product.update');
Route::delete('/admin/products/{product}' , [App\Http\Controllers\ProductController::class, 'destroy'])->name('product.destroy');


// orders routes
Route::get('/admin/orders' , [App\Http\Controllers\OrderController::class, 'index'])->name('orders');
Route::get('/admin/orders/{order}' , [App\Http\Controllers\OrderController::class, 'show'])->name('order');
Route::delete('/admin/orders/{order}' , [App\Http\Controllers\OrderController::class, 'destroy']);
Route::post('/admin/orders/{order}/confirm' , [App\Http\Controllers\OrderController::class, 'confirm'])->name('confirm_order');
Route::post('/admin/orders/{order}/cancel' , [App\Http\Controllers\OrderController::class, 'cancel'])->name('cancel_order');
Route::post('/admin/orders/{order}/deliver' , [App\Http\Controllers\OrderController::class, 'deliver'])->name('deliver_order');


// client products routes
Route::get('/products' , [App\Http\Controllers\ClientProductController::class, 'index'])->name('client_products');
Route::get('/products/{product}' , [App\Http\Controllers\ClientProductController::class, 'show'])->name('client_product');
// client cart items routes
Route::get('/cart' , [App\Http\Controllers\CartItemController::class, 'index'])->name('cart');
Route::post('/cart' , [App\Http\Controllers\CartItemController::class, 'store'])->name('cart_item.store');
Route::delete('/cart/{cartItem}' , [App\Http\Controllers\CartItemController::class, 'destroy']);
Route::post('/cart/checkout' , [App\Http\Controllers\CartItemController::class, 'checkout'])->name('cart.checkout');


// client orders routes
Route::get('/orders' , [App\Http\Controllers\ClientOrderController::class, 'index'])->name('client_orders');
Route::get('/orders/{order}' , [App\Http\Controllers\ClientOrderController::class, 'show'])->name('client_order');
Route::post('/orders/{order}/cancel' , [App\Http\Controllers\OrderController::class, 'cancel'])->name('client_cancel_order');


// bookmarks routes
Route::get('/bookmarks' , [App\Http\Controllers\BookmarkController::class, 'index'])->name('bookmarks');
Route::post('/bookmarks' , [App\Http\Controllers\BookmarkController::class, 'store'])->name('bookmark.store');
Route::delete('/bookmarks/{bookmark}' , [App\Http\Controllers\BookmarkController::class, 'destroy']);





Route::post('/serialisation',   function (Request $request)
{
    $data = json_decode ( urldecode( $request->data ) );
//    var_dump($data);
    foreach ($data as $datum) {
        var_dump($datum->name);
    }
    return response()->json([
        'data' => $data,
    ]);
});
// STOCK PAGES
// "/admin/receptions" => "StockController@index",
// "/admin/receptions/{id}" => "StockController@show",

// NEED IN RECEPTION LIST
// RECEPTION INFORMATION
// USER INFORAMATION LIKE FIRST NAME AND LAST NAME
//////////////////////////////
// NEED IN RECEPTION PAGE
// RECEPTION INFORMATION
// USER INFORMATION FIRST NAME & LAST NAME & ID
// RESERVATION INFORMATION





require __DIR__.'/auth.php';
