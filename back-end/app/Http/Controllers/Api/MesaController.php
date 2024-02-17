<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\MesaRequest;
use App\Services\MesaService;

class MesaController extends Controller
{

    private $mesaService;

    public function __construct(MesaService $mesaService)
    {
        $this->mesaService = $mesaService;
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            return $this->mesaService->index();
        } catch (\Throwable $th) {
            throw $th;
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(MesaRequest $request)
    {
        try {
            $data = $request->validated();
            return $this->mesaService->store($data);
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
            return $this->mesaService->show($id);
        } catch (\Throwable $th) {
            throw $th;
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(MesaRequest $request, string $id)
    {
        try {
            $data = $request->validated();
            return $this->mesaService->update($data, $id);
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
            return $this->mesaService->destroy($id);
        } catch (\Throwable $th) {
            throw $th;
        }
    }
}
