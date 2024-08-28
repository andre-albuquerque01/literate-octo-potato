<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory, HasUlids;

    protected $table = "orders";
    protected $primarykey = "idOrder";
    protected $fillable = [
        'idItens',
        'idMenu',
        'qtdOrder',
        'valueOrder',
        'observation',
    ];

    public function itens()
    {
        return $this->belongsTo(Itens::class, 'idItens', 'idItens');
    }
    public function menu()
    {
        return $this->belongsTo(Menu::class, 'idMenu','idMenu');
    }
}
