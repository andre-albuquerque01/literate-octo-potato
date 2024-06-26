<?php

namespace App\Http\Controllers\Api;

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
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            return $this->menuService->index();
        } catch (\Throwable $th) {
            throw $th;
        }
    }

    public function showUser()
    {
        try {
            return $this->menuService->showUser();
        } catch (\Throwable $th) {
            throw $th;
        }
    }

    public function showHistoric()
    {
        try {
            return $this->menuService->showHistoric();
        } catch (\Throwable $th) {
            throw $th;
        }
    }

    public function showAll()
    {
        try {
            return $this->menuService->showAll();
        } catch (\Throwable $th) {
            throw $th;
        }
    }

    public function showAllOpenAndClose()
    {
        try {
            return $this->menuService->showAllOpenAndClose();
        } catch (\Throwable $th) {
            throw $th;
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(MenuRequest $request)
    {
        try {
            $data = $request->validated();
            return $this->menuService->store($data);
        } catch (\Throwable $th) {
            throw $th;
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        try {
            return $this->menuService->show($id);
        } catch (\Throwable $th) {
            throw $th;
        }
    }

    /**
     * Display the specified resource.
     */
    public function showCPF(string $cpf)
    {
        try {
            return $this->menuService->showCPF($cpf);
        } catch (\Throwable $th) {
            throw $th;
        }
    }

    /**
     * Display the specified resource.
     */
    public function showCodigo(string $codigo)
    {
        try {
            return $this->menuService->showCodigo($codigo);
        } catch (\Throwable $th) {
            throw $th;
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(MenuRequest $request, string $id)
    {
        try {
            $data = $request->validated();
            return $this->menuService->update($data, $id);
        } catch (\Throwable $th) {
            throw $th;
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        try {
            return $this->menuService->destroy($id);
        } catch (\Throwable $th) {
            throw $th;
        }
    }
}
