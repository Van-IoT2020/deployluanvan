<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductType extends Model
{
    public $timestamps = false;
    protected $table = 'product_type'; //sync table name
    protected $primaryKey = 'product_type_id';
    protected $fillable=[
        'categories_id',
        'product_type_name',
        'meta_keywords',
        'product_type_slug',
        'product_type_desc',
        'product_type_status',
        'create_at',
        'update_at'
    ];
    public function categories(){
        return $this->belongsTo('Categories::class','categories_id');
    }
    public function product(){
        return $this->hasMany(Product::class, 'product_id');
    }
}
