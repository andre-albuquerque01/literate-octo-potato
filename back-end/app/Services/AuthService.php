<?php

namespace App\Services;

use App\Exceptions\LoginInvalidException;
use App\Http\Resources\AuthLoginResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthService
{
    private $request;
    public function __construct(Request $request)
    {
        $this->request = $request;
    }

    public function login(string $email, string $password)
    {
        $login = ['email' => $email, 'password' => $password];

        if (!Auth::attempt($login)) {
            throw new LoginInvalidException;
        }
        $token = $this->request->user()->createToken('user', ['*'], now()->addHours(2))->plainTextToken;
        return new AuthLoginResource(['token' => $token]);
    }
}
