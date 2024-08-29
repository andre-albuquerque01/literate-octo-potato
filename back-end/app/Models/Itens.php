<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Itens extends Model
{
    use HasFactory, HasUlids;

    protected $primaryKey = "idItens";
    protected $table = "itens";
    protected $fillable = [
        'codigo',
        'title',
        'description',
        'value',
        'statusIten',
        'qtdIten',
        'position',
        'urlImage',
        'idCategory',
        'waitTime',
    ];

    public function category()
    {
        return $this->belongsTo(Category::class, 'idCategory', 'idCategory');
    }
    public function rates()
    {
        return $this->hasMany(Rate::class, 'idItens', 'idItens');
    }
    public function orders()
    {
        return $this->hasMany(Order::class, 'idItens', 'idItens');
    }
}
