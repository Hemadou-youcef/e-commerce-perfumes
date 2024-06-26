<?php

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





// guest middleware routes



Route::get('/', [App\Http\Controllers\HomeController::class, 'index'])->name('home');
// client products routes
Route::get('/products', [App\Http\Controllers\ClientProductController::class, 'index'])->name('client_products');
Route::get('/products/perfumes' , [App\Http\Controllers\ClientProductController::class, 'perfumes'])->name('client_perfumes');
Route::get('/products/accessories' , [App\Http\Controllers\ClientProductController::class, 'accessories'])->name('client_accessories');
Route::get('/products/aromatic_oils' , [App\Http\Controllers\ClientProductController::class, 'oils'])->name('client_sets');
Route::get('/products/{product}', [App\Http\Controllers\ClientProductController::class, 'show'])->name('client_product');
// client contact routes
Route::get('/contact', [App\Http\Controllers\ContactController::class, 'index'])->name('contact');
Route::post('/contact', [App\Http\Controllers\ContactController::class, 'store'])->name('contact.store');
// client about routes
Route::get('/about', function () {
    return Inertia::render('ClientSide/AboutUs/aboutUs',[
        "meta_data"=>[
            "title"=>"À propos | RUMAH PERFUM",
            'url'=>'https://www.rumah-parfum.com/about'
        ]
    ]);
})->name('about');




Route::middleware('auth')->group(function () {

    Route::middleware('admin')->group(function () {


        // dashboard route
        Route::get('/dashboard', [App\Http\Controllers\DashboardController::class, 'index'])->name('dashboard');


        // clients routes
        Route::get('/dashboard/clients', [App\Http\Controllers\ClientController::class, 'index'])->name('clients');
        Route::get('/dashboard/clients/{user}', [App\Http\Controllers\ClientController::class, 'show'])->name('client');
        Route::delete('/dashboard/clients/{user}', [App\Http\Controllers\ClientController::class, 'destroy'])->name('client.destroy');
        Route::post('/dashboard/clients/{user}/confirm_account', [App\Http\Controllers\ClientController::class, 'confirm'])->name('confirm_account');


        // Employees routes
        Route::get('/dashboard/employees', [App\Http\Controllers\EmployeeController::class, 'index'])->name('employees');
        Route::get('/dashboard/employees/create', [App\Http\Controllers\EmployeeController::class, 'create'])->name('employee.create');
        Route::post('/dashboard/employees/create', [App\Http\Controllers\EmployeeController::class, 'store'])->name('employee.store');
        Route::get('/dashboard/employees/{user}', [App\Http\Controllers\EmployeeController::class, 'show'])->name('employee');
        Route::get('/dashboard/employees/{user}/edit', [App\Http\Controllers\EmployeeController::class, 'edit'])->name('employee.edit');
        Route::patch('/dashboard/employees/{user}', [App\Http\Controllers\EmployeeController::class, 'update'])->name('employee.update');
        Route::post('/dashboard/employees', [App\Http\Controllers\EmployeeController::class, 'create'])->name('employee.create');
        Route::delete('/dashboard/employees/{user}', [App\Http\Controllers\EmployeeController::class, 'destroy'])->name('employee.destroy');

        // products routes
        Route::get('/dashboard/products', [App\Http\Controllers\ProductController::class, 'index'])->name('products');
        Route::get('/dashboard/products/create', [App\Http\Controllers\ProductController::class, 'create'])->name('product.create');
        Route::post('/dashboard/products/create', [App\Http\Controllers\ProductController::class, 'store'])->name('product.store');
        Route::get('/dashboard/products/{product}', [App\Http\Controllers\ProductController::class, 'show'])->name('product');
        Route::get('/dashboard/products/{product}/edit', [App\Http\Controllers\ProductController::class, 'edit'])->name('product.edit');
        Route::post('/dashboard/products/{product}/edit', [App\Http\Controllers\ProductController::class, 'update'])->name('product.update');
        Route::delete('/dashboard/products/{product}', [App\Http\Controllers\ProductController::class, 'destroy'])->name('product.destroy');
        Route::patch('/dashboard/products/{product}/update_status', [App\Http\Controllers\ProductController::class, 'updateStatus'])->name('product.update_status');

        // receptions routes
        Route::get('/dashboard/receptions', [App\Http\Controllers\ReceptionController::class, 'index'])->name('receptions');
        Route::get('/dashboard/receptions/create', [App\Http\Controllers\ReceptionController::class, 'create'])->name('reception.create');
        Route::post('/dashboard/receptions/create', [App\Http\Controllers\ReceptionController::class, 'store'])->name('reception.store');
        Route::get('/dashboard/receptions/{reception}', [App\Http\Controllers\ReceptionController::class, 'show'])->name('reception');
        Route::get('/dashboard/receptions/{reception}/edit', [App\Http\Controllers\ReceptionController::class, 'edit'])->name('reception.edit');
        Route::put('/dashboard/receptions/{reception}', [App\Http\Controllers\ReceptionController::class, 'update'])->name('reception.update');
        Route::put('/dashboard/receptions/{reception}/add_stock', [App\Http\Controllers\ReceptionController::class, 'addQuantity'])->name('reception.add_stock');
        Route::put('/dashboard/receptions/{reception}/remove_stock', [App\Http\Controllers\ReceptionController::class, 'removeQuantity'])->name('reception.remove_stock');
        Route::delete('/dashboard/receptions/{reception}', [App\Http\Controllers\ReceptionController::class, 'destroy'])->name('reception.destroy');


        // categories routes
        Route::get('/dashboard/categories', [App\Http\Controllers\CategoryController::class, 'index'])->name('categories');
        Route::get('/dashboard/categories/create', [App\Http\Controllers\CategoryController::class, 'create'])->name('category.create');
        Route::post('/dashboard/categories', [App\Http\Controllers\CategoryController::class, 'store'])->name('category.store');
        Route::get('/dashboard/categories/{category}', [App\Http\Controllers\CategoryController::class, 'show'])->name('category');
        Route::get('/dashboard/categories/{category}/edit', [App\Http\Controllers\CategoryController::class, 'edit'])->name('category.edit');
        Route::patch('/dashboard/categories/{category}/edit', [App\Http\Controllers\CategoryController::class, 'update'])->name('category.update');
        Route::delete('/dashboard/categories/{category}', [App\Http\Controllers\CategoryController::class, 'destroy'])->name('category.destroy');


        // profile routes
        Route::get('/profile', [App\Http\Controllers\ProfileController::class, 'edit'])->name('profile');
        Route::patch('/profile', [App\Http\Controllers\ProfileController::class, 'update'])->name('profile.update');
        Route::get('/dashboard/profile', [App\Http\Controllers\ProfileController::class, 'dashboard_edit'])->name('dashboard_profile');
        Route::patch('/dashboard/profile', [App\Http\Controllers\ProfileController::class, 'update'])->name('dashboard_profile.update');


        // dashboard contact routes
        Route::get('/dashboard/contacts', [App\Http\Controllers\ContactController::class, 'dashboard_index'])->name('contacts');
        Route::get('/dashboard/contacts/{contact}', [App\Http\Controllers\ContactController::class, 'show']);
        Route::delete('/dashboard/contacts/{contact}', [App\Http\Controllers\ContactController::class, 'destroy'])->name('contact.destroy');


        // orders routes
        Route::get('/dashboard/orders', [App\Http\Controllers\OrderController::class, 'index'])->name('orders');
        Route::get('/dashboard/orders/receipt', [App\Http\Controllers\OrderController::class, 'custom_receipt'])->name('print_orders');
        Route::get('/dashboard/orders/receipt/{order}', [App\Http\Controllers\OrderController::class, 'receipt'])->name('print_order');
        Route::get('/dashboard/orders/create', [App\Http\Controllers\OrderController::class, 'create'])->name('order.create');
        Route::post('/dashboard/orders/create', [App\Http\Controllers\OrderController::class, 'store'])->name('order.store');
        Route::get('/dashboard/orders/{order}', [App\Http\Controllers\OrderController::class, 'show'])->name('order');
        Route::delete('/dashboard/orders/{order}', [App\Http\Controllers\OrderController::class, 'destroy']);
        Route::post('/dashboard/orders/{order}/verify', [App\Http\Controllers\OrderController::class, 'verify'])->name('verify_order');
        Route::post('/dashboard/orders/{order}/confirm', [App\Http\Controllers\OrderController::class, 'confirm'])->name('confirm_order');
        Route::post('/dashboard/orders/{order}/cancel', [App\Http\Controllers\OrderController::class, 'cancel'])->name('cancel_order');
        Route::post('/dashboard/orders/{order}/deliver', [App\Http\Controllers\OrderController::class, 'deliver'])->name('deliver_order');

        // shipping agencies routes
        Route::get('/dashboard/shipping_agencies', [App\Http\Controllers\ShippingAgencyController::class, 'index'])->name('shipping-agencies.index');
        Route::get('/dashboard/shipping_agencies/create', [App\Http\Controllers\ShippingAgencyController::class, 'create'])->name('shipping_agency.create');
        Route::post('/dashboard/shipping_agencies/create', [App\Http\Controllers\ShippingAgencyController::class, 'store'])->name('shipping_agency.store');
        Route::get('/dashboard/shipping_agencies/{shippingAgency}', [App\Http\Controllers\ShippingAgencyController::class, 'show'])->name('shipping_agency');
        Route::patch('/dashboard/shipping_agencies/{shippingAgency}', [App\Http\Controllers\ShippingAgencyController::class, 'update'])->name('shipping_agency.update');
        Route::patch('dashboard/shipping_agencies/shipping_fee/{shippingFee}', [App\Http\Controllers\ShippingFeeController::class, 'update'])->name('shipping_fee.update');
    });


    Route::middleware('employee')->group(function (){

        // dashboard route
        Route::get('/dashboard', [App\Http\Controllers\DashboardController::class, 'index'])->name('dashboard');


        // client routes
        Route::get('/dashboard/clients', [App\Http\Controllers\ClientController::class, 'index'])->name('clients');
        Route::get('/dashboard/clients/{user}', [App\Http\Controllers\ClientController::class, 'show'])->name('client');

        // products routes
        Route::get('/dashboard/products', [App\Http\Controllers\ProductController::class, 'index'])->name('products');
        Route::get('/dashboard/products/{product}', [App\Http\Controllers\ProductController::class, 'show'])->name('product');
        Route::get('/dashboard/products/create', [App\Http\Controllers\ProductController::class, 'create'])->name('product.create');
        Route::post('/dashboard/products/create', [App\Http\Controllers\ProductController::class, 'store'])->name('product.store');

        // receptions routes
        Route::get('/dashboard/receptions', [App\Http\Controllers\ReceptionController::class, 'index'])->name('receptions');
        Route::get('/dashboard/receptions/create', [App\Http\Controllers\ReceptionController::class, 'create'])->name('reception.create');
        Route::post('/dashboard/receptions/create', [App\Http\Controllers\ReceptionController::class, 'store'])->name('reception.store');
        Route::get('/dashboard/receptions/{reception}', [App\Http\Controllers\ReceptionController::class, 'show'])->name('reception');


        // categories routes
        Route::get('/dashboard/categories', [App\Http\Controllers\CategoryController::class, 'index'])->name('categories');
        Route::get('/dashboard/categories/{category}', [App\Http\Controllers\CategoryController::class, 'show'])->name('category');

        // profile routes
        Route::get('/profile', [App\Http\Controllers\ProfileController::class, 'edit'])->name('profile');
        Route::patch('/profile', [App\Http\Controllers\ProfileController::class, 'update'])->name('profile.update');
        Route::get('/dashboard/profile', [App\Http\Controllers\ProfileController::class, 'dashboard_edit'])->name('dashboard_profile');
        Route::patch('/dashboard/profile', [App\Http\Controllers\ProfileController::class, 'update'])->name('dashboard_profile.update');


        // dashboard contact routes
        Route::get('/dashboard/contacts', [App\Http\Controllers\ContactController::class, 'dashboard_index'])->name('contacts');
        Route::get('/dashboard/contacts/{contact}', [App\Http\Controllers\ContactController::class, 'show']);
        Route::delete('/dashboard/contacts/{contact}', [App\Http\Controllers\ContactController::class, 'destroy'])->name('contact.destroy');


        // orders routes
        Route::get('/dashboard/orders', [App\Http\Controllers\OrderController::class, 'index'])->name('orders');
        Route::get('/dashboard/orders/{order}', [App\Http\Controllers\OrderController::class, 'show'])->name('order');
        Route::post('/dashboard/orders/{order}/deliver', [App\Http\Controllers\OrderController::class, 'deliver'])->name('deliver_order');

    });


    // client products routes
    Route::middleware('client')->group(function () {


        // client cart items routes
        Route::get('/cart', [App\Http\Controllers\CartItemController::class, 'index'])->name('cart');
        Route::post('/cart', [App\Http\Controllers\CartItemController::class, 'store'])->name('cart_item.store');
        Route::delete('/cart/{cartItem}', [App\Http\Controllers\CartItemController::class, 'destroy'])->name('cart_item.destroy');
        Route::post('/cart/checkout', [App\Http\Controllers\CartItemController::class, 'checkout'])->name('cart.checkout');


        // bookmarks routes
        Route::get('/bookmarks', [App\Http\Controllers\BookmarkController::class, 'index'])->name('bookmarks');
        Route::post('/bookmarks', [App\Http\Controllers\BookmarkController::class, 'store'])->name('bookmark.store');
        Route::delete('/bookmarks/{bookmark}', [App\Http\Controllers\BookmarkController::class, 'destroy'])->name('bookmark.destroy');
        Route::delete('/bookmarks/product/{product}', [App\Http\Controllers\BookmarkController::class, 'destroyByProductId'])->name('bookmark.destroy');

        // client orders routes
        Route::get('/orders', [App\Http\Controllers\ClientOrderController::class, 'index'])->name('client_orders');
        Route::get('/orders/{order}', [App\Http\Controllers\ClientOrderController::class, 'show'])->name('client_order');
        Route::post('/orders/{order}/cancel', [App\Http\Controllers\OrderController::class, 'cancel'])->name('client_cancel_order');

        // client profile routes
        Route::get('/profile', [App\Http\Controllers\ProfileController::class, 'edit'])->name('profile');
        Route::patch('/profile', [App\Http\Controllers\ProfileController::class, 'update'])->name('profile.update');

    });


});

require __DIR__ . '/auth.php';
