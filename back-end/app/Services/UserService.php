<?php

namespace App\Services;

use App\Exceptions\GeneralExceptionCatch;
use App\Exceptions\UserException;
use App\Http\Resources\GeneralResource;
use App\Http\Resources\UserResource;
use App\Jobs\SendRecoverPasswordEmailJob;
use App\Jobs\SendVerifyEmailJob;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class UserService
{
    public function store(array $data)
    {
        try {
            $data['role'] = 'user';
            $data['password'] = Hash::make($data['password']);
            $data['remember_token'] = Str::random(60);
            $user = User::create($data);

            dispatch(new SendVerifyEmailJob($user->email, $user->remember_token, $user->idUser));

            return new GeneralResource(['message' => 'success']);
        } catch (\Exception $e) {
            throw new GeneralExceptionCatch($e->getMessage());
        }
    }

    public function show()
    {
        try {
            $find = User::findOrFail(auth()->user()->idUser)->whereNull('deleted_at')->first();
            return new UserResource($find);
        } catch (\Exception $e) {
            throw new GeneralExceptionCatch($e->getMessage());
        }
    }

    public function update(array $dados)
    {
        try {
            $user = Auth::user();
            $data = $dados;
            if (!Hash::check($data['password'], $user->password)) {
                return new GeneralResource(['message' => 'incorrect password']);
            }
            $data['password'] = $user->password;
            User::where('idUser', $user->idUser)->update($data);
            return new GeneralResource(['message' => 'success']);
        } catch (\Exception $e) {
            throw new GeneralExceptionCatch($e->getMessage());
        }
    }

    public function destroy()
    {
        try {
            User::findOrFail(auth()->user()->idUser)->touch('deleted_at');
            return new GeneralResource(['message' => 'success']);
        } catch (\Exception $e) {
            throw new GeneralExceptionCatch($e->getMessage());
        }
    }

    public function showNameUser()
    {
        try {
            $user = Auth::user();
            return new GeneralResource(['name' => $user->firstName]);
        } catch (\Exception $e) {
            throw new GeneralExceptionCatch($e->getMessage());
        }
    }

    public function updatePasswordUser(array $dados)
    {
        try {
            $user = Auth::user();
            $data = $dados;
            if (
                Hash::check($data['password'], $user->password)
                && $data['password_new'] === $data['password_confirmation']
            ) {
                $data['password'] = Hash::make($data['password_new']);
                User::where('idUser', $user->idUser)->update([
                    'password' => $data['password'],
                    'updated_at' => now(),
                ]);
                return new GeneralResource(['message' => 'success']);
            }
        } catch (\Exception $e) {
            throw new GeneralExceptionCatch($e->getMessage());
        }
    }

    public function updateRole(array $data)
    {
        try {
            User::where('cpf', $data['cpf'])->update($data);
            return new GeneralResource(['message' => 'success']);
        } catch (\Exception $e) {
            throw new GeneralExceptionCatch($e->getMessage());
        }
    }


    public function verifyEmail(string $id, string $token)
    {
        try {
            $user = User::findOrFail($id);
            if ($token == $user->remember_token) {
                $user->touch("email_verified_at");
                return new GeneralResource(['message' => 'success']);
            }
            throw new UserException("Token invalid");
        } catch (UserException $e) {
            throw new UserException();
        }
    }

    public function reSendEmail(string $email)
    {
        try {
            $user = User::where('email', $email)->first();
            if (!$user) throw new UserException('user not found');
            dispatch(new SendVerifyEmailJob($user->email, $user->remember_token, $user->idUser));
            return new GeneralResource(['message' => 'send e-mail']);
        } catch (\Exception $e) {
            throw new GeneralExceptionCatch($e->getMessage());
        }
    }

    public function sendTokenRecover(string $email)
    {
        try {
            $user = User::where('email', $email)->first();
            if (!$user) throw new UserException('user not found');

            $token = strtoupper(Str::random(60));
            $table = DB::table('password_reset_tokens')->where('email', $email)->first();
            if (!$table) {
                DB::table('password_reset_tokens')->insert([
                    'email' => $email,
                    'token' => $token,
                    'created_at' => now(),
                ]);
            } else {
                DB::table('password_reset_tokens')->update([
                    'token' => $token,
                    'created_at' => now(),
                ]);
            }
            dispatch(new SendRecoverPasswordEmailJob($user->email, $token));
            return new GeneralResource(['message' => 'send e-mail']);
        } catch (\Exception $e) {
            throw new GeneralExceptionCatch($e->getMessage());
        }
    }
    public function resetPassword(array $data)
    {
        try {
            $passwordResetTokens = DB::table('password_reset_tokens')->where('token', $data['token'])->first();
            if (!isset($passwordResetTokens)) throw new UserException("Token invalid");

            User::where('email', $passwordResetTokens->email)->update([
                'password' => Hash::make($data['password']),
            ]);
            DB::table('password_reset_tokens')->where('token', $data['token'])->delete();
            return new GeneralResource(['message' => 'success']);
        } catch (\Exception $e) {
            throw new UserException('', $e->getCode(), $e);
        }
    }
}
