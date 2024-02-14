<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UserService
{
    public function store(array $dados)
    {
        try {
            $data = $dados;
            $data['role'] = 'user';
            $data['password'] = Hash::make($data['password']);
            User::created($data);
            return response()->json(['message:' => 'Sucess'], 200);
        } catch (\Exception $e) {
            return $e->getMessage();
        }
    }
}
