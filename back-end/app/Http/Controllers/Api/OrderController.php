<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Middleware\CheckAdminToken;
use App\Http\Requests\OrderRequest;
use App\Services\OrderService;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    private $orderService;
    public function __construct(OrderService $orderService)
    {
        $this->orderService = $orderService;
        $this->middleware(CheckAdminToken::class)->only(['showAll','store', 'show', 'update', 'destroy']);
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            return $this->orderService->index();
        } catch (\Throwable $th) {
            throw $th;
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(OrderRequest $request)
    {
        try {
            $data = $request->validated();
            return $this->orderService->store($data);
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
            return $this->orderService->show($id);
        } catch (\Throwable $th) {
            throw $th;
        }
    }

    public function getMenuOrder(string $id)
    {
        try {
            return $this->orderService->getMenuOrder($id);
        } catch (\Throwable $th) {
            throw $th;
        }
    }

    public function showMenuUser(string $id)
    {
        try {
            return $this->orderService->showMenuUser($id);
        } catch (\Throwable $th) {
            throw $th;
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(OrderRequest $request, string $id)
    {
        try {
            $data = $request->validated();
            return $this->orderService->update($data, $id);
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
            return $this->orderService->destroy($id);
        } catch (\Throwable $th) {
            throw $th;
        }
    }
}
