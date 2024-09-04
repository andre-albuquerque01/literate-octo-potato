<?php

namespace App\Services;

use App\Exceptions\ItenException;
use App\Http\Resources\GeneralResource;
use App\Http\Resources\ItensResouce;
use App\Models\Itens;
use Illuminate\Support\Str;

class ItensService
{
    public function index()
    {
        try {
            $iten = Itens::with('category')->whereNull('deleted_at')->where('statusIten',  1)->get();
            return ItensResouce::collection($iten);
        } catch (\Exception $e) {
            throw new ItenException($e->getMessage());
        }
    }

    public function indexAll()
    {
        try {
            $iten = Itens::with('category')->whereNull('deleted_at')->paginate(16);
            return ItensResouce::collection($iten);
        } catch (\Exception $e) {
            throw new ItenException($e->getMessage());
        }
    }

    public function indexInitial()
    {
        try {
            $iten = Itens::with('category', function ($query) {
                $query->whereNull('deleted_at');
            })->where('position', 'entrada')->whereNull('deleted_at')->get();
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
            $data['description'] = strtolower($data['description']);
            $data['waitTime'] = strtolower($data['waitTime']);
            Itens::create($data);
            return new GeneralResource(['message' => 'success']);
        } catch (\Exception $e) {
            throw new ItenException($e->getMessage());
        }
    }

    public function show(string $id)
    {
        try {
            $iten = Itens::where('idItens', $id)->with('category', function ($query) {
                $query->whereNull('deleted_at');
            })->where('deleted_at', null)->first();
            if (!$iten) {
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
            $iten = Itens::where('title', 'LIKE', '%' . $title . '%')->with('category', function ($query) {
                $query->whereNull('deleted_at');
            })->whereNull('deleted_at')->paginate(16);
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
                $query->whereNull('deleted_at');
            })->with('category')->whereNull('deleted_at')->paginate(16);

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
            $itens = Itens::where('idItens',  $id)->first();
            if ($itens === null) {
                throw new ItenException("Item not found");
            }
            $itens->update($data);
            return new GeneralResource(['message' => 'success']);
        } catch (\Exception $e) {
            throw new ItenException($e->getMessage());
        }
    }

    public function destroy(string $id)
    {
        try {
            $itens = Itens::where('idItens', $id)->whereNull('deleted_at')->first();
            if ($itens === null) {
                throw new ItenException("Item not found");
            }
            $itens->touch('deleted_at');
            return new GeneralResource(['message' => 'success']);
        } catch (\Exception $e) {
            throw new ItenException($e->getMessage());
        }
    }
}
