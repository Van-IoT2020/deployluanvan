<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\TblOrder;

use Illuminate\Support\Facades\Validator;

class TblOrderController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return TblOrder::all();
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
                'customer_id'=>'required', 
                'ship_id'=>'required',
                'order_status'=>'required',
                'total_sold'=>'required',
                'create_at'=>'required'
            ],
            [
                'customer_id.required'=>'Không lấy được mã khách hàng',
                'ship_id.required' => 'Không tạo được mã giao hàng',
                'order_status.required'=> 'Không lấy được trạng thái',
                'total_sold.required'=> 'Chưa lưu được tổng tiền',
                'create_at.required'=> 'Chưa lưu được ngày đặt hàng'
            ]
        );
        if($valid->fails()){
            $err = [];
            foreach($valid->errors()->messages() as $key => $value){
                $err[] = $value[0];
            }
            return response()->json($err, 400);
        }

        return TblOrder::create($request->all());
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return TblOrder::findOrFail($id);
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
