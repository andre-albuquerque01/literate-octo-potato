<?php

namespace App\Services;

use App\Http\Resources\ItensResouce;
use App\Models\Itens;
use Illuminate\Support\Str;

class ItensService
{
    public function index()
    {
        try {
            $iten = Itens::where('statusIten', '=', 1)->paginate();
            return ItensResouce::collection($iten);
        } catch (\Throwable $th) {
            throw $th;
        }
    }

    public function indexAll()
    {
        try {
            $iten = Itens::paginate();
            return ItensResouce::collection($iten);
        } catch (\Throwable $th) {
            throw $th;
        }
    }

    public function store(array $data)
    {
        try {
            $data['codigo'] = Str::random(10);
            Itens::create($data);
            return response()->json(['message' => 'sucess'], 200);
        } catch (\Throwable $th) {
            throw $th;
        }
    }

    public function show(string $id)
    {
        try {
            $iten = Itens::findOrFail($id);
            if ($iten === null) {
                throw new \Exception("Item not found");
            }
            return new ItensResouce($iten);
        } catch (\Throwable $th) {
            throw $th;
        }
    }
    public function showSlug(string $slug)
    {
        try {
            $iten = Itens::where('slug', $slug);
            if ($iten === null) {
                throw new \Exception("Item not found");
            }
            return ItensResouce::collection($iten);
        } catch (\Throwable $th) {
            throw $th;
        }
    }

    public function update(array $data, string $id)
    {
        try {
            Itens::where('idItens', '=', $id)->update($data);
            return response()->json(['message' => 'sucess'], 200);
        } catch (\Throwable $th) {
            throw $th;
        }
    }

    public function destroy(string $id)
    {
        try {
            Itens::findOrFail($id)->delete();
            return response()->json(['message' => 'sucess'], 204);
        } catch (\Throwable $th) {
            throw $th;
        }
    }
}
