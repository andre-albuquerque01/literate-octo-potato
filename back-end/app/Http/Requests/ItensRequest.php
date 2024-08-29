<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ItensRequest extends FormRequest
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
            'title' => 'required|min:2|max:60|regex:/^[^<>]*$/',
            'description' => 'required|min:2|max:255|regex:/^[^<>]*$/',
            'value' => 'required|min:2|max:8|regex:/^[^<>]*$/',
            'qtdIten' => 'required|min:1|max:100|regex:/^[^<>]*$/',
            'urlImage' => 'required|min:1|regex:/^[^<>]*$/',
            'waitTime' => 'required|min:1|max:100|regex:/^[^<>]*$/',
            'position' => 'required|regex:/^[^<>]*$/',
            'idCategory' => 'required|regex:/^[^<>]*$/',
        ];

        if ($this->method() == 'PUT' || $this->method() == 'PATCH') {
            $rules['title'] = [
                "nullable",
                "min:2",
                "max:60",
            ];
            $rules['description'] = [
                "nullable",
                "min:2",
                "max:255",
            ];
            $rules['value'] = [
                "nullable",
                "min:1",
                "max:8",
            ];
            $rules['statusIten'] = [
                "nullable",
            ];
            $rules['qtdIten'] = [
                "nullable",
                "min:1",
                "max:100",
            ];
            $rules['urlImage'] = [
                "nullable",
                "min:1",
            ];
            $rules['waitTime'] = [
                "nullable",
            ];
            $rules['position'] = [
                "nullable",
            ];
            $rules['idCategory'] = [
                "nullable",
            ];
        }

        return $rules;
    }
}
