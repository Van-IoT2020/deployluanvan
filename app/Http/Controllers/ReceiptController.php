<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Receipt;
use App\Models\ReceiptDetails;
use App\Models\Product;

use Illuminate\Support\Facades\Validator;
use Illuminate\Support\MessageBag;
use App\Imports\ImportReceipt;
use Maatwebsite\Excel\Facades\Excel;

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
        // $valid = Validator::make($request->all(),
        //     [
        //         'bill_total'=>'required|numeric|min:5'
        //     ],
        //     [
        //         'bill_total.min'=>'Phải nhập đủ 5 ký tự',
        //         'bill_total.numeric' => 'Giá tiền phải đúng định dạng',
        //         'bill_total.required'=> 'Phải nhập tổng đơn giá nhập vào'
        //     ]
        // );

        // // var_dump($valid->fails());
        // // print_r($valid->errors());
        // if($valid->fails()){
        //     $err = [];
        //     foreach($valid->errors()->messages() as $key => $value){
        //         // echo($value[0]);
        //         $err[] = $value[0];
        //     }
        //     return response()->json($err, 400);
        // }

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
        // $valid = Validator::make($request->all(),
        //     [
        //         'bill_total'=>'required|numeric|min:5'
        //     ],
        //     [
        //         'bill_total.min'=>'Phải nhập đủ 5 ký tự',
        //         'bill_total.numeric' => 'Giá tiền phải đúng định dạng',
        //         'bill_total.required'=> 'Phải nhập tổng đơn giá nhập vào'
        //     ]
        // );
        // if($valid->fails()){
        //     $err = [];
        //     foreach($valid->errors()->messages() as $key => $value){
        //         $err[] = $value[0];
        //     }
        //     return response()->json($err, 400);
        // }

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

    // public function handle_updateBillTotal(Request $request, $id){
    //     //  action: 
    //     //  1: add -> increment
    //     //  2: update -> decrement n increment 
    //     //  3: delete -> decrement

    //     $find_billTotal = Receipt::select('bill_total')->where('receipt_id', $id)->first()->bill_total;
    //     // echo($find_billTotal);

    //     if($request->action == 1){
    //         $new_money = $find_billTotal + $request->total_money;
    //     } 
    //     elseif($request->action == 2){
    //         $new_money =  $find_billTotal - $request->total_old_money + $request->total_money;
    //     } 
    //     else{
    //         $new_money =  $find_billTotal - $request->total_money;
    //     }
        
    //     $receipt= Receipt::findOrFail($id);
    //     return $receipt->update(['bill_total' => $new_money]);
    // }

    public function getFundsByMonth($year){
        $getAllMonthInYear = [];
        for($i=1; $i <= 12 ; $i++) { 
            $findMonthly = Receipt::whereMonth('create_at',$i)->whereYear('create_at', $year)->sum('bill_total');
            $getAllMonthInYear[] = $findMonthly;
        }
        return response()->json($getAllMonthInYear, 200);
    }

    function import(Request $request)
    {
        $this->validate($request, [
            'select_file'  => 'required|mimes:xls,xlsx'
        ]);
        $valid = Validator::make($request->all(),
            [
                'select_file'  => 'required|mimes:xls,xlsx'
            ],
            [
                'select_file.required'=>'Phải nhập file Chi tiết phiếu nhập!',
                'select_file.mimes' => 'File phải đúng định dạng .xls/xlsx',
            ]
        );
        if($valid->fails()){
            $err = [];
            foreach($valid->errors()->messages() as $key => $value){
                $err[] = $value[0];
            }
            return response()->json($err, 400);
        }

        $path = $request->file('select_file')->getRealPath();
        $data = new ImportReceipt();
        Excel::import($data, $path);
        
        $insert_product_id = []; // ds quyết định có nên dừng đọc file
        $insert_data = []; //Dùng để nhận dữ liệu để xử lý

        //read from file Excel
        foreach($data as $key => $value)
        {
            foreach($value as $row)
            {
                if(in_array($row[0], $insert_product_id)){
                    return response()->json('file excel có tồn tại một sản phẩm có id là '.$row[0].' bị trùng. Người dùng chỉnh sửa lại file trước khi thêm!', 400);
                }
                $insert_product_id[] = $row[0];
                $insert_data[] = array(
                    'receipt_id'  => null,
                    'product_id'  => $row[0],
                    'receipt_quantity'   => $row[1],
                    'receipt_price'   => $row[2],
                    'created_at'    => date("Y-m-d")
                );
                // echo($row);
            }
        }

        $createReceiptId = Receipt::create($request->all())->receipt_id;

        //setup
        if(!empty($insert_data))
        {
            $bill_total = 0;

            foreach($insert_data as $key => $value){
                if($key!=0){ 
                    if($value["product_id"] || $value["receipt_quantity"]){
                        //setup
                        $value['receipt_id']  = $createReceiptId;

                        //process
                        $receipt_quantity = $value["receipt_quantity"];
                        $product_id = $value["product_id"];
                        $bill_total += $value["receipt_quantity"] * $value["receipt_price"];

                        $findProduct = Product::find($product_id);
                        $new_quantity = $receipt_quantity + $findProduct->product_quantity;
                        $update_quantity = $findProduct->update(['product_quantity' => $new_quantity]);

                        //save
                        ReceiptDetails::create($value);
                    }
                }
            }
            $findReceipt = Receipt::find($createReceiptId);
            $findReceipt->update(['bill_total' => $bill_total]);
        }
            
        return response()->json("successfully", 200);
    }
}
