<?php

namespace App\Services;

use App\Http\Resources\RateResource;
use App\Models\Rate;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class RateService
{
    private $user;
    public function __construct(Request $request)
    {
        $this->user = $request->user();
    }
    public function index(string $id)
    {
        try {
            $rate = Rate::select('idItens', DB::raw('COUNT(*) as count'))->groupBy('idItens')->where('idItens', $id)->get();
            return new RateResource($rate);
        } catch (\Throwable $th) {
            throw $th;
        }
    }
    public function store(array $data)
    {
        try {
            $data['idUser'] = $this->user->idUser;
            Rate::create($data);
            return response()->json(['message' => 'sucess'], 200);
        } catch (\Throwable $th) {
            throw $th;
        }
    }
    public function destroy(string $id)
    {
        try {
            Rate::findOrFail($id)->delete();
            return response()->json(['message' => 'sucess'], 200);            
        } catch (\Throwable $th) {
            throw $th;
        }
    }
}
