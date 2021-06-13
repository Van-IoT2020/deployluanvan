<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Receipt;

use Illuminate\Support\Facades\Validator;
use Illuminate\Support\MessageBag;

class ReceiptController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Receipt::all();
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
                'bill_total'=>'required|numeric|min:5'
            ],
            [
                'bill_total.min'=>'Phải nhập đủ 5 ký tự',
                'bill_total.numeric' => 'Giá tiền phải đúng định dạng',
                'bill_total.required'=> 'Phải nhập tổng đơn giá nhập vào'
            ]
        );

        // var_dump($valid->fails());
        // print_r($valid->errors());
        if($valid->fails()){
            $err = [];
            foreach($valid->errors()->messages() as $key => $value){
                // echo($value[0]);
                $err[] = $value[0];
            }
            return response()->json($err, 400);
        }

        return Receipt::create($request->all());
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return Receipt::findOrFail($id);
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
        $receipt = Receipt::findOrFail($id);
        $valid = Validator::make($request->all(),
            [
                'bill_total'=>'required|numeric|min:5'
            ],
            [
                'bill_total.min'=>'Phải nhập đủ 5 ký tự',
                'bill_total.numeric' => 'Giá tiền phải đúng định dạng',
                'bill_total.required'=> 'Phải nhập tổng đơn giá nhập vào'
            ]
        );
        if($valid->fails()){
            $err = [];
            foreach($valid->errors()->messages() as $key => $value){
                $err[] = $value[0];
            }
            return response()->json($err, 400);
        }

        return $receipt->update($request->all());
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $receipt = Receipt::findOrFail($id);
        $count_details = $receipt->receipt_details->count();
        if($count_details != 0){
            return response()->json('Phiếu nhập đã có tồn tại chi tiết!', 400);
        }
        return $receipt->delete();
    }
}
