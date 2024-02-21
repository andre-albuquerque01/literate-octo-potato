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
        try {
            $login = ['email' => $email, 'password' => $password];

            if (!Auth::attempt($login)) {
                throw new LoginInvalidException;
            }
            $user = Auth::user();
            $scopes = ($user->role == "admin") ? ['admin'] : ['user'];
            $token = $this->request->user()->createToken('user', $scopes, now()->addHours(2))->plainTextToken;
            if ($user->role == 'user') $role = 'u';
            elseif ($user->role == 'admin') $role = 'JesusIsKingADM';
            else $role = 'u';
            return new AuthLoginResource(['token' => $token, 'r' => $role]);
        } catch (\Exception $e) {
            throw $e;
        }
    }
}
