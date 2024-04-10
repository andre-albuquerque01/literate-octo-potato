<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\UpdateFunctionUserRequest;
use App\Http\Requests\UpdatePasswordRequest;
use App\Http\Requests\UserRequest;
use App\Http\Requests\UserUpdatePassword;
use App\Services\UserService;
use Illuminate\Http\Request;

class UserController extends Controller
{
    private $userService;
    public function __construct(UserService $userService)
    {
        $this->userService = $userService;
        $this->middleware('auth:sanctum')->only(['show', 'update', 'destroy', 'updateRole', 'updatePasswordUser']);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(UserRequest $request)
    {
        try {
            $data = $request->validated();
            return $this->userService->store($data);
        } catch (\Exception $e) {
            return $e->getMessage();
        }
    }

    /**
     * Display the specified resource.
     */
    public function show()
    {
        try {
            return $this->userService->show();
        } catch (\Exception $e) {
            return $e->getMessage();
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UserRequest $request)
    {
        try {
            $validet = $request->validated();
            return $this->userService->update($validet);
        } catch (\Exception $e) {
            return $e->getMessage();
        }
    }

    public function updatePasswordUser(UserUpdatePassword $request)
    {
        try {
            $validet = $request->validated();
            return $this->userService->updatePasswordUser($validet);
        } catch (\Exception $e) {
            return $e->getMessage();
        }
    }

    public function updateRole(UpdateFunctionUserRequest $request)
    {
        try {
            $validet = $request->validated();
            return $this->userService->updateRole($validet);
        } catch (\Exception $e) {
            return $e->getMessage();
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy()
    {
        try {
            return $this->userService->destroy();
        } catch (\Exception $e) {
            return $e->getMessage();
        }
    }

    public function verifyEmail(string $email)
    {
        try {
            return $this->userService->verifyEmail($email);
        } catch (\Exception $e) {
            return $e->getMessage();
        }
    }

    public function reSendEmail(Request $request)
    {
        try {
            $request->validate([
                'email' => 'required|email'
            ]);
            return $this->userService->sendsEmail($request->email, 'Verificação do e-mail');
        } catch (\Exception $e) {
            return $e->getMessage();
        }
    }

    public function sendTokenRecover(Request $request)
    {
        try {
            $request->validate([
                'email' => 'required|email'
            ]);
            return $this->userService->sendTokenRecover($request->email);
        } catch (\Exception $e) {
            return $e->getMessage();
        }
    }

    public function verifyTokenRecover(Request $request)
    {
        try {
            $request->validate([
                'token' => 'required'
            ]);
            return $this->userService->verifyTokenRecover($request->token);
        } catch (\Exception $e) {
            return $e->getMessage();
        }
    }

    public function updatePassword(UpdatePasswordRequest $request, string $token)
    {
        try {
            $data = $request->validated();
            return $this->userService->updatePassword($data, $token);
        } catch (\Exception $e) {
            return $e->getMessage();
        }
    }
}
