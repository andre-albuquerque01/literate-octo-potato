<?php

namespace App\Http\Controllers\Api;

use App\Exceptions\MesaException;
use App\Http\Controllers\Controller;
use App\Http\Middleware\CheckAdminToken;
use App\Http\Requests\MesaRequest;
use App\Services\MesaService;

class MesaController extends Controller
{

    private $mesaService;

    public function __construct(MesaService $mesaService)
    {
        $this->mesaService = $mesaService;
        $this->middleware(CheckAdminToken::class)->only(['index', 'store', 'show', 'update', 'destroy']);
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            return $this->mesaService->index();
        } catch (\Exception $e) {
            throw new MesaException($e->getMessage());
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(MesaRequest $request)
    {
        try {
            return $this->mesaService->store($request->validated());
        } catch (\Exception $e) {
            throw new MesaException($e->getMessage());
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        try {
            return $this->mesaService->show($id);
        } catch (\Exception $e) {
            throw new MesaException($e->getMessage());
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(MesaRequest $request, string $id)
    {
        try {
            return $this->mesaService->update($request->validated(), $id);
        } catch (\Exception $e) {
            throw new MesaException($e->getMessage());
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        try {
            return $this->mesaService->destroy($id);
        } catch (\Exception $e) {
            throw new MesaException($e->getMessage());
        }
    }
}
