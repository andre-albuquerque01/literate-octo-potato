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
            'numberMesa' => $this->mesa->numberMesa ?? null, 
            'idMesa' => $this->idMesa,
            'cpf' => $this->cpf,
            'statusOrder' => $this->statusOrder,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            'orders' => OrderResource::collection($this->whenLoaded('orders')), 
        ];
        // return parent::toArray($request);
    }
}
