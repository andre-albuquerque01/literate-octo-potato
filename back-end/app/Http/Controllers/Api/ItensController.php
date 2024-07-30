<?php

namespace App\Http\Controllers\Api;

use App\Exceptions\ItenException;
use App\Http\Controllers\Controller;
use App\Http\Middleware\CheckAdminToken;
use App\Http\Requests\ItensRequest;
use App\Services\ItensService;
use Illuminate\Http\Request;

class ItensController extends Controller
{
    private $itensService;
    public function __construct(ItensService $itensService)
    {
        $this->itensService = $itensService;
        $this->middleware('auth:sanctum')->only(['store', 'update', 'destroy']);
        $this->middleware(CheckAdminToken::class)->only(['store', 'update', 'destroy']);
    }

    public function index()
    {
        try {
            return $this->itensService->index();
        } catch (\Exception $e) {
            throw new ItenException($e->getMessage());
        }
    }

    public function indexAll()
    {
        try {
            return $this->itensService->indexAll();
        } catch (\Exception $e) {
            throw new ItenException($e->getMessage());
        }
    }

    public function indexInitial()
    {
        try {
            return $this->itensService->indexInitial();
        } catch (\Exception $e) {
            throw new ItenException($e->getMessage());
        }
    }

    public function store(ItensRequest $request)
    {
        try {
            return $this->itensService->store($request->validated());
        } catch (\Exception $e) {
            throw new ItenException($e->getMessage());
        }
    }

    public function show(string $id)
    {
        try {
            return $this->itensService->show($id);
        } catch (\Exception $e) {
            throw new ItenException($e->getMessage());
        }
    }

    public function showTitle(string $title)
    {
        try {
            return $this->itensService->showTitle($title);
        } catch (\Exception $e) {
            throw new ItenException($e->getMessage());
        }
    }

    public function showCategory(string $typeCategory)
    {
        try {
            return $this->itensService->showCategory($typeCategory);
        } catch (\Exception $e) {
            throw new ItenException($e->getMessage());
        }
    }

    public function update(ItensRequest $request, string $id)
    {
        try {
            return $this->itensService->update($request->validated(), $id);
        } catch (\Exception $e) {
            throw new ItenException($e->getMessage());
        }
    }

    public function destroy(string $id)
    {
        try {
            return $this->itensService->destroy($id);
        } catch (\Exception $e) {
            throw new ItenException($e->getMessage());
        }
    }
}
