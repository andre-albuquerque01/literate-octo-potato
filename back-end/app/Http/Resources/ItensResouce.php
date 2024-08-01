<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ItensResouce extends JsonResource
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
            'idItens' => $this->idItens,
            'title' => $this->title,
            'desc' => $this->desc,
            'value' => $this->value,
            'qtdIten' => $this->qtdIten,
            'position' => $this->position,
            'urlImage' => $this->urlImage,
            'waitTime' => $this->waitTime,
            'category' => new CategoryResource($this->category),
        ];
    }
}
