<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;
    protected $table = 'product';
    public $timestamps = false;
    protected $primaryKey = 'product_id';
    protected $fillable = [
        'product_id',
        'product_name',
        'product_quantity',
        'product_slug',
        'product_type_id',
        'brand_id',
        'unit',
        'unit_price',
        'promotion_price',
        'product_desc',
        'product_content',
        'product_image',
        'product_status'
        // 'created_at',
        // 'updated_at'
    ];
}
