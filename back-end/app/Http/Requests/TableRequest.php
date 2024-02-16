<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class TableRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return false;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $rules = [
            "numberTable" => "requerid|unique:table",
            "statusTable" => "requerid",
        ];

        if ($this->method() == 'PUT' || $this->method() == 'PATCH') {
            $rules['numberTable'] = [
                "nullable",
            ];
            $rules['statusTable'] = [
                "required",
            ];
        }

        return $rules;
    }
}
