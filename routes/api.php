<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
// use App\Http\Controllers\Api\CategoriesController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

// Route::get('categories/{id}', 'App\Http\Controllers\CategoriesController@show');
Route::Resource('categories', 'App\Http\Controllers\CategoriesController');
// Route::Resource('categories-type-tu/{id}', 'App\Http\Controllers\CategoriesController@findProductType');

// Route::get('brand/find-id-by-slug/{slug}', 'App\Http\Controllers\BrandController@findIdBySlug');
Route::resource('brand', 'App\Http\Controllers\BrandController');

Route::resource('supplier', 'App\Http\Controllers\SupplierController');

Route::resource('receipt', 'App\Http\Controllers\ReceiptController');
Route::put('receipt_upd_bill/{id}', 'App\Http\Controllers\ReceiptController@handle_updateBillTotal');

Route::resource('receipt-details', 'App\Http\Controllers\ReceiptDetailsController');

Route::resource('slide', 'App\Http\Controllers\SlideController');

Route::resource('Admin', 'App\Http\Controllers\AdminAccountController');
Route::post('Admin_login','App\Http\Controllers\AdminAccountController@login');

Route::get('product/find-id-by-slug/{slug}', 'App\Http\Controllers\ProductController@findIdBySlug');
Route::resource('product', 'App\Http\Controllers\ProductController');
Route::get('brand-product/{key}', 'App\Http\Controllers\ProductController@showProductBrand');
Route::get('product-customer', 'App\Http\Controllers\ProductController@getPagination');

Route::resource('product-type', 'App\Http\Controllers\ProductTypeController');
// Route::get('get-categories-producttype/{id}', 'App\Http\Controllers\ProductTypeController@getnameProductType');
// Route::Resource('product-type/{id}', 'App\Http\Controllers\ProductTypeController@show_type');

Route::resource('color', 'App\Http\Controllers\ColorController');

Route::get('get-color-details/{id}', 'App\Http\Controllers\ColorDetailsController@getColor');
Route::resource('color-details', 'App\Http\Controllers\ColorDetailsController');

Route::resource('size', 'App\Http\Controllers\SizeController');

Route::get('get-size-details/{id}', 'App\Http\Controllers\SizeDetailsController@getSize');
Route::resource('size-details', 'App\Http\Controllers\SizeDetailsController');

Route::Resource('customer', 'App\Http\Controllers\CustomerController');
Route::post("login", "App\Http\Controllers\CustomerController@login");

//Search
Route::get('search/{key}', 'App\Http\Controllers\ProductController@Search');
Route::get('product-type-categories/{key}', 'App\Http\Controllers\ProductTypeController@showProductType');

// //Login-Register Customer
// Route::Resource('customer', 'App\Http\Controllers\CustomerController');
// Route::post("signup", "App\Http\Controllers\CustomerController@userSignUp");
// Route::post("user-login", "App\Http\Controllers\CustomerController@CusomerLogin");
// Route::get("user/{email}", "App\Http\Controllers\CustomerController@userDetail");
