<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\models\ProductType;
use DB;
class ProductTypeController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return ProductType::all();
    }
    // public function getnameProductType($id){
    //     // $getname = DB::table('product_type')
    //     // ->join('categories', 'product_type.categories_id', '=', 'categories.categories_id')->get();
    //     // foreach ($getname as $names) {
    //     //     $names[] = ProductType::where($id,$names->categories_id)->get();
    //     // }
    //     // return $names;
    //     // $product_type_name = Categories::where('categories_id',$id)->load('product_type');
    //     // return $product_type_name;
    // }
    // public function show_type($id){
    //         $type = DB::table('product_type')
    //         ->join('categories', 'product_type.categories_id', '=', 'categories.categories_id')->where('categories_id',$id)->get();
    //         // $type=ProductType::where('categories_id',$id)->get();
    //         return $type;
    //     }
    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
    public function showProductType($key){
        return ProductType::where('categories_id', $key)->get();
    }
}
