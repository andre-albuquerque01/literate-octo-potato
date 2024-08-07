<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Mesa extends Model
{
    use HasFactory;

    protected $table = "mesa";
    protected $primaryKey = "idMesa";
    protected $fillable = [
        'numberMesa',
        'lotacao',
        'statusMesa',
    ];

    public function menu()
    {
        return $this->hasOne(Menu::class, 'idMesa', 'idMesa');
    }
}
