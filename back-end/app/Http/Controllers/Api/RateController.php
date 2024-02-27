<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Rate;
use App\Services\RateService;
use Illuminate\Http\Request;

class RateController extends Controller
{
    private $rateService;
    public function __construct(RateService $rateService)
    {
        $this->middleware('auth:sanctum')->only(['store', 'destroy']);
        $this->rateService = $rateService;
    }
    /**
     * Display a listing of the resource.
     */
    public function index(string $id)
    {
        try {
            return $this->rateService->index($id);
        } catch (\Throwable $th) {
            throw $th;
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'idItens' => 'required'
        ]);
        try {
            return $this->rateService->store($data);
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
            return $this->rateService->destroy($id);
        } catch (\Throwable $th) {
            throw $th;
        }
    }
}
