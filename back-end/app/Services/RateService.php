<?php

namespace App\Services;

use App\Exceptions\RateException;
use App\Http\Resources\GeneralResource;
use App\Http\Resources\RateResource;
use App\Models\Rate;
use Illuminate\Support\Facades\DB;

class RateService
{
    public function index(string $id)
    {
        try {
            $rate = Rate::select('idItens', DB::raw('COUNT(*) as count'))->groupBy('idItens')->where('idItens', $id)->get();
            return new RateResource($rate);
        } catch (\Exception $e) {
            throw new RateException($e->getMessage());
        }
    }

    public function showLikeUser(string $id)
    {
        try {
            $exists = Rate::where('idUser', auth()->user()->idUser)->where('idItens', $id)->exists();
            if ($exists) {
                return new GeneralResource(['data' => 'true']);
            }
            return new GeneralResource(['data' => 'false']);
        } catch (\Exception $e) {
            throw new RateException($e->getMessage());
        }
    }

    public function store(array $data)
    {
        try {
            $exist = Rate::where('idUser', auth()->user()->idUser)->where('idItens', $data['idItens'])->first();

            if ($exist) {
                return new GeneralResource(['message' => 'Já avaliou']);
            }

            auth()->user()->rates()->create($data);
            return new GeneralResource(['message' => 'success']);
        } catch (\Exception $e) {
            throw new RateException($e->getMessage());
        }
    }
    public function destroy(string $id)
    {
        try {
            Rate::where('idUser', auth()->user()->idUser)->where('idItens', $id)->delete();
            return new GeneralResource(['message' => 'success']);
        } catch (\Exception $e) {
            throw new RateException($e->getMessage());
        }
    }
}
