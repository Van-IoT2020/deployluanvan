<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\SizeDetails;

use Illuminate\Support\Facades\Validator;
use Illuminate\Support\MessageBag;

class SizeDetailsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return SizeDetails::all();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $find = SizeDetails::where('size_id',$request->size_id)->where('product_id',$request->product_id)->get();
        if($find->count()>0){
            return response()->json('Đã tồn tại size cho sản phẩm này', 400);
        }
        return SizeDetails::create($request->all());
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return SizeDetails::findOrFail($id);
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
        $details = SizeDetails::findOrFail($id);
        $find = SizeDetails::where('size_id',$request->size_id)->where('product_id',$request->product_id)->get();
        if($find->count()>0){
            return response()->json('Đã tồn tại size cho sản phẩm này', 400);
        }
        return $details->update($request->all());
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $details = SizeDetails::findOrFail($id);
        return $details->delete();
    }
}
