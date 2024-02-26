<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Itens extends Model
{
    use HasFactory;

    protected $primaryKey = "idItens";
    protected $table = "itens";
    protected $fillable = [
        'codigo',
        'title',
        'desc',
        'value',
        'statusIten',
        'qtdIten',
        'slug',
        'rate',
        'urlImage',
        'idCategory',
        'waitTime',
    ];
}
