<?php

namespace App\Services;

use App\Http\Resources\UserResource;
use App\Mail\RecoverPassword;
use App\Mail\VerifyEmail;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;

class UserService
{

    public function sendsEmail(string $email, string $assunto)
    {
        try {
            if (User::where('email', $email)->exists()) {
                Mail::to($email)->send(new VerifyEmail([
                    'toEmail' => $email,
                    'subject' => $assunto,
                    'message' => Crypt::encryptString($email)
                ]));
                return response()->json(['message' => 'sucess'], 200);
            }
            return response()->json(['message' => 'E-mail não cadastrado.'], 200);
        } catch (\Throwable $th) {
            throw $th;
        }
    }

    public function sendsEmailRecoverPassword(string $email, string $assunto, string $token,)
    {
        try {
            Mail::to($email)->send(new RecoverPassword([
                'toEmail' => $email,
                'subject' => $assunto,
                'message' => $token,
                'expiration_hours' => "10 minutos"
            ]));
            return response()->json(['message' => 'sucess'], 200);
        } catch (\Throwable $th) {
            throw $th;
        }
    }

    public function store(array $dados)
    {
        try {
            $data = $dados;
            $data['role'] = 'user';
            $data['password'] = Hash::make($data['password']);
            $user = User::create($data);
            if ($user->firstName !== '') {
                $this->sendsEmail($data['email'], 'Verificação do e-mail');
            }
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

    public function verifyEmail(string $email)
    {
        try {
            User::where('email', '=', Crypt::decryptString($email))->update([
                'email_verified_at' => now(),
            ]);
            return response()->json(['message' => 'E-mail verificado'], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 400);
        }
    }

    public function sendTokenRecover(string $email)
    {
        try {
            if (User::where('email', $email)->first()) {
                $token = strtoupper(Str::random(6));
                if (DB::table('password_reset_tokens')->where('email', $email)->first() == null) {
                    DB::table('password_reset_tokens')->insert([
                        'email' => $email,
                        'token' => $token,
                        'created_at' => now(),
                    ]);
                } else {
                    DB::table('password_reset_tokens')->insert([
                        'token' => $token,
                        'created_at' => now(),
                    ]);
                }
                $this->sendsEmailRecoverPassword($email, 'Redefinir senha', $token);
                return response()->json(['message' => 'send e-mail'], 200);
            }
            return response()->json(['error' => 'E-mail desconhecido'], 400);
        } catch (\Throwable $th) {
            throw $th;
        }
    }

    public function verifyTokenRecover(string $token)
    {
        try {
            $user = DB::table('password_reset_tokens')->where('token', $token)->first();
            if ($user) {
                $expiration = (Carbon::make($user->created_at))->addMinutes(10);
                if (now()->greaterThanOrEqualTo($expiration)) {
                    return response()->json(['message' => 'token expirado'], 400);
                } else {
                    $tokenCript = Crypt::encryptString($token);
                    return response()->json(['token' => $tokenCript], 200);
                }
            } else {
                return response()->json(['error' => 'Error, token invalido'], 400);
            }
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 401);
        }
    }

    public function updatePassword(array $data, string $token)
    {
        try {
            $decriptToken = Crypt::decryptString($token);
            $check = DB::table('password_reset_tokens')->where('token', $decriptToken)->first();
            $expiration = (Carbon::make($check->created_at))->addMinutes(10);
            if (now()->greaterThanOrEqualTo($expiration)) {
                return response()->json(['message' => 'token expirado'], 400);
            } else {
                if ($check) {
                    User::where('email', $check->email)->update([
                        'password' => Hash::make($data['password'])
                    ]);
                    return response()->json(['message' => 'sucess'], 200);
                } else {
                    return response()->json(['error' => 'Error, token invalido'], 400);
                }
            }
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 401);
        }
    }
}
