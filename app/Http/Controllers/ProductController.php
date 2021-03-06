<?php

namespace App\Http\Controllers;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Product;
use App\Models\SizeDetails;
use App\Models\ProductType;
use DB;

use Illuminate\Support\Facades\Validator;
use Illuminate\Support\MessageBag;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Product::all();
    }

    public function getPagination(Request $request)
    {

        $searchData = json_decode($request->searchData);

        $query = Product::select("product.product_id", "product.product_name", "product.product_quantity", "product.product_slug", 
                                "product.product_type_id", "product.brand_id", "product.unit", "product.unit_price", 
                                "product.promotion_price", "product.product_desc", "product.product_content", 
                                "product.product_image", "product.product_status", "rating.total");
        $query->leftJoin(DB::raw('(select tbl_rating.product_id, AVG(tbl_rating.rating) as total from tbl_rating WHERE 
        (tbl_rating.status = 1 or tbl_rating.status is null) and (tbl_rating.del_flg = 0 or tbl_rating.del_flg is null) group by tbl_rating.product_id)
                                    as rating') ,
                            'product.product_id', '=', 'rating.product_id')->groupBy('product.product_id');

        if ($searchData) {
            if ($searchData->size) {
                $query->leftJoin("size_detail","product.product_id", "=", "size_detail.product_id")
                        ->whereIn("size_id", (array)$searchData->size)->groupBy("product.product_id")->distinct();
            }
            if ($searchData->minPrice) {
                $query->where("unit_price", ">=", $searchData->minPrice);
            }
            if ($searchData->maxPrice) {
                $query->where("unit_price", "<=", $searchData->maxPrice);
            }
            if ($searchData->keyword) {
                // $query->where("product_name", "=", "quan");
                $query->where("product.product_name", "LIKE", "%".$searchData->keyword."%");
            }
            if ($searchData->type) {
                $query->leftJoin("product_type","product.product_type_id", "=", "product_type.product_type_id")
                        ->leftJoin("categories", "categories.categories_id", "=", "product_type.categories_id")
                        ->where("categories.categories_id", "=", $searchData->type);
            }
            if ($searchData->brand) {
                $query->where('product.brand_id', $searchData->brand);
            }
            if ($searchData->orderBy != "default") {
                if ($searchData->orderBy == "minPrice") {
                    $query->addSelect(DB::raw('IF (promotion_price = 0, unit_price, promotion_price) AS price'))->orderBy("price", "ASC");
                } 
                if ($searchData->orderBy == "maxPrice") {
                    $query->addSelect(DB::raw('IF (promotion_price = 0, unit_price, promotion_price) AS price'))->orderBy("price", "DESC");
                }
            }
             else {
                $query->orderBy("product.created_at", "ASC");
            }
        }
        return $query->paginate(3);
    }

    // public function show_new(){
    //     $all_sp_new=Product::where('product_status',1)->get();
    //     return $all_sp_new;
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
                'product_id'=>'required|unique:product,product_id',
                'product_name'=>'required|min:3',
                'product_quantity'=>'required',
                'product_slug'=>'required|unique:product,product_slug',
                // 'product_type_id'=>'required',
                // 'brand_id'=>'required',
                'unit'=>'required',
                'unit_price'=>'required|numeric',
                'promotion_price'=>'required|numeric',
                'product_desc'=>'required',
                'product_content'=>'required',
                'product_image'=>'required',
                // 'product_status'=>'required'
            ],
            [
                'product_id.required'=>'B???n ch??a nh???p m?? s???n ph???m',
                'product_id.unique'=>'M?? s???n ph???m ???? t???n t???i',
                'product_name.required'=>'B???n ch??a nh???p t??n ng?????i d??ng',
                'product_name.min'=>'T??n s???n ph???m ph???i ??t nh???t 3 k?? t???',
                'product_quantity.required'=>'B???n ch??a nh???p s??? l?????ng',
                'product_slug.required'=>'B???n ch??a nh???p slug',
                'product_slug.unique'=>'Slug ???? t???n t???i',
                'unit.required'=>'Nh???p ????n v??? t??nh',
                'unit_price.required'=>'B???n ch??a nh???p gi??',
                'unit_price.numeric'=>'Gi?? ch??a ????ng ?????nh d???ng',
                'promotion_price.required'=>'B???n ch??a nh???p gi?? khuy???n m??i',
                'promotion_price.numeric'=>'Gi?? khuy???n m??i ch??a ????ng ?????nh d???ng',
                'product_desc.required'=>'Ch??a nh???p m?? t???',
                'product_content.required'=>'Ch??a nh???p n???i dung',
                'product_image.required'=>'H??nh kh??ng ???????c ????? tr???ng',
                // 'product_image.image'=>'H??nh ch??a ????ng ?????nh d???ng'
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
        return Product::create($request->all());
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return Product::findOrFail($id);
    }

    public function findIdBySlug($slug)
    {
        return Product::select('product_id')->where('product_slug',$slug)->first();//get url theo slug ph??a backend
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
        $valid = Validator::make($request->all(),
            [
                'product_name'=>'required|min:3',
                'product_quantity'=>'required',
                'product_slug'=>'required',
                // 'product_type_id'=>'required',
                // 'brand_id'=>'required',
                'unit'=>'required',
                'unit_price'=>'required|numeric',
                'promotion_price'=>'required|numeric',
                'product_desc'=>'required',
                'product_content'=>'required',
                // 'product_image'=>'required',
                // 'product_status'=>'required'
            ],
            [
                'product_name.required'=>'B???n ch??a nh???p t??n ng?????i d??ng',
                'product_name.min'=>'T??n s???n ph???m ph???i ??t nh???t 3 k?? t???',
                'product_quantity.required'=>'B???n ch??a nh???p s??? l?????ng',
                'product_slug.required'=>'B???n ch??a nh???p slug',
                'unit.required'=>'Nh???p ????n v??? t??nh',
                'unit_price.required'=>'B???n ch??a nh???p gi??',
                'unit_price.numeric'=>'Gi?? ch??a ????ng ?????nh d???ng',
                'promotion_price.required'=>'B???n ch??a nh???p gi?? khuy???n m??i',
                'promotion_price.numeric'=>'Gi?? khuy???n m??i ch??a ????ng ?????nh d???ng',
                'product_desc.required'=>'Ch??a nh???p m?? t???',
                'product_content.required'=>'Ch??a nh???p n???i dung',
                // 'product_image.required'=>'H??nh kh??ng ???????c ????? tr???ng',
                // 'product_image.image'=>'H??nh ch??a ????ng ?????nh d???ng'
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
        $product = Product::findOrFail($id);
        $product->update($request->all());
        return response()->json('C???p nh???t th??nh c??ng', 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $product = Product::findOrFail($id);
        $count_colors = $product->color_details->count();
        if($count_colors != 0){
            return response()->json('S???n ph???m c?? t???n t???i chi ti???t m??u!', 400);
        }
        $count_sizes = $product->size_detail->count();
        if($count_sizes != 0){
            return response()->json('S???n ph???m c?? t???n t???i chi ti???t size!', 400);
        }
        $count_receipts = $product->receipt_details->count();
        if($count_receipts != 0){
            return response()->json('S???n ph???m c?? t???n t???i chi ti???t phi???u nh???p!', 400);
        }
        return $product->delete();
    }
    public function Search($key){
        return Product::where('product_name', 'Like', "%$key%")->get();
    }
    //Show theo th????ng hi???u
    public function showProductBrand($key){
        return Product::where('brand_id', $key)->get();
        // ->Paginate(3) ->get()
    }

    //Show theo loai
    public function showProductType($key){
        return Product::where('product_type_id', $key)->get();
        // ->Paginate(3)
    }
    // public function showProductCate($key){
    //     $cate_pro = DB::table('categories')->join('product_type', 'categories.categories_id', '=', 'product_type.categories_id')
    //         ->join('product', 'product.product_type_id', '=', 'product_type.product_type_id')->where('categories.categories_id', $key)->get();
    //     return $cate_pro;
    //     // ->Paginate(3)
    // }

    public function showProductCate($id){
        $arr_product = [];

        $findProduct = ProductType::where('categories_id', $id)->get();
        foreach($findProduct as $key => $value){
            $arr_product = Product::where('product_type_id', $value->product_type_id)->get();
        }
        return $arr_product;
    }

    //show size
    // public function getProductSize($id){
    //     return $id;
    //     $arr_product = [];

    //     $findProduct = SizeDetails::select('product_id')->where('size_id', $id)->get();
    //     foreach($findProduct as $key => $value){
    //         $arr_product[] = Product::where('product_id', $value->product_id)->get();
    //     }
    //     return $arr_product;
    // }
    public function getProductSize($id){
        $arr = explode('-',$id);
        $arr_product=[];
        
        $findProduct = SizeDetails::select('product_id')->wherein('size_id', $arr)->get();
        foreach($findProduct as $key => $value){
            if (!in_array(Product::find($value->product_id), $arr_product)) {
                $arr_product[] = Product::find($value->product_id)->get();
            }
        }
        return $arr_product;
      
     }

    public function updateQuantityAfterOrder(Request $request, $id){
        $findPro = Product::find($id);
        $updateQuantity = $findPro->product_quantity - $request->product_quantity;
        
        $findPro->update(['product_quantity'=>$updateQuantity]);
        return response()->json('C???p nh???t th??nh c??ng', 200);
    }
}
