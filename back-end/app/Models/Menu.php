<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Menu extends Model
{
    use HasFactory, HasUlids;

    protected $table = "menu";
    protected $primaryKey = "idMenu";
    protected $fillable = [
        'codigo',
        'idUser',
        'idMesa',
        'cpf',
        'statusOrder',
        'methodPay',
        'value',
        'desconto',
        'tip',
    ];

    public function mesa()
    {
        return $this->belongsTo(Mesa::class, 'idMesa');
    }
    public function orders(){
        return $this->hasMany(Order::class, 'idMenu');
    }
}
