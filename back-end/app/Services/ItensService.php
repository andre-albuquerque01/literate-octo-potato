<?php

namespace App\Services;

use App\Exceptions\ItenException;
use App\Http\Resources\ItensResouce;
use App\Models\Itens;
use Illuminate\Support\Str;

class ItensService
{
    public function index()
    {
        try {
            $iten = Itens::with('category')->where('statusIten',  1)->get();
            return ItensResouce::collection($iten);
        } catch (\Exception $e) {
            throw new ItenException($e->getMessage());
        }
    }

    public function indexAll()
    {
        try {
            $iten = Itens::with('category')->paginate(16);
            return ItensResouce::collection($iten);
        } catch (\Exception $e) {
            throw new ItenException($e->getMessage());
        }
    }

    public function indexInitial()
    {
        try {
            $iten = Itens::with('category')->where('position', 'entrada')->get();
            return ItensResouce::collection($iten);
        } catch (\Exception $e) {
            throw new ItenException($e->getMessage());
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
            return response()->json(['message' => 'success'], 200);
        } catch (\Exception $e) {
            throw new ItenException($e->getMessage());
        }
    }

    public function show(string $id)
    {
        try {
            $iten = Itens::find($id)->with('category')->first();
            if ($iten === null) {
                throw new ItenException("Item not found");
            }
            return new ItensResouce($iten);
        } catch (\Exception $e) {
            throw new ItenException($e->getMessage());
        }
    }

    public function showTitle(string $title)
    {
        try {
            $iten = Itens::where('title', 'LIKE', '%' . $title . '%')->with('category')->paginate(16);
            if ($iten === null) {
                throw new ItenException("Item not found");
            }
            return ItensResouce::collection($iten);
        } catch (\Exception $e) {
            throw new ItenException($e->getMessage());
        }
    }

    public function showCategory(string $typeCategory)
    {
        try {
            $iten = Itens::whereHas('category', function ($query) use ($typeCategory) {
                $query->where('typeCategory', 'LIKE', '%' . $typeCategory . '%');
            })->with('category')->paginate(16);

            if ($iten->isEmpty())
                throw new ItenException("Item not found");


            return ItensResouce::collection($iten);
        } catch (\Exception $e) {
            throw new ItenException($e->getMessage());
        }
    }

    public function update(array $data, string $id)
    {
        try {
            Itens::where('idItens',  $id)->update($data);
            return response()->json(['message' => 'success'], 200);
        } catch (\Exception $e) {
            throw new ItenException($e->getMessage());
        }
    }

    public function destroy(string $id)
    {
        try {
            Itens::findOrFail($id)->delete();
            return response()->json(['message' => 'success'], 204);
        } catch (\Exception $e) {
            throw new ItenException($e->getMessage());
        }
    }
}
