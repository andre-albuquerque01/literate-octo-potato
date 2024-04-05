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
            $iten = Itens::join('categories', 'categories.idCategory', '=', 'itens.idCategory')->where('statusIten', '=', 1)->get();
            return ItensResouce::collection($iten);
        } catch (\Throwable $th) {
            throw $th;
        }
    }

    public function indexAll()
    {
        try {
            $iten = Itens::paginate(16);
            return ItensResouce::collection($iten);
        } catch (\Throwable $th) {
            throw $th;
        }
    }

    public function store(array $data)
    {
        try {
            $data['codigo'] = strtoupper(Str::random(10));
            $data['statusIten'] = 1;
            $data['title'] = strtolower($data['title']);
            $data['desc'] = strtolower($data['desc']);
            $data['waitTime'] = strtolower($data['waitTime']);
            $data['urlImage'] = strtolower($data['urlImage']);
            Itens::create($data);
            return response()->json(['message' => 'sucess'], 200);
        } catch (\Throwable $th) {
            throw $th;
        }
    }

    public function show(string $id)
    {
        try {
            $iten = Itens::find($id);
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
            $iten = Itens::where('slug', $slug)->get();;
            if ($iten === null) {
                throw new \Exception("Item not found");
            }
            return ItensResouce::collection($iten);
        } catch (\Throwable $th) {
            throw $th;
        }
    }

    public function showTitle(string $title)
    {
        try {
            $iten = Itens::where('title', 'LIKE', '%' . $title . '%')->paginate(16);
            if ($iten === null) {
                throw new \Exception("Item not found");
            }
            return ItensResouce::collection($iten);
        } catch (\Throwable $th) {
            throw $th;
        }
    }

    public function showCategory(string $typeCategory)
    {
        try {
            $iten = Itens::join('categories', 'categories.idCategory', '=', 'itens.idCategory')->where('categories.typeCategory', '=', $typeCategory)->paginate(16);;
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
