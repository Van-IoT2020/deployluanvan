<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class categories extends Model
{
    use HasFactory;
    public $timestamps = false;
    protected $table = "categories";
    protected $primaryKey = 'categories_id';
    protected $fillable = [
        'categories_name',
        'created_at',
        'update_at'
    ];
}
