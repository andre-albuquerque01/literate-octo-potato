<?php

namespace App\Services;


use App\Exceptions\MesaException;
use App\Http\Resources\GeneralResource;
use App\Http\Resources\MesaResource;
use App\Models\Mesa;

class MesaService
{
    public function index()
    {
        try {
            $mesa = Mesa::get();
            return MesaResource::collection($mesa);
        } catch (\Exception $e) {
            throw new MesaException($e->getMessage());
        }
    }

    public function store(array $data)
    {
        try {
            $data['statusMesa'] = 0;
            Mesa::create($data);
            return new GeneralResource(['message' => 'success']);
        } catch (\Exception $e) {
            throw new MesaException($e->getMessage());
        }
    }

    public function show(string $id)
    {
        try {
            $mesa = Mesa::findOrFail($id)->first();
            return new MesaResource($mesa);
        } catch (\Exception $e) {
            throw new MesaException($e->getMessage());
        }
    }
    public function update(array $data, string $id)
    {
        try {
            Mesa::where('idMesa', $id)->update($data);
            return new GeneralResource(['message' => 'success']);
        } catch (\Exception $e) {
            throw new MesaException($e->getMessage());
        }
    }
    public function destroy(string $id)
    {
        try {
            Mesa::findOrFail($id)->delete();
            return new GeneralResource(['message' => 'success']);
        } catch (\Exception $e) {
            throw new MesaException($e->getMessage());
        }
    }
}
