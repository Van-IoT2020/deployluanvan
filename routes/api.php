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

// Route::get('categories/{id}', 'App\Http\Controllers\categoriesController@show');
Route::Resource('categories', 'App\Http\Controllers\categoriesController');

// Route::get('brand/find-id-by-slug/{slug}', 'App\Http\Controllers\brandController@findIdBySlug');
Route::resource('brand', 'App\Http\Controllers\brandController');

Route::resource('supplier', 'App\Http\Controllers\supplierController');

Route::resource('receipt', 'App\Http\Controllers\ReceiptController');

Route::resource('slide', 'App\Http\Controllers\SlideController');

Route::resource('Admin', 'App\Http\Controllers\AdminAccountController');
Route::post('Admin_login','App\Http\Controllers\AdminAccountController@login');

Route::resource('product', 'App\Http\Controllers\ProductController');

Route::resource('product_type', 'App\Http\Controllers\Product_typeController');

Route::resource('color', 'App\Http\Controllers\ColorController');

Route::resource('color-details', 'App\Http\Controllers\ColorDetailsController');

Route::Resource('customer', 'App\Http\Controllers\CustomerController');
Route::post("signup", "App\Http\Controllers\CustomerController@userSignUp");

