<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class MesaRequest extends FormRequest
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
            "numberMesa" => "required|unique:mesa",
            "lotacao" => "required|min:1",
            "statusMesa" => "required",
        ];

        if ($this->method() == 'PUT' || $this->method() == 'PATCH') {
            $rules['numberMesa'] = [
                "nullable",
            ];
            $rules['lotacao'] = [
                "nullable",
            ];
            $rules['statusMesa'] = [
                "required",
            ];
        }

        return $rules;
    }
}
