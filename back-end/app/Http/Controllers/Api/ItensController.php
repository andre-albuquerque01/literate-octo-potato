<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\ItensRequest;
use App\Services\ItensService;
use Illuminate\Http\Request;

class ItensController extends Controller
{
    private $itensService;
    public function __construct(ItensService $itensService)
    {
        $this->itensService = $itensService;
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

    /**
     * Store a newly created resource in storage.
     */
    public function store(ItensRequest $request)
    {
        try {
            $data = $request->validated();
            $this->itensService->store($data);
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
            $this->itensService->show($id);
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
            $this->itensService->update($data, $id);
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
