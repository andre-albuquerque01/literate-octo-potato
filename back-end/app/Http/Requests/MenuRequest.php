<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class MenuRequest extends FormRequest
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
            "idMesa" => "required",
            "idItens" => "nullable",
            "statusOrder" => "required",
            "quantidade" => "nullable",
            "methodPay" => "nullable",
            "value" => "nullable",
        ];

        if ($this->method() == 'PUT' || $this->method() == 'PATCH') {
            $rules['idItens'] = [
                "required",
            ];
            $rules['quantidade'] = [
                "required",
            ];
            $rules['methodPay'] = [
                "required",
            ];
            $rules['value'] = [
                "required",
            ];
        }

        return $rules;
    }
}