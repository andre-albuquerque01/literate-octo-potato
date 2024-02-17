<?php

namespace App\Services;

use App\Http\Resources\UserResource;
use App\Mail\VerifyEmail;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;

class UserService
{
    public function store(array $dados)
    {
        try {
            $data = $dados;
            $data['role'] = 'user';
            $data['password'] = Hash::make($data['password']);
            User::create($data);
            $this->sendsEmail($data['email']);
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

    public function sendsEmail(string $email)
    {
        try {
            Mail::to($email)->send(new VerifyEmail([
                'toEmail' => $email,
                'subject' => 'Verificação do e-mail',
                'message' => Crypt::encryptString($email)
            ]));
            return response()->json(['message' => 'sucess'], 200);
        } catch (\Throwable $th) {
            throw $th;
        }
    }

    public function verifyEmail(string $email)
    {
        try {
            User::where('email', Crypt::decryptString($email))->update([
                'email_verified_at' => now()
            ]);
            return response()->json(['message' => 'E-mail verificado'], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 400);
        }
    }

    public function update(array $dados, string $id)
    {
        try {
            $user = Auth::user();
            if ($user->idUser == $id)
                return response()->json(['message' => 'not found'], 404);

            $data = $dados;
            if (Hash::check($data['password'], $user->password)) {
                User::where('idUser', $id)->update($data);
                return response()->json(['message:' => 'Sucess'], 200);
            }
        } catch (\Exception $e) {
            return $e->getMessage();
        }
    }
    public function destroy(string $id)
    {
        try {
            $find = User::findOrFail($id)->delete();
            return response()->json(['message:' => 'Sucess'], 204);
        } catch (\Exception $e) {
            return $e->getMessage();
        }
    }
}
