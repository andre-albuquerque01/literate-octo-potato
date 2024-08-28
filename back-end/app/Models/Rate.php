<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Rate extends Model
{
    use HasFactory, HasUlids;
    protected $table = "rates";
    protected $primaryKey = "idRate";
    protected $fillable = [
        'idUser',
        'idItens'
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'idUser', 'idUser');
    }
    public function item()
    {
        return $this->belongsTo(Itens::class, 'idItens', 'idItens');
    }
}
