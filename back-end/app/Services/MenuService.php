<?php

namespace App\Services;

use App\Http\Resources\MenuResource;
use App\Http\Resources\MenuResource2;
use App\Models\Menu;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
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
            $user = Auth::user();
            $cpf = $user->cpf;
            $menu = Menu::join('mesa', 'mesa.idMesa', '=', 'menu.idMesa')->join('orders', 'menu.idMenu', '=', 'orders.idMenu')->join('itens', 'itens.idItens', '=', 'orders.idItens')->join('users', 'users.cpf', '=', 'menu.cpf')->where('menu.cpf', '=', $cpf)->get();
            return MenuResource::collection($menu);
        } catch (\Throwable $th) {
            throw $th;
        }
    }

    public function showUser()
    {
        try {
            $user = Auth::user();
            $cpf = $user->cpf;
            $menu = Menu::join('users', 'users.cpf', '=', 'menu.cpf')->where('menu.cpf', '=', $cpf)->where('menu.statusOrder', '=', 'aberto')->get();
            return MenuResource::collection($menu);
        } catch (\Throwable $th) {
            throw $th;
        }
    }
    public function showHistoric()
    {
        try {
            $user = Auth::user();
            $cpf = $user->cpf;
            $menu = Menu::join('users', 'users.cpf', '=', 'menu.cpf')->where('menu.cpf', '=', $cpf)->get();
            return MenuResource::collection($menu);
        } catch (\Throwable $th) {
            throw $th;
        }
    }
    public function showAll()
    {
        try {
            $menu = Menu::join('mesa', 'mesa.idMesa', '=', 'menu.idMesa')->where('menu.statusOrder', '=', 'aberto')->get();
            return MenuResource::collection($menu);
        } catch (\Throwable $th) {
            throw $th;
        }
    }

    public function showAllOpenAndClose()
    {
        try {
            $menu = Menu::join('mesa', 'mesa.idMesa', '=', 'menu.idMesa')->paginate(20);
            return MenuResource::collection($menu);
        } catch (\Throwable $th) {
            throw $th;
        }
    }

    public function store(array $data)
    {
        try {
            $data['codigo'] = strtoupper(Str::random(10));
            Menu::create($data);
            return response()->json(['message' => 'sucess'], 200);
        } catch (\Throwable $th) {
            throw $th;
        }
    }

    public function show(string $id)
    {
        try {
            $menu = Menu::find($id);
            return new MenuResource2($menu);
        } catch (\Throwable $th) {
            throw $th;
        }
    }

    public function showCPF(string $cpf)
    {
        try {
            $menu = Menu::join('mesa', 'mesa.idMesa', '=', 'menu.idMesa')->where('menu.cpf', 'LIKE', '%' . $cpf . '%')->paginate(20);
            return MenuResource::collection($menu);
        } catch (\Throwable $th) {
            throw $th;
        }
    }

    public function showCodigo(string $codigo)
    {
        try {
            $menu = Menu::where('codigo', $codigo);
            return new MenuResource2($menu);
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
