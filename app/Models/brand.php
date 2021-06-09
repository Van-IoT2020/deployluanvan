<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class brand extends Model
{
    use HasFactory;
    public $timestamps = false;
    protected $table = "brand";
    protected $primaryKey = 'brand_id';
    protected $fillable = [
        'brand_name',
        'brand_slug',
        'brand_desc',
        'brand_status',
        'created_at',
        'update_at'
    ];

    public function product_func(){
        return $this->hasMany('App\Models\Product', 'brand_id', 'brand_id');
    }
}
