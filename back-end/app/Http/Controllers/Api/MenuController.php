<?php

namespace App\Http\Controllers\Api;

use App\Exceptions\MenuException;
use App\Http\Controllers\Controller;
use App\Http\Middleware\CheckAdminToken;
use App\Http\Requests\MenuRequest;
use App\Services\MenuService;
use Illuminate\Http\Request;

class MenuController extends Controller
{
    private $menuService;

    public function __construct(MenuService $menuService)
    {
        $this->menuService = $menuService;
        $this->middleware(CheckAdminToken::class)->only(['store', 'showAll', 'show', 'showCPF', 'showAllOpenAndClose', 'showCodigo', 'update', 'destroy']);
    }

    public function index()
    {
        try {
            return $this->menuService->index();
        } catch (\Exception $e) {
            throw new MenuException($e->getMessage());
        }
    }

    public function showUser()
    {
        try {
            return $this->menuService->showUser();
        } catch (\Exception $e) {
            throw new MenuException($e->getMessage());
        }
    }

    public function showHistoric()
    {
        try {
            return $this->menuService->showHistoric();
        } catch (\Exception $e) {
            throw new MenuException($e->getMessage());
        }
    }

    public function showAll()
    {
        try {
            return $this->menuService->showAll();
        } catch (\Exception $e) {
            throw new MenuException($e->getMessage());
        }
    }

    public function showAllOpenAndClose()
    {
        try {
            return $this->menuService->showAllOpenAndClose();
        } catch (\Exception $e) {
            throw new MenuException($e->getMessage());
        }
    }


    public function store(MenuRequest $request)
    {
        try {
            $data = $request->validated();
            return $this->menuService->store($data);
        } catch (\Exception $e) {
            throw new MenuException($e->getMessage());
        }
    }

    public function show(string $id)
    {
        try {
            return $this->menuService->show($id);
        } catch (\Exception $e) {
            throw new MenuException($e->getMessage());
        }
    }

    public function showCPF(string $cpf)
    {
        try {
            return $this->menuService->showCPF($cpf);
        } catch (\Exception $e) {
            throw new MenuException($e->getMessage());
        }
    }

    public function showCodigo(string $codigo)
    {
        try {
            return $this->menuService->showCodigo($codigo);
        } catch (\Exception $e) {
            throw new MenuException($e->getMessage());
        }
    }

    public function update(MenuRequest $request, string $id)
    {
        try {
            $data = $request->validated();
            return $this->menuService->update($data, $id);
        } catch (\Exception $e) {
            throw new MenuException($e->getMessage());
        }
    }

    public function destroy(string $id)
    {
        try {
            return $this->menuService->destroy($id);
        } catch (\Exception $e) {
            throw new MenuException($e->getMessage());
        }
    }
}
