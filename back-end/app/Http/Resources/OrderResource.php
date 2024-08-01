<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class OrderResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        // return parent::toArray($request);
        return [
            'idOrder' => $this->idOrder,
            'qtdOrder' => $this->qtdOrder,
            'valueOrder' => $this->valueOrder,
            'updated_at' => $this->updated_at,
            'numberMesa' => $this->menu->mesa->numberMesa ?? null,
            'itens' => new ItensResouce($this->itens),
        ];
    }
}
