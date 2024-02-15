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
        return [
            'title' => 'required|min:2|max:60',
            'desc' => 'required|min:2|max:255',
            'value' => 'required|min:2|max:8',
            'statusIten' => 'required|',
            'qtdIten' => 'required|min:1|max:100',
            'slug' => 'required|min:1|max:100',
            'rate' => 'required|min:1|max:100',
            'urlImage' => 'required|min:1|max:100',
        ];
    }
}
