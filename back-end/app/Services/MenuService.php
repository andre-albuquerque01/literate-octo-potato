<?php

namespace App\Services;

use App\Exceptions\MenuException;
use App\Http\Resources\GeneralResource;
use App\Http\Resources\MenuResource;
use App\Models\Menu;
use Illuminate\Support\Str;

class MenuService
{
    public function index()
    {
        try {
            $cpf = auth()->user()->cpf;
            $menu = Menu::with(['mesa',  'orders' => function ($query) {
                $query->whereNull('deleted_at');
            }, 'orders.itens'])
                ->where('cpf', $cpf)
                ->whereNull('deleted_at')
                ->get();
            return MenuResource::collection($menu);
        } catch (\Exception $e) {
            throw new MenuException($e->getMessage());
        }
    }

    public function showUser()
    {
        try {
            $cpf = auth()->user()->cpf;
            $menu = Menu::where('cpf', $cpf)
                ->where('menu.statusOrder', '=', 0)
                ->whereNull('deleted_at')
                ->get();
            return MenuResource::collection($menu);
        } catch (\Exception $e) {
            throw new MenuException($e->getMessage());
        }
    }
    public function showHistoric()
    {
        try {
            $cpf = auth()->user()->cpf;
            $menu = Menu::with(['mesa',  'orders' => function ($query) {
                $query->whereNull('deleted_at');
            }, 'orders.itens'])
                ->where('cpf', $cpf)
                ->whereNull('deleted_at')
                ->get();
            return MenuResource::collection($menu);
        } catch (\Exception $e) {
            throw new MenuException($e->getMessage());
        }
    }
    public function showAll()
    {
        try {
            $menu = Menu::with(['mesa',  'orders' => function ($query) {
                $query->whereNull('deleted_at');
            }, 'orders.itens'])
                ->where('menu.statusOrder', '=', 0)
                ->whereNull('deleted_at')
                ->get();
            return MenuResource::collection($menu);
        } catch (\Exception $e) {
            throw new MenuException($e->getMessage());
        }
    }

    public function showAllOpenAndClose()
    {
        try {
            $menu = Menu::with(['mesa',  'orders' => function ($query) {
                $query->whereNull('deleted_at');
            }, 'orders.itens'])
                ->whereNull('deleted_at')
                ->paginate(20);
            return MenuResource::collection($menu);
        } catch (\Exception $e) {
            throw new MenuException($e->getMessage());
        }
    }

    public function store(array $data)
    {
        try {
            $data['codigo'] = strtoupper(Str::random(10));
            Menu::create($data);
            return new GeneralResource(['message' => 'success']);
        } catch (\Exception $e) {
            throw new MenuException($e->getMessage());
        }
    }

    public function show(string $id)
    {
        try {
            $menu = Menu::findOrFail($id)->whereNull('deleted_at')->first();
            return new MenuResource($menu);
        } catch (\Exception $e) {
            throw new MenuException($e->getMessage());
        }
    }

    public function showCPF(string $cpf)
    {
        try {
            $menu = Menu::with(['mesa',  'orders' => function ($query) {
                $query->whereNull('deleted_at');
            }, 'orders.itens'])
                ->where('menu.cpf', 'LIKE', '%' . $cpf . '%')
                ->whereNull('deleted_at')
                ->paginate(20);
            return MenuResource::collection($menu);
        } catch (\Exception $e) {
            throw new MenuException($e->getMessage());
        }
    }

    public function showCPFOpen(string $cpf)
    {
        try {
            $menu = Menu::with(['mesa',  'orders' => function ($query) {
                $query->whereNull('deleted_at');
            }, 'orders.itens'])
                ->where('menu.cpf', 'LIKE', '%' . $cpf . '%')
                ->where('menu.statusOrder', '=', 0)
                ->whereNull('deleted_at');
            return MenuResource::collection($menu);
        } catch (\Exception $e) {
            throw new MenuException($e->getMessage());
        }
    }

    public function showCodigo(string $codigo)
    {
        try {
            $menu = Menu::where('codigo', $codigo)->whereNull('deleted_at');
            return new MenuResource($menu);
        } catch (\Exception $e) {
            throw new MenuException($e->getMessage());
        }
    }

    public function update(array $data, string $id)
    {
        try {
            Menu::where('idMenu', $id)->update($data);
            return new GeneralResource(['message' => 'success']);
        } catch (\Exception $e) {
            throw new MenuException($e->getMessage());
        }
    }

    public function destroy(string $id)
    {
        try {
            Menu::findOrFail($id)->touch('deleted_at');
            return new GeneralResource(['message' => 'success']);
        } catch (\Exception $e) {
            throw new MenuException($e->getMessage());
        }
    }
}
