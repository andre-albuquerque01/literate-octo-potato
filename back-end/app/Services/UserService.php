<?php

namespace App\Services;

use App\Http\Resources\UserResource;
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
            User::create($data);
            return response()->json(['message:' => 'Sucess'], 200);
        } catch (\Exception $e) {
            return $e->getMessage();
        }
    }

    public function show(string $id)
    {
        try {
            $find = User::findOrFail($id);
            return new UserResource($find);
        } catch (\Exception $e) {
            return $e->getMessage();
        }
    }
}
