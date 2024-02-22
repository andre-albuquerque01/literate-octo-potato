<?php

namespace App\Services;


use App\Http\Resources\MesaResource;
use App\Models\Mesa;

class MesaService
{

    public function index()
    {
        try {
            $mesa = Mesa::paginate();
            return MesaResource::collection($mesa);
        } catch (\Throwable $th) {
            throw $th;
        }
    }
    public function store(array $data)
    {
        try {
            Mesa::create($data);
            return response()->json(['message' => 'sucess'], 200);
        } catch (\Throwable $th) {
            throw $th;
        }
    }
    public function show(string $id)
    {
        try {
            $mesa = Mesa::find($id);
            return new MesaResource($mesa);
        } catch (\Throwable $th) {
            throw $th;
        }
    }
    public function update(array $data, string $id)
    {
        try {
            Mesa::where('idMesa', $id)->update($data);
            return response()->json(['message' => 'sucess'], 200);
        } catch (\Throwable $th) {
            throw $th;
        }
    }
    public function destroy(string $id)
    {
        try {
            Mesa::findOrFail($id)->delete();
            return response()->json(['message' => 'sucess'], 204);
        } catch (\Throwable $th) {
            throw $th;
        }
    }
}
