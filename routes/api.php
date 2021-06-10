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

Route::Resource('categories', 'App\Http\Controllers\Api\CategoriesController');

Route::resource('brand', 'App\Http\Controllers\Api\BrandController');
Route::Resource('product', 'App\Http\Controllers\Api\ProductController');
Route::Resource('product-type', 'App\Http\Controllers\Api\ProductTypeController');
Route::Resource('color', 'App\Http\Controllers\Api\ColorController');
Route::Resource('color-details', 'App\Http\Controllers\Api\ColorDetailsController');

Route::Resource('customer', 'App\Http\Controllers\Api\CustomerController');
Route::post("signup", "App\Http\Controllers\Api\CustomerController@userSignUp");
