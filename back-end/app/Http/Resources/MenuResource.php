<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class MenuResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'idMenu' => $this->idMenu,
            'codigo' => $this->codigo,
            'idUser' => $this->idUser,
            'numberMesa' => $this->numberMesa,
            'cpf' => $this->cpf,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            'idOrder' => $this->idOrder,

        ];
        // return parent::toArray($request);
    }
}
