<?php

namespace App\Http\Controllers\Api;

use App\Exceptions\UserException;
use App\Http\Controllers\Controller;
use App\Http\Requests\RecoverPasswordRequest;
use App\Http\Requests\UpdateFunctionUserRequest;
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
        $this->middleware('auth:sanctum')->only(['show', 'showNameUser', 'update', 'destroy', 'updateRole', 'updatePasswordUser']);
    }

    public function store(UserRequest $request)
    {
        try {
            return $this->userService->store($request->validated());
        } catch (\Exception $e) {
            return $e->getMessage();
        }
    }

    public function show()
    {
        try {
            return $this->userService->show();
        } catch (\Exception $e) {
            return $e->getMessage();
        }
    }

    public function showNameUser()
    {
        try {
            return $this->userService->showNameUser();
        } catch (\Exception $e) {
            return $e->getMessage();
        }
    }

    public function update(UserRequest $request)
    {
        try {
            return $this->userService->update($request->validated());
        } catch (\Exception $e) {
            return $e->getMessage();
        }
    }

    public function updatePasswordUser(UserUpdatePassword $request)
    {
        try {
            return $this->userService->updatePasswordUser($request->validated());
        } catch (\Exception $e) {
            return $e->getMessage();
        }
    }

    public function updateRole(UpdateFunctionUserRequest $request)
    {
        try {
            return $this->userService->updateRole($request->validated());
        } catch (\Exception $e) {
            return $e->getMessage();
        }
    }

    public function destroy()
    {
        try {
            return $this->userService->destroy();
        } catch (\Exception $e) {
            return $e->getMessage();
        }
    }

    public function verifyEmail(string $id, string $token)
    {
        try {
            return $this->userService->verifyEmail($id, $token);
        } catch (UserException $e) {
            throw new UserException();
        }
    }

    public function reSendEmail(Request $request)
    {
        try {
            $request->validate([
                'email' => 'required|email'
            ]);
            return $this->userService->reSendEmail($request->email);
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

    public function resetPassword(RecoverPasswordRequest $request)
    {
        try {
            return $this->userService->resetPassword($request->validated());
        } catch (\Exception $e) {
            return $e->getMessage();
        }
    }
}
