<?php

namespace App\Http\Controllers\Auth;

use App\Exceptions\LoginInvalidException;
use App\Http\Controllers\Controller;
use App\Http\Requests\AuthLoginRequest;
use App\Http\Resources\GeneralResource;
use App\Services\AuthService;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    private $authService;

    public function __construct(AuthService $authService)
    {
        $this->authService = $authService;
    }

    public function login(AuthLoginRequest $request)
    {
        try {
            return $this->authService->login($request->validated());
        } catch (\Exception $e) {
            throw new LoginInvalidException('Error');
        }
    }

    public function logout(Request $request)
    {
        try {
            $request->user()->currentAccessToken()->delete();
            return new GeneralResource(['message' => 'success']);
        } catch (\Exception $e) {
            throw new LoginInvalidException('Error');
        }
    }
}
