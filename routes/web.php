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

Route::get('/products', function () {
    return Inertia::render('products');
})->name('products');

Route::get('/product/{id}', function () {
    return Inertia::render('product');
})->name('product');

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


// orders routes
Route::get('/admin/orders' , [App\Http\Controllers\OrderController::class, 'index'])->name('orders');
Route::get('/admin/orders/{order}' , [App\Http\Controllers\OrderController::class, 'show'])->name('order');
Route::delete('/admin/orders/{order}' , [App\Http\Controllers\OrderController::class, 'destroy']);
Route::post('/admin/orders/{order}/confirm' , [App\Http\Controllers\OrderController::class, 'confirm'])->name('confirm_order');
Route::post('/admin/orders/{order}/cancel' , [App\Http\Controllers\OrderController::class, 'cancel'])->name('cancel_order');
Route::post('/admin/orders/{order}/deliver' , [App\Http\Controllers\OrderController::class, 'deliver'])->name('deliver_order');


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
