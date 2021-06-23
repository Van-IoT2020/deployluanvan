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

Route::Resource('categories', 'App\Http\Controllers\CategoriesController');
// Route::Resource('categories-type-tu/{id}', 'App\Http\Controllers\CategoriesController@findProductType');

//Khách hàng
Route::resource('brand', 'App\Http\Controllers\BrandController');
Route::Resource('product', 'App\Http\Controllers\ProductController');
Route::get('brand-product/{key}', 'App\Http\Controllers\ProductController@showProductBrand');
Route::Resource('product-type', 'App\Http\Controllers\ProductTypeController');
// Route::get('get-categories-producttype/{id}', 'App\Http\Controllers\ProductTypeController@getnameProductType');
// Route::Resource('product-type/{id}', 'App\Http\Controllers\ProductTypeController@show_type');
Route::Resource('color', 'App\Http\Controllers\ColorController');

Route::get('get-color-details', 'App\Http\Controllers\ColorDetailsController@all_colorDetails');
Route::Resource('color-details', 'App\Http\Controllers\ColorDetailsController');

//Login-Register Customer
Route::Resource('customer', 'App\Http\Controllers\CustomerController');
Route::post("signup", "App\Http\Controllers\CustomerController@userSignUp");
Route::post("user-login", "App\Http\Controllers\CustomerController@CusomerLogin");
Route::get("user/{email}", "App\Http\Controllers\CustomerController@userDetail");

//Admin quản lý
Route::resource('Admin', 'App\Http\Controllers\AdminAccountController');
Route::post('Admin_login','App\Http\Controllers\AdminAccountController@login');

Route::resource('supplier', 'App\Http\Controllers\SupplierController');
Route::resource('Slide', 'App\Http\Controllers\SlideController');

//Search
Route::get('search/{key}', 'App\Http\Controllers\ProductController@Search');
Route::get('product-type-categories/{key}', 'App\Http\Controllers\ProductTypeController@showProductType');
