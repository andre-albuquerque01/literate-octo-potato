<?php

namespace App\Services;

use App\Http\Resources\MenuResource;
use App\Models\Menu;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class MenuService
{
    private $user;

    public function __construct(Request $request)
    {
        $this->user = $request->user();
    }

    public function index()
    {
        try {
            $menu = Menu::join('mesa', 'mesa.idMesa', '=', 'menu.idMesa')->join('orders', 'itens.idItens', '=', 'orders.idOrder')->join('itens', 'itens.idItens', '=', 'orders.idItens')->join('users', 'users.idUser', '=', 'menu.idUser')->where('menu.cpf', '=', $this->user->cpf)->paginate();
            return MenuResource::collection($menu);
        } catch (\Throwable $th) {
            throw $th;
        }
    }

    public function store(array $data)
    {
        try {
            $data['codigo'] = strtoupper(Str::random(10));
            $data['idUser'] = $this->user->idUser;
            Menu::create($data);
            return response()->json(['message' => 'sucess'], 200);
        } catch (\Throwable $th) {
            throw $th;
        }
    }

    public function show(string $id)
    {
        try {
            $menu = Menu::findOrFail($id);
            return new MenuResource($menu);
        } catch (\Throwable $th) {
            throw $th;
        }
    }

    public function showCPF(string $cpf)
    {
        try {
            $menu = Menu::join('users', 'user.idUser', '=', 'menu.idUser')->where('user.idUser', $cpf);
            return new MenuResource($menu);
        } catch (\Throwable $th) {
            throw $th;
        }
    }

    public function showCodigo(string $codigo)
    {
        try {
            $menu = Menu::where('codigo', $codigo);
            return new MenuResource($menu);
        } catch (\Throwable $th) {
            throw $th;
        }
    }

    public function update(array $data, string $id)
    {
        try {
            Menu::where('idMenu', $id)->update($data);
            return response()->json(['message' => 'sucess'], 200);
        } catch (\Throwable $th) {
            throw $th;
        }
    }

    public function destroy(string $id)
    {
        try {
            Menu::findOrFail($id)->delete();
            return response()->json(['message' => 'sucess'], 204);
        } catch (\Throwable $th) {
            throw $th;
        }
    }
}
