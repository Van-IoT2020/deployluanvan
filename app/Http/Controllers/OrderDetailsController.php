<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\OrderDetails;

use Illuminate\Support\Facades\Validator;

class OrderDetailsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return OrderDetails::all();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $valid = Validator::make($request->all(),
            [
                'order_id'=>'required', 
                'product_id'=>'required',
                'color_name'=>'required',
                'size_name'=>'required',
                'unit_price'=>'required',
                'promotion_price'=>'required',
                'product_quantity'=>'required',
                'product_feeship'=>'required'
            ],
            [
                'order_id.required'=>'Không có mã đơn đặt hàng',
                'product_id.required' => 'Không lấy được mã sản phẩm',
                'color_name.required'=> 'Chưa chọn màu sản phẩm',
                'size_name.required'=> 'Chưa có kích cỡ sản phẩm',
                'unit_price.required'=> 'Chưa lưu được giá gốc',
                'promotion_price.required'=> 'Không lưu được giá giảm',
                'product_quantity.required'=> 'Chưa lưu được số lượng sản phẩm',
                'product_feeship.required'=> 'Chưa lưu được phí giao cho đơn sản phẩm'
            ]
        );
        if($valid->fails()){
            $err = [];
            foreach($valid->errors()->messages() as $key => $value){
                $err[] = $value[0];
            }
            return response()->json($err, 400);
        }

        return OrderDetails::create($request->all());
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return OrderDetails::findOrFail($id);
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
}
