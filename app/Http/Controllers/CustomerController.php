<?php

namespace App\Http\Controllers;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Customer;
use Hash;
use Illuminate\Support\Facades\Validator;

class CustomerController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Customer::all();
    }

    // private $status_code = 200;

    // public function userSignUp(Request $request) {
    //     $validator = Validator::make($request->all(), [
    //         "customer_id"=>"required|unique:customer,customer_id,except,customer_id",
    //         "customer_name"=>"required",
    //         "customer_email"=>"required|email",
    //         "customer_password"=>"required",
    //         "customer_phone"=>"required|unique:customer,customer_phone,except,customer_id"
    //     ]);

    //     if($validator->fails()) {
    //         return response()->json(["status" => "failed", "message" => "validation_error", "errors" => $validator->errors()]);
    //     }
    //     $userDataArray = array(
    //         "customer_id"  => $request->customer_id,
    //         "customer_name"  => $request->customer_name,
    //         "customer_email" => $request->customer_email,
    //         "customer_password" => md5($request->customer_password),
    //         "customer_phone"   => $request->customer_phone
    //     );
    //     $user_status =  Customer::where("customer_email", $request->customer_email)->first();

    //     if(!is_null($user_status)) {
    //        return response()->json(["status" => "failed", "success" => false, "message" => "Whoops! email already registered"]);
    //     }
    //     $user =  Customer::create($userDataArray);
    //     if(!is_null($user)) {
    //         return response()->json(["status" => $this->status_code, "success" => true, "message" => "Registration completed successfully", "data" => $user]);
    //     }

    //     else {
    //         return response()->json(["status" => "failed", "success" => false, "message" => "failed to register"]);
    //     }
    // }

    // //Login Customer
    // public function CusomerLogin(Request $request) {

    //     $validator=Validator::make($request->all(),
    //         [
    //             "customer_email"=>"required|email",
    //             "customer_password"=>"required"
    //         ]
    //     );

    //     if($validator->fails()) {
    //         return response()->json(["status" => "failed", "validation_error" => $validator->errors()]);
    //     }
    //     // check if entered email exists in db
    //     $email_status=Customer::where("customer_email", $request->customer_email)->first();
    //     // if email exists then we will check password for the same email
    //     if(!is_null($email_status)) {
    //         $password_status=Customer::where("customer_email", $request->customer_email)->where("customer_password", md5($request->customer_password))->first();

    //         // if password is correct
    //         if(!is_null($password_status)) {
    //             $user=$this->userDetail($request->customer_email);

    //             return response()->json(["status" => $this->status_code, "success" => true, "message" => "You have logged in successfully", "data" => $user]);
    //         }

    //         else {
    //             return response()->json(["status" => "failed", "success" => false, "message" => "Unable to login. Incorrect password."]);
    //         }
    //     }

    //     else {
    //         return response()->json(["status" => "failed", "success" => false, "message" => "Unable to login. Email doesn't exist."]);
    //     }
    // }

    // // ------------------ [ User Detail ] ---------------------
    // public function userDetail($email) {
    //     $user=array();
    //     if($email != "") {
    //         $user=Customer::where("customer_email", $email)->first();
    //         return $user;
    //     }
    // }
    
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
                'customer_id'=>'required|min:3',
                'customer_name'=>'required',
                'customer_email'=>'required|email',
                'customer_password'=>'required|min:5|max:32',
                'customer_phone'=>'required|numeric|digits:10'
            ],
            [
                'customer_id.required'=>'Bạn chưa nhập mã người dùng',
                'customer_id.min'=>'Mã người dùng phải ít nhất 3 kí tự',
                'customer_name.required'=>'Bạn chưa nhập tên',
                'customer_email.required'=>'Bạn chưa nhập email',
                'customer_email.email'=>'Email chưa đúng định dạng',
                'customer_password.required'=>'Bạn chưa nhập mật khẩu',
                'customer_password.min'=>'Mật khẩu phải ít nhất 5 kí tự',
                'customer_password.max'=>'Mật khẩu chỉ tối đa 32 kí tự',
                'customer_phone.required'=>'Bạn chưa nhập số điện thoại',
                'customer_phone.numeric'=>'Số điện thoại phải là số',
                'customer_phone.digits'=>'Số điện thoại phải đủ 10 chữ số'
            ]
        );
        if($valid->fails()){
            $err = [];
            foreach($valid->errors()->messages() as $key => $value){
                // echo($value[0]);
                $err[] = $value[0];
            }
            return response()->json($err, 400);
        }
        $find = Customer::findOrFail($request->customer_id);
        if($find != null){ 
            return response()->json('Lỗi: khóa chính đã tồn tại',400);
        }
        $request->offsetSet('customer_password',bcrypt($request->input('customer_password')));
        return Customer::create($request->all());
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $customer = Customer::findOrFail($id);
        return $customer;
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
        // 1->3 | [1,2,3] -> ko -> xg
        // 1->1 | [1,2,3] -> ok -> xg
        // 1->4 | [1,2,3] -> ok
        $valid = Validator::make($request->all(),
            [
                'customer_id'=>'required|min:3)',
                'customer_name'=>'required',
                'customer_email'=>'required|email',
                'customer_phone'=>'required|numeric|digits:10'
            ],
            [
                'customer_id.required'=>'Bạn chưa nhập tên người dùng',
                'customer_id.min'=>'Tên người dùng phải ít nhất 3 kí tự',
                'customer_name.required'=>'Bạn chưa nhập tên',
                'customer_email.required'=>'Bạn chưa nhập email',
                'customer_email.email'=>'Email chưa đúng định dạng',
                'customer_phone.required'=>'Bạn chưa nhập số điện thoại',
                'customer_phone.numeric'=>'Số điện thoại phải là số',
                'customer_phone.digits'=>'Số điện thoại phải đủ 10 chữ số'
            ]
        );
        if($valid->fails()){
            $err = [];
            foreach($valid->errors()->messages() as $key => $value){
                // echo($value[0]);
                $err[] = $value[0];
            }
            return response()->json($err, 400);
        }

        $find = Customer::where('customer_id',$request->customer_id)->get();
        if($request->isChanged){
            $valid = Validator::make($request->all(),
                [
                    'customer_password'=>'min:5|max:32',
                ],
                [
                    'customer_password.min'=>'Mật khẩu phải ít nhất 5 kí tự',
                    'customer_password.max'=>'Mật khẩu chỉ tối đa 32 kí tự',
                ]
            );
            if($valid->fails()){
                $err = [];
                foreach($valid->errors()->messages() as $key => $value){
                    $err[] = $value[0];
                }
                return response()->json($err, 400);
            }
            if (count($find)) {
                if (Hash::check($request->customer_old_password, $find[0]->customer_password)) {
                    $request->offsetSet('customer_password',bcrypt($request->input('customer_password'))); 

                    $customer = Customer::findOrFail($id);
                    $customer->update($request->all());
                    return response()->json('Cập nhật mật khẩu thành công', 200);
                }
            }
            return response()->json('Sai mật khẩu cũ', 400);
        }
        else{
            $customer = Customer::findOrFail($id);
            $customer->update($request->all());
            return response()->json('Cập nhật thành công', 200);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $customer = Customer::findOrFail($id);
        $customer->delete();
        return 204;
    }

    public function login(Request $request)
    {
        $valid = Validator::make($request->all(),
            [
                'customer_id'=>'required',
                'customer_password'=>'required|min:5|max:32'
            ],
            [
                'customer_id.required'=>'Bạn chưa nhập tên tài khoản',
                'customer_password.required'=>'Bạn chưa nhập mật khẩu',
                'customer_password.min'=>'Mật khẩu phải ít nhất 5 kí tự',
                'customer_password.max'=>'Mật khẩu chỉ tối đa 32 kí tự'
            ]
        );
        if($valid->fails()){
            $err = [];
            foreach($valid->errors()->messages() as $key => $value){
                $err[] = $value[0];
            }
            return response()->json($err, 400);
        }
        // $inputPassword = bcrypt($request->input('admin_password'));
        // var_dump($inputPassword);
        $find = Customer::where('customer_id', '=', $request->customer_id)->get();
        if(count($find)) {
            if (Hash::check($request->customer_password, $find[0]->customer_password)) {
                
                return response()->json($find,200);
            }
            else {
                return response()->json('Sai thông tin login',500);
            }
        }
        else {
            return response()->json('Sai thông tin login',500);
        }
    }
}
