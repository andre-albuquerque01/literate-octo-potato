<?php

namespace App\Http\Controllers\Api;

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
        // $this->middleware('auth:sanctum')->only(['store', 'update', 'destroy']);
        // $this->middleware(CheckAdminToken::class)->only(['store', 'update', 'destroy']);
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            return $this->itensService->index();
        } catch (\Throwable $th) {
            throw $th;
        }
    }

    public function indexAll()
    {
        try {
            return $this->itensService->indexAll();
        } catch (\Throwable $th) {
            throw $th;
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(ItensRequest $request)
    {
        try {
            $data = $request->validated();
            return $this->itensService->store($data);
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
            return $this->itensService->show($id);
        } catch (\Throwable $th) {
            throw $th;
        }
    }

    public function showSlug(string $slug)
    {
        try {
            return $this->itensService->showSlug($slug);
        } catch (\Throwable $th) {
            throw $th;
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(ItensRequest $request, string $id)
    {
        try {
            $data = $request->validated();
            return $this->itensService->update($data, $id);
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
            return $this->itensService->destroy($id);
        } catch (\Throwable $th) {
            throw $th;
        }
    }
}
