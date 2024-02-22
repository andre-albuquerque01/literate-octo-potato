<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class OrderRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $rules = [
            "idMenu" => "required",
            "quantidade" => "nullable",
            "idItens" => "nullable",
        ];

        if ($this->method() == 'PUT' || $this->method() == 'PATCH') {
            $rules['quantidade'] = [
                "required",
            ];
            $rules['idMenu'] = [
                "required",
            ];
            $rules['idItens'] = [
                "required",
            ];
        }

        return $rules;
    }
}
