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
            "idMesa" => "required|regex:/^[^<>]*$/",
            "statusOrder" => "required|regex:/^[^<>]*$/",
            "cpf" => "required|regex:/^[^<>]*$/",
            "methodPay" => "nullable|regex:/^[^<>]*$/",
            "idUser" => "nullable|regex:/^[^<>]*$/",
            "value" => "nullable|regex:/^[^<>]*$/",
            "desconto" => "nullable|regex:/^[^<>]*$/",
            "tip" => "nullable|regex:/^[^<>]*$/",
        ];

        if ($this->method() == 'PUT' || $this->method() == 'PATCH') {
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
