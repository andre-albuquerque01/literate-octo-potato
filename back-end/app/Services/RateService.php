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

    public function showLikeUser(string $id)
    {
        try {
            $idUser = $this->user->idUser;
            $rate = Rate::where('idUser', $idUser)->where('idItens', $id)->get();
            if ($rate->isNotEmpty())
                return response()->json(['data' => 'true']);
            return response()->json(['data' => 'false']);
        } catch (\Throwable $th) {
            throw $th;
        }
    }
    public function store(array $data)
    {
        try {
            $data['idUser'] = $this->user->idUser;
            $exist = Rate::where('idUser', $data['idUser'])->where('idItens', $data['idItens'])->first();
            
            if ($exist) {
                return response()->json(['message' => 'Já avaliou'], 400);
            }

            Rate::create($data);
            return response()->json(['message' => 'sucess'], 200);
        } catch (\Throwable $th) {
            throw $th;
        }
    }
    public function destroy(string $id)
    {
        try {
            Rate::where('idItens', $id)->delete();
            return response()->json(['message' => 'sucess'], 200);
        } catch (\Throwable $th) {
            throw $th;
        }
    }
}
