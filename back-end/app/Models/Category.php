<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    use HasFactory, HasUlids;

    protected $table = "categories";
    protected $primaryKey = "idCategory";
    protected $fillable = [
        'typeCategory',
        'urlImageCategory'
    ];

    public function items()
    {
        return $this->hasMany(Itens::class, 'idCategory', 'idCategory');
    }
}
