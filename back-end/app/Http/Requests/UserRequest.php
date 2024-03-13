<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Password;

class UserRequest extends FormRequest
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
            "firstName" => "required|min:3|max:60",
            "lastName" => "required|min:3|max:60",
            "DDD" => "required|min:2|max:3",
            "phoneNumber" => "required|min:8|max:12",
            "cpf" => "required|min:11|max:11|unique:users,cpf",
            "term_aceite" => "required",
            "email" => [
                "required",
                "email",
                "max:255",
                "min:2",
                "unique:users",
            ],
            "password" => [
                "required",
                "confirmed",
                Password::min(8)
                    ->mixedCase()
                    ->letters()
                    ->numbers()
                    ->symbols()
                    ->uncompromised(),
            ],
            "password_confirmation" => [
                "required",
                Password::min(8)
                    ->mixedCase()
                    ->letters()
                    ->numbers()
                    ->symbols()
                    ->uncompromised(),
            ],
        ];

        if ($this->method() == 'PATCH' || $this->method() == 'PUT') {
            $rules["firstName"] = [
                "nullable",
                "min:3",
                "max:60",
            ];
            $rules["lastName"] = [
                "nullable",
                "min:3",
                "max:60",
            ];
            $rules["DDD"] = [
                "nullable",
                "min:2",
                "max:3",
            ];
            $rules["phoneNumber"] = [
                "nullable",
                "min:8",
                "max:12",
            ];
            $rules["cpf"] = [
                'nullable',
                'min:11',
                'max:11',
            ];
            $rules["email"] = [
                "nullable",
                "email",
                "max:255",
                // "unique:users,email,{$this->idUser},idUser",
            ];
            $rules["term_aceite"] = [
                "nullable"
            ];
            $rules["password"] = [
                'required',
                Password::min(8)
                    ->mixedCase()
                    ->letters()
                    ->numbers()
                    ->symbols()
                    ->uncompromised(),
            ];
            $rules["password_confirmation"] = [
                'nullable',
            ];
        }

        return $rules;
    }
}
