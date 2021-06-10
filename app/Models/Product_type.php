<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product_type extends Model
{
    use HasFactory;
    protected $table = 'product_type';
    public $timestamps = false;
    protected $primaryKey = 'product_type_id';
    protected $fillable = [
        'product_type_name',
        'categories_id',
        'meta_keywords',
        'product_type_slug ',
        'product_type_desc',
        'product_type_status'
    ];
}
